import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/bookings');
};

const create = data => {
    return httpClient.post("/bookings", data);
};

const get = id => {
    return httpClient.get(`/bookings/${id}`);
};

const remove = id => {
    return httpClient.delete(`/bookings/${id}`);
};
const getByEmail = (email) => {
    return httpClient.get(`/bookings/my-bookings?email=${email}`);}
export default {getAll,create,get,remove,getByEmail};