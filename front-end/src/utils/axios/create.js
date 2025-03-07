import axios from "axios";
const baseURL = import.meta.env.VITE_BACKEND_URL;

// console.log('env :', import.meta.env);
console.log("baseURL :", baseURL);

const createClient = axios.create({
    baseURL,
    withCredentials:true
});

export default createClient;