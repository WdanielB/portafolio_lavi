"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const skillsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Heading
            gsap.fromTo(
                headingRef.current,
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: "top 85%",
                    },
                }
            );

            // Text paragraphs
            const paragraphs = textRef.current?.querySelectorAll("p");
            if (paragraphs) {
                paragraphs.forEach((p, i) => {
                    gsap.fromTo(
                        p,
                        { y: 40, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.8,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: p,
                                start: "top 85%",
                            },
                            delay: i * 0.1,
                        }
                    );
                });
            }

            // Stats
            const statItems = statsRef.current?.querySelectorAll(".stat-item");
            if (statItems) {
                statItems.forEach((item, i) => {
                    gsap.fromTo(
                        item,
                        { y: 30, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.6,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: item,
                                start: "top 90%",
                            },
                            delay: i * 0.1,
                        }
                    );
                });
            }

            // Skills
            const skillItems = skillsRef.current?.querySelectorAll(".skill-tag");
            if (skillItems) {
                skillItems.forEach((item, i) => {
                    gsap.fromTo(
                        item,
                        { scale: 0.8, opacity: 0 },
                        {
                            scale: 1,
                            opacity: 1,
                            duration: 0.5,
                            ease: "back.out",
                            scrollTrigger: {
                                trigger: skillsRef.current,
                                start: "top 85%",
                            },
                            delay: i * 0.05,
                        }
                    );
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="about"
            className="px-8 md:px-16 py-32 relative"
        >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
                {/* Left column */}
                <div className="md:col-span-5">
                    <h2
                        ref={headingRef}
                        className="text-5xl md:text-7xl font-serif font-bold mb-8"
                    >
                        About<span className="text-[#C5FB45]">.</span>
                    </h2>

                    <div ref={statsRef} className="grid grid-cols-2 gap-8 mt-16">
                        {[
                            { number: "5+", label: "Years Experience" },
                            { number: "50+", label: "Projects Done" },
                            { number: "10+", label: "Awards" },
                            { number: "100%", label: "Satisfaction" },
                        ].map((stat, i) => (
                            <div key={i} className="stat-item">
                                <div className="text-4xl md:text-5xl font-serif font-bold text-[#C5FB45]">
                                    {stat.number}
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
                    <div ref={skillsRef} className="flex flex-wrap gap-3 mt-12">
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
