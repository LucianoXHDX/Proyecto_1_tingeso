import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useKeycloak } from "@react-keycloak/web";
import React from 'react';
import TravelPackages from './components/TravelPackages.jsx';
import TravelPackageDetail from './components/TravelPackageDetail.jsx';
import BookingForm from './components/BookingForm.jsx';
import Navbar from './components/Navbar.jsx';
import PaymentForm from "./components/PaymentForm.jsx";
import BookingCheckOut from './components/BookingCheckOut.jsx';
import AdminPage from './components/AmdinPage.jsx';
import PackageForm from "./components/PackageForm.jsx";
import ProfilePage from './components/ProfilePage.jsx';
import MyBookingsPage from './components/MyBookingsPage.jsx';
import AdminTravelPackagePage from './components/AdminTravelPackagePage.jsx';


function App() {
    const { keycloak, initialized } = useKeycloak();

    if (!initialized) return <div>Cargando...</div>;

    const isLoggedIn = keycloak.authenticated;
    const isAdmin = keycloak.tokenParsed?.resource_access?.['spring-client-api-rest']?.roles?.includes('admin_client_role');

    const PrivateRoute = ({ element }) => {
        React.useEffect(() => {
            if (!isLoggedIn) keycloak.login();
        }, []);
        if (!isLoggedIn) return null;
        return element;
    };

    const AdminRoute = ({ element }) => {
        React.useEffect(() => {
            if (!isLoggedIn) keycloak.login();
        }, []);
        if (!isLoggedIn) return null;
        if (!isAdmin) return <p className="container mt-4">no tienes permiso de admin</p>;
        return element;
    };

    return (
        <Router>
            <div className="container">
                <Navbar />
                <Routes>
                    {/* public without login*/}
                    <Route path="/" element={<TravelPackages />} />

                    {/* there u need login*/}
                    <Route path="/travel-packages/:id" element={<PrivateRoute element={<TravelPackageDetail />} />} />

                    <Route path="/bookings/new/:id" element={<PrivateRoute element={<BookingForm />} />} />

                    <Route path="/payments/new/:bookingId" element={<PrivateRoute element={<PaymentForm />} />} />

                    <Route path="/bookings/:id" element={<PrivateRoute element={<BookingCheckOut />} />} />

                    <Route path="/profile" element={<PrivateRoute element={<ProfilePage />} />} />

                    <Route path="/my-bookings" element={<PrivateRoute element={<MyBookingsPage />} />} />

                    {/* these it on ly for admin*/}
                    <Route path="/admin" element={<AdminRoute element={<AdminPage />} />} />

                    <Route path="/admin/packages/new" element={<AdminRoute element={<PackageForm />} />} />

                    <Route path="/admin/packages" element={<AdminRoute element={<AdminTravelPackagePage />} />} />

                </Routes>
            </div>
        </Router>
    );
}

export default App;