"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePerformance } from "@/lib/usePerformanceStore";

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
    const { isLowPerformance } = usePerformance();
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax background
            if (!isLowPerformance) {
                gsap.to(".phil-bg", {
                    yPercent: 40,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    },
                });
            }

            // Word-by-word reveal for the massive thesis statement
            const words = contentRef.current?.querySelectorAll(".phil-word");
            if (words && words.length > 0) {
                gsap.fromTo(
                    words,
                    { opacity: 0, y: 50, rotateX: -30 },
                    {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        duration: 1,
                        ease: "power3.out",
                        stagger: 0.05,
                        scrollTrigger: {
                            trigger: contentRef.current,
                            start: "top 70%"
                        }
                    }
                );
            }

            // Fade in the minor statement
            gsap.fromTo(
                ".phil-minor",
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 1, ease: "power2.out",
                    scrollTrigger: {
                        trigger: contentRef.current,
                        start: "top 80%"
                    }
                }
            );

        }, sectionRef);

        return () => ctx.revert();
    }, [isLowPerformance]);

    return (
        <section
            ref={sectionRef}
            id="filosofia"
            className="relative w-full py-48 md:py-72 overflow-hidden bg-[#0D0D12] flex items-center"
        >
            {/* Dark Organic Texture Parallax BG */}
            <div className="absolute inset-0 z-0 h-[130%] -top-[15%] opacity-20">
                <img
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2600&auto=format&fit=crop"
                    alt="Dark texture"
                    className="phil-bg w-full h-full object-cover mix-blend-luminosity grayscale"
                />
            </div>

            {/* Gradient Masking */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0D0D12] via-transparent to-[#0D0D12]" />

            <div
                ref={contentRef}
                className="w-[90%] md:w-[85%] lg:w-[80%] max-w-6xl mx-auto relative z-10 flex flex-col items-center text-center"
            >
                <p className="phil-minor text-[#FAF8F5]/50 font-sans tracking-[0.2em] uppercase text-xs md:text-sm mb-12 max-w-lg">
                    La mayoría de agencias se enfocan en: <br className="md:hidden" /> plantillas rápidas.
                </p>

                <h2 className="font-serif italic text-4xl sm:text-6xl md:text-7xl lg:text-[7vw] leading-[1.1] text-[#FAF8F5] max-w-[90%] mx-auto" style={{ perspective: "1000px" }}>
                    <span className="phil-word inline-block mr-4">Nosotros</span>
                    <span className="phil-word inline-block mr-4">nos</span>
                    <span className="phil-word inline-block mr-4">enfocamos</span>
                    <span className="phil-word inline-block mr-4">en</span>
                    <span className="phil-word inline-block mr-4">la</span>
                    <span className="phil-word inline-block text-[#C9A84C] relative font-bold">
                        artesanía digital.
                        <span className="absolute -bottom-4 left-0 w-full h-[2px] bg-[#C9A84C]/50 rounded-full" />
                    </span>
                </h2>
            </div>
        </section>
    );
}
