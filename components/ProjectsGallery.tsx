"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePerformance } from "@/lib/usePerformanceStore";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    { id: 1, title: "Lumina", subtitle: "Brand & Web Design", year: "2024", color: "#1a3a2a" },
    { id: 2, title: "Orbital", subtitle: "Creative Direction", year: "2024", color: "#2a1a3a" },
    { id: 3, title: "Nexus", subtitle: "UI/UX & Development", year: "2023", color: "#3a2a1a" },
    { id: 4, title: "Canvas", subtitle: "Motion Design", year: "2023", color: "#1a2a3a" },
    { id: 5, title: "Aether", subtitle: "Full Stack App", year: "2023", color: "#2a3a1a" },
];

export default function ProjectsGallery() {
    const { isLowPerformance } = usePerformance();
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Heading reveal
            gsap.fromTo(
                headingRef.current,
                { y: isLowPerformance ? 20 : 60, opacity: 0 },
                {
                    y: 0, opacity: 1,
                    duration: isLowPerformance ? 0.4 : 1,
                    ease: "power3.out",
                    scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
                }
            );

            // Low-power: skip the expensive pinned horizontal scroll
            if (isLowPerformance) {
                const cards = sectionRef.current?.querySelectorAll(".project-card");
                if (cards && cards.length > 0) {
                    gsap.fromTo(cards, { opacity: 0, y: 30 }, {
                        opacity: 1, y: 0, duration: 0.4, stagger: 0.08,
                        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
                    });
                }
                return;
            }

            // Performance mode: horizontal scroll with GSAP pin
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

            // Animate each card with the containerAnimation correctly linked
            const cards = track.querySelectorAll(".project-card");
            cards.forEach((card) => {
                gsap.fromTo(
                    card,
                    { opacity: 0, scale: 0.85 },
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            containerAnimation: horizontalAnim, // ✅ properly linked
                            start: "left 90%",
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
                ? "w-full h-[280px]"
                : "w-[75vw] md:w-[40vw] h-[55vh] md:h-[65vh] flex-shrink-0"
                } rounded-xl overflow-hidden relative`}
            style={{ backgroundColor: project.color }}
        >
            {/* Number */}
            <div className="absolute top-6 left-6 z-10">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                    {String(index + 1).padStart(2, "0")}
                </span>
            </div>

            {/* Year badge */}
            <div className="absolute top-6 right-6 z-10">
                <span className="text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border border-white/20 text-white/60">
                    {project.year}
                </span>
            </div>

            {/* Content at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-4xl md:text-5xl font-serif font-bold mb-2 text-white">
                        {project.title}
                    </h3>
                    <p className="text-sm text-white/50 tracking-wide uppercase">
                        {project.subtitle}
                    </p>
                </div>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

            {/* View indicator */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100">
                <div className="w-24 h-24 rounded-full border border-[#C5FB45] flex items-center justify-center">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5FB45]">
                        View
                    </span>
                </div>
            </div>
        </div>
    ));

    return (
        <section ref={sectionRef} id="work" className="relative">
            <div className="px-10 md:px-24 pt-40 md:pt-56 pb-16">
                <div className="flex items-end justify-between mb-6">
                    <h2 ref={headingRef} className="text-5xl md:text-7xl font-serif font-bold">
                        Selected <span className="italic text-[#C5FB45]">Works</span>
                    </h2>
                    <span className="text-sm text-[#666] tracking-[0.15em] uppercase hidden md:block">
                        ({projects.length} Projects)
                    </span>
                </div>
                <div className="h-[1px] bg-[#333]" />
            </div>

            {/* Low-power: simple responsive grid */}
            {isLowPerformance ? (
                <div className="px-10 md:px-24 pb-40 md:pb-56 pt-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                    {cardElements}
                </div>
            ) : (
                /* Performance: horizontal scroll track */
                <div
                    ref={trackRef}
                    className="flex gap-[3vw] px-10 md:px-24 pb-48 pt-12"
                    style={{ width: "max-content" }}
                >
                    {cardElements}
                </div>
            )}
        </section>
    );
}
