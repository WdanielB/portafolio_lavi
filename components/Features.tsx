"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePerformance } from "@/lib/usePerformanceStore";

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
    const { isLowPerformance } = usePerformance();
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                headingRef.current,
                { y: 60, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
                    scrollTrigger: { trigger: headingRef.current, start: "top 80%" }
                }
            );

            gsap.fromTo(
                ".feature-card",
                { y: 100, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, ease: "power4.out", stagger: 0.15,
                    scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, [isLowPerformance]);

    return (
        <section ref={sectionRef} id="vision" className="py-40 md:py-64 relative overflow-hidden bg-[#0D0D12]">
            <div className="w-[90%] md:w-[85%] lg:w-[80%] max-w-6xl mx-auto flex flex-col relative z-10">

                <div className="mb-24 md:mb-40" ref={headingRef}>
                    <span className="text-[10px] uppercase font-mono tracking-[0.4em] text-[#FAF8F5]/40 mb-8 block">
                        Functional Artifacts
                    </span>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-sans font-bold tracking-[-0.03em] leading-tight text-[#FAF8F5] max-w-4xl">
                        Nuestras tres propuestas de valor, <br className="hidden md:block" />
                        <span className="font-serif italic text-[#C9A84C] font-normal">diseñadas como instrumentos.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                    {/* Card 1: Diagnostic Shuffler */}
                    <div className="feature-card h-[500px] rounded-[2rem] bg-[#111116] border border-[#2A2A35]/30 p-10 flex flex-col justify-between relative overflow-hidden group">
                        <div>
                            <span className="text-[10px] font-mono tracking-[0.2em] text-[#C9A84C] mb-4 block">01 / SHUFFLER</span>
                            <h3 className="text-2xl font-sans font-bold text-[#FAF8F5] mb-2">Arquitectura Escalable</h3>
                            <p className="text-sm text-[#FAF8F5]/50">Estructuras construidas para crecer sin fricción.</p>
                        </div>
                        <DiagnosticShuffler isLow={isLowPerformance} />
                    </div>

                    {/* Card 2: Telemetry Typewriter */}
                    <div className="feature-card h-[500px] rounded-[2rem] bg-[#111116] border border-[#2A2A35]/30 p-10 flex flex-col justify-between relative overflow-hidden group">
                        <div>
                            <span className="text-[10px] font-mono tracking-[0.2em] text-[#C9A84C] mb-4 block">02 / TELEMETRY</span>
                            <h3 className="text-2xl font-sans font-bold text-[#FAF8F5] mb-2">Micro-Interacciones</h3>
                            <p className="text-sm text-[#FAF8F5]/50">Detalles de movimiento que elevan la percepción de valor.</p>
                        </div>
                        <TelemetryTypewriter />
                    </div>

                    {/* Card 3: Cursor Protocol */}
                    <div className="feature-card h-[500px] rounded-[2rem] bg-[#111116] border border-[#2A2A35]/30 p-10 flex flex-col justify-between relative overflow-hidden group">
                        <div>
                            <span className="text-[10px] font-mono tracking-[0.2em] text-[#C9A84C] mb-4 block">03 / PROTOCOL</span>
                            <h3 className="text-2xl font-sans font-bold text-[#FAF8F5] mb-2">Pixel Perfect UI</h3>
                            <p className="text-sm text-[#FAF8F5]/50">Precisión absoluta en cada componente de la interfaz.</p>
                        </div>
                        <CursorScheduler isLow={isLowPerformance} />
                    </div>
                </div>

            </div>
        </section>
    );
}

// --- Micro-UI Components ---

function DiagnosticShuffler({ isLow }: { isLow: boolean }) {
    const cardsArray = [
        { id: 1, label: "SYS_CORE_READY", desc: "Optimización de base de datos" },
        { id: 2, label: "NETWORK_STABLE", desc: "Balanceo de carga global" },
        { id: 3, label: "MEM_STATE_CLEAR", desc: "Caché distribuida" }
    ];

    const [cards, setCards] = useState(cardsArray);

    useEffect(() => {
        if (isLow) return;
        const interval = setInterval(() => {
            setCards(prev => {
                const newArr = [...prev];
                const last = newArr.pop();
                if (last) newArr.unshift(last);
                return newArr;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, [isLow]);

    return (
        <div className="relative h-48 w-full perspective-[1000px] mt-10">
            {cards.map((c, i) => {
                const isTop = i === 2;
                return (
                    <div
                        key={c.id}
                        className="absolute w-full h-[100px] bg-[#0D0D12] border border-[#2A2A35] rounded-xl p-4 flex flex-col justify-center transition-all duration-1000"
                        style={{
                            top: `${i * 20}px`,
                            transform: `scale(${isTop ? 1 : 0.9 - (2 - i) * 0.05}) translateZ(${isTop ? '0px' : '-50px'})`,
                            opacity: isTop ? 1 : 0.4 + (i * 0.2),
                            zIndex: i,
                            transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                        }}
                    >
                        <div className="text-[10px] font-mono text-[#C9A84C] mb-1">{c.label}</div>
                        <div className="text-xs text-[#FAF8F5]/70">{c.desc}</div>
                    </div>
                );
            })}
        </div>
    );
}

function TelemetryTypewriter() {
    const phrases = [
        "Iniciando secuencia de render...",
        "Calculando tensores de bezier...",
        "Calculando opacidad: 0.05...",
        "Micro-interacción montada."
    ];
    const [text, setText] = useState("");
    const [phraseIdx, setPhraseIdx] = useState(0);
    const [charIdx, setCharIdx] = useState(0);

    useEffect(() => {
        const currentPhrase = phrases[phraseIdx];

        if (charIdx < currentPhrase.length) {
            const timeout = setTimeout(() => {
                setText(prev => prev + currentPhrase[charIdx]);
                setCharIdx(prev => prev + 1);
            }, 60 + Math.random() * 40); // slightly random typing speed
            return () => clearTimeout(timeout);
        } else {
            const timeout = setTimeout(() => {
                setText("");
                setCharIdx(0);
                setPhraseIdx((prev) => (prev + 1) % phrases.length);
            }, 2500);
            return () => clearTimeout(timeout);
        }
    }, [charIdx, phraseIdx]);

    return (
        <div className="mt-10 h-48 bg-[#0D0D12] border border-[#2A2A35] rounded-xl p-6 relative">
            <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[9px] font-mono tracking-widest text-[#FAF8F5]/50 uppercase">Live Feed</span>
            </div>
            <div className="font-mono text-xs leading-relaxed text-[#FAF8F5]/80">
                <span className="text-[#C9A84C]">~ %</span> {text}
                <span className="w-[6px] h-[12px] inline-block bg-[#C9A84C] ml-1 animate-pulse align-middle" />
            </div>
            {/* Grid background effect */}
            <div className="absolute inset-0 z-[-1] opacity-10" style={{ backgroundImage: "radial-gradient(#FAF8F5 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
        </div>
    );
}

function CursorScheduler({ isLow }: { isLow: boolean }) {
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const cursorRef = useRef<HTMLDivElement>(null);
    const [activeIdx, setActiveIdx] = useState(3);

    useEffect(() => {
        if (isLow) return;
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

            // Move to WED
            tl.to(cursorRef.current, { x: 120, y: 50, duration: 1, ease: "power2.inOut" })
                // Click
                .to(cursorRef.current, { scale: 0.8, duration: 0.1 })
                .call(() => setActiveIdx(3))
                .to(cursorRef.current, { scale: 1, duration: 0.1 })
                // Move to Save button
                .to(cursorRef.current, { x: 200, y: 130, duration: 1, ease: "power2.inOut", delay: 0.5 })
                // Click save
                .to(cursorRef.current, { scale: 0.8, duration: 0.1 })
                .to(cursorRef.current, { scale: 1, duration: 0.1 })
                // Fade out / reset
                .to(cursorRef.current, { opacity: 0, duration: 0.3 })
                .set(cursorRef.current, { x: 0, y: 150 })
                .call(() => setActiveIdx(-1))
                .to(cursorRef.current, { opacity: 1, duration: 0.3 });

        });
        return () => ctx.revert();
    }, [isLow]);

    return (
        <div className="mt-10 h-48 bg-[#0D0D12] border border-[#2A2A35] rounded-xl p-6 relative overflow-hidden">
            <div className="flex justify-between mt-4">
                {days.map((d, i) => (
                    <div
                        key={i}
                        className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-mono transition-colors duration-300 ${activeIdx === i ? 'bg-[#C9A84C] text-[#0D0D12]' : 'bg-[#1A1A24] text-[#FAF8F5]/40'}`}
                    >
                        {d}
                    </div>
                ))}
            </div>

            <div className="absolute bottom-6 right-6 px-4 py-1.5 bg-[#1A1A24] rounded-md border border-[#2A2A35] text-[9px] font-mono text-[#FAF8F5]/60 hover:bg-[#2A2A35] hover:text-[#FAF8F5] transition-colors">
                SAVE STATE
            </div>

            {/* Simulated Cursor */}
            <div
                ref={cursorRef}
                className="absolute top-0 left-0 w-4 h-4 z-10 pointer-events-none drop-shadow-lg"
                style={{ transform: "translate(0px, 150px)" }}
            >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4L10 20L13.5 13.5L20 10L4 4Z" fill="#FAF8F5" stroke="#0D0D12" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
            </div>
        </div>
    );
}
