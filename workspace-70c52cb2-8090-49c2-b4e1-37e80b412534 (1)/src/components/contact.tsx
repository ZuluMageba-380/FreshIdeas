"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, MapPin, Mail, Phone } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SERVICE_OPTIONS = [
  "Brand Identity & Strategy",
  "Web & App Development",
  "Photography & Media Production",
  "Drone & Aerial Media",
  "Marketing & Social Media",
  "Educational & Institutional Systems",
];

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

      gsap.fromTo(
        formRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        infoRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 lg:py-44 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00D1B2]/20 to-transparent" />

      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#00D1B2]/[0.03] rounded-full blur-[200px]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={headingRef} className="text-center mb-20">
          <span className="inline-block text-[#00D1B2] text-xs font-semibold tracking-[0.25em] uppercase mb-6">
            Get in Touch
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F4F6F8]">
            Let&apos;s Build Something{" "}
            <span className="gradient-text">Meaningful</span>
          </h2>
          <p className="mt-6 text-[#8892A4] text-lg max-w-xl mx-auto">
            Tell us about your project and we will connect within one business
            day.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6 p-8 lg:p-10 rounded-2xl bg-[#151A21]/40 border border-white/[0.04] backdrop-blur-sm"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#8892A4] mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your full name"
                    className="premium-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#8892A4] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="premium-input"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#8892A4] mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    placeholder="Your company name"
                    className="premium-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#8892A4] mb-2">
                    Service Required
                  </label>
                  <select
                    required
                    className="premium-input appearance-none"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    {SERVICE_OPTIONS.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#8892A4] mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us about your project, goals, and timeline..."
                  className="premium-input resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-[#00D1B2] to-[#00B89C] text-[#0C0F14] font-semibold rounded-xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_50px_rgba(0,209,178,0.35)] hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-[#0C0F14]/30 border-t-[#0C0F14] rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : isSubmitted ? (
                    "Message Sent"
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#6FFFE9] to-[#00D1B2] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </button>

              {isSubmitted && (
                <p className="text-[#00D1B2] text-sm font-medium animate-reveal-up">
                  Thank you for reaching out. We will connect with you within
                  one business day.
                </p>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div ref={infoRef} className="lg:col-span-2">
            <div className="space-y-6">
              {[
                {
                  icon: MapPin,
                  title: "Location",
                  content: "South Africa\nServing clients nationwide",
                },
                {
                  icon: Mail,
                  title: "Email",
                  content: "hello@freshideasza.co.za",
                  isEmail: true,
                },
                {
                  icon: Phone,
                  title: "Response Time",
                  content: "Within one business day",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="group p-6 rounded-xl bg-[#151A21]/60 border border-white/[0.04] hover:border-[#00D1B2]/15 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#00D1B2]/15 to-transparent flex items-center justify-center shrink-0 group-hover:from-[#00D1B2]/25 transition-all duration-300">
                      <item.icon className="w-5 h-5 text-[#00D1B2]" />
                    </div>
                    <div>
                      <h4 className="text-[#F4F6F8] font-semibold mb-1">
                        {item.title}
                      </h4>
                      <p className="text-[#8892A4] text-sm leading-relaxed whitespace-pre-line">
                        {item.isEmail ? (
                          <span className="text-[#00D1B2]">{item.content}</span>
                        ) : (
                          item.content
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Quote */}
              <div className="relative p-6 rounded-xl bg-gradient-to-br from-[#00D1B2]/[0.06] to-transparent border border-[#00D1B2]/10">
                <div className="absolute top-3 left-4 text-4xl text-[#00D1B2]/20 font-serif">&ldquo;</div>
                <p className="text-[#F4F6F8] text-sm font-medium leading-relaxed pt-4">
                  We partner with ambitious brands and institutions to create
                  meaningful digital experiences that drive lasting impact.
                </p>
                <div className="mt-4 text-xs text-[#00D1B2] font-semibold tracking-wider uppercase">
                  Fresh Ideas ZA
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
