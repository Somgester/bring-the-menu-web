import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  User,
  UserCredential,
} from "firebase/auth";
import { auth } from "./config";
import { validateEmail, validatePassword, validateRestaurantName } from "@/lib/utils/validation";
import { sanitizeErrorMessage } from "@/lib/utils/security";

export interface SignUpData {
  email: string;
  password: string;
  restaurantName: string;
}

export interface SignInData {
  email: string;
  password: string;
}

/**
 * Custom error class for authentication errors
 */
export class AuthError extends Error {
  constructor(
    message: string,
    public code: string,
    public originalError?: unknown
  ) {
    super(message);
    this.name = "AuthError";
  }
}

/**
 * Create a new user account with email and password
 * @throws {AuthError} If validation fails or Firebase auth fails
 */
export async function signUp({
  email,
  password,
  restaurantName,
}: SignUpData): Promise<UserCredential> {
  // Validate inputs
  const emailValidation = validateEmail(email);
  if (!emailValidation.isValid) {
    throw new AuthError("Invalid email address", "auth/invalid-email");
  }

  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    throw new AuthError(
      passwordValidation.errors.join(". "),
      "auth/weak-password"
    );
  }

  const nameValidation = validateRestaurantName(restaurantName);
  if (!nameValidation.isValid) {
    throw new AuthError(
      nameValidation.errors.join(". "),
      "auth/invalid-display-name"
    );
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      emailValidation.sanitized,
      password
    );

    // Update user profile with restaurant name
    if (userCredential.user) {
      await updateProfile(userCredential.user, {
        displayName: nameValidation.sanitized,
      });
    }

    return userCredential;
  } catch (error: unknown) {
    const firebaseError = error as { code?: string };
    const errorCode = firebaseError?.code || "auth/unknown-error";
    throw new AuthError(
      getAuthErrorMessage(errorCode),
      errorCode,
      error
    );
  }
}

/**
 * Sign in an existing user with email and password
 * @throws {AuthError} If validation fails or Firebase auth fails
 */
export async function signIn({
  email,
  password,
}: SignInData): Promise<UserCredential> {
  // Validate email
  const emailValidation = validateEmail(email);
  if (!emailValidation.isValid) {
    throw new AuthError("Invalid email address", "auth/invalid-email");
  }

  // Basic password validation
  if (!password || password.length < 6) {
    throw new AuthError(
      "Password must be at least 6 characters",
      "auth/weak-password"
    );
  }

  try {
    return await signInWithEmailAndPassword(
      auth,
      emailValidation.sanitized,
      password
    );
  } catch (error: unknown) {
    const firebaseError = error as { code?: string };
    const errorCode = firebaseError?.code || "auth/unknown-error";
    throw new AuthError(
      getAuthErrorMessage(errorCode),
      errorCode,
      error
    );
  }
}

/**
 * Sign out the current user
 * @throws {AuthError} If sign out fails
 */
export async function signOutUser(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error: unknown) {
    const firebaseError = error as { code?: string };
    const errorCode = firebaseError?.code || "auth/unknown-error";
    throw new AuthError(
      getAuthErrorMessage(errorCode),
      errorCode,
      error
    );
  }
}

/**
 * Send a password reset email
 * @throws {AuthError} If validation fails or Firebase auth fails
 */
export async function resetPassword(email: string): Promise<void> {
  const emailValidation = validateEmail(email);
  if (!emailValidation.isValid) {
    throw new AuthError("Invalid email address", "auth/invalid-email");
  }

  try {
    await sendPasswordResetEmail(auth, emailValidation.sanitized);
  } catch (error: unknown) {
    const firebaseError = error as { code?: string };
    const errorCode = firebaseError?.code || "auth/unknown-error";
    throw new AuthError(
      getAuthErrorMessage(errorCode),
      errorCode,
      error
    );
  }
}

/**
 * Sign in with Google OAuth provider
 * @throws {AuthError} If Google sign-in fails
 */
export async function signInWithGoogle(): Promise<UserCredential> {
  try {
    const provider = new GoogleAuthProvider();
    // Request only necessary scopes
    provider.addScope("profile");
    provider.addScope("email");
    // Set custom parameters for better UX
    provider.setCustomParameters({
      prompt: "select_account",
    });

    return await signInWithPopup(auth, provider);
  } catch (error: unknown) {
    const firebaseError = error as { code?: string };
    const errorCode = firebaseError?.code || "auth/unknown-error";
    
    // Don't throw error if user closed the popup
    if (errorCode === "auth/popup-closed-by-user") {
      throw new AuthError(
        getAuthErrorMessage(errorCode),
        errorCode,
        error
      );
    }

    throw new AuthError(
      getAuthErrorMessage(errorCode),
      errorCode,
      error
    );
  }
}

/**
 * Get the current user
 */
export function getCurrentUser(): User | null {
  return auth.currentUser;
}

/**
 * Convert Firebase auth error codes to user-friendly messages
 * Maps Firebase error codes to user-friendly error messages
 */
function getAuthErrorMessage(errorCode: string): string {
  const errorMessages: Record<string, string> = {
    "auth/email-already-in-use":
      "An account with this email already exists.",
    "auth/invalid-email": "Invalid email address.",
    "auth/operation-not-allowed": "This operation is not allowed. Please contact support.",
    "auth/weak-password": "Password should be at least 8 characters and include uppercase, lowercase, and numbers.",
    "auth/user-disabled": "This account has been disabled. Please contact support.",
    "auth/user-not-found": "No account found with this email address.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/too-many-requests":
      "Too many failed attempts. Please try again later.",
    "auth/network-request-failed":
      "Network error. Please check your internet connection and try again.",
    "auth/invalid-credential": "Invalid email or password.",
    "auth/popup-closed-by-user": "Sign-in was cancelled.",
    "auth/popup-blocked": "Popup was blocked by your browser. Please allow popups for this site.",
    "auth/cancelled-popup-request": "Only one sign-in request is allowed at a time.",
    "auth/account-exists-with-different-credential":
      "An account already exists with the same email address but different sign-in method.",
    "auth/invalid-display-name": "Invalid restaurant name.",
    "auth/unknown-error": "An unexpected error occurred. Please try again.",
  };

  return (
    errorMessages[errorCode] ||
    "An error occurred. Please try again."
  );
}
