import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './src/components/Navbar.jsx';
import TravelPackagesPage from './pages/TravelPackagesPage';
import BookingsPage from './pages/BookingsPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const LoadingScreen = () => (
    <div style={{
        minHeight: '100vh', background: '#0a0a1a',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
    }}>
        <div className="spinner-border" style={{ color: '#e94560', width: '3rem', height: '3rem' }} />
        <p style={{ color: '#888', marginTop: '1rem', fontFamily: 'sans-serif' }}>
            Conectando con Keycloak...
        </p>
    </div>
);


const AppContent = () => {
    const { loading, isAdmin } = useAuth();
    const [currentPage, setCurrentPage] = useState('packages');

    if (loading) return <LoadingScreen />;

    const renderPage = () => {
        switch (currentPage) {
            case 'packages': return <TravelPackagesPage />;
            case 'bookings': return isAdmin() ? <BookingsPage /> : <TravelPackagesPage />;
            default: return <TravelPackagesPage />;
        }
    };

    return (
        <div style={{ fontFamily: '"Source Sans 3", sans-serif' }}>
            <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
            {renderPage()}
        </div>
    );
};


const App = () => (
    <AuthProvider>
        <AppContent />
    </AuthProvider>
);

export default App;