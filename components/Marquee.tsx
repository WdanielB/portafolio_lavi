"use client";

export default function Marquee() {
    const items = [
        "Desarrollo Web",
        "•",
        "Diseño UI/UX",
        "•",
        "E-Commerce",
        "•",
        "Apps Web",
        "•",
        "Branding",
        "•",
        "Desarrollo Web",
        "•",
        "Diseño UI/UX",
        "•",
        "E-Commerce",
        "•",
        "Apps Web",
        "•",
        "Branding",
        "•",
    ];

    return (
        <div className="py-16 md:py-20 border-y border-[#222] overflow-hidden">
            <div className="marquee-track">
                {items.concat(items).map((item, i) => (
                    <span
                        key={i}
                        className={`text-4xl md:text-6xl font-serif whitespace-nowrap ${item === "•"
                            ? "text-[#C5FB45] mx-6 md:mx-8"
                            : "text-[#E8E4DF]/20 hover:text-[#E8E4DF] transition-colors duration-500"
                            }`}
                    >
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}
