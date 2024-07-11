"use client"
import React, { useState } from "react";
import { Check } from 'lucide-react';
import { Button } from "./ui/button";
import StepContent from "./StepContent";

const Stepper = () => {
  const steps = ["About You", "Expectations", "Body Type", "Results"];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);

  return (
    <div  className="flex flex-col items-center">
      <div className="flex justify-between mb-4 ">
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
                  i + 1 < currentStep || complete ? "bg-green-600" : "bg-slate-200"
                }`}
              />
            )}
            <div
              className={`w-10 h-10 flex items-center justify-center z-10 relative rounded-full font-semibold text-white ${
                i + 1 < currentStep || complete
                  ? "bg-green-600"
                  : currentStep === i + 1
                  ? "bg-sky-600"
                  : "bg-slate-700"
              }`}
            >
              {i + 1 < currentStep || complete ? <Check size={24} /> : i + 1}
            </div>
            <p className={i + 1 < currentStep || complete ? "text-white" : "text-gray-500"}>{step}</p>
          </div>
        ))}
      </div>
      <StepContent />
      <Button
          className="btn mt-4 px-4 py-2 bg-sky-600 text-white rounded cursor-pointer w-36"
          onClick={() => {
            currentStep === steps.length
              ? setComplete(true)
              : setCurrentStep((prev) => prev + 1);
          }}
        >
          {currentStep >= steps.length -1 ? "Finish" : "Next"}
        </Button>
      {/* {!complete && (
        <Button
          className="btn mt-4 px-4 py-2 bg-sky-600 text-white rounded cursor-pointer w-36"
          onClick={() => {
            currentStep === steps.length
              ? setComplete(true)
              : setCurrentStep((prev) => prev + 1);
          }}
        >
          {currentStep === steps.length ? "Finish" : "Next"}
        </Button>
      )} */}
    </div>
  );
};

export default Stepper;
