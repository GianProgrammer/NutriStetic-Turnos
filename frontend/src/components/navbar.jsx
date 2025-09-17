import { Link, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import logo from "../assets/logo.png";

function NavBar({ user, setUser}) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null); 
    navigate("/login"); 
  };
  return (
    <Navbar expand="lg" style={{ backgroundColor: "rgb(37, 211, 102)" }}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src={logo}
            alt="NutriStetic Logo"
            style={{ height: "45px", marginRight: "10px" }}
          />
          <span style={{ color: "#fff", fontWeight: "bold", fontSize: "1.3rem" }}>
            NutriStetic
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ borderColor: "#fff" }} />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
            {user?.role === "usuario" && (
              <>
                <Nav.Link as={Link} to="/" className="nav-link-custom">Inicio</Nav.Link>
                <Nav.Link as={Link} to="/mis-turnos" className="nav-link-custom">Turnos</Nav.Link>
                <Nav.Link as={Link} to="/pedir-turno" className="nav-link-custom">Pedir Turno</Nav.Link>
                <Nav.Link as={Link} to="/tratamientos" className="nav-link-custom">Tratamientos</Nav.Link>
              </>
            )}

            {user?.role === "admin" && (
              <>
                <Nav.Link as={Link} to="/" className="nav-link-custom">Inicio</Nav.Link>
                <Nav.Link as={Link} to="/pedir-turno" className="nav-link-custom">Pedir Turno</Nav.Link>
                <Nav.Link as={Link} to="/ver-turnos" className="nav-link-custom">Ver Turnos</Nav.Link>
              </>
            )}
            {/* Botón de Cerrar Sesión */}
            {user && (
              <Button
                variant="outline-light"
                className="ms-3"
                onClick={handleLogout}
              >
                Cerrar Sesión
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>

      <style>{`
        .nav-link-custom {
          color: #fff !important;
          margin-left: 1rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        .nav-link-custom:hover {
          color: #ffffff !important; /* Hover blanco */
          text-shadow: 0px 0px 6px rgba(0,0,0,0.4); /* brillo para contraste */
        }
        .navbar-toggler {
          border: none;
        }
        .navbar-toggler-icon {
          background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' 
          xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255,255,255, 0.9)' 
          stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
        }
      `}</style>
    </Navbar>
  );
}

export default NavBar;
