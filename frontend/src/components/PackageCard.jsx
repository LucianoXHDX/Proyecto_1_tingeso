import React from 'react';

const categoryColors = {
    AVENTURA: '#e94560',
    PLAYA: '#0099ff',
    CULTURAL: '#f4a261',
    NATURALEZA: '#2a9d8f',
    DEFAULT: '#888',
};

const statusLabels = {
    AVAILABLE: { label: 'Disponible', color: '#2a9d8f' },
    SOLD_OUT: { label: 'Agotado', color: '#e94560' },
    COMING_SOON: { label: 'Próximamente', color: '#f4a261' },
};

const PackageCard = ({ pkg, isAdmin, onEdit, onDelete }) => {
    const catColor = categoryColors[pkg.categoryPackage] || categoryColors.DEFAULT;
    const status = statusLabels[pkg.statusPackage] || { label: pkg.statusPackage, color: '#888' };

    return (
        <div
            style={{
                background: 'linear-gradient(160deg, #16213e 0%, #1a1a2e 100%)',
                border: '1px solid #2a2a4a',
                borderRadius: '12px',
                overflow: 'hidden',
                transition: 'transform 0.2s, box-shadow 0.2s',
                height: '100%',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = `0 8px 32px ${catColor}33`;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
            }}
        >
            <div style={{ background: catColor, padding: '0.5rem 1rem', display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ color: '#fff', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '1px' }}>
          {pkg.categoryPackage || 'SIN CATEGORÍA'}
        </span>
                <span style={{ color: '#fff', fontSize: '0.75rem' }}>{pkg.travelType}</span>
            </div>

            <div style={{ padding: '1.2rem' }}>
                <h5 style={{ color: '#fff', fontFamily: '"Playfair Display", serif', marginBottom: '0.3rem' }}>
                    {pkg.namePackage}
                </h5>
                <p style={{ color: catColor, fontSize: '0.9rem', marginBottom: '0.8rem' }}>
                    📍 {pkg.destinationPackage}
                </p>
                <p style={{ color: '#aaa', fontSize: '0.85rem', marginBottom: '1rem', lineHeight: '1.5' }}>
                    {pkg.descriptionPackage?.slice(0, 100)}{pkg.descriptionPackage?.length > 100 ? '...' : ''}
                </p>
                <div style={{ color: '#888', fontSize: '0.8rem', marginBottom: '0.8rem' }}>
                    📅 {pkg.startDatePackage} → {pkg.endDatePackage}
                </div>

                {pkg.includedServicesPackage?.length > 0 && (
                    <div className="mb-2">
                        {[...pkg.includedServicesPackage].slice(0, 3).map((s, i) => (
                            <span key={i} style={{
                                display: 'inline-block', background: '#0f3460', color: '#ccc',
                                fontSize: '0.7rem', padding: '2px 8px', borderRadius: '20px',
                                marginRight: '4px', marginBottom: '4px',
                            }}>
                {s}
              </span>
                        ))}
                    </div>
                )}

                <div className="d-flex justify-content-between align-items-center mt-3">
                    <div>
            <span style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 'bold' }}>
              ${pkg.pricePackage?.toLocaleString()}
            </span>
                        <span style={{ color: '#888', fontSize: '0.8rem' }}> CLP</span>
                    </div>
                    <div className="text-end">
                        <div style={{ color: status.color, fontSize: '0.8rem', fontWeight: 'bold' }}>{status.label}</div>
                        <div style={{ color: '#888', fontSize: '0.75rem' }}>{pkg.availableSlotsPackage} cupos</div>
                    </div>
                </div>

                {isAdmin && (
                    <div className="d-flex gap-2 mt-3">
                        <button className="btn btn-sm flex-grow-1"
                                style={{ background: '#0f3460', color: '#fff', border: 'none' }}
                                onClick={() => onEdit(pkg)}>
                            ✏ Editar
                        </button>
                        <button className="btn btn-sm"
                                style={{ background: 'transparent', color: '#e94560', border: '1px solid #e94560' }}
                                onClick={() => onDelete(pkg.idPackage)}>
                            🗑
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PackageCard;