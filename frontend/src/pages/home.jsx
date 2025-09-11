import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container text-center mt-5">
      {/* Hero Banner */}
      <div className="p-5 mb-4 bg-light rounded-3 shadow-sm">
        <div className="container py-5">
          <h1 className="display-5 fw-bold">Bienvenido a NutriStetic</h1>
          <p className="fs-4">Gestiona tus turnos de forma fácil y rápida</p>
        </div>
      </div>

      {/* Botones */}
      <div className="d-flex justify-content-center gap-3">
        <Link to="/mis-turnos" className="btn btn-primary btn-lg">
          Mis Turnos
        </Link>
        <Link to="/pedir-turno" className="btn btn-success btn-lg">
          Pedir Turno
        </Link>
      </div>
    </div>
  );
}

export default Home;
