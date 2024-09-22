// pages/api/fetchArtistGenres.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { fetchArtistGenresInBatches } from '../../lib/spotify';
import { fetchAccessToken } from './getAccessToken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { artistIds } = req.query;

    if (!artistIds || typeof artistIds !== 'string') {
        return res.status(400).json({ message: 'Artist IDs are required' });
    }

    const idsArray = artistIds.split(',');

    try {
        const accessToken = await fetchAccessToken();
        const genreCounts = await fetchArtistGenresInBatches(idsArray, accessToken);
        res.status(200).json(genreCounts);
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
}
