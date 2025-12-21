"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AuthForm } from "@/components/auth/auth-form";
import { useAuth } from "@/hooks/use-auth";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Loader2 } from "lucide-react";
import { GgvLogo } from "@/components/icons/ggv-logo";

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [authImage] = useState(PlaceHolderImages.find(img => img.id === 'auth-image'));

  useEffect(() => {
    if (!loading && user) {
      router.push("/occufind");
    }
  }, [user, loading, router]);

  if (loading || (!loading && user)) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
             <div className="flex items-center justify-center gap-2">
                <GgvLogo className="h-10 w-10 text-primary" />
                <h1 className="text-3xl font-bold font-headline">GGV PULSE</h1>
             </div>
            <p className="text-balance text-muted-foreground">
              Your smart campus companion
            </p>
          </div>
          <AuthForm />
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative">
        {authImage && (
             <Image
             src={authImage.imageUrl}
             alt={authImage.description}
             data-ai-hint={authImage.imageHint}
             fill
             className="object-cover"
           />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
      </div>
    </div>
  );
}
