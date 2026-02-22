"use client";

import { useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import ProjectsGallery from "@/components/ProjectsGallery";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <CustomCursor />
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <SmoothScroll>
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <Services />
          <ProjectsGallery />
          <About />
          <Contact />
          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}
