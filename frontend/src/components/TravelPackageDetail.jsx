import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

import travelPackagesService from '../services/travelPackagesService';

const TravelPackageDetail = () => {
    const { id } = useParams();           //this is for have the id of trvael
    const { keycloak     } = useKeycloak();
    const navigate = useNavigate();
    const [pkg, setPkg] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // if u dont authenticated u will be re send to keycloack
        if (!keycloak.authenticated) {
            keycloak.login();
            return;
        }

        // u can see all if ur athenticate
        travelPackagesService
            .get(id)
            .then((response) => {
                setPkg(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log('Error al cargar detalle:', error);
                setLoading(false);
            });
    }, [id, keycloak.authenticated]);

    if (loading) return <p className="container mt-4">Cargando...</p>;
    if (!pkg) return <p className="container mt-4">Paquete no encontrado</p>;
    console.log('pkg:', pkg);
    return (
        <div className="container mt-4">
            <button className="btn btn-secondary mb-3" onClick={() => navigate('/')}>
                volver
            </button>

            <h2>{pkg.namePackage}</h2>
            <hr />

            <table className="table table-bordered">
                <tbody>
                <tr><th>Destino</th><td>{pkg.destinationPackage}</td></tr>
                <tr><th>Descripción</th><td>{pkg.descriptionPackage}</td></tr>
                <tr><th>Fecha inicio</th><td>{pkg.startDatePackage}</td></tr>
                <tr><th>Fecha fin</th><td>{pkg.endDatePackage}</td></tr>
                <tr><th>Precio por persona</th><td>${pkg.pricePackage?.toLocaleString()} CLP</td></tr>
                <tr><th>Cupos disponibles</th><td>{pkg.availableSlotsPackage}</td></tr>
                <tr><th>Tipo de viaje</th><td>{pkg.travelType}</td></tr>
                <tr><th>Categoría</th><td>{pkg.categoryPackage}</td></tr>
                <tr><th>Temporada</th><td>{pkg.enumSeason}</td></tr>
                <tr><th>Estado</th><td>{pkg.statusPackage}</td></tr>
                <tr><th>Condiciones</th><td>{pkg.travelConditionsPackage}</td></tr>
                <tr>
                    <th>Servicios incluidos</th>
                    <td>{pkg.includedServicesPackage?.join(', ')}</td>
                </tr>
                </tbody>
            </table>
            <button className="btn btn-primary mb-3" onClick={() => navigate(`/bookings/new/${pkg.idPackage}`)}>
                resrevar
            </button>

        </div>
    );
};

export default TravelPackageDetail;