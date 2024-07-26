import StepOne from "./steps/one";
import StepTwo from "./steps/two";
import StepThree from "./steps/three";
import StepFour from "./steps/four";
import { useState } from "react";

interface StepContentProps {
  step: number;
}
interface StepOneData {
  age: number | null;
  weight: number | null;
  height: number | null;
  bmr: number | null;
  tdee: number | null;
  selectedGender: "MALE" | "FEMALE" | null;
  selectedActivity: "SEDENTARY" | "LIGHT" | "MODERATE" | "VERY" | null;
  isError: boolean;
}

function StepContent({ step }: StepContentProps) {
  const [expectation, setExpectation] = useState<
    "BUILD" | "RECOMPOSITION" | null
  >(null);
  const [bodyType, setBodyType] = useState<
    "ECTOMORPH" | "MESOMORPH" | "ENDOMORPH" | null
  >(null);

  const [stepOneData, setStepOneData] = useState<StepOneData>({
    age: null,
    weight: null,
    height: null,
    bmr: null,
    tdee: null,
    selectedGender: null,
    selectedActivity: null,
    isError: true,
  });

  const inputs = {
    ...stepOneData,
    expectation: expectation,
    bodyType: bodyType,
  };

  const handleDataChange = (data: {
    age: number | null;
    weight: number | null;
    height: number | null;
    bmr: number | null;
    tdee: number | null;
    selectedGender: "MALE" | "FEMALE" | null;
    selectedActivity: "SEDENTARY" | "LIGHT" | "MODERATE" | "VERY" | null;
    isError: boolean;
  }) => {
    setStepOneData(data);
  };

  console.log({ stepOneData });
  const handleExpectationChange = (
    expectation: "BUILD" | "RECOMPOSITION" | null
  ) => {
    setExpectation(expectation);
  };
  const handleBodyTypeChange = (
    bodyType: "ECTOMORPH" | "MESOMORPH" | "ENDOMORPH" | null
  ) => {
    setBodyType(bodyType);
  };

  return (
    <div className="flex items-center ">
      {step === 1 && <StepOne onDataChange={handleDataChange} />}
      {step === 2 && <StepTwo onExpectationChange={handleExpectationChange} />}
      {step === 3 && <StepThree onBodyTypeChange={handleBodyTypeChange} />}
      {step === 4 && <StepFour inputs={inputs} />}
    </div>
  );
}

export default StepContent;
