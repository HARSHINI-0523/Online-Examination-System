import axios from 'axios';

const API = axios.create({
    baseURL: "https://online-examination-system-8-backend.onrender.com/api",
    withCredentials:true, 
});

export default API;