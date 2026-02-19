"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const btnRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const lines = headingRef.current?.querySelectorAll(".contact-line");
            if (lines) {
                lines.forEach((line, i) => {
                    gsap.fromTo(
                        line,
                        { y: "100%" },
                        {
                            y: "0%",
                            duration: 1,
                            ease: "power4.out",
                            scrollTrigger: {
                                trigger: headingRef.current,
                                start: "top 80%",
                            },
                            delay: i * 0.12,
                        }
                    );
                });
            }

            // Button
            gsap.fromTo(
                btnRef.current,
                { scale: 0, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.8,
                    ease: "back.out(1.5)",
                    scrollTrigger: {
                        trigger: btnRef.current,
                        start: "top 90%",
                    },
                }
            );

            // Magnetic button effect
            const btn = btnRef.current;
            if (btn) {
                const handleMouseMove = (e: MouseEvent) => {
                    const rect = btn.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    gsap.to(btn, {
                        x: x * 0.3,
                        y: y * 0.3,
                        duration: 0.4,
                        ease: "power2.out",
                    });
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
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="px-8 md:px-16 py-40 relative text-center"
        >
            {/* Background accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#C5FB45]/3 blur-[150px]" />

            <div className="relative z-10">
                <span className="text-sm uppercase tracking-[0.3em] text-[#666] mb-8 block">
                    Get in Touch
                </span>

                <div ref={headingRef} className="mb-16">
                    <div className="overflow-hidden">
                        <h2 className="contact-line text-6xl md:text-[8vw] font-serif font-bold leading-[0.95]">
                            Let&apos;s create
                        </h2>
                    </div>
                    <div className="overflow-hidden">
                        <h2 className="contact-line text-6xl md:text-[8vw] font-serif font-bold leading-[0.95]">
                            something{" "}
                            <span className="italic text-[#C5FB45]">extraordinary</span>
                        </h2>
                    </div>
                </div>

                <a
                    ref={btnRef}
                    href="mailto:hello@example.com"
                    className="inline-flex items-center justify-center w-40 h-40 md:w-52 md:h-52 rounded-full bg-[#C5FB45] text-[#0F0F0F] font-bold text-sm md:text-base uppercase tracking-[0.15em] hover:scale-110 transition-transform duration-300 opacity-0"
                >
                    Say Hello
                </a>

                <p className="text-[#666] text-sm mt-16 tracking-wide">
                    hello@example.com
                </p>
            </div>
        </section>
    );
}
