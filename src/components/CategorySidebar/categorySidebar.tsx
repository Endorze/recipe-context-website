"use client";
import { Category } from "@/types/categoryList";

type Props = {
    categories: Category[];
    selected: Set<string>;                
    onToggle: (category: string) => void;   
    onClear?: () => void;                  
};

export function CategorySidebar({ categories, selected, onToggle, onClear }: Props) {
    return (
        <aside className="p-4 max-h-[80vh] border border-gray-200 rounded-2xl">
            <div className="flex items-center justify-between mb-3">
                <div className="flex flex-col">
                    <h5 className="font-semibold text-lg">Filter</h5>
                    <p>Sort after</p>
                </div>

                {/*när vi har selectat options så dyker knappen upp, nä'r vi trycker på clear så rensas alla våra val*/}
                {onClear && selected.size > 0 && (
                    <button
                        className="text-sm cursor-pointer font-semibold text-gray-600 hover:text-gray-900"
                        onClick={onClear}
                    >
                        Clear all
                    </button>
                )}
            </div>

            {/*vi mappar över categories listan, för varje kategori så skapar vi en checkbox knapp som togglar kategori, lägger till i selected när de selectas */}
            <ul className="space-y-2 overflow-auto pr-1">
                {categories.map(({ strCategory }) => {
                    const id = `cat-${strCategory}`;
                    const checked = selected.has(strCategory);
                    return (
                        <li key={strCategory} className="flex items-center gap-2">
                            <input
                                id={id}
                                type="checkbox"
                                checked={checked}
                                onChange={() => onToggle(strCategory)}
                                className="size-4 accent-black cursor-pointer"
                            />
                            <label htmlFor={id} className="cursor-pointer select-none text-sm">
                                {strCategory}
                            </label>
                        </li>
                    );
                })}
            </ul>

            <p className="mt-3 text-xs text-gray-500">
                {selected.size === 0
                    ? "Nothin selected..."
                    : `Selected: ${Array.from(selected).join(", ")}`}
            </p>
        </aside>
    );
}

