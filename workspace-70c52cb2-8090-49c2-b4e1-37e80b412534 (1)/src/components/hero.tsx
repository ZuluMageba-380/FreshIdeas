"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import KineticText from "@/components/kinetic-text";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Cinematic reveal
      tl.fromTo(
        overlayRef.current,
        { scaleY: 1 },
        { scaleY: 0, duration: 1.4, transformOrigin: "top" }
      )
        .fromTo(
          badgeRef.current,
          { y: 30, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          line1Ref.current,
          { y: 100, opacity: 0, clipPath: "inset(100% 0 0 0)" },
          { y: 0, opacity: 1, clipPath: "inset(0% 0 0 0)", duration: 0.9 },
          "-=0.5"
        )
        .fromTo(
          line2Ref.current,
          { y: 100, opacity: 0, clipPath: "inset(100% 0 0 0)" },
          { y: 0, opacity: 1, clipPath: "inset(0% 0 0 0)", duration: 0.9 },
          "-=0.6"
        )
        .fromTo(
          line3Ref.current,
          { y: 100, opacity: 0, clipPath: "inset(100% 0 0 0)" },
          { y: 0, opacity: 1, clipPath: "inset(0% 0 0 0)", duration: 0.9 },
          "-=0.6"
        )
        .fromTo(
          ctaRef.current?.children ? Array.from(ctaRef.current.children) : [],
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.12 },
          "-=0.3"
        )
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          "-=0.2"
        );

      // Parallax on scroll
      gsap.to(orbRef.current, {
        y: -150,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Slow rotate on the orb
      gsap.to(orbRef.current, {
        rotation: 360,
        duration: 60,
        repeat: -1,
        ease: "none",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToWork = () => {
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 z-0">
        {/* AI-generated cinematic background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        />
        {/* Orbital glow element */}
        <div ref={orbRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-[500px] h-[500px] lg:w-[700px] lg:h-[700px] rounded-full border border-[#00D1B2]/[0.06] relative">
            <div className="absolute inset-8 rounded-full border border-[#6FFFE9]/[0.04]" />
            <div className="absolute inset-20 rounded-full border border-[#00D1B2]/[0.03]" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#00D1B2]/[0.04] to-transparent" />
            {/* Orbiting dots */}
            <div className="absolute top-0 left-1/2 w-2 h-2 rounded-full bg-[#00D1B2]/60 -translate-x-1/2 -translate-y-1" />
            <div className="absolute bottom-0 left-1/2 w-1.5 h-1.5 rounded-full bg-[#6FFFE9]/40 -translate-x-1/2 translate-y-1" />
            <div className="absolute top-1/2 left-0 w-1 h-1 rounded-full bg-[#00D1B2]/50 -translate-x-1 -translate-y-1/2" />
          </div>
        </div>
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(244,246,248,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(244,246,248,0.1) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
        <div className="absolute inset-0 bg-[#0C0F14]/70" />
      </div>

      {/* Cinematic reveal overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-10 bg-[#0C0F14]"
      />

      {/* Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 text-center">
        <div ref={badgeRef} className="mb-8 opacity-0">
          <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-[#00D1B2]/20 bg-[#00D1B2]/[0.06] backdrop-blur-sm text-[#00D1B2] text-xs font-medium tracking-[0.2em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D1B2] animate-pulse" />
            Premium Creative & Digital Agency
          </span>
        </div>

        {/* Hero headline — split into 3 lines for cinematic reveal */}
        <div className="overflow-hidden">
          <h1
            ref={line1Ref}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-bold tracking-tight leading-[1.05] text-[#F4F6F8] opacity-0"
          >
            Design.
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1
            ref={line2Ref}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-bold tracking-tight leading-[1.05] text-[#F4F6F8] opacity-0"
          >
            Build.
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1
            ref={line3Ref}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-bold tracking-tight leading-[1.05] gradient-text opacity-0"
          >
            Elevate.
          </h1>
        </div>

        <p className="mt-10 text-lg sm:text-xl md:text-2xl text-[#8892A4] font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
          Creative Intelligence for Modern Brands.
        </p>

        <div ref={ctaRef} className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-5">
          <button
            onClick={scrollToContact}
            className="group relative px-10 py-4 bg-gradient-to-r from-[#00D1B2] to-[#00B89C] text-[#0C0F14] font-semibold rounded-xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_50px_rgba(0,209,178,0.35)] hover:scale-[1.03]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start a Project
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#6FFFE9] to-[#00D1B2] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>

          <button
            onClick={scrollToWork}
            className="group px-10 py-4 border border-[#F4F6F8]/10 text-[#F4F6F8] font-semibold rounded-xl hover:border-[#00D1B2]/40 hover:bg-[#00D1B2]/[0.04] transition-all duration-500 hover:scale-[1.03]"
          >
            <span className="flex items-center gap-2">
              View Our Work
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
      >
        <span className="text-[#5A6478] text-[10px] tracking-[0.3em] uppercase">Scroll to explore</span>
        <div className="relative w-5 h-9 border border-[#5A6478]/30 rounded-full flex items-start justify-center p-1.5">
          <div className="w-1 h-2 bg-[#00D1B2] rounded-full animate-bounce" />
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0C0F14] to-transparent z-10" />
    </section>
  );
}
