import { Link } from "react-router-dom";
import heroBanner from "../assets/heroBanner.avif";

function Home({user}) {
  return (
    <div className="container-fluid p-0">
      {/* Hero Banner */}
      <section className="hero-banner d-flex flex-column justify-content-center align-items-center text-center">
        <div className="overlay"></div>
        <div className="content">
          <h1 className="display-4 mb-3 montserrat-font">Bienvenido a NutriStetic</h1>
          <p className="fs-4 montserrat-font">Gestiona tus turnos de forma fácil y rápida</p>
        </div>
      </section>

      {/* Sección de botones */}
      <section className="text-center py-5" style={{ backgroundColor: "#dddddd" }}>
        <h2 className="mb-4 montserrat-font" style={{ color: "#8CC641" }}>
          Accesos rápidos
        </h2>
        {user?.role === "usuario" && (
        <div className="d-flex justify-content-center gap-3 montserrat-font">
          
          <Link to="/mis-turnos" className="btn btn-lg btn-turno btn-verde montserrat-font">
            Mis Turnos
          </Link>
          <Link to="/pedir-turno" className="btn btn-lg btn-turno btn-verde montserrat-font">
            Pedir Turno
          </Link>
          
        </div>
        )}
        {user?.role === "admin" && (
        <div className="d-flex justify-content-center gap-3 montserrat-font">
          
          <Link to="/ver-turnos" className="btn btn-lg btn-turno btn-verde montserrat-font">
            Ver Turnos
          </Link>
          <Link to="/pedir-turno" className="btn btn-lg btn-turno btn-verde montserrat-font">
            Pedir Turno
          </Link>
          
        </div>
        )}
      </section>

      {/* Estilos */}
      <style>{`

        .montserrat-font {
          font-family: "Montserrat", sans-serif;
          font-optical-sizing: auto;
          font-weight: 300;
          font-style: light;
        }
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
          padding: 0.8rem 2rem;
          transition: all 0.3s ease-in-out;
          border-radius: 10px;
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

        .btn-verde:hover {
          background-color: #1ebe57; 
        }
      `}</style>
    </div>
  );
}

export default Home;
