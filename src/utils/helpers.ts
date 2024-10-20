// utils/helpers.ts

/**
 * Extracts the Spotify playlist ID from a URL or directly provided ID
 * @param query The input string which can be a URL or playlist ID
 * @returns The extracted playlist ID, or null if it cannot be extracted
 */
export function extractPlaylistId(query: string): string | null {
    // Regular expression to match Spotify playlist URLs
    const urlPattern = /(?:https:\/\/open\.spotify\.com\/playlist\/|spotify:playlist:)([a-zA-Z0-9]+)(?:\?|$)/;

    // Try matching the URL format
    const match = query.match(urlPattern);

    if (match && match[1]) {
        return match[1]; // Return the matched playlist ID from the URL
    }

    // If it's not a URL, assume it's a direct playlist ID
    if (/^[a-zA-Z0-9]+$/.test(query)) {
        return query; // Return the direct playlist ID
    }

    // Return null if no valid ID is found
    return null;
}
