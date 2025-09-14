import { useState } from "react";
import axios from "axios";

function PedirTurno() {
  const [form, setForm] = useState({
    nombre: "",
    dni: "",
    servicio: "",
    fecha: "",
    hora: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/turnos", form)
      .then(() => alert("Turno reservado con éxito"))
      .catch((err) => console.error(err));
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow-lg p-4 border-0 rounded-4" style={{ maxWidth: "500px", width: "100%" }}>
        <h2 className="text-center mb-4 text-success fw-bold">Reservá tu turno</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            className="form-control mb-3"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="dni"
            placeholder="DNI"
            className="form-control mb-3"
            onChange={handleChange}
            required
          />
          <select
            name="servicio"
            className="form-control mb-3"
            onChange={handleChange}
            required
          >
            <option value="" disabled selected>
              -- Seleccioná un servicio --
            </option>
            <option value="body_up">Body Up Teslagen</option>
            <option value="botox">Bot-Ox</option>
            <option value="carboxiterapia">Carboxiterapia</option>
            <option value="chip_sexual">Chip Sexual (Hormonal)</option>
            <option value="criolipolisis">Criolipólisis</option>
            <option value="depilacion">Depilación Láser Soprano Ice</option>
            <option value="hilos_tensores">Hilos Tensores</option>
            <option value="lipolaser">Lipoláser</option>
            <option value="masajes_orientales">Masajes Orientales</option>
            <option value="microblading">Microblading</option>
            <option value="microdermoabrasion">Microdermoabrasión</option>
            <option value="nutricion">Nutrición</option>
            <option value="prp">PRP</option>
            <option value="relleno">Relleno De Labios Y Pómulos Rusas</option>
            <option value="radiofrecuencia">Radiofrecuencia Corporal Y Facial</option>
            <option value="rinomodelacion">Rinomodelación</option>
            <option value="terapia_esclerosante">Terapia Esclerosante</option>
            <option value="vela_shape">Vela Shape</option>
            <option value="capsula_term">Cápsula Termodinámica De Ondas Rusas</option>
          </select>
          <input
            type="date"
            name="fecha"
            className="form-control mb-3"
            onChange={handleChange}
            required
          />
          <input
            type="time"
            name="hora"
            className="form-control mb-4"
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="btn w-100 fw-bold text-white"
            style={{
              background: "linear-gradient(135deg, #2e7d32, #66bb6a)",
              border: "none",
              padding: "12px",
              borderRadius: "12px",
              transition: "all 0.3s ease-in-out",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.15)"
            }}
            onMouseOver={(e) =>
              (e.target.style.background =
                "linear-gradient(135deg, #1b5e20, #388e3c)")
            }
            onMouseOut={(e) =>
              (e.target.style.background =
                "linear-gradient(135deg, #2e7d32, #66bb6a)")
            }
          >
            Reservar turno
          </button>
        </form>
      </div>
    </div>
  );
}

export default PedirTurno;