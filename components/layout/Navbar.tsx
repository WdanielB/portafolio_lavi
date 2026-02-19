"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
    { name: "Work", path: "/work" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
];

export function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 bg-background/80 backdrop-blur-md border-b border-border/50">
            <Link href="/" className="text-xl font-serif font-bold tracking-tight">
                PORTFOLIO
            </Link>

            <div className="hidden md:flex items-center gap-8">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        href={item.path}
                        className={cn(
                            "text-sm font-medium transition-colors hover:text-primary relative group",
                            pathname === item.path ? "text-primary" : "text-muted-foreground"
                        )}
                    >
                        {item.name}
                        {pathname === item.path && (
                            <motion.div
                                layoutId="navbar-indicator"
                                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            />
                        )}
                        <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                    </Link>
                ))}
            </div>

            <div className="md:hidden">
                {/* Mobile Menu Trigger Placeholder */}
                <button className="text-sm font-medium">Menu</button>
            </div>
        </nav>
    );
}
