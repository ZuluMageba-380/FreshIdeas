"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BrandMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        marqueeRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: marqueeRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={marqueeRef}
      className="relative py-20 overflow-hidden border-y border-white/[0.04]"
    >
      {/* Gradient edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0C0F14] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0C0F14] to-transparent z-10 pointer-events-none" />

      <div className="flex animate-marquee whitespace-nowrap">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex items-center gap-6 mx-6 shrink-0">
            <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F4F6F8]/[0.03] tracking-tight">
              FRESH IDEAS ZA
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D1B2]/40" />
            <span className="text-4xl sm:text-5xl lg:text-6xl font-bold gradient-text tracking-tight opacity-[0.08]">
              DESIGN. BUILD. ELEVATE.
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#6FFFE9]/30" />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
}
