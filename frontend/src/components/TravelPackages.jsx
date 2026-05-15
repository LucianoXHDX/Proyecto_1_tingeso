import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import travelPackagesService from "../services/travelPackagesService";

const TravelPackages = () => {
    const navigate = useNavigate();
    const [packages, setPackages] = useState([]);

    const init = () => {
        travelPackagesService
            .getAll()
            .then((response) => {
                console.log("Paquetes cargados:", response.data);
                setPackages(response.data);
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
                    <th>Precio por pesona</th>
                    <th>Cupos disponibles </th>
                    <th>Estado</th>
                    <th>Temporada</th>
                    <th>Operaciones</th>
                </tr>
                </thead>
                <tbody>
                {packages.map((pkg) => (
                    <tr key={pkg.idPackage}>
                        <td>{pkg.namePackage}</td>
                        <td>{pkg.destinationPackage}</td>
                        <td>${pkg.pricePackage?.toLocaleString()}</td>
                        <td>{pkg.availableSlotsPackage}</td>
                        <td>{pkg.statusPackage}</td>
                        <td>{pkg.enumSeason}</td>
                        <td>
                            <button
                                className="btn btn-danger btn-sm ms-2"
                                onClick={() => navigate(`/travel-packages/${pkg.idPackage}`)}
                            >
                                Obtener mas informacion
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