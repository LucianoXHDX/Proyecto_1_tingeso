import api from './APIConfig.js';

const travelPackagesService = {
    getAll: () => api.get('/travel-packages'),
    getById: (id) => api.get(`/travel-packages/${id}`),
    create: (packageData) => api.post('/travel-packages', packageData),
    update: (id, packageData) => api.put(`/travel-packages/${id}`, packageData),
    delete: (id) => api.delete(`/travel-packages/${id}`),
};

export default travelPackagesService;