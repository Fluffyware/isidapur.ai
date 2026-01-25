"use client";

import { X, Clock, ChefHat, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface Recipe {
    title: string;
    match_score: number;
    missing: string[];
    cook_time: number;
    tags: string[];
    steps: string[];
}

interface RecipeModalProps {
    recipe: Recipe | null;
    onClose: () => void;
}

export default function RecipeModal({ recipe, onClose }: RecipeModalProps) {
    useEffect(() => {
        if (recipe) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [recipe]);

    if (!recipe) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
                className="absolute inset-0 bg-brand-black/40 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            />

            <div className="relative w-full max-w-2xl bg-brand-white rounded-[20px] shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300 max-h-[90vh] flex flex-col">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full bg-brand-black/5 hover:bg-brand-black/10 transition-colors z-10"
                >
                    <X className="w-5 h-5 text-brand-black/60" />
                </button>

                <div className="overflow-y-auto p-6 sm:p-8">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex flex-wrap gap-2">
                                {recipe.tags.map((tag, i) => (
                                    <span key={i} className="px-2 py-0.5 bg-brand-yellow/20 text-brand-yellow text-[10px] font-bold uppercase tracking-wider rounded">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-black">
                                {recipe.title}
                            </h2>
                            <div className="flex items-center gap-4 text-sm text-brand-black/50 font-medium">
                                <div className="flex items-center gap-1.5">
                                    <Clock className="w-4 h-4" />
                                    {recipe.cook_time} menit
                                </div>
                                <div className="flex items-center gap-1.5 text-brand-green">
                                    <ChefHat className="w-4 h-4" />
                                    {Math.round(recipe.match_score * 100)}% Cocok
                                </div>
                            </div>
                        </div>

                        <hr className="border-brand-black/5" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-brand-black">
                                    <div className="bg-brand-green/10 p-1.5 rounded-lg">
                                        <Utensils className="w-4 h-4 text-brand-green" />
                                    </div>
                                    <h3 className="font-serif font-bold text-lg">Bahan utama</h3>
                                </div>
                                <ul className="space-y-2">
                                    {/* Note: In real app, we might want a 'full_ingredients' list. For now using title or steps context if available. */}
                                    {/* Since PRD says 'Bahan utama' and 'Langkah singkat', I'll assume steps contain the logic. */}
                                    <li className="text-sm text-brand-black/60 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-brand-green/40" />
                                        Bahan-bahan yang kamu masukkan
                                    </li>
                                    {recipe.missing.map((item, i) => (
                                        <li key={i} className="text-sm text-brand-red/60 flex items-center gap-2 italic">
                                            <div className="w-1.5 h-1.5 rounded-full bg-brand-red/40" />
                                            {item} (Kurang)
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-brand-black">
                                    <div className="bg-brand-orange/10 p-1.5 rounded-lg">
                                        <BookOpen className="w-4 h-4 text-brand-orange" />
                                    </div>
                                    <h3 className="font-serif font-bold text-lg">Langkah masak</h3>
                                </div>
                                <div className="space-y-4">
                                    {recipe.steps.map((step, i) => (
                                        <div key={i} className="flex gap-3">
                                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-black/5 text-brand-black/40 text-xs font-bold flex items-center justify-center">
                                                {i + 1}
                                            </span>
                                            <p className="text-sm text-brand-black/70 leading-relaxed">
                                                {step}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="bg-brand-cream p-4 rounded-xl border border-brand-black/5">
                            <p className="text-xs text-brand-black/50 italic text-center">
                                “Masak itu aktivitas manusia, bukan teknis. Selamat mencoba!”
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Reuse Icon from Header to avoid undefined
import { Utensils } from "lucide-react";
