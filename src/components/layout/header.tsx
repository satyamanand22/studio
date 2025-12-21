
"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navItems } from "@/lib/data";
import { GgvLogo } from "../icons/ggv-logo";
import { UserNav } from "./user-nav";

export default function Header() {
  return (
    <header className="flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur-sm px-4 md:px-6 sticky top-0 z-30">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link href="/occufind" className="flex items-center gap-2 text-lg font-semibold mb-4">
                <GgvLogo className="h-8 w-8 text-primary" />
                <span className="">GGV PULSE</span>
              </Link>
              {navItems.map(item => (
                 <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                    <item.icon className="h-4 w-4" />
                    {item.label}
                 </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </nav>
       <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="/occufind"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <GgvLogo className="h-8 w-8 text-primary" />
                <span className="sr-only">GGV PULSE</span>
              </Link>
              {navItems.map(item => (
                 <Link key={item.href} href={item.href} className="text-muted-foreground hover:text-foreground">
                    {item.label}
                 </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center justify-between">
            <div className="flex flex-col">
                <h1 className="text-lg font-semibold md:text-xl font-headline">OCCUFIND</h1>
                <p className="text-xs text-muted-foreground hidden md:block">(A simple way to access library)</p>
            </div>
            <UserNav />
        </div>
    </header>
  );
}
