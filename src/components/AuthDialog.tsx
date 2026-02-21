"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { UserPlus, LogIn } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { AuthError } from '@/lib/firebase/auth';

// Google Icon SVG component
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

// Define form schemas
const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .max(254, { message: "Email address is too long" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const signupSchema = z.object({
  restaurantName: z
    .string()
    .min(2, { message: "Restaurant name must be at least 2 characters" })
    .max(100, { message: "Restaurant name must be less than 100 characters" })
    .regex(/^[a-zA-Z0-9\s\-'&.,()]+$/, {
      message: "Restaurant name contains invalid characters",
    }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .max(254, { message: "Email address is too long" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(128, { message: "Password must be less than 128 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number",
    }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

interface AuthDialogProps {
  children?: React.ReactNode;
  showDialog?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const AuthDialog = ({ children, showDialog, onOpenChange }: AuthDialogProps) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const { signIn, signUp, signInWithGoogle, restaurant } = useAuth();
  const router = useRouter();

  // Handle redirect when restaurant data is available
  useEffect(() => {
    if (shouldRedirect && restaurant?.id) {
      // Redirect to home page, which will automatically redirect to dashboard
      router.push("/");
      setShouldRedirect(false);
    }
  }, [shouldRedirect, restaurant, router]);

  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Signup form
  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      restaurantName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onLoginSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      await signIn({
        email: data.email,
        password: data.password,
      });
      toast.success('Login successful!');
      onOpenChange?.(false);
      setShouldRedirect(true);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof AuthError
          ? error.message
          : error instanceof Error
          ? error.message
          : "Failed to sign in. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const onSignupSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    try {
      await signUp({
        email: data.email,
        password: data.password,
        restaurantName: data.restaurantName,
      });
      toast.success('Account created successfully!');
      onOpenChange?.(false);
      setShouldRedirect(true);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof AuthError
          ? error.message
          : error instanceof Error
          ? error.message
          : "Failed to create account. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await signInWithGoogle();
      toast.success('Signed in with Google successfully!');
      onOpenChange?.(false);
      setShouldRedirect(true);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof AuthError
          ? error.message
          : error instanceof Error
          ? error.message
          : "Failed to sign in with Google. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <Dialog open={showDialog} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'login' ? 'Log in to your account' : 'Create an account'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'login' 
              ? 'Enter your email below to log in to your account' 
              : 'Enter your details below to create your account'}
          </DialogDescription>
        </DialogHeader>

        {mode === 'login' ? (
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col space-y-4">
                <Button 
                  type="submit" 
                  className="w-full btn-gradient text-white"
                  disabled={isLoading || isGoogleLoading}
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  {isLoading ? 'Signing in...' : 'Log In'}
                </Button>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleGoogleSignIn}
                  disabled={isLoading || isGoogleLoading}
                >
                  <GoogleIcon />
                  <span className="ml-2">{isGoogleLoading ? 'Signing in...' : 'Sign in with Google'}</span>
                </Button>

                <div className="text-center text-sm">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode('signup')}
                    className="text-purple-DEFAULT hover:underline"
                  >
                    Sign up
                  </button>
                </div>
              </div>
            </form>
          </Form>
        ) : (
          <Form {...signupForm}>
            <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
              <FormField
                control={signupForm.control}
                name="restaurantName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Restaurant Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your restaurant name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signupForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signupForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Create a password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signupForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Confirm your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col space-y-4">
                <Button 
                  type="submit" 
                  className="w-full btn-gradient text-white"
                  disabled={isLoading || isGoogleLoading}
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleGoogleSignIn}
                  disabled={isLoading || isGoogleLoading}
                >
                  <GoogleIcon />
                  <span className="ml-2">{isGoogleLoading ? 'Signing up...' : 'Sign up with Google'}</span>
                </Button>

                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="text-purple-DEFAULT hover:underline"
                  >
                    Log in
                  </button>
                </div>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
