"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePerformance } from "@/lib/usePerformanceStore";

gsap.registerPlugin(ScrollTrigger);

export default function Protocol() {
    const { isLowPerformance } = usePerformance();
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (isLowPerformance) return;

        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray(".protocol-card") as HTMLElement[];

            cards.forEach((card, i) => {
                if (i === cards.length - 1) return; // Skip last card

                ScrollTrigger.create({
                    trigger: card,
                    start: "top top",
                    endTrigger: ".protocol-container",
                    end: "bottom bottom",
                    pin: true,
                    pinSpacing: false,
                });

                gsap.to(card, {
                    scale: 0.9,
                    opacity: 0.5,
                    filter: "blur(10px)",
                    ease: "none",
                    scrollTrigger: {
                        trigger: cards[i + 1],
                        start: "top bottom",
                        end: "top top",
                        scrub: true,
                    }
                });
            });

        }, containerRef);

        return () => ctx.revert();
    }, [isLowPerformance]);

    return (
        <section ref={containerRef} className="protocol-container relative w-full bg-[#0D0D12]">

            {/* Card 1 */}
            <div className="protocol-card h-screen w-full flex items-center justify-center sticky top-0 bg-[#0D0D12] border-t border-[#2A2A35]">
                <div className="w-[90%] lg:w-[80%] max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1 relative h-64 md:h-[400px] rounded-3xl bg-[#111116] border border-[#2A2A35]/50 flex items-center justify-center overflow-hidden">
                        {/* SVG Animation: Rotating Double Helix */}
                        <svg className="w-48 h-48 animate-spin-slow opacity-60" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="100" cy="100" r="80" stroke="#C9A84C" strokeWidth="2" strokeDasharray="10 20" />
                            <circle cx="100" cy="100" r="60" stroke="#FAF8F5" strokeWidth="1" strokeDasharray="5 15" strokeOpacity="0.4" />
                            <path d="M100 20 L100 180 M20 100 L180 100" stroke="#C9A84C" strokeOpacity="0.2" />
                        </svg>
                    </div>
                    <div className="order-1 md:order-2">
                        <span className="text-[12px] font-mono tracking-[0.3em] text-[#C9A84C] block mb-6 px-4 py-1.5 border border-[#C9A84C]/30 rounded-full w-max">PHASE 01</span>
                        <h2 className="text-4xl md:text-6xl font-sans font-bold text-[#FAF8F5] mb-6">Auditoría <br /><span className="font-serif italic text-[#FAF8F5]/60">Estructural.</span></h2>
                        <p className="text-[#FAF8F5]/50 text-base max-w-md leading-relaxed">
                            Analizamos la arquitectura base de tu sistema actual para identificar cuellos de botella y oportunidades de optimización a nivel de código y diseño.
                        </p>
                    </div>
                </div>
            </div>

            {/* Card 2 */}
            <div className="protocol-card h-screen w-full flex items-center justify-center sticky top-0 bg-[#0D0D12] border-t border-[#2A2A35] shadow-[0_-20px_40px_rgba(0,0,0,0.8)]">
                <div className="w-[90%] lg:w-[80%] max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1 relative h-64 md:h-[400px] rounded-3xl bg-[#111116] border border-[#2A2A35]/50 flex items-center justify-center overflow-hidden">
                        {/* SVG Animation: Scanning Laser Grid */}
                        <div className="w-full h-full relative" style={{ backgroundImage: "linear-gradient(#2A2A35 1px, transparent 1px), linear-gradient(90deg, #2A2A35 1px, transparent 1px)", backgroundSize: "40px 40px", opacity: 0.3 }}>
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-[#C9A84C] shadow-[0_0_20px_#C9A84C] animate-scan" />
                        </div>
                    </div>
                    <div className="order-1 md:order-2">
                        <span className="text-[12px] font-mono tracking-[0.3em] text-[#C9A84C] block mb-6 px-4 py-1.5 border border-[#C9A84C]/30 rounded-full w-max">PHASE 02</span>
                        <h2 className="text-4xl md:text-6xl font-sans font-bold text-[#FAF8F5] mb-6">Síntesis de <br /><span className="font-serif italic text-[#FAF8F5]/60">Interacciones.</span></h2>
                        <p className="text-[#FAF8F5]/50 text-base max-w-md leading-relaxed">
                            Diseñamos la lógica de movimiento y los flujos de usuario, creando un wireframe cinético que define el 'feel' exacto del producto final.
                        </p>
                    </div>
                </div>
            </div>

            {/* Card 3 */}
            <div className="protocol-card h-screen w-full flex items-center justify-center sticky top-0 bg-[#0D0D12] border-t border-[#2A2A35] shadow-[0_-20px_40px_rgba(0,0,0,0.8)]">
                <div className="w-[90%] lg:w-[80%] max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1 relative h-64 md:h-[400px] rounded-3xl bg-[#111116] border border-[#2A2A35]/50 flex items-center justify-center overflow-hidden">
                        {/* SVG Animation: Pulsing Waveform */}
                        <svg className="w-full h-32" viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg">
                            <path d="M 0 50 Q 50 10, 100 50 T 200 50 T 300 50 T 400 50" fill="transparent" stroke="#FAF8F5" strokeWidth="2" strokeOpacity="0.1" />
                            <path className="animate-dash" d="M 0 50 Q 50 10, 100 50 T 200 50 T 300 50 T 400 50" fill="transparent" stroke="#C9A84C" strokeWidth="3" strokeDasharray="100 300" />
                        </svg>
                    </div>
                    <div className="order-1 md:order-2">
                        <span className="text-[12px] font-mono tracking-[0.3em] text-[#C9A84C] block mb-6 px-4 py-1.5 border border-[#C9A84C]/30 rounded-full w-max">PHASE 03</span>
                        <h2 className="text-4xl md:text-6xl font-sans font-bold text-[#FAF8F5] mb-6">Desarrollo <br /><span className="font-serif italic text-[#FAF8F5]/60">Táctil.</span></h2>
                        <p className="text-[#FAF8F5]/50 text-base max-w-md leading-relaxed">
                            Implementación técnica pixel perfect. El código cobra vida mediante WebGL, GSAP y React, resultando en un sistema inquebrantable.
                        </p>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes spin-slow {
                    100% { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 20s linear infinite;
                }
                @keyframes scan {
                    0% { top: 0; }
                    50% { top: 100%; }
                    100% { top: 0; }
                }
                .animate-scan {
                    animation: scan 4s ease-in-out infinite;
                }
                @keyframes dash {
                    to { stroke-dashoffset: -400; }
                }
                .animate-dash {
                    animation: dash 3s linear infinite;
                }
            `}</style>
        </section>
    );
}
