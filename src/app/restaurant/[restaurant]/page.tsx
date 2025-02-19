"use client";
import React from "react";
import { Clock, MapPin, Phone, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
interface RestaurantPageProps {
  params: Promise<{ restaurant: string }>
}

export default function RestaurantPage({ params }: Readonly<RestaurantPageProps>) {
  const { restaurant } = React.use(params);

  return (
    <div className="min-h-screen bg-background">
    {/* Header */}
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-6">
          {/* <Image src="/placeholder.svg" alt="Pizza Hut Logo" width={50} height={50} className="rounded" /> */}
          <div className="ml-4 w-12 h-12 rounded-lg bg-primary/10">
             </div>
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
            Info
          </a>
          <a href="#menu" className="text-sm font-medium">
            Menu
          </a>
          <a href="#gallery" className="text-sm font-medium">
            Gallery
          </a>
          <Link href="/dashboard">
            <Button>Login to Order</Button>
          </Link>
        </nav>
      </div>
    </header>

    <main className="container  ">
      {/* Restaurant Info Section */}
      <section id="info" className="mb-12">
        <Card>
          <CardContent className="grid gap-6 p-6 md:grid-cols-[2fr_1fr] ">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">About Pizza Hut Ambala</h2>
                <p className="text-muted-foreground">
                  Since our founding in 1958, Pizza Hut has been committed to serving the finest quality pizzas. Our
                  Ambala location brings together traditional recipes with modern dining comfort.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Hours</h3>
                    <p className="text-sm text-muted-foreground">11:00 AM - 11:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Contact</h3>
                    <p className="text-sm text-muted-foreground">+91 1234567890</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-sm text-muted-foreground">ambala@pizzahut.com</p>
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
      <section id="menu" className="mb-16 p-6">
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
                    <CardDescription>Available in Pan, Thin, and Stuffed Crust</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Starting from ₹299</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="mb-16 p-6">
        <h2 className="text-3xl font-bold mb-8">Gallery</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="relative h-64 overflow-hidden rounded-lg bg-primary/10">
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
      <div className="container py-8">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="font-semibold mb-4">About Pizza Hut</h3>
            <nav className="flex flex-col gap-2">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                Our Story
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                Careers
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                Franchising
              </a>
            </nav>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Customer Service</h3>
            <nav className="flex flex-col gap-2">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                Contact Us
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                FAQs
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                Store Locator
              </a>
            </nav>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <nav className="flex flex-col gap-2">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                Accessibility
              </a>
            </nav>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Connect With Us</h3>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.772-1.153c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">© 2024 Pizza Hut International. All rights reserved.</p>
          <Image src="/placeholder.svg" alt="Pizza Hut Logo" width={100} height={40} className="h-8 w-auto" />
        </div>
      </div>
    </footer>
  </div>
  );
}
