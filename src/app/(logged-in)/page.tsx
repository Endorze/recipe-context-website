"use client";
import { useEffect, useState } from "react";
import { useFavorites } from "@/context/favoritesContext";
import { RecipeSection } from "@/components/RecipeGridLayout/recipeSection";
import { useLoginState } from "../../../hooks/useLoginState";
import Link from "next/link";



type MealSummary = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
  strArea?: string;
};

export default function Home() {
  const { favorites } = useFavorites(); // tex ["52772", ...]
  const [meals, setMeals] = useState<MealSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useLoginState();

  useEffect(() => {
    let cancelled = false;

    async function fetchFavorites() {
      setLoading(true);
      try {
        if (favorites.length === 0) {
          if (!cancelled) setMeals([]);
          return;
        }

        const results = await Promise.all(
          favorites.map(async (id) => {
            const res = await fetch(
              `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
            );
            const data = await res.json();
            return data.meals?.[0] as MealSummary | undefined;
          })
        );

        const cleaned = results.filter(Boolean) as MealSummary[];
        if (!cancelled) setMeals(cleaned);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchFavorites();
    return () => {
      cancelled = true;
    };
  }, [favorites]);

  if (loading) return <div className="p-8">Laddar favoriter…</div>;

  if (meals.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-2xl font-semibold mb-2">Favorited Foods</h1>
        <p className="text-gray-600">
          You have no favorited foods. Go to the "ALL RECIPES" page, press the star on a recipe to add it!
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full px-4 sm:px-10 py-8">
      <div className="mx-auto w-full max-w-7xl">
      <h1 className="mb-4 md:mb-8 !text-4xl md:!text-7xl">Discover delicious recipes</h1>
        <div className="w-full bg-[#FFF9D6] min-h-[200px] mb-6 p-6 md:p-8 rounded-2xl border border-black/5 shadow-sm">
          <div className="flex justify-between">
            <h3 className="font-semibold">Hello {user?.username}</h3>
            <img className="max-w-[128px] opacity-90 rounded-xl hidden md:block" src={"/alexrestaurantlogo.png"} />
          </div>
          <div className="flex flex-col gap-2">
            <h4>Feeling hungry?</h4>
            <p>Cook up one of your favorites, or browse new recipes today!</p>
            <Link key={"recipes"}
              href="/recipes"
              className="rounded-xl py-2 bg-[#06D6A0] font-bold text-white w-fit px-4 hover:bg-emerald-500"
              >
              🍽️ Discover recipes
              <span className="text-lg"> ➜</span>
            </Link>
              </div>
        </div>
        <RecipeSection title="Personal favorites" meals={meals} />
      </div>
    </div>
  );
}
