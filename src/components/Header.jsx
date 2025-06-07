import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { codigo, logout } = useAuth();
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
                {codigo ? (
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
