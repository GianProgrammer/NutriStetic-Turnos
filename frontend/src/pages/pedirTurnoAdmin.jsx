import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {
  TurnoOcupadoModal,
  FechaInvalidaModal,
  HoraInvalidaModal,
  TurnoExitosoModal,
  ServicioInvalidoModal,
} from "../components/modal"
import "../app.css";

const HORA_MIN = 8;
const HORA_MAX = 19;

function PedirTurnoAdmin({user}) {
  const [modalShow, setModalShow] = useState(null);
  const [fechaHora, setFechaHora] = useState(null);
  const [turnosPorFecha, setTurnosPorFecha] = useState({});
  const [form, setForm] = useState({
    nombre: user.nombre,
    dni: user.dni,
    servicio: "",
    fecha: "",
    hora: ""
  });

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const response = await axios.get("/api/turnos"); 
        const turnos = response.data;

        const turnosMap = turnos.reduce((acc, turno) => {
          const fecha = turno.fecha;
          const hora = turno.hora;

          if (!acc[fecha]) acc[fecha] = [];
          acc[fecha].push(hora);

          acc[fecha].sort((a, b) => a.localeCompare(b));

          return acc;
        }, {});

        setTurnosPorFecha(turnosMap);
      } catch (error) {
        console.error("Error al obtener los turnos:", error);
      }
    };

    fetchTurnos();
  }, []);
  console.log(turnosPorFecha);
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fechaHora) {
      setModalShow("fechaInvalida");
      return;
    }

    const fechaSeleccionada = fechaHora.startOf("day");
    const today = dayjs().startOf("day");

    if(form.servicio === "") {
      setModalShow("servicioInvalido");
      return;
    }

    if(fechaSeleccionada.isBefore(today)) {
      setModalShow("fechaInvalida");
      return;
    }

    // Guardamos fecha y hora en el form
    form.fecha = fechaHora.format("YYYY-MM-DD");
    form.hora = fechaHora.format("HH:mm");

    const horaNum = parseInt(form.hora.split(":")[0], 10);
    if (horaNum < HORA_MIN || horaNum > HORA_MAX) {
      setModalShow("horaInvalida");
      return;
    }

    axios
      .post("/api/turnos", form)
      .then(() => setModalShow("exitoso"))
      .catch((err) => {
        if (err.response && err.response.status === 400) {
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
        show={modalShow === "servicioInvalido"}
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Fecha y horario"
              value={fechaHora}
              onChange={(newValue) => setFechaHora(newValue)}
              minutesStep={30}
              ampm={false}
              minDate={dayjs()} 
              maxDate={dayjs().add(1, "year")} 
              minTime={dayjs().hour(HORA_MIN).minute(0)}
              maxTime={dayjs().hour(HORA_MAX).minute(0)}
              disableIgnoringDatePartForTimeValidation={true} // fuerza que se valide la hora para cualquier fecha
              slotProps={{
                textField: {
                  required: true,
                  className: "form-control mb-3",
                  name: "fechaHora"
                }
              }}
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
