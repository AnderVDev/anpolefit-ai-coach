import React from "react";

const selectedStyle = "ring-2 ring-gray-500 bg-gray-500 bg-opacity-10";
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
      className={`flex p-2 gap-2 w-24 h-8 items-center border border-gray-100 rounded-lg shadow-current cursor-pointer ${
        selected ? selectedStyle : unselectedStyle
      }`}
      onClick={onSelect}
    >
        {icon}
      
        <p className={`text-sm ${
        selected ? "font-bold" : ""
      }`}>{gender}</p>
    </div>
  );
}

export default GenderCard;
