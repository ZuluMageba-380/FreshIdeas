"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    let mouseX = -200;
    let mouseY = -200;
    let glowX = -200;
    let glowY = -200;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      const dx = mouseX - glowX;
      const dy = mouseY - glowY;
      glowX += dx * 0.08;
      glowY += dy * 0.08;

      glow.style.transform = `translate(${glowX - 250}px, ${glowY - 250}px)`;
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    const id = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(id);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 z-[1] pointer-events-none hidden lg:block"
      style={{ width: 500, height: 500 }}
    >
      <div
        className="w-full h-full rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(0,209,178,0.07) 0%, rgba(0,209,178,0.02) 40%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />
    </div>
  );
}
