"use client";
import { userThreadAtom } from "@/atoms";
import RecipeCard from "@/components/RecipeCard";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useAtom } from "jotai";
import { LoaderCircleIcon } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import FilterSelector from "./components/FilterSelector";
import { FancyMultiSelect } from "./components/FancyMultiSelect";

type Option = { value: string; label: string };
const dietOptions: Option[] = [
  { value: "balanced", label: "Balanced" },
  { value: "high-fiber", label: "High-fiber" },
  { value: "high-protein", label: "High-protein" },
  { value: "low-carb", label: "Low-carb" },
  { value: "low-fat", label: "Low-fat" },
  { value: "low-sodium", label: "Low-sodium" },
];

const healthOptions: Option[] = [
  { value: "alcohol-cocktail", label: "Alcohol-cocktail" },
  { value: "alcohol-free", label: "Alcohol-free" },
  { value: "celery-free", label: "Celery-free" },
  { value: "crustacean-free", label: "Crustacean-free" },
  { value: "dairy-free", label: "Dairy-free" },
  { value: "egg-free", label: "Egg-free" },
  { value: "fish-free", label: "Fish-free" },
  { value: "fodmap-free", label: "Fodmap-free" },
  { value: "gluten-free", label: "Gluten-free" },
  { value: "immuno-supportive", label: "Immuno-supportive" },
  { value: "keto-friendly", label: "Keto-friendly" },
  { value: "kidney-friendly", label: "Kidney-friendly" },
  { value: "kosher", label: "Kosher" },
  { value: "low-fat-abs", label: "Low-fat-abs" },
  { value: "low-sugar", label: "Low-sugar" },
  { value: "lupine-free", label: "Lupine-free" },
  { value: "Mediterranean", label: "Mediterranean" },
  { value: "mollusk-free", label: "Mollusk-free" },
  { value: "mustard-free", label: "Mustard-free" },
  { value: "no-oil-added", label: "No-oil-added" },
  { value: "paleo", label: "Paleo" },
  { value: "peanut-free", label: "Peanut-free" },
  { value: "pescatarian", label: "Pescatarian" },
  { value: "pork-free", label: "Pork-free" },
  { value: "red-meat-free", label: "Red-meat-free" },
  { value: "sesame-free", label: "Sesame-free" },
  { value: "shellfish-free", label: "Shellfish-free" },
  { value: "soy-free", label: "Soy-free" },
  { value: "sugar-conscious", label: "Sugar-conscious" },
  { value: "sulfite-free", label: "Sulfite-free" },
  { value: "tree-nut-free", label: "Tree-nut-free" },
  { value: "vegan", label: "Vegan" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "wheat-free", label: "Wheat-free" },
];
const cuisineTypeOptions: string[] = [
  "American",
  "Asian",
  "British",
  "Caribbean",
  "Central Europe",
  "Chinese",
  "Eastern Europe",
  "French",
  "Indian",
  "Italian",
  "Japanese",
  "Kosher",
  "Mediterranean",
  "Mexican",
  "Middle Eastern",
  "Nordic",
  "South American",
  "South East Asian",
];
const mealTypeOptions: string[] = [
  "Breakfast",
  "Dinner",
  "Lunch",
  "Snack",
  "Teatime",
];

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
  const [query, setQuery] = useState("Chicken");

  const [diet, setDiet] = useState(""); //list
  const [health, setHealth] = useState(""); //list
  const [cuisineType, setCuisineType] = useState(""); //list
  const [mealType, setMealType] = useState(""); //list
  const [calories, setCalories] = useState(""); //range
  const [time, setTime] = useState(""); //range

  const URL = `${API_URL}?app_id=${APP_ID}&app_key=${APP_KEY}&q=${query}&type=public`;

  const fetchRecipes = useCallback(async () => {
    if (!userThread?.id) return;

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
  }, [userThread?.id, URL]);

  useEffect(() => {
    if (query) {
      const timer = setTimeout(() => {
        // fetchRecipes();
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
    <>
      <section className=" flex flex-col items-center justify-center md:flex-row gap-2  p-2 md:px-2">
        {/* LEFT SIDE */}
        <section className="md:w-1/4 ">
          <form
            className="flex gap-2 md:flex-col w-full lg:w-1/4"
            onSubmit={handleSearchedRecipe}
          >
            <Input
              className="rounded-full"
              placeholder="eg. Pancake, Cake, Vegan, Chicken"
              onChange={handleInputChange}
              inputMode="text"
            />
            <FancyMultiSelect title="Diet Options" options={dietOptions} />
            <FancyMultiSelect title="health" options={healthOptions} />

            <FilterSelector title="cuisineType" values={cuisineTypeOptions} />
            <FilterSelector title="mealType" values={mealTypeOptions} />
          </form>
        </section>
        {/* RIGHT SIDE */}
        {fetching ? (
          <section className="md:w-3/4 2xl:pl-10 mt-20 md:mt-0">
            <p className=" flex gap-2 text-center">
              <LoaderCircleIcon className="animate-spin" /> Loading Recipes...
            </p>
          </section>
        ) : recipes?.length > 0 ? (
          <section className="flex flex-col gap-2 items-center justify-center flex-grow md:w-3/4 2xl:pl-10 mt-20 md:mt-0">
            {recipes?.map((recipe, index) => (
              <RecipeCard recipe={recipe} key={index} />
            ))}
          </section>
        ) : (
          <section className="md:w-3/4 2xl:pl-10 mt-20 md:mt-0">
            <p className="flex gap-2  text-center">No Recipes Found</p>
          </section>
        )}
      </section>
    </>
  );
}

export default Recipes;
