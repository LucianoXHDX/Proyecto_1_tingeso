import React, { useState, useEffect } from 'react';
import travelPackagesService from '../services/travelPackagesService';
import { useAuth } from '../context/AuthContext';
import PackageCard from '../components/PackageCard';
import PackageFormModal from '../components/PackageFormModal';

const TravelPackagesPage = () => {
    const { isAdmin } = useAuth();
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editingPackage, setEditingPackage] = useState(null);
    const [filter, setFilter] = useState('');

    const fetchPackages = async () => {
        try {
            setLoading(true);
            const response = await travelPackagesService.getAll();
            setPackages(response.data);
            setError(null);
        } catch (err) {
            setError('Error al cargar los paquetes. Verifica que el backend esté corriendo.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchPackages(); }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('¿Seguro que deseas eliminar este paquete?')) return;
        try {
            await travelPackagesService.delete(id);
            setPackages(packages.filter((p) => p.idPackage !== id));
        } catch (err) {
            alert('Error al eliminar el paquete');
        }
    };

    const filteredPackages = packages.filter((p) =>
        p.namePackage?.toLowerCase().includes(filter.toLowerCase()) ||
        p.destinationPackage?.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div style={{ minHeight: '100vh', background: '#0a0a1a', padding: '2rem' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h1 style={{ color: '#fff', fontFamily: '"Playfair Display", serif', fontSize: '2.5rem' }}>
                        Paquetes de Viaje
                    </h1>
                    <p style={{ color: '#888' }}>Descubre nuestros destinos más exclusivos</p>
                </div>
                {isAdmin() && (
                    <button className="btn" style={{ background: '#e94560', color: '#fff', border: 'none', padding: '0.6rem 1.5rem' }}
                            onClick={() => { setEditingPackage(null); setShowModal(true); }}>
                        + Nuevo Paquete
                    </button>
                )}
            </div>

            <div className="mb-4">
                <input type="text" className="form-control" placeholder="Buscar por nombre o destino..."
                       value={filter} onChange={(e) => setFilter(e.target.value)}
                       style={{ background: '#16213e', border: '1px solid #e94560', color: '#fff', maxWidth: '400px' }} />
            </div>

            {loading && (
                <div className="text-center py-5">
                    <div className="spinner-border" style={{ color: '#e94560' }} />
                    <p style={{ color: '#888', marginTop: '1rem' }}>Cargando paquetes...</p>
                </div>
            )}

            {error && (
                <div className="alert" style={{ background: '#3a0a0a', border: '1px solid #e94560', color: '#e94560' }}>
                    ⚠ {error}
                </div>
            )}

            {!loading && !error && (
                <div className="row g-4">
                    {filteredPackages.length === 0
                        ? <p style={{ color: '#888' }}>No se encontraron paquetes.</p>
                        : filteredPackages.map((pkg) => (
                            <div key={pkg.idPackage} className="col-md-6 col-lg-4">
                                <PackageCard pkg={pkg} isAdmin={isAdmin()}
                                             onEdit={(p) => { setEditingPackage(p); setShowModal(true); }}
                                             onDelete={handleDelete} />
                            </div>
                        ))
                    }
                </div>
            )}

            {showModal && (
                <PackageFormModal existingPackage={editingPackage}
                                  onSuccess={() => { setShowModal(false); fetchPackages(); }}
                                  onClose={() => setShowModal(false)} />
            )}
        </div>
    );
};

export default TravelPackagesPage;