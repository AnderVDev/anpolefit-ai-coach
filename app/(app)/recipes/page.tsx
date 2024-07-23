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

function Recipes() {
  // Atom State
  const [userThread] = useAtom(userThreadAtom);

  // State
  const [recipes, setRecipes] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [query, setQuery] = useState("Pancake");
  const URL = `${API_URL}?app_id=${APP_ID}&app_key=${APP_KEY}&q=${query}&type=public`;

  const handleInputChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setQuery(e.target.value);
  };
  //   if (loading) {
  //     return <p>loading...</p>;
  //   }

  const fetchRecipes = useCallback(async () => {
    // if (!userThread) return;

    setFetching(true);

    try {
      const { data } = await axios.get(URL);
      const {hits, error} = data

      // Validation
      if (!data || error) {
        console.error(data.error ?? "Unknown error.");
        return;
      }

      setRecipes(hits);
      console.log(hits);
    } catch (error) {
      console.error(error);
      setRecipes([]);
    } finally {
      setFetching(false);
    }
    console.log({ recipes });
  }, [userThread]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  // useEffect(() => {
  //   const intervalId = setInterval(fetchRecipes, POLLING_FREQUENCY_MS);

  //   // Clean up on unmount
  //   return () => clearInterval(intervalId);
  // }, [fetchRecipes]);

  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-center pt-10 pb-5 px-0 md:px-10">
        <form className="w-full lg:w-2/4">
          {" "}
          <Input
            className="rounded-full"
            placeholder="eg. Cake, vegan, Chicken"
            onChange={handleInputChange}
          />
        </form>
      </div>
      {recipes?.length > 0 ? (
        <div className="w-full flex flex-wrap gap-10 px-0 lg:px-10 py-10">
          {recipes?.map((item, index) => (
            <RecipeCard recipe={item.recipe} key={index} />
          ))}
        </div>
      ) : (
        <div className="w-full items-center justify-center py-10">
          <p className="text-center">No Recipe Found</p>
        </div>
      )}
    </div>
  );
}

export default Recipes;
