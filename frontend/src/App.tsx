// Main App component - sets up routing and global state management
// This is the root component that wraps the entire application

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Equipment from './pages/Equipment';
import Locations from './pages/Locations';
import { InventoryProvider } from './context/InventoryContext';

const App = () => {
  return (
    // InventoryProvider wraps the entire app to provide global state management
    // This allows components to share data and trigger refreshes across the app
    <InventoryProvider>
      {/* Router enables client-side navigation between different pages */}
      <Router>
        {/* Layout component provides the common header and navigation structure */}
        <Layout>
          {/* Define all the routes/pages available in the application */}
          <Routes>
            {/* Dashboard is the default home page */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Equipment management page */}
            <Route path="/equipment" element={<Equipment />} />
            {/* Location management page */}
            <Route path="/locations" element={<Locations />} />
          </Routes>
        </Layout>
      </Router>
    </InventoryProvider>
  );
};

export default App; 