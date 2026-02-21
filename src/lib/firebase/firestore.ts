import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDocs,
  addDoc,
  Timestamp,
  DocumentData,
  QueryConstraint,
  onSnapshot,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "./config";
import { sanitizeString, validateRestaurantName, validateEmail } from "@/lib/utils/validation";

// Collection names
export const COLLECTIONS = {
  RESTAURANTS: "restaurants",
  MENUS: "menus",
  ORDERS: "orders",
  TABLES: "tables",
  USERS: "users",
} as const;

// Restaurant data structure
export interface Restaurant {
  id: string;
  name: string;
  email: string;
  userId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  settings?: {
    currency?: string;
    taxRate?: number;
    serviceCharge?: number;
  };
}

// Menu item structure
export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  imageUrl?: string;
  available: boolean;
  isVegetarian?: boolean;
  restaurantId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Order structure
export interface Order {
  id: string;
  restaurantId: string;
  tableNumber: string;
  items: Array<{
    menuItemId: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  status: "pending" | "preparing" | "ready" | "completed" | "cancelled";
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Table structure
export interface Table {
  id: string;
  restaurantId: string;
  tableNumber: string;
  qrCodeUrl: string;
  createdAt: Timestamp;
}

// User tracking structure
export interface UserRecord {
  id: string;
  userId: string;
  email: string;
  restaurantName?: string;
  signUpTime: Timestamp;
  lastLoginTime: Timestamp;
  loginCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Restaurant Profile structure
export interface RestaurantProfile {
  id: string;
  restaurantId: string;
  name: string;
  location?: string;
  openingHours?: string;
  description?: string;
  phone?: string;
  email?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Dashboard Statistics
export interface DashboardStats {
  activeTables: number;
  todaysOrders: number;
  todaysRevenue: number;
  pendingOrders: number;
}

/**
 * Create a new restaurant document
 * @throws {Error} If validation fails or Firestore operation fails
 */
export async function createRestaurant(
  userId: string,
  restaurantData: Omit<Restaurant, "id" | "userId" | "createdAt" | "updatedAt">
): Promise<string> {
  // Validate and sanitize inputs
  const nameValidation = validateRestaurantName(restaurantData.name);
  if (!nameValidation.isValid) {
    throw new Error(nameValidation.errors.join(". "));
  }

  const emailValidation = validateEmail(restaurantData.email);
  if (!emailValidation.isValid) {
    throw new Error("Invalid email address");
  }

  try {
    const restaurantRef = doc(collection(db, COLLECTIONS.RESTAURANTS));
    const now = Timestamp.now();

    await setDoc(restaurantRef, {
      name: nameValidation.sanitized,
      email: emailValidation.sanitized,
      userId,
      createdAt: now,
      updatedAt: now,
      settings: restaurantData.settings || {},
    });

    return restaurantRef.id;
  } catch (error) {
    console.error("Error creating restaurant:", error);
    throw new Error("Failed to create restaurant");
  }
}

/**
 * Get a restaurant by ID
 */
export async function getRestaurant(
  restaurantId: string
): Promise<Restaurant | null> {
  try {
    const restaurantRef = doc(db, COLLECTIONS.RESTAURANTS, restaurantId);
    const restaurantSnap = await getDoc(restaurantRef);

    if (restaurantSnap.exists()) {
      return {
        id: restaurantSnap.id,
        ...restaurantSnap.data(),
      } as Restaurant;
    }

    return null;
  } catch (error) {
    console.error("Error getting restaurant:", error);
    throw new Error("Failed to get restaurant");
  }
}

/**
 * Get a restaurant by user ID
 */
export async function getRestaurantByUserId(
  userId: string
): Promise<Restaurant | null> {
  try {
    const q = query(
      collection(db, COLLECTIONS.RESTAURANTS),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data(),
      } as Restaurant;
    }

    return null;
  } catch (error) {
    console.error("Error getting restaurant by user ID:", error);
    throw new Error("Failed to get restaurant");
  }
}

/**
 * Update a restaurant document
 */
export async function updateRestaurant(
  restaurantId: string,
  updates: Partial<Restaurant>
): Promise<void> {
  try {
    const restaurantRef = doc(db, COLLECTIONS.RESTAURANTS, restaurantId);
    await updateDoc(restaurantRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error updating restaurant:", error);
    throw new Error("Failed to update restaurant");
  }
}

/**
 * Create a menu item
 */
export async function createMenuItem(
  restaurantId: string,
  itemData: Omit<MenuItem, "id" | "restaurantId" | "createdAt" | "updatedAt">
): Promise<string> {
  try {
    const menuRef = collection(db, COLLECTIONS.MENUS);
    const now = Timestamp.now();

    const docRef = await addDoc(menuRef, {
      ...itemData,
      restaurantId,
      createdAt: now,
      updatedAt: now,
    });

    return docRef.id;
  } catch (error) {
    console.error("Error creating menu item:", error);
    throw new Error("Failed to create menu item");
  }
}

/**
 * Get all menu items for a restaurant
 */
export async function getMenuItems(
  restaurantId: string
): Promise<MenuItem[]> {
  try {
    const q = query(
      collection(db, COLLECTIONS.MENUS),
      where("restaurantId", "==", restaurantId)
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as MenuItem[];
  } catch (error) {
    console.error("Error getting menu items:", error);
    throw new Error("Failed to get menu items");
  }
}

/**
 * Create an order
 */
export async function createOrder(
  orderData: Omit<Order, "id" | "createdAt" | "updatedAt">
): Promise<string> {
  try {
    const ordersRef = collection(db, COLLECTIONS.ORDERS);
    const now = Timestamp.now();

    const docRef = await addDoc(ordersRef, {
      ...orderData,
      createdAt: now,
      updatedAt: now,
    });

    return docRef.id;
  } catch (error) {
    console.error("Error creating order:", error);
    throw new Error("Failed to create order");
  }
}

/**
 * Get orders for a restaurant
 */
export async function getRestaurantOrders(
  restaurantId: string,
  status?: Order["status"]
): Promise<Order[]> {
  try {
    const constraints: QueryConstraint[] = [
      where("restaurantId", "==", restaurantId),
    ];

    if (status) {
      constraints.push(where("status", "==", status));
    }

    const q = query(collection(db, COLLECTIONS.ORDERS), ...constraints);
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Order[];
  } catch (error) {
    console.error("Error getting orders:", error);
    throw new Error("Failed to get orders");
  }
}

/**
 * Update order status
 */
export async function updateOrderStatus(
  orderId: string,
  status: Order["status"]
): Promise<void> {
  try {
    const orderRef = doc(db, COLLECTIONS.ORDERS, orderId);
    await updateDoc(orderRef, {
      status,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    throw new Error("Failed to update order status");
  }
}

/**
 * Create a table with QR code
 */
export async function createTable(
  restaurantId: string,
  tableNumber: string,
  qrCodeUrl: string
): Promise<string> {
  try {
    const tablesRef = collection(db, COLLECTIONS.TABLES);
    const docRef = await addDoc(tablesRef, {
      restaurantId,
      tableNumber,
      qrCodeUrl,
      createdAt: Timestamp.now(),
    });

    return docRef.id;
  } catch (error) {
    console.error("Error creating table:", error);
    throw new Error("Failed to create table");
  }
}

/**
 * Get all tables for a restaurant
 */
export async function getRestaurantTables(
  restaurantId: string
): Promise<Table[]> {
  try {
    const q = query(
      collection(db, COLLECTIONS.TABLES),
      where("restaurantId", "==", restaurantId)
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Table[];
  } catch (error) {
    console.error("Error getting tables:", error);
    throw new Error("Failed to get tables");
  }
}

/**
 * Create or update user record for tracking login times
 * Sanitizes inputs before storing
 */
export async function createOrUpdateUserRecord(
  userId: string,
  email: string,
  restaurantName?: string
): Promise<void> {
  // Validate and sanitize inputs
  const emailValidation = validateEmail(email);
  if (!emailValidation.isValid) {
    console.error("Invalid email for user record:", email);
    return; // Don't throw - tracking data
  }

  let sanitizedRestaurantName: string | null = null;
  if (restaurantName) {
    const nameValidation = validateRestaurantName(restaurantName);
    if (nameValidation.isValid) {
      sanitizedRestaurantName = nameValidation.sanitized;
    }
  }

  try {
    const userRef = doc(db, COLLECTIONS.USERS, userId);
    const userSnap = await getDoc(userRef);
    const now = Timestamp.now();

    if (userSnap.exists()) {
      // Update existing user record
      const currentData = userSnap.data() as UserRecord;
      await updateDoc(userRef, {
        lastLoginTime: now,
        loginCount: (currentData.loginCount || 0) + 1,
        updatedAt: now,
        ...(sanitizedRestaurantName && { restaurantName: sanitizedRestaurantName }),
      });
    } else {
      // Create new user record
      await setDoc(userRef, {
        userId,
        email: emailValidation.sanitized,
        restaurantName: sanitizedRestaurantName,
        signUpTime: now,
        lastLoginTime: now,
        loginCount: 1,
        createdAt: now,
        updatedAt: now,
      });
    }
  } catch (error) {
    console.error("Error creating/updating user record:", error);
    // Don't throw - this is tracking data, shouldn't block auth flow
  }
}

/**
 * Get user record by user ID
 */
export async function getUserRecord(userId: string): Promise<UserRecord | null> {
  try {
    const userRef = doc(db, COLLECTIONS.USERS, userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return {
        id: userSnap.id,
        ...userSnap.data(),
      } as UserRecord;
    }

    return null;
  } catch (error) {
    console.error("Error getting user record:", error);
    return null;
  }
}

// ==================== MENU MANAGEMENT ====================

/**
 * Update a menu item
 */
export async function updateMenuItem(
  menuItemId: string,
  updates: Partial<MenuItem>
): Promise<void> {
  try {
    const menuRef = doc(db, COLLECTIONS.MENUS, menuItemId);
    await updateDoc(menuRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error updating menu item:", error);
    throw new Error("Failed to update menu item");
  }
}

/**
 * Delete a menu item
 */
export async function deleteMenuItem(menuItemId: string): Promise<void> {
  try {
    const menuRef = doc(db, COLLECTIONS.MENUS, menuItemId);
    await deleteDoc(menuRef);
  } catch (error) {
    console.error("Error deleting menu item:", error);
    throw new Error("Failed to delete menu item");
  }
}

/**
 * Get menu items grouped by category
 */
export async function getMenuItemsByCategory(
  restaurantId: string
): Promise<Record<string, MenuItem[]>> {
  try {
    const items = await getMenuItems(restaurantId);
    const grouped: Record<string, MenuItem[]> = {};

    items.forEach((item) => {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }
      grouped[item.category].push(item);
    });

    return grouped;
  } catch (error) {
    console.error("Error getting menu items by category:", error);
    throw new Error("Failed to get menu items by category");
  }
}

// ==================== RESTAURANT PROFILE ====================

/**
 * Create or update restaurant profile
 */
export async function saveRestaurantProfile(
  restaurantId: string,
  profileData: Omit<RestaurantProfile, "id" | "restaurantId" | "createdAt" | "updatedAt">
): Promise<void> {
  try {
    const restaurantRef = doc(db, COLLECTIONS.RESTAURANTS, restaurantId);
    const restaurantSnap = await getDoc(restaurantRef);
    const now = Timestamp.now();

    if (restaurantSnap.exists()) {
      // Update existing restaurant document with profile data
      // Preserve existing fields like userId, createdAt
      const existingData = restaurantSnap.data();
      await updateDoc(restaurantRef, {
        name: profileData.name,
        email: profileData.email,
        location: profileData.location,
        openingHours: profileData.openingHours,
        description: profileData.description,
        phone: profileData.phone,
        address: profileData.address,
        socialMedia: profileData.socialMedia,
        updatedAt: now,
        // Preserve existing fields
        userId: existingData.userId,
        createdAt: existingData.createdAt,
        settings: existingData.settings || {},
      });
    } else {
      throw new Error("Restaurant not found");
    }
  } catch (error) {
    console.error("Error saving restaurant profile:", error);
    throw new Error("Failed to save restaurant profile");
  }
}

/**
 * Get restaurant profile
 */
export async function getRestaurantProfile(
  restaurantId: string
): Promise<RestaurantProfile | null> {
  try {
    const restaurantRef = doc(db, COLLECTIONS.RESTAURANTS, restaurantId);
    const restaurantSnap = await getDoc(restaurantRef);

    if (restaurantSnap.exists()) {
      const data = restaurantSnap.data();
      return {
        id: restaurantSnap.id,
        restaurantId: restaurantSnap.id,
        name: data.name || "",
        location: data.location,
        openingHours: data.openingHours,
        description: data.description,
        phone: data.phone,
        email: data.email,
        address: data.address,
        socialMedia: data.socialMedia,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      } as RestaurantProfile;
    }

    return null;
  } catch (error) {
    console.error("Error getting restaurant profile:", error);
    throw new Error("Failed to get restaurant profile");
  }
}

// ==================== DASHBOARD STATISTICS ====================

/**
 * Get dashboard statistics for a restaurant
 */
export async function getDashboardStats(
  restaurantId: string
): Promise<DashboardStats> {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTimestamp = Timestamp.fromDate(today);

    // Get today's orders
    const ordersQuery = query(
      collection(db, COLLECTIONS.ORDERS),
      where("restaurantId", "==", restaurantId),
      where("createdAt", ">=", todayTimestamp),
      orderBy("createdAt", "desc")
    );
    const ordersSnapshot = await getDocs(ordersQuery);
    const todaysOrders = ordersSnapshot.docs.length;

    // Calculate today's revenue
    let todaysRevenue = 0;
    ordersSnapshot.docs.forEach((doc) => {
      const order = doc.data() as Order;
      if (order.status !== "cancelled") {
        todaysRevenue += order.total || 0;
      }
    });

    // Get pending orders (status: pending, preparing, or ready)
    // Note: Firestore 'in' operator supports up to 10 values
    const pendingQuery = query(
      collection(db, COLLECTIONS.ORDERS),
      where("restaurantId", "==", restaurantId),
      where("status", "in", ["pending", "preparing", "ready"])
    );
    const pendingSnapshot = await getDocs(pendingQuery);
    const pendingOrders = pendingSnapshot.docs.length;

    // Get active tables (tables with pending orders)
    const activeTableNumbers = new Set<string>();
    pendingSnapshot.docs.forEach((doc) => {
      const order = doc.data() as Order;
      activeTableNumbers.add(order.tableNumber);
    });
    const activeTables = activeTableNumbers.size;

    return {
      activeTables,
      todaysOrders,
      todaysRevenue,
      pendingOrders,
    };
  } catch (error) {
    console.error("Error getting dashboard stats:", error);
    // Return default values on error
    return {
      activeTables: 0,
      todaysOrders: 0,
      todaysRevenue: 0,
      pendingOrders: 0,
    };
  }
}

/**
 * Subscribe to real-time orders for a restaurant
 */
export function subscribeToOrders(
  restaurantId: string,
  callback: (orders: Order[]) => void
): () => void {
  const ordersQuery = query(
    collection(db, COLLECTIONS.ORDERS),
    where("restaurantId", "==", restaurantId),
    orderBy("createdAt", "desc")
  );

  const unsubscribe = onSnapshot(
    ordersQuery,
    (snapshot) => {
      const orders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Order[];
      callback(orders);
    },
    (error) => {
      console.error("Error subscribing to orders:", error);
    }
  );

  return unsubscribe;
}

/**
 * Subscribe to orders by status
 */
export function subscribeToOrdersByStatus(
  restaurantId: string,
  status: Order["status"],
  callback: (orders: Order[]) => void
): () => void {
  const ordersQuery = query(
    collection(db, COLLECTIONS.ORDERS),
    where("restaurantId", "==", restaurantId),
    where("status", "==", status),
    orderBy("createdAt", "desc")
  );

  const unsubscribe = onSnapshot(
    ordersQuery,
    (snapshot) => {
      const orders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Order[];
      callback(orders);
    },
    (error) => {
      console.error("Error subscribing to orders by status:", error);
    }
  );

  return unsubscribe;
}

/**
 * Delete an order
 */
export async function deleteOrder(orderId: string): Promise<void> {
  try {
    const orderRef = doc(db, COLLECTIONS.ORDERS, orderId);
    await deleteDoc(orderRef);
  } catch (error) {
    console.error("Error deleting order:", error);
    throw new Error("Failed to delete order");
  }
}
