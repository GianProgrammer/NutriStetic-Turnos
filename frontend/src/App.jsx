import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import MisTurnos from "./pages/misTurnos";
import PedirTurno from "./pages/pedirTurno";
import Contacto from "./pages/contacto";
import Tratamientos from "./pages/tratamientos";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import "./app.css";

function App() {
  return (
    <div className="app-container montserrat-font">
      <BrowserRouter>
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mis-turnos" element={<MisTurnos />} />
            <Route path="/pedir-turno" element={<PedirTurno />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/tratamientos" element={<Tratamientos />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
