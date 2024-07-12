import React from "react";

const selectedStyle = "ring-2 ring-primary-500 bg-primary-500 bg-opacity-10";
const unselectedStyle = "hover:bg-gray-100";

interface GenderCardProps {
  gender: string;
  icon: JSX.Element;
  selected: boolean;
  onSelect: () => void;
}
function GenderCard({ gender, icon, selected, onSelect }: GenderCardProps) {
  return (
    <div
      className={`flex p-4 gap-4 items-center border border-gray-100 rounded-lg shadow-current cursor-pointer ${
        selected ? selectedStyle : unselectedStyle
      }`}
      onClick={onSelect}
    >
        {icon}
      <div>
        <p className="text-xs">{gender}</p>
      </div>
    </div>
  );
}

export default GenderCard;
