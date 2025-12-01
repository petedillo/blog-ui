/**
 * Get full image URL, handling both local (NFS) and external sources
 * 
 * @param url - Image URL from API (either relative path or full URL)
 * @returns Full URL to image
 */
export const getImageUrl = (url: string | undefined): string | null => {
  if (!url) return null;
  
  // If already a full URL (http/https), return as-is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // For relative paths (e.g., /api/v1/media/images/file.jpg)
  // Prepend API base URL
  const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
  
  // If path starts with /, use as-is, otherwise prepend /
  const path = url.startsWith('/') ? url : `/${url}`;
  
  return `${apiBaseUrl}${path}`;
};

/**
 * Handle image load errors with fallback
 */
export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>): void => {
  const img = e.currentTarget;
  
  // Prevent infinite loop if fallback also fails
  if (img.dataset.fallbackAttempted === 'true') {
    img.style.display = 'none';
    return;
  }
  
  img.dataset.fallbackAttempted = 'true';
  
  // You can set a fallback image here if needed
  // img.src = '/placeholder.png';
  
  console.warn('Failed to load image:', img.src);
};
