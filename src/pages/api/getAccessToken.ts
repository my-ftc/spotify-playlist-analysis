// pages/api/getAccessToken.ts

import { NextApiRequest, NextApiResponse } from 'next';

const fetchAccessToken = async (): Promise<string> => {
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;

    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ grant_type: "client_credentials" }),
    });

    if (!response.ok) {
        throw new Error("Failed to get access token");
    }

    const data = await response.json();
    return data.access_token;
};

// Create an API handler for fetching the access token
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const token = await fetchAccessToken();
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
}

// Export the utility function for use in other API routes
export { fetchAccessToken };
