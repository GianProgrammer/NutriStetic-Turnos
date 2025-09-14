import { FaMapMarkerAlt, FaPhoneAlt, FaFacebook, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer
      style={{
        background: "#25D366",
        color: "#fff",
        padding: "2rem 1rem",
        marginTop: "2rem",
      }}
    >
      <div className="container">
        <div className="row">
          {/* Info */}
          <div className="col-md-6 mb-3">
            <h5 className="fw-bold">Contacto</h5>
            <p>
              <FaMapMarkerAlt className="me-2" />
              Cervantes 1983, Villa Luzuriaga
            </p>
            <p>
              <FaPhoneAlt className="me-2" />
              11 5832-3814
            </p>
            <p>
              <FaFacebook className="me-2" />
              Nutristeticok
            </p>
            <p>
              <FaInstagram className="me-2" />
              Nutristeticok
            </p>
          </div>

          {/* Google Maps */}
          <div className="col-md-6">
            <h5 className="fw-bold">Ubicación</h5>
            <div style={{ borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}>
              <iframe
                title="Ubicación NutriStetic"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3285.793110306895!2d-58.598!3d-34.662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcc7e14b4e49c7%3A0x123456789abcdef!2sCervantes%201983%2C%20Villa%20Luzuriaga!5e0!3m2!1ses!2sar!4v1694300000000"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="text-center mt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.3)", paddingTop: "1rem" }}>
          <small>© {new Date().getFullYear()} NutriStetic - Todos los derechos reservados</small>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
