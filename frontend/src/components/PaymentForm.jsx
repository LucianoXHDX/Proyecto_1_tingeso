import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import paymentsService from '../services/paymentsService';

const PaymentForm = () => {
    const { bookingId } = useParams();
    const navigate = useNavigate();
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [form, setForm] = useState({
        CardCodePayment: '',
        cardExpirationPayment: '',
        nameCardPayment: '',
        CVVPayment: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
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
            await paymentsService.create(payload);

            // Esperar 2 segundos simulando procesamiento
            await new Promise((resolve) => setTimeout(resolve, 2000));

            alert('¡Pago confirmado! Tu reserva ha sido aprobada.');
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Error al procesar el pago');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="container mt-4" style={{ maxWidth: '500px' }}>
            <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
                ← Volver
            </button>

            <h2>Datos de Pago</h2>
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
                <input
                    type="text"
                    className="form-control"
                    name="nameCardPayment"
                    placeholder="JUAN PEREZ"
                    value={form.nameCardPayment}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Número de tarjeta *</label>
                <input
                    type="number"
                    className="form-control"
                    name="CardCodePayment"
                    placeholder="1234567890123456"
                    value={form.CardCodePayment}
                    onChange={handleChange}
                />
            </div>

            <div className="row">
                <div className="col-7 mb-3">
                    <label className="form-label">Fecha de vencimiento *</label>
                    <input
                        type="month"
                        className="form-control"
                        name="cardExpirationPayment"
                        value={form.cardExpirationPayment}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-5 mb-3">
                    <label className="form-label">CVV *</label>
                    <input
                        type="number"
                        className="form-control"
                        name="CVVPayment"
                        placeholder="123"
                        maxLength={3}
                        value={form.CVVPayment}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <button
                className="btn btn-success w-100 mt-2"
                onClick={handleSubmit}
                disabled={saving}
            >
                {saving ? 'Procesando...' : 'Confirmar pago'}
            </button>
        </div>
    );
};

export default PaymentForm;