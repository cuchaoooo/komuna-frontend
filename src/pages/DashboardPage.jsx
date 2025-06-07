import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getMiTienda, updateTienda } from '../services/api';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
    const { codigo, logout } = useAuth();
    const navigate = useNavigate();
    const [tienda, setTienda] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (!codigo) {
            navigate('/login');
            return;
        }

        getMiTienda(codigo)
            .then(response => {
                setTienda(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError('No se pudo cargar la información de la tienda.');
                if (err.response?.status === 401) logout();
                setLoading(false);
            });
    }, [codigo, navigate, logout]);

    const handleChange = (e) => {
        setTienda({ ...tienda, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            const { id, correoElectronico, codigoUnico, ...updateData } = tienda;
            await updateTienda(codigo, updateData);
            setSuccess('¡Tienda actualizada con éxito!');
        } catch (err) {
            setError(err.response?.data?.message || 'Error al actualizar.');
        }
    };

    if (loading) return <p>Cargando panel...</p>;
    if (error) return <p className="error-message">{error}</p>;
    if (!tienda) return null;

    return (
        <div className="page form-container">
            <h2>Panel de mi Tienda: {tienda.nombreTienda}</h2>
            <form onSubmit={handleSubmit}>
                <label>Nombre de la Tienda</label>
                <input type="text" name="nombreTienda" value={tienda.nombreTienda || ''} onChange={handleChange} />

                <label>Tipo de Negocio</label>
                <input type="text" name="tipoNegocio" value={tienda.tipoNegocio || ''} onChange={handleChange} />

                <label>Aforo de Personas</label>
                <input type="number" name="cupoPersonas" value={tienda.cupoPersonas || ''} onChange={handleChange} />

                <label>Horario</label>
                <textarea name="horarioAtencion" value={tienda.horarioAtencion || ''} onChange={handleChange}></textarea>
                
                <label>Ubicación</label>
                <textarea name="ubicacionExacta" value={tienda.ubicacionExacta || ''} onChange={handleChange}></textarea>
                
                <button type="submit">Guardar Cambios</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
        </div>
    );
};

export default DashboardPage;