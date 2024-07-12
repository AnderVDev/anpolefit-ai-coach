import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import { Counter } from "./Counter";
import Metrics from "./Metrics";
import ActivityCard from "./ActivityCard";
import OptionsCard from "./OptionsCard";
import { Beef, Wheat, Nut, UserRound } from "lucide-react";
import GenderCard from "./GenderCard";
import CaloricIntakeCard from "./CaloricIntakeCard";

const cardStyle =
  "flex flex-col p-4 border border-gray-100 rounded-lg cursor-pointer items-center";

const genders = [
  {
    id: "MALE",
    gender: "Male",
    icon: <UserRound />,
  },
  {
    id: "FEMALE",
    gender: "Female",
    icon: <UserRound />,
  },
];
type GendersTypes = "MALE" | "FEMALE";

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

const caloricIntakes = [
  {
    id: "PROTEIN",
    name: "Protein",
    icon: <Beef />,
    result: 700,
  },
  {
    id: "CARBOHYDRATES",
    name: "Carbohydrates",
    icon: <Wheat />,
    result: 450,
  },
  {
    id: "FAT",
    name: "Fat",
    icon: <Nut />,
    result: 450,
  },
];

function StepContent({ step }: StepContentProp) {
  // states
  const [selectedGender, setSelectedGender] = useState<GendersTypes | null>(
    null
  );
  const [selectedActivity, setSelectedActivity] = useState<Activities | null>(
    null
  );
  const [selectedExpectation, setSelectedExpectation] =
    useState<Expectations | null>(null);
  const [selectedBodyType, setSelectedBodyType] = useState<BodiesTypes | null>(
    null
  );

  const handleSelectGender = (genderId: GendersTypes) => {
    setSelectedGender(genderId);
  };
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
        <Card className="flex flex-grow flex-col p-4 border border-gray-200 rounded-lg ">
          <div className="grid grid-col-1 md:grid-cols-2 gap-4 m-4">
            {/* Gender */}
            <Card className={`${cardStyle}`}>
              <CardTitle>Gender</CardTitle>
              <CardContent className="flex gap-4 m-4">
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
            <Card className={`${cardStyle}`}>
              <CardTitle>Age</CardTitle>
              <CardContent>
                <Counter
                  minLevel={10}
                  maxLevel={150}
                  steps={1}
                  initialValue={18}
                  label={"years old"}
                />
              </CardContent>
            </Card>
          </div>

          {/* metrics */}
          <Card className="flex flex-col p-4 border border-gray-200 rounded-lg cursor-pointer items-center m-4">
            <CardContent>
              <Metrics />
            </CardContent>
          </Card>

          {/* activity */}
          <Card className="flex flex-col p-4 border border-gray-200 rounded-lg cursor-pointer items-center m-4">
            <CardTitle className="mb-2">How Active Are You?</CardTitle>
            <CardContent className="grid grid-col-1 md:grid-cols-2 gap-4">
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
        <Card className="flex flex-col p-4 border border-gray-100 rounded-lg cursor-pointer items-center gap-4">
          <CardTitle>Caloric Intakes</CardTitle>
          <CardContent className="flex flex-col items-center">
            <div className="border-2 border-gray-100  rounded-full p-2">
              1950
            </div>
            <div className="flex items-center my-4 gap-4">
              {caloricIntakes.map((intake) => (
                <CaloricIntakeCard
                  key={intake.id}
                  name={intake.name}
                  icon={intake.icon}
                  result={intake.result}
                />
              ))}
            </div>
            <CardDescription>
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
            </CardDescription>
          </CardContent>

          {/* <div className="flex flex-wrap border border-gray-200 rounded-lg cursor-pointer items-center flex-col ">
            <div className="flex flex-col items-center gap-2"></div>
            <div className="flex gap-4 m-4 p-4">
              <div>
                <h2>Protein</h2>
                <div className="w-10 h-10 flex items-center justify-center z-10 relative bg-slate-500 rounded-full">
                  <Beef />
                </div>
                <p>result</p>
              </div>

              <div className="mb-4 flex justify-center flex-col items-center">
                <h2 className="text-primary-500">Carbohydrates</h2>
                <div className="border-2 border-gray-100 bg-primary-100 rounded-full p-2">
                  <Wheat />
                </div>
                <p>result</p>
              </div>

              <div>
                <h2>Fat</h2>
                <div className="w-10 h-10 flex items-center justify-center z-10 relative bg-slate-500 rounded-full">
                  <Nut />
                </div>
                <p>result</p>
              </div>
            </div>
          </div> */}
        </Card>
      )}
    </div>
  );
}

export default StepContent;
