import React, { useState, useEffect } from 'react';
import bookingService from '../services/bookingService';
import travelPackagesService from '../services/travelPackagesService';

const BookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({
        emailClientBooking: '', passangerRuts: '',
        numberOfPassanger: '', preferencePassangerBooking: '', travelPackageId: '',
    });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [bRes, pRes] = await Promise.all([bookingService.getAll(), travelPackagesService.getAll()]);
            setBookings(bRes.data);
            setPackages(pRes.data);
        } catch (err) {
            setError('Error al cargar datos');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('¿Eliminar esta reserva?')) return;
        await bookingService.delete(id);
        setBookings(bookings.filter((b) => b.idBooking !== id));
    };

    const handleSubmit = async () => {
        setSaving(true);
        setError(null);
        try {
            const payload = {
                ...form,
                passangerRuts: form.passangerRuts.split(',').map((r) => r.trim()).filter(Boolean),
                numberOfPassanger: parseInt(form.numberOfPassanger),
                travelPackageId: parseInt(form.travelPackageId),
            };
            await bookingService.create(payload);
            setShowForm(false);
            fetchData();
        } catch (err) {
            setError(err.response?.data?.message || 'Error al crear reserva');
        } finally {
            setSaving(false);
        }
    };

    const inputStyle = { background: '#16213e', border: '1px solid #2a2a4a', color: '#fff' };

    return (
        <div style={{ minHeight: '100vh', background: '#0a0a1a', padding: '2rem' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 style={{ color: '#fff', fontFamily: '"Playfair Display", serif' }}>Reservas</h1>
                <button className="btn" style={{ background: '#e94560', color: '#fff', border: 'none' }}
                        onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Cerrar' : '+ Nueva Reserva'}
                </button>
            </div>

            {showForm && (
                <div style={{ background: '#16213e', border: '1px solid #e94560', borderRadius: '10px', padding: '1.5rem', marginBottom: '2rem' }}>
                    <h5 style={{ color: '#fff', marginBottom: '1rem' }}>Nueva Reserva</h5>
                    {error && <div className="alert" style={{ background: '#3a0a0a', color: '#e94560', border: '1px solid #e94560' }}>{error}</div>}
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label style={{ color: '#aaa', fontSize: '0.85rem' }}>Email del cliente *</label>
                            <input className="form-control" style={inputStyle} placeholder="cliente@email.com"
                                   value={form.emailClientBooking} onChange={(e) => setForm({ ...form, emailClientBooking: e.target.value })} />
                        </div>
                        <div className="col-md-6">
                            <label style={{ color: '#aaa', fontSize: '0.85rem' }}>Paquete *</label>
                            <select className="form-select" style={inputStyle}
                                    value={form.travelPackageId} onChange={(e) => setForm({ ...form, travelPackageId: e.target.value })}>
                                <option value="">Seleccionar paquete...</option>
                                {packages.map((p) => (
                                    <option key={p.idPackage} value={p.idPackage}>{p.namePackage} - {p.destinationPackage}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label style={{ color: '#aaa', fontSize: '0.85rem' }}>RUTs de pasajeros (separados por coma)</label>
                            <input className="form-control" style={inputStyle} placeholder="12345678-9, 98765432-1"
                                   value={form.passangerRuts} onChange={(e) => setForm({ ...form, passangerRuts: e.target.value })} />
                        </div>
                        <div className="col-md-3">
                            <label style={{ color: '#aaa', fontSize: '0.85rem' }}>N° de pasajeros</label>
                            <input type="number" className="form-control" style={inputStyle}
                                   value={form.numberOfPassanger} onChange={(e) => setForm({ ...form, numberOfPassanger: e.target.value })} />
                        </div>
                        <div className="col-md-3">
                            <label style={{ color: '#aaa', fontSize: '0.85rem' }}>Preferencia</label>
                            <input className="form-control" style={inputStyle} placeholder="ej: ventana"
                                   value={form.preferencePassangerBooking} onChange={(e) => setForm({ ...form, preferencePassangerBooking: e.target.value })} />
                        </div>
                    </div>
                    <button className="btn mt-3" style={{ background: '#e94560', color: '#fff', border: 'none' }}
                            onClick={handleSubmit} disabled={saving}>
                        {saving ? 'Guardando...' : 'Crear Reserva'}
                    </button>
                </div>
            )}

            {loading ? (
                <div className="text-center py-5"><div className="spinner-border" style={{ color: '#e94560' }} /></div>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <table className="table" style={{ background: '#16213e', color: '#fff' }}>
                        <thead style={{ borderBottom: '2px solid #e94560' }}>
                        <tr>
                            {['ID','Cliente','Paquete','Pasajeros','Precio original','Precio final','Estado','Pagado','Acciones']
                                .map((h) => <th key={h} style={{ color: '#e94560' }}>{h}</th>)}
                        </tr>
                        </thead>
                        <tbody>
                        {bookings.map((b) => (
                            <tr key={b.idBooking} style={{ borderBottom: '1px solid #2a2a4a' }}>
                                <td>#{b.idBooking}</td>
                                <td style={{ fontSize: '0.85rem' }}>{b.emailClientBooking}</td>
                                <td style={{ fontSize: '0.85rem' }}>{b.packageName}</td>
                                <td>{b.numberOfPassengers}</td>
                                <td>${b.originalPriceBooking?.toLocaleString()}</td>
                                <td style={{ color: '#2a9d8f' }}>${b.discountedPriceBooking?.toLocaleString()}</td>
                                <td>
                    <span style={{
                        fontSize: '0.75rem', padding: '3px 8px', borderRadius: '20px',
                        background: b.bookingStatus === 'CONFIRMED' ? '#1a4a2a' : '#4a1a1a',
                        color: b.bookingStatus === 'CONFIRMED' ? '#2a9d8f' : '#e94560',
                    }}>
                      {b.bookingStatus}
                    </span>
                                </td>
                                <td>{b.paidBooking ? '✅' : '❌'}</td>
                                <td>
                                    <button className="btn btn-sm"
                                            style={{ background: 'transparent', color: '#e94560', border: '1px solid #e94560' }}
                                            onClick={() => handleDelete(b.idBooking)}>🗑</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {bookings.length === 0 && <p style={{ color: '#888', textAlign: 'center', padding: '2rem' }}>No hay reservas registradas.</p>}
                </div>
            )}
        </div>
    );
};

export default BookingsPage;