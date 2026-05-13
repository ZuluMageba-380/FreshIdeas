"use client";

const FOOTER_NAV = [
  {
    title: "Navigation",
    links: [
      { label: "Home", href: "#home" },
      { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Portfolio", href: "#portfolio" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Brand Identity", href: "#services" },
      { label: "Web Development", href: "#services" },
      { label: "Media Production", href: "#services" },
      { label: "Drone Services", href: "#services" },
      { label: "Marketing", href: "#services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#about" },
      { label: "Portfolio", href: "#portfolio" },
      { label: "Contact", href: "#contact" },
    ],
  },
];

export default function Footer() {
  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative border-t border-white/[0.04]">
      {/* Top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00D1B2]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="relative mb-8 inline-block">
              {/* Radiant halo behind logo */}
              <div className="absolute -inset-6 rounded-2xl bg-[#00D1B2]/[0.06] blur-2xl pointer-events-none" />
              {/* Frosted glass panel */}
              <div className="relative px-5 py-3.5 rounded-xl bg-white/[0.05] backdrop-blur-md border border-white/[0.07]">
                <img
                  src="/logo.png"
                  alt="Fresh Ideas ZA Logo"
                  className="h-12 w-auto object-contain"
                  style={{ filter: "brightness(1.8) saturate(1.4) contrast(1.1)" }}
                />
              </div>
            </div>
            <p className="text-[#8892A4] text-sm leading-relaxed mb-6 max-w-sm">
              Designing meaningful digital experiences for ambitious brands and
              institutions. Creative. Digital. Media. Technology.
            </p>
            <div className="flex gap-3">
              {["Instagram", "LinkedIn", "Facebook"].map((social) => (
                <span
                  key={social}
                  className="px-4 py-2 text-xs font-medium text-[#8892A4] border border-white/[0.06] rounded-lg hover:border-[#00D1B2]/20 hover:text-[#00D1B2] transition-all duration-300 cursor-pointer"
                >
                  {social}
                </span>
              ))}
            </div>
          </div>

          {/* Nav Columns */}
          {FOOTER_NAV.map((column) => (
            <div key={column.title}>
              <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#5A6478] mb-6">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-sm text-[#8892A4] hover:text-[#00D1B2] transition-colors duration-300"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="premium-divider mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p className="text-[#5A6478]">
            Fresh Ideas ZA &copy; 2026 — Building Brands, Systems & Stories
            That Move.
          </p>
          <p className="text-[#5A6478] text-xs tracking-wider">
            Creative &bull; Digital &bull; Media &bull; Technology
          </p>
        </div>
      </div>
    </footer>
  );
}
