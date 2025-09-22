import { useState } from "react";
import heroBanner from "../assets/heroBanner.avif";
import noImage from "../assets/noImage.jpeg";

const tratamientos = [
  {
    nombre: "DEPILACIÓN LÁSER SOPRANO ICE",
    descripcion: "Elimina el vello de forma eficaz y prácticamente indolora con tecnología láser de última generación.",
    imagen: noImage,
  },
  {
    nombre: "VELA SHAPE",
    descripcion: "Tratamiento para reducir celulitis y moldear el cuerpo combinando calor, vacío y masaje.",
    imagen: noImage,
  },
  {
    nombre: "BODY UP Teslagen",
    descripcion: "Tonificación muscular no invasiva mediante estimulación magnética de alta intensidad.",
    imagen: noImage,
  },
  {
    nombre: "NUTRICIÓN",
    descripcion: "Plan personalizado de alimentación saludable guiado por profesionales.",
    imagen: noImage,
  },
  {
    nombre: "CRIOLIPÓLISIS",
    descripcion: "Reduce la grasa localizada congelando las células adiposas de manera segura.",
    imagen: noImage,
  },
  {
    nombre: "RADIOFRECUENCIA CORPORAL Y FACIAL",
    descripcion: "Reafirma la piel y estimula el colágeno con ondas de radiofrecuencia.",
    imagen: noImage,
  },
  {
    nombre: "CÁPSULA TERMODINÁMICA DE ONDAS RUSAS",
    descripcion: "Terapia innovadora que combina calor y estimulación eléctrica para tonificación y relajación.",
    imagen: noImage,
  },
  {
    nombre: "LIPOLÁSER",
    descripcion: "Tratamiento para eliminar grasa localizada usando tecnología láser no invasiva.",
    imagen: noImage,
  },
  {
    nombre: "MESOTERAPIA CORPORAL Y FACIAL",
    descripcion: "Aplicación de microinyecciones para mejorar la apariencia de la piel y reducir grasa.",
    imagen: noImage,
  },
  {
    nombre: "MICRODERMOABRASIÓN",
    descripcion: "Exfoliación profunda para mejorar la textura y luminosidad de la piel.",
    imagen: noImage,
  },
  {
    nombre: "RELLENO DE LABIOS Y PÓMULOS",
    descripcion: "Realce de rasgos faciales con ácido hialurónico, logrando naturalidad y volumen.",
    imagen: noImage,
  },
  {
    nombre: "PRP",
    descripcion: "Plasma rico en plaquetas para rejuvenecimiento facial y regeneración celular.",
    imagen: noImage,
  },
  {
    nombre: "BOT-OX",
    descripcion: "Aplicación de toxina botulínica para suavizar arrugas y líneas de expresión.",
    imagen: noImage,
  },
  {
    nombre: "TERAPIA ESCLEROSANTE",
    descripcion: "Eliminación de várices pequeñas mediante inyecciones esclerosantes.",
    imagen: noImage,
  },
  {
    nombre: "CARBOXITERAPIA",
    descripcion: "Tratamiento con microinyecciones de CO2 para mejorar circulación y eliminar grasa.",
    imagen: noImage,
  },
  {
    nombre: "MICROBLADING",
    descripcion: "Técnica de maquillaje semipermanente para cejas más definidas y naturales.",
    imagen: noImage,
  },
  {
    nombre: "RINOMODELACIÓN",
    descripcion: "Moldea la nariz sin cirugía mediante rellenos inyectables.",
    imagen: noImage,
  },
  {
    nombre: "CHIP SEXUAL (HORMONAL)",
    descripcion: "Implante hormonal que mejora energía, deseo sexual y bienestar general.",
    imagen: noImage,
  },
  {
    nombre: "HILOS TENSORES",
    descripcion: "Rejuvenecimiento facial mediante hilos reabsorbibles que estimulan el colágeno.",
    imagen: noImage,
  },
  {
    nombre: "MASAJES ORIENTALES",
    descripcion: "Relajación profunda y equilibrio energético a través de técnicas orientales.",
    imagen: noImage,
  },
];

export default function Tratamientos() {
  const [selectedTratamiento, setSelectedTratamiento] = useState(null);

  const handleCardClick = (tratamiento) => {
    setSelectedTratamiento(tratamiento);
  };

  const handleClose = () => {
    setSelectedTratamiento(null);
  };

  return (
    <div className="tratamientos-page" style={{ minHeight: "100vh" }}>
      {/* Hero */}
      <section
        className="hero-banner d-flex flex-column justify-content-center align-items-center text-center text-white"
        style={{
          backgroundImage: `url(${heroBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "35vh",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.45)",
          }}
        />
        <div style={{ position: "relative", zIndex: 2 }}>
          <h1 className="fw-bold">Tratamientos</h1>
          <p>Descubrí nuestras opciones de estética y salud</p>
        </div>
      </section>

      {/* Grid de cards */}
      <div className="container py-5">
        <div className="row g-4">
          {tratamientos.map((t, idx) => (
            <div className="col-sm-6 col-md-4" key={idx}>
              <div className="t-card" onClick={() => handleCardClick(t)}>
                <img src={t.imagen} alt={t.nombre} className="t-image" />

                <div className="t-title-static">
                  <h5>{t.nombre}</h5>
                </div>

                <div className="t-overlay">
                  <div className="t-text">
                    <h5 className="t-title">{t.nombre}</h5>
                    <p className="t-desc">{t.descripcion}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedTratamiento && (
        <div className="custom-modal-overlay" onClick={handleClose}>
          <div
            className="custom-modal-content"
            onClick={(e) => e.stopPropagation()} // evita que cierre si clickean adentro
          >
            <button className="custom-modal-close" onClick={handleClose}>
              ✕
            </button>
            <img
              src={selectedTratamiento.imagen}
              alt={selectedTratamiento.nombre}
              className="custom-modal-image"
            />
            <h3>{selectedTratamiento.nombre}</h3>
            <p>{selectedTratamiento.descripcion}</p>
          </div>
        </div>
      )}

      {/* Styles */}
      <style>{`
        .t-card {
          position: relative;
          overflow: hidden;
          border-radius: 14px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.08);
          transition: transform 0.35s cubic-bezier(.2,.9,.3,1), box-shadow 0.35s ease;
          cursor: pointer;
          background: #fff;
          min-height: 300px;
          display: flex;
          align-items: stretch;
          flex-direction: column;
        }

        .t-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        }

        .t-image {
          width: 100%;
          height: 220px;
          object-fit: cover;
          display: block;
        }

        .t-title-static {
          position: absolute;
          bottom: 10px;
          left: 10px;
          color: rgb(140, 198, 65);
          font-weight: 700;
          z-index: 2;
          font-size: 0.95rem;
          transition: opacity 0.35s ease;
        }

        .t-card:hover .t-title-static {
          opacity: 0;
        }

        .t-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(37,211,102,0.18) 0%, rgba(140,198,65,0.18) 40%, rgba(0,0,0,0.6) 80%);
          opacity: 0;
          transform: translateY(6%);
          transition: all 0.35s ease;
          display: flex;
          align-items: flex-end;
          padding: 18px;
          color: #fff;
        }

        .t-card:hover .t-overlay {
          opacity: 1;
          transform: translateY(0);
        }

        .t-text {
          transform: translateY(12px);
          transition: transform 0.35s ease, opacity 0.35s ease;
          opacity: 0;
        }

        .t-card:hover .t-text {
          transform: translateY(0);
          opacity: 1;
        }

        /* Modal Styles */
        .custom-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 999;
        }

        .custom-modal-content {
          background: #fff;
          border-radius: 12px;
          padding: 20px;
          max-width: 600px;
          width: 90%;
          position: relative;
          text-align: center;
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
          animation: fadeIn 0.3s ease;
        }

        .custom-modal-image {
          width: 100%;
          max-height: 300px;
          object-fit: cover;
          border-radius: 8px;
          margin-bottom: 15px;
        }

        .custom-modal-close {
          position: absolute;
          top: 10px;
          right: 12px;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
