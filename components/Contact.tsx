"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePerformance } from "@/lib/usePerformanceStore";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
    const { isLowPerformance } = usePerformance();
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const btnRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Heading lines reveal
            const lines = headingRef.current?.querySelectorAll(".contact-line");
            if (lines && lines.length > 0) {
                gsap.fromTo(
                    lines,
                    { y: isLowPerformance ? 0 : "100%", opacity: isLowPerformance ? 0 : 1 },
                    {
                        y: "0%",
                        opacity: 1,
                        duration: isLowPerformance ? 0.5 : 1,
                        ease: "power4.out",
                        stagger: 0.12,
                        scrollTrigger: { trigger: headingRef.current, start: "top 80%" },
                    }
                );
            }

            // Button reveal
            gsap.fromTo(
                btnRef.current,
                { scale: isLowPerformance ? 0.9 : 0, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.8,
                    ease: "back.out(1.5)",
                    scrollTrigger: { trigger: btnRef.current, start: "top 85%" },
                }
            );

            // Magnetic button effect — skip in low-power
            if (isLowPerformance) return;

            const btn = btnRef.current;
            if (!btn) return;

            const handleMouseMove = (e: MouseEvent) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: "power2.out" });
            };
            const handleMouseLeave = () => {
                gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
            };

            btn.addEventListener("mousemove", handleMouseMove);
            btn.addEventListener("mouseleave", handleMouseLeave);

            return () => {
                btn.removeEventListener("mousemove", handleMouseMove);
                btn.removeEventListener("mouseleave", handleMouseLeave);
            };
        }, sectionRef);

        return () => ctx.revert();
    }, [isLowPerformance]);

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="w-full px-6 md:px-24 py-48 md:py-64 relative text-center overflow-hidden"
        >
            {/* Background accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-[#C5FB45]/3 blur-[120px] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
                {/* Visual Label */}
                <span className="text-xs md:text-sm uppercase tracking-[0.4em] text-[#666] mb-20 md:mb-24 block">
                    Get in Touch
                </span>

                {/* Main Heading */}
                <div ref={headingRef} className="mb-24 md:mb-32">
                    <div className="overflow-hidden">
                        <h2 className="contact-line text-5xl md:text-7xl lg:text-[7vw] font-serif font-bold leading-[1.1] text-[#E8E4DF]">
                            Let&apos;s create
                        </h2>
                    </div>
                    <div className="overflow-hidden">
                        <h2 className="contact-line text-5xl md:text-7xl lg:text-[7vw] font-serif font-bold leading-[1.1] text-[#E8E4DF]">
                            something{" "}
                            <span className="italic text-[#C5FB45]">extraordinary</span>
                        </h2>
                    </div>
                </div>

                {/* Big Magnetic Button */}
                <a
                    ref={btnRef}
                    href="mailto:hello@example.com"
                    className="flex items-center justify-center w-48 h-48 md:w-64 md:h-64 rounded-full bg-[#C5FB45] text-[#0F0F0F] font-bold text-sm md:text-lg uppercase tracking-[0.2em] hover:scale-110 transition-transform duration-300 opacity-0 mb-20"
                    data-cursor-hover
                >
                    Say Hello
                </a>

                {/* Email visual display */}
                <a
                    href="mailto:hello@example.com"
                    className="text-[#666] hover:text-white transition-colors duration-300 text-sm md:text-base tracking-[0.1em] mt-12 md:mt-16 border-b border-transparent hover:border-[#C5FB45]"
                >
                    hello@example.com
                </a>
            </div>
        </section>
    );
}
