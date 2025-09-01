"use client"
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { extractIngredients } from "../../../../../lib/extractIngredients";
import { useFavorites } from "@/context/favoritesContext";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

const API = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

export default function RecipeDetails() {

  const [meal, setMeal] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const ingredients = useMemo(() => extractIngredients(meal), [meal]);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { idMeal } = useParams<{ idMeal: string }>();
  const router = useRouter();
  console.log("idMeal", idMeal);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    (async () => {
      try {
        const res = await fetch(`${API}${idMeal}`, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const meal = data.meals[0];
        setMeal(meal);
      } catch (err: any) {
        if (err.name !== "AbortError") setError(err);
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [idMeal]);

  console.log("meal", meal);

  return (
    <div className="p-6 flex flex-col mx-auto max-w-5xl">
      {loading && (
        <p>Loading meal.</p>
      )}

      {meal && (

        <div>
          <button className="underline cursor-pointer py-4 text-xl" onClick={() => router.back()}><ChevronLeft /> <span>Back</span></button>
          <h3>Ingredients</h3>
          <div className="flex flex-col md:flex-row md:gap-8">
            <div className="flex flex-col basis-1/2">
              <table className="w-full border-separate border-spacing-y-2 max-w-[300px]">
                <tbody>
                  {ingredients.map(({ ingredient, measure }, i) => (
                    <tr key={i} className="align-top">

                      <td className="py-1 pr-4 text-slate-900">
                        {ingredient}
                      </td>

                      <td className="py-1 pl-4 text-left text-slate-700 tabular-nums whitespace-nowrap w-28">
                        {measure?.trim() || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="md:basis-1/2 md:shrink-0 flex flex-col">
              <img className=" h-auto" src={meal.strMealThumb} />
              <div className="flex justify-between mt-2 gap-2">
                <div className="flex gap-2">
                  <span className="items-center self-start rounded-full bg-[#06D6A0] text-white font-semibold px-2 py-0.5">{meal.strArea}</span>
                  <span className="items-center self-start rounded-full bg-[#06D6A0] text-white font-semibold px-2 py-0.5">{meal.strCategory}</span>
                </div>
                <div className="flex gap-2">
                  <p>{meal.strMeal}</p>
                  <button className="text-sm h-auto px-2 rounded bg-gray-100 hover:bg-gray-200" onClick={((e) => {
                    e.stopPropagation();
                    toggleFavorite(idMeal);
                  })
                  }
                    aria-pressed={isFavorite(idMeal)}
                    aria-label={isFavorite(idMeal) ? "Remove from Favorites" : "Add to favorites"}>
                    <Star
                      className="w-6 h-6"
                      fill={isFavorite(idMeal) ? "#E63946" : "none"}
                      stroke={isFavorite(idMeal) ? "#E63946" : "currentColor"}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <h4 className="mt-8">Directions</h4>
          <p>{meal.strInstructions}</p>
        </div>
      )}
    </div>
  );
}
