"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePerformance } from "@/lib/usePerformanceStore";

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        title: "Desarrollo Web",
        description: "Sitios y aplicaciones web de alto rendimiento con tecnologías modernas.",
        tags: ["Next.js", "React", "Node"],
    },
    {
        title: "Diseño UI/UX",
        description: "Interfaces intuitivas y experiencias centradas en el usuario.",
        tags: ["Figma", "Prototyping", "Research"],
    },
    {
        title: "E-Commerce",
        description: "Tiendas online optimizadas para conversión y crecimiento.",
        tags: ["Shopify", "WooCommerce", "Custom"],
    },
    {
        title: "Branding Digital",
        description: "Identidad visual que conecta con tu audiencia y diferencia tu marca.",
        tags: ["Logo", "Guidelines", "Strategy"],
    },
];

export default function Services() {
    const { isLowPerformance } = usePerformance();
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                headingRef.current,
                { y: isLowPerformance ? 20 : 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: isLowPerformance ? 0.4 : 1.2,
                    ease: "power3.out",
                    scrollTrigger: { trigger: headingRef.current, start: "top 80%" },
                }
            );

            const cards = cardsRef.current?.querySelectorAll(".service-card");
            if (cards && cards.length > 0) {
                gsap.fromTo(
                    cards,
                    { y: isLowPerformance ? 20 : 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: isLowPerformance ? 0.4 : 0.8,
                        ease: "power3.out",
                        stagger: 0.12,
                        scrollTrigger: { trigger: cardsRef.current, start: "top 80%" },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, [isLowPerformance]);

    return (
        <section ref={sectionRef} id="services" className="px-10 md:px-24 py-48 md:py-64 relative">
            <div className="w-full max-w-7xl mx-auto">
                <span className="text-xs uppercase tracking-[0.4em] text-[#666] mb-12 block">
                    Lo que hacemos
                </span>

                <h2
                    ref={headingRef}
                    className="text-6xl md:text-[6vw] lg:text-7xl font-serif font-bold mb-24 md:mb-32 leading-none text-[#E8E4DF]"
                >
                    Servicios<span className="text-[#C5FB45]">.</span>
                </h2>

                <div
                    ref={cardsRef}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
                >
                    {services.map((service, i) => (
                        <div
                            key={i}
                            className="service-card group relative bg-[#0A0A0A] border border-[#1a1a1a] hover:border-[#C5FB45]/30 rounded-2xl p-10 md:p-14 transition-all duration-500"
                        >
                            {/* Number */}
                            <span className="text-[10px] uppercase tracking-[0.3em] text-[#444] mb-10 block">
                                {String(i + 1).padStart(2, "0")}
                            </span>

                            {/* Title */}
                            <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#E8E4DF] mb-6 group-hover:text-[#C5FB45] transition-colors duration-500">
                                {service.title}
                            </h3>

                            {/* Description */}
                            <p className="text-base md:text-lg text-[#666] leading-relaxed mb-10 max-w-md">
                                {service.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-3">
                                {service.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-[10px] uppercase tracking-[0.2em] text-[#555] bg-[#111] border border-[#222] px-4 py-2 rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Hover arrow */}
                            <div className="absolute top-10 right-10 md:top-14 md:right-14 w-10 h-10 rounded-full border border-[#222] group-hover:border-[#C5FB45] flex items-center justify-center transition-all duration-500 group-hover:bg-[#C5FB45]">
                                <svg
                                    className="w-4 h-4 text-[#444] group-hover:text-[#0F0F0F] transition-colors duration-500 -rotate-45"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
