import { Card } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import OptionsCard from "../../OptionsCard";
import buildImage from "@/app/assets/build_anpolefit.png";
import recompositionImage from "@/app/assets/recomposition_anpole.png";

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

interface StepTwoProps {
  onExpectationChange: (expectation: Expectations | null) => void;
}

function StepTwo({ onExpectationChange }: StepTwoProps) {
  const [selectedExpectation, setSelectedExpectation] =
    useState<Expectations | null>(null);
  const handleSelectExpectation = (expectationId: Expectations) => {
    setSelectedExpectation(expectationId);
  };

  useEffect(() => {
    onExpectationChange(selectedExpectation);
  }, [selectedExpectation]);
  return (
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
  );
}

export default StepTwo;
