"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import TiltCard from "@/components/tilt-card";
import KineticText from "@/components/kinetic-text";

gsap.registerPlugin(ScrollTrigger);

const PORTFOLIO_ITEMS = [
  {
    name: "Corporate Identity System",
    category: "Brand Identity & Strategy",
    description:
      "A complete visual identity redesign for a leading financial services group — from logo architecture and typography systems to comprehensive brand guidelines and corporate stationery.",
    tags: ["Logo Design", "Brand Guidelines", "Corporate Identity"],
    accent: "#00D1B2",
  },
  {
    name: "Wedding Cinematic Film",
    category: "Photography & Media Production",
    description:
      "An emotionally immersive cinematic wedding film capturing the essence of celebration through editorial-grade cinematography and intentional sound design.",
    tags: ["Cinematic Film", "Wedding Photography", "Storytelling"],
    accent: "#6FFFE9",
  },
  {
    name: "School Management Platform",
    category: "Web & App Development",
    description:
      "A comprehensive school management system streamlining enrollment, attendance, grading, and parent communication — built for institutional operational excellence.",
    tags: ["Web Application", "UI/UX Design", "System Development"],
    accent: "#00D1B2",
  },
  {
    name: "Industrial Safety Documentary",
    category: "Drone & Aerial Media",
    description:
      "Aerial and ground-level safety training video production for an industrial client, featuring drone documentation of facilities and cinematic safety procedure demonstrations.",
    tags: ["Drone Coverage", "Video Production", "Industrial Documentation"],
    accent: "#6FFFE9",
  },
  {
    name: "Brand Growth Campaign",
    category: "Marketing & Social Media",
    description:
      "A multi-channel digital campaign driving measurable brand awareness and lead generation through strategic content, paid advertising, and community management.",
    tags: ["Campaign Strategy", "Paid Advertising", "Social Media"],
    accent: "#00B89C",
  },
  {
    name: "Childcare Management System",
    category: "Educational & Institutional Systems",
    description:
      "An intuitive digital platform for childcare centres managing daily operations, parent engagement, attendance tracking, and developmental reporting.",
    tags: ["Platform Development", "Institutional Systems", "UI Design"],
    accent: "#00D1B2",
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

      const items = gridRef.current?.children;
      if (items) {
        gsap.fromTo(
          Array.from(items),
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative py-32 lg:py-44 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00D1B2]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={headingRef} className="text-center mb-20">
          <span className="inline-block text-[#00D1B2] text-xs font-semibold tracking-[0.25em] uppercase mb-6">
            Portfolio
          </span>
          <KineticText
            text="Work That Reflects Vision & Structure"
            as="h2"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F4F6F8]"
            splitBy="words"
            stagger={0.05}
          />
          <p className="mt-6 text-[#8892A4] text-lg max-w-2xl mx-auto">
            A curated selection of projects that demonstrate our commitment to
            strategic design, technical excellence, and purposeful storytelling.
          </p>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {PORTFOLIO_ITEMS.map((project, i) => (
            <TiltCard
              key={project.name}
              className="rounded-2xl border border-white/[0.04] cursor-pointer overflow-hidden"
              glowColor={`${project.accent}12`}
              glareOpacity={0.06}
            >
              {/* Visual Preview */}
              <div className="relative h-[260px] lg:h-[300px] bg-[#151A21] overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(circle at ${i % 2 === 0 ? "30% 40%" : "70% 60%"}, ${project.accent}15 0%, transparent 50%)`,
                  }}
                />
                {/* Geometric art */}
                <div className="absolute top-6 left-6 w-16 h-16 border border-white/[0.06] rounded-lg rotate-6 group-hover:rotate-12 transition-transform duration-700" />
                <div className="absolute bottom-6 right-6 w-24 h-24 border border-white/[0.06] rounded-full group-hover:scale-125 transition-transform duration-700" />
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full transition-all duration-700 group-hover:scale-150"
                  style={{ border: `1px solid ${project.accent}15` }}
                />
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full transition-all duration-700 group-hover:scale-[1.8]"
                  style={{ border: `1px solid ${project.accent}10` }}
                />
                {/* Pulse */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
                  style={{ backgroundColor: `${project.accent}25` }}
                />
                {/* Number */}
                <div className="absolute top-6 right-6 text-8xl font-bold text-white/[0.02] group-hover:text-white/[0.05] transition-colors duration-700 select-none">
                  {String(i + 1).padStart(2, "0")}
                </div>
                {/* Arrow */}
                <div className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:border-[#00D1B2]/40 bg-[#0C0F14]/60 backdrop-blur-sm z-10">
                  <ArrowUpRight className="w-4 h-4 text-[#00D1B2]" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 lg:p-8 bg-[#151A21]/80">
                <span
                  className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 inline-block"
                  style={{ color: project.accent }}
                >
                  {project.category}
                </span>
                <h3 className="text-xl lg:text-2xl font-bold text-[#F4F6F8] mb-3 group-hover:text-[#00D1B2] transition-colors duration-300">
                  {project.name}
                </h3>
                <p className="text-[#8892A4] text-sm leading-relaxed mb-5">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium text-[#5A6478] bg-[#0C0F14]/80 rounded-full border border-white/[0.04]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
