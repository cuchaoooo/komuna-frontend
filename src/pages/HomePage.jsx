import React, { useState, useEffect } from 'react';
import { getPublicTiendas } from '../services/api';

const HomePage = () => {
    const [tiendas, setTiendas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPublicTiendas()
            .then(response => {
                setTiendas(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error al cargar tiendas:", error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Cargando...</p>;

    return (
        <div className="page">
            <h1>Bienvenido a Komuna</h1>
            <p>Descubre las tiendas locales.</p>
            <div className="tienda-list">
                {tiendas.map(tienda => (
                    <div key={tienda.id} className="card">
                        <h3>{tienda.nombreTienda}</h3>
                        <p>{tienda.tipoNegocio}</p>
                        {}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;