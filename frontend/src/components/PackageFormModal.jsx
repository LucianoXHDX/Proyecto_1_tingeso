import React, { useState, useEffect } from 'react';
import travelPackagesService from '../services/travelPackagesService';

const SEASONS = ['SUMMER', 'WINTER', 'SPRING', 'AUTUMN'];
const STATUSES = ['AVAILABLE', 'SOLD_OUT', 'COMING_SOON'];

const PackageFormModal = ({ existingPackage, onSuccess, onClose }) => {
    const isEditing = !!existingPackage;
    const [form, setForm] = useState({
        namePackage: '', destinationPackage: '', descriptionPackage: '',
        startDatePackage: '', endDatePackage: '', pricePackage: '',
        includedServicesPackage: '', travelConditionsPackage: '',
        availableSlotsPackage: '', travelType: '',
        enumSeason: 'SUMMER', categoryPackage: '', statusPackage: 'AVAILABLE',
    });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (existingPackage) {
            setForm({
                ...existingPackage,
                includedServicesPackage: existingPackage.includedServicesPackage
                    ? [...existingPackage.includedServicesPackage].join(', ') : '',
            });
        }
    }, [existingPackage]);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async () => {
        setError(null);
        setSaving(true);
        try {
            const payload = {
                ...form,
                pricePackage: parseInt(form.pricePackage),
                availableSlotsPackage: parseInt(form.availableSlotsPackage),
                includedServicesPackage: form.includedServicesPackage
                    .split(',').map((s) => s.trim()).filter(Boolean),
            };
            if (isEditing) {
                await travelPackagesService.update(existingPackage.idPackage, payload);
            } else {
                await travelPackagesService.create(payload);
            }
            onSuccess();
        } catch (err) {
            setError(err.response?.data?.message || 'Error al guardar el paquete');
        } finally {
            setSaving(false);
        }
    };

    const inputStyle = { background: '#16213e', border: '1px solid #2a2a4a', color: '#fff', borderRadius: '6px' };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.8)', zIndex: 1050,
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
        }}>
            <div style={{
                background: '#1a1a2e', border: '1px solid #e94560', borderRadius: '12px',
                width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', padding: '2rem',
            }}>
                <h4 style={{ color: '#fff', fontFamily: '"Playfair Display", serif', marginBottom: '1.5rem' }}>
                    {isEditing ? '✏ Editar Paquete' : '+ Nuevo Paquete'}
                </h4>

                {error && <div className="alert" style={{ background: '#3a0a0a', color: '#e94560', border: '1px solid #e94560' }}>{error}</div>}

                <div className="row g-3">
                    <div className="col-12">
                        <label style={{ color: '#aaa', fontSize: '0.85rem' }}>Nombre del paquete *</label>
                        <input name="namePackage" className="form-control" style={inputStyle} value={form.namePackage} onChange={handleChange} />
                    </div>
                    <div className="col-12">
                        <label style={{ color: '#aaa', fontSize: '0.85rem' }}>Destino *</label>
                        <input name="destinationPackage" className="form-control" style={inputStyle} value={form.destinationPackage} onChange={handleChange} />
                    </div>
                    <div className="col-12">
                        <label style={{ color: '#aaa', fontSize: '0.85rem' }}>Descripción</label>
                        <textarea name="descriptionPackage" className="form-control" rows={3} style={inputStyle} value={form.descriptionPackage} onChange={handleChange} />
                    </div>
                    <div className="col-6">
                        <label style={{ color: '#aaa', fontSize: '0.85rem' }}>Fecha inicio</label>
                        <input type="date" name="startDatePackage" className="form-control" style={inputStyle} value={form.startDatePackage} onChange={handleChange} />
                    </div>
                    <div className="col-6">
                        <label style={{ color: '#aaa', fontSize: '0.85rem' }}>Fecha fin</label>
                        <input type="date" name="endDatePackage" className="form-control" style={inputStyle} value={form.endDatePackage} onChange={handleChange} />
                    </div>
                    <div className="col-6">
                        <label style={{ color: '#aaa', fontSize: '0.85rem' }}>Precio (CLP) *</label>
                        <input type="number" name="pricePackage" className="form-control" style={inputStyle} value={form.pricePackage} onChange={handleChange} />
                    </div>
                    <div className="col-6">
                        <label style={{ color: '#aaa', fontSize: '0.85rem' }}>Cupos disponibles</label>
                        <input type="number" name="availableSlotsPackage" className="form-control" style={inputStyle} value={form.availableSlotsPackage} onChange={handleChange} />
                    </div>
                    <div className="col-6">
                        <label style={{ color: '#aaa', fontSize: '0.85rem' }}>Tipo de viaje</label>
                        <input name="travelType" className="form-control" style={inputStyle} placeholder="ej: AEREO, TERRESTRE" value={form.travelType} onChange={handleChange} />
                    </div>
                    <div className="col-6">
                        <label style={{ color: '#aaa', fontSize: '0.85rem' }}>Categoría</label>
                        <input name="categoryPackage" className="form-control" style={inputStyle} placeholder="ej: AVENTURA, PLAYA" value={form.categoryPackage} onChange={handleChange} />
                    </div>
                    <div className="col-6">
                        <label style={{ color: '#aaa', fontSize: '0.85rem' }}>Temporada</label>
                        <select name="enumSeason" className="form-select" style={inputStyle} value={form.enumSeason} onChange={handleChange}>
                            {SEASONS.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <div className="col-6">
                        <label style={{ color: '#aaa', fontSize: '0.85rem' }}>Estado</label>
                        <select name="statusPackage" className="form-select" style={inputStyle} value={form.statusPackage} onChange={handleChange}>
                            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <div className="col-12">
                        <label style={{ color: '#aaa', fontSize: '0.85rem' }}>Servicios incluidos (separados por coma)</label>
                        <input name="includedServicesPackage" className="form-control" style={inputStyle} placeholder="Hotel, Desayuno, Transporte" value={form.includedServicesPackage} onChange={handleChange} />
                    </div>
                    <div className="col-12">
                        <label style={{ color: '#aaa', fontSize: '0.85rem' }}>Condiciones de viaje</label>
                        <textarea name="travelConditionsPackage" className="form-control" rows={2} style={inputStyle} value={form.travelConditionsPackage} onChange={handleChange} />
                    </div>
                </div>

                <div className="d-flex gap-2 mt-4">
                    <button className="btn flex-grow-1"
                            style={{ background: '#e94560', color: '#fff', border: 'none' }}
                            onClick={handleSubmit} disabled={saving}>
                        {saving ? 'Guardando...' : isEditing ? 'Guardar cambios' : 'Crear paquete'}
                    </button>
                    <button className="btn"
                            style={{ background: 'transparent', color: '#aaa', border: '1px solid #2a2a4a' }}
                            onClick={onClose}>
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PackageFormModal;