import axios from "axios";
const baseURL = import.meta.env.VITE_BACKEND_URL || "https://simplenotesapp-h9bp.onrender.com/api/v1";

console.log("baseURL :", baseURL);

const createClient = axios.create({
    baseURL,
    withCredentials:true
});

export default createClient;