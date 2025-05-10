import { verifyWebhook } from '@clerk/nextjs/webhooks';
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/models/User';

// Define Clerk webhook event type
interface ClerkWebhookEvent {
  type: string;
  data: {
    id: string;
    user_id?: string;
    email_addresses?: { email_address: string }[];
    first_name?: string;
    last_name?: string;
  };
}

export async function POST(req: NextRequest) {
 

  // Validate the secret before proceeding
  if (!process.env.CLERK_WEBHOOK_SIGNING_SECRET) {
    console.error('Missing CLERK_WEBHOOK_SIGNING_SECRET');
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  let evt: ClerkWebhookEvent;

  // Verify the webhook
  try {
    evt = await verifyWebhook(req) as ClerkWebhookEvent;
    console.log('Webhook verified successfully:', evt.type);
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return NextResponse.json({ error: 'Webhook verification failed' }, { status: 400 });
  }

  // Handle events
  const { type, data } = evt;

  try {
    await connectDB();

    if (type === 'user.created') {
      const existingUser = await User.findOne({ clerkId: data.id });
      if (!existingUser) {
        const email = data.email_addresses?.[0]?.email_address;
        if (!email) {
          return NextResponse.json({ error: 'No email address provided' }, { status: 400 });
        }

        const name = [data.first_name, data.last_name].filter(Boolean).join(' ') || 'Unknown';

        await User.create({
          clerkId: data.id,
          email,
          name,
        });
        console.log(`User created: ${data.id}`);
      }
    }

    if (type === 'session.created') {
      const userId = data.user_id;
      if (!userId) {
        return NextResponse.json({ error: 'No user ID provided' }, { status: 400 });
      }

      const existingUser = await User.findOne({ clerkId: userId });
      if (!existingUser) {
        const userResponse = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
          },
        });
        const user = await userResponse.json();
        const email = user.email_addresses?.[0]?.email_address;

        if (!email) {
          return NextResponse.json({ error: 'No email address found for user' }, { status: 400 });
        }

        await User.create({
          clerkId: userId,
          email,
        });
        console.log(`User created on sign-in: ${userId}`);
      } else {
        await User.updateOne(
          { clerkId: userId },
          { lastSignIn: new Date() }
        );
        console.log(`User signed in: ${userId}`);
      }
    }
  } catch (err) {
    console.error('Database operation failed:', err);
    return NextResponse.json({ error: 'Failed to process webhook' }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}