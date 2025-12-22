
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().optional(),
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  role: z.enum(['student', 'admin']).optional(),
  ggvEnrollmentNumber: z.string().optional(),
});

export function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const { signIn, signUp, signInWithGoogle, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "student",
      ggvEnrollmentNumber: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (isSignUp) {
        await signUp(values.name!, values.email, values.password, values.role!);
        toast({
          title: "Account created successfully",
          description: "Please check your email to verify your account.",
        });
        // The signUp function will handle redirection
      } else {
        await signIn(values.email, values.password);
        toast({
          title: "Logged in successfully",
          description: "Redirecting to your dashboard...",
        });
        router.push("/libeasy");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Authentication failed",
        description: (error as Error).message || "An unexpected error occurred.",
      });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast({
        title: "Logged in with Google",
        description: "Redirecting to your dashboard...",
      });
      router.push("/libeasy");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Google Login failed",
        description: (error as Error).message || "An unexpected error occurred.",
      });
    }
  }

  return (
    <div className="grid gap-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          {isSignUp && (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="name@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center">
                  <FormLabel>Password</FormLabel>
                  {!isSignUp && (
                    <Link
                      href="/forgot-password"
                      className="ml-auto inline-block text-sm underline"
                    >
                      Forgot your password?
                    </Link>
                  )}
                </div>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           {isSignUp && (
            <>
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.watch('role') === 'student' && (
                <FormField
                  control={form.control}
                  name="ggvEnrollmentNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GGV Enrollment Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Your GGV Enrollment Number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSignUp ? "Sign Up" : "Login"}
          </Button>
          <Button variant="outline" type="button" className="w-full" onClick={handleGoogleSignIn} disabled={loading}>
            Login with Google
          </Button>
        </form>
      </Form>
      <div className="mt-4 text-center text-sm">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}
        <button onClick={() => setIsSignUp(!isSignUp)} className="underline ml-1">
          {isSignUp ? "Login" : "Sign up"}
        </button>
      </div>
    </div>
  );
}
