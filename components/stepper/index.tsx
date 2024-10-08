"use client";
import React, { useState } from "react";
import { Check } from "lucide-react";
import StepContent from "./StepContent";
// import { Button } from "../ui/button";

const Stepper = () => {
  const steps = ["About You", "Expectations", "Body Type", "Results"];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);

  const handleStepCompleted = (isCompleted: boolean) => {
    if (isCompleted) {
      setComplete(true);
    }
  };

  const handleCurrentStep = (nextStep: number) => {
    if (nextStep > 0 && nextStep <= steps.length) {
      setCurrentStep(nextStep);
      if (nextStep === steps.length) {
        setComplete(true);
      } else {
        setComplete(false);
      }
    }
  };

  const handleBackStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setComplete(false);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between mb-4">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`relative flex flex-col justify-center items-center w-36 ${
              currentStep === i + 1 ? "active" : ""
            } ${i + 1 < currentStep || complete ? "complete" : ""}`}
          >
            {i !== 0 && (
              <div
                className={`absolute w-full h-[3px] right-2/4 top-1/3 -translate-y-2/4 ${
                  i + 1 < currentStep || complete
                    ? "bg-primary-500"
                    : "bg-gray-100"
                }`}
              />
            )}
            <div
              className={`w-10 h-10 flex items-center justify-center z-10 relative rounded-full font-semibold text-gray-20  ${
                i + 1 < currentStep || complete
                  ? "bg-primary-500"
                  : currentStep === i + 1
                  ? "bg-gray-500"
                  : "bg-gray-100"
              }`}
            >
              {i + 1 < currentStep || complete ? <Check size={24} /> : i + 1}
            </div>
            <p>{step}</p>
          </div>
        ))}
      </div>
      <StepContent
        step={currentStep}
        HandleStepCompleted={handleStepCompleted}
        HandleCurrentStep={handleCurrentStep}
        onBackStep={handleBackStep}
      />
      {/* <Button
        className="bg-gray-500 rounded-lg"
        onClick={() => {
          currentStep === steps.length
            ? setComplete(true)
            : setCurrentStep((prev) => prev + 1);
        }}
      >
        {currentStep >= steps.length - 1 ? "Finish" : "Next"}
      </Button> */}
    </div>
  );
};

export default Stepper;
