import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx"; 
import Layout from "./components/Layout"; 
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";

const ProtectedRoute = ({ children }) => {
    const { vendedor } = useAuth();
    if (!vendedor) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

function App() {
    return (
        <div className="app-wrapper"> 
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route element={<Layout />}>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/registro" element={<RegisterPage />} />
                            <Route 
                                path="/dashboard" 
                                element={
                                    <ProtectedRoute>
                                        <DashboardPage />
                                    </ProtectedRoute>
                                } 
                            />
                        </Route>
                    </Routes>
                </Router>
            </AuthProvider>
        </div>
    );
}

export default App;