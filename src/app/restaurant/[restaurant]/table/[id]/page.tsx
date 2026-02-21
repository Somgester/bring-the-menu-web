"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Leaf, Beef, ChevronDown, ChevronUp, Plus, Minus, X, ShoppingBag, Loader2 } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { useParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toggle } from "@/components/ui/toggle"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getMenuItems, MenuItem as DBMenuItem } from "@/lib/firebase/firestore"
import { createOrder } from "@/lib/firebase/firestore"
import { toast } from "sonner"

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  isVeg: boolean
  category: string
  available: boolean
}

interface CartItem extends MenuItem {
  quantity: number
}

export default function MenuPage() {
  const params = useParams()
  const restaurantId = params.restaurant as string
  const tableNumber = params.id as string

  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [vegOnly, setVegOnly] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [isPlateExpanded, setIsPlateExpanded] = useState(false)
  const [placingOrder, setPlacingOrder] = useState(false)

  // Load menu items from database
  useEffect(() => {
    if (!restaurantId) return

    const loadMenuItems = async () => {
      try {
        setLoading(true)
        const dbItems = await getMenuItems(restaurantId)
        const items: MenuItem[] = dbItems
          .filter((item) => item.available) // Only show available items
          .map((item) => ({
            id: item.id,
            name: item.name,
            description: item.description || "",
            price: item.price,
            image: item.imageUrl || "/placeholder.svg",
            isVeg: item.isVegetarian || false,
            category: item.category,
            available: item.available,
          }))
        setMenuItems(items)
      } catch (error) {
        console.error("Error loading menu items:", error)
        toast.error("Failed to load menu")
      } finally {
        setLoading(false)
      }
    }

    loadMenuItems()
  }, [restaurantId])

  const toggleDescription = (id: string) => {
    setExpandedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const addToCart = (item: MenuItem) => {
    if (!item.available) {
      toast.error("This item is currently unavailable")
      return
    }
    setCart((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
    toast.success(`${item.name} added to cart`)
  }

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) => {
      const newCart = prev
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item))
        .filter((item) => item.quantity > 0)

      if (newCart.length === 0) {
        setIsPlateExpanded(false)
      }
      return newCart
    })
  }

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const newCart = prev.filter((item) => item.id !== id)
      if (newCart.length === 0) {
        setIsPlateExpanded(false)
      }
      return newCart
    })
  }

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty")
      return
    }

    if (!restaurantId || !tableNumber) {
      toast.error("Invalid restaurant or table number")
      return
    }

    try {
      setPlacingOrder(true)
      const orderItems = cart.map((item) => ({
        menuItemId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }))

      const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

      await createOrder({
        restaurantId,
        tableNumber,
        items: orderItems,
        total,
        status: "pending",
      })

      toast.success("Order placed successfully!")
      setCart([])
      setIsPlateExpanded(false)
    } catch (error) {
      console.error("Error placing order:", error)
      toast.error("Failed to place order. Please try again.")
    } finally {
      setPlacingOrder(false)
    }
  }

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  const filteredItems = vegOnly ? menuItems.filter((item) => item.isVeg) : menuItems

  // Get unique categories from menu items
  const categories = Array.from(new Set(menuItems.map((item) => item.category)))

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 pb-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Our Menu</h1>
          <p className="text-muted-foreground mt-1">Table {tableNumber}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Veg Only</span>
          <Toggle pressed={vegOnly} onPressedChange={setVegOnly} aria-label="Toggle veg only">
            <Leaf className="h-4 w-4" />
          </Toggle>
        </div>
      </div>

      {menuItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No menu items available at the moment.</p>
        </div>
      ) : (
        <Tabs defaultValue={categories[0] || ""} className="w-full">
          <ScrollArea className="w-full">
            <TabsList className="w-full justify-start">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>
          </ScrollArea>

          {categories.map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems
                  .filter((item) => item.category === category)
                  .map((item) => (
                    <div key={item.id} className="border rounded-lg p-4 space-y-4">
                      <div className="relative aspect-video">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="rounded-md object-cover"
                        />
                        <Badge variant="secondary" className="absolute top-2 left-2">
                          {item.isVeg ? (
                            <Leaf className="h-4 w-4 text-green-500" />
                          ) : (
                            <Beef className="h-4 w-4 text-red-500" />
                          )}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold">{item.name}</h3>
                          <span className="font-bold">${item.price.toFixed(2)}</span>
                        </div>

                        <div className="space-y-2">
                          <p
                            className={`text-sm text-muted-foreground ${!expandedItems.includes(item.id) && "line-clamp-2"}`}
                          >
                            {item.description}
                          </p>
                          {item.description.length > 100 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-0 h-auto font-medium"
                              onClick={() => toggleDescription(item.id)}
                            >
                              {expandedItems.includes(item.id) ? (
                                <span className="flex items-center">
                                  Read less <ChevronUp className="ml-1 h-4 w-4" />
                                </span>
                              ) : (
                                <span className="flex items-center">
                                  Read more <ChevronDown className="ml-1 h-4 w-4" />
                                </span>
                              )}
                            </Button>
                          )}
                        </div>

                        <Button
                          className="w-full"
                          onClick={() => addToCart(item)}
                          disabled={!item.available}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          {item.available ? "Add to plate" : "Unavailable"}
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}

      <AnimatePresence>
        {cart.length > 0 && (
          <>
            {isPlateExpanded ? (
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="fixed bottom-0 left-0 right-0 bg-background border-t shadow-lg z-50"
              >
                <div className="container mx-auto p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="h-5 w-5" />
                      <span className="font-semibold">Your Plate ({totalItems} items)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">Total: ${totalAmount.toFixed(2)}</span>
                      <Button variant="ghost" size="icon" onClick={() => setIsPlateExpanded(false)} className="h-8 w-8">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <ScrollArea className="h-[200px]">
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          className="flex items-center justify-between gap-4 bg-muted/50 p-3 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              width={48}
                              height={48}
                              className="rounded-md object-cover"
                            />
                            <div>
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                ${item.price.toFixed(2)} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 bg-background rounded-lg border">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, -1)}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </ScrollArea>

                  <div className="mt-4">
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={handlePlaceOrder}
                      disabled={placingOrder || cart.length === 0}
                    >
                      {placingOrder ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Placing Order...
                        </>
                      ) : (
                        "Place Order"
                      )}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={() => setIsPlateExpanded(true)}
                className="fixed bottom-6 right-6 cursor-pointer"
              >
                <div className="relative inline-flex">
                  <Button size="lg" className="rounded-full h-14 w-14 shadow-lg">
                    <ShoppingBag className="h-6 w-6" />
                  </Button>
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center text-sm font-medium">
                    {totalItems}
                  </span>
                </div>
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
