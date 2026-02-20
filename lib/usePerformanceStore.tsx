"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";

interface PerformanceContextType {
    isLowPerformance: boolean;
}

const PerformanceContext = createContext<PerformanceContextType>({
    isLowPerformance: false,
});

/**
 * Detects low-power devices using:
 * 1. prefers-reduced-motion media query (user's OS setting)
 * 2. navigator.hardwareConcurrency < 4 (low CPU cores)
 * 3. navigator.deviceMemory < 4 (low RAM — Chrome only)
 * Equivalent to Pinia's isLowPerformance store.
 */
function detectLowPerformance(): boolean {
    if (typeof window === "undefined") return false;

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const lowCPU =
        typeof navigator.hardwareConcurrency !== "undefined" &&
        navigator.hardwareConcurrency < 4;

    const lowRAM =
        "deviceMemory" in navigator &&
        (navigator as Navigator & { deviceMemory: number }).deviceMemory < 4;

    return prefersReducedMotion || lowCPU || lowRAM;
}

export function PerformanceProvider({ children }: { children: ReactNode }) {
    const [isLowPerformance, setIsLowPerformance] = useState(false);

    useEffect(() => {
        setIsLowPerformance(detectLowPerformance());
    }, []);

    return (
        <PerformanceContext.Provider value={{ isLowPerformance }}>
            {children}
        </PerformanceContext.Provider>
    );
}

/** Hook to consume the performance state in any component */
export function usePerformance() {
    return useContext(PerformanceContext);
}
