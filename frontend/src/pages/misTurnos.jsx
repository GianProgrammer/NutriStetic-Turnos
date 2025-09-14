import { useState } from "react";
import axios from "axios";

function MisTurnos() {
  const [dni, setDni] = useState("");
  const [turnos, setTurnos] = useState([]);
  const [loading, setLoading] = useState(false);

  const buscarTurnos = async (e) => {
    e.preventDefault();
    if (!dni) return;

    setLoading(true);
    try {
      const res = await axios.get(`api/turnos/${dni}`);
      setTurnos(res.data);
    } catch (err) {
      console.error(err);
      alert("Error al buscar turnos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Mis Turnos</h2>

      {/* Formulario para pedir DNI */}
      <form onSubmit={buscarTurnos} className="d-flex gap-2 my-3">
        <input
          type="text"
          placeholder="Ingresá tu DNI"
          className="form-control"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary">
          Buscar
        </button>
      </form>

      {/* Lista de turnos */}
      {loading ? (
        <p>Cargando turnos...</p>
      ) : (
        <ul className="list-group">
          {turnos.length === 0 ? (
            <li className="list-group-item">No tenés turnos registrados</li>
          ) : (
            turnos.map((t, idx) => (
              <li key={idx} className="list-group-item">
                {t.servicio.charAt(0).toUpperCase() + t.servicio.slice(1)} - {t.nombre} - {t.fecha} - {t.hora}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

export default MisTurnos;
