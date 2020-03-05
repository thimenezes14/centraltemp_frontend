import axios from 'axios';

const MEU_IP = '192.168.4.1';
const MINHA_PORTA = '1020';

const api = axios.create({
    baseURL: `http://${MEU_IP}:${MINHA_PORTA}`
})

export default api;