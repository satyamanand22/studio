
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { GgvLogo } from '@/components/icons/ggv-logo';
import { Loader2, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

type Step = 'enter-email' | 'enter-otp' | 'success';
const MOCK_OTP = "123456";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>('enter-email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate sending an OTP
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    toast({
      title: 'OTP Sent',
      description: `An OTP has been sent to ${email}. (Hint: it's ${MOCK_OTP})`,
    });
    setStep('enter-otp');
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp !== MOCK_OTP) {
      toast({
        variant: 'destructive',
        title: 'Invalid OTP',
        description: 'The OTP you entered is incorrect. Please try again.',
      });
      return;
    }
    if (newPassword.length < 6) {
        toast({
            variant: 'destructive',
            title: 'Password Too Short',
            description: 'Your new password must be at least 6 characters long.',
        });
        return;
    }

    setLoading(true);
    // In a real app, you'd update the password in your backend
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setStep('success');
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="flex items-center justify-center gap-2">
            <GgvLogo className="h-10 w-10 text-primary" />
            <h1 className="text-3xl font-bold font-headline">GGV PULSE</h1>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Reset Your Password</CardTitle>
                <CardDescription>
                    {step === 'enter-email' && 'Enter your email to receive a password reset code.'}
                    {step === 'enter-otp' && `We've sent a code to ${email}.`}
                    {step === 'success' && 'Your password has been reset.'}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {step === 'enter-email' && (
                    <form onSubmit={handleEmailSubmit} className="space-y-4">
                        <div className="space-y-2 text-left">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Send OTP
                        </Button>
                    </form>
                )}

                {step === 'enter-otp' && (
                    <form onSubmit={handleOtpSubmit} className="space-y-4">
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
                         <div className="space-y-2 text-left">
                            <Label htmlFor="new-password">New Password</Label>
                            <Input
                                id="new-password"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter your new password"
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Reset Password
                        </Button>
                    </form>
                )}
                {step === 'success' && (
                    <div className="flex flex-col items-center justify-center gap-4 py-4 text-center">
                        <CheckCircle className="h-12 w-12 text-green-500" />
                        <h3 className="text-xl font-bold">Success!</h3>
                        <p className="text-muted-foreground">You can now log in with your new password.</p>
                        <Button onClick={() => router.push('/')} className="mt-4 w-full">
                            Back to Login
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
        {step !== 'success' && (
            <Button variant="link" onClick={() => router.push('/')}>
                Back to Login
            </Button>
        )}
      </div>
    </div>
  );
}
