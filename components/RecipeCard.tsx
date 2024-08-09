import Link from "next/link";
import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { PlusCircle, CircleCheck } from "lucide-react";
function RecipeCard({ recipe }: any) {
  const { image, images, label, cuisineType, mealType, uri, calories } = recipe;
  const [saved, setSaved] = useState<boolean>(false);

  const id = uri?.split("#")[1];

  return (
    <div className="md:w-60">
      <Card className="relative flex items-center justify-center flex-col flex-grow border border-gray-200 rounded-lg gap-1 p-2 h-[350px] w-60 m-0">
        <CardContent className="flex flex-col items-center justify-center m-0 p-2">
          <div className="absolute top-2 right-2 ">
            <Button
              className={`m-0 ${saved ? "bg-purple-400" :"bg-gray-500"} rounded-full p-1 h-6 w-6`}
              onClick={() => setSaved(!saved)}
            >
              {saved ? (
                <CircleCheck color="white" size={16} />
              ) : (
                <PlusCircle color="white" size={16} />
              )}
            </Button>
          </div>
          <div className="w-32"><p className="text-center text-xs font-semibold">{label}</p></div>
          <Image
            src={images.SMALL.url}
            width={images.SMALL.width}
            height={images.SMALL.height}
            alt={label}
            className="rounded-xl p-2 mt-2 w-28"
          />

          <div className="flex flex-col items-center justify-center mt-2">
            <p className="font-bold">
              Calories <span className="">{Math.round(calories)}</span>
            </p>
            <span className="text-xs s rounded-full text-gray-500">
              {cuisineType}
            </span>
            <span className="text-xs rounded-full text-gray-500">
              {mealType}
            </span>
          </div>
          <Link href={`/recipes/${id}`} target="_blank" className="">
            <Button className="bg-gray-500 text-xs p-2 rounded-xl">
              See Details...
            </Button>
          </Link>
        </CardContent>
      </Card>
      {/* </Link> */}
    </div>
  );
}

export default RecipeCard;
