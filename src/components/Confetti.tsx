import React, { useEffect, useState } from 'react';

interface Confetti {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
}

const Confetti: React.FC = () => {
  const [confetti, setConfetti] = useState<Confetti[]>([]);

  const colors = [
    '#a6573d', // Terracota
    '#e3735e', // Terracota clara
    '#6b863b', // Verde oliva
    '#8fbf6f', // Verde oliva claro
    '#f2b3a0', // Terracota pastel
    '#F8F6EF', // Wedding Cream
  ];

  const shapes = ['●', '◆', '■', '▲', '★', '♦'];

  useEffect(() => {
    let animationId: number;
    let confettiId = 0;

    const createConfetti = () => {
      const x = Math.random() * window.innerWidth;
      const y = -20;
      const vx = (Math.random() - 0.5) * 2;
      const vy = 1 + Math.random() * 2;
      const rotation = Math.random() * 360;
      const rotationSpeed = (Math.random() - 0.5) * 10;
      const size = 8 + Math.random() * 12;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const life = 200 + Math.floor(Math.random() * 100);

      const newConfetti: Confetti = {
        id: confettiId++,
        x,
        y,
        vx,
        vy,
        rotation,
        rotationSpeed,
        size,
        color,
        life,
        maxLife: life,
      };

      setConfetti((prev) => [...prev, newConfetti]);
    };

    const updateConfetti = () => {
      setConfetti((prev) =>
        prev
          .map((conf) => ({
            ...conf,
            x: conf.x + conf.vx,
            y: conf.y + conf.vy,
            rotation: conf.rotation + conf.rotationSpeed,
            vy: conf.vy + 0.05, // Gravity
            life: conf.life - 1,
          }))
          .filter((conf) => conf.life > 0 && conf.y < window.innerHeight + 50)
      );
    };

    const animate = () => {
      updateConfetti();

      // Create new confetti frequently
      if (Math.random() < 0.15) {
        createConfetti();
      }

      // Create bursts of confetti
      if (Math.random() < 0.02) {
        for (let i = 0; i < 5; i++) {
          setTimeout(() => createConfetti(), i * 50);
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    // Initial burst
    for (let i = 0; i < 20; i++) {
      setTimeout(() => createConfetti(), i * 30);
    }

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <div className='fixed inset-0 pointer-events-none z-50 overflow-hidden'>
      {confetti.map((conf) => {
        const opacity = conf.life / conf.maxLife;
        const scale = 0.5 + opacity * 0.5;

        return (
          <div
            key={conf.id}
            className='absolute text-center'
            style={{
              left: conf.x,
              top: conf.y,
              transform: `translate(-50%, -50%) rotate(${conf.rotation}deg) scale(${scale})`,
              fontSize: `${conf.size}px`,
              color: conf.color,
              opacity,
              textShadow: `0 0 ${conf.size / 2}px ${conf.color}`,
              filter: 'drop-shadow(0 0 4px rgba(166, 87, 61, 0.3))',
            }}
          >
            {shapes[Math.floor(Math.random() * shapes.length)]}
          </div>
        );
      })}
    </div>
  );
};

export default Confetti;
