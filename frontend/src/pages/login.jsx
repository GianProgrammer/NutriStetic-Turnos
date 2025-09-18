// src/pages/login.jsx
import { useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login({ setUser }) {
  const [form, setForm] = useState({ dni: "", password: "" });
  const [showPassw, setShowPassw] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", {
        dni: form.dni,
        password: form.password,
      });
      const token = res.data.token;

      // Guardar token
      localStorage.setItem("token", token);

      // Decodificar payload del JWT
      const payload = jwtDecode(token);
      setUser({ dni: payload.dni, role: payload.role , nombre: payload.nombre});
      window.location.href = "/"  // ir al home
    } catch (err) {
      console.error(err);
      alert("Login inválido");
    }
    
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div
        className="card shadow-lg p-4 border-0 rounded-4 mb-5"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="text-center mb-4 fw-bold" style={{ color: "rgb(37, 211, 102)" }}>
          Iniciar Sesión
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="dni"
            placeholder="DNI"
            className="form-control mb-3"
            onChange={handleChange}
            required
          />
          <div className="position-relative mb-3">
            <input
              type={showPassw ? "text" : "password"}
              name="password"
              placeholder="Contraseña"
              className="form-control"
              onChange={handleChange}
              required
            />
            <span
              onClick={() => setShowPassw(!showPassw)}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#555",
              }}
            >
              {showPassw ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
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
            Entrar
          </button>
        </form>
        <p className="text-center mt-3" style={{ fontSize: "0.9rem" }}>
          ¿No tenés cuenta?{" "}
          <a href="/register" style={{ color: "#8CC641" }}>
            Registrate
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
