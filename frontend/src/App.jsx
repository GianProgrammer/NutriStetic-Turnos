import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Turnos from "./pages/turnos";
import Contacto from "./pages/contacto";
import NavBar from "./components/navbar";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/turnos" element={<Turnos />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;