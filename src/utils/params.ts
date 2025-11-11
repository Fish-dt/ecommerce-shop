/**
 * Utility functions for handling route parameters
 */

/**
 * Extracts product ID from Next.js params
 * @param id - The id from useParams()
 * @returns The product ID as a string
 */
export function extractProductId(id: string | string[] | undefined): string {
  if (Array.isArray(id)) {
    return id[0] || '';
  }
  return id || '';
}

