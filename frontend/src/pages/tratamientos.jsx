import React from "react";
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
                <div className="t-card">
                    <img src={t.imagen} alt={t.nombre} className="t-image" />

                    {/* Título siempre visible */}
                    <div className="t-title-static">
                        <h5>{t.nombre}</h5>
                    </div>

                    {/* Overlay con descripción */}
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

      {/* Styles */}
      <style>{`
        :root{
          --verde-1: #8CC641;
          --amarillo: #D3DA11;
          --amarillo-2: #D6E02E;
          --verde-wsp: #25D366;
        }

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

        .t-image {
          width: 100%;
          height: 220px;
          object-fit: cover;
          display: block;
          transition: transform 0.6s ease;
        }

        /* Título siempre visible */
        .t-title-static {
          position: absolute;
          bottom: 10px;
          left: 10px;
          color: rgb(140, 198, 65); /* título negro */
          font-weight: 700;
          z-index: 2;
          font-size: 0.95rem;
          transition: opacity 0.35s ease; /* animación de desaparición */
        }

        /* Al hacer hover en la card, ocultamos el título estático */
        .t-card:hover .t-title-static {
          opacity: 0;
        }

        /* Overlay sigue igual */
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

        .t-text {
          transform: translateY(12px);
          transition: transform 0.35s ease, opacity 0.35s ease;
          opacity: 0;
        }

        .t-card:hover .t-overlay {
          opacity: 1;
          transform: translateY(0);
        }

        .t-card:hover .t-text {
          transform: translateY(0);
          opacity: 1;
        }

        /* Make text area white-ish on small screens for readability */
        @media (max-width: 576px) {
          .t-image { height: 180px; }
          .t-overlay { align-items: center; background: linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.6) 100%); }
        }
      `}</style>
    </div>
  );
}
