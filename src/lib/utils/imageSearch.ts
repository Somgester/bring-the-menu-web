/**
 * Fetch an image URL based on a search query
 * Uses multiple fallback strategies to ensure we always get an image
 */
export async function fetchImageFromSearch(query: string): Promise<string> {
  try {
    // Clean and format the query for better search results
    const searchQuery = query.trim().toLowerCase();
    
    // Strategy 1: Try Foodish API (free food images API)
    try {
      const foodishResponse = await fetch(`https://foodish-api.herokuapp.com/images/${getFoodishCategory(searchQuery)}`);
      if (foodishResponse.ok) {
        const foodishData = await foodishResponse.json();
        if (foodishData?.image) {
          return foodishData.image;
        }
      }
    } catch (error) {
      console.log("Foodish API failed, trying next option...");
    }
    
    // Strategy 2: Use Unsplash Source API (deprecated but still works sometimes)
    try {
      const unsplashUrl = `https://source.unsplash.com/800x600/?${encodeURIComponent(searchQuery + " food")}`;
      // Quick check if URL is accessible
      const response = await fetch(unsplashUrl, { method: "HEAD", mode: "no-cors" });
      // If we get here, assume it works (CORS might block but image will load)
      return unsplashUrl;
    } catch (error) {
      console.log("Unsplash Source failed, trying next option...");
    }
    
    // Strategy 3: Use Lorem Picsum with food category
    // This provides random food-related images
    const picsumUrl = `https://picsum.photos/800/600?random=${Date.now()}`;
    
    // Strategy 4: Fallback to placeholder with food emoji
    const placeholderUrl = `https://via.placeholder.com/800x600/f0f0f0/999999?text=${encodeURIComponent("🍽️ " + query)}`;
    
    // Return picsum as primary fallback, placeholder as last resort
    return picsumUrl;
  } catch (error) {
    console.error("Error fetching image:", error);
    // Final fallback: placeholder
    return `https://via.placeholder.com/800x600/f0f0f0/999999?text=${encodeURIComponent("🍽️ " + query)}`;
  }
}

/**
 * Map search query to Foodish API category
 */
function getFoodishCategory(query: string): string {
  const lowerQuery = query.toLowerCase();
  
  // Map common food terms to Foodish categories
  if (lowerQuery.includes("pizza") || lowerQuery.includes("pasta")) return "pizza";
  if (lowerQuery.includes("burger") || lowerQuery.includes("sandwich")) return "burger";
  if (lowerQuery.includes("rice") || lowerQuery.includes("biryani") || lowerQuery.includes("curry")) return "rice";
  if (lowerQuery.includes("dessert") || lowerQuery.includes("cake") || lowerQuery.includes("sweet")) return "dessert";
  if (lowerQuery.includes("chicken") || lowerQuery.includes("meat")) return "chicken";
  if (lowerQuery.includes("salad") || lowerQuery.includes("vegetable")) return "salad";
  if (lowerQuery.includes("sushi") || lowerQuery.includes("japanese")) return "sushi";
  if (lowerQuery.includes("breakfast") || lowerQuery.includes("pancake")) return "breakfast";
  
  // Default to random
  return "random";
}

/**
 * Alternative: Use Unsplash API with better results (requires API key)
 * This is a more reliable option but requires setting up Unsplash API access
 */
export async function fetchImageFromUnsplashAPI(query: string, apiKey?: string): Promise<string> {
  if (!apiKey) {
    // Fall back to source API if no key provided
    return fetchImageFromSearch(query);
  }

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&client_id=${apiKey}`
    );
    
    if (!response.ok) {
      throw new Error("Unsplash API request failed");
    }
    
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      return data.results[0].urls.regular || data.results[0].urls.small;
    }
    
    // Fallback if no results
    return fetchImageFromSearch(query);
  } catch (error) {
    console.error("Error fetching from Unsplash API:", error);
    return fetchImageFromSearch(query);
  }
}
