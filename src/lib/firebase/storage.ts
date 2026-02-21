import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "./config";

/**
 * Upload a file to Firebase Storage
 * @param file - The file to upload
 * @param path - The storage path (e.g., 'menus/restaurantId/itemId.jpg')
 * @returns The download URL of the uploaded file
 */
export async function uploadFile(
  file: File,
  path: string
): Promise<string> {
  try {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error("Failed to upload file");
  }
}

/**
 * Upload a menu item image
 */
export async function uploadMenuItemImage(
  file: File,
  restaurantId: string,
  menuItemId: string
): Promise<string> {
  const fileExtension = file.name.split(".").pop();
  const path = `menus/${restaurantId}/${menuItemId}.${fileExtension}`;
  return uploadFile(file, path);
}

/**
 * Delete a file from Firebase Storage
 */
export async function deleteFile(path: string): Promise<void> {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  } catch (error) {
    console.error("Error deleting file:", error);
    throw new Error("Failed to delete file");
  }
}
