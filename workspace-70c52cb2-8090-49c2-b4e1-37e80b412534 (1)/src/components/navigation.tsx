"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = NAV_ITEMS.map((item) => item.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled
            ? "bg-[#0C0F14]/80 backdrop-blur-2xl border-b border-white/[0.04]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo — luminous frosted card treatment */}
            <button
              onClick={() => scrollToSection("#home")}
              className="group relative"
            >
              {/* Ambient halo — always visible, intensifies on hover */}
              <div className="absolute -inset-5 rounded-2xl bg-[#00D1B2]/[0.06] blur-2xl group-hover:bg-[#00D1B2]/[0.14] transition-all duration-700 pointer-events-none" />
              {/* Frosted glass card */}
              <div className="relative flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/[0.06] backdrop-blur-md border border-white/[0.08] group-hover:bg-white/[0.09] group-hover:border-[#00D1B2]/20 transition-all duration-500">
                <img
                  src="/logo.png"
                  alt="Fresh Ideas ZA Logo"
                  className="h-9 w-auto object-contain transition-all duration-500 group-hover:scale-110 brightness-[1.8] saturate-[1.4] contrast-[1.1]"
                  style={{ filter: "brightness(1.8) saturate(1.4) contrast(1.1)" }}
                />
                {/* Subtle emerald accent dot */}
                <div className="w-1.5 h-1.5 rounded-full bg-[#00D1B2] animate-pulse" />
              </div>
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className={`relative px-5 py-2 text-sm font-medium tracking-wide transition-all duration-300 rounded-lg ${
                    activeSection === item.href.replace("#", "")
                      ? "text-[#00D1B2]"
                      : "text-[#8892A4] hover:text-[#F4F6F8] hover:bg-white/[0.03]"
                  }`}
                >
                  {item.label}
                  {activeSection === item.href.replace("#", "") && (
                    <span className="absolute bottom-0 left-5 right-5 h-[2px] bg-gradient-to-r from-[#00D1B2] to-[#6FFFE9] rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <button
                onClick={() => scrollToSection("#contact")}
                className="group relative px-7 py-2.5 bg-gradient-to-r from-[#00D1B2] to-[#00B89C] text-[#0C0F14] text-sm font-semibold rounded-xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,209,178,0.3)] hover:scale-[1.03]"
              >
                <span className="relative z-10">Start a Project</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#6FFFE9] to-[#00D1B2] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </button>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden text-[#F4F6F8] p-2 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/[0.05] transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#0C0F14]/98 backdrop-blur-2xl transition-all duration-700 md:hidden ${
          isMobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {/* Logo in mobile menu — luminous treatment */}
          <div className="relative mb-8">
            <div className="absolute -inset-6 rounded-2xl bg-[#00D1B2]/[0.08] blur-3xl pointer-events-none" />
            <div className="relative px-6 py-4 rounded-xl bg-white/[0.06] backdrop-blur-md border border-white/[0.08]">
              <img
                src="/logo.png"
                alt="Fresh Ideas ZA Logo"
                className="h-14 w-auto object-contain"
                style={{ filter: "brightness(1.8) saturate(1.4) contrast(1.1)" }}
              />
            </div>
          </div>
          {NAV_ITEMS.map((item, i) => (
            <button
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              className="text-3xl font-semibold text-[#F4F6F8] hover:text-[#00D1B2] transition-all duration-300"
              style={{
                transitionDelay: isMobileOpen ? `${i * 80}ms` : "0ms",
                transform: isMobileOpen ? "translateY(0)" : "translateY(30px)",
                opacity: isMobileOpen ? 1 : 0,
              }}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection("#contact")}
            className="mt-4 px-8 py-3 bg-gradient-to-r from-[#00D1B2] to-[#00B89C] text-[#0C0F14] font-semibold rounded-xl transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,209,178,0.3)]"
            style={{
              transitionDelay: isMobileOpen ? "500ms" : "0ms",
              transform: isMobileOpen ? "translateY(0)" : "translateY(30px)",
              opacity: isMobileOpen ? 1 : 0,
            }}
          >
            Start a Project
          </button>
        </div>
      </div>
    </>
  );
}
