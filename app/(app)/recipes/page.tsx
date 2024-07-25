"use client";
import { userThreadAtom } from "@/atoms";
import RecipeCard from "@/components/RecipeCard";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useAtom } from "jotai";
import React, { useCallback, useEffect, useState } from "react";

const POLLING_FREQUENCY_MS = 1000;
const API_URL = process.env.NEXT_PUBLIC_BASE_URL_EDAMAM;
const APP_ID = process.env.NEXT_PUBLIC_APP_ID_EDAMAM;
const APP_KEY = process.env.NEXT_PUBLIC_APP_KEY_EDAMAM;

interface RecipesProps {
  recipe: any;
}

function Recipes() {
  // Atom State
  const [userThread] = useAtom(userThreadAtom);

  // State
  const [recipes, setRecipes] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [query, setQuery] = useState("Pancake");
  const URL = `${API_URL}?app_id=${APP_ID}&app_key=${APP_KEY}&q=${query}&type=public`;

  const fetchRecipes = useCallback(async () => {
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
      // console.log(recipes);
    } catch (error) {
      console.error(error);
      setRecipes([]);
    } finally {
      setFetching(false);
    }
    // console.log({ recipes });
  }, [userThread, query]);

  useEffect(() => {
    if (query) {
      const timer = setTimeout(() => {
        fetchRecipes();
      }, POLLING_FREQUENCY_MS);

      return () => clearTimeout(timer);
    }
  }, [query, fetchRecipes]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    []
  );

  const handleSearchedRecipe = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      fetchRecipes();
    },
    [fetchRecipes]
  );

  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-center pt-10 pb-5 px-0 md:px-10">
        <form className="w-full lg:w-2/4" onSubmit={handleSearchedRecipe}>
          <Input
            className="rounded-full"
            placeholder="eg. Pancake, Cake, Vegan, Chicken"
            onChange={handleInputChange}
            inputMode="text"
          />
        </form>
      </div>

      {fetching ? (
        <div className="w-full items-center justify-center py-10">
          <p className="text-center">Loading Recipes...</p>
        </div>
      ) : recipes?.length > 0 ? (
        <div className="w-full flex flex-wrap gap-10 px-0 lg:px-10 py-10">
          {recipes?.map((recipe, index) => (
            <RecipeCard recipe={recipe} key={index} />
          ))}
        </div>
      ) : (
        <div className="w-full items-center justify-center py-10">
          <p className="text-center">No Recipes Found</p>
        </div>
      )}
    </div>
  );
}

export default Recipes;
