import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [codigo, setCodigo] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const success = await login(codigo);
        if (success) {
            navigate('/dashboard');
        } else {
            setError('Código de acceso inválido.');
        }
    };

    return (
        <div className="page form-container">
            <h2>Login de Vendedor</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={codigo} onChange={(e) => setCodigo(e.target.value)} placeholder="Ingresa tu código único" required />
                <button type="submit">Entrar</button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default LoginPage;