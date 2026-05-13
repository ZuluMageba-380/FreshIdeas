"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Palette,
  Globe,
  Camera,
  Rocket,
  Disc3,
  GraduationCap,
} from "lucide-react";
import TiltCard from "@/components/tilt-card";
import KineticText from "@/components/kinetic-text";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    icon: Palette,
    title: "Brand Identity",
    description:
      "Strategic branding systems that define perception, clarity, and competitive positioning. We craft visual identities that communicate authority and build trust across every touchpoint.",
    items: ["Logo Design", "Corporate Identity", "Brand Strategy", "Brand Guidelines", "Company Profiles"],
    accent: "from-[#00D1B2] to-[#00B89C]",
    glowColor: "rgba(0,209,178,0.08)",
  },
  {
    icon: Globe,
    title: "Web & App Development",
    description:
      "Modern, scalable digital platforms engineered for performance and growth. From corporate websites to complex web applications, we build with precision and purpose.",
    items: ["Corporate Websites", "Mobile Apps", "Web Applications", "UI/UX Design", "SEO Optimization", "System Development"],
    accent: "from-[#6FFFE9] to-[#00D1B2]",
    glowColor: "rgba(111,255,233,0.08)",
  },
  {
    icon: Camera,
    title: "Photography & Film",
    description:
      "Cinematic storytelling crafted with precision and purpose. Every frame is intentionally composed to elevate your narrative and create emotional resonance.",
    items: ["Portrait Photography", "Corporate Photography", "Wedding Photography", "Event Coverage", "Cinematic Videography"],
    accent: "from-[#00D1B2] to-[#6FFFE9]",
    glowColor: "rgba(0,209,178,0.08)",
  },
  {
    icon: Rocket,
    title: "Marketing & Social Media",
    description:
      "Structured digital campaigns designed for visibility and measurable growth. We combine data-driven strategy with creative execution to deliver results.",
    items: ["Social Media Management", "Paid Advertising", "Campaign Strategy", "Content Marketing", "Brand Growth"],
    accent: "from-[#00B89C] to-[#6FFFE9]",
    glowColor: "rgba(0,184,156,0.08)",
  },
  {
    icon: Disc3,
    title: "Drone & Aerial Media",
    description:
      "Premium aerial visuals that elevate brand presence. We capture perspectives that transform ordinary content into extraordinary visual experiences.",
    items: ["Aerial Photography", "Aerial Videography", "Industrial Documentation", "Property Showcases", "Event Coverage"],
    accent: "from-[#6FFFE9] to-[#00D1B2]",
    glowColor: "rgba(111,255,233,0.08)",
  },
  {
    icon: GraduationCap,
    title: "Education & Institutional",
    description:
      "School and childcare digital platforms designed for operational excellence. We build systems that streamline administration and enhance delivery.",
    items: ["School Management Systems", "Childcare Platforms", "Institutional Digital Systems"],
    accent: "from-[#00D1B2] to-[#00B89C]",
    glowColor: "rgba(0,209,178,0.08)",
  },
];

export default function WhatWeDo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.fromTo(
          Array.from(cards),
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
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
      id="services"
      className="relative py-32 lg:py-44 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00D1B2]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={headingRef} className="text-center mb-20">
          <span className="inline-block text-[#00D1B2] text-xs font-semibold tracking-[0.25em] uppercase mb-6">
            What We Do
          </span>
          <KineticText
            text="Integrated Solutions for Modern Growth"
            as="h2"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F4F6F8]"
            splitBy="words"
            stagger={0.05}
          />
          <p className="mt-6 text-[#8892A4] text-lg max-w-2xl mx-auto">
            Six strategic divisions. One unified vision. We deliver comprehensive
            solutions that move brands forward with intention and precision.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((service) => {
            const IconComponent = service.icon;
            return (
              <TiltCard
                key={service.title}
                className="group rounded-2xl bg-[#151A21]/60 border border-white/[0.04] cursor-default"
                glowColor={service.glowColor}
              >
                <div className="p-8">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.accent} flex items-center justify-center mb-7 transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(0,209,178,0.2)]`}>
                    <IconComponent className="w-6 h-6 text-[#0C0F14]" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-[#F4F6F8] mb-3 group-hover:text-[#00D1B2] transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#8892A4] text-sm leading-relaxed mb-7">
                    {service.description}
                  </p>

                  {/* Items */}
                  <div className="flex flex-wrap gap-2">
                    {service.items.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1 text-xs font-medium text-[#6A7488] bg-[#0C0F14]/80 rounded-full border border-white/[0.04] group-hover:border-[#00D1B2]/15 group-hover:text-[#8892A4] transition-colors duration-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* Hover gradient bg */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-[#00D1B2]/[0.03] to-transparent pointer-events-none" />
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
