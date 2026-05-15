import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useKeycloak } from "@react-keycloak/web";
import TravelPackages from './components/TravelPackages.jsx';
import TravelPackageDetail from './components/TravelPackageDetail.jsx';
import BookingForm from './components/BookingForm.jsx';
import Navbar from './components/Navbar.jsx';
import PaymentForm from "./components/PaymentForm.jsx";

function App() {
    const { keycloak, initialized } = useKeycloak();

    if (!initialized) return <div>Cargando...</div>;

    const isLoggedIn = keycloak.authenticated;


    const PrivateRoute = ({ element }) => {
        if (!isLoggedIn) {
            keycloak.login();
            return null;
        }
        return element;
    };

    return (
        <Router>
            <div className="container">
                <Navbar />
                <Routes>
                    {/* public without login*/}
                    <Route path="/" element={<TravelPackages />} />

                    {/* rutes private u need a login */}
                    <Route path="/travel-packages/:id" element={<PrivateRoute element={<TravelPackageDetail />} />} />

                    <Route path="/bookings/new/:id" element={<PrivateRoute element={<BookingForm />} />} />

                    <Route path="/payments/new/:bookingId" element={<PrivateRoute element={<PaymentForm />} />} />

                </Routes>
            </div>
        </Router>
    );
}

export default App;