import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx'; 
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [codigo, setCodigo] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const success = await login(codigo);
        if (success) {
            navigate('/dashboard');
        } else {
            setError('Código de acceso inválido.');
        }
        setIsLoading(false);
    };

    return (
        <div className="page form-container">
            <h2>Login de Vendedor</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={codigo} onChange={(e) => setCodigo(e.target.value)} placeholder="Ingresa tu código único" required />
                <button type="submit" disabled={isLoading}>{isLoading ? 'Entrando...' : 'Entrar'}</button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default LoginPage;