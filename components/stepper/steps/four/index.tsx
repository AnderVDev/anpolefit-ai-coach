import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React, { useCallback, useEffect, useState } from "react";
import CaloricIntakeCard from "./CaloricIntakeCard";

type GendersTypes = "MALE" | "FEMALE";
type Activities = "SEDENTARY" | "LIGHT" | "MODERATE" | "VERY";
const TDDE_CONSTANTS = {
  SEDENTARY: 1.2,
  LIGHT: 1.375,
  MODERATE: 1.55,
  VERY: 1.725,
  EXTREMELY: 1.9,
};

interface CaloricIntake {
  id: string;
  name: string;
  resultKcal: number;
  resultGrams: number;
  total: number;
}

const initialCaloricIntakes: CaloricIntake[] = [
  { id: "PROTEIN", name: "Protein", resultKcal: 0, resultGrams: 0, total: 0 },
  {
    id: "CARBOHYDRATES",
    name: "Carbohydrates",
    resultKcal: 0,
    resultGrams: 0,
    total: 0,
  },
  { id: "FAT", name: "Fat", resultKcal: 0, resultGrams: 0, total: 0 },
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
  FAT: 9,
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
    gender: "MALE" | "FEMALE" | null;
    activity: "SEDENTARY" | "LIGHT" | "MODERATE" | "VERY" | null;
    expectation: "BUILD" | "RECOMPOSITION" | null;
    bodyType: "ECTOMORPH" | "MESOMORPH" | "ENDOMORPH" | null;
  };
}

const POLLING_FREQUENCY_MS = 1000;

function StepFour({ inputs }: StepFourProps) {
  const [bmr, setBMR] = useState<number | null>(null);
  const [tdee, setTDEE] = useState<number | null>(null);
  const [results, setResults] = useState<CaloricIntake[]>(
    initialCaloricIntakes
  );
  const [tdci, setTDCI] = useState<number>(0);
  const [proteinKcal, setProteinKcal] = useState<number>(0);
  const [proteinGrams, setProteinGrams] = useState<number>(0);
  const [carbKcal, setCarbKcal] = useState<number>(0);
  const [carbGrams, setCarbGrams] = useState<number>(0);
  const [fatKcal, setFatKcal] = useState<number>(0);
  const [fatGrams, setFatGrams] = useState<number>(0);
  const { bodyType, weight, gender, activity, height, age } = inputs;

  const calculateBMR = (
    gender: GendersTypes,
    weight: number,
    height: number,
    age: number
  ) => {
    if (gender === "FEMALE") {
      return 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
    } else {
      return 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
    }
  };

  const calculateTDEE = (bmr: number, activity: Activities) => {
    return bmr * TDDE_CONSTANTS[activity];
  };

  const handleTDCIChange = useCallback(async () => {
    if (gender && weight && height && age) {
      const bmrValue = calculateBMR(gender, weight, height, age);
      setBMR(bmrValue);

    }

    if (bmr && activity) {
      const tdeeValue = calculateTDEE(bmr, activity);
      setTDEE(tdeeValue);
    }

    // Target daily calorie intake (TDCI)

    if (tdee && weight && bodyType) {
      const TDCIFormula =
        tdee - weight * WEEKLY_FAT_LOSS_RATE * TDCI_CONSTANT["KILOGRAMS"];
      setTDCI(Math.round(TDCIFormula));
      const percentages = BODYTYPES_CONSTANTS_PERCENTAGES[bodyType];

      setProteinKcal(Math.round((tdci * percentages.PROTEIN) / 100));
      setProteinGrams(proteinKcal / KCAL_TO_GRAMS_CONSTANTS.PROTEIN);

      setCarbKcal(Math.round((tdci * percentages.CARBOHYDRATE) / 100));
      setCarbGrams(carbKcal / KCAL_TO_GRAMS_CONSTANTS.CARBOHYDRATE);

      setFatKcal(Math.round((tdci * percentages.FAT) / 100));
      setFatGrams(fatGrams / KCAL_TO_GRAMS_CONSTANTS.FAT);
    }
  }, [gender, weight, height, age, bmr, activity, tdee, bodyType, tdci, proteinKcal, carbKcal, fatGrams]);

  useEffect(() => {
    handleTDCIChange();
    const timer = setInterval(handleTDCIChange, POLLING_FREQUENCY_MS);

    setResults([
      {
        id: "PROTEIN",
        name: "Protein",
        resultKcal: proteinKcal,
        resultGrams: proteinGrams,
        total: tdci,
      },
      {
        id: "CARBOHYDRATES",
        name: "Carbohydrates",
        resultKcal: carbKcal,
        resultGrams: carbGrams,
        total: tdci,
      },
      {
        id: "FAT",
        name: "Fat",
        resultKcal: fatKcal,
        resultGrams: fatGrams,
        total: tdci,
      },
    ]);
    return () => clearInterval(timer);
  }, [
    tdci,
    proteinKcal,
    carbKcal,
    fatKcal,
    proteinGrams,
    carbGrams,
    fatGrams,
    handleTDCIChange,
  ]);

  return (
    <Card className="flex flex-col p-4 border border-gray-100 rounded-lg cursor-pointer items-center gap-4 w-96 h-72">
      <CardTitle>Caloric Intakes</CardTitle>
      <CardContent className="flex flex-col justify-center items-center">
        <CaloricIntakeCard
          key={"TOTAL"}
          name={"total"}
          resultKcal={tdci}
          resultGrams={1}
          total={tdci}
        />
        <div className="flex items-center ">
          {results.map((intake) => (
            <CaloricIntakeCard
              key={intake.id}
              name={intake.name}
              resultKcal={intake.resultKcal}
              resultGrams={intake.resultGrams}
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
