import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import paymentsService from '../services/paymentsService';
import bookingService from '../services/bookingService';

const PaymentForm = () => {
    const { bookingId } = useParams();
    const navigate = useNavigate();
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [booking, setBooking] = useState(null);
    const [confirmed, setConfirmed] = useState(null);
    const [form, setForm] = useState({
        CardCodePayment: '',
        cardExpirationPayment: '',
        nameCardPayment: '',
        CVVPayment: '',
    });

    useEffect(() => {
        bookingService
            .get(bookingId)
            .then((response) => setBooking(response.data))
            .catch((error) => console.log('Error al cargar reserva:', error));
    }, [bookingId]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (form.CardCodePayment.toString().length !== 16) {
            setError('El número de tarjeta debe tener 16 dígitos');
            return;
        }
        if (form.CVVPayment.toString().length !== 3) {
            setError('El CVV debe tener 3 dígitos');
            return;
        }
        if (form.cardExpirationPayment === '' || form.cardExpirationPayment.toString().length !== 7 ) {
            setError('Por favor ingresa la fecha de vencimiento valida');
            return;
        }
        const [year, month] = form.cardExpirationPayment.split('-').map(Number);
        const expiration = new Date(year, month - 1);
        const today = new Date();
        today.setDate(1);
        if (expiration < today) {
            setError('La tarjeta está vencida, ingresa una tarjeta vigente');
            return;
        }

        setError(null);
        setSaving(true);
        try {
            const payload = {
                CardCodePayment: parseInt(form.CardCodePayment),
                cardExpirationPayment: form.cardExpirationPayment,
                nameCardPayment: form.nameCardPayment,
                CVVPayment: parseInt(form.CVVPayment),
                bookingId: parseInt(bookingId),
            };
            const response = await paymentsService.create(payload);
            //this its for emulated payments service
            await new Promise((resolve) => setTimeout(resolve, 2000));

            const updatedBooking = await bookingService.get(bookingId);
            setConfirmed({ payment: response.data, booking: updatedBooking.data });
        } catch (err) {
            setError(err.response?.data?.message || 'Error al procesar el pago');
        } finally {
            setSaving(false);
        }
    };

    if (confirmed) {
        return (
            <div className="container mt-4" style={{ maxWidth: '600px' }}>
                <div className="alert alert-success">
                    <h4>✅ ¡Pago confirmado!</h4>
                </div>
                <table className="table table-bordered">
                    <tbody>
                    <tr><th>ID Reserva</th><td>#{confirmed.booking.idBooking}</td></tr>
                    <tr><th>ID Pago</th><td>#{confirmed.payment.idPayments}</td></tr>
                    <tr><th>Paquete</th><td>{confirmed.booking.packageName}</td></tr>
                    <tr><th>Email</th><td>{confirmed.booking.emailClientBooking}</td></tr>
                    <tr><th>Pasajeros</th><td>{confirmed.booking.numberOfPassengers}</td></tr>
                    <tr><th>Precio original</th><td>${confirmed.booking.originalPriceBooking?.toLocaleString()} CLP</td></tr>
                    {confirmed.booking.discountPercentage > 0 ? (
                        <tr><th>Descuento</th><td>{confirmed.booking.discountPercentage}% - {confirmed.booking.discountTypeBooking}</td></tr>
                    ) : (
                        <tr><th>Descuento</th><td>Sin descuento</td></tr>
                    )}
                    <tr><th>Precio final pagado</th><td><strong>${confirmed.booking.discountedPriceBooking?.toLocaleString()} CLP</strong></td></tr>
                    <tr><th>Estado</th><td>{confirmed.booking.bookingStatus}</td></tr>
                    <tr><th>Pagado</th><td>✅</td></tr>
                    </tbody>
                </table>
                <button className="btn btn-primary mt-2" onClick={() => navigate('/')}>
                    Volver al inicio
                </button>
            </div>
        );
    }

    return (
        <div className="container mt-4" style={{ maxWidth: '500px' }}>
            <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
                ← Volver
            </button>

            <h2>Datos de Pago</h2>

            {booking && (
                <div className="alert alert-info mb-3">
                    <strong>Reserva #{booking.idBooking}</strong> — {booking.packageName}<br />
                    Monto a pagar: <strong>${booking.discountedPriceBooking?.toLocaleString()} CLP</strong>
                </div>
            )}

            <hr />

            {error && <div className="alert alert-danger">{error}</div>}

            {saving && (
                <div className="alert alert-info d-flex align-items-center gap-2">
                    <div className="spinner-border spinner-border-sm" />
                    Procesando pago, espera un momento...
                </div>
            )}

            <div className="mb-3">
                <label className="form-label">Nombre en la tarjeta *</label>
                <input type="text" className="form-control" name="nameCardPayment"
                       placeholder="JUAN PEREZ" value={form.nameCardPayment} onChange={handleChange} />
            </div>

            <div className="mb-3">
                <label className="form-label">Número de tarjeta *</label>
                <input type="text" className="form-control" name="CardCodePayment"
                       placeholder="1234567890123456" value={form.CardCodePayment} onChange={handleChange} />
            </div>

            <div className="row">
                <div className="col-7 mb-3">
                    <label className="form-label">Fecha de vencimiento *</label>
                    <input type="month" className="form-control" placeholder="YYYY-MM" name="cardExpirationPayment"
                           value={form.cardExpirationPayment} onChange={handleChange} />
                </div>
                <div className="col-5 mb-3">
                    <label className="form-label">CVV *</label>
                    <input type="text" className="form-control" name="CVVPayment"
                           placeholder="123" maxLength={3} value={form.CVVPayment} onChange={handleChange} />
                </div>
            </div>

            <button className="btn btn-success w-100 mt-2" onClick={handleSubmit} disabled={saving}>
                {saving ? 'Procesando...' : `Pagar $${booking?.discountedPriceBooking?.toLocaleString() || ''} CLP`}
            </button>
        </div>
    );
};

export default PaymentForm;