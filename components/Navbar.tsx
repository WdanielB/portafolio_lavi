"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Navbar() {
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.fromTo(
            navRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 3.5 }
        );
    }, []);

    const links = [
        { label: "Servicios", href: "#services" },
        { label: "Proyectos", href: "#work" },
        { label: "Nosotros", href: "#about" },
        { label: "Contacto", href: "#contact" },
    ];

    return (
        <nav
            ref={navRef}
            className="fixed top-6 md:top-8 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-5xl opacity-0"
        >
            <div className="flex items-center justify-between bg-[#0a0a0a] border border-[#222] rounded-full px-8 py-4 md:px-10 md:py-5 shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
                {/* Logo */}
                <a
                    href="/"
                    className="text-xl md:text-2xl font-bold tracking-[0.2em] uppercase text-white hover:text-[#C5FB45] transition-colors duration-300"
                >
                    LAVI
                </a>

                {/* Center Links */}
                <div className="hidden md:flex items-center gap-10">
                    {links.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="text-xs uppercase tracking-[0.2em] text-[#999] hover:text-white transition-colors duration-300"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* CTA */}
                <a
                    href="#contact"
                    className="bg-white hover:bg-[#e0e0e0] text-black text-xs font-bold uppercase tracking-[0.2em] px-6 py-3 md:px-8 md:py-3.5 rounded-full transition-transform duration-300 hover:scale-105"
                >
                    Cotizar
                </a>
            </div>
        </nav>
    );
}
