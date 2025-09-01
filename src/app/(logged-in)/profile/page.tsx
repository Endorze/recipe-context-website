"use client"
import { useFavorites } from "@/context/favoritesContext";
import { useLoginState } from "../../../../hooks/useLoginState";
import { useEffect, useState } from "react";
import { fetchById } from "../../../../utils/ApiKeys";

const Profile = () => {

    const { user } = useLoginState();
    const { favorites } = useFavorites();
    const [profileMealInfo, setProfileMealInfo] = useState<Meal[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                setLoading(true);

                const mealPromises = favorites.map(async (id) => {
                    const res = await fetch(`${fetchById}${id}`);
                    const data = await res.json();
                    const meal = data.meals[0] as Meal;
                    return meal;
                })

                const results = await Promise.all(mealPromises);
                setProfileMealInfo(results);
            } catch (err) {
                console.error("Error fetching meals:", err);
            } finally {
                setLoading(false);
            }
        };

        if (favorites && favorites.length > 0) {
            fetchMeals();
        }
    }, [favorites]);

    console.log("profile meal", profileMealInfo)

    return (
        <div className="min-h-screen p-3 md:p-8 pb-20 gap-16 sm:p-20 flex justify-center items-center">

            {loading && (
                <p>hi im loading...</p>
            )}

            {profileMealInfo && (
                <div>
                    <p>Your Profile</p>
                    <h2>{user?.username}</h2>
                    <div className="">
                        <h3>Meals you enjoy</h3>
                        <h4>Your favorite recipes</h4>
                        <ul>
                            {profileMealInfo.map((favorite, index) =>
                                <li className="mt-2" key={index}>{favorite.strMeal}</li>
                            )}
                        </ul>
                    </div>
                </div>
            )}
            <p>Sorry got incredibly bored at this point...</p>
        </div>
    )
}

export default Profile;