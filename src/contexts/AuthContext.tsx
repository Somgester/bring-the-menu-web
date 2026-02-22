"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import {
  signIn as firebaseSignIn,
  signUp as firebaseSignUp,
  signOutUser,
  resetPassword,
  signInWithGoogle as firebaseSignInWithGoogle,
} from "@/lib/firebase/auth";
import { SignUpData, SignInData } from "@/lib/firebase/auth";
import {
  getRestaurantByUserId,
  createRestaurant,
  Restaurant,
  createOrUpdateUserRecord,
} from "@/lib/firebase/firestore";
import { AuthError } from "@/lib/firebase/auth";
import { sanitizeErrorMessage, logSecurityEvent } from "@/lib/utils/security";

interface AuthContextType {
  user: User | null;
  restaurant: Restaurant | null;
  loading: boolean;
  signUp: (data: SignUpData) => Promise<void>;
  signIn: (data: SignInData) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if Firebase is configured before trying to use it
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    };

    // If Firebase is not configured, skip auth check and show landing page
    if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
      console.warn("Firebase not configured - showing landing page");
      setLoading(false);
      setUser(null);
      setRestaurant(null);
      return;
    }

    try {
      // Only use auth if Firebase is configured
      if (!auth || !firebaseConfig.apiKey) {
        setLoading(false);
        setUser(null);
        setRestaurant(null);
        return;
      }
      
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        setUser(user);
        
        if (user) {
          // Fetch restaurant data when user is logged in
          try {
            const restaurantData = await getRestaurantByUserId(user.uid);
            setRestaurant(restaurantData);
          } catch (error) {
            console.error("Error fetching restaurant:", error);
            setRestaurant(null);
          }
        } else {
          setRestaurant(null);
        }
        
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (error) {
      console.error("Error initializing auth:", error);
      // If auth fails, still show landing page
      setLoading(false);
      setUser(null);
      setRestaurant(null);
    }
  }, []);

  /**
   * Handle user sign up
   * Creates user account, restaurant document, and user tracking record
   */
  const handleSignUp = async (data: SignUpData): Promise<void> => {
    try {
      const userCredential = await firebaseSignUp(data);
      const user = userCredential.user;

      // Create restaurant document in Firestore
      try {
        await createRestaurant(user.uid, {
          name: data.restaurantName,
          email: data.email,
        });
        // Fetch the created restaurant to update state
        const restaurantData = await getRestaurantByUserId(user.uid);
        if (restaurantData) {
          setRestaurant(restaurantData);
        }
      } catch (error) {
        logSecurityEvent("restaurant_creation_failed", {
          userId: user.uid,
          error: sanitizeErrorMessage(error),
        });
        console.error("Error creating restaurant:", error);
        // Don't throw - user is already created, restaurant can be created later
      }

      // Create user record for tracking login times
      try {
        await createOrUpdateUserRecord(user.uid, data.email, data.restaurantName);
      } catch (error) {
        logSecurityEvent("user_record_creation_failed", {
          userId: user.uid,
          error: sanitizeErrorMessage(error),
        });
        console.error("Error creating user record:", error);
        // Don't throw - tracking data, shouldn't block signup
      }
    } catch (error) {
      // Re-throw AuthError as-is, wrap others
      if (error instanceof AuthError) {
        throw error;
      }
      throw new Error(sanitizeErrorMessage(error));
    }
  };

  /**
   * Handle user sign in
   * Authenticates user and updates login tracking
   */
  const handleSignIn = async (data: SignInData): Promise<void> => {
    try {
      const userCredential = await firebaseSignIn(data);
      const user = userCredential.user;

      // Fetch restaurant data immediately after login
      try {
        const restaurantData = await getRestaurantByUserId(user.uid);
        if (restaurantData) {
          setRestaurant(restaurantData);
        }
      } catch (error) {
        logSecurityEvent("restaurant_fetch_failed", {
          userId: user.uid,
          error: sanitizeErrorMessage(error),
        });
        console.error("Error fetching restaurant:", error);
      }

      // Update user login record
      try {
        await createOrUpdateUserRecord(user.uid, user.email || data.email);
      } catch (error) {
        logSecurityEvent("login_tracking_failed", {
          userId: user.uid,
          error: sanitizeErrorMessage(error),
        });
        console.error("Error updating user login record:", error);
        // Don't throw - tracking data, shouldn't block login
      }
    } catch (error) {
      // Re-throw AuthError as-is, wrap others
      if (error instanceof AuthError) {
        throw error;
      }
      throw new Error(sanitizeErrorMessage(error));
    }
  };

  /**
   * Handle Google OAuth sign in
   * Authenticates user via Google and creates restaurant if needed
   */
  const handleSignInWithGoogle = async (): Promise<void> => {
    try {
      const userCredential = await firebaseSignInWithGoogle();
      const user = userCredential.user;

      // Check if restaurant exists, if not create one
      try {
        let restaurantData = await getRestaurantByUserId(user.uid);

        if (!restaurantData) {
          // Create restaurant document for new Google sign-in users
          const restaurantName =
            user.displayName || user.email?.split("@")[0] || "My Restaurant";
          await createRestaurant(user.uid, {
            name: restaurantName,
            email: user.email || "",
          });
          // Fetch the created restaurant
          restaurantData = await getRestaurantByUserId(user.uid);
        }

        if (restaurantData) {
          setRestaurant(restaurantData);
        }
      } catch (error) {
        logSecurityEvent("google_restaurant_creation_failed", {
          userId: user.uid,
          error: sanitizeErrorMessage(error),
        });
        console.error("Error handling restaurant for Google sign-in:", error);
        // Don't throw - user is signed in, restaurant can be created later
      }

      // Update user login record
      try {
        const restaurantData = await getRestaurantByUserId(user.uid);
        await createOrUpdateUserRecord(
          user.uid,
          user.email || "",
          restaurantData?.name
        );
      } catch (error) {
        logSecurityEvent("google_login_tracking_failed", {
          userId: user.uid,
          error: sanitizeErrorMessage(error),
        });
        console.error("Error updating user login record:", error);
        // Don't throw - tracking data, shouldn't block login
      }
    } catch (error) {
      // Re-throw AuthError as-is, wrap others
      if (error instanceof AuthError) {
        throw error;
      }
      throw new Error(sanitizeErrorMessage(error));
    }
  };

  /**
   * Handle user logout
   */
  const handleLogout = async (): Promise<void> => {
    try {
      await signOutUser();
      setRestaurant(null);
    } catch (error) {
      if (error instanceof AuthError) {
        throw error;
      }
      throw new Error(sanitizeErrorMessage(error));
    }
  };

  /**
   * Handle password reset request
   */
  const handleResetPassword = async (email: string): Promise<void> => {
    try {
      await resetPassword(email);
    } catch (error) {
      if (error instanceof AuthError) {
        throw error;
      }
      throw new Error(sanitizeErrorMessage(error));
    }
  };

  const value: AuthContextType = {
    user,
    restaurant,
    loading,
    signUp: handleSignUp,
    signIn: handleSignIn,
    signInWithGoogle: handleSignInWithGoogle,
    logout: handleLogout,
    resetPassword: handleResetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
