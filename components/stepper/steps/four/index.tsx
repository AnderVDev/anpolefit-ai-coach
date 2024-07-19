import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import CaloricIntakeCard from "./CaloricIntakeCard";

interface CaloricIntake {
  id: string;
  name: string;
  result: number;
  total: number;
}

// const caloricIntakes = [
//   {
//     id: "PROTEIN",
//     name: "Protein",
//     result: 750,
//     total: 1950,
//   },
//   {
//     id: "CARBOHYDRATES",
//     name: "Carbohydrates",
//     result: 650,
//     total: 1950,
//   },
//   {
//     id: "FAT",
//     name: "Fat",
//     result: 550,
//     total: 1950,
//   },
// ];

const initialCaloricIntakes: CaloricIntake[] = [
  { id: "PROTEIN", name: "Protein", result: 0, total: 0 },
  {
    id: "CARBOHYDRATES",
    name: "Carbohydrates",
    result: 0,
    total: 0,
  },
  { id: "FAT", name: "Fat", result: 0, total: 0 },
];

const BODYTYPES_CONSTANTS_PERCENTAGES = {
  ECTOMORPH: {
    PROTEIN: 25,
    CARBOHYDRATE: 55,
    FAT: 20,
  },

  MESOMORPH: {
    PROTEIN: 30,
    CARBOHYDRATE: 40,
    FAT: 30,
  },

  ENDOMORPH: {
    PROTEIN: 40,
    CARBOHYDRATE: 25,
    FAT: 35,
  },
};

const KCAL_TO_GRAMS_CONSTANTS = {
  PROTEIN: 4,
  CARBOHYDRATE: 4,
  FAT: 4,
};

// Target daily calorie intake (TDCI) = TDEE – (Bodyweight x target weekly fat loss rate x 500*)  *1100 if you use kg
const WEEKLY_FAT_LOSS_RATE = 0.0075;
const TDCI_CONSTANT = {
  POUND: 500,
  KILOGRAMS: 1100,
};

interface StepFourProps {
  inputs: {
    age: number | null;
    weight: number | null;
    height: number | null;
    bmr: number | null;
    tdee: number | null;
    selectedGender: "MALE" | "FEMALE" | null;
    selectedActivity: "SEDENTARY" | "LIGHT" | "MODERATE" | "VERY" | null;
    expectation: "BUILD" | "RECOMPOSITION" | null;
    bodyType: "ECTOMORPH" | "MESOMORPH" | "ENDOMORPH" | null;
  };
}
function StepFour({ inputs }: StepFourProps) {
  const [results, setResults] = useState<CaloricIntake[]>(
    initialCaloricIntakes
  );
  const [tdci, setTDCI] = useState<number>(0);
  const [proteinKcal, setProteinKcal] = useState<number>(0);
  const [carbKcal, setCarbKcal] = useState<number>(0);
  const [fatKcal, setFatKcal] = useState<number>(0);
  const { bodyType, tdee, weight } = inputs;

  const handleTDCIChange = () => {
    // Target daily calorie intake (TDCI)

    if (tdee && weight && bodyType) {
      const TDCIFormula =
        tdee - weight * WEEKLY_FAT_LOSS_RATE * TDCI_CONSTANT["KILOGRAMS"];
      setTDCI(Math.round(TDCIFormula));
      const percentages = BODYTYPES_CONSTANTS_PERCENTAGES[bodyType];
      setProteinKcal(Math.round((tdci * percentages.PROTEIN) / 100));
      setCarbKcal(Math.round((tdci * percentages.CARBOHYDRATE) / 100));
      setFatKcal(Math.round((tdci * percentages.FAT) / 100));
      console.log({ percentages });
    }

  };

  useEffect(() => {
    handleTDCIChange();

    setResults([
      {
        id: "PROTEIN",
        name: "Protein",
        result: proteinKcal,
        total: tdci,
      },
      {
        id: "CARBOHYDRATES",
        name: "Carbohydrates",
        result: carbKcal,
        total: tdci,
      },
      { id: "FAT", name: "Fat", result: fatKcal, total: tdci },
    ]);
  }, [tdci, proteinKcal, carbKcal. fatKcal]);

  console.log({ tdci, results });

  return (
    <Card className="flex flex-col p-4 border border-gray-100 rounded-lg cursor-pointer items-center gap-4 w-96 h-72">
      <CardTitle>Caloric Intakes</CardTitle>
      <CardContent className="flex flex-col justify-center items-center">
        <CaloricIntakeCard
          key={"TOTAL"}
          name={"total"}
          result={tdci}
          total={tdci}
        />
        <div className="flex items-center ">
          {results.map((intake) => (
            <CaloricIntakeCard
              key={intake.id}
              name={intake.name}
              result={intake.result}
              total={intake.total}
            />
          ))}
        </div>
        {/* <CardDescription>
              Remember, this estimate is based on your weight, height, age,
              gender, and usual activity level. Use this information to help you
              determine how many calories you should consume to maintain your
              current weight. On days when you're more active, you’ll need more
              calories, so don’t hesitate to eat a bit more. On days when you're
              less active, consider reducing your calorie intake. If your goal
              is to lose weight, aim to eat fewer calories than you burn or
              increase your activity level. However, always prioritize
              nutritious meals and avoid cutting calories too drastically.
              Eating too little or losing weight too quickly can be harmful and
              unsafe. Keep it balanced and healthy!
            </CardDescription> */}
      </CardContent>
    </Card>
  );
}

export default StepFour;
