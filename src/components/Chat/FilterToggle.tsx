"use client";

import { cn } from "@/lib/utils";

const filters = [
    { id: "cepat", label: "⏱️ Cepat" },
    { id: "hemat", label: "💸 Hemat" },
    { id: "tanpa-goreng", label: "🔥 Tanpa goreng" },
    { id: "sehat", label: "🥗 Sehat" },
    { id: "pedas", label: "🌶️ Pedas" },
];

interface FilterToggleProps {
    selectedFilters: string[];
    setSelectedFilters: (filters: string[]) => void;
}

export default function FilterToggle({ selectedFilters, setSelectedFilters }: FilterToggleProps) {
    const toggleFilter = (id: string) => {
        if (selectedFilters.includes(id)) {
            setSelectedFilters(selectedFilters.filter((f) => f !== id));
        } else {
            setSelectedFilters([...selectedFilters, id]);
        }
    };

    return (
        <div className="w-full space-y-3">
            <label className="text-sm font-medium text-brand-black/60 px-1">
                Pengen yang gimana?
            </label>
            <div className="flex flex-wrap gap-2">
                {filters.map((filter) => {
                    const isActive = selectedFilters.includes(filter.id);
                    return (
                        <button
                            key={filter.id}
                            onClick={() => toggleFilter(filter.id)}
                            className={cn(
                                "px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200",
                                isActive
                                    ? "bg-brand-yellow border-brand-yellow text-brand-black shadow-sm scale-105"
                                    : "bg-white border-brand-black/10 text-brand-black/60 hover:border-brand-black/20"
                            )}
                        >
                            {filter.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
