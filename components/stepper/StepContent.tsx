import StepOne from "./steps/one";
import StepTwo from "./steps/two";
import StepThree from "./steps/three";
import StepFour from "./steps/four";
import { useCallback, useEffect, useState } from "react";

const POLLING_FREQUENCY_MS = 1000;
interface StepContentProps {
  step: number;
  HandleStepCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  HandleCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}
interface StepOneData {
  age: number | null;
  weight: number | null;
  height: number | null;
  gender: "MALE" | "FEMALE" | null;
  activity: "SEDENTARY" | "LIGHT" | "MODERATE" | "VERY" | null;
}
function StepContent({
  step,
  HandleStepCompleted,
  HandleCurrentStep,
}: StepContentProps) {

  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
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
    gender: null,
    activity: null,
  });
  console.log("stepOneData in Content", stepOneData);

  const inputs = {
    ...stepOneData,
    expectation: expectation,
    bodyType: bodyType,
  };

  const handleStepOneDataChange = useCallback(
    async (data: {
      age: number | null;
      weight: number | null;
      height: number | null;
      gender: "MALE" | "FEMALE" | null;
      activity: "SEDENTARY" | "LIGHT" | "MODERATE" | "VERY" | null;
    }) => {
      setStepOneData(data);
    },
    []
  );

  // console.log({ stepOneData });
  const handleStepTwoDataChange = useCallback(
    async (expectation: "BUILD" | "RECOMPOSITION" | null) => {
      setExpectation(expectation);
    },
    []
  );
  const handleStepThreeDataChange = useCallback(
    async (bodyType: "ECTOMORPH" | "MESOMORPH" | "ENDOMORPH" | null) => {
      setBodyType(bodyType);
    },
    []
  );
  const nextStep = () => {
    console.log("nextStep");
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      handleStepOneDataChange;
    }, POLLING_FREQUENCY_MS);
    return () => clearTimeout(timer);
  }, [handleStepOneDataChange]);

  return (
    <div className="flex items-center ">
      {step === 1 && (
        <StepOne
          onDataChange={handleStepOneDataChange}
          onStepSubmitSuccess={HandleStepCompleted}
          onStepSuccess={HandleCurrentStep}
        />
      )}
      {step === 2 && <StepTwo onExpectationChange={handleStepTwoDataChange} />}
      {step === 3 && <StepThree onBodyTypeChange={handleStepThreeDataChange} />}
      {step === 4 && <StepFour inputs={inputs} />}
    </div>
  );
}

export default StepContent;
