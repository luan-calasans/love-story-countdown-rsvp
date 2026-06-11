import React, { useEffect, useState } from 'react';

interface Firework {
  id: number;
  x: number;
  y: number;
  color: string;
  particles: Particle[];
  exploded: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
}

const Fireworks: React.FC = () => {
  const [fireworks, setFireworks] = useState<Firework[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);

  const colors = [
    '#a6573d', // Terracota
    '#e3735e', // Terracota clara
    '#f2b3a0', // Terracota pastel
    '#c96a4e', // Terracota média
    '#6b863b', // Verde oliva
    '#8fbf6f', // Verde oliva claro
    '#aed694', // Verde oliva pastel
    '#55702c', // Verde oliva escuro
  ];

  useEffect(() => {
    let animationId: number;
    let fireworkId = 0;
    let particleId = 0;

    const createFirework = () => {
      const x = Math.random() * window.innerWidth;
      const y = window.innerHeight;
      const color = colors[Math.floor(Math.random() * colors.length)];

      const newFirework: Firework = {
        id: fireworkId++,
        x,
        y,
        color,
        particles: [],
        exploded: false,
      };

      setFireworks((prev) => [...prev, newFirework]);

      // Create multiple fireworks at once for more impact
      if (Math.random() < 0.4) {
        setTimeout(() => {
          const x2 = Math.random() * window.innerWidth;
          const color2 = colors[Math.floor(Math.random() * colors.length)];
          const newFirework2: Firework = {
            id: fireworkId++,
            x: x2,
            y: window.innerHeight,
            color: color2,
            particles: [],
            exploded: false,
          };
          setFireworks((prev) => [...prev, newFirework2]);
        }, 70);
      }
    };

    const explodeFirework = (firework: Firework) => {
      const particleCount = 45 + Math.floor(Math.random() * 35); // More particles for more impact
      const newParticles: Particle[] = [];

      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 3 + Math.random() * 4; // Faster particles
        const life = 40 + Math.floor(Math.random() * 20); // Shorter life for faster effect

        newParticles.push({
          id: particleId++,
          x: firework.x,
          y: firework.y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          life,
          maxLife: life,
          color: firework.color,
        });
      }

      setParticles((prev) => [...prev, ...newParticles]);
      setFireworks((prev) => prev.filter((f) => f.id !== firework.id));
    };

    const updateFireworks = () => {
      setFireworks((prev) =>
        prev.map((firework) => {
          if (!firework.exploded) {
            const newY = firework.y - 5; // Even faster movement
            const shouldExplode = newY < 120 + Math.random() * 120; // Explode even sooner

            if (shouldExplode) {
              explodeFirework(firework);
              return firework;
            }

            return { ...firework, y: newY };
          }
          return firework;
        })
      );

      setParticles((prev) =>
        prev
          .map((particle) => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            vy: particle.vy + 0.08, // Reduced gravity for smoother movement
            life: particle.life - 1,
          }))
          .filter((particle) => particle.life > 0)
      );
    };

    const animate = () => {
      updateFireworks();

      // Create new firework more frequently
      if (Math.random() < 0.12) {
        createFirework();
      }

      animationId = requestAnimationFrame(animate);
    };

    // Start with an immediate burst of fireworks
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        createFirework();
      }, i * 60);
    }

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <div className='fixed inset-0 pointer-events-none z-50'>
      {/* Fireworks */}
      {fireworks.map((firework) => (
        <div
          key={firework.id}
          className='absolute w-2 h-2 rounded-full'
          style={{
            left: firework.x,
            top: firework.y,
            backgroundColor: firework.color,
            boxShadow: `0 0 10px ${firework.color}`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Particles */}
      {particles.map((particle) => {
        const opacity = particle.life / particle.maxLife;
        const scale = 0.5 + opacity * 0.5;

        return (
          <div
            key={particle.id}
            className='absolute w-1 h-1 rounded-full'
            style={{
              left: particle.x,
              top: particle.y,
              backgroundColor: particle.color,
              opacity,
              transform: `translate(-50%, -50%) scale(${scale})`,
              boxShadow: `0 0 ${5 * opacity}px ${particle.color}`,
            }}
          />
        );
      })}
    </div>
  );
};

export default Fireworks;
