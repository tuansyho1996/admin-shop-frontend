import axios from '../utils/axios.js';
const createGlobal = async (data) => {
    try {
        const res = await axios.post(`/api/global`, data);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}
const getGlobal = async (slug) => {
    try {
        const res = await axios.get(`/api/global/${slug}`);
        return res.data;
    }
    catch (error) {
        console.error(error);
    }
}
const deleteGlobal = async (id) => {
    try {
        const res = await axios.delete(`/api/global/${id}`);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}
const updateGlobal = async (id, data) => {
    try {
        const res = await axios.put(`/api/global/${id}`, data);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}
export { createGlobal, getGlobal, deleteGlobal, updateGlobal };