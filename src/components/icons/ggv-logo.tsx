
import { cn } from "@/lib/utils";
import React from "react";

export function GgvLogo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-auto", className)}
      {...props}
    >
        <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2"/>
        <path d="M14 24C14 18.4772 18.4772 14 24 14C29.5228 14 34 18.4772 34 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M19 34V22L24 26L29 22V34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24 30L19 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M24 30L29 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M24 34V30" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M21 14C21 12.3431 22.3431 11 24 11C25.6569 11 27 12.3431 27 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
