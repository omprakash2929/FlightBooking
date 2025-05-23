import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model('User', userSchema);