import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const getPublicTiendas = () => apiClient.get('/visitantes/tiendas');
export const getTiendaById = (id) => apiClient.get(`/visitantes/tiendas/${id}`);


export const registerVendedor = (data) => apiClient.post('/vendedores/registrar', data);

export const loginVendedor = (codigoUnico) => apiClient.post('/vendedores/login', { codigoUnico });

export const getMiTienda = (codigoUnico) => apiClient.get(`/vendedores/${codigoUnico}/mi-tienda`);

export const updateTienda = (codigoUnico, data) => apiClient.put(`/vendedores/${codigoUnico}/tienda`, data);

export const recuperarCodigo = (email) => apiClient.get(`/vendedores/recuperar-codigo?email=${email}`);