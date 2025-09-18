import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import jwtDecode from "jwt-decode";
import Home from "./pages/home";
import MisTurnos from "./pages/misTurnos";
import PedirTurno from "./pages/pedirTurno";
import PedirTurnoAdmin from "./pages/pedirTurnoAdmin";
import Tratamientos from "./pages/tratamientos";
import VerTurnos from "./pages/verTurnos";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import Login from "./pages/login";
import Register from "./pages/register";
import "./app.css";

function App({children}) {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token"); 
    if (token) {
      const decoded = jwtDecode(token);
      setUser({ dni: decoded.dni, role: decoded.role , nombre: decoded.nombre});
      setIsAuth(true);
    }
    setLoading(false); 
  }, []);

  if (loading) 
    return;
  console.log(user);
  return (
    <>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {children}
    </LocalizationProvider>
    <div className="app-container montserrat-font">
      <BrowserRouter>
        {user && <NavBar user={user} setUser={setUser}/>}
        <main>
          <Routes>
            {/* Rutas públicas */}
            {!user && (
              <>
                <Route path="/login" element={<Login setUser={setUser} />} />
                <Route path="/register" element={<Register />} />
                {/* si intenta ir a otro lado sin estar logueado → /login */}
                <Route path="*" element={<Navigate to="/login" replace />} />
              </>
            )}

            {/* Rutas privadas */}
            {isAuth && user?.role === "usuario" && (
              <>
                <Route path="/" element={<Home user={user}/>} />
                <Route path="/mis-turnos" element={<MisTurnos user={user}/>} />
                <Route path="/pedir-turno" element={<PedirTurno user={user}/>} />
                <Route path="/tratamientos" element={<Tratamientos />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            )}

            {isAuth && user?.role === "admin" && (
              <>
                <Route path="/" element={<Home user={user}/>} />
                <Route path="/pedir-turno" element={<PedirTurnoAdmin user={user}/>} />
                <Route path="/ver-turnos" element={<VerTurnos />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            )}
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
    </>
  );
}

export default App;