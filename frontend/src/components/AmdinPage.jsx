import {useNavigate} from 'react-router-dom';
import { MdDeleteForever } from "react-icons/md";
import { LuPackagePlus } from "react-icons/lu";
import { MdOutlineTableChart } from "react-icons/md";

const AdminPage = () => {
    const navigate = useNavigate();
    return (
        <div className="container mt-4">
            <h2>Panel de administracion</h2>
            <hr/>
            <div className="row g-4 mt-2">
                <div className="col-md-6">
                    <div className="card h-100 text-card p-4"
                         style={{cursor: 'pointer'}}
                         onClick={() => navigate('/admin/packages/new')}>
                        <div className="card-body">
                            <LuPackagePlus />
                            <h5 className="card-titile mt-2">Crea un nuevo paquete</h5>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card h-100 text-card p-4"
                         style={{cursor: 'pointer'}}
                         onClick={() => navigate('/admin/packages/delete')}>
                        <div className="card-body">
                            <MdDeleteForever />
                            <h5 className="card-title mt-2">Elimina un paquete</h5>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card h-100 text-card p-4"
                         style={{cursor: 'pointer'}}
                         onClick={() => navigate('/admin/packages')}>
                        <div className="card-body">
                            <MdOutlineTableChart />
                            <h5 className="card-title mt-2">Ver todos los paquetes</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;