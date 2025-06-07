import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginVendedor } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [vendedor, setVendedor] = useState(null);

    useEffect(() => {
        const storedVendedor = localStorage.getItem('vendedor');
        if (storedVendedor) {
            setVendedor(JSON.parse(storedVendedor));
        }
    }, []);

    const login = async (codigoUnico) => {
        try {
            const response = await loginVendedor(codigoUnico);
            if (response.data) {
                const vendedorData = { ...response.data, codigo: codigoUnico };
                localStorage.setItem('vendedor', JSON.stringify(vendedorData));
                setVendedor(vendedorData);
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error en el login:", error);
            logout(); 
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('vendedor');
        setVendedor(null);
    };

    const updateVendedorInfo = (newInfo) => {
        setVendedor(prev => {
            const updated = { ...prev, ...newInfo };
            localStorage.setItem('vendedor', JSON.stringify(updated));
            return updated;
        });
    };

    const value = { vendedor, login, logout, updateVendedorInfo };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};