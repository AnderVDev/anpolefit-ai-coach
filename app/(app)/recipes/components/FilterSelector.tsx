import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterSelectorProp {
  title: string;
  options: string[];
  onChange: (value: string | undefined) => void;
}

function FilterSelector({ title, options, onChange }: FilterSelectorProp) {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={title} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default FilterSelector;
