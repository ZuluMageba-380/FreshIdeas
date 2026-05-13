"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LightBeams() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const beams = containerRef.current?.querySelectorAll(".light-beam");
      if (!beams) return;

      beams.forEach((beam, i) => {
        gsap.fromTo(
          beam,
          {
            opacity: 0,
            scaleX: 0,
            transformOrigin: "left center",
          },
          {
            opacity: 1,
            scaleX: 1,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.2,
          }
        );

        // Subtle breathing animation
        gsap.to(beam, {
          opacity: 0.4 + Math.random() * 0.3,
          duration: 3 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.5,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
    >
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="light-beam absolute"
          style={{
            top: `${15 + i * 22}%`,
            left: "-10%",
            width: "120%",
            height: "1px",
            background: `linear-gradient(90deg, transparent, rgba(0,209,178,${0.08 - i * 0.015}) 30%, rgba(111,255,233,${0.05 - i * 0.01}) 50%, rgba(0,209,178,${0.08 - i * 0.015}) 70%, transparent)`,
            transform: `rotate(${-5 + i * 3}deg)`,
            filter: "blur(1px)",
          }}
        />
      ))}
    </div>
  );
}
