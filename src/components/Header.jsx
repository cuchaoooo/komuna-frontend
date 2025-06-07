import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx'; 

const Header = () => {
    const { vendedor, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="header">
            <Link to="/" className="logo">Komuna</Link>
            <nav>
                <Link to="/">Tiendas</Link>
                {vendedor ? (
                    <>
                        <Link to="/dashboard">Mi Panel</Link>
                        <button onClick={handleLogout} className="nav-button">Cerrar Sesión</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login Vendedor</Link>
                        <Link to="/registro">Registro</Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;