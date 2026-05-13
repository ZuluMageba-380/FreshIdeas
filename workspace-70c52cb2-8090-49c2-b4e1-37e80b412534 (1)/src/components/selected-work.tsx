"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import TiltCard from "@/components/tilt-card";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    name: "Corporate Branding",
    category: "Brand Identity",
    description:
      "Complete visual identity system for a leading financial services firm — from logo architecture to comprehensive brand guidelines.",
    color: "from-[#00D1B2] to-[#00B89C]",
    bgPattern: "radial-gradient(circle at 30% 40%, rgba(0,209,178,0.15) 0%, transparent 50%)",
    accent: "#00D1B2",
  },
  {
    name: "Wedding Cinematic Film",
    category: "Photography & Film",
    description:
      "A cinematic wedding film capturing timeless moments with editorial precision and emotional storytelling.",
    color: "from-[#6FFFE9] to-[#00D1B2]",
    bgPattern: "radial-gradient(circle at 70% 60%, rgba(111,255,233,0.12) 0%, transparent 50%)",
    accent: "#6FFFE9",
  },
  {
    name: "School Management App",
    category: "Digital Development",
    description:
      "A comprehensive school management platform streamlining administration, enrollment, and communication for educational institutions.",
    color: "from-[#00B89C] to-[#6FFFE9]",
    bgPattern: "radial-gradient(circle at 50% 30%, rgba(0,184,156,0.15) 0%, transparent 50%)",
    accent: "#00B89C",
  },
  {
    name: "Safety Training Video",
    category: "Media Production",
    description:
      "Industrial safety training video production with cinematic quality, clear messaging, and professional drone documentation.",
    color: "from-[#00D1B2] to-[#6FFFE9]",
    bgPattern: "radial-gradient(circle at 40% 70%, rgba(0,209,178,0.12) 0%, transparent 50%)",
    accent: "#00D1B2",
  },
];

export default function SelectedWork() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Horizontal scroll driven by vertical scroll
      const container = scrollContainerRef.current;
      if (container) {
        const scrollWidth = container.scrollWidth - container.clientWidth;
        gsap.to(container, {
          scrollLeft: scrollWidth,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 20%",
            end: "bottom 20%",
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToPortfolio = () => {
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-32 lg:py-44 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00D1B2]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={headingRef} className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-16">
          <div>
            <span className="inline-block text-[#00D1B2] text-xs font-semibold tracking-[0.25em] uppercase mb-6">
              Selected Work
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F4F6F8]">
              Work That Reflects{" "}
              <span className="gradient-text">Vision & Structure</span>
            </h2>
          </div>
          <button
            onClick={scrollToPortfolio}
            className="mt-6 sm:mt-0 inline-flex items-center gap-2 text-[#00D1B2] font-medium hover:gap-3 transition-all duration-300"
          >
            Explore Our Portfolio
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={scrollContainerRef}
        className="horizontal-scroll px-6 lg:px-8 pb-4"
      >
        {PROJECTS.map((project, i) => (
          <TiltCard
            key={project.name}
            className={`rounded-2xl w-[85vw] sm:w-[55vw] lg:w-[40vw] h-[500px] lg:h-[600px] border border-white/[0.04] group cursor-pointer`}
            glowColor={`${project.accent}10`}
            glareOpacity={0.05}
          >
            <div className="relative h-full rounded-2xl overflow-hidden bg-[#151A21]" style={{ background: project.bgPattern }}>
              {/* Decorative elements */}
              <div className="absolute top-8 left-8 w-24 h-24 border border-white/[0.06] rounded-lg transition-transform duration-700 group-hover:rotate-12" />
              <div className="absolute bottom-8 right-8 w-32 h-32 border border-white/[0.06] rounded-full transition-transform duration-700 group-hover:scale-125" />
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full transition-all duration-700 group-hover:scale-150"
                style={{ border: `1px solid ${project.accent}15` }}
              />
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full transition-all duration-700 group-hover:scale-[1.8]"
                style={{ border: `1px solid ${project.accent}10` }}
              />
              {/* Pulse dot */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full animate-pulse"
                style={{ backgroundColor: `${project.accent}30` }}
              />
              {/* Number */}
              <div className="absolute top-8 right-8 text-9xl font-bold text-white/[0.02] group-hover:text-white/[0.05] transition-colors duration-700 select-none">
                {String(i + 1).padStart(2, "0")}
              </div>

              {/* Portfolio overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0F14] via-[#0C0F14]/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Content */}
              <div className="absolute inset-0 p-8 lg:p-10 flex flex-col justify-end">
                <span
                  className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 transform translate-y-4 opacity-0 transition-all duration-500 delay-100 group-hover:translate-y-0 group-hover:opacity-100"
                  style={{ color: project.accent }}
                >
                  {project.category}
                </span>
                <h3 className="text-2xl lg:text-3xl font-bold text-[#F4F6F8] transform translate-y-4 opacity-0 transition-all duration-500 delay-150 group-hover:translate-y-0 group-hover:opacity-100 mb-3">
                  {project.name}
                </h3>
                <p className="text-[#8892A4] text-sm leading-relaxed max-w-sm transform translate-y-4 opacity-0 transition-all duration-500 delay-200 group-hover:translate-y-0 group-hover:opacity-100">
                  {project.description}
                </p>
              </div>

              {/* Arrow */}
              <div className="absolute top-8 right-8 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:border-[#00D1B2]/40 bg-[#0C0F14]/50 backdrop-blur-sm">
                <ArrowUpRight className="w-4 h-4 text-[#00D1B2]" />
              </div>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
