// lib/db.js

import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres', // your database user
  host: 'localhost',
  database: 'spotify_playlist_analysis', // your database name
  password: '', // your database password
  port: 5432,
});

export default pool;
