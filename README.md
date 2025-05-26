# USF Honors College Inventory Management System

A full-stack web application for managing IT equipment inventory at the University of South Florida Honors College. This system allows staff to track equipment, manage locations, and transfer items between different rooms and buildings.

## 🎯 Project Overview

This inventory management system was built to help the USF Honors College IT team efficiently track and manage their equipment across various locations including classrooms, offices, and storage areas. The system provides a clean, professional interface that matches the USF branding and offers comprehensive CRUD operations for both equipment and locations.

### Key Features

- **Equipment Management**: Add, edit, delete, and transfer equipment items
- **Location Management**: Manage physical locations where equipment is stored
- **Dashboard Overview**: Visual summary of all equipment organized by location
- **Equipment Transfer**: Move equipment between different locations
- **Data Validation**: Comprehensive validation on both frontend and backend
- **Professional UI**: Clean interface using USF green and gray color scheme
- **Responsive Design**: Works on desktop and mobile devices

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Router** for client-side navigation
- **Tailwind CSS** for styling with custom USF colors
- **Context API** for global state management

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **PostgreSQL** for database
- **pg** library for database connections
- **CORS** enabled for frontend communication

### Database
- **PostgreSQL** with structured schema
- **Foreign key relationships** between equipment and locations
- **Data constraints** for building types (Warehouse, Classroom, Office)

## 📁 Project Structure

```
USF Honors Inventory Management System/
├── frontend/                    # React frontend application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Layout.tsx      # Main layout with header and navigation
│   │   │   ├── Modal.tsx       # Modal component for forms
│   │   │   └── Table.tsx       # Reusable table component
│   │   ├── context/           # React Context for state management
│   │   │   └── InventoryContext.tsx
│   │   ├── pages/             # Main page components
│   │   │   ├── Dashboard.tsx   # Overview page with statistics
│   │   │   ├── Equipment.tsx   # Equipment management page
│   │   │   └── Locations.tsx   # Location management page
│   │   ├── services/          # API communication layer
│   │   │   └── api.ts         # All API calls to backend
│   │   ├── types/             # TypeScript type definitions
│   │   │   └── index.ts       # Shared interfaces and types
│   │   ├── App.tsx            # Main app component with routing
│   │   ├── main.tsx           # React app entry point
│   │   └── index.css          # Global styles and Tailwind config
│   ├── package.json           # Frontend dependencies
│   ├── tailwind.config.js     # Tailwind CSS configuration
│   ├── tsconfig.json          # TypeScript configuration
│   └── vite.config.ts         # Vite build configuration
├── backend/                   # Express.js backend API
│   ├── src/
│   │   ├── controllers/       # Request handlers and business logic
│   │   │   ├── equipment.ts   # Equipment CRUD operations
│   │   │   └── locations.ts   # Location CRUD operations
│   │   ├── models/           # Database connection and models
│   │   │   └── db.ts         # PostgreSQL connection pool
│   │   └── index.ts          # Express server setup and routes
│   ├── package.json          # Backend dependencies
│   └── tsconfig.json         # TypeScript configuration
├── database/                 # Database schema and setup
│   └── schema.sql           # PostgreSQL table definitions
├── DATABASE_SETUP.md        # Database setup instructions
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

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

### 🔧 Configuration

#### Environment Variables

You can optionally create environment files for configuration:

**Backend (.env in backend/ directory):**
```env
POSTGRES_USER=your_username
POSTGRES_PASSWORD=your_password
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=inventory_management
PORT=3000
```

**Frontend (.env in frontend/ directory):**
```env
VITE_API_URL=http://localhost:3000
```

#### Database Configuration

The default database configuration in `backend/src/models/db.ts` is:
- **Host**: localhost
- **Port**: 5432
- **Database**: inventory_management
- **User**: venkeyy_10 (update this to your system username)
- **Password**: (empty for local development)

## 📊 Database Schema

### Tables

#### `locations`
- `id` (Primary Key, Auto-increment)
- `room_name` (VARCHAR, e.g., "HON 4015B")
- `building_type` (VARCHAR, constrained to: 'Warehouse', 'Classroom', 'Office')

#### `equipment`
- `id` (Primary Key, Auto-increment)
- `model` (VARCHAR, e.g., "Dell Elite8 Laptop")
- `equipment_type` (VARCHAR, e.g., "Laptop", "Printer")
- `location_id` (Foreign Key to locations.id)

### Sample Data

The schema includes sample data:
- **Locations**: HON 4015B, HON 4020, HON Storage, HON 3010, HON 2010
- **Equipment**: HP LaserJet Printer, Dell Elite8 Laptop, Dell Monitors, etc.

## 🎨 UI/UX Features

### Design System
- **Colors**: USF Green (#006747) and professional grays
- **Typography**: Clean, readable fonts with proper hierarchy
- **Layout**: Responsive design that works on all screen sizes
- **Components**: Consistent styling across all UI elements

### User Experience
- **Loading States**: Spinners and feedback during data operations
- **Error Handling**: Clear error messages and validation feedback
- **Navigation**: Intuitive navigation with active state indicators
- **Forms**: User-friendly forms with proper validation

## 🔄 API Endpoints

### Equipment Endpoints
- `GET /equipment` - Get all equipment with location details
- `POST /equipment` - Create new equipment
- `PUT /equipment/:id` - Update equipment
- `DELETE /equipment/:id` - Delete equipment
- `PUT /equipment/:id/transfer` - Transfer equipment to new location

### Location Endpoints
- `GET /locations` - Get all locations
- `POST /locations` - Create new location
- `PUT /locations/:id` - Update location
- `DELETE /locations/:id` - Delete location (only if no equipment)

## 🧪 Development

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

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Ensure PostgreSQL is running
   - Check username in `backend/src/models/db.ts`
   - Verify database exists and user has permissions

2. **Port Conflicts**
   - Backend default: 3000
   - Frontend default: 5173
   - Change ports in configuration if needed

3. **CSS Compilation Errors**
   - Ensure Tailwind CSS is properly configured
   - Check for typos in custom color classes

4. **API Connection Issues**
   - Verify backend is running on correct port
   - Check CORS configuration
   - Ensure API_URL is correct in frontend

## 👥 Contributing

This project was developed as a coding challenge for the USF Honors College IT Team. The code follows best practices for:

- **Type Safety**: Full TypeScript implementation
- **Error Handling**: Comprehensive error handling on both frontend and backend
- **Code Organization**: Clean separation of concerns
- **Documentation**: Detailed comments explaining business logic
- **User Experience**: Professional, intuitive interface

## 📝 License

This project is developed for the University of South Florida Honors College IT Team.

## 🤝 Support

For questions or issues with setup, please refer to:
1. This README file
2. The DATABASE_SETUP.md file for database-specific instructions
3. Comments in the code for implementation details

---

**Built with ❤️ for the USF Honors College IT Team** 