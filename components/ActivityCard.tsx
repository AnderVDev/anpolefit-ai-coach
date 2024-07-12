import React from "react";

const selectedStyle = "ring-2 ring-primary-500 bg-primary-500 bg-opacity-10";
const unselectedStyle = "hover:bg-gray-100";

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
      className={`flex p-4 gap-4 items-center border border-gray-100 rounded-lg shadow-current cursor-pointer ${
        selected ? selectedStyle : unselectedStyle
      }`}
      onClick={onSelect}
    >
        <h3>{image}</h3>
      <div>
        <h2
          className={`font-bold text-sm mb-1 ${
            selected ? "text-primary-500" : ""
          }`}
        >
          {title}
        </h2>
        <p className="text-xs">{description}</p>
      </div>
    </div>
  );
}

export default ActivityCard;
