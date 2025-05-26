// Database connection configuration for PostgreSQL
// This file sets up the connection pool for efficient database operations

import { Pool } from 'pg';
import dotenv from 'dotenv';

// Load environment variables for database configuration
dotenv.config();

// Create a connection pool for PostgreSQL
// Using a pool is more efficient than creating new connections for each query
// It manages multiple connections and reuses them as needed
const pool = new Pool({
  user: process.env.POSTGRES_USER || 'venkeyy_10',        // Database username
  password: process.env.POSTGRES_PASSWORD || '',          // Database password (empty for local dev)
  host: process.env.POSTGRES_HOST || 'localhost',         // Database host
  port: parseInt(process.env.POSTGRES_PORT || '5432'),    // Database port (PostgreSQL default)
  database: process.env.POSTGRES_DB || 'inventory_management', // Database name
});

// Event listener for successful database connections
// This helps us know when the database is connected and ready
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

// Event listener for database connection errors
// This helps us debug connection issues during development
pool.on('error', (err) => {
  console.error('Database connection error:', err);
});

// Export the pool so other files can use it to run queries
export default pool; 