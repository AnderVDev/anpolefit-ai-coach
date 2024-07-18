import React, { useState } from "react";
import { Card, CardContent, CardTitle } from "../ui/card";
import ActivityCard from "../ActivityCard";
import OptionsCard from "./OptionsCard";
import { Beef, Wheat, Nut, UserRound } from "lucide-react";
import GenderCard from "./steps/one/GenderCard";
import CaloricIntakeCard from "./steps/four/CaloricIntakeCard";
import buildImage from "@/app/assets/build_anpolefit.png";
import recompositionImage from "@/app/assets/recomposition_anpole.png";
import ectomorphBody from "@/app/assets/Ectomorph_body.jpg";
import mesomorphBody from "@/app/assets/Mesomorph_body.jpg";
import endomorphBody from "@/app/assets/Endomorph_body.png";
import RadialProgress from "../RadialProgress";
import { Counter } from "./steps/one/Counter";
import Metrics from "./steps/one/Metrics";
import StepOne from "./steps/one";

const cardStyle =
  "flex items-center flex-col p-2 border border-gray-200 rounded-lg cursor-pointer items-center w-80 h-48";



type Expectations = "BUILD" | "RECOMPOSITION";
const expectations = [
  {
    id: "BUILD",
    name: "Build Muscle",
    description:
      "Focuses on increasing muscle mass through resistance training and adequate nutrition. Examples: Lifting weights, strength training exercises targeting specific muscle groups.",
    image: buildImage,
  },
  {
    id: "RECOMPOSITION",
    name: "Body Recomposition",
    description:
      "Aims to simultaneously reduce body fat and increase muscle mass to change body composition. Examples: Combining strength training with cardiovascular exercises and a balanced diet to achieve a leaner physique.",
    image: recompositionImage,
  },
];

type BodiesTypes = "ECTOMORPH" | "MESOMORPH" | "ENDOMORPH";
const bodiesTypes = [
  {
    id: "ECTOMORPH",
    name: "Ectomorph",
    description:
      "Characterized by a slim, lean build with a fast metabolism. Ectomorphs often find it difficult to gain weight and muscle. Examples: Narrow shoulders and hips, low body fat, and long limbs",
    image: ectomorphBody,
  },
  {
    id: "MESOMORPH",
    name: "Mesomorph",
    description:
      "Typically has a muscular, well-defined build with a natural ability to gain muscle and strength easily. Examples: Broad shoulders, narrow waist, and a generally athletic appearance.",
    image: mesomorphBody,
  },
  {
    id: "ENDOMORPH",
    name: "Endomorph",
    description:
      "Tends to have a higher body fat percentage with a rounder physique. Endomorphs may find it easier to gain weight but struggle to lose fat. Examples: Wider waist, larger bone structure, and more fat accumulation in the lower body.",
    image: endomorphBody,
  },
];

const TDDE_CONSTANTS = [
  {
    SEDENTARY: 1.2,
    LIGHT: 1.375,
    MODERATE: 1.55,
    VERY: 1.725,
  },
];

const BODYTYPES_CONSTANTS_PERCENTAGES = [
  {
    ECTOMORPH: {
      PROTEIN: 25,
      CARBOHYDRATE: 55,
      FAT: 20,
    },
  },
  {
    MESOMORPH: {
      PROTEIN: 30,
      CARBOHYDRATE: 40,
      FAT: 30,
    },
  },
  {
    ENDOMORPH: {
      PROTEIN: 40,
      CARBOHYDRATE: 25,
      FAT: 35,
    },
  },
];

const KCAL_TO_GRAMS_CONSTANTS = {
  PROTEIN: 4,
  CARBOHYDRATE: 4,
  FAT: 4,
};

// const BODYTYPES_CONSTANTS_KCAL = [
//   {
//     ECTOMORPH: {
//       PROTEIN: 343,
//       CARBOHYDRATE: 755,
//       FAT: 275,
//     },
//   },
//   {
//     MESOMORPH: {
//       PROTEIN: 412,
//       CARBOHYDRATE: 549,
//       FAT: 412,
//     },
//   },
//   {
//     ENDOMORPH: {
//       PROTEIN: 549,
//       CARBOHYDRATE: 343,
//       FAT: 481,
//     },
//   },
// ];

// const BODYTYPES_CONSTANTS_GRAMS = [
//   {
//     ECTOMORPH: {
//       PROTEIN: 86,
//       CARBOHYDRATE: 189,
//       FAT: 31,
//     },
//   },
//   {
//     MESOMORPH: {
//       PROTEIN: 103,
//       CARBOHYDRATE: 137,
//       FAT: 46,
//     },
//   },
//   {
//     ENDOMORPH: {
//       PROTEIN: 137,
//       CARBOHYDRATE: 86,
//       FAT: 53,
//     },
//   },
// ];

const caloricIntakes = [
  {
    id: "PROTEIN",
    name: "Protein",
    icon: <Beef />,
    result: 750,
    total: 1950,
  },
  {
    id: "CARBOHYDRATES",
    name: "Carbohydrates",
    icon: <Wheat />,
    result: 650,
    total: 1950,
  },
  {
    id: "FAT",
    name: "Fat",
    icon: <Nut />,
    result: 550,
    total: 1950,
  },
];
interface CaloricIntake {
  id: string;
  name: string;
  icon: JSX.Element;
  result: number;
  total: number;
}
const initialCaloricIntakes: CaloricIntake[] = [
  { id: "PROTEIN", name: "Protein", icon: <Beef />, result: 0, total: 0 },
  {
    id: "CARBOHYDRATES",
    name: "Carbohydrates",
    icon: <Wheat />,
    result: 0,
    total: 0,
  },
  { id: "FAT", name: "Fat", icon: <Nut />, result: 0, total: 0 },
];

interface StepContentProp {
  step: number;
}

function StepContent({ step }: StepContentProp) {
  // states
  // const [selectedGender, setSelectedGender] = useState<GendersTypes | null>(
  //   null
  // );
  // const [age, setAge] = useState<number>(0);
  // const [weight, setWeight] = useState<number>(0);
  // const [height, setHeight] = useState<number>(0);

  // const [selectedActivity, setSelectedActivity] = useState<Activities | null>(
    //   null
    // );
    const [selectedExpectation, setSelectedExpectation] =
    useState<Expectations | null>(null);
    const [selectedBodyType, setSelectedBodyType] = useState<BodiesTypes | null>(
      null
    );
    
    const [results, setResults] = useState<CaloricIntake[]>(
      initialCaloricIntakes
    );

  const handleSelectExpectation = (expectationId: Expectations) => {
    setSelectedExpectation(expectationId);
  };
  const handleSelectBodyType = (bodyTypeId: BodiesTypes) => {
    setSelectedBodyType(bodyTypeId);
    handleCalculate()
  };

  const calculateBMR = () => {
    // if (!selectedGender || !weight || !height) return 0;
    if (selectedGender === "MALE") {
      return 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
    } else {
      return 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
    }
  };

  const calculateTDEE = (bmr: number) => {
    // const bmr = calculateBMR();
    // if (!selectedActivity || !selectedGender) return 0;
    return bmr * TDDE_CONSTANTS[selectedActivity];
  };

  const calculateMacros = () => {
    if (
      !selectedGender ||
      !weight ||
      !height ||
      !selectedActivity ||
      !selectedBodyType
    )
      return initialCaloricIntakes;
    const bmr = calculateBMR();
    const tdee = calculateTDEE(bmr);
    // if (!selectedBodyType) return initialCaloricIntakes;

    const percentages = BODYTYPES_CONSTANTS_PERCENTAGES[selectedBodyType];
    const proteinKcal = (tdee * percentages.PROTEIN) / 100;
    const carbKcal = (tdee * percentages.CARBOHYDRATE) / 100;
    const fatKcal = (tdee * percentages.FAT) / 100;

    return [
      {
        id: "PROTEIN",
        name: "Protein",
        icon: <Beef />,
        result: proteinKcal / KCAL_TO_GRAMS_CONSTANTS.PROTEIN,
        total: tdee,
      },
      {
        id: "CARBOHYDRATES",
        name: "Carbohydrates",
        icon: <Wheat />,
        result: carbKcal / KCAL_TO_GRAMS_CONSTANTS.CARBOHYDRATE,
        total: tdee,
      },
      {
        id: "FAT",
        name: "Fat",
        icon: <Nut />,
        result: fatKcal / KCAL_TO_GRAMS_CONSTANTS.FAT,
        total: tdee,
      },
    ];
  };

  const handleCalculate = () => {
    // const bmr = calculateBMR();
    // const tdee = calculateTDEE(bmr);
    const macros = calculateMacros();
    setResults(macros);
  };

  return (
    <div className="flex items-center ">
      {step === 1 && (
        <StepOne />
        // <Card className="flex items-center  flex-col flex-grow border border-gray-200 rounded-lg gap-2">
        //   {}
        //   <div className="m-4 grid grid-col-1 justify-items-center gap-4 md:grid-cols-2">
        //     <div className="flex justify-between flex-col items-center w-80 h-60">
        //       {/* Gender */}
        //       <Card className={`${cardStyle} p-0 h-24 w-64`}>
        //         <CardTitle className="my-2 text-base">Gender</CardTitle>
        //         <CardContent className="flex items-center p-0 gap-2 ">
        //           {genders.map((gender) => (
        //             <GenderCard
        //               key={gender.id}
        //               gender={gender.gender}
        //               icon={gender.icon}
        //               selected={gender.id === selectedGender}
        //               onSelect={() => {
        //                 handleSelectGender(gender.id as GendersTypes);
        //               }}
        //             />
        //           ))}
        //         </CardContent>
        //       </Card>

        //       {/* Age */}
        //       <Card className={`${cardStyle} p-0 h-32 w-64`}>
        //         <CardTitle className="my-2 text-base">Age</CardTitle>
        //         <CardContent className="p-0">
        //           <Counter
        //             minLevel={10}
        //             maxLevel={150}
        //             steps={1}
        //             initialValue={18}
        //             label={"years old"}
        //             onChange={setAge}
        //           />
        //         </CardContent>
        //       </Card>
        //     </div>

        //     {/* metrics */}
        //     <Card className="flex items-center flex-col flex-grow border border-gray-200 rounded-lg cursor-pointer w-64 h-60 ">
        //       <CardContent className="p-2">
        //         <Metrics
        //           onWeightChange={setWeight}
        //           onHeightChange={setHeight}
        //         />
        //       </CardContent>
        //     </Card>
        //   </div>

        //   {/* activity */}
        //   <Card className="flex flex-col p-2 border border-gray-200 rounded-lg cursor-pointer items-center  h-auto w-64 md:w-[590px] mb-4 ">
        //     <CardTitle className="mb-2 text-base">
        //       How Active Are You?
        //     </CardTitle>
        //     <CardContent className="grid grid-col-1 md:grid-cols-2 gap-2">
        //       {activities.map((activity) => (
        //         <ActivityCard
        //           key={activity.id}
        //           title={activity.title}
        //           description={activity.description}
        //           image={activity.image}
        //           selected={activity.id === selectedActivity}
        //           onSelect={() => {
        //             handleSelectActivity(activity.id as Activities);
        //           }}
        //         />
        //       ))}
        //     </CardContent>
        //   </Card>
        // </Card>
      )}

      {step === 2 && (
        <Card className="cursor-pointer gap-0 border border-gray-200 rounded-lg">
          <div className=" grid grid-col-1 justify-items-center md:grid-cols-2 overflow-hidden">
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
          </div>
        </Card>
      )}

      {step === 3 && (
        <Card className="cursor-pointer gap-0 border border-gray-200 rounded-lg">
          <div className=" grid grid-col-1 justify-items-center md:grid-cols-3 overflow-hidden">
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
          </div>
        </Card>
        // <Card className="flex flex-wrap border border-gray-200 rounded-lg cursor-pointer items-center flex-col md:flex-row">

        // </Card>
      )}

      {step === 4 && (
        <Card className="flex flex-col p-4 border border-gray-100 rounded-lg cursor-pointer items-center gap-4 w-96 h-72">
          <CardTitle>Caloric Intakes</CardTitle>
          <CardContent className="flex flex-col justify-center items-center">
            <CaloricIntakeCard
              key={"TOTAL"}
              name={"total"}
              icon={<Beef />}
              result={1950}
              total={1950}
            />
            <div className="flex items-center ">
              {results.map((intake) => (
                <CaloricIntakeCard
                  key={intake.id}
                  name={intake.name}
                  icon={intake.icon}
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
      )}
    </div>
  );
}

export default StepContent;
