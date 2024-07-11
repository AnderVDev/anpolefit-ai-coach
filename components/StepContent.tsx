import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Counter } from "./Counter";
import Metrics from "./Metrics";

const cardStyle =
  "flex flex-col p-4 border border-gray-200 rounded-lg cursor-pointer items-center";

const genders = [
  {
    id: "MALE",
    gender: "Male",
  },
  {
    id: "FEMALE",
    gender: "Female",
  },
];
function StepContent() {
  return (
    <div>
      <Card className="flex flex-grow flex-col p-4 border border-gray-200 rounded-lg cursor-pointer">
        <div className="grid grid-col-1 md:grid-cols-2 gap-4 m-4">


          <Card className={`${cardStyle}`}>
            <h2>Gender</h2>
            <div className="flex gap-4">
              {genders.map((gender) => (
                <Button key={gender.id} className="text-sm m-4">
                  {gender.gender}
                </Button>
              ))}
            </div>
          </Card>


          <Card className={`${cardStyle}`}>
            <h2>Age</h2>
            <Counter minLevel={10} maxLevel={150} steps={1} initialValue={18} label={"years old"} />
          </Card>


          

        </div>
        <Card className="flex flex-col p-4 border border-gray-200 rounded-lg cursor-pointer items-center m-4">
            <Metrics/>
          </Card>
        <Card className="flex flex-col p-4 border border-gray-200 rounded-lg cursor-pointer items-center m-4">
          <h2>How Active Are You?</h2>
          <p>Sedentary</p>
          <p>Light Activity</p>
          <p>Moderate Activity</p>
          <p>Very Active</p>
        </Card>
      </Card>
    </div>
  );
}

export default StepContent;
