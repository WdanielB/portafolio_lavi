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
            className="w-full py-56 md:py-72 relative text-center overflow-hidden"
        >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-[#C5FB45]/3 blur-[120px] pointer-events-none" />

            <div className="w-[90%] md:w-[85%] lg:w-[80%] max-w-6xl mx-auto relative z-10 flex flex-col items-center">
                <span className="text-xs md:text-sm uppercase tracking-[0.4em] text-[#666] mb-24 block">
                    Contacto
                </span>

                <div ref={headingRef} className="mb-32 md:mb-40">
                    <div className="overflow-hidden">
                        <h2 className="contact-line text-6xl md:text-8xl lg:text-[9vw] font-serif font-bold leading-[1.0] text-[#E8E4DF]">
                            Hablemos de tu
                        </h2>
                    </div>
                    <div className="overflow-hidden">
                        <h2 className="contact-line text-6xl md:text-8xl lg:text-[9vw] font-serif font-bold leading-[1.0] text-[#E8E4DF]">
                            <span className="italic text-[#C5FB45]">próximo proyecto.</span>
                        </h2>
                    </div>
                </div>

                <a
                    ref={btnRef}
                    href="mailto:hello@laviagency.com"
                    className="flex items-center justify-center w-56 h-56 md:w-72 md:h-72 rounded-full bg-[#C5FB45] text-[#0F0F0F] font-bold text-sm md:text-xl uppercase tracking-[0.2em] hover:scale-110 transition-transform duration-300 opacity-0 mb-24"
                    data-cursor-hover
                >
                    Escríbenos
                </a>

                <a
                    href="mailto:hello@laviagency.com"
                    className="text-[#555] hover:text-[#C5FB45] transition-colors duration-300 text-sm md:text-lg tracking-[0.15em] border-b border-transparent hover:border-[#C5FB45] pb-1"
                >
                    hello@laviagency.com
                </a>
            </div>
        </section>
    );
}
