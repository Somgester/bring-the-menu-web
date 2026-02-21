"use client";
import React from "react";
import { Clock, MapPin, Phone, Mail } from "lucide-react";
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
interface RestaurantPageProps {
  params: Promise<{ restaurant: string }>;
}

export default function RestaurantPage({
  params,
}: Readonly<RestaurantPageProps>) {
  const router = useRouter();
  const { restaurant } = React.use(params);

  return (
    <div className="min-h-screen bg-background  ">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-20 items-center justify-between  px-4">
          <div className="flex items-center gap-6 ">
            {/* <Image src="/placeholder.svg" alt="Pizza Hut Logo" width={50} height={50} className="rounded" /> */}
            <div className=" w-12 h-12 rounded-lg bg-primary/10"></div>
            <div>
              <h1 className="text-xl font-semibold">{restaurant}</h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                Ambala City Center
                <span className="mx-2">•</span>
                <Clock className="h-4 w-4" />
                Open until 11 PM
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
                    About Pizza Hut Ambala
                  </h2>
                  <p className="text-muted-foreground">
                    Since our founding in 1958, Pizza Hut has been committed to
                    serving the finest quality pizzas. Our Ambala location
                    brings together traditional recipes with modern dining
                    comfort.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Hours</h3>
                      <p className="text-sm text-muted-foreground">
                        11:00 AM - 11:00 PM
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Contact</h3>
                      <p className="text-sm text-muted-foreground">
                        +91 1234567890
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-sm text-muted-foreground">
                        ambala@pizzahut.com
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Location</h3>
                  <p className="text-sm text-muted-foreground">
                    Pizza Hut, City Center Mall
                    <br />
                    Ambala City, Haryana
                    <br />
                    India - 134003
                  </p>
                </div>
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
          <Tabs defaultValue="pizzas">
            <TabsList className="mb-8">
              <TabsTrigger value="pizzas">Pizzas</TabsTrigger>
              <TabsTrigger value="starters">Starters</TabsTrigger>
              <TabsTrigger value="pasta">Pasta</TabsTrigger>
              <TabsTrigger value="desserts">Desserts</TabsTrigger>
              <TabsTrigger value="beverages">Beverages</TabsTrigger>
            </TabsList>
            <TabsContent value="pizzas">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[
                  "Margherita Supreme",
                  "Pepperoni Feast",
                  "Veggie Paradise",
                  "BBQ Chicken",
                  "Mexican Green Wave",
                  "Cheese n Corn",
                ].map((pizza) => (
                  <Card key={pizza}>
                    <div className="relative h-48 rounded-lg bg-primary/10">
                      {/* <Image src="/placeholder.svg" alt={pizza} fill className="rounded-t-lg object-cover" /> */}
                    </div>
                    <CardHeader>
                      <CardTitle>{pizza}</CardTitle>
                      <CardDescription>
                        Available in Pan, Thin, and Stuffed Crust
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Starting from ₹299
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
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
