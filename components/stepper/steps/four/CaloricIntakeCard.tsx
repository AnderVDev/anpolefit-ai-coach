import React from "react";
import RadialProgress from "../../../RadialProgress";
interface CaloricIntakeCardProps {
  name: string;
  resultKcal: number;
  resultGrams: number;
  total: number;
}

function CaloricIntakeCard({
  name,
  resultKcal,
  resultGrams,
  total,
}: CaloricIntakeCardProps) {
  return (
    <div className="flex justify-center flex-col items-center p-4">
      <RadialProgress
        name={name}
        valueKcal={resultKcal}
        valueGrams={resultGrams}
        total={total}
      />
      <h2 className="font-bold text-lg">{name}</h2>
    </div>
  );
}

export default CaloricIntakeCard;
