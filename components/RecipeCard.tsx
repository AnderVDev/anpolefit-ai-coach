import Link from "next/link";
import React from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";

function RecipeCard({ recipe }) {
  const { image, images, label, cuisineType, dietLabel, mealType, uri } =
    recipe;
  const { regular } = images;

  // const id = uri?.split("#")[1];

  return (
    // <Link to={`/${id}`} className="w-full md:w-[220px]">
    <Card className="flex items-center justify-center flex-col flex-grow border border-gray-200 rounded-lg gap-2 p-4 h-auto w-60 cursor-pointer m-0">
      <img
        src={image}
        alt={label}
        className="rounded-lg h-48 md:h-36 w-full object-cover"
      />

      <CardContent className="flex flex-col items-center justify-center">
        <p className="text-sm font-semibold">{label}</p>

        <div className="flex items-center justify-center mt-2">
          <span className="px-2 py-1 text-xs cursor-pointer bg-gray-500 shadow-xl rounded-full mr-3 text-gray-20">
            {cuisineType}
          </span>
          <span className="px-2 py-1 text-xs capitalize bg-gray-500 shadow-xl rounded-full text-gray-20">
            {mealType}
          </span>
        </div>
      </CardContent>
    </Card>
    // </Link>
  );
}

export default RecipeCard;
