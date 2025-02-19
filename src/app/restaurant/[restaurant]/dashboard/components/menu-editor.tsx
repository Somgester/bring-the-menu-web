"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Pencil, Trash } from "lucide-react"
import  Image  from "next/image"

interface MenuItem {
  id: number
  name: string
  price: number
  isVegetarian: boolean
  description: string
  imageUrl: string
}

interface Category {
  id: number
  name: string
  items: MenuItem[]
}

export function MenuEditor() {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 1,
      name: "Pizzas",
      items: [
        {
          id: 1,
          name: "Margherita",
          price: 10.99,
          isVegetarian: true,
          description: "Classic cheese and tomato pizza",
          imageUrl: "/placeholder.svg",
        },
      ],
    },
    {
      id: 2,
      name: "Beverages",
      items: [
        {
          id: 2,
          name: "Coke",
          price: 2.99,
          isVegetarian: true,
          description: "Refreshing cola drink",
          imageUrl: "/placeholder.svg",
        },
      ],
    },
  ])

  const [newCategory, setNewCategory] = useState("")
  const [newItem, setNewItem] = useState<Omit<MenuItem, "id">>({
    name: "",
    price: 0,
    isVegetarian: false,
    description: "",
    imageUrl: "",
  })
  const [editingItemId, setEditingItemId] = useState<number | null>(null)

  const addCategory = () => {
    if (newCategory) {
      setCategories([...categories, { id: Date.now(), name: newCategory, items: [] }])
      setNewCategory("")
    }
  }

  const addOrUpdateItem = (categoryId: number) => {
    if (newItem.name && newItem.price) {
      setCategories(
        categories.map((category) =>
          category.id === categoryId
            ? {
                ...category,
                items: editingItemId
                  ? category.items.map((item) => (item.id === editingItemId ? { ...newItem, id: item.id } : item))
                  : [...category.items, { ...newItem, id: Date.now() }],
              }
            : category,
        ),
      )
      setNewItem({
        name: "",
        price: 0,
        isVegetarian: false,
        description: "",
        imageUrl: "",
      })
      setEditingItemId(null)
    }
  }

  const startEditingItem = (item: MenuItem) => {
    setNewItem(item)
    setEditingItemId(item.id)
  }

  const deleteCategory = (categoryId: number) => {
    setCategories(categories.filter((category) => category.id !== categoryId))
  }

  const deleteItem = (categoryId: number, itemId: number) => {
    setCategories(
      categories.map((category) =>
        category.id === categoryId
          ? { ...category, items: category.items.filter((item) => item.id !== itemId) }
          : category,
      ),
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Menu Editor</h2>
      <div className="flex gap-2">
        <Input placeholder="New category name" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
        <Button onClick={addCategory}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Category
        </Button>
      </div>
      {categories.map((category) => (
        <Card key={category.id}>
          <CardHeader>
            <CardTitle className="flex justify-between">
              {category.name}
              <Button variant="destructive" size="sm" onClick={() => deleteCategory(category.id)}>
                <Trash className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {category.items.map((item) => (
                <li key={item.id} className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">
                      {item.name} - ${item.price.toFixed(2)}
                    </h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                    <p className="text-sm">{item.isVegetarian ? "Vegetarian" : "Non-vegetarian"}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => startEditingItem(item)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => deleteItem(category.id, item.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-4">
            <Input
              placeholder="Item name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="w-full"
            />
            <Input
              placeholder="Price"
              type="number"
              value={newItem.price || ""}
              onChange={(e) => setNewItem({ ...newItem, price: Number.parseFloat(e.target.value) })}
              className="w-full"
            />
            <Textarea
              placeholder="Item description"
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              className="w-full"
            />
            <div className="flex items-center space-x-2">
              <Switch
                id={`vegetarian-${category.id}`}
                checked={newItem.isVegetarian}
                onCheckedChange={(checked: boolean) => setNewItem({ ...newItem, isVegetarian: checked })}
              />
              <Label htmlFor={`vegetarian-${category.id}`}>Vegetarian</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    const reader = new FileReader()
                    reader.onloadend = () => {
                      setNewItem({ ...newItem, imageUrl: reader.result as string })
                    }
                    reader.readAsDataURL(file)
                  }
                }}
              />
              {newItem.imageUrl && (
                <Image src={newItem.imageUrl || "/placeholder.svg"} alt="Preview" className="w-16 h-16 object-cover" />
              )}
            </div>
            <Button onClick={() => addOrUpdateItem(category.id)} className="w-full">
              {editingItemId ? "Update Item" : "Add Item"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

