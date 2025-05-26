# USF Honors College Inventory Management System

A full-stack web application for managing IT equipment inventory at the University of South Florida Honors College. This system allows staff to track equipment, manage locations, and transfer items between different rooms and buildings.

## Project Overview

This inventory management system was built to help the USF Honors College IT team efficiently track and manage their equipment across various locations including classrooms, offices, and storage areas. The system provides a clean, professional interface that matches the USF branding and offers comprehensive CRUD operations for both equipment and locations.


##  Getting Started

### Prerequisites

- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)
- **PostgreSQL** (version 12 or higher)
- **Git** for cloning the repository

### Installation Steps

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd "USF Honors Inventory Management System"
```

#### 2. Database Setup

First, set up PostgreSQL and create the database:

```bash
# Connect to PostgreSQL as superuser
psql -U postgres

# Create the database
CREATE DATABASE inventory_management;

# Create a user (replace 'your_username' with your system username)
CREATE USER your_username WITH PASSWORD '';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE inventory_management TO your_username;

# Exit PostgreSQL
\q
```

Apply the database schema:

```bash
# Navigate to the database directory
cd database

# Apply the schema
psql -d inventory_management -f schema.sql
```

#### 3. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Update database configuration if needed
# Edit src/models/db.ts and update the username to match your system

# Start the backend server
npm run dev
```

The backend server will start on `http://localhost:3000`

#### 4. Frontend Setup

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will start on `http://localhost:5173`

### Configuration

#### Database Configuration

The default database configuration in `backend/src/models/db.ts` is:
- **Host**: localhost
- **Port**: 5432
- **Database**: inventory_management
- **User**: venkeyy_10 (update this to your system username)
- **Password**: (empty for local development)


## Development

### Running in Development Mode

1. **Backend**: `cd backend && npm run dev`
2. **Frontend**: `cd frontend && npm run dev`

### Building for Production

**Frontend:**
```bash
cd frontend
npm run build
```

**Backend:**
```bash
cd backend
npm run build
```
