import { useState, useEffect } from "react";
import axios from "axios";

function Turnos() {
  const [turnos, setTurnos] = useState([]);

  useEffect(() => {
    axios.get("/api/turnos") // tu backend
      .then(res => setTurnos(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Turnos Ocupados</h2>
      <ul className="list-group">
        {turnos.map((t, idx) => (
          <li key={idx} className="list-group-item">
            {t.nombre} - {t.fecha} - {t.hora}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Turnos;
