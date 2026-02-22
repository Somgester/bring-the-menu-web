"use client"

import { useState } from "react"
import Image from "next/image"
import { Leaf, Beef, ChevronDown, ChevronUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toggle } from "@/components/ui/toggle"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { MenuItem as DBMenuItem } from "@/lib/firebase/firestore"

interface MenuPreviewProps {
  items: DBMenuItem[]
  restaurantName?: string
}

export function MenuPreview({ items, restaurantName }: MenuPreviewProps) {
  const [vegOnly, setVegOnly] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleDescription = (id: string) => {
    setExpandedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  // Convert DB items to display format
  const menuItems = items.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description || "",
    price: item.price,
    image: item.imageUrl || "/placeholder.svg",
    isVeg: item.isVegetarian || false,
    category: item.category,
    available: item.available,
  }))

  const filteredItems = vegOnly ? menuItems.filter((item) => item.isVeg) : menuItems

  // Get unique categories from menu items
  const categories = Array.from(new Set(menuItems.map((item) => item.category)))

  if (menuItems.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No menu items to preview. Add items to see the preview.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Menu Preview</h2>
          {restaurantName && <p className="text-muted-foreground mt-1">{restaurantName}</p>}
          <p className="text-sm text-muted-foreground mt-1">
            This is how your menu appears to customers
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Veg Only</span>
          <Toggle pressed={vegOnly} onPressedChange={setVegOnly} aria-label="Toggle veg only">
            <Leaf className="h-4 w-4" />
          </Toggle>
        </div>
      </div>

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
          <TabsContent key={category} value={category} className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems
                .filter((item) => item.category === category)
                .map((item) => (
                  <div
                    key={item.id}
                    className={`border rounded-lg p-4 space-y-4 ${
                      !item.available ? "opacity-60 bg-muted/30" : ""
                    }`}
                  >
                    <div className="relative aspect-video">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="rounded-md object-cover"
                      />
                      <div className="absolute top-2 left-2 flex gap-2">
                        <Badge variant="secondary">
                          {item.isVeg ? (
                            <Leaf className="h-4 w-4 text-green-500" />
                          ) : (
                            <Beef className="h-4 w-4 text-red-500" />
                          )}
                        </Badge>
                        {!item.available && (
                          <Badge variant="destructive" className="bg-red-500">
                            Unavailable
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold">{item.name}</h3>
                        <span className="font-bold">${item.price.toFixed(2)}</span>
                      </div>

                      <div className="space-y-2">
                        <p
                          className={`text-sm text-muted-foreground ${
                            !expandedItems.includes(item.id) && "line-clamp-2"
                          }`}
                        >
                          {item.description || "No description"}
                        </p>
                        {item.description && item.description.length > 100 && (
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

                      <div className="pt-2">
                        <Button
                          className="w-full"
                          variant={item.available ? "default" : "secondary"}
                          disabled={!item.available}
                        >
                          {item.available ? "Add to plate" : "Unavailable"}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
