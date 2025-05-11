import axios from "../utils/axios.blog.js";
const createBlog = async (data) => {
    try {
        const res = await axios.post(`/api/blog`, data);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}
const getBlog = async (slug) => {
    try {
        const res = await axios.get(`/api/blog/${slug}`);
        return res.data;
    }
    catch (error) {
        console.error(error);
    }
}
const deleteBlog = async (id) => {
    try {
        const res = await axios.delete(`/api/blog/${id}`);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}
const updateBlog = async (id, data) => {
    try {
        const res = await axios.put(`/api/blog/${id}`, data);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}
export { createBlog, getBlog, deleteBlog, updateBlog };