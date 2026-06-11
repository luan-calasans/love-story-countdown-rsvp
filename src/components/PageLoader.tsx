import { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  rotate: number;
}

const generatePetals = (): Petal[] =>
  Array.from({ length: 22 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 2 + Math.random() * 1.5,
    size: 8 + Math.random() * 10,
    rotate: Math.random() * 360,
  }));

const PageLoader = () => {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [petals] = useState<Petal[]>(generatePetals);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const fadeTimer = setTimeout(() => setFadeOut(true), 3700);
    const hideTimer = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = '';
    }, 4400);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
      document.body.style.overflow = '';
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #faf9f1 0%, #f2f2e3 40%, #f7ebe5 100%)",
        animation: fadeOut ? "loaderFadeOut 0.6s ease forwards" : undefined,
        overflow: "hidden",
      }}
    >
      {/* Pétalas caindo */}
      {petals.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            top: "-20px",
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size * 1.3}px`,
            background: `radial-gradient(ellipse at 40% 30%, #f2b3a0, #e3735ecc)`,
            borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
            transform: `rotate(${p.rotate}deg)`,
            animation: `petalFall ${p.duration}s ease-in ${p.delay}s infinite`,
            opacity: 0.8,
          }}
        />
      ))}

      {/* Luz suave de fundo */}
      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(143,191,111,0.16) 0%, transparent 70%)",
          animation: "glowPulse 2s ease-in-out infinite",
        }}
      />

      {/* Argolas entrelaçadas */}
      <div
        style={{
          position: "relative",
          width: "150px",
          height: "110px",
          marginBottom: "36px",
        }}
      >
        {/* Coração — acima das argolas */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "-6px",
            transform: "translateX(-50%)",
            fontSize: "52px",
            color: "#d62828",
            animation: "heartAppear 0.6s cubic-bezier(0.34,1.56,0.64,1) 1.5s both",
            filter: "drop-shadow(0 0 8px rgba(214,40,40,0.6))",
            zIndex: 10,
          }}
        >
          ♥
        </div>

        {/* Argola esquerda (frente no lado esquerdo) */}
        <div
          style={{
            position: "absolute",
            left: "0px",
            top: "18px",
            width: "86px",
            height: "86px",
            borderRadius: "50%",
            border: "7px solid #D4AF37",
            background: "transparent",
            boxShadow: "0 0 18px rgba(212,175,55,0.45), inset 0 0 8px rgba(212,175,55,0.15)",
            animation: "ringLeft 1.2s cubic-bezier(0.34,1.56,0.64,1) 0.1s both",
            zIndex: 3,
          }}
        />

        {/* Metade direita da argola esquerda (atrás da argola direita) */}
        <div
          style={{
            position: "absolute",
            left: "0px",
            top: "18px",
            width: "86px",
            height: "86px",
            borderRadius: "50%",
            border: "7px solid #D4AF37",
            background: "transparent",
            animation: "ringLeft 1.2s cubic-bezier(0.34,1.56,0.64,1) 0.1s both",
            zIndex: 1,
            clipPath: "inset(0 0 0 50%)",
          }}
        />

        {/* Argola direita (frente no lado direito) */}
        <div
          style={{
            position: "absolute",
            right: "0px",
            top: "18px",
            width: "86px",
            height: "86px",
            borderRadius: "50%",
            border: "7px solid #C0952A",
            background: "transparent",
            boxShadow: "0 0 18px rgba(192,149,42,0.45), inset 0 0 8px rgba(192,149,42,0.15)",
            animation: "ringRight 1.2s cubic-bezier(0.34,1.56,0.64,1) 0.1s both",
            zIndex: 2,
          }}
        />

        {/* Metade esquerda da argola direita (atrás da argola esquerda) — cobre o arco esquerdo */}
        <div
          style={{
            position: "absolute",
            right: "0px",
            top: "18px",
            width: "86px",
            height: "86px",
            borderRadius: "50%",
            border: "7px solid #C0952A",
            background: "transparent",
            animation: "ringRight 1.2s cubic-bezier(0.34,1.56,0.64,1) 0.1s both",
            zIndex: 4,
            clipPath: "inset(0 50% 0 0)",
          }}
        />
      </div>

      {/* Nomes */}
      <div
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(1.6rem, 5vw, 2.4rem)",
          fontWeight: 600,
          letterSpacing: "0.04em",
          background: "linear-gradient(135deg, #84452f, #a6573d, #e3735e)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          animation: "namesAppear 0.8s ease 1.6s both",
          marginBottom: "10px",
          textAlign: "center",
          lineHeight: 1.2,
        }}
      >
        Luan &amp; Cauane
      </div>

      {/* Linha decorativa */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "10px",
          animation: "namesAppear 0.6s ease 2.1s both",
        }}
      >
        <div style={{ width: "40px", height: "1px", background: "linear-gradient(to right, transparent, #6b863b)" }} />
        <div style={{ fontSize: "12px", color: "#6b863b", letterSpacing: "0.1em" }}>✦</div>
        <div style={{ width: "40px", height: "1px", background: "linear-gradient(to left, transparent, #6b863b)" }} />
      </div>

      {/* Data */}
      <div
        style={{
          fontFamily: "'Open Sans', sans-serif",
          fontSize: "clamp(0.75rem, 2vw, 0.9rem)",
          letterSpacing: "0.3em",
          color: "#6b863b",
          textTransform: "uppercase",
          animation: "namesAppear 0.6s ease 2.4s both",
        }}
      >
        17 · 10 · 2026
      </div>
    </div>
  );
};

export default PageLoader;
