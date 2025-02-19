"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface Order {
  id: number
  tableNumber: number
  items: { name: string; quantity: number }[]
  status: "pending" | "approved" | "declined"
  declineReason?: string
}

export function LiveOrders() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      tableNumber: 5,
      items: [
        { name: "Margherita Pizza", quantity: 2 },
        { name: "Coke", quantity: 3 },
      ],
      status: "pending",
    },
    {
      id: 2,
      tableNumber: 3,
      items: [
        { name: "Pasta Alfredo", quantity: 1 },
        { name: "Garlic Bread", quantity: 1 },
      ],
      status: "pending",
    },
  ])

  const [declineReason, setDeclineReason] = useState<string>("")

  const handleApprove = (orderId: number) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: "approved" } : order)))
  }

  const handleDecline = (orderId: number) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: "declined", declineReason } : order)))
    setDeclineReason("")
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Live Orders</h2>
      {orders.map((order) => (
        <Card key={order.id}>
          <CardHeader>
            <CardTitle>
              Order #{order.id} - Table {order.tableNumber}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {order.items.map((item, index) => (
                <li key={'item-' + index}>
                  {item.name} x{item.quantity}
                </li>
              ))}
            </ul>
            {order.status === "declined" && <p className="text-red-500 mt-2">Declined: {order.declineReason}</p>}
          </CardContent>
          <CardFooter className="flex justify-between">
            {order.status === "pending" && (
              <>
                <Button onClick={() => handleApprove(order.id)}>Approve</Button>
                <div className="flex gap-2">
                  <Input
                    placeholder="Reason for decline"
                    value={declineReason}
                    onChange={(e) => setDeclineReason(e.target.value)}
                  />
                  <Button variant="destructive" onClick={() => handleDecline(order.id)}>
                    Decline
                  </Button>
                </div>
              </>
            )}
            {order.status === "approved" && <span className="text-green-500">Approved</span>}
            {order.status === "declined" && <span className="text-red-500">Declined</span>}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

