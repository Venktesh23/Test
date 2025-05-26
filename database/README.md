# USF Honors IMS - Database

PostgreSQL database setup and migrations for the USF Honors Inventory Management System.

## Schema

### Equipment Table
```sql
CREATE TABLE equipment (
  id SERIAL PRIMARY KEY,
  model VARCHAR(255) NOT NULL,
  type VARCHAR(100) NOT NULL,
  location_id INTEGER REFERENCES locations(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Locations Table
```sql
CREATE TABLE locations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## Setup Instructions

1. Install PostgreSQL if not already installed:
   ```bash
   # macOS (using Homebrew)
   brew install postgresql

   # Ubuntu/Debian
   sudo apt-get update
   sudo apt-get install postgresql postgresql-contrib
   ```

2. Create the database:
   ```bash
   createdb usf_honors_ims
   ```

3. Run the schema migrations:
   ```bash
   psql usf_honors_ims < schema.sql
   ```

## Environment Variables

Create a `.env` file in the root directory with:
```
POSTGRES_USER=your_username
POSTGRES_PASSWORD=your_password
POSTGRES_DB=usf_honors_ims
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
```

## Backup and Restore

To backup the database:
```bash
pg_dump usf_honors_ims > backup.sql
```

To restore from backup:
```bash
psql usf_honors_ims < backup.sql
```

## Development

When making schema changes:
1. Create a new migration file in `/migrations`
2. Update this README with the new schema
3. Test the migration locally
4. Commit the changes 