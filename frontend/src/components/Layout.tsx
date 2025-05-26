// Layout component - provides the common structure for all pages
// Includes header with USF branding, navigation menu, and main content area

import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Props interface for the Layout component
interface LayoutProps {
  children: ReactNode; // Page content that will be rendered inside the layout
}

const Layout = ({ children }: LayoutProps) => {
  // Get current location to highlight active navigation item
  const location = useLocation();

  // Navigation menu configuration
  // Each item defines a route and display label
  const navItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/equipment', label: 'Equipment' },
    { path: '/locations', label: 'Locations' },
  ];

  return (
    <div className="min-h-screen bg-usf-gray-50">
      {/* Header Section - USF Honors College branding */}
      <header className="bg-usf-green-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center">
            <div className="text-center">
              {/* Main title using USF green theme */}
              <h1 className="text-3xl font-bold text-white">
                USF Honors College Inventory Management System
              </h1>
              {/* Subtitle with lighter green color */}
              <p className="text-usf-green-100 mt-1">
                Equipment Management System
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Menu - horizontal tabs below header */}
      <nav className="bg-white border-b border-usf-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            {/* Loop through navigation items and create links */}
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  // Highlight active tab with green border and text
                  // Handle both '/' and '/dashboard' as active for home page
                  location.pathname === item.path || (location.pathname === '/dashboard' && item.path === '/')
                    ? 'border-usf-green-600 text-usf-green-600'
                    : 'border-transparent text-usf-gray-600 hover:text-usf-green-600 hover:border-usf-green-300'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content Area - where page content is rendered */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout; 