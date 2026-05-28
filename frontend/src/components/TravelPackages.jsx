import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import travelPackagesService from "../services/travelPackagesService";
import {useKeycloak} from "@react-keycloak/web";


const TravelPackages = () => {
    //this its or manage of keyclak rples
    const { keycloak } = useKeycloak();

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
                .remove(id)
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
            <div className="bg-white bg-opacity-90 rounded p-3 mb-3 d-inline-block">
            <h2>Paquetes de Viaje</h2>
            </div>
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
                                <div className="bg-white bg-opacity-90 rounded p-3 mb-3 d-inline-block">
                                Ver más
                                </div>
                            </button>

                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TravelPackages;