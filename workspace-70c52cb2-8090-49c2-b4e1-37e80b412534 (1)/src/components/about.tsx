"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import KineticText from "@/components/kinetic-text";
import TiltCard from "@/components/tilt-card";

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
  {
    title: "Excellence",
    description:
      "We hold ourselves to the highest standard. Every deliverable, every interaction, every outcome reflects our commitment to exceptional quality and meticulous craftsmanship.",
  },
  {
    title: "Integrity",
    description:
      "Transparency and honesty guide our relationships. We build trust through consistent action, clear communication, and unwavering accountability.",
  },
  {
    title: "Innovation",
    description:
      "We challenge convention and explore new frontiers. Our approach integrates emerging technologies and creative methodologies for solutions ahead of the curve.",
  },
  {
    title: "Collaboration",
    description:
      "Great work emerges from shared vision. We partner deeply with our clients, combining domain expertise with creative capabilities for transformative outcomes.",
  },
  {
    title: "Sustainability",
    description:
      "We build for longevity. Our strategies, systems, and brand architectures are designed to endure — creating value that compounds across time and evolution.",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        visualRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: visualRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        missionRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: missionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      const valueCards = valuesRef.current?.children;
      if (valueCards) {
        gsap.fromTo(
          Array.from(valueCards),
          { y: 50, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: valuesRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Parallax on visual
      gsap.to(visualRef.current, {
        y: -60,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 lg:py-44 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00D1B2]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <div className="max-w-4xl mb-20">
          <span className="inline-block text-[#00D1B2] text-xs font-semibold tracking-[0.25em] uppercase mb-6">
            About Fresh Ideas ZA
          </span>
          <KineticText
            text="Building Sustainable Brands in the Digital Era"
            as="h2"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F4F6F8] leading-tight"
            splitBy="words"
            stagger={0.06}
          />
        </div>

        {/* Body Content */}
        <div ref={contentRef} className="grid lg:grid-cols-2 gap-16 mb-24">
          <div>
            <p className="text-[#8892A4] text-lg leading-relaxed mb-6">
              Fresh Ideas ZA was founded to ensure that businesses and
              institutions operate with clarity, structure, and strategic
              visibility.
            </p>
            <p className="text-[#8892A4] text-lg leading-relaxed mb-6">
              What began as a solution-driven creative practice has evolved into
              a fully integrated digital agency serving corporate, institutional,
              and entrepreneurial clients across South Africa and beyond.
            </p>
            <p className="text-[#F4F6F8] text-2xl font-semibold leading-relaxed">
              We do not chase trends.
              <br />
              <span className="gradient-text">We build foundations.</span>
            </p>
          </div>

          <div ref={visualRef} className="relative">
            <div className="relative h-full min-h-[360px] rounded-3xl bg-[#151A21]/40 border border-white/[0.04] overflow-hidden">
              {/* Depth layers */}
              <div className="absolute inset-6 rounded-2xl border border-[#00D1B2]/[0.06]" />
              <div className="absolute inset-12 rounded-xl border border-[#6FFFE9]/[0.04]" />
              <div className="absolute inset-[4.5rem] rounded-lg border border-white/[0.03]" />
              <div className="absolute top-8 left-8 w-20 h-20 border border-[#00D1B2]/10 rounded-lg rotate-12" />
              <div className="absolute bottom-12 right-12 w-32 h-32 border border-[#6FFFE9]/10 rounded-full" />
              <div className="absolute top-1/3 right-1/4 w-4 h-4 rounded-full bg-[#00D1B2]/20" />
              <div className="absolute bottom-1/3 left-1/4 w-3 h-3 rounded-full bg-[#6FFFE9]/15" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#00D1B2]/[0.03] to-transparent" />
              {/* Pulse ring */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-2 border-[#00D1B2]/10 animate-ping" style={{ animationDuration: "3s" }} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#00D1B2]/30" />
            </div>
          </div>
        </div>

        {/* Vision & Mission */}
        <div ref={missionRef} className="grid md:grid-cols-2 gap-8 mb-24">
          <TiltCard
            className="rounded-2xl bg-[#151A21]/60 border border-white/[0.04] group"
            glowColor="rgba(0,209,178,0.06)"
          >
            <div className="p-8 lg:p-10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00D1B2] to-[#00B89C] flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110">
                <svg className="w-5 h-5 text-[#0C0F14]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#00D1B2] mb-4">
                Our Vision
              </h3>
              <p className="text-[#F4F6F8] text-lg leading-relaxed font-medium">
                To build sustainable brands and digital institutions that thrive
                across generations.
              </p>
            </div>
          </TiltCard>

          <TiltCard
            className="rounded-2xl bg-[#151A21]/60 border border-white/[0.04] group"
            glowColor="rgba(111,255,233,0.06)"
          >
            <div className="p-8 lg:p-10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6FFFE9] to-[#00D1B2] flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110">
                <svg className="w-5 h-5 text-[#0C0F14]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#6FFFE9] mb-4">
                Our Mission
              </h3>
              <p className="text-[#F4F6F8] text-lg leading-relaxed font-medium">
                To strengthen corporate identity and digital presence through
                strategic design, technology, and storytelling — ensuring lasting
                visibility and relevance.
              </p>
            </div>
          </TiltCard>
        </div>

        {/* Values */}
        <div>
          <h3 className="text-center text-xs font-semibold tracking-[0.25em] uppercase text-[#00D1B2] mb-12">
            Our Values
          </h3>
          <div ref={valuesRef} className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {VALUES.map((value, i) => (
              <TiltCard
                key={value.title}
                className="rounded-xl bg-[#151A21]/40 border border-white/[0.04] group text-center"
                glowColor="rgba(0,209,178,0.04)"
              >
                <div className="p-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00D1B2]/20 to-transparent flex items-center justify-center mx-auto mb-4 transition-transform duration-500 group-hover:scale-110">
                    <span className="text-[#00D1B2] text-sm font-bold">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h4 className="text-[#F4F6F8] font-semibold mb-2 group-hover:text-[#00D1B2] transition-colors duration-300">
                    {value.title}
                  </h4>
                  <p className="text-[#5A6478] text-xs leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
