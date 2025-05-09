"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useWallet } from "@/context/wallet-context"
import { formatCurrency } from "@/lib/utils"
import { Wallet, ArrowUpRight, ArrowDownLeft, Clock } from "lucide-react"

export default function WalletPage() {
  const { walletBalance, updateWalletBalance } = useWallet()
  const { toast } = useToast()
  const [amount, setAmount] = useState("")

  const handleAddMoney = () => {
    const amountNum = Number.parseFloat(amount)

    if (isNaN(amountNum) || amountNum <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount greater than 0.",
        variant: "destructive",
      })
      return
    }

    updateWalletBalance(walletBalance + amountNum)

    toast({
      title: "Money added successfully",
      description: `${formatCurrency(amountNum)} has been added to your wallet.`,
    })

    setAmount("")
  }

  // Mock transaction history
  const transactions = [
    {
      id: "tx1",
      type: "credit",
      amount: 10000,
      date: "2023-05-01T10:30:00Z",
      description: "Added money to wallet",
    },
    {
      id: "tx2",
      type: "debit",
      amount: 2500,
      date: "2023-05-02T14:20:00Z",
      description: "Flight booking - DEL to BOM",
    },
    {
      id: "tx3",
      type: "credit",
      amount: 5000,
      date: "2023-05-05T09:15:00Z",
      description: "Added money to wallet",
    },
    {
      id: "tx4",
      type: "debit",
      amount: 2800,
      date: "2023-05-07T16:45:00Z",
      description: "Flight booking - BLR to HYD",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Wallet Balance</CardTitle>
              <CardDescription>Your current wallet balance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-6">
                <div className="text-center">
                  <Wallet className="h-12 w-12 mx-auto text-orange-500 mb-4" />
                  <div className="text-3xl font-bold">{formatCurrency(walletBalance)}</div>
                  <p className="text-gray-500 mt-2">Available Balance</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="amount">Add Money</Label>
                  <div className="flex gap-2">
                    <Input
                      id="amount"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      type="number"
                      min="1"
                    />
                    <Button onClick={handleAddMoney}>Add</Button>
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>Your recent wallet transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="mb-6">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="credit">Added</TabsTrigger>
                  <TabsTrigger value="debit">Spent</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-0">
                  <div className="space-y-4">
                    {transactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div
                            className={`h-10 w-10 rounded-full flex items-center justify-center ${
                              transaction.type === "credit" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                            }`}
                          >
                            {transaction.type === "credit" ? (
                              <ArrowDownLeft className="h-5 w-5" />
                            ) : (
                              <ArrowUpRight className="h-5 w-5" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium">{transaction.description}</div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {new Date(transaction.date).toLocaleString()}
                            </div>
                          </div>
                        </div>
                        <div
                          className={`font-semibold ${
                            transaction.type === "credit" ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {transaction.type === "credit" ? "+" : "-"}
                          {formatCurrency(transaction.amount)}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="credit" className="mt-0">
                  <div className="space-y-4">
                    {transactions
                      .filter((t) => t.type === "credit")
                      .map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full flex items-center justify-center bg-green-100 text-green-600">
                              <ArrowDownLeft className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="font-medium">{transaction.description}</div>
                              <div className="text-sm text-gray-500 flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {new Date(transaction.date).toLocaleString()}
                              </div>
                            </div>
                          </div>
                          <div className="font-semibold text-green-600">+ {formatCurrency(transaction.amount)}</div>
                        </div>
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="debit" className="mt-0">
                  <div className="space-y-4">
                    {transactions
                      .filter((t) => t.type === "debit")
                      .map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full flex items-center justify-center bg-red-100 text-red-600">
                              <ArrowUpRight className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="font-medium">{transaction.description}</div>
                              <div className="text-sm text-gray-500 flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {new Date(transaction.date).toLocaleString()}
                              </div>
                            </div>
                          </div>
                          <div className="font-semibold text-red-600">- {formatCurrency(transaction.amount)}</div>
                        </div>
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
