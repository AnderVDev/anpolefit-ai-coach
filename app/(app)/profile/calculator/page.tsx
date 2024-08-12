import Stepper from "@/components/stepper";
import { Separator } from "@/components/ui/separator";
import React from "react";

function Calculator() {
  return (
    <div className="space-y-6">
      {/* <div className="max-w-screen-lg m-10 lg:mx-auto"> */}
      <div>
        <h3 className="text-lg font-medium">Calculator</h3>
        <p className="text-sm text-muted-foreground">Calculator BMI</p>
      </div>
      <Separator />
      <Stepper />
    </div>
  );
}

export default Calculator;
