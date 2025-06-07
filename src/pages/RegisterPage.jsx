import React, { useState } from 'react';
import { registerVendedor } from '../services/api';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [formData, setFormData] = useState({ nombreTienda: '', correoElectronico: '', tipoNegocio: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);

        try {
            const response = await registerVendedor(formData);
            setSuccess(`¡Registro exitoso! Tu código de acceso es: ${response.data.codigoUnico}. ¡Guárdalo bien! Serás redirigido al login.`);
            setTimeout(() => navigate('/login'), 5000); 
        } catch (err) {
            setError(err.response?.data?.message || 'Error en el registro. Intenta de nuevo.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="page form-container">
            <h2>Registra tu Tienda</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="nombreTienda" placeholder="Nombre de la Tienda" onChange={handleChange} required />
                <input type="email" name="correoElectronico" placeholder="Email de contacto" onChange={handleChange} required />
                <input type="text" name="tipoNegocio" placeholder="Tipo de Negocio (ej. Restaurante)" onChange={handleChange} />
                <button type="submit" disabled={isLoading}>{isLoading ? 'Registrando...' : 'Registrar'}</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
        </div>
    );
};

export default RegisterPage;