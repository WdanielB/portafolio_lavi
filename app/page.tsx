"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Philosophy from "@/components/Philosophy";
import Protocol from "@/components/Protocol";
import Services from "@/components/Services";
import Footer from "@/components/Footer";

// Global utilities
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <CustomCursor />
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      <SmoothScroll>
        {/* Midnight Luxe Navigation */}
        <Navbar />

        <main className="bg-[#0D0D12]">
          {/* The Opening Shot */}
          <Hero />

          {/* Interactive Functional Artifacts */}
          <Features />

          {/* The Manifesto */}
          <Philosophy />

          {/* Sticky Stacking Archive */}
          <Protocol />

          {/* Membership / Pricing CTA */}
          <Services />
        </main>

        {/* System Footer */}
        <Footer />
      </SmoothScroll>
    </>
  );
}
