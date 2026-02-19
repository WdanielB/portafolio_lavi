"use client";

import { motion } from "framer-motion";

export function About() {
    return (
        <section className="py-24 px-6 md:px-12 bg-secondary/10" id="about">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                <div className="md:col-span-4">
                    <motion.h2
                        className="text-4xl md:text-5xl font-serif font-bold mb-6"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        About Me
                    </motion.h2>
                </div>
                <div className="md:col-span-8">
                    <motion.p
                        className="text-xl md:text-3xl leading-relaxed font-light"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        I am a multidisciplinary designer and developer with a passion for creating <span className="text-secondary font-medium">immersive digital experiences</span>.
                        With a background in both extensive design principles and modern engineering, I bridge the gap between aesthetics and functionality.
                    </motion.p>

                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        {[
                            { number: "5+", label: "Years Experience" },
                            { number: "50+", label: "Projects Completed" },
                            { number: "10+", label: "Awards Won" },
                            { number: "100%", label: "Client Satisfaction" },
                        ].map((stat, index) => (
                            <div key={index}>
                                <div className="text-4xl font-serif font-bold mb-2">{stat.number}</div>
                                <div className="text-sm text-muted-foreground uppercase tracking-wide">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
