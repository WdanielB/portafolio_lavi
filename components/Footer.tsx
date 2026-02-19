export default function Footer() {
    return (
        <footer className="px-8 md:px-16 py-8 border-t border-[#222]">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-xs text-[#666] tracking-[0.1em]">
                    &copy; {new Date().getFullYear()} LAVI. All rights reserved.
                </p>

                <div className="flex gap-8">
                    {["Twitter", "LinkedIn", "GitHub", "Dribbble"].map((item) => (
                        <a
                            key={item}
                            href="#"
                            className="text-xs uppercase tracking-[0.15em] text-[#666] hover:text-[#C5FB45] transition-colors duration-300"
                        >
                            {item}
                        </a>
                    ))}
                </div>

                <p className="text-xs text-[#666] tracking-[0.1em]">
                    Designed & Developed with passion
                </p>
            </div>
        </footer>
    );
}
