"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePerformance } from "@/lib/usePerformanceStore";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
    const { isLowPerformance } = usePerformance();
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".tier-card",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    stagger: 0.15,
                    scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, [isLowPerformance]);

    return (
        <section ref={sectionRef} id="servicios" className="py-40 md:py-64 bg-[#0D0D12] border-t border-[#2A2A35]/30">
            <div className="w-[90%] lg:w-[80%] max-w-6xl mx-auto flex flex-col items-center">

                <span className="text-[10px] font-mono tracking-[0.4em] text-[#C9A84C] mb-8 block text-center">
                    Membresía / Tier
                </span>

                <h2 className="text-4xl md:text-6xl font-sans font-bold text-[#FAF8F5] mb-20 text-center">
                    Modalidades de <span className="font-serif italic font-normal text-[#C9A84C]">Suscripción.</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">

                    {/* Tier 1 */}
                    <div className="tier-card rounded-[2rem] bg-[#111116] border border-[#2A2A35] p-10 flex flex-col">
                        <h3 className="text-xl font-sans font-bold text-[#FAF8F5] mb-2">Essential</h3>
                        <p className="text-sm text-[#FAF8F5]/50 mb-8 border-b border-[#2A2A35] pb-8">Desarrollo web fundamental para marcas en crecimiento.</p>
                        <ul className="space-y-4 mb-auto text-sm text-[#FAF8F5]/80">
                            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" /> Landing Page interactiva</li>
                            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" /> Diseño UI / UX Básico</li>
                            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" /> CMS Integrado</li>
                        </ul>
                        <button className="w-full py-4 mt-12 rounded-full border border-[#2A2A35] text-xs font-bold tracking-[0.2em] uppercase text-[#FAF8F5] hover:bg-[#FAF8F5] hover:text-[#0D0D12] transition-colors">
                            Seleccionar
                        </button>
                    </div>

                    {/* Tier 2 (Highlighted) */}
                    <div className="tier-card rounded-[2rem] bg-[#0D0D12] border border-[#C9A84C] p-10 flex flex-col relative transform md:-translate-y-4 shadow-[0_0_40px_rgba(201,168,76,0.1)]">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#C9A84C] text-[#0D0D12] text-[9px] font-bold uppercase tracking-[0.2em] rounded-full">
                            Performance
                        </div>
                        <h3 className="text-xl font-sans font-bold text-[#FAF8F5] mb-2">Performance</h3>
                        <p className="text-sm text-[#FAF8F5]/50 mb-8 border-b border-[#2A2A35] pb-8">Experiencias inmersivas con alto nivel de animaciones.</p>
                        <ul className="space-y-4 mb-auto text-sm text-[#FAF8F5]/80">
                            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" /> Web App o Sitio Corporativo</li>
                            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" /> Animaciones WebGL / GSAP</li>
                            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" /> Micro-interacciones Avanzadas</li>
                            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" /> Integraciones API</li>
                        </ul>
                        <button className="w-full py-4 mt-12 rounded-full bg-[#C9A84C] text-xs font-bold tracking-[0.2em] uppercase text-[#0D0D12] hover:bg-[#b0923f] transition-colors shadow-lg">
                            Seleccionar
                        </button>
                    </div>

                    {/* Tier 3 */}
                    <div className="tier-card rounded-[2rem] bg-[#111116] border border-[#2A2A35] p-10 flex flex-col">
                        <h3 className="text-xl font-sans font-bold text-[#FAF8F5] mb-2">Enterprise</h3>
                        <p className="text-sm text-[#FAF8F5]/50 mb-8 border-b border-[#2A2A35] pb-8">Sistemas dedicados para arquitectura de gran escala.</p>
                        <ul className="space-y-4 mb-auto text-sm text-[#FAF8F5]/80">
                            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" /> Plataformas E-Commerce completas</li>
                            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" /> Arquitectura de Microservicios</li>
                            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" /> Sistemas de Diseño</li>
                        </ul>
                        <button className="w-full py-4 mt-12 rounded-full border border-[#2A2A35] text-xs font-bold tracking-[0.2em] uppercase text-[#FAF8F5] hover:bg-[#FAF8F5] hover:text-[#0D0D12] transition-colors">
                            Seleccionar
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
}
