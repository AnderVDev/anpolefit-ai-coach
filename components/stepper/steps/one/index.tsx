import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { Counter } from "./Counter";
import Metrics from "./Metrics";
import ActivityCard from "@/components/ActivityCard";
import { UserRound } from "lucide-react";
import GenderCard from "./GenderCard";

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
  }) => void;
}

function StepOne({ onDataChange }: StepOneProps) {
  const [age, setAge] = useState<number>(18);
  const [weight, setWeight] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [selectedGender, setSelectedGender] = useState<GendersTypes | null>(
    null
  );
  const [selectedActivity, setSelectedActivity] = useState<Activities | null>(
    null
  );

  const [data, setData] = useState({
    age: 18,
    weight: 0,
    height: 0,
    bmr: null as number | null,
    tdee: null as number | null,
    selectedGender: null as GendersTypes | null,
    selectedActivity: null as Activities | null,
  });

  const handleSelectGender = (genderId: GendersTypes) => {
    setSelectedGender(genderId);
  };

  const handleSelectActivity = (activityId: Activities) => {
    setSelectedActivity(activityId);
  };

  const calculateBMR = () => {
    if (!selectedGender || !weight || !height) return 0;
    return selectedGender === "FEMALE"
      ? 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age
      : 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
  };

  const calculateTDEE = (bmr: number) => {
    if (!selectedActivity || !selectedGender || !weight || !height) return 0;
    return bmr * TDDE_CONSTANTS[selectedActivity];
  };

  useEffect(() => {
    const BMRValue = calculateBMR();
    const TDEEValue = calculateTDEE(BMRValue);
    onDataChange({
      age,
      weight,
      height,
      bmr: BMRValue,
      tdee: TDEEValue,
      selectedGender,
      selectedActivity,
    });
  }, [age, weight, height, selectedGender, selectedActivity]);

  return (
    <Card className="flex items-center flex-col flex-grow border border-gray-200 rounded-lg gap-2">
      <div className="m-4 grid grid-col-1 justify-items-center gap-4 md:grid-cols-2">
        <div className="flex justify-between flex-col items-center w-80 h-60">
          <Card className={`${cardStyle} p-0 h-24 w-64`}>
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
          <Card className={`${cardStyle} p-0 h-32 w-64`}>
            <CardTitle className="my-2 text-base">Age</CardTitle>
            <CardContent className="p-0">
              <Counter
                minLevel={10}
                maxLevel={150}
                steps={1}
                initialValue={age}
                label={"years old"}
                onChange={setAge}
              />
            </CardContent>
          </Card>
        </div>
        <Card className="flex items-center flex-col flex-grow border border-gray-200 rounded-lg cursor-pointer w-64 h-60">
          <CardContent className="p-2">
            <Metrics onWeightChange={setWeight} onHeightChange={setHeight} />
          </CardContent>
        </Card>
      </div>
      <Card className="flex flex-col p-2 border border-gray-200 rounded-lg cursor-pointer items-center h-auto w-64 md:w-[590px] mb-4">
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
