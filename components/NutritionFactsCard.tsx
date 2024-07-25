import React from "react";
import { Card } from "./ui/card";
import Image from "next/image";

function NutritionFactsCard({ recipeValues }) {
  const { image, images, totalNutrients } = recipeValues;
  console.log("NutritionFactsCard", recipeValues);
  return (
    <Card className=" flex flex-col items center border border-gray-200 p-4 w-64 rounded-lg text-xs bg-white">
      <section className="flex items-center justify-center border-b-8 mb-2 pb-1">
        <h1 className=" font-bold text-2xl ">Nutrition Facts</h1>
        {/* <Image src={images.LARGE.url} width={images.Large.width}/> */}

        
      </section>

      <section>
        <p className="font-bold">Amount Per Serving</p>
        <p className="flex items-center justify-between font-bold text-2xl">
          Calories <span>{Math.round(totalNutrients.ENERC_KCAL.quantity)}</span>
        </p>
      </section>

      <div className="border-t-4 ">
        <div className="flex items-center justify-end">
          <span className="text-[8px] font-semibold">% Daily Value*</span>
        </div>
        <section className="flex justify-between py-1 border-y">
          <p className="flex gap-2">
            <span className="font-bold">Total Fat</span>
            <span>
              {totalNutrients.FAT.quantity.toFixed(1)} {totalNutrients.FAT.unit}
            </span>
          </p>

          <span className="font-bold">9 %</span>
        </section>

        <section className=" flex flex-col justify-between pl-4">
          <section className="flex justify-between py-1 border-b">
            <p className="flex gap-2">
              <span className="">Saturated Fat</span>
              <span>
                {totalNutrients.FASAT.quantity.toFixed(1)}{" "}
                {totalNutrients.FASAT.unit}
              </span>
            </p>
            <span className="font-bold">5 %</span>
          </section>

          <p className="flex gap-2 py-1 border-b">
            <span>Trans Fat</span>
            <span>{totalNutrients.FATRN.quantity.toFixed(1)} g</span>
          </p>
        </section>

        <section className="flex justify-between py-1 border-b">
          <p className="flex gap-2">
            <span className="font-bold">Cholesterol</span>
            <span>
              {totalNutrients.CHOLE.quantity.toFixed(1)}{" "}
              {totalNutrients.CHOLE.unit}
            </span>
          </p>
          <span className="font-bold">0 %</span>
        </section>

        <section className="flex justify-between py-1 border-b">
          <p className="flex gap-2">
            <span className="font-bold">Sodium</span>
            <span>
              {totalNutrients.NA.quantity.toFixed(1)} {totalNutrients.NA.unit}
            </span>
          </p>
          <span className="font-bold">217 %</span>
        </section>

        <section className="flex justify-between py-1 border-b">
          <p className="flex gap-2">
            <span className="font-bold">Total Carbohydrate</span>
            <span>
              {totalNutrients.CHOCDF.quantity.toFixed(1)}{" "}
              {totalNutrients.CHOCDF.unit}
            </span>
          </p>
          <span className="font-bold">163 %</span>
        </section>

        <section className=" flex flex-col justify-between pl-4">
          <section className="flex justify-between py-1 border-b">
            <p className="flex gap-2 ">
              <span>Dietary Fiber</span>
              <span>
                {totalNutrients.FIBTG.quantity.toFixed(1)}{" "}
                {totalNutrients.FIBTG.unit}
              </span>
            </p>
            <span className="font-bold">68 %</span>
          </section>

          <p className="flex gap-2 py-1 border-b">
            <span>Total Sugars</span>
            <span>
              {totalNutrients.SUGAR.quantity.toFixed(1)}{" "}
              {totalNutrients.SUGAR.unit}
            </span>
          </p>
          <p className="flex justify-between py-1">
            <span>Includes Added Sugars</span>
          </p>
        </section>

        <section className="flex justify-between py-1 border-y">
          <p className="flex gap-2">
            <span className="font-bold">Protein</span>
            <span>
              {totalNutrients.PROCNT.quantity.toFixed(1)}{" "}
              {totalNutrients.PROCNT.unit}
            </span>
          </p>
          <span className="font-bold">129 %</span>
        </section>

        <section className="flex justify-between py-1 border-b">
          <p className="flex gap-2">
            <span>Vitamin D</span>
            <span>
              {totalNutrients.VITD.quantity.toFixed(1)}{" "}
              {totalNutrients.VITD.unit}
            </span>
          </p>
          <span className="font-bold">0 %</span>
        </section>

        <section className="flex justify-between py-1 border-b">
          <p className="flex gap-2">
            <span>Calcium</span>
            <span>
              {totalNutrients.CA.quantity.toFixed(1)} {totalNutrients.CA.unit}
            </span>
          </p>
          <span className="font-bold">348 %</span>
        </section>

        <section className="flex justify-between py-1 border-b">
          <p className="flex gap-2">
            <span>Iron</span>
            <span>
              {totalNutrients.FE.quantity.toFixed(1)} {totalNutrients.FE.unit}
            </span>
          </p>
          <span className="font-bold">190 %</span>
        </section>

        <section className="flex justify-between py-1">
          <p className="flex gap-2">
            <span>Potassium</span>
            <span>
              {totalNutrients.K.quantity.toFixed(1)} {totalNutrients.K.unit}
            </span>
          </p>
          <span className="font-semibold">14 %</span>
        </section>
      </div>

      <p className="text-[8px] my-4">
        * Percent Daily Values are based on a 2000 calorie diet.
      </p>
    </Card>
  );
}

export default NutritionFactsCard;
