import api from './APIConfig.js';

const bookingService = {
    getAll: () => api.get('/bookings'),
    getById: (id) => api.get(`/bookings/${id}`),
    create: (bookingData) => api.post('/bookings', bookingData),
    delete: (id) => api.delete(`/bookings/${id}`),
};

export default bookingService;