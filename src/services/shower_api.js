import axios from 'axios';
import { getToken } from "./auth";

const MEU_IP = process.env.REACT_APP_IP;
const MINHA_PORTA = '8000';

const api = axios.create({
    baseURL: `http://${MEU_IP}:${MINHA_PORTA}/banhos/`
});

api.interceptors.request.use(async config => {
    const token = getToken()
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
}, error => Promise.reject(error))

api.interceptors.response.use(response => response, error => {
    return Promise.reject(error)
})

export default api;