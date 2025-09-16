import { useState } from "react";
import axios from "axios";

function formatearFechas(a, b) {
  const [aYear, aMonth, aDay] = a.fecha.split("-").map(Number);
  const [bYear, bMonth, bDay] = b.fecha.split("-").map(Number);

  const fechaA = new Date(aYear, aMonth - 1, aDay);
  const fechaB = new Date(bYear, bMonth - 1, bDay);

  return fechaA - fechaB; // funciona para ordenar
}


function MisTurnos() {
  const [dni, setDni] = useState("");
  const [turnos, setTurnos] = useState([]);
  const [loading, setLoading] = useState(false);

  const buscarTurnos = async (e) => {
    e.preventDefault();
    if (!dni) return;

    setLoading(true);
    try {
      const res = await axios.get(`/api/turnos/${dni}`);
      setTurnos(res.data);
    } catch (err) {
      console.error(err);
      alert("Error al buscar turnos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      {/* Título */}
      <h2 className="text-center mb-4 fw-bold" style={{ color: "#8CC641" }}>
        Mis Turnos
      </h2>

      {/* Formulario */}
      <form
        onSubmit={buscarTurnos}
        className="d-flex justify-content-center gap-2 mb-4"
      >
        <input
          type="text"
          placeholder="Ingresá tu DNI"
          className="form-control w-50"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          required
        />
        <button
          type="submit"
          className="btn"
          style={{
            backgroundColor: "#25D366",
            color: "#fff",
            fontWeight: "600",
            padding: "0.6rem 1.5rem",
            borderRadius: "8px",
            border: "none",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = "#1ebe57")
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = "#25D366")
          }
        >
          Buscar
        </button>
      </form>

      {/* Lista de turnos */}
      <div className="row justify-content-center">
        <div className="col-md-8">
          {loading ? (
            <div className="text-center my-4">
              <div
                className="spinner-border"
                role="status"
                style={{ color: "#8CC641" }}
              >
                <span className="visually-hidden">Cargando...</span>
              </div>
            </div>
          ) : (
            <ul className="list-group shadow-sm rounded">
              {turnos.length === 0 ? (
                <li className="list-group-item text-center text-muted">
                  No tenés turnos registrados
                </li>
              ) : (
                turnos.sort(formatearFechas).map((t, idx) => (
                  <li
                    key={idx}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <span>
                      <strong>
                        {(t.servicio.charAt(0).toUpperCase() +
                          t.servicio.slice(1)).replace("_", " ")}
                      </strong>{" "}
                      - {t.nombre}
                    </span>
                    <span className="badge rounded-pill" style={{ backgroundColor: "#D3DA11", color: "#000" }}>
                      {t.fecha} - {t.hora}
                    </span>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default MisTurnos;
