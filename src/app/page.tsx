"use client";
import {
  ArrowRight,
  ChevronRight,
  QrCode,
  Bell,
  Utensils,
  Clock,
  CreditCard,
  Menu,
  MenuSquare,
  Notebook,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCallback } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const scrollToSection = useCallback((elementId: string) => {
    const element = document.getElementById(elementId);
    element?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <header role="banner" className="px-4 lg:px-6 h-16 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <span className="ml-2 text-lg font-bold font-serif">
            Bring The Menu
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <button
            onClick={() => scrollToSection("features")}
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection("working")}
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            How it Works
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Contact
          </button>
          <button
            onClick={() => scrollToSection("register")}
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Get Started
          </button>
        </nav>
      </header>
      <main role="main" className="flex-1">
        <article>
          <section aria-labelledby="hero-heading" className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <h1 id="hero-heading" className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                      Transform Your Restaurant with Digital Menus
                    </h1>
                    <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                      Create QR code menus for your tables. Let customers order
                      directly from their phones. Receive instant notifications
                      for new orders.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <button
                      onClick={() => scrollToSection("register")}
                      className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                    <Link
                      className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                      href="#"
                    >
                      Learn more
                    </Link>
                  </div>
                </div>
                <Image
                  alt="Hero Image"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                  height="310"
                  src="/cover.webp"
                  width="550"
                />
              </div>
            </div>
          </section>
          <section
            id="working"
            className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
          >
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    How it Works
                  </h2>
                  <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Get your restaurant set up with digital menus in three simple
                    steps
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>1. Register & Setup</CardTitle>
                    <CardDescription>
                      Create your account and upload your menu items with prices
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-white">
                      <Utensils className="h-6 w-6" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>2. Generate QR Codes</CardTitle>
                    <CardDescription>
                      Create unique QR codes for each table in your
                      restaurant&apos;s branding
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-white">
                      <QrCode className="h-6 w-6" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>3. Receive Orders</CardTitle>
                    <CardDescription>
                      Get instant notifications when customers place orders
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-white">
                      <Bell className="h-6 w-6" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          <section id="features" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Key Features
                  </h2>
                  <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Everything you need to modernize your restaurant ordering
                    system
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <Clock className="h-6 w-6 text-primary" />
                    <CardTitle>Real-time Order Notifications</CardTitle>
                    <CardDescription>
                      Receive instant alerts when customers place orders,
                      including table numbers and order details
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <CreditCard className="h-6 w-6 text-primary" />
                    <CardTitle>Secure Payment Integration</CardTitle>
                    <CardDescription>
                      Accept payments directly through the digital menu system
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <QrCode className="h-6 w-6 text-primary" />
                    <CardTitle>Custom QR Codes</CardTitle>
                    <CardDescription>
                      Generate unique QR codes for each table with your
                      restaurant's branding
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <Utensils className="h-6 w-6 text-primary" />
                    <CardTitle>Menu Management</CardTitle>
                    <CardDescription>
                      Easily update menu items, prices, and availability in
                      real-time
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </section>
          <section
            id="register"
            className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
          >
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Get Started Today
                  </h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Register now and start modernizing your restaurant's ordering
                    system
                  </p>
                </div>
              </div>
              <div className="mx-auto max-w-sm space-y-4 py-12">
                <form className="space-y-4">
                  <Input placeholder="Restaurant Name" type="text" />
                  <Input placeholder="Email" type="email" />
                  <Input placeholder="Password" type="password" />
                  <Button className="w-full" type="submit">
                    Create Account
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    By creating an account, you agree to our Terms &amp;
                    Conditions and Privacy Policy
                  </p>
                </form>
              </div>
            </div>
          </section>
        </article>
      </main>
      <footer role="contentinfo" className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 BringTheMenu. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </>
  );
}
