import axios from 'axios';

const api = axios.create({
    withCredentials: true,
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        console.log("ErrorResponse: ", error.response);
        if (error.response.status === 401) {
            try {
                const refresh = await axios.get(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/refresh`,
                    { withCredentials: true }
                );
                localStorage.setItem('token', refresh.data.accessToken);
                return api.request(originalRequest);
            } catch (e) {
                console.log(e, 'not unauthorized');
            }
        }
        if (error.response.status === 400) {
            return error.response;
        }
    }
);

export default api;
