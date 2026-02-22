"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Clock, MapPin, Phone, Mail, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { getRestaurantProfile, getMenuItemsByCategory, getRestaurant, MenuItem } from "@/lib/firebase/firestore";

interface RestaurantPageProps {
  params: Promise<{ restaurant: string }>;
}

export default function RestaurantPage({
  params,
}: Readonly<RestaurantPageProps>) {
  const router = useRouter();
  const { restaurant: restaurantId } = React.use(params);
  const [restaurantData, setRestaurantData] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [menuItems, setMenuItems] = useState<Record<string, MenuItem[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check if Firebase is configured
        const firebaseConfig = {
          apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        };
        
        if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
          const errorMsg = "Firebase is not configured. Please add environment variables in Vercel settings.";
          console.error(errorMsg);
          setError(errorMsg);
          setLoading(false);
          return;
        }

        console.log("Loading restaurant data for ID:", restaurantId);

        // Try to get restaurant by ID
        let restaurant = null;
        try {
          restaurant = await getRestaurant(restaurantId);
          console.log("Restaurant found:", restaurant);
        } catch (e: any) {
          console.error("Error getting restaurant:", e);
          // Don't throw here, continue to try profile
        }

        // Get restaurant profile
        let restaurantProfile = null;
        try {
          restaurantProfile = await getRestaurantProfile(restaurantId);
          console.log("Restaurant profile found:", restaurantProfile);
        } catch (e: any) {
          console.error("Error getting restaurant profile:", e);
        }

        if (restaurantProfile) {
          setProfile(restaurantProfile);
          setRestaurantData({
            name: restaurantProfile.name,
            email: restaurantProfile.email,
            location: restaurantProfile.location,
            openingHours: restaurantProfile.openingHours,
            description: restaurantProfile.description,
            phone: restaurantProfile.phone,
            address: restaurantProfile.address,
          });
        } else if (restaurant) {
          setRestaurantData({
            name: restaurant.name,
            email: restaurant.email,
          });
        } else {
          console.warn("No restaurant or profile found for ID:", restaurantId);
          setError("Restaurant not found. Please check the URL or ensure Firebase is configured.");
        }

        // Get menu items
        try {
          const itemsByCategory = await getMenuItemsByCategory(restaurantId);
          console.log("Menu items loaded:", Object.keys(itemsByCategory).length, "categories");
          setMenuItems(itemsByCategory);
          
          if (Object.keys(itemsByCategory).length === 0) {
            console.warn("No menu items found for restaurant:", restaurantId);
          }
        } catch (e: any) {
          console.error("Error loading menu items:", e);
          setError(`Failed to load menu: ${e.message}`);
          setMenuItems({});
        }
      } catch (err: any) {
        console.error("Error loading restaurant data:", err);
        const errorMessage = err.message || "Failed to load restaurant data";
        setError(errorMessage);
        
        // Check if it's a Firebase config error
        if (errorMessage.includes("Firebase") || errorMessage.includes("Missing")) {
          setError("Firebase configuration error. Please check environment variables in Vercel.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (restaurantId) {
      loadData();
    } else {
      setError("Invalid restaurant ID");
      setLoading(false);
    }
  }, [restaurantId]);

  return (
    <div className="min-h-screen bg-background  ">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-20 items-center justify-between  px-4">
          <div className="flex items-center gap-6 ">
            {/* <Image src="/placeholder.svg" alt="Pizza Hut Logo" width={50} height={50} className="rounded" /> */}
            <div className=" w-12 h-12 rounded-lg bg-primary/10"></div>
            <div>
              <h1 className="text-xl font-semibold">
                {restaurantData?.name || restaurantId}
              </h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {restaurantData?.location && (
                  <>
                    <MapPin className="h-4 w-4" />
                    {restaurantData.location}
                    <span className="mx-2">•</span>
                  </>
                )}
                {restaurantData?.openingHours && (
                  <>
                    <Clock className="h-4 w-4" />
                    {restaurantData.openingHours}
                  </>
                )}
              </div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#info" className="text-sm font-medium">
              About
            </a>
            <a href="#menu" className="text-sm font-medium">
              Menu
            </a>
            <a href="#gallery" className="text-sm font-medium">
              Gallery
            </a>
            {/* <Link href="/dashboard"> */}
            <Button
              onClick={() => {
                router.push("/");
              }}
            >
              Login
            </Button>
            {/* </Link> */}
          </nav>
        </div>
      </header>

      <main className="container">
        {/* Restaurant Info Section */}
        <section id="info" className="mb-12">
          <Card>
            <CardContent className="grid gap-6 p-6 md:grid-cols-[2fr_1fr] ">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    About {restaurantData?.name || restaurantId}
                  </h2>
                  <p className="text-muted-foreground">
                    {restaurantData?.description || "Welcome to our restaurant. We serve delicious food with great service."}
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  {restaurantData?.openingHours && (
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-3">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Hours</h3>
                        <p className="text-sm text-muted-foreground">
                          {restaurantData.openingHours}
                        </p>
                      </div>
                    </div>
                  )}
                  {restaurantData?.phone && (
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-3">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Contact</h3>
                        <p className="text-sm text-muted-foreground">
                          {restaurantData.phone}
                        </p>
                      </div>
                    </div>
                  )}
                  {restaurantData?.email && (
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-3">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Email</h3>
                        <p className="text-sm text-muted-foreground">
                          {restaurantData.email}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                {restaurantData?.address && (
                  <div>
                    <h3 className="font-medium mb-2">Location</h3>
                    <p className="text-sm text-muted-foreground">
                      {restaurantData.address.street && `${restaurantData.address.street}, `}
                      {restaurantData.address.city && `${restaurantData.address.city}, `}
                      {restaurantData.address.state && `${restaurantData.address.state} `}
                      {restaurantData.address.zipCode && `- ${restaurantData.address.zipCode}`}
                      {restaurantData.address.country && `, ${restaurantData.address.country}`}
                    </p>
                  </div>
                )}
              </div>
              <div className="relative h-[300px] overflow-hidden   rounded-lg bg-primary/10">
                {/* <Image src="/placeholder.svg" alt="Restaurant Ambiance" fill className="object-cover" /> */}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Menu Section */}
        <section id="menu" className="my-16 px-6 pt-20 ">
          <h2 className="text-3xl font-bold mb-8">Our Menu</h2>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : error ? (
            <div className="text-center py-12 space-y-4">
              <p className="text-destructive font-medium">{error}</p>
              <p className="text-sm text-muted-foreground">
                Check browser console for more details. If this is a deployment issue, ensure Firebase environment variables are configured in Vercel.
              </p>
            </div>
          ) : Object.keys(menuItems).length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <p className="text-muted-foreground">No menu items available yet.</p>
              <p className="text-sm text-muted-foreground">
                Add menu items from your dashboard to see them here.
              </p>
            </div>
          ) : (
            <Tabs defaultValue={Object.keys(menuItems)[0] || ""}>
              <TabsList className="mb-8">
                {Object.keys(menuItems).map((category) => (
                  <TabsTrigger key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </TabsTrigger>
                ))}
              </TabsList>
              {Object.entries(menuItems).map(([category, items]) => (
                <TabsContent key={category} value={category}>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {items
                      .filter((item) => item.available)
                      .map((item) => (
                        <Card key={item.id}>
                          <div className="relative h-48 rounded-lg bg-primary/10 overflow-hidden">
                            {item.imageUrl ? (
                              <Image
                                src={item.imageUrl}
                                alt={item.name}
                                fill
                                className="rounded-t-lg object-cover"
                                onError={(e) => {
                                  // Fallback to placeholder if image fails to load
                                  const target = e.target as HTMLImageElement;
                                  target.src = "/placeholder.svg";
                                }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                No Image
                              </div>
                            )}
                          </div>
                          <CardHeader>
                            <CardTitle>{item.name}</CardTitle>
                            {item.description && (
                              <CardDescription>{item.description}</CardDescription>
                            )}
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm font-semibold">
                              ${item.price.toFixed(2)}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          )}
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="mb-16 px-6 pt-20">
          <h2 className="text-3xl font-bold mb-8">Gallery</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="relative h-64 overflow-hidden rounded-lg bg-primary/10"
              >
                {/* <Image
                src="/placeholder.svg"
                alt={`Gallery Image ${item}`}
                fill
                className="object-cover transition-transform hover:scale-105"
              /> */}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/50 px-12">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row py-7">
            <p className="text-sm text-muted-foreground">
              © 2024 Bring The Menu. All rights reserved.
            </p>
            {/* <Image
              src="/placeholder.svg"
              alt="Pizza Hut Logo"
              width={100}
              height={40}
              className="h-8 w-auto"
            /> */}

          </div>
      </footer>
    </div>
  );
}
