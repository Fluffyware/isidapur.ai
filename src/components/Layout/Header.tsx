"use client";

import Link from "next/link";
import { Utensils } from "lucide-react";

export default function Header() {
    return (
        <header className="w-full py-6 px-4 flex justify-between items-center border-b border-brand-black/5">
            <Link href="/" className="flex items-center gap-2 group">
                <div className="bg-brand-orange/10 p-2 rounded-lg group-hover:bg-brand-orange/20 transition-colors">
                    <Utensils className="w-6 h-6 text-brand-orange" />
                </div>
                <div className="flex flex-col">
                    <span className="text-2xl font-serif font-bold text-brand-black leading-none">
                        Isidapur.ai
                    </span>
                    <span className="text-[10px] text-brand-black/40 font-medium tracking-widest uppercase">
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
