"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface Project {
    id: number;
    title: string;
    category: string;
    color: string;
}

const projects: Project[] = [
    { id: 1, title: "Lumina Interface", category: "UI/UX Design", color: "bg-emerald-800" },
    { id: 2, title: "Orbital Studio", category: "Brand Identity", color: "bg-stone-600" },
    { id: 3, title: "Canvas Pro", category: "Web Development", color: "bg-indigo-900" },
    { id: 4, title: "Nexus App", category: "Mobile Design", color: "bg-slate-800" },
];

export function SelectedWorks() {
    return (
        <section className="py-24 px-6 md:px-12 bg-background" id="work">
            <div className="flex justify-between items-end mb-16">
                <h2 className="text-4xl md:text-6xl font-serif font-bold">Selected Works</h2>
                <Link href="/work" className="hidden md:flex items-center gap-2 text-lg hover:text-secondary transition-colors group">
                    View All <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-y-16">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        className="group cursor-pointer"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                        <div className={`aspect-[4/3] w-full ${project.color} rounded-lg overflow-hidden relative mb-6`}>
                            {/* Placeholder for Project Image - Using Gradient/Color for now */}
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="px-6 py-3 bg-white/90 text-black rounded-full font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">View Project</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-2xl font-medium mb-1 group-hover:text-secondary transition-colors">{project.title}</h3>
                                <p className="text-muted-foreground">{project.category}</p>
                            </div>
                            <ArrowUpRight className="w-6 h-6 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-secondary" />
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-12 md:hidden flex justify-center">
                <Link href="/work" className="flex items-center gap-2 text-lg font-medium">
                    View All Projects <ArrowUpRight />
                </Link>
            </div>
        </section>
    );
}
