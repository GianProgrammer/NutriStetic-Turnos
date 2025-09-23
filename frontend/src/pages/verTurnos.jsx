// src/pages/adminCalendario.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Modal, Button } from "react-bootstrap";

const localizer = momentLocalizer(moment);

export default function AdminCalendario() {
  const [events, setEvents] = useState([]);         // eventos para el calendar
  const [selectedTurno, setSelectedTurno] = useState(null);
  const [date, setDate] = useState(new Date());     // controlamos la fecha mostrada
  const [view, setView] = useState("month");        // controlamos la vista (month, week, day)

  useEffect(() => {
    loadTurnos();
  }, []);

  const eventStyleGetter = (event) => {
    let backgroundColor = "#28a745";
    
    const style = {
      backgroundColor,
      borderRadius: "5px",
      color: "white",
      border: "none",
      padding: "2px",
    };
    return { style };
  };

  const loadTurnos = async () => {
    try {
      const res = await axios.get("/api/turnos"); // endpoint que devuelve todos los turnos
      const eventos = res.data.map((t) => {
        // proteger contra formatos inesperados
        const hora = t.hora || "08:00";
        const fechaISO = `${t.fecha}T${hora}:00`; // "2025-09-15T10:30:00"
        const start = new Date(fechaISO);
        const end = new Date(start);
        end.setHours(start.getHours() + 1); // duración 1h (ajustá si hace falta)

        return {
          id: t._id,
          title: `${t.nombre} — ${(t.servicio.charAt(0).toUpperCase() + t.servicio.slice(1)).replace("_", " ")}`,
          start,
          end,
          raw: t,
        };
      });
      setEvents(eventos);
    } catch (err) {
      console.error("Error cargando turnos:", err);
    }
  };

  // Cuando el toolbar navega (prev/today/next)
  const handleNavigate = (newDate, { action }) => {
    // newDate viene ya calculado por react-big-calendar
    setDate(newDate);
  };

  // Cuando el usuario cambia vista (month/week/day)
  const handleView = (newView) => {
    setView(newView);
  };

  // abrir modal con info del turno
  const handleSelectEvent = (event) => {
    setSelectedTurno(event.raw);
  };

  const handleClose = () => setSelectedTurno(null);

  const cancelarTurno = async () => {
    try {
      await axios.post("/api/whatsapp/send", {
        to: "541123119631", // Luego esto va a user {user.telefono}
      });
      alert("Mensaje enviado por WhatsApp");
    } catch (error) {
      console.error(error);
      alert("Error al enviar mensaje");
    }
  };

  // eliminar turno
  const handleDelete = async () => {
    if (!selectedTurno) return;
    try {
      await axios.delete(`/api/turnos/${selectedTurno._id}`);
      setEvents((prev) => prev.filter((ev) => ev.id !== selectedTurno._id));
      cancelarTurno();
      handleClose();
    } catch (err) {
      console.error("Error borrando turno:", err);
      alert("No se pudo eliminar el turno");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 fw-bold" style={{ color: "rgb(37, 211, 102)" }}>
        Calendario de Turnos (Admin)
      </h2>

      <div className="shadow-lg rounded-4 p-3 mb-5" style={{ background: "#fff" }}>
        <Calendar
          localizer={localizer}
          events={events}
          eventPropGetter={eventStyleGetter}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 700 }}
          views={["month", "week", "day"]}
          defaultView="month"
          date={date}                // controlled
          view={view}                // controlled
          onNavigate={handleNavigate}
          onView={handleView}
          onSelectEvent={handleSelectEvent}
          messages={{
            month: "Mes",
            week: "Semana",
            day: "Día",
            today: "Hoy",
            previous: "Atrás",
            next: "Siguiente",
            showMore: (count) => `+${count} más`,
          }}
        />
      </div>

      {/* Modal */}
      <Modal show={!!selectedTurno} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Turno</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTurno && (
            <>
              <p><strong>Nombre:</strong> {selectedTurno.nombre}</p>
              <p><strong>DNI:</strong> {selectedTurno.dni}</p>
              <p><strong>Servicio:</strong> {selectedTurno.servicio}</p>
              <p><strong>Fecha:</strong> {selectedTurno.fecha}</p>
              <p><strong>Hora:</strong> {selectedTurno.hora}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
          <Button variant="danger" onClick={handleDelete}>Eliminar Turno</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
