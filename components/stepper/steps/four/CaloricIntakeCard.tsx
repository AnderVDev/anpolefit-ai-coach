import React from "react";
import RadialProgress from "../../../RadialProgress";
interface CaloricIntakeCardProps {
  name: string;
  result: number;
  total: number;
}

function CaloricIntakeCard({ name,  result, total }: CaloricIntakeCardProps) {
  return (
    <div className="flex justify-center flex-col items-center p-4">
      <RadialProgress value={result} total={total} />
      <h2 className="font-bold text-lg">{name}</h2>
    </div>
  );
}

export default CaloricIntakeCard;
