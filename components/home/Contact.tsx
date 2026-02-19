"use client";

import { motion } from "framer-motion";

export function Contact() {
    return (
        <section className="py-32 px-6 md:px-12 bg-primary text-primary-foreground text-center" id="contact">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-5xl md:text-8xl font-serif font-bold mb-8">Let's work together</h2>
                <p className="text-xl md:text-2xl text-primary-foreground/80 mb-12 max-w-2xl mx-auto">
                    Have a project in mind? Let's create something extraordinary.
                </p>
                <a
                    href="mailto:hello@example.com"
                    className="inline-block px-10 py-5 bg-secondary text-secondary-foreground text-xl font-medium rounded-full hover:bg-white transition-colors duration-300"
                >
                    Get in Touch
                </a>
            </motion.div>
        </section>
    );
}
