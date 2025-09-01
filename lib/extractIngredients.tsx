type Meal = Record<string, string | null | undefined>;

export function extractIngredients(meal?: Meal) {
  if (!meal) return [];
  const list: { ingredient: string; measure: string }[] = [];

  for (let i = 1; i <= 20; i++) {
    const ing = (meal[`strIngredient${i}`] ?? "").trim();
    const mea = (meal[`strMeasure${i}`] ?? "").trim();

    if (ing) {
      list.push({
        ingredient: ing,
        measure: mea || "", 
      });
    }
  }
  return list;
}
