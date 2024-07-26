import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React, { useCallback, useEffect, useState } from "react";
import Metrics from "./Metrics";
import ActivityCard from "@/components/ActivityCard";
import { UserRound } from "lucide-react";
import GenderCard from "./GenderCard";
import { Input } from "@/components/ui/input";

const cardStyle =
  "flex items-center flex-col p-2 border border-gray-200 rounded-lg cursor-pointer items-center w-80 h-48";

type Activities = "SEDENTARY" | "LIGHT" | "MODERATE" | "VERY";
const activities = [
  {
    id: "SEDENTARY",
    title: "Sedentary",
    description: "Minimal physical activity.",
    image: "image",
  },
  {
    id: "LIGHT",
    title: "Light Activity",
    description: "Walking short distances.",
    image: "image",
  },
  {
    id: "MODERATE",
    title: "Moderate Activity",
    description: "Brisk walking, recreational swimming, gardening.",
    image: "image",
  },
  {
    id: "VERY",
    title: "Very Active",
    description: "Running, cycling at a fast pace, playing competitive sports.",
    image: "image",
  },
];

type GendersTypes = "MALE" | "FEMALE";
const genders = [
  { id: "MALE", gender: "Male", icon: <UserRound size={16} /> },
  { id: "FEMALE", gender: "Female", icon: <UserRound size={16} /> },
];

const TDDE_CONSTANTS = {
  SEDENTARY: 1.2,
  LIGHT: 1.375,
  MODERATE: 1.55,
  VERY: 1.725,
  EXTREMELY: 1.9,
};

interface StepOneProps {
  onDataChange: (data: {
    age: number | null;
    weight: number | null;
    height: number | null;
    bmr: number | null;
    tdee: number | null;
    selectedGender: GendersTypes | null;
    selectedActivity: Activities | null;
    isError: boolean;
  }) => void;
}
const POLLING_FREQUENCY_MS = 1000;

function StepOne({ onDataChange }: StepOneProps) {
  const [age, setAge] = useState<number | null>(null);
  const [weight, setWeight] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);
  const [selectedGender, setSelectedGender] = useState<GendersTypes | null>(
    null
  );
  const [selectedActivity, setSelectedActivity] = useState<Activities | null>(
    null
  );

  const [isError, setIsError] = useState<boolean>(true);
  const [bmr, setBMR] = useState<number | null>(null);
  const [tdee, setTDEE] = useState<number | null>(null);

  const [data, setData] = useState({
    age: age,
    weight: weight,
    height: height,
    bmr: bmr,
    tdee: tdee,
    selectedGender: selectedGender,
    selectedActivity: selectedActivity,
  });

  const handleSelectGender = useCallback(async (genderId: GendersTypes) => {
    setSelectedGender(genderId);
  }, []);

  const handleSelectActivity = useCallback(async (activityId: Activities) => {
    setSelectedActivity(activityId);
  }, []);

  const handleAgeGender = (age: number) => {
    setAge(age);
  };

  const onErrorChange = useCallback(async () => {
    if (age && weight && height && selectedActivity && selectedGender) {
      setIsError((prev) => (prev = false));
    }
  }, [age, height, selectedActivity, selectedGender, weight]);

  // const calculateBMR = useCallback(async () => {
  //   if (!selectedGender || !weight || !height) return 0;

  //   if (age) {
  //     return selectedGender === "FEMALE"
  //       ? setBRM(447.593 + 9.247 * weight + 3.098 * height - 4.33 * age)
  //       : setBRM(88.362 + 13.397 * weight + 4.799 * height - 5.677 * age);
  //   }
  // }, [selectedGender, weight, height, age]);

  const calculateBMR = useCallback(async () => {
    if (!selectedGender || !weight || !height || !age) return;

    const bmrValue =
      selectedGender === "FEMALE"
        ? 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age
        : 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
    setBMR(bmrValue);
  }, [selectedGender, weight, height, age]);

  const calculateTDEE = useCallback(async () => {
    calculateBMR();
    if (!selectedActivity || !bmr) return;
    const tdeeValue = bmr * TDDE_CONSTANTS[selectedActivity];
    setTDEE(tdeeValue);
    onErrorChange();
    onDataChange({
      age,
      weight,
      height,
      bmr,
      tdee: tdeeValue,
      selectedGender,
      selectedActivity,
      isError,
    });
  }, [selectedActivity, bmr, onErrorChange, onDataChange, age, weight, height, selectedGender, isError]);

  // const calculateTDEE = useCallback(
  //   async (bmr: number) => {

  //     if (!selectedActivity) return 0;
  //     return bmr * TDDE_CONSTANTS[selectedActivity];
  //   },
  //   [selectedActivity]
  // );

  useEffect(() => {
    // onErrorChange();
    // const BMRValue = calculateBMR();
    // const TDEEValue = calculateTDEE();
    // const TDEEValue = calculateTDEE(BMRValue);

    // onDataChange({
    //   age,
    //   weight,
    //   height,
    //   bmr: brm,
    //   tdee: TDEEValue,
    //   selectedGender,
    //   selectedActivity,
    //   isError,
    // });
    const timer = setInterval(calculateTDEE, POLLING_FREQUENCY_MS);

    return () => clearInterval(timer);
  }, [calculateTDEE]);

  return (
    <Card className="flex items-center justify-center flex-col flex-grow border border-gray-200 rounded-lg gap-2 p-4">
      <div className="md:w-[590px] grid grid-col-1 md:grid-cols-3 justify-between">
        <div className="md:col-start-1 md:col-span-1 flex justify-between place-content-between flex-col items-center w-64 h-48">
          <Card className={`${cardStyle} p-0 h-28 w-60`}>
            <CardTitle className="my-2 text-base">Gender</CardTitle>
            <CardContent className="flex items-center p-0 gap-2">
              {genders.map((gender) => (
                <GenderCard
                  key={gender.id}
                  gender={gender.gender}
                  icon={gender.icon}
                  selected={gender.id === selectedGender}
                  onSelect={() => handleSelectGender(gender.id as GendersTypes)}
                />
              ))}
            </CardContent>
          </Card>
          <Card className="flex items-center flex-col md:flex-row border justify-center md:gap-4 border-gray-200 rounded-lg cursor-pointer mt-2 p-0 h-28 md:h-24 w-60">
            <CardTitle className="my-2 text-base">Age</CardTitle>
            <CardContent className=" flex flex-col gap-1 items-center p-0">
              <Input
                className="w-14 h-8 mb-2 md:mb-0 p-2"
                type="text"
                placeholder="age"
                onChange={(e) => handleAgeGender(parseFloat(e.target.value))}
              />
            </CardContent>
          </Card>
        </div>

        <Card className="mt-2 md:mt-0 md:mr-4 md:col-end-4 md:col-span-2 flex items-center justify-center flex-col flex-grow border border-gray-200 rounded-lg cursor-pointer w-60 md:w-80 md:h-48 mx-auto">
          <CardContent className="p-2 md:p-0 items-center justify-center">
            <Metrics onWeightChange={setWeight} onHeightChange={setHeight} />
          </CardContent>
        </Card>
      </div>

      {/* Activities */}
      <Card className="flex flex-col border justify-center  border-gray-200 rounded-lg cursor-pointer items-center h-auto w-60 md:w-[590px] mb-4">
        <CardTitle className="mb-2 text-base">How Active Are You?</CardTitle>
        <CardContent className="grid grid-col-1 md:grid-cols-2 gap-2">
          {activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              title={activity.title}
              description={activity.description}
              image={activity.image}
              selected={activity.id === selectedActivity}
              onSelect={() => handleSelectActivity(activity.id as Activities)}
            />
          ))}
        </CardContent>
      </Card>
    </Card>
  );
}

export default StepOne;
