import React from "react";

const selectedStyle = "ring-2 ring-gray-500 bg-gray-500 bg-opacity-10";
const unselectedStyle = "";

interface ActivityCardProps {
  title: string;
  description: string;
  image: string;
  selected: boolean;
  onSelect: () => void;
}

function ActivityCard({
  title,
  description,
  image,
  selected,
  onSelect,
}: ActivityCardProps) {
  return (
    <div
      className={`flex flex-col p-4 items-center justify-center border border-gray-100 rounded-lg shadow-current cursor-pointer hover:bg-gray-100 w-52 ${
        selected ? selectedStyle : unselectedStyle
      }`}
      onClick={onSelect}
    >
      <h2 className={`font-bold text-sm mb-1 `}>{title}</h2>
      <p className="text-xs text-center">{description}</p>
    </div>
  );
}

export default ActivityCard;
