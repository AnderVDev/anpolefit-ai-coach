"use client";
import { userThreadAtom } from "@/atoms";
import NutritionFactsCard from "@/components/NutritionFactsCard";
import axios from "axios";
import { useAtom } from "jotai";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { LoaderCircleIcon } from "lucide-react";

const POLLING_FREQUENCY_MS = 1000;
const API_URL = process.env.NEXT_PUBLIC_BASE_URL_EDAMAM;
const APP_ID = process.env.NEXT_PUBLIC_APP_ID_EDAMAM;
const APP_KEY = process.env.NEXT_PUBLIC_APP_KEY_EDAMAM;

interface Recipe {
  label: string;
  calories: number;
  totalTime: number;
  yield: number;
  ingredientLines: string[];
  healthLabels: string[];
}

function RecipeDetails() {
  // Atom State
  const [userThread] = useAtom(userThreadAtom);

  //states
  const [recipeById, setRecipeById] = useState(null);
  // const [recipes, setRecipes] = useState([]);
  const [fetching, setFetching] = useState(false);

  const { id } = useParams() as { id: string };

  const URL = `${API_URL}/${id}?type=public&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const getRecipeByID = useCallback(async () => {
    if (!userThread) return;

    setFetching(true);

    try {
      const { data } = await axios.get(URL);
      const { recipe, error } = data;
      console.log({ data });

      // Validation
      if (!data || error) {
        console.error(error ?? "Unknown error.");
        setRecipeById(null);
        return;
      }

      //   setRecipes(hits.map((hit: any) => hit.recipe));
      setRecipeById(recipe);
    } catch (error) {
      console.error(error);
      setRecipeById(null);
    } finally {
      setFetching(false);
    }
    console.log({ recipeById });
  }, [userThread, URL]);

  useEffect(() => {
    if (id) {
      const timer = setTimeout(() => {
        getRecipeByID();
      }, POLLING_FREQUENCY_MS);
      return () => clearTimeout(timer);
    }
  }, [id, getRecipeByID]);

  return (
    <div>
      {fetching ? (
        <div className="flex  items-center justify-center py-10">
          <p className="flex gap-2 text-center">
            {" "}
            <LoaderCircleIcon className="animate-spin" /> Loading Recipes...
          </p>
        </div>
      ) : recipeById ? (
        <div className="flex flex-col items-center justify-center p-10">
          <h1 className="font-bold">{recipeById.label}</h1>
          <Image
            src={recipeById.images.REGULAR.url}
            width={recipeById.images.REGULAR.width}
            height={recipeById.images.REGULAR.height}
            alt={recipeById.label}
            className="rounded-xl p-2 m-2 object-cover"
          />

          {/* CALORIES, SERVING AND COOKING TIME */}
          <section className="flex gap-10 items-center justify-center px-4">
            <div className="flex flex-col justify-between">
              <span className="text-center border border-gray-500 py-1.5 px-2 rounded-full mb-2">
                {Math.round(recipeById.calories)}
              </span>
              <p className="text-sm md:text-md">CALORIES</p>
            </div>

            <div className="flex flex-col justify-center">
              <span className="text-center border border-gray-500 py-1.5 rounded-full mb-2">
                {recipeById.totalTime}
              </span>
              <p className="text-sm md:text-md">TOTAL TIME</p>
            </div>

            <div className="flex flex-col justify-center">
              <span className="text-center border border-gray-500 py-1.5 rounded-full mb-2">
                {recipeById.yield}
              </span>
              <p className="text-sm md:text-md">SERVINGS</p>
            </div>
          </section>

          {/* CONTENT */}
          <section className=" flex flex-col items-center justify-center md:flex-row gap-8  p-4 md:px-10">
            {/* LEFT SIDE */}
            <div className="md:w-2/4 md:border-r border-gray-500 pr-1">
              <div className="flex flex-col gap-5">
                <p className="text-2xl underline">Ingredients</p>
                {recipeById?.ingredientLines?.map((ingredient, index) => (
                  <p key={index} className="flex gap-2">
                    {ingredient}
                  </p>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="md:w-2/4 2xl:pl-10 mt-20 md:mt-0">
              <NutritionFactsCard recipeValues={recipeById} />
            </div>
          </section>

          {/* BOTTOM SIDE */}
          <section className="flex flex-col items-center justify-center gap-3 md:w-[640px]">
            <p className="text-2xl underline">Health Labels</p>
            <div className="flex flex-wrap gap-4">
              {recipeById.healthLabels.map((item, index) => (
                <p
                  className="text-gray-20 flex gap-2 bg-gray-500 px-4 py-1 rounded-full"
                  key={index}
                >
                  {item}
                </p>
              ))}
            </div>
          </section>
        </div>
      ) : (
        <div className="w-full items-center justify-center py-10">
          <p className="text-center">No Recipes Found</p>
        </div>
      )}
    </div>
  );
}

export default RecipeDetails;
