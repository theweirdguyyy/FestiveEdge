import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api'
});

export const bankService = {
    getBanks: (params) => api.get('/banks', { params }),
    getBank: (id) => api.get(`/banks/${id}`),
    createBank: (data) => api.get('/banks', data), // Placeholder for admin
    deleteBank: (id) => api.delete(`/banks/${id}`)
};

export const offerService = {
    getAllOffers: (params) => api.get('/offers', { params }),
    getOffers: (bankId) => api.get(`/offers/bank/${bankId}`),
    getFestivals: () => api.get('/offers/festivals'),
    addOffer: (data) => api.post('/offers', data)
};

export default api;
