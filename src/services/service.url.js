import axios from '../utils/axios.js';
const createUrl = async (data) => {
    try {
        const res = await axios.post(`/api/url`, data);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}
const getUrl = async (slug) => {
    try {
        const res = await axios.get(`/api/url/${slug}`);
        return res.data;
    }
    catch (error) {
        console.error(error);
    }
}
const deleteUrl = async (id) => {
    try {
        const res = await axios.delete(`/api/url/${id}`);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}
const updateUrl = async (id, data) => {
    try {
        const res = await axios.put(`/api/url/${id}`, data);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}
export { createUrl, getUrl, deleteUrl, updateUrl };