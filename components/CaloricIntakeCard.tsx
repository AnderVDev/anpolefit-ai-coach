import React from "react";

interface CaloricIntakeCardProps {
  name: string;
  icon: JSX.Element;
  result: number;
}

function CaloricIntakeCard({ name, icon, result }: CaloricIntakeCardProps) {
  return (
    <div className="flex justify-center flex-col items-center border border-gray-100 rounded-lg p-4">
      <div className="border-2 border-gray-100  rounded-full p-2 m-2">
        {icon}
      </div>
      <h2 className="font-bold text-xl">{name}</h2>
      <p>{result}</p>
    </div>
  );
}

export default CaloricIntakeCard;
