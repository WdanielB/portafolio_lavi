"use client";

export default function Marquee() {
    const items = [
        "Web Design",
        "•",
        "Creative Development",
        "•",
        "Brand Identity",
        "•",
        "Motion Design",
        "•",
        "UI/UX",
        "•",
        "Web Design",
        "•",
        "Creative Development",
        "•",
        "Brand Identity",
        "•",
        "Motion Design",
        "•",
        "UI/UX",
        "•",
    ];

    return (
        <div className="py-12 border-y border-[#222] overflow-hidden">
            <div className="marquee-track">
                {items.concat(items).map((item, i) => (
                    <span
                        key={i}
                        className={`text-3xl md:text-5xl font-serif whitespace-nowrap ${item === "•"
                                ? "text-[#C5FB45] mx-4"
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
