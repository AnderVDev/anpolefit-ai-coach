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
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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

const formSchema = z.object({
  query: z.string().min(1, "Query is required"),
  diet: z.array(z.string()).optional(),
  health: z.array(z.string()).optional(),
  cuisineType: z.string().optional(),
  mealType: z.string().optional(),
  calories: z.number().optional(),
  procnt: z.number().optional(),
  time: z.number().optional(),
  fat: z.number().optional(),
  chocdf: z.number().optional(),
  sugar: z.number().optional(),
});

type FormSchema = z.infer<typeof formSchema>;

interface RecipesProps {
  recipe: any;
}

function Recipes() {
  // Atom State
  const [userThread] = useAtom(userThreadAtom);

  // State
  const [recipes, setRecipes] = useState([]);
  const [fetching, setFetching] = useState(false);
  // const [query, setQuery] = useState("Chicken");

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
      diet: [""],
      health: [""],
      cuisineType: undefined,
      mealType: undefined,
      time: 0,
      calories: 0,
      procnt: 0,
      fat: 0,
      chocdf: 0,
      sugar: 0,
    },
  });

  const { watch, setValue, handleSubmit, control } = form;

  const watchAllFields = watch();

  // const URL = `${API_URL}?app_id=${APP_ID}&app_key=${APP_KEY}&q=${query}&type=public`;

  const fetchRecipes = useCallback(
    async (data: FormSchema) => {
      if (!userThread?.id) return;

      setFetching(true);

      const params = {
        type: "public",
        app_id: APP_ID,
        app_key: APP_KEY,
        q: data.query,
        diet:
          data.diet.length > 0 && data.diet[0] !== "" ? data.diet : undefined,
        health:
          data.health.length > 0 && data.health[0] !== ""
            ? data.health
            : undefined,
        cuisineType: data.cuisineType ? data.cuisineType : undefined,
        mealType: data.mealType ? data.mealType : undefined,
      };

      const nutrients = {
        ENERC_KCAL: data?.calories > 0 ? `${data.calories}` : undefined,
        // ENERC_KCAL: data.calories > 0 ? `0-${data.calories}` : undefined,
        PROCNT: data?.procnt > 0 ? `${data.procnt}` : undefined,
        FAT: data.fat > 0 ? `${data.fat}` : undefined,
        CHOCDF: data.chocdf > 0 ? `${data.chocdf}` : undefined,
        SUGAR: data.sugar > 0 ? `${data.sugar}` : undefined,
      };

      const searchParams = new URLSearchParams();

      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          if (Array.isArray(value)) {
            value.forEach((val) => searchParams.append(key, val));
          } else {
            searchParams.append(key, value);
          }
        }
      });

      Object.entries(nutrients).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(`nutrients[${key}]`, value);
        }
      });

      const URL = `${API_URL}?${searchParams.toString()}`;
      console.log("URL", URL);

      // ____________________________

      // const params = {
      //   type: "public",
      //   app_id: APP_ID,
      //   app_key: APP_KEY,
      //   q: data.query,
      //   diet:
      //     data.diet.length > 0 && data.diet[0] !== "" ? data.diet : undefined,
      //   health:
      //     data.health.length > 0 && data.health[0] !== ""
      //       ? data.health
      //       : undefined,
      //   cuisineType: data.cuisineType ? data.cuisineType : undefined,
      //   mealType: data.mealType ? data.mealType : undefined,
      //   calories: data.calories > 0 ? `0-${data.calories}` : undefined,
      //   time: data.time > 0 ? `0-${data.time}` : undefined,
      //   fat: data.fat > 0 ? `0-${data.fat}` : undefined,
      //   chocdf: data.chocdf > 0 ? `0-${data.chocdf}` : undefined,
      //   SUGAR: data.sugar > 0 ? `0-${data.sugar}` : undefined,
      // };

      // const searchParams = new URLSearchParams();

      // Object.entries(params).forEach(([key, value]) => {
      //   if (value !== undefined) {
      //     if (Array.isArray(value)) {
      //       value.forEach((val) => searchParams.append(key, val));
      //     } else {
      //       searchParams.append(key, value);
      //     }
      //   }
      // });

      // const URL = `${API_URL}?${searchParams.toString()}`;
      // console.log("URL", URL);

      try {
        const { data } = await axios.get(URL);
        const { hits, error } = data;

        if (!data || error) {
          console.error(error ?? "Unknown error.");
          setRecipes([]);
          return;
        }

        setRecipes(hits.map((hit: any) => hit.recipe));
      } catch (error) {
        console.error(error);
        setRecipes([]);
      } finally {
        setFetching(false);
      }
    },
    [userThread?.id]
  );

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    console.log("data", data);
    fetchRecipes(data);
  };

  // const handleSearchedRecipe = useCallback(
  //   (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     fetchRecipes();
  //   },
  //   [fetchRecipes]
  // );

  return (
    <>
      <section className="flex flex-col items-center justify-center md:flex-row gap-2 p-2 md:px-2">
        {/* LEFT SIDE */}
        <section className="md:w-1/4">
          <Card className="p-2">
            <Form {...form}>
              <form
                className="flex flex-col gap-2"
                onSubmit={handleSubmit(onSubmit)}
              >
                <FormField
                  name="query"
                  control={control}
                  render={({ field }: any) => (
                    <FormItem>
                      <FormLabel>Query</FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-full"
                          placeholder="eg. Pancake, Cake, Vegan, Chicken"
                          inputMode="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FancyMultiSelect
                  title="Diet Options"
                  options={dietOptions}
                  onSelectionChange={(value) =>
                    setValue(
                      "diet",
                      value.map((option) => option.value)
                    )
                  }
                />
                <FancyMultiSelect
                  title="Health Options"
                  options={healthOptions}
                  onSelectionChange={(value) =>
                    setValue(
                      "health",
                      value.map((option) => option.value)
                    )
                  }
                />

                <FilterSelector
                  title="Cuisine Type"
                  options={cuisineTypeOptions}
                  onChange={(value: string | undefined) =>
                    setValue("cuisineType", value)
                  }
                />
                <FilterSelector
                  title="Meal Type"
                  options={mealTypeOptions}
                  onChange={(value: string | undefined) =>
                    setValue("mealType", value)
                  }
                />
                <FormField
                  name="time"
                  control={control}
                  render={({ field }: any) => (
                    <FormItem>
                      <FormLabel>
                        Time <span>{field.value ?? 0} min</span>
                      </FormLabel>
                      <FormControl>
                        <Slider
                          value={[field.value ?? 0]}
                          onValueChange={(v) => field.onChange(v[0])}
                          defaultValue={[field.value as number]}
                          max={360}
                          step={1}
                          className="max-w-[40%] md:max-w-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="calories"
                  control={control}
                  render={({ field }: any) => (
                    <FormItem>
                      <FormLabel>
                        Calories <span>{field.value ?? 0} kcal</span>
                      </FormLabel>
                      <FormControl>
                        <Slider
                          value={[field.value ?? 0]}
                          onValueChange={(v) => field.onChange(v[0])}
                          defaultValue={[field.value as number]}
                          max={5000}
                          step={10}
                          className="max-w-[40%] md:max-w-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="procnt"
                  control={control}
                  render={({ field }: any) => (
                    <FormItem>
                      <FormLabel>
                        Protein <span>{field.value ?? 0} g</span>
                      </FormLabel>
                      <FormControl>
                        <Slider
                          value={[field.value ?? 0]}
                          onValueChange={(v) => field.onChange(v[0])}
                          defaultValue={[field.value as number]}
                          max={5000}
                          step={10}
                          className="max-w-[40%] md:max-w-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="fat"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Fat <span>{field.value ?? 0} g</span>
                      </FormLabel>
                      <FormControl>
                        <Slider
                          value={[field.value ?? 0]}
                          onValueChange={(v) => field.onChange(v[0])}
                          defaultValue={[field.value as number]}
                          max={100}
                          step={1}
                          className="max-w-[40%] md:max-w-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="chocdf"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Carbohydrates <span>{field.value ?? 0} g</span>
                      </FormLabel>
                      <FormControl>
                        <Slider
                          value={[field.value ?? 0]}
                          onValueChange={(v) => field.onChange(v[0])}
                          defaultValue={[field.value as number]}
                          max={500}
                          step={1}
                          className="max-w-[40%] md:max-w-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="sugar"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Sugar <span>{field.value ?? 0}</span> g
                      </FormLabel>
                      <FormControl>
                        <Slider
                          value={[field.value ?? 0]}
                          onValueChange={(v) => field.onChange(v[0])}
                          defaultValue={[field.value as number]}
                          max={100}
                          step={1}
                          className="max-w-[40%] md:max-w-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button className="w-full mt-2" type="submit">
                  Search
                </Button>
              </form>
            </Form>
          </Card>
        </section>

        {/* RIGHT SIDE */}
        {fetching ? (
          <section className="md:w-3/4 2xl:pl-10 mt-20 md:mt-0">
            <p className="flex gap-2 text-center">
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
            <p className="flex gap-2 text-center">No Recipes Found</p>
          </section>
        )}
      </section>
    </>
  );
}

export default Recipes;
