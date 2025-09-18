import React from "react";
import { Modal, Button } from "react-bootstrap";
// Componente genérico de modal
function TurnoModal({ show, handleClose, title, msg }) {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      contentClassName="custom-modal"
    >
      <Modal.Header closeButton className="custom-header">
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="custom-body">{msg}</Modal.Body>
      <Modal.Footer className="custom-footer">
        <Button
          variant="success"
          onClick={handleClose}
          className="custom-button"
        >
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
// Instancias específicas

export function TurnoOcupadoModal({ show, handleClose }) {
  return (
    <TurnoModal
      show={show}
      handleClose={handleClose}
      title="Turno ocupado"
      msg="Ya hay un turno reservado en esa fecha y hora. Por favor, selecciona otro."
    />
  );
}

export function SinTurnosModal({ show, handleClose }) {
  return (
    <TurnoModal
      show={show}
      handleClose={handleClose}
      title="Sin Turnos"
      msg="Actualmente, usted no posee ningún turno a su nombre."
    />
  );
}

export function FechaInvalidaModal({ show, handleClose }) {
  return (
    <TurnoModal
      show={show}
      handleClose={handleClose}
      title="Fecha inválida"
      msg="La fecha debe ser posterior a hoy."
    />
  );
}

export function HoraInvalidaModal({ show, handleClose }) {
  return (
    <TurnoModal
      show={show}
      handleClose={handleClose}
      title="Hora inválida"
      msg="Seleccioná una hora válida: cada 30 minutos entre 08:00 y 19:00."
    />
  );
}

export function TurnoExitosoModal({ show, handleClose }) {
  return (
    <TurnoModal
      show={show}
      handleClose={handleClose}
      title="Éxito"
      msg="Turno reservado con éxito."
    />
  );
}

export function ErrorBusquedaModal({ show, handleClose }) {
  return (
    <TurnoModal
      show={show}
      handleClose={handleClose}
      title="Error"
      msg="Error al buscar turnos."
    />
  );
}

export function ServicioInvalidoModal({ show, handleClose }) {
  return (
    <TurnoModal
      show={show}
      handleClose={handleClose}
      title="Servicio inválido"
      msg="Debe elegir un servicio."
    />
  );
}