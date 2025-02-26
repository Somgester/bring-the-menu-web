"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LiveOrders } from "./components/live-orders"
import { MenuEditor } from "./components/menu-editor"
import { Profile } from "./components/profile"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
 

export default function DashboardPage() {
  const router = useRouter()
  return (
    <div className="container mx-auto p-4">
  <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Restaurant Dashboard</h1>
        <div className="flex gap-4">
          <Button variant="outline"  onClick={() => {
                router.push("/dashboard/qr-generator");
              }}>Generate QR</Button>
          <Button variant="destructive">Logout</Button>
        </div>
      </div>      <Tabs defaultValue="orders">
        <TabsList>
          <TabsTrigger value="orders">Live Orders</TabsTrigger>
          <TabsTrigger value="menu">Menu Editor</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>
        <TabsContent value="orders">
          <LiveOrders />
        </TabsContent>
        <TabsContent value="menu">
          <MenuEditor />
        </TabsContent>
        <TabsContent value="profile">
          <Profile />
        </TabsContent>
      </Tabs>
    </div>
  )
}

