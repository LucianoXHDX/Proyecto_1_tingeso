import {useNavigate} from "react-router-dom";
import {useState} from "react";
import travelPackagesService from "../services/travelPackagesService.js";


const PackageForm = () => {
    const navigate = useNavigate();
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [form, setForm] = useState({
        namePackage: '',
        destinationPackage: '',
        descriptionPackage:'',
        startDatePackage: '',
        endDatePackage: '',
        pricePackage: '',
        includedServicesPackage: '',
        travelConditionsPackage: '',
        availableSlotsPackage: '',
        travelType: '',
        enumSeason: '',
        categoryPackage: '',
        statusPackage:'DISPONIBLE' // when u create a package always be avalaible in the first time

    })
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
     const handleSubmit = async () => {
         if(form.namePackage === ''){
             setError("Debes ponerle nombre");
             return;
         }
         if(form.destinationPackage ===''){
             setError("debes poner destino");
             return;
         }
         if(form.pricePackage=== ''){
             setError("debes ponerle precio");
             return;
         }
         if(parseInt(form.pricePackage)<=0){
             setError("el precio debe ser mayor a cero");
             return;
         }
         if(form.availableSlotsPackage=== ''){
             setError("debes ponerle cantidad de puestos disponibles");
             return;
         }
         if(parseInt(form.availableSlotsPackage)<=0){
             setError("los puestos deben ser mayor a 0");
             return;
         }
         if(form.startDatePackage==='' || form.endDatePackage===''){
             setError("debes poner fecha de inicio y de fin al paquete");
             return;
         }
         if(form.endDatePackage<=form.startDatePackage){
             setError("la fecha de fin debe ser mayor a la de inicio");
             return;
         }

         setError(null);
         setSaving(true);

         try{
             const payload = {
                 namePackage: form.namePackage,
                 destinationPackage: form.destinationPackage,
                 descriptionPackage: form.descriptionPackage,
                 startDatePackage: form.startDatePackage,
                 endDatePackage: form.endDatePackage,
                 pricePackage: parseInt(form.pricePackage),
                 includedServicesPackage: form.includedServicesPackage
                     .split(',')
                     .map((s) => s.trim())
                     .filter(Boolean),
                 travelConditionsPackage: form.travelConditionsPackage,
                 availableSlotsPackage: parseInt(form.availableSlotsPackage),
                 travelType: form.travelType,
                 enumSeason: form.enumSeason,
                 categoryPackage: form.categoryPackage,
                 statusPackage: form.statusPackage,
             };
             await travelPackagesService.create(payload);
             navigate('/');

         }
         catch (err){
             console.error("Error al crear un paquete turistico:", err);
             alert("error al crear el paquete");
         }finally {
             setSaving(false);
         }

     };
    return (
        <div className="container mt-4" style={{ maxWidth: '700px' }}>
            <button className="btn btn-secondary mb-3" onClick={() => navigate('/admin')}>
                ← Volver
            </button>

            <h2>Crear Paquete de Viaje</h2>
            <hr />

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="row g-3">
                <div className="col-12">
                    <label className="form-label">Nombre *</label>
                    <input type="text" className="form-control" name="namePackage"
                           value={form.namePackage} onChange={handleChange} />
                </div>

                <div className="col-12">
                    <label className="form-label">Destino *</label>
                    <input type="text" className="form-control" name="destinationPackage"
                           value={form.destinationPackage} onChange={handleChange} />
                </div>

                <div className="col-12">
                    <label className="form-label">Descripción</label>
                    <textarea className="form-control" name="descriptionPackage" rows={3}
                              value={form.descriptionPackage} onChange={handleChange} />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Fecha inicio *</label>
                    <input type="date" className="form-control" name="startDatePackage"
                           value={form.startDatePackage} onChange={handleChange} />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Fecha fin *</label>
                    <input type="date" className="form-control" name="endDatePackage"
                           value={form.endDatePackage} onChange={handleChange} />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Precio por persona (CLP) *</label>
                    <input type="number" className="form-control" name="pricePackage"
                           value={form.pricePackage} onChange={handleChange} />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Cupos disponibles *</label>
                    <input type="number" className="form-control" name="availableSlotsPackage"
                           value={form.availableSlotsPackage} onChange={handleChange} />
                </div>

                <div className="col-12">
                    <label className="form-label">Servicios incluidos (separados por coma)</label>
                    <input type="text" className="form-control" name="includedServicesPackage"
                           placeholder="Hotel, Desayuno, Transporte"
                           value={form.includedServicesPackage} onChange={handleChange} />
                </div>

                <div className="col-12">
                    <label className="form-label">Condiciones de viaje</label>
                    <textarea className="form-control" name="travelConditionsPackage" rows={2}
                              value={form.travelConditionsPackage} onChange={handleChange} />
                </div>

                <label className="form-label">tipo de viaje</label>

                <select className="form-select" name="travelType"
                        value={form.travelType} onChange={handleChange}>
                    <option value="">Selecciona  un tipo de viaje</option>
                    <option value="NACIONAL">NAcional</option>
                    <option value="INTERNACIONAL">internacional</option>
                    <option value="CRUSERO">crusero</option>
                    <option value="TOUR">tour</option>

                </select>


                <label className="form-label">Categoria</label>
                <select className="form-select" name="categoryPackage"
                        value={form.categoryPackage} onChange={handleChange}>
                    <option value="">Selecciona una categoria</option>
                    <option value="SALIDA_ROMANTICA">Salida Romantica</option>
                    <option value="AVENTURA">Aventura</option>
                    <option value="ALL_INCLUSIVE">Todo incluido</option>
                    <option value="FAMILIAR">Familiar</option>

                </select>

                <div className="col-md-4">
                    <label className="form-label">Temporada</label>
                    <select className="form-select" name="enumSeason"
                            value={form.enumSeason} onChange={handleChange}>
                        <option value="">Selecciona una temporada</option>
                        <option value="INVIERNO">Invierno</option>
                        <option value="VERANO">Verano</option>
                        <option value="PRIMAVERA">Primavera</option>
                        <option value="OTOÑO">Otoño</option>
                    </select>
                </div>


            </div>

            <div className="d-flex gap-2 mt-4">
                <button className="btn btn-primary" onClick={handleSubmit} disabled={saving}>
                    {saving ? 'Creando...' : 'Crear paquete'}
                </button>
                <button className="btn btn-secondary" onClick={() => navigate('/admin')}>
                    Cancelar
                </button>
            </div>
        </div>
    );
};
export default PackageForm;

