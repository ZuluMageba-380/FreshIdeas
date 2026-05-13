"use client";

import { useRef, useCallback } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  glareOpacity?: number;
}

export default function TiltCard({
  children,
  className = "",
  glowColor = "rgba(0,209,178,0.06)",
  glareOpacity = 0.08,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;

      // Move glare
      if (glareRef.current) {
        const percentX = (x / rect.width) * 100;
        const percentY = (y / rect.height) * 100;
        glareRef.current.style.background = `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(255,255,255,${glareOpacity}), transparent 60%)`;
      }
    },
    [glareOpacity]
  );

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    card.style.transition = "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    if (glareRef.current) {
      glareRef.current.style.background = "transparent";
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = "transform 0.1s ease-out";
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={`relative overflow-hidden ${className}`}
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
      {children}
      {/* Glare effect */}
      <div
        ref={glareRef}
        className="absolute inset-0 pointer-events-none z-10"
        style={{ borderRadius: "inherit" }}
      />
      {/* Edge glow */}
      <div
        className="absolute inset-0 pointer-events-none z-[5] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          borderRadius: "inherit",
          boxShadow: `inset 0 0 60px ${glowColor}, inset 0 0 120px ${glowColor.replace("0.06", "0.02")}`,
        }}
      />
    </div>
  );
}
