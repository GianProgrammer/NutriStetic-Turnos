import { useState } from "react";
import axios from "axios";

function PedirTurno() {
  const [form, setForm] = useState({
    nombre: "",
    dni: 0,
    servicio: "",
    fecha: "",
    hora: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/api/turnos", form)
      .then(() => alert("Turno reservado con éxito"))
      .catch(err => console.error(err));
  };

  return (
    <div className="container mt-4">
      <h2>Pedir Turno</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          className="form-control mb-2"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="dni"
          placeholder="DNI"
          className="form-control mb-2"
          onChange={handleChange}
          required
        />
        <select
        name="servicio"
        className="form-control mb-2"
        onChange={handleChange}
        required
        >
            <option value="" disabled>--Seleccioná un servicio--</option>
            <option value="masajes">Masajes</option>
            <option value="nutricion">Nutrición</option>
            <option value="psicologia">Psicología</option>
        </select>
        <input
          type="date"
          name="fecha"
          className="form-control mb-2"
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="hora"
          className="form-control mb-2"
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-success">Reservar</button>
      </form>
    </div>
  );
}

export default PedirTurno;
