import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import MisTurnos from "./pages/misTurnos";
import PedirTurno from "./pages/pedirTurno";
import Contacto from "./pages/contacto"
import NavBar from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mis-turnos" element={<MisTurnos />} />
        <Route path="/pedir-turno" element={<PedirTurno />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
