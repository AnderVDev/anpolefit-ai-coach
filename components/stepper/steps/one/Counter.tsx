import * as React from "react";
import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

interface CounterProp {
  minLevel: number;
  maxLevel: number;
  steps: number;
  initialValue: number;
  label: string;
  onChange: (value: number) => void;
}

export function Counter({
  minLevel,
  maxLevel,
  steps,
  initialValue,
  label,
  onChange,
}: CounterProp) {
  const [goal, setGoal] = React.useState(initialValue);

  function onClick(adjustment: number) {
    const newGoal = Math.max(minLevel, Math.min(maxLevel, goal + adjustment));
    setGoal(newGoal);
    onChange(newGoal);
  }

  return (
    <div className=" flex flex-col items-center gap-1">
      <div className="flex gap-2 items-center justify-between space-b h-10">
        <Button
          variant="outline"
          size="icon"
          className="h-6 w-6 shrink-0 rounded-full hover:bg-gray-100 border border-gray-100"
          onClick={() => onClick(-steps)}
          disabled={goal <= minLevel}
        >
          <Minus className="h-4 w-4" />
          <span className="sr-only">Decrease</span>
        </Button>
        <div className="flex-1 text-center">
          <div className="text-2xl font-bold tracking-tighter">{goal}</div>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="h-6 w-6 shrink-0 rounded-full hover:bg-gray-100 border border-gray-100"
          onClick={() => onClick(steps)}
          disabled={goal >= maxLevel}
        >
          <Plus className="h-4 w-4" />
          <span className="sr-only">Increase</span>
        </Button>
      </div>
      <div className="text-sm  text-gray-100 font-semibold">{label}</div>
    </div>
  );
}
