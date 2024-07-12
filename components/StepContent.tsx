import React, { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Counter } from "./Counter";
import Metrics from "./Metrics";
import ActivityCard from "./ActivityCard";
import OptionsCard from "./OptionsCard";
import { Beef, Wheat, Nut } from "lucide-react";

const cardStyle =
  "flex flex-col p-4 border border-gray-200 rounded-lg cursor-pointer items-center";

const genders = [
  {
    id: "MALE",
    gender: "Male",
  },
  {
    id: "FEMALE",
    gender: "Female",
  },
];

const activities = [
  {
    id: "SEDENTARY",
    title: "Sedentary",
    description:
      "Involves minimal physical activity throughout the day, primarily sitting or lying down. Examples: Desk jobs, watching TV, reading.",
    image: "txt",
  },
  {
    id: "LIGHT",
    title: "Light Activity",
    description:
      "Includes light physical activities that don't significantly increase heart rate. Examples: Walking short distances, light household chores like cooking or washing dishes. ",
    image: "txt",
  },
  {
    id: "MODERATE",
    title: "Moderate Activity",
    description:
      "Involves activities that increase heart rate and may cause a light sweat. Examples: Brisk walking, recreational swimming, gardening.",
    image: "txt",
  },
  {
    id: "VERY",
    title: "Very Active",
    description:
      "Includes intense physical activities that significantly increase heart rate and cause sweating. Examples: Running, cycling at a fast pace, playing competitive sports.",
    image: "txt",
  },
];
type Activities = "SEDENTARY" | "LIGHT" | "MODERATE" | "VERY";

const expectations = [
  {
    id: "BUILD",
    name: "Build Muscle",
    description:
      "Focuses on increasing muscle mass through resistance training and adequate nutrition. Examples: Lifting weights, strength training exercises targeting specific muscle groups.",
    image: "TXT",
  },
  {
    id: "RECOMPOSITION",
    name: "Body Recomposition",
    description:
      "Aims to simultaneously reduce body fat and increase muscle mass to change body composition. Examples: Combining strength training with cardiovascular exercises and a balanced diet to achieve a leaner physique.",
    image: "TXT",
  },
];
type Expectations = "BUILD" | "RECOMPOSITION";

const bodiesTypes = [
  {
    id: "ECTOMORPH",
    name: "Ectomorph",
    description:
      "Characterized by a slim, lean build with a fast metabolism. Ectomorphs often find it difficult to gain weight and muscle. Examples: Narrow shoulders and hips, low body fat, and long limbs",
    image: "TXT",
  },
  {
    id: "MESOMORPH",
    name: "Mesomorph",
    description:
      "Typically has a muscular, well-defined build with a natural ability to gain muscle and strength easily. Examples: Broad shoulders, narrow waist, and a generally athletic appearance.",
    image: "TXT",
  },
  {
    id: "ENDOMORPH",
    name: "Endomorph",
    description:
      "Tends to have a higher body fat percentage with a rounder physique. Endomorphs may find it easier to gain weight but struggle to lose fat. Examples: Wider waist, larger bone structure, and more fat accumulation in the lower body.",
    image: "TXT",
  },
];

type BodiesTypes = "ECTOMORPH" | "MESOMORPH" | "ENDOMORPH";
interface StepContentProp {
  step: number;
}

function StepContent({ step }: StepContentProp) {
  const [selectedActivity, setSelectedActivity] = useState<Activities | null>(
    null
  );
  const [selectedExpectation, setSelectedExpectation] =
    useState<Expectations | null>(null);
  const [selectedBodyType, setSelectedBodyType] = useState<BodiesTypes | null>(
    null
  );

  const handleSelectActivity = (activityId: Activities) => {
    setSelectedActivity(activityId);
  };
  const handleSelectExpectation = (expectationId: Expectations) => {
    setSelectedExpectation(expectationId);
  };
  const handleSelectBodyType = (bodyTypeId: BodiesTypes) => {
    setSelectedBodyType(bodyTypeId);
  };
  return (
    <div>
      {step === 1 && (
        <Card className="flex flex-grow flex-col p-4 border border-gray-200 rounded-lg cursor-pointer">
          <div className="grid grid-col-1 md:grid-cols-2 gap-4 m-4">
            <Card className={`${cardStyle}`}>
              <h2>Gender</h2>
              <div className="flex gap-4">
                {genders.map((gender) => (
                  <Button key={gender.id} className="text-sm m-4">
                    {gender.gender}
                  </Button>
                ))}
              </div>
            </Card>

            <Card className={`${cardStyle}`}>
              <h2>Age</h2>
              <Counter
                minLevel={10}
                maxLevel={150}
                steps={1}
                initialValue={18}
                label={"years old"}
              />
            </Card>
          </div>
          <Card className="flex flex-col p-4 border border-gray-200 rounded-lg cursor-pointer items-center m-4">
            <Metrics />
          </Card>
          <Card className="flex flex-col p-4 border border-gray-200 rounded-lg cursor-pointer items-center m-4">
            <h2 className="font-bold text-xl">How Active Are You?</h2>
            <div className="grid grid-col-1 md:grid-cols-2 gap-4">
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
            </div>
          </Card>
        </Card>
      )}
      {step === 2 && (
        <Card className="flex flex-wrap cursor-pointer">
          {expectations.map((expectation) => (
            <OptionsCard
              key={expectation.id}
              name={expectation.name}
              description={expectation.description}
              image={expectation.image}
              selected={expectation.id === selectedExpectation}
              onSelect={() =>
                handleSelectExpectation(expectation.id as Expectations)
              }
            />
          ))}
        </Card>
      )}
      {step === 3 && (
        <Card className="flex flex-wrap border border-gray-200 rounded-lg cursor-pointer items-center flex-col md:flex-row">
          {bodiesTypes.map((type) => (
            <OptionsCard
              key={type.id}
              name={type.name}
              description={type.description}
              image={type.image}
              selected={type.id === selectedBodyType}
              onSelect={() => handleSelectBodyType(type.id as BodiesTypes)}
            />
          ))}
        </Card>
      )}
      {step === 4 && (
        <div className="flex flex-wrap border border-gray-200 rounded-lg cursor-pointer items-center flex-col ">
          <div className="flex gap-4 m-4 p-4">
            <h2>Ingesta Calorica</h2>
            <p>result</p>
          </div>
          <div className="flex gap-4 m-4 p-4">
            <div>
              <h2>Protein</h2>
              <div className="w-10 h-10 flex items-center justify-center z-10 relative bg-slate-500 rounded-full">
                <Beef color="white" />
              </div>
              <p>result</p>
            </div>

            <div>
              <h2>Carbohydrates</h2>
              <div className="w-10 h-10 flex items-center justify-center z-10 relative bg-slate-500 rounded-full">
                <Wheat color="white" size={24}/>
              </div>
              <p>result</p>
            </div>

            <div>
              <h2>Fat</h2>
              <div className="w-10 h-10 flex items-center justify-center z-10 relative bg-slate-500 rounded-full">
                <Nut color="white" size={24}/>
              </div>
              <p>result</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StepContent;
