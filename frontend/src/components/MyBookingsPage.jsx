import { useState, useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { useNavigate } from 'react-router-dom';
import bookingService from '../services/bookingService';

const MyBookingsPage = () => {
    const { keycloak } = useKeycloak();
    const navigate = useNavigate();
    const email = keycloak.tokenParsed?.email;
    const [bookings, setBookings] = useState([]);

    const loadBookings = () => {
        if (email) {
            bookingService
                .getByEmail(email)
                .then((response) => {
                    const data = response.data || response;
                    setBookings(Array.isArray(data) ? data : []);
                })
                .catch((error) => console.log('Error:', error));
        }
    };

    useEffect(() => {
        loadBookings();
    }, []);

    const handleDelete = (id) => {
        const confirm = window.confirm("¿Seguro que deseas cancelar esta reserva?");
        if (confirm) {
            bookingService
                .remove(id)
                .then(() => {
                    console.log("Reserva eliminada");
                    loadBookings();
                })
                .catch((error) => console.log('Error al eliminar:', error));
        }
    };

    return (
        <div className="container mt-4">
            <div className="bg-white bg-opacity-90 rounded p-3 mb-3 d-inline-block">
            <h2>Mis Reservas</h2>
            </div>
            <hr />
            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Paquete</th>
                    <th>Pasajeros</th>
                    <th>Precio final</th>
                    <th>Pagado</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {bookings.map((b) => (
                    <tr key={b.idBooking}>
                        <td>#{b.idBooking}</td>
                        <td>{b.packageName}</td>
                        <td>{b.numberOfPassengers}</td>
                        <td>${b.discountedPriceBooking?.toLocaleString()} CLP</td>

                        <td>
                            {b.paidBooking ?
                                <span className="badge bg-success">Sí</span> :
                                <span className="badge bg-warning text-dark">Pendiente</span>
                            }
                        </td>
                        <td>
                            <div className="d-flex gap-2">
                                <button
                                    className="btn btn-info btn-sm"
                                    onClick={() => navigate(`/travel-packages/${b.travelPackageId}`)}>
                                    Ver paquete
                                </button>
                                {!b.paidBooking && (
                                    <>
                                        <button
                                            className="btn btn-success btn-sm"
                                            onClick={() => navigate(`/bookings/${b.idBooking}`)}>
                                            Pagar
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(b.idBooking)}>
                                            Cancelar
                                        </button>
                                    </>
                                )}
                            </div>
                        </td>
                    </tr>
                ))}
                {bookings.length === 0 && (
                    <tr>
                        <td colSpan={6} className="text-center text-muted">
                            <div className="bg-white bg-opacity-90 rounded p-3 mb-3 d-inline-block">
                            No tienes reservas aún
                            </div>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
            <button className="btn btn-secondary mt-2" onClick={() => navigate('/')}>
                Volver
            </button>
        </div>
    );
};

export default MyBookingsPage;