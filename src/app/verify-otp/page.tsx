
import { Suspense } from "react";
import VerifyOtpClient from "@/components/auth/verify-otp-client";

export const dynamic = "force-dynamic";

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOtpClient />
    </Suspense>
  );
}
