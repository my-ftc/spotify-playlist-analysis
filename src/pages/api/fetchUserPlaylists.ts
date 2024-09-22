// pages/api/fetchUserPlaylists.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { fetchUsersPlaylists } from '../../lib/spotify';
import { fetchAccessToken } from './getAccessToken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { userId } = req.query;

    if (!userId || typeof userId !== 'string') {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const accessToken = await fetchAccessToken();
        const playlists = await fetchUsersPlaylists(userId, accessToken);
        res.status(200).json(playlists);
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
}
