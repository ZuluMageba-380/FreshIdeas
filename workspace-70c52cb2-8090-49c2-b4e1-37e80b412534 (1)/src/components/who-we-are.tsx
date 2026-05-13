"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import KineticText from "@/components/kinetic-text";
import LightBeams from "@/components/light-beams";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "50+", label: "Projects Delivered" },
  { value: "30+", label: "Clients Served" },
  { value: "6", label: "Service Divisions" },
  { value: "100%", label: "Client Commitment" },
];

export default function WhoWeAre() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        bodyRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bodyRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      const statElements = statsRef.current?.children;
      if (statElements) {
        gsap.fromTo(
          Array.from(statElements),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Parallax on image
      gsap.to(imageRef.current, {
        y: -40,
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
      className="relative py-32 lg:py-44 overflow-hidden"
    >
      <LightBeams />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Column */}
          <div>
            <span className="inline-block text-[#00D1B2] text-xs font-semibold tracking-[0.25em] uppercase mb-6">
              Who We Are
            </span>
            <KineticText
              text="Building brands, systems, and stories that move."
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F4F6F8] leading-tight"
              splitBy="words"
              stagger={0.06}
            />
          </div>

          {/* Right Column */}
          <div ref={bodyRef}>
            <p className="text-[#8892A4] text-lg leading-relaxed mb-6">
              Fresh Ideas ZA is a premium creative and digital agency delivering
              branding, web development, media production, and strategic growth
              solutions for ambitious brands and institutions.
            </p>
            <p className="text-[#8892A4] text-lg leading-relaxed mb-10">
              We combine strategy, creativity, and technology to build systems
              that scale. Our approach is intentional — every design decision,
              every line of code, every frame of footage serves a strategic
              purpose.
            </p>

            <div className="premium-divider mb-10" />

            <div ref={statsRef} className="grid grid-cols-2 gap-8">
              {STATS.map((stat) => (
                <div key={stat.label} className="group cursor-default">
                  <div className="text-3xl lg:text-4xl font-bold gradient-text mb-1 transition-transform duration-500 group-hover:scale-110 group-hover:translate-x-1">
                    {stat.value}
                  </div>
                  <div className="text-[#5A6478] text-sm tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Visual element */}
        <div ref={imageRef} className="mt-20 relative">
          <div className="relative h-[300px] lg:h-[400px] rounded-3xl bg-[#151A21]/40 border border-white/[0.04] overflow-hidden">
            {/* Abstract art composition */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00D1B2]/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6FFFE9]/20 to-transparent" />
              <div className="absolute top-8 left-8 w-40 h-40 border border-[#00D1B2]/10 rounded-2xl rotate-6" />
              <div className="absolute top-20 right-20 w-60 h-60 border border-[#6FFFE9]/[0.06] rounded-full" />
              <div className="absolute bottom-12 left-1/4 w-32 h-32 border border-[#00D1B2]/[0.06] rounded-lg -rotate-12" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-white/[0.02] rounded-full" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-[#00D1B2]/[0.05] rounded-full" />
              <div className="absolute top-1/3 right-1/3 w-4 h-4 rounded-full bg-[#00D1B2]/20" />
              <div className="absolute bottom-1/3 left-1/3 w-3 h-3 rounded-full bg-[#6FFFE9]/15" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#00D1B2]/[0.02] to-transparent" />
            {/* Scanning line */}
            <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00D1B2]/30 to-transparent animate-pulse" style={{ top: "50%" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
