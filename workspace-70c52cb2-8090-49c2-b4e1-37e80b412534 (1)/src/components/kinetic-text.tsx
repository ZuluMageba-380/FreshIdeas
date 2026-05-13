"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface KineticTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  stagger?: number;
  splitBy?: "chars" | "words";
}

export default function KineticText({
  text,
  className = "",
  as: Tag = "h2",
  delay = 0,
  stagger = 0.03,
  splitBy = "chars",
}: KineticTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const units =
      splitBy === "chars" ? text.split("") : text.split(" ");
    const separator = splitBy === "chars" ? "" : " ";

    el.innerHTML = units
      .map((unit) => {
        const isSpace = unit === " ";
        if (isSpace) return '<span class="inline-block">&nbsp;</span>';
        return `<span class="inline-block" style="opacity:0; transform:translateY(40px) rotateX(-40deg)">${unit}</span>`;
      })
      .join(separator);

    const spans = el.querySelectorAll("span");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(spans, {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 0.7,
              stagger,
              delay,
              ease: "power3.out",
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [text, delay, stagger, splitBy]);

  return (
    <Tag
      ref={containerRef as React.RefObject<never>}
      className={`${className}`}
      style={{ perspective: "800px" }}
    >
      {text}
    </Tag>
  );
}
