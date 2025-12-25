import axios from "axios";
import router from "~/router";

const api = axios.create({
    baseURL: "http://www.myproject.local:8080", // change to your backend URL
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});

// Optional: extract backend error message
api.interceptors.response.use(
    res => res,
    err => {
        const message =
            err.response?.data?.message ||
            err.response?.data?.error ||
            err.message ||
            "Unknown error";

        if (err.response?.status === 500) {
            // prevent redirect loop
            if (router.currentRoute.value.name !== "home") {
                setTimeout(() => {
                    router.replace({name: "home"});
                }, 1500);
            }
        }

        return Promise.reject(new Error(message));
    }
);

export default api;