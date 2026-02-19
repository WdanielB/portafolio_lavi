"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
    const preloaderRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLSpanElement>(null);
    const nameRef = useRef<HTMLDivElement>(null);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                onComplete();
            },
        });

        // Counter animation
        const counter = { val: 0 };
        tl.to(counter, {
            val: 100,
            duration: 2.5,
            ease: "power2.inOut",
            onUpdate: () => {
                setCount(Math.floor(counter.val));
            },
        });

        // Name entry
        tl.fromTo(
            nameRef.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
            0.3
        );

        // Hide preloader
        tl.to(preloaderRef.current, {
            clipPath: "inset(0 0 100% 0)",
            duration: 1,
            ease: "power4.inOut",
            delay: 0.3,
        });

        return () => {
            tl.kill();
        };
    }, [onComplete]);

    return (
        <div
            ref={preloaderRef}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0F0F0F]"
            style={{ clipPath: "inset(0 0 0% 0)" }}
        >
            <div ref={nameRef} className="flex flex-col items-center gap-4 opacity-0">
                <span className="text-sm uppercase tracking-[0.3em] text-[#666]">
                    Portfolio
                </span>
            </div>

            <div className="absolute bottom-12 right-12 flex items-end">
                <span
                    ref={counterRef}
                    className="text-[8rem] md:text-[12rem] font-serif font-bold leading-none text-[#E8E4DF]"
                >
                    {count}
                </span>
                <span className="text-2xl md:text-4xl text-[#666] mb-6 ml-1">%</span>
            </div>

            {/* Decorative line */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#333]">
                <div
                    className="h-full bg-[#C5FB45] transition-all duration-100"
                    style={{ width: `${count}%` }}
                />
            </div>
        </div>
    );
}
