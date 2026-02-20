"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePerformance } from "@/lib/usePerformanceStore";

gsap.registerPlugin(ScrollTrigger);

const skills = [
    "React / Next.js",
    "TypeScript",
    "Node.js",
    "GSAP / Framer Motion",
    "Three.js / WebGL",
    "Figma / Design",
    "Tailwind CSS",
    "MongoDB / PostgreSQL",
];

const statsData = [
    { number: 5, suffix: "+", label: "Years Experience" },
    { number: 50, suffix: "+", label: "Projects Done" },
    { number: 10, suffix: "+", label: "Awards" },
    { number: 100, suffix: "%", label: "Satisfaction" },
];

export default function About() {
    const { isLowPerformance } = usePerformance();
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const skillsRef = useRef<HTMLDivElement>(null);
    // Refs for stat number spans to animate
    const statValRefs = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const duration = isLowPerformance ? 0.4 : 1;
            const yOffset = isLowPerformance ? 20 : 60;

            // --- Heading ---
            gsap.fromTo(
                headingRef.current,
                { y: yOffset, opacity: 0 },
                {
                    y: 0, opacity: 1, duration,
                    ease: "power3.out",
                    scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
                }
            );

            // --- Text paragraphs — stagger batch (more efficient than individual fromTo) ---
            const paragraphs = textRef.current?.querySelectorAll("p");
            if (paragraphs && paragraphs.length > 0) {
                gsap.fromTo(
                    paragraphs,
                    { y: isLowPerformance ? 10 : 40, opacity: 0 },
                    {
                        y: 0, opacity: 1,
                        duration: isLowPerformance ? 0.3 : 0.8,
                        ease: "power3.out",
                        stagger: 0.12, // replaces the forEach + delay pattern
                        scrollTrigger: { trigger: textRef.current, start: "top 85%" },
                    }
                );
            }

            // --- Stats: animate-in + counter ---
            const statItems = statsRef.current?.querySelectorAll(".stat-item");
            if (statItems && statItems.length > 0) {
                gsap.fromTo(
                    statItems,
                    { y: 30, opacity: 0 },
                    {
                        y: 0, opacity: 1,
                        duration: isLowPerformance ? 0.3 : 0.6,
                        ease: "power3.out",
                        stagger: 0.1,
                        scrollTrigger: {
                            trigger: statsRef.current,
                            start: "top 90%",
                            onEnter: () => {
                                // Animated counter — clean closure, no type casts
                                if (isLowPerformance) return;
                                statsData.forEach((stat, i) => {
                                    const el = statValRefs.current[i];
                                    if (!el) return;
                                    const counter = { val: 0 };
                                    gsap.to(counter, {
                                        val: stat.number,
                                        duration: 1.5,
                                        ease: "power2.out",
                                        onUpdate() {
                                            el.textContent =
                                                Math.floor(counter.val) + stat.suffix;
                                        },
                                    });
                                });
                            },
                        },
                    }
                );
            }

            // --- Skills — stagger batch ---
            const skillItems = skillsRef.current?.querySelectorAll(".skill-tag");
            if (skillItems && skillItems.length > 0) {
                gsap.fromTo(
                    skillItems,
                    { scale: isLowPerformance ? 1 : 0.8, opacity: 0 },
                    {
                        scale: 1, opacity: 1,
                        duration: 0.5,
                        ease: "back.out(1.2)",
                        stagger: 0.05,
                        scrollTrigger: { trigger: skillsRef.current, start: "top 85%" },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, [isLowPerformance]);

    return (
        <section ref={sectionRef} id="about" className="px-10 md:px-24 py-40 md:py-56 relative">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-20 md:gap-28">
                {/* Left column */}
                <div className="md:col-span-5">
                    <h2
                        ref={headingRef}
                        className="text-5xl md:text-7xl font-serif font-bold mb-12"
                    >
                        About<span className="text-[#C5FB45]">.</span>
                    </h2>

                    <div ref={statsRef} className="grid grid-cols-2 gap-x-10 gap-y-12 mt-20 md:mt-24">
                        {statsData.map((stat, i) => (
                            <div key={i} className="stat-item">
                                <div className="text-4xl md:text-5xl font-serif font-bold text-[#C5FB45]">
                                    {/* Ref stored for GSAP counter animation */}
                                    <span ref={(el) => { statValRefs.current[i] = el; }}>
                                        {stat.number}{stat.suffix}
                                    </span>
                                </div>
                                <div className="text-xs uppercase tracking-[0.15em] text-[#666] mt-2">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right column */}
                <div className="md:col-span-7" ref={textRef}>
                    <p className="text-xl md:text-2xl leading-relaxed text-[#999] mb-8">
                        I&apos;m a multidisciplinary{" "}
                        <span className="text-[#E8E4DF]">creative developer</span> and{" "}
                        <span className="text-[#E8E4DF]">designer</span> who specializes in
                        building premium digital experiences that push the boundaries of
                        what&apos;s possible on the web.
                    </p>

                    <p className="text-xl md:text-2xl leading-relaxed text-[#999] mb-8">
                        My work sits at the intersection of{" "}
                        <span className="text-[#C5FB45]">design</span>,{" "}
                        <span className="text-[#C5FB45]">technology</span>, and{" "}
                        <span className="text-[#C5FB45]">motion</span> — creating
                        interfaces that are not only visually stunning but functionally
                        impeccable.
                    </p>

                    <p className="text-lg leading-relaxed text-[#666]">
                        Currently based in Lima, Perú. Available for freelance projects
                        and full-time opportunities.
                    </p>

                    {/* Skills */}
                    <div ref={skillsRef} className="flex flex-wrap gap-4 mt-16">
                        {skills.map((skill) => (
                            <span
                                key={skill}
                                className="skill-tag px-5 py-2.5 rounded-full border border-[#333] text-sm text-[#999] hover:border-[#C5FB45] hover:text-[#C5FB45] transition-all duration-300"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
