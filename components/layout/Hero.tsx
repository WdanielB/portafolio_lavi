"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export function Hero() {
    return (
        <section className="min-h-[85vh] flex flex-col justify-center px-6 md:px-12 relative overflow-hidden">
            <div className="max-w-5xl z-10">
                <motion.h1
                    className="text-5xl md:text-8xl font-serif font-bold leading-[1.1] mb-8"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    Crafting <span className="text-secondary italic">Digital</span> <br />
                    Experiences that <br />
                    Matter.
                </motion.h1>

                <motion.p
                    className="text-lg md:text-2xl text-muted-foreground max-w-2xl mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    I'm a creative developer focused on building brands, websites, and apps with a focus on motion and typography.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex gap-4"
                >
                    <button className="px-8 py-4 bg-primary text-primary-foreground text-lg font-medium rounded-full hover:bg-secondary hover:text-secondary-foreground transition-colors duration-300">
                        View Work
                    </button>
                    <button className="px-8 py-4 border border-primary text-primary text-lg font-medium rounded-full hover:bg-primary/5 transition-colors duration-300">
                        Contact Me
                    </button>
                </motion.div>
            </div>

            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
                <ArrowDown className="w-8 h-8" />
            </motion.div>

            {/* Background Graphic Element - Yucca Style */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl -z-0 translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl -z-0 -translate-x-1/3 translate-y-1/3" />
        </section>
    );
}
