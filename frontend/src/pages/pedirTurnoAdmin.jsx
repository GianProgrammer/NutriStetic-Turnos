import { useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import {
  TurnoOcupadoModal,
  FechaInvalidaModal,
  HoraInvalidaModal,
  TurnoExitosoModal,
  ErrorBusquedaModal,
  ServicioInvalidoModal,
} from "../components/modal"
import "../app.css";

const HORA_MIN = 8;
const HORA_MAX = 19;

function PedirTurnoAdmin({user}) {
  const [modalShow, setModalShow] = useState(null);
  const [valueHora, setValue] = useState(null);
  const [form, setForm] = useState({
    nombre: user.nombre,
    dni: user.dni,
    servicio: "",
    fecha: "",
    hora: ""
  });

  const generateTimeOptions = (min = HORA_MIN, max = HORA_MAX, stepMinutes = 30) => {
    const pad = (n) => String(n).padStart(2, "0");
    const [minH, minM] = min.split(":").map(Number);
    const [maxH, maxM] = max.split(":").map(Number);
    const start = minH * 60 + minM;
    const end = maxH * 60 + maxM;
    const out = [];
    for (let t = start; t <= end; t += stepMinutes) {
      const hh = Math.floor(t / 60);
      const mm = t % 60;
      out.push(`${pad(hh)}:${pad(mm)}`);
    }
    return out;
  };

  const timeOptions = generateTimeOptions("08:00", "19:00", 30);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fechaForm = form.fecha;
    const horaForm = valueHora;
    form.hora = horaForm.format("HH:mm");
    const [anio, mes, dia] = fechaForm.split("-");
    const fecha = new Date(anio, mes - 1, dia);
    const today = new Date();
    today.setHours(0,0,0,0);
    if(form.servicio == "") {
      setModalShow("fechaInvalida");
      return;
    }
      
    if(fecha < today) {
      setModalShow("fechaInvalida");
      return
    }
    if (!timeOptions.includes(form.hora)) {
      console.log(form.hora);
      setModalShow("horaInvalida");
      return;
    }
    axios
      .post("/api/turnos", form)
      .then(() => setModalShow("exitoso"))
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          // Mostramos el modal cuando el turno está ocupado
          setModalShow("turnoOcupado");
        } else {
          alert("Error al reservar turno");
        }
      });
  };

  return (
    <div className="container mt-5 d-flex justify-content-center mb-5">
      <TurnoOcupadoModal
        show={modalShow === "turnoOcupado"}
        handleClose={() => setModalShow(null)}
      />
      <FechaInvalidaModal
        show={modalShow === "fechaInvalida"}
        handleClose={() => setModalShow(null)}
      />
      <HoraInvalidaModal
        show={modalShow === "horaInvalida"}
        handleClose={() => setModalShow(null)}
      />
      <TurnoExitosoModal
        show={modalShow === "exitoso"}
        handleClose={() => setModalShow(null)}
      />
      <ServicioInvalidoModal
        show={modalShow === "errorBusqueda"}
        handleClose={() => setModalShow(null)}
      />
      <div className="card shadow-lg p-4 border-0 rounded-4" style={{ maxWidth: "500px", width: "100%" }}>
        <h2 className="text-center mb-4 fw-bold" style={{color: "#8CC641" }}>Reservá tu turno</h2>
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
            <option value="" selected>
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
            label="Horario" 
            value={valueHora}
            onChange={(newValue) => setValue(newValue)}
            required 
            minutesStep={30}
            minTime={dayjs().hour(8).minute(0)}
            maxTime={dayjs().hour(19).minute(0)}
            skipDisabled={true}
            ampm = {false}
            className="form-control mb-3"
            />
          </LocalizationProvider>
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

export default PedirTurnoAdmin;