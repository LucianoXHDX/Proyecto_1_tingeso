import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import travelPackagesService from "../services/travelPackagesService";
import {useKeycloak} from "@react-keycloak/web";


const TravelPackages = () => {
    //this its or manage of keyclak rples
    const { keycloak } = useKeycloak();
    const isAdmin = keycloak.tokenParsed?.resource_access?.['spring-client-api-rest']?.roles?.includes('admin_client_role');
    // end manage roles
    const navigate = useNavigate();
    const [packages, setPackages] = useState([]);

    const init = () => {
        travelPackagesService
            .getAll()
            .then((response) => {
                const availablePackages = response.data.filter(
                    (travelPackage) =>
                        travelPackage.availableSlotsPackage > 0
                        && travelPackage.statusPackage === "DISPONIBLE"
                );
                setPackages(availablePackages);
            })
            .catch((error) => {
                console.log("Error al cargar paquetes:", error);
            });
    };

    useEffect(() => {
        init();
    }, []);

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("¿Seguro que desea eliminar este paquete?");
        if (confirmDelete) {
            travelPackagesService
                .delete(id)
                .then(() => {
                    console.log("Paquete eliminado");
                    init();
                })
                .catch((error) => {
                    console.log("Error al eliminar:", error);
                });
        }
    };

    return (
        <div className="container mt-4">
            <h2>Paquetes de Viaje</h2>
            <br />
            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                <tr>
                    <th>Nombre</th>
                    <th>Destino</th>
                    <th>Precio por persona</th>
                    <th>Cupos disponibles</th>
                    <th>Estado</th>
                    <th>Temporada</th>
                    <th>Accion</th>
                </tr>
                </thead>
                <tbody>
                {packages.map((pkg) => (
                    <tr key={pkg.idPackage}>
                        <td>{pkg.namePackage}</td>
                        <td>{pkg.destinationPackage}</td>
                        <td>${pkg.pricePackage.toLocaleString()}</td>
                        <td>{pkg.availableSlotsPackage}</td>
                        <td>{pkg.statusPackage}</td>
                        <td>{pkg.enumSeason}</td>
                        <td>
                            <button
                                className="btn btn-info btn-sm"
                                onClick={() => navigate(`/travel-packages/${pkg.idPackage}`)}
                            >
                                Ver más
                            </button>
                            {isAdmin && (
                                <button
                                    className="btn btn-danger btn-sm ms-2"
                                    onClick={() => handleDelete(pkg.idPackage)}
                                >
                                    Eliminar
                                </button>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TravelPackages;