"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FloatingLogo {
  x: number;
  y: number;
  size: number;
  opacity: number;
  rotation: number;
  drift: number;
  speed: number;
  pulseSpeed: number;
  pulseScale: number;
}

export default function FloatingLogos() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Generate floating logo positions
    const logos: FloatingLogo[] = [];
    const count = 12;

    for (let i = 0; i < count; i++) {
      logos.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 40 + Math.random() * 80,
        opacity: 0.015 + Math.random() * 0.035,
        rotation: Math.random() * 360,
        drift: 30 + Math.random() * 80,
        speed: 20 + Math.random() * 40,
        pulseSpeed: 3 + Math.random() * 5,
        pulseScale: 0.05 + Math.random() * 0.08,
      });
    }

    // Create DOM elements
    logos.forEach((logo, i) => {
      const el = document.createElement("div");
      el.className = "floating-logo-item";
      el.style.cssText = `
        position: absolute;
        left: ${logo.x}%;
        top: ${logo.y}%;
        width: ${logo.size}px;
        height: ${logo.size}px;
        opacity: ${logo.opacity};
        transform: rotate(${logo.rotation}deg);
        pointer-events: none;
        will-change: transform, opacity;
      `;

      const img = document.createElement("img");
      img.src = "/logo.png";
      img.alt = "";
      img.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: contain;
        filter: brightness(2.2) saturate(1.6) contrast(1.2);
      `;
      el.appendChild(img);
      container.appendChild(el);

      // Drift animation — slow meandering path
      const driftX = logo.drift;
      const driftY = logo.drift * 0.6;
      const duration = logo.speed;

      gsap.to(el, {
        x: `+=${driftX}`,
        y: `+=${driftY * (Math.random() > 0.5 ? 1 : -1)}`,
        rotation: `+=${Math.random() * 40 - 20}`,
        duration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.8,
      });

      // Subtle pulse — breathing
      gsap.to(el, {
        scale: 1 + logo.pulseScale,
        opacity: logo.opacity * 1.8,
        duration: logo.pulseSpeed,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 1.2,
      });
    });

    // Parallax on scroll — logos drift at different rates
    const items = container.querySelectorAll(".floating-logo-item");
    items.forEach((item, i) => {
      const rate = 0.1 + (i % 4) * 0.08;
      gsap.to(item, {
        y: `-=${window.innerHeight * rate}`,
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
        },
      });
    });

    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[1] pointer-events-none overflow-hidden"
      aria-hidden="true"
    />
  );
}
