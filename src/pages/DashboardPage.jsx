import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx'; 
import { getMiTienda, updateTienda } from '../services/api';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
    const { vendedor, logout, updateVendedorInfo } = useAuth();
    const navigate = useNavigate();
    
    const [tiendaData, setTiendaData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (!vendedor?.codigo) {
            navigate('/login');
            return;
        }

        getMiTienda(vendedor.codigo)
            .then(response => {
                setTiendaData(response.data);
            })
            .catch(err => {
                console.error(err);
                setError('No se pudo cargar la información de la tienda.');
                if (err.response?.status === 401 || err.response?.status === 403) {
                    logout();
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }, [vendedor, navigate, logout]);

    const handleChange = (e) => {
        setTiendaData({ ...tiendaData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const { id, correoElectronico, codigoUnico, ...updateData } = tiendaData;
            const response = await updateTienda(vendedor.codigo, updateData);
            setSuccess('¡Tienda actualizada con éxito!');
            // Actualiza la info en el contexto global
            updateVendedorInfo({ nombreTienda: response.data.nombreTienda });
        } catch (err) {
            setError(err.response?.data?.message || 'Error al actualizar.');
        }
    };

    if (loading) return <p>Cargando panel...</p>;
    if (error) return <p className="error-message">{error}</p>;
    if (!tiendaData) return <p>No se encontraron datos de la tienda.</p>;

    return (
        <div className="page form-container">
            <h2>Panel de: {tiendaData.nombreTienda}</h2>
            <p>Aquí puedes editar la información de tu negocio.</p>
            <form onSubmit={handleSubmit}>
                <label>Nombre de la Tienda</label>
                <input type="text" name="nombreTienda" value={tiendaData.nombreTienda || ''} onChange={handleChange} />

                <label>Tipo de Negocio</label>
                <input type="text" name="tipoNegocio" value={tiendaData.tipoNegocio || ''} onChange={handleChange} />

                <label>Aforo de Personas</label>
                <input type="number" name="cupoPersonas" value={tiendaData.cupoPersonas || ''} onChange={handleChange} />

                <label>Horario de Atención</label>
                <textarea name="horarioAtencion" value={tiendaData.horarioAtencion || ''} onChange={handleChange}></textarea>
                
                <label>Ubicación</label>
                <textarea name="ubicacionExacta" value={tiendaData.ubicacionExacta || ''} onChange={handleChange}></textarea>
                
                <button type="submit">Guardar Cambios</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
        </div>
    );
};

export default DashboardPage;