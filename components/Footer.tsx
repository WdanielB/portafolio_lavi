"use client";

import { useEffect, useRef, useState } from "react";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString('es-PE', { hour12: false }) + " PET");
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <footer className="relative bg-[#050505] pt-24 pb-12 rounded-t-[4rem] px-8 md:px-12 w-full mt-[-2rem] z-20 shadow-[0_-20px_40px_rgba(0,0,0,0.5)]">
            <div className="w-[90%] lg:w-[80%] max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">

                {/* Brand & Status */}
                <div className="flex flex-col gap-8">
                    <h2 className="text-4xl md:text-5xl font-sans font-bold tracking-tight text-[#FAF8F5]">LAVI Agency</h2>

                    <div className="flex items-center gap-4 bg-[#111116] border border-[#2A2A35] px-4 py-2 rounded-md w-max">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#FAF8F5]/80">
                            SYSTEM OPERATIONAL
                        </span>
                    </div>
                </div>

                {/* Nav & Info Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-12 md:gap-24 text-sm w-full md:w-auto">
                    <div className="flex flex-col gap-4">
                        <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#C9A84C] mb-2">Socials</span>
                        <a href="#" className="font-sans text-[#FAF8F5]/60 hover:text-[#FAF8F5] transition-colors">Instagram</a>
                        <a href="#" className="font-sans text-[#FAF8F5]/60 hover:text-[#FAF8F5] transition-colors">LinkedIn</a>
                        <a href="#" className="font-sans text-[#FAF8F5]/60 hover:text-[#FAF8F5] transition-colors">X (Twitter)</a>
                    </div>

                    <div className="flex flex-col gap-4">
                        <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#C9A84C] mb-2">Directo</span>
                        <a href="mailto:hello@laviagency.com" className="font-sans text-[#FAF8F5]/60 hover:text-[#FAF8F5] transition-colors">hello@laviagency.com</a>
                        <span className="font-sans text-[#FAF8F5]/60 mt-auto">{time}</span>
                    </div>
                </div>

            </div>

            {/* Huge Footer Text & Copyright */}
            <div className="w-[90%] lg:w-[80%] max-w-6xl mx-auto mt-24 pt-8 border-t border-[#2A2A35]/30 flex flex-col md:flex-row justify-between items-center gap-4">
                <span className="text-[9px] uppercase font-mono tracking-[0.2em] text-[#FAF8F5]/40">
                    © {currentYear} LAVI AGENCY. Todos los derechos reservados.
                </span>
                <span className="text-[9px] uppercase font-mono tracking-[0.2em] text-[#FAF8F5]/40">
                    Diseñado con precisión absoluta.
                </span>
            </div>
        </footer>
    );
}
