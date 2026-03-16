import axios from "axios";
import router from "~/router";

const api = axios.create({
    /*baseURL: "http://www.myproject.local:8080", // change to your backend URL*/
    baseURL: "/api", // Docker apps1, reference to vite.config.ts
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 300000,
    withCredentials: true
});

// Optional: extract backend error message
api.interceptors.response.use(
    res => res,
    err => {
        console.error("FULL AXIOS ERROR:", err);
        console.error("ERROR CONFIG:", err.config);

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
                }, 300000);
            }
        }

        return Promise.reject(new Error(message));
    }
);

export default api;