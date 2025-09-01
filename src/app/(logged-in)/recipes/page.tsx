// app/page.tsx eller app/home/page.tsx
"use client";
import { useEffect, useMemo, useState } from "react";
import { Category } from "@/types/categoryList";
import { CategorySidebar } from "@/components/CategorySidebar/categorySidebar";
import { RecipeSection } from "@/components/RecipeGridLayout/recipeSection";
import { fetchById } from "../../../../utils/ApiKeys";

type Meal = {
  idMeal: string;
  strMeal: string;
  strCategory?: string;
  strArea?: string;
  strMealThumb: string;
};

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [mealsByCat, setMealsByCat] = useState<Record<string, Meal[]>>({});
  const [loading, setLoading] = useState(true);

  //hämtar alla kategorier
  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list");
      const data = await res.json();
      setCategories(data.meals ?? []);
      setLoading(false);
    }
    fetchCategories();
  }, []);

  // hämtar recept för 1 kategori
  async function ensureMealsForCategory(cat: string) {
    if (mealsByCat[cat]) return; //om recept redan hämtat, return
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(cat)}`
    );
    const data = await res.json();
    setMealsByCat(prev => ({ ...prev, [cat]: (data.meals ?? []).slice(0, 12) }));
  }

  useEffect(() => {
    if (categories.length === 0) return;
    Promise.all(categories.map(c => ensureMealsForCategory(c.strCategory))).catch(() => {});
  }, [categories]);

  const handleToggle = (cat: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
    ensureMealsForCategory(cat);
  };
  const handleClear = () => setSelected(new Set());

  const visibleCategories = useMemo(() => {
    const all = categories.map(c => c.strCategory);
    return selected.size === 0 ? all : all.filter(c => selected.has(c));
  }, [categories, selected]);

  if (loading) return <div className="p-8">Loading...</div>;

return (
  <div className="min-h-screen p-6 sm:p-10">
    <div className="mx-auto w-full grid grid-cols-1 lg:grid-cols-[16rem_1fr] gap-8 lg:ml-24">
      
      <aside className="block lg:sticky lg:top-24 lg:self-start lg:h-max">
        <CategorySidebar
          categories={categories}
          selected={selected}
          onToggle={handleToggle}
          onClear={handleClear}
        />
      </aside>

      <main className="space-y-12">
        {visibleCategories.map(cat => {
          const meals = mealsByCat[cat] ?? [];
          if (meals.length === 0) return null;
          return <RecipeSection title={cat} meals={meals} />;
        })}
      </main>
    </div>
  </div>
);

}
