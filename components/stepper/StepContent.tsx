import StepOne from "./steps/one";
import StepTwo from "./steps/two";
import StepThree from "./steps/three";
import StepFour from "./steps/four";
import { useCallback, useState } from "react";

interface StepContentProps {
  step: number;
  HandleStepCompleted: (isCompleted: boolean) => void;
  HandleCurrentStep: (nextStep: number) => void;
  onBackStep: () => void;
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
  onBackStep,
}: StepContentProps) {
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

  const inputs = {
    ...stepOneData,
    expectation,
    bodyType,
  };


  const handleStepOneDataChange = useCallback((data: StepOneData) => {
    setStepOneData(data);
  }, []);

  const handleStepTwoDataChange = useCallback(
    (expectation: "BUILD" | "RECOMPOSITION" | null) => {
      setExpectation(expectation);
    },
    []
  );
  const handleStepThreeDataChange = useCallback(
    (bodyType: "ECTOMORPH" | "MESOMORPH" | "ENDOMORPH" | null) => {
      setBodyType(bodyType);
    },
    []
  );

  const handleStepSubmitSuccess = (isCompleted: boolean) => {
    HandleStepCompleted(isCompleted);
    if (isCompleted) {
      HandleCurrentStep(step + 1);
    }
  };

  const handleStepBack = () => {
    if (step > 1) {
      onBackStep();
    }
  };

  return (
    <div className="flex items-center ">
      {step === 1 && (
        <StepOne
          onDataChange={handleStepOneDataChange}
          onStepSubmitSuccess={handleStepSubmitSuccess}
          onStepSuccess={HandleCurrentStep}
        />
      )}
      {step === 2 && (
        <StepTwo
          onExpectationChange={handleStepTwoDataChange}
          onStepSubmitSuccess={handleStepSubmitSuccess}
          onStepSuccess={HandleCurrentStep}
          onStepBack={handleStepBack}
        />
      )}
      {step === 3 && (
        <StepThree
          onBodyTypeChange={handleStepThreeDataChange}
          onStepSubmitSuccess={handleStepSubmitSuccess}
          onStepSuccess={HandleCurrentStep}
          onStepBack={handleStepBack}
        />
      )}
      {step === 4 && (
        <StepFour
          inputs={inputs}
          onStepSubmitSuccess={handleStepSubmitSuccess}
          onStepSuccess={HandleCurrentStep}
          onStepBack={handleStepBack}
        />
      )}
    </div>
  );
}

export default StepContent;
