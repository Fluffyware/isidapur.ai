"use client";

import { Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Recipe {
    title: string;
    match_score: number;
    missing: string[];
    cook_time: number;
    tags: string[];
    steps: string[];
}

interface RecipeCardProps {
    recipe: Recipe;
    onClick: () => void;
}

export default function RecipeCard({ recipe, onClick }: RecipeCardProps) {
    return (
        <div className="recipe-card p-5 flex flex-col gap-4 group cursor-pointer" onClick={onClick}>
            <div className="flex justify-between items-start gap-2">
                <h3 className="text-xl font-serif font-bold text-brand-black group-hover:text-brand-green transition-colors">
                    {recipe.title}
                </h3>
                <div className="flex items-center gap-1 text-[10px] font-bold text-brand-green bg-brand-green/10 px-2 py-1 rounded-full whitespace-nowrap">
                    <CheckCircle2 className="w-3 h-3" />
                    {Math.round(recipe.match_score * 100)}% Cocok
                </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-brand-black/50 font-medium">
                <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {recipe.cook_time} menit
                </div>
                <div className="flex flex-wrap gap-1">
                    {recipe.tags.map((tag, i) => (
                        <span key={i} className="px-2 py-0.5 bg-brand-black/5 rounded text-[10px] uppercase tracking-wider">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {recipe.missing.length > 0 && (
                <div className="flex items-start gap-1.5 text-xs text-brand-red/70 bg-brand-red/5 p-2 rounded-lg">
                    <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                    <p>
                        Kurang: <span className="font-semibold">{recipe.missing.join(", ")}</span>
                    </p>
                </div>
            )}

            <button className="btn-primary w-full mt-2 text-sm">
                Lihat Resep
            </button>
        </div>
    );
}
