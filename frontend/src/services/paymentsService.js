import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/payments');
};

const create = data => {
    return httpClient.post("/payments", data);
};

const get = id => {
    return httpClient.get(`/payments/${id}`);
};

const remove = id => {
    return httpClient.delete(`/payments/${id}`);
};

const update = (id, data) => {

    return httpClient.put(`/travel-payments/${id}`, data);
};

export default {getAll,get,create,update,remove};