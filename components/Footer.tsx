"use client";

export default function Footer() {
    const navLinks = ["Work", "About", "Services"];
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full py-12 md:py-20 px-6 flex flex-col items-center justify-center relative z-50">
            {/* Floating Pill Container */}
            <div className="w-full max-w-3xl flex items-center justify-between bg-[#1a1a1a]/90 backdrop-blur-xl border border-[#333] rounded-full p-2 pl-6 pr-2 shadow-2xl">
                {/* Brand / Logo */}
                <span className="font-serif text-lg md:text-xl text-[#E8E4DF] tracking-[0.2em] uppercase">
                    LAVI
                </span>

                {/* Nav Links - Center */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-[10px] uppercase tracking-[0.15em] text-[#999] hover:text-[#C5FB45] transition-colors duration-300"
                        >
                            {item}
                        </a>
                    ))}
                </div>

                {/* CTA Button */}
                <a
                    href="mailto:hello@example.com"
                    className="bg-[#C5FB45] hover:bg-[#b0e03e] text-[#0F0F0F] text-[10px] font-bold uppercase tracking-[0.15em] px-6 py-3 rounded-full transition-all duration-300 hover:scale-105"
                >
                    Let&apos;s Talk
                </a>
            </div>

            {/* Bottom info — subtle copyright & social links */}
            <div className="mt-8 flex flex-col md:flex-row items-center gap-4 text-[10px] text-[#444] tracking-[0.15em] uppercase">
                <p>&copy; {currentYear} LAVI. All rights reserved.</p>
                <span className="hidden md:block w-1 h-1 rounded-full bg-[#333]" />
                <div className="flex gap-4">
                    {["Twitter", "LinkedIn", "Instagram"].map((social) => (
                        <a
                            key={social}
                            href="#"
                            className="hover:text-[#C5FB45] transition-colors duration-300"
                        >
                            {social}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
