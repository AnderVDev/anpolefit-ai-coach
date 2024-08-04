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
  values: string[];
}

function FilterSelector({ title, values }: FilterSelectorProp) {
  return (
    <>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={title} />
        </SelectTrigger>
        <SelectContent>
          {values.map((value) => (
            <SelectItem key={value} value={value}>
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}

export default FilterSelector;
