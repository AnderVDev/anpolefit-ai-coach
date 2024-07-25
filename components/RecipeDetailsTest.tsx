import { userThreadAtom } from "@/atoms";
import axios from "axios";
import { useAtom } from "jotai";
import { useParams } from "next/navigation";
import React, { useCallback, useState } from "react";

const POLLING_FREQUENCY_MS = 1000;
const API_URL = process.env.NEXT_PUBLIC_BASE_URL_EDAMAM;
const APP_ID = process.env.NEXT_PUBLIC_APP_ID_EDAMAM;
const APP_KEY = process.env.NEXT_PUBLIC_APP_KEY_EDAMAM;

function RecipeDetailsTest() {
  // Atom State
  const [userThread] = useAtom(userThreadAtom);

  const [recipe, setRecipe] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [fetching, setFetching] = useState(false);

  const { id } = useParams();

  const URL = `${API_URL}/${id}?type=public&app_id=${APP_ID}&app_key=${APP_KEY}`;

  https://api.edamam.com/api/recipes/v2/recipe_d32c99082482408098a5ce05cf37703c?type=public&app_id=5396dedf&app_key=456e63be299af11d84fcfbf7a05dfdb8

  const fetchRecipeByID = useCallback(async () => {
    if (!userThread) return;

    setFetching(true);

    try {
      const { data } = await axios.get(URL);
      const { hits, error } = data;

      // Validation
      if (!data || error) {
        console.error(error ?? "Unknown error.");
        setRecipes([]);
        return;
      }

      setRecipes(hits.map((hit: any) => hit.recipe));
      // setRecipes(hits);
      console.log(recipes);
    } catch (error) {
      console.error(error);
      setRecipes([]);
    } finally {
      setFetching(false);
    }
    console.log({ recipes });
  }, [userThread, query]);

  return <div>RecipeDetailsTest</div>;
}

export default RecipeDetailsTest;
