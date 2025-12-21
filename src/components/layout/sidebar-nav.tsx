"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { GgvLogo } from "../icons/ggv-logo";

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="hidden border-r bg-card md:flex md:flex-col w-64">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/occufind" className="flex items-center gap-2 font-semibold font-headline">
          <GgvLogo className="h-8 w-8 text-primary" />
          <span>GGV PULSE</span>
        </Link>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Button
                asChild
                variant={pathname.startsWith(item.href) ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
