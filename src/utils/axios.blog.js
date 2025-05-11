import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_BACK_END_BLOG_URL || "http://localhost:5001",
    headers: {
        'Content-Type': 'application/json',
    },
});

// You can also add interceptors for requests or responses
instance.interceptors.request.use(
    (config) => {
        // Modify request before sending (e.g., add token to headers)
        return config;
    },
    (error) => Promise.reject(error)
);

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle error responses
        return Promise.reject(error);
    }
);

export default instance;
