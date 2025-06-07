import React, { createContext, useState, useContext } from 'react';
import { loginVendedor } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [codigo, setCodigo] = useState(() => localStorage.getItem('codigoUnico'));

    const login = async (codigoUnico) => {
        try {
            const response = await loginVendedor(codigoUnico);
            if (response.data) {
                localStorage.setItem('codigoUnico', codigoUnico);
                setCodigo(codigoUnico);
                return true;
            }
        } catch (error) {
            console.error("Error en el login:", error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('codigoUnico');
        setCodigo(null);
    };

    const value = { codigo, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};