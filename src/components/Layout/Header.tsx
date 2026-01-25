"use client";

import Link from "next/link";
import { Utensils } from "lucide-react";

export default function Header() {
    return (
        <header className="sticky top-0 z-40 w-full py-4 md:py-6 px-4 flex justify-between items-center bg-brand-cream/80 backdrop-blur-md border-b border-brand-black/5 transition-all duration-300">
            <Link href="/" className="flex items-center gap-2 group">
                <div className="bg-brand-orange/10 p-1.5 md:p-2 rounded-lg group-hover:bg-brand-orange/20 transition-colors">
                    <Utensils className="w-5 h-5 md:w-6 h-6 text-brand-orange" />
                </div>
                <div className="flex flex-col">
                    <span className="text-xl md:text-2xl font-serif font-bold text-brand-black leading-none">
                        Isidapur.ai
                    </span>
                    <span className="text-[8px] md:text-[10px] text-brand-black/40 font-medium tracking-widest uppercase mt-0.5">
                        Retro Kitchen Assistant
                    </span>
                </div>
            </Link>

            <nav>
                {/* Placeholder for future links like 'Favorit' */}
            </nav>
        </header>
    );
}
