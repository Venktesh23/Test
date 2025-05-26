# Database Setup Instructions

## Fix Database Connection Issues

The backend is currently trying to connect with incorrect credentials. Follow these steps:

### 1. Create .env file in backend directory

Create a file called `.env` in the `backend/` directory with the following content:

```
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=usf_honors_inventory
POSTGRES_USER=venkeyy_10
POSTGRES_PASSWORD=
PORT=3000
```

### 2. Ensure PostgreSQL is running

Make sure PostgreSQL is installed and running on your system.

### 3. Create the database

Connect to PostgreSQL and create the database:

```bash
# Connect to PostgreSQL as your user
psql -U venkeyy_10 -d postgres

# Create the database
CREATE DATABASE usf_honors_inventory;

# Exit psql
\q
```

### 4. Run the database setup

```bash
# Navigate to the project root
cd /Users/venkeyy_10/Desktop/Projects/USF\ Honors\ Inventory\ Management\ System

# Run the database setup
psql -U venkeyy_10 -d usf_honors_inventory -f database/setup.sql
```

### 5. Restart the backend

```bash
cd backend
npm run dev
```

## Equipment Data

The database now contains exactly the equipment shown in the guidelines:
- HP LaserJet Printer (in Classroom)
- Dell Elite8 Laptop (in Office HON 4015B)
- 3x Dell Monitor (in Warehouse)

## Troubleshooting

If you get "role postgres does not exist" error:
- Make sure you're using `POSTGRES_USER=venkeyy_10` in the .env file
- The database configuration expects your macOS username, not "postgres" 