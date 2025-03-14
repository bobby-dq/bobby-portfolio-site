"use client";

import React, { useEffect, useState, useRef } from "react";

interface MouseTrailProps {
  color?: string;
  particleCount?: number;
  particleSize?: number;
  particleLifespan?: number;
  particleOpacity?: number;
}

const MouseTrail: React.FC<MouseTrailProps> = ({
  color = "primary",
  particleCount = 20,
  particleSize = 5,
  particleLifespan = 800,
  particleOpacity = 0.5,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const particlesRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(null);
  const previousTimeRef = useRef<number>(null);
  const particles = useRef<
    Array<{
      id: number;
      x: number;
      y: number;
      size: number;
      alpha: number;
      lifespan: number;
      velocity: { x: number; y: number };
      element: HTMLDivElement | null;
    }>
  >([]);
  const nextParticleId = useRef(0);

  useEffect(() => {
    // Handle mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
      createParticle(event.clientX, event.clientY);
    };

    // Create particle container if not already present
    if (!particlesRef.current) {
      const container = document.createElement("div");
      container.className =
        "pointer-events-none fixed inset-0 z-50 overflow-hidden";
      document.body.appendChild(container);
      particlesRef.current = container;
    }

    window.addEventListener("mousemove", handleMouseMove);
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      if (particlesRef.current) {
        document.body.removeChild(particlesRef.current);
      }
    };
  }, []);

  const createParticle = (x: number, y: number) => {
    // Only create a particle with certain probability to keep it subtle
    if (Math.random() > 0.3) return;

    if (!particlesRef.current) return;

    const id = nextParticleId.current++;
    const size = Math.random() * particleSize + 2;

    // Create the particle element
    const element = document.createElement("div");
    element.className = "absolute rounded-full";

    // Choose between different shades of the primary color
    const colorVariants = [
      "bg-primary opacity-30",
      "bg-primary opacity-20",
      "bg-primary-light opacity-25",
      "bg-primary-dark opacity-35",
    ];

    element.className = `absolute rounded-full ${
      colorVariants[Math.floor(Math.random() * colorVariants.length)]
    }`;
    element.style.width = `${size}px`;
    element.style.height = `${size}px`;
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
    element.style.transform = "translate(-50%, -50%)";
    particlesRef.current.appendChild(element);

    // Add to particles array
    particles.current.push({
      id,
      x,
      y,
      size,
      alpha: Math.random() * particleOpacity,
      lifespan: Math.random() * particleLifespan + 400,
      velocity: {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2,
      },
      element,
    });
  };

  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - (previousTimeRef.current ?? time);

      // Update all particles
      particles.current.forEach((particle, index) => {
        if (!particle.element) return;

        // Update lifespan
        particle.lifespan -= deltaTime;

        // Remove dead particles
        if (particle.lifespan <= 0) {
          if (particle.element && particlesRef.current) {
            particlesRef.current.removeChild(particle.element);
          }
          particles.current.splice(index, 1);
          return;
        }

        // Fade particles as they age
        const opacity = Math.min(
          particle.alpha * (particle.lifespan / particleLifespan),
          particle.alpha
        );
        particle.element.style.opacity = opacity.toString();

        // Move particles slightly
        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;

        // Apply updated position
        particle.element.style.left = `${particle.x}px`;
        particle.element.style.top = `${particle.y}px`;
      });
    }

    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  return null; // This component doesn't render anything itself
};

export default MouseTrail;
