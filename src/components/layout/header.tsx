"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navItems } from "@/lib/data";
import { GgvLogo } from "../icons/ggv-logo";

export default function Header() {
  return (
    <header className="flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6 sticky top-0 z-10">
      <nav className="flex-1 flex items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link href="/dashboard" className="flex items-center gap-2 text-lg font-semibold mb-4">
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
    </header>
  );
}
