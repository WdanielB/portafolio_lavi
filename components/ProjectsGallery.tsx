"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePerformance } from "@/lib/usePerformanceStore";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    { id: 1, title: "Lumina", client: "Nura Health", subtitle: "Web App", year: "2024", color: "#1a3a2a" },
    { id: 2, title: "Orbital", client: "Fintech Corp", subtitle: "Landing Page", year: "2024", color: "#2a1a3a" },
    { id: 3, title: "Nexus", client: "RetailCo", subtitle: "E-Commerce", year: "2023", color: "#3a2a1a" },
    { id: 4, title: "Canvas", client: "Studio MX", subtitle: "Branding", year: "2023", color: "#1a2a3a" },
    { id: 5, title: "Aether", client: "TechStart", subtitle: "SaaS Platform", year: "2023", color: "#2a3a1a" },
];

export default function ProjectsGallery() {
    const { isLowPerformance } = usePerformance();
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const [paddingLeft, setPaddingLeft] = useState("5vw");

    // Calculate dynamic padding-left to align the horizontal track with the max-w-6xl container
    useEffect(() => {
        const updatePadding = () => {
            let perc = 0.05; // 5% for w-[90%]
            if (window.innerWidth >= 1024) perc = 0.10; // 10% for lg:w-[80%]
            else if (window.innerWidth >= 768) perc = 0.075; // 7.5% for md:w-[85%]

            const maxWidth = 1152; // max-w-6xl = 1152px
            const calculatedWidth = window.innerWidth * (1 - perc * 2);

            if (calculatedWidth > maxWidth) {
                setPaddingLeft(`${(window.innerWidth - maxWidth) / 2}px`);
            } else {
                setPaddingLeft(`${perc * 100}vw`);
            }
        };

        updatePadding();
        window.addEventListener("resize", updatePadding);
        return () => window.removeEventListener("resize", updatePadding);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                headingRef.current,
                { y: isLowPerformance ? 20 : 60, opacity: 0 },
                {
                    y: 0, opacity: 1,
                    duration: isLowPerformance ? 0.4 : 1.2,
                    ease: "power3.out",
                    scrollTrigger: { trigger: headingRef.current, start: "top 80%" },
                }
            );

            if (isLowPerformance) {
                const cards = sectionRef.current?.querySelectorAll(".project-card");
                if (cards && cards.length > 0) {
                    gsap.fromTo(cards, { opacity: 0, y: 30 }, {
                        opacity: 1, y: 0, duration: 0.4, stagger: 0.1,
                        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
                    });
                }
                return;
            }

            const track = trackRef.current;
            if (!track) return;
            const totalScroll = track.scrollWidth - window.innerWidth;

            const horizontalAnim = gsap.to(track, {
                x: -totalScroll,
                ease: "none",
                scrollTrigger: {
                    id: "horizontal",
                    trigger: sectionRef.current,
                    start: "top top",
                    end: () => `+=${totalScroll}`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                },
            });

            const cards = track.querySelectorAll(".project-card");
            cards.forEach((card) => {
                gsap.fromTo(
                    card,
                    { opacity: 0, scale: 0.9 },
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            containerAnimation: horizontalAnim,
                            start: "left 85%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [isLowPerformance]);

    const cardElements = projects.map((project, index) => (
        <div
            key={project.id}
            className={`project-card group ${isLowPerformance
                ? "w-full h-[320px]"
                : "w-[75vw] md:w-[45vw] h-[65vh] flex-shrink-0"
                } rounded-2xl overflow-hidden relative shadow-2xl`}
            style={{ backgroundColor: project.color }}
        >
            {/* Number */}
            <div className="absolute top-8 left-8 z-10">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
                    {String(index + 1).padStart(2, "0")}
                </span>
            </div>

            {/* Year + Client badge */}
            <div className="absolute top-8 right-8 z-10 flex items-center gap-3">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                    {project.client}
                </span>
                <span className="text-[10px] uppercase tracking-[0.3em] bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-white">
                    {project.year}
                </span>
            </div>

            {/* Content at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-10 z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-[10px] text-[#C5FB45] tracking-[0.3em] uppercase mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        {project.subtitle}
                    </p>
                    <h3 className="text-4xl md:text-6xl font-serif font-bold text-white">
                        {project.title}
                    </h3>
                </div>
            </div>

            {/* View indicator */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100">
                <div className="w-28 h-28 bg-[#C5FB45] rounded-full flex items-center justify-center text-[#0F0F0F] transform -rotate-12 group-hover:rotate-0 transition-transform duration-700">
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] pb-0.5">
                        Ver
                    </span>
                </div>
            </div>
        </div>
    ));

    return (
        <section ref={sectionRef} id="work" className="relative bg-[#050505]">
            <div className="w-[90%] md:w-[85%] lg:w-[80%] max-w-6xl mx-auto pt-48 md:pt-64 pb-20">
                <span className="text-xs uppercase tracking-[0.4em] text-[#666] mb-12 block">
                    Casos de Éxito
                </span>
                <div className="flex items-end justify-between mb-10">
                    <h2 ref={headingRef} className="text-6xl md:text-[6vw] font-serif font-bold text-[#E8E4DF] leading-none">
                        Nuestro<br className="md:hidden" /> Trabajo<span className="text-[#C5FB45]">.</span>
                    </h2>
                    <span className="text-xs text-[#666] tracking-[0.2em] uppercase hidden md:block">
                        {projects.length} Proyectos
                    </span>
                </div>
                <div className="h-[1px] bg-[#222]" />
            </div>

            {isLowPerformance ? (
                <div className="w-[90%] md:w-[85%] lg:w-[80%] max-w-6xl mx-auto pb-48 md:pb-64 grid grid-cols-1 md:grid-cols-2 gap-12">
                    {cardElements}
                </div>
            ) : (
                <div
                    ref={trackRef}
                    className="flex gap-16 md:gap-[5vw] pb-64 pt-8"
                    style={{
                        width: "max-content",
                        paddingLeft: paddingLeft // Dynamic calculation ensures exact alignment with max-w-6xl main container above
                    }}
                >
                    {cardElements}
                </div>
            )}
        </section>
    );
}
