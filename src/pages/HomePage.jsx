import React, { useState, useEffect } from 'react';
import { getPublicTiendas } from '../services/api';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [tiendas, setTiendas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPublicTiendas()
            .then(response => {
                setTiendas(response.data);
            })
            .catch(error => {
                console.error("Error al cargar tiendas:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Cargando tiendas...</p>;

    return (
        <div className="page">
            <h1>Bienvenido a Komuna</h1>
            <p>Descubre las tiendas locales.</p>
            <div className="tienda-list">
                {tiendas.length > 0 ? tiendas.map(tienda => (
                    <div key={tienda.id} className="card">
                        <h3>{tienda.nombreTienda}</h3>
                        <p>{tienda.tipoNegocio}</p>
                        {/* <Link to={`/tienda/${tienda.id}`}>Ver detalles</Link> */}
                    </div>
                )) : <p>No hay tiendas disponibles.</p>}
            </div>
        </div>
    );
};

export default HomePage;