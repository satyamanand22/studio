
import { cn } from "@/lib/utils";
import React from "react";

export function GgvLogo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-auto", className)}
      {...props}
    >
      <path d="M3 12h2l3 9 4-18 3 9h2" />
    </svg>
  );
}
