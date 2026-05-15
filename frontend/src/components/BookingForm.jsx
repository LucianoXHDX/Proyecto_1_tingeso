import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import bookingService from '../services/bookingService';

const BookingForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { keycloak } = useKeycloak();
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [form, setForm] = useState({
        emailClientBooking: keycloak.tokenParsed?.email || '',
        passangerRuts: '',
        numberOfPassanger: '',
        preferencePassangerBooking: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        setError(null);
        setSaving(true);
        try {
            const payload = {
                emailClientBooking: form.emailClientBooking,
                passangerRuts: form.passangerRuts.split(',').map((r) => r.trim()).filter(Boolean),
                numberOfPassanger: parseInt(form.numberOfPassanger),
                preferencePassangerBooking: form.preferencePassangerBooking,
                travelPackageId: parseInt(id),
            };
            const response = await bookingService.create(payload);
            navigate(`/payments/new/${response.data.idBooking}`);
        } catch (err) {
            if (err.response?.status === 500) {
                setError('La cantidad de pasajeros supera los cupos disponibles.');
            } else {
                setError(err.response?.data?.message || 'Error al crear la reserva');
            }
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="container mt-4">
            <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
                ← Volver
            </button>

            <h2>Crear Reserva</h2>
            <hr />

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="mb-3">
                <label className="form-label">Email *</label>
                <input
                    type="email"
                    className="form-control"
                    name="emailClientBooking"
                    value={form.emailClientBooking}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">RUTs de pasajeros (separados por coma) *</label>
                <input
                    type="text"
                    className="form-control"
                    name="passangerRuts"
                    placeholder="12345678-9, 98765432-1"
                    value={form.passangerRuts}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Número de pasajeros *</label>
                <input
                    type="number"
                    className="form-control"
                    name="numberOfPassanger"
                    min="1"
                    value={form.numberOfPassanger}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Preferencia</label>
                <input
                    type="text"
                    className="form-control"
                    name="preferencePassangerBooking"
                    placeholder="ej: ventana, pasillo"
                    value={form.preferencePassangerBooking}
                    onChange={handleChange}
                />
            </div>

            <div className="d-flex gap-2">
                <button
                    className="btn btn-primary"
                    onClick={handleSubmit}
                    disabled={saving}>
                    {saving ? 'Procesando...' : 'Confirmar reserva'}
                </button>
                <button className="btn btn-secondary" onClick={() => navigate(-1)}>
                    Cancelar
                </button>
            </div>
        </div>
    );
};

export default BookingForm;