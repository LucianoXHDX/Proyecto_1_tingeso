
import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/travel-packages');
};

const get = id => {

    return httpClient.get(`/travel-packages/${id}`);
};

const create = data => {
    return httpClient.post("/travel-packages", data);
};

const update = (id, data) => {

    return httpClient.put(`/travel-packages/${id}`, data);
};

const remove = id => {
    return httpClient.delete(`/travel-packages/${id}`);
};


export default {getAll,get,create,update,remove};