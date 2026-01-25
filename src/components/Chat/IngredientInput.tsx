"use client";

import { useState, KeyboardEvent } from "react";
import { X, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface IngredientInputProps {
    ingredients: string[];
    setIngredients: (ingredients: string[]) => void;
}

export default function IngredientInput({ ingredients, setIngredients }: IngredientInputProps) {
    const [inputValue, setInputValue] = useState("");

    const addIngredient = () => {
        const trimmedValue = inputValue.trim().toLowerCase();
        if (trimmedValue && !ingredients.includes(trimmedValue)) {
            setIngredients([...ingredients, trimmedValue]);
            setInputValue("");
        }
    };

    const removeIngredient = (index: number) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addIngredient();
        } else if (e.key === "Backspace" && !inputValue && ingredients.length > 0) {
            removeIngredient(ingredients.length - 1);
        }
    };

    return (
        <div className="w-full space-y-3">
            <label className="text-sm font-medium text-brand-black/60 px-1">
                Punya bahan apa saja?
            </label>
            <div className="flex flex-wrap gap-2 p-3 bg-white rounded-[12px] border border-brand-black/10 focus-within:border-brand-green/50 focus-within:ring-2 focus-within:ring-brand-green/20 transition-all min-h-[56px]">
                {ingredients.map((ingredient, index) => (
                    <span
                        key={index}
                        className="chip animate-in fade-in zoom-in duration-200"
                    >
                        {ingredient}
                        <button
                            onClick={() => removeIngredient(index)}
                            className="hover:text-brand-red transition-colors"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </span>
                ))}
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={addIngredient}
                    placeholder={ingredients.length === 0 ? "Masukkan bahan (misal: telur, tempe...)" : ""}
                    className="flex-1 bg-transparent border-none outline-none text-brand-black min-w-[120px] placeholder:text-brand-black/30"
                />
            </div>
            <p className="text-[11px] text-brand-black/30 px-1 italic">
                Tekan Enter atau koma untuk memisahkan bahan.
            </p>
        </div>
    );
}
