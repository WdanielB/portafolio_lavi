"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePerformance } from "@/lib/usePerformanceStore";

gsap.registerPlugin(ScrollTrigger);

const stack = [
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "AWS",
    "Figma",
    "WordPress",
    "Shopify",
];

const statsData = [
    { number: 5, suffix: "+", label: "Años" },
    { number: 50, suffix: "+", label: "Proyectos" },
    { number: 30, suffix: "+", label: "Clientes" },
    { number: 100, suffix: "%", label: "Satisfacción" },
];

export default function About() {
    const { isLowPerformance } = usePerformance();
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const stackRef = useRef<HTMLDivElement>(null);
    const statValRefs = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const duration = isLowPerformance ? 0.4 : 1.2;
            const yOffset = isLowPerformance ? 20 : 60;

            gsap.fromTo(
                headingRef.current,
                { y: yOffset, opacity: 0 },
                {
                    y: 0, opacity: 1, duration,
                    ease: "power3.out",
                    scrollTrigger: { trigger: headingRef.current, start: "top 80%" },
                }
            );

            const paragraphs = textRef.current?.querySelectorAll("p");
            if (paragraphs && paragraphs.length > 0) {
                gsap.fromTo(
                    paragraphs,
                    { y: isLowPerformance ? 10 : 40, opacity: 0 },
                    {
                        y: 0, opacity: 1,
                        duration: isLowPerformance ? 0.4 : 1,
                        ease: "power3.out",
                        stagger: 0.15,
                        scrollTrigger: { trigger: textRef.current, start: "top 80%" },
                    }
                );
            }

            const statItems = statsRef.current?.querySelectorAll(".stat-item");
            if (statItems && statItems.length > 0) {
                gsap.fromTo(
                    statItems,
                    { y: 30, opacity: 0 },
                    {
                        y: 0, opacity: 1,
                        duration: isLowPerformance ? 0.4 : 0.8,
                        ease: "power3.out",
                        stagger: 0.1,
                        scrollTrigger: {
                            trigger: statsRef.current,
                            start: "top 85%",
                            onEnter: () => {
                                if (isLowPerformance) return;
                                statsData.forEach((stat, i) => {
                                    const el = statValRefs.current[i];
                                    if (!el) return;
                                    const counter = { val: 0 };
                                    gsap.to(counter, {
                                        val: stat.number,
                                        duration: 2,
                                        ease: "power2.out",
                                        onUpdate() {
                                            el.textContent = Math.floor(counter.val) + stat.suffix;
                                        },
                                    });
                                });
                            },
                        },
                    }
                );
            }

            const stackItems = stackRef.current?.querySelectorAll(".skill-tag");
            if (stackItems && stackItems.length > 0) {
                gsap.fromTo(
                    stackItems,
                    { scale: isLowPerformance ? 1 : 0.8, opacity: 0 },
                    {
                        scale: 1, opacity: 1,
                        duration: 0.6,
                        ease: "back.out(1.5)",
                        stagger: 0.05,
                        scrollTrigger: { trigger: stackRef.current, start: "top 85%" },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, [isLowPerformance]);

    return (
        <section ref={sectionRef} id="about" className="px-10 md:px-24 py-48 md:py-64 relative">
            <div className="w-full max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 lg:gap-32">

                    {/* Left column */}
                    <div className="lg:col-span-5">
                        <span className="text-xs uppercase tracking-[0.4em] text-[#666] mb-12 block">
                            Nuestra Agencia
                        </span>

                        <h2
                            ref={headingRef}
                            className="text-6xl md:text-[6vw] lg:text-7xl font-serif font-bold mb-16 leading-none text-[#E8E4DF]"
                        >
                            Quiénes<br />somos<span className="text-[#C5FB45]">.</span>
                        </h2>

                        <div ref={statsRef} className="grid grid-cols-2 gap-x-12 gap-y-16 mt-24">
                            {statsData.map((stat, i) => (
                                <div key={i} className="stat-item">
                                    <div className="text-5xl md:text-6xl font-serif font-bold text-[#E8E4DF]">
                                        <span ref={(el) => { statValRefs.current[i] = el; }}>
                                            {stat.number}{stat.suffix}
                                        </span>
                                    </div>
                                    <div className="text-xs uppercase tracking-[0.3em] text-[#666] mt-4">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right column */}
                    <div className="lg:col-span-7 flex flex-col justify-center" ref={textRef}>
                        <div className="space-y-12 max-w-2xl">
                            <p className="text-3xl md:text-4xl leading-[1.3] text-[#E8E4DF] font-serif">
                                Somos un estudio de desarrollo web especializado en crear experiencias digitales de alto impacto.
                            </p>

                            <p className="text-xl md:text-2xl leading-[1.6] text-[#888]">
                                Combinamos <span className="text-[#C5FB45]">diseño</span>, <span className="text-[#C5FB45]">tecnología</span> y <span className="text-[#C5FB45]">estrategia</span> para llevar tu marca al siguiente nivel.
                            </p>

                            <p className="text-base md:text-lg tracking-wide text-[#666]">
                                Lima, Perú. Trabajamos con clientes en todo Latinoamérica.
                            </p>
                        </div>

                        {/* Tech Stack */}
                        <div ref={stackRef} className="flex flex-wrap gap-4 mt-24">
                            {stack.map((tech) => (
                                <span
                                    key={tech}
                                    className="skill-tag px-6 py-3 rounded-full border border-[#222] bg-[#0A0A0A] text-xs uppercase tracking-[0.2em] text-[#888] hover:border-[#C5FB45] hover:text-[#C5FB45] transition-all duration-300"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
