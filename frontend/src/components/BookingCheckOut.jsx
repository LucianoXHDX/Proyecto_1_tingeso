import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import bookingService from '../services/bookingService';

const BookingCheckOut = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        bookingService
            .get(id)
            .then((response) => setBooking(response.data))
            .catch((error) => console.log('Error al cargar reserva:', error));
    }, [id]);

    if (!booking) return <p className="container mt-4">Cargando reserva...</p>;


    return (
        <div className="container mt-4" style={{ maxWidth: '600px' }}>
            <h2>Resumen de tu Reserva</h2>
            <hr />

            <table className="table table-bordered">
                <tbody>
                <tr><th>ID Reserva</th><td>#{booking.idBooking}</td></tr>
                <tr><th>Paquete</th><td>{booking.packageName}</td></tr>
                <tr><th>Email</th><td>{booking.emailClientBooking}</td></tr>
                <tr><th>Pasajeros</th><td>{booking.numberOfPassengers}</td></tr>
                <tr><th>Precio original</th><td>${booking.originalPriceBooking?.toLocaleString()} CLP</td></tr>

                {booking.discountPercentage > 0 ? (
                    <tr><th>Descuento</th><td>{booking.discountPercentage}% - {booking.discountTypeBooking}</td></tr>
                ) : (
                    <tr><th>Descuento</th><td>No tienes descuento asociado</td></tr>
                )}

                <tr><th>Precio final</th><td><strong>${booking.discountedPriceBooking?.toLocaleString()} CLP</strong></td></tr>
                <tr><th>Estado</th><td>{booking.bookingStatus}</td></tr>
                </tbody>
            </table>

            <div className="d-flex gap-2 mt-3">
                <button
                    className="btn btn-success"
                    onClick={() => navigate(`/payments/new/${booking.idBooking}`)}
                >
                    Proceder al pago
                </button>
                <button className="btn btn-secondary" onClick={() => navigate('/')}>
                    Cancelar
                </button>
            </div>
        </div>
    );
};

export default BookingCheckOut;