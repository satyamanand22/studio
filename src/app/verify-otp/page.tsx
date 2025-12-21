"use client";

import { useState }from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { GgvLogo } from "@/components/icons/ggv-logo";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";

const MOCK_OTP = "123456";

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { verifyAndLogin } = useAuth();
  const { toast } = useToast();

  const email = searchParams.get("email");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
       toast({
        variant: "destructive",
        title: "Verification Failed",
        description: "Email not found. Please try signing up again.",
      });
      router.push("/");
      return;
    }

    setLoading(true);
    // In a real app, you'd verify the OTP against a backend service.
    // Here we just simulate it.
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (otp === MOCK_OTP) {
      try {
        await verifyAndLogin(email);
        toast({
          title: "Verification Successful",
          description: "You are now logged in.",
        });
        router.push("/dashboard");
      } catch (error) {
        setLoading(false);
        toast({
            variant: "destructive",
            title: "Login Failed",
            description: (error as Error).message,
        });
      }
    } else {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Invalid OTP",
        description: "The OTP you entered is incorrect. Please try again.",
      });
    }
  };

  if (!email) {
    // Handle case where email is not in the query param, maybe redirect
    if (typeof window !== "undefined") {
        router.replace("/");
    }
    return (
         <div className="flex h-screen w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
        </div>
    );
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-6 text-center">
         <div className="flex items-center justify-center gap-2">
            <GgvLogo className="h-10 w-10 text-primary" />
            <h1 className="text-3xl font-bold font-headline">GGV PULSE</h1>
         </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">Verify Your Account</h2>
          <p className="text-muted-foreground">
            An OTP has been sent to <span className="font-medium text-foreground">{email}</span>.
            (Hint: for now, the OTP is <span className="font-bold">{MOCK_OTP}</span>)
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2 text-left">
            <Label htmlFor="otp">One-Time Password</Label>
            <Input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter your 6-digit OTP"
              required
              maxLength={6}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Verify Account
          </Button>
        </form>
         <Button variant="link" onClick={() => router.push("/")}>
            Back to Login
        </Button>
      </div>
    </div>
  );
}
