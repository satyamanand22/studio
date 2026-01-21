import type { Metadata } from "next";
import { Inter, Lexend } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-provider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { FirebaseClientProvider } from "@/firebase/client-provider";

const fontBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const fontHeadline = Lexend({
  subsets: ["latin"],
  variable: "--font-headline",
  weight: "700"
});

export const metadata: Metadata = {
  title: "GGV PULSE",
  description: "Your Smart Campus Companion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
       <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Lexend:wght@700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased", fontBody.variable, fontHeadline.variable)}>
            <AuthProvider>
              <FirebaseClientProvider>
                {children}
              </FirebaseClientProvider>
            <Toaster />
            </AuthProvider>
      </body>
    </html>
  );
}
