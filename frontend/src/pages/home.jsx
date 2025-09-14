import { Link } from "react-router-dom";
import heroBanner from "../assets/heroBanner.avif";

function Home() {
  return (
    <div className="container-fluid p-0">
      {/* Hero Banner */}
      <section className="hero-banner d-flex flex-column justify-content-center align-items-center text-center">
        <div className="overlay"></div>
        <div className="content">
          <h1 className="display-4 fw-bold mb-3">Bienvenido a NutriStetic</h1>
          <p className="fs-4">Gestiona tus turnos de forma fácil y rápida</p>
        </div>
      </section>

      {/* Sección de botones */}
      <section className="text-center py-5" style={{ backgroundColor: "#f9f9f9" }}>
        <h2 className="mb-4 fw-bold" style={{ color: "#8CC641" }}>
          Accesos rápidos
        </h2>
        <div className="d-flex justify-content-center gap-3">
          <Link to="/mis-turnos" className="btn btn-lg btn-turno btn-amarillo">
            Mis Turnos
          </Link>
          <Link to="/pedir-turno" className="btn btn-lg btn-turno btn-verde">
            Pedir Turno
          </Link>
        </div>
      </section>

      {/* Estilos */}
      <style>{`
        .hero-banner {
          position: relative;
          min-height: 60vh;
          background-image: url(${heroBanner});
          background-size: cover;
          background-position: center;
          color: #fff;
        }
        .hero-banner .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
        }
        .hero-banner .content {
          position: relative;
          z-index: 2;
        }

        /* Botones */
        .btn-turno {
          border: none;
          font-weight: 600;
          padding: 0.8rem 2rem;
          transition: all 0.3s ease-in-out;
          border-radius: 10px;
        }

        .btn-amarillo {
          background-color: #D3DA11;
          color: #fff;
        }
        .btn-verde {
          background-color: #25D366;
          color: #fff;
        }

        /* Hover Épico */
        .btn-turno:hover {
          transform: scale(1.08);
          box-shadow: 0 0 20px rgba(0,0,0,0.4), 0 0 15px rgba(140,198,65,0.8);
        }
        .btn-amarillo:hover {
          background-color: #D6E02E; 
        }
        .btn-verde:hover {
          background-color: #1ebe57; 
        }
      `}</style>
    </div>
  );
}

export default Home;
