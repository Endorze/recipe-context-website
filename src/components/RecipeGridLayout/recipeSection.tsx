import { RecipeCard } from "../RecipeCard/recipeCard";

type Meal = {
    idMeal: string;
    strMeal: string;
    strCategory?: string;
    strArea?: string;
    strMealThumb: string;
};

export const RecipeSection = ({ meals, title }: { meals: Meal[], title: string }) => {
    return (
        <div className="mb-12">
            <h4 className="font-bold mb-4">{title}</h4>

            <div className="w-full max-w-7xl flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth">
                {meals.map((meal) => (
                    <div key={meal.idMeal} className="flex-shrink-0 w-[260px] snap-start">
                        <RecipeCard
                            idMeal={meal.idMeal}
                            recipeName={meal.strMeal}
                            category={meal.strCategory ?? "Unknown"}
                            area={meal.strArea ?? "Unknown"}
                            strMeal={meal.strMeal}
                            strMealThumb={meal.strMealThumb}
                        />
                    </div>
                ))}
            </div>
        </div>

    );
};
