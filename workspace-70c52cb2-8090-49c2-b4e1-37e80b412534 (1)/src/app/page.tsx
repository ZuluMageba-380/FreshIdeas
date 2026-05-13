"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

import Navigation from "@/components/navigation";
import Hero from "@/components/hero";
import BrandMarquee from "@/components/brand-marquee";
import WhoWeAre from "@/components/who-we-are";
import WhatWeDo from "@/components/what-we-do";
import SelectedWork from "@/components/selected-work";
import About from "@/components/about";
import Portfolio from "@/components/portfolio";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

const CustomCursor = dynamic(() => import("@/components/custom-cursor"), {
  ssr: false,
});

const SmoothScrollProvider = dynamic(
  () => import("@/components/smooth-scroll-provider"),
  { ssr: false }
);

const ParticleCanvas = dynamic(() => import("@/components/particle-canvas"), {
  ssr: false,
});

const CursorGlow = dynamic(() => import("@/components/cursor-glow"), {
  ssr: false,
});

const MorphingBlobs = dynamic(() => import("@/components/morphing-blobs"), {
  ssr: false,
});

const FilmGrain = dynamic(() => import("@/components/film-grain"), {
  ssr: false,
});

const FloatingLogos = dynamic(() => import("@/components/floating-logos"), {
  ssr: false,
});

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    // Refresh ScrollTrigger after all content loads
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 2500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <SmoothScrollProvider>
      {/* Immersive layers — ordered by visual depth */}
      <ParticleCanvas />
      <FloatingLogos />
      <CursorGlow />
      <MorphingBlobs />
      <FilmGrain />
      <CustomCursor />

      <Navigation />
      <main className="relative overflow-hidden">
        <Hero />
        <WhoWeAre />
        <BrandMarquee />
        <WhatWeDo />
        <SelectedWork />
        <About />
        <BrandMarquee />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
