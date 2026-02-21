"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { Package, AlertCircle, Loader2 } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import {
  subscribeToOrders,
  updateOrderStatus,
  deleteOrder,
  Order as DBOrder,
} from "@/lib/firebase/firestore"

interface OrderDisplay {
  id: string
  tableNumber: string
  items: { name: string; quantity: number; price?: number }[]
  status: "new" | "preparing" | "ready" | "completed"
  timestamp?: string
  total?: number
}

// Convert DB order status to display status
const mapOrderStatus = (status: DBOrder["status"]): OrderDisplay["status"] => {
  switch (status) {
    case "pending":
      return "new"
    case "preparing":
      return "preparing"
    case "ready":
      return "ready"
    case "completed":
      return "completed"
    case "cancelled":
      return "completed" // Treat cancelled as completed for display
    default:
      return "new"
  }
}

// Convert DB order to display order
const convertOrder = (dbOrder: DBOrder): OrderDisplay => {
  const now = Date.now()
  const orderTime = dbOrder.createdAt?.toMillis() || now
  const minutesAgo = Math.floor((now - orderTime) / 60000)
  const timestamp = minutesAgo < 1 ? "Just now" : minutesAgo < 60 ? `${minutesAgo}m` : `${Math.floor(minutesAgo / 60)}h`

  return {
    id: dbOrder.id,
    tableNumber: dbOrder.tableNumber,
    items: dbOrder.items || [],
    status: mapOrderStatus(dbOrder.status),
    timestamp,
    total: dbOrder.total,
  }
}

export function LiveOrders() {
  const { restaurant } = useAuth()
  const [orders, setOrders] = useState<OrderDisplay[]>([])
  const [loading, setLoading] = useState(true)
  const [declineReason, setDeclineReason] = useState<string>("")
  const [declineDialogOpen, setDeclineDialogOpen] = useState(false)
  const [orderToDecline, setOrderToDecline] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null)

  // Subscribe to real-time orders
  useEffect(() => {
    if (!restaurant?.id) return

    setLoading(true)
    const unsubscribe = subscribeToOrders(restaurant.id, (dbOrders) => {
      const displayOrders = dbOrders.map(convertOrder)
      setOrders(displayOrders)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [restaurant?.id])

  const handleStatusChange = async (orderId: string, newStatus: DBOrder["status"]) => {
    try {
      await updateOrderStatus(orderId, newStatus)
      const statusMessages = {
        pending: "Order accepted",
        preparing: "Order marked as preparing",
        ready: "Order marked as ready",
        completed: "Order completed",
        cancelled: "Order cancelled",
      }
      toast.success(statusMessages[newStatus] || "Order status updated")
    } catch (error) {
      console.error("Error updating order status:", error)
      toast.error("Failed to update order status")
    }
  }

  const openDeclineDialog = (orderId: string) => {
    setOrderToDecline(orderId)
    setDeclineDialogOpen(true)
  }

  const handleDecline = async () => {
    if (!orderToDecline || !declineReason.trim()) {
      toast.error("Please provide a reason for declining")
      return
    }
    try {
      await handleStatusChange(orderToDecline, "cancelled")
      const order = orders.find((o) => o.id === orderToDecline)
      setDeclineReason("")
      setDeclineDialogOpen(false)
      setOrderToDecline(null)
      toast.success(`Order from Table ${order?.tableNumber} declined`)
    } catch (error) {
      console.error("Error declining order:", error)
      toast.error("Failed to decline order")
    }
  }

  const openDeleteDialog = (orderId: string) => {
    setOrderToDelete(orderId)
    setDeleteDialogOpen(true)
  }

  const handleDelete = async () => {
    if (!orderToDelete) return
    try {
      await deleteOrder(orderToDelete)
      const order = orders.find((o) => o.id === orderToDelete)
      setDeleteDialogOpen(false)
      setOrderToDelete(null)
      toast.success(`Order from Table ${order?.tableNumber} deleted`)
    } catch (error) {
      console.error("Error deleting order:", error)
      toast.error("Failed to delete order")
    }
  }

  const columns = [
    {
      title: "New Orders",
      status: "new" as const,
      color: "bg-red-500",
      count: orders.filter((o) => o.status === "new").length,
    },
    {
      title: "Preparing",
      status: "preparing" as const,
      color: "bg-orange-500",
      count: orders.filter((o) => o.status === "preparing").length,
    },
    {
      title: "Ready / Served",
      status: "ready" as const,
      color: "bg-green-500",
      count: orders.filter((o) => o.status === "ready").length,
    },
    {
      title: "Completed",
      status: "completed" as const,
      color: "bg-gray-400",
      count: orders.filter((o) => o.status === "completed").length,
    },
  ]

  const getOrderActions = (order: OrderDisplay) => {
    switch (order.status) {
      case "new":
        return (
          <div className="flex flex-col sm:flex-row gap-2 mt-3">
            <Button
              size="sm"
              className="bg-green-500 hover:bg-green-600 text-white flex-1"
              onClick={() => handleStatusChange(order.id, "preparing")}
            >
              Accept
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => openDeclineDialog(order.id)}
              className="flex-1"
            >
              Decline
            </Button>
          </div>
        )
      case "preparing":
        return (
          <Button
            size="sm"
            className="bg-orange-500 hover:bg-orange-600 text-white mt-3"
            onClick={() => handleStatusChange(order.id, "ready")}
          >
            Mark Ready
          </Button>
        )
      case "ready":
        return (
          <Button
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white mt-3"
            onClick={() => handleStatusChange(order.id, "completed")}
          >
            Complete
          </Button>
        )
      case "completed":
        return (
          <div className="flex flex-col sm:flex-row gap-2 mt-3">
            <Button
              size="sm"
              variant="destructive"
              onClick={() => openDeleteDialog(order.id)}
              className="flex-1"
            >
              Delete
            </Button>
          </div>
        )
      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold">Live Orders</h2>
        <select className="px-3 py-2 border rounded-md text-sm w-full sm:w-auto">
          <option>All Changes</option>
          <option>Today</option>
          <option>This Week</option>
        </select>
      </div>

      <div className="overflow-x-auto pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 min-w-[800px] lg:min-w-0">
          {columns.map((column) => {
            const columnOrders = orders.filter((o) => o.status === column.status)
            return (
              <div key={column.status} className="space-y-3">
                <div className={`${column.color} text-white px-4 py-2 rounded-t-lg flex justify-between items-center`}>
                  <span className="font-semibold">• {column.title}</span>
                  <span className="bg-white/20 px-2 py-1 rounded text-sm font-bold">{column.count}</span>
                </div>
                <div className="space-y-3 border border-gray-200 rounded-b-lg p-3 min-h-[200px]">
                  {columnOrders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                      <Package className="h-12 w-12 mb-2 opacity-50" />
                      <p className="text-sm text-center">No orders</p>
                    </div>
                  ) : (
                    columnOrders.map((order) => (
                      <Card key={order.id} className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                              <div className="font-semibold text-base sm:text-lg">Table {order.tableNumber}</div>
                              {order.timestamp && (
                                <div className="text-xs text-gray-500 mt-1">{order.timestamp} ago</div>
                              )}
                            </div>
                          </div>
                          <div className="space-y-1 mb-3">
                            {order.items.map((item, index) => (
                              <div key={index} className="text-sm flex justify-between">
                                <span className="font-medium">{item.name}</span>
                                {item.quantity > 1 && (
                                  <span className="text-gray-500 ml-2">x{item.quantity}</span>
                                )}
                              </div>
                            ))}
                          </div>
                          {order.total && (
                            <div className="font-bold text-green-600 mb-2 text-lg">${order.total.toFixed(2)}</div>
                          )}
                          {getOrderActions(order)}
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Decline Order Dialog */}
      <Dialog open={declineDialogOpen} onOpenChange={setDeclineDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Decline Order</DialogTitle>
            <DialogDescription>
              Please provide a reason for declining this order from Table {orders.find((o) => o.id === orderToDecline)?.tableNumber}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Reason for decline (e.g., Out of stock, Customer request)"
              value={declineReason}
              onChange={(e) => setDeclineReason(e.target.value)}
              className="w-full"
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setDeclineDialogOpen(false)
                setDeclineReason("")
                setOrderToDecline(null)
              }}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDecline}>
              Decline Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Order Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Delete Order
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this completed order from Table {orders.find((o) => o.id === orderToDelete)?.tableNumber}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setDeleteDialogOpen(false)
                setOrderToDelete(null)
              }}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
