"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Layout/Header";
import IngredientInput from "@/components/Chat/IngredientInput";
import FilterToggle from "@/components/Chat/FilterToggle";
import RecipeCard from "@/components/Recipes/RecipeCard";
import RecipeModal from "@/components/Recipes/RecipeModal";
import { Loader2, Sparkles, Search, History } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { motion, AnimatePresence } from "framer-motion";

interface Recipe {
  title: string;
  match_score: number;
  missing: string[];
  cook_time: number;
  tags: string[];
  steps: string[];
}

export default function Home() {
  const [ingredients, setIngredients] = useLocalStorage<string[]>("isidapur_ingredients", []);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [recipes, setRecipes] = useLocalStorage<Recipe[]>("isidapur_last_recipes", []);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (recipes.length > 0) {
      setHasSearched(true);
    }
  }, [recipes]);

  const fetchRecommendations = async () => {
    if (ingredients.length === 0) return;

    setLoading(true);
    setHasSearched(true);

    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients, filters: selectedFilters }),
      });

      const data = await res.json();
      if (data.recommendations) {
        setRecipes(data.recommendations);
      }
    } catch (error) {
      console.error("Failed to fetch recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  const showResults = hasSearched || loading;

  return (
    <div className={cn(
      "min-h-screen flex flex-col bg-brand-cream selection:bg-brand-yellow/30 transition-all duration-700",
      !showResults && "h-screen overflow-hidden"
    )}>
      <Header />

      <main className={cn(
        "flex-1 w-full max-w-4xl mx-auto px-4 flex flex-col items-center transition-all duration-700",
        !showResults ? "justify-center pb-20" : "py-8 md:py-20 gap-8 md:gap-12"
      )}>
        <div className={cn(
          "w-full flex flex-col items-center transition-all duration-700",
          !showResults ? "gap-6 md:gap-8" : "gap-8 md:gap-12"
        )}>
          {/* Hero Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 max-w-2xl"
          >
            <h1 className="text-3xl md:text-6xl font-serif font-bold text-brand-black leading-tight">
              Lagi bingung mau <span className="text-brand-orange">masak</span> apa?
            </h1>
            {!showResults && (
              <p className="text-base md:text-lg text-brand-black/60 font-medium">
                Tulis saja bahan yang kamu punya, biar kami yang bantu carikan ide yang masuk akal.
              </p>
            )}
          </motion.section>

          {/* Input Tools */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full bg-brand-white p-6 md:p-8 rounded-[24px] border border-brand-black/5 shadow-xl shadow-brand-black/[0.02] space-y-8"
          >
            <IngredientInput
              ingredients={ingredients}
              setIngredients={setIngredients}
            />

            <FilterToggle
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
            />

            <button
              onClick={fetchRecommendations}
              disabled={loading || ingredients.length === 0}
              className={cn(
                "w-full py-4 rounded-[12px] font-bold text-lg flex items-center justify-center gap-2 transition-all",
                loading || ingredients.length === 0
                  ? "bg-brand-black/5 text-brand-black/20 cursor-not-allowed"
                  : "bg-brand-yellow text-brand-black shadow-lg shadow-brand-yellow/20 hover:scale-[1.01] active:scale-[0.99]"
              )}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Lagi mikir sebentar...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Cari Masakan
                </>
              )}
            </button>
          </motion.section>
        </div>

        {/* Results Section */}
        <AnimatePresence mode="wait">
          {showResults && (
            <motion.section
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="w-full space-y-6 mt-12"
            >
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-brand-yellow" />
                  <h2 className="text-2xl font-serif font-bold text-brand-black">
                    {loading ? "Mencari ide..." : "Ini yang paling masuk akal:"}
                  </h2>
                </div>
                {!loading && recipes.length > 0 && (
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-brand-black/30 uppercase tracking-widest">
                    <History className="w-3 h-3" />
                    Tersimpan otomatis
                  </div>
                )}
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-48 bg-brand-white rounded-[10px] animate-pulse border border-brand-black/5" />
                  ))}
                </div>
              ) : recipes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recipes.map((recipe, index) => (
                    <motion.div
                      key={recipe.title}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <RecipeCard
                        recipe={recipe}
                        onClick={() => setSelectedRecipe(recipe)}
                      />
                    </motion.div>
                  ))}
                </div>
              ) : hasSearched && !loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20 space-y-4 bg-brand-white rounded-[24px] border border-brand-black/5"
                >
                  <p className="text-brand-black/40 font-medium">
                    Yah, nggak nemu yang pas. Coba ganti bahannya?
                  </p>
                  <button
                    onClick={() => { setIngredients([]); setRecipes([]); setHasSearched(false); }}
                    className="text-brand-green font-bold hover:underline"
                  >
                    Mulai dari awal
                  </button>
                </motion.div>
              )}
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      {showResults && (
        <footer className="py-8 text-center text-xs text-brand-black/30 font-medium font-sans">
          <p>© 2026 Isidapur.ai — Sederhana itu cukup.</p>
        </footer>
      )}

      {/* Modals */}
      <AnimatePresence>
        {selectedRecipe && (
          <RecipeModal
            recipe={selectedRecipe}
            onClose={() => setSelectedRecipe(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
