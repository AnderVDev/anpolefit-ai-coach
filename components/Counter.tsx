import * as React from "react";
import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

interface CounterProp {
  minLevel: number;
  maxLevel: number;
  steps: number;
  initialValue: number;
  label: string;
}

export function Counter({
  minLevel,
  maxLevel,
  steps,
  initialValue,
  label,
}: CounterProp) {
  const [goal, setGoal] = React.useState(initialValue);

  function onClick(adjustment: number) {
    setGoal(Math.max(minLevel, Math.min(maxLevel, goal + adjustment)));
  }

  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="p-4 pb-0 flex flex-col items-center gap-1">
        <div className="flex gap-4 items-center justify-between space-b ">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 shrink-0 rounded-full hover:bg-gray-100 border border-gray-100"
            onClick={() => onClick(-steps)}
            disabled={goal <= minLevel}
          >
            <Minus className="h-4 w-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <div className="flex-1 text-center">
            <div className="text-3xl font-bold tracking-tighter">{goal}</div>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 shrink-0 rounded-full hover:bg-gray-100 border border-gray-100"
            onClick={() => onClick(steps)}
            disabled={goal >= maxLevel}
          >
            <Plus className="h-4 w-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
        <div className="text-lg  text-gray-100 font-semibold">{label}</div>
      </div>
    </div>
  );
}
