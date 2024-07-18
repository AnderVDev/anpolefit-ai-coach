import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
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
    description: "minimal physical activity.",
    // description:
    //   "Involves minimal physical activity throughout the day, primarily sitting or lying down. Examples: Desk jobs, watching TV, reading.",
    image: "image",
  },
  {
    id: "LIGHT",
    title: "Light Activity",
    description: "Walking short distances ",
    // description:
    //   "Includes light physical activities that don't significantly increase heart rate. Examples: Walking short distances, light household chores like cooking or washing dishes. ",
    image: "image",
  },
  {
    id: "MODERATE",
    title: "Moderate Activity",
    description: "Brisk walking, recreational swimming, gardening.",
    // description:
    //   "Involves activities that increase heart rate and may cause a light sweat. Examples: Brisk walking, recreational swimming, gardening.",
    image: "image",
  },
  {
    id: "VERY",
    title: "Very Active",
    description: "Running, cycling at a fast pace, playing competitive sports.",
    // description:
    //   "Includes intense physical activities that significantly increase heart rate and cause sweating. Examples: Running, cycling at a fast pace, playing competitive sports.",
    image: "image",
  },
];

type GendersTypes = "MALE" | "FEMALE";
const genders = [
  {
    id: "MALE",
    gender: "Male",
    icon: <UserRound size={16} />,
  },
  {
    id: "FEMALE",
    gender: "Female",
    icon: <UserRound size={16} />,
  },
];

function StepOne() {
  const [age, setAge] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  const [selectedGender, setSelectedGender] = useState<GendersTypes | null>(
    null
  );

  const [selectedActivity, setSelectedActivity] = useState<Activities | null>(
    null
  );
  const handleSelectGender = (genderId: GendersTypes) => {
    setSelectedGender(genderId);
  };
  const handleSelectActivity = (activityId: Activities) => {
    setSelectedActivity(activityId);
  };

  return (
    <Card className="flex items-center  flex-col flex-grow border border-gray-200 rounded-lg gap-2">
      {}
      <div className="m-4 grid grid-col-1 justify-items-center gap-4 md:grid-cols-2">
        <div className="flex justify-between flex-col items-center w-80 h-60">
          {/* Gender */}
          <Card className={`${cardStyle} p-0 h-24 w-64`}>
            <CardTitle className="my-2 text-base">Gender</CardTitle>
            <CardContent className="flex items-center p-0 gap-2 ">
              {genders.map((gender) => (
                <GenderCard
                  key={gender.id}
                  gender={gender.gender}
                  icon={gender.icon}
                  selected={gender.id === selectedGender}
                  onSelect={() => {
                    handleSelectGender(gender.id as GendersTypes);
                  }}
                />
              ))}
            </CardContent>
          </Card>

          {/* Age */}
          <Card className={`${cardStyle} p-0 h-32 w-64`}>
            <CardTitle className="my-2 text-base">Age</CardTitle>
            <CardContent className="p-0">
              <Counter
                minLevel={10}
                maxLevel={150}
                steps={1}
                initialValue={18}
                label={"years old"}
                onChange={setAge}
              />
            </CardContent>
          </Card>
        </div>

        {/* metrics */}
        <Card className="flex items-center flex-col flex-grow border border-gray-200 rounded-lg cursor-pointer w-64 h-60 ">
          <CardContent className="p-2">
            <Metrics onWeightChange={setWeight} onHeightChange={setHeight} />
          </CardContent>
        </Card>
      </div>

      {/* activity */}
      <Card className="flex flex-col p-2 border border-gray-200 rounded-lg cursor-pointer items-center  h-auto w-64 md:w-[590px] mb-4 ">
        <CardTitle className="mb-2 text-base">How Active Are You?</CardTitle>
        <CardContent className="grid grid-col-1 md:grid-cols-2 gap-2">
          {activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              title={activity.title}
              description={activity.description}
              image={activity.image}
              selected={activity.id === selectedActivity}
              onSelect={() => {
                handleSelectActivity(activity.id as Activities);
              }}
            />
          ))}
        </CardContent>
      </Card>
    </Card>
  );
}

export default StepOne;
