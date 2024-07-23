import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

const boxStyle =
  "flex w-42 h-20 border border-gray-100 rounded-lg p-2 gap-2 items-center";

interface MetricsProps {
  onWeightChange: (value: number) => void;
  onHeightChange: (value: number) => void;
}
function Metrics({ onWeightChange, onHeightChange }: MetricsProps) {
  return (
    <Tabs defaultValue="metric" className="flex flex-col items-center w-full ">
      <TabsList>
        <TabsTrigger value="imperial">Imperial</TabsTrigger>
        <TabsTrigger value="metric">Metric</TabsTrigger>
      </TabsList>

      {/* imperial content */}
      <TabsContent value="imperial">
        <div className="flex flex-col md:flex-row gap-2 items-center justify-between">
          <div className={`${boxStyle}`}>
            <h2 className="font-bold">Height</h2>
            <div className="flex flex-col gap-2">
              <Input
                className="w-16 h-6"
                type="text"
                placeholder="ft"
                onChange={(e) => onHeightChange(parseFloat(e.target.value))}
              />
              <Input
                className="w-16 h-6"
                type="text"
                placeholder="inch"
                onChange={(e) => onHeightChange(parseFloat(e.target.value))}
              />
            </div>
          </div>

          <div className={`${boxStyle}`}>
            <h2 className="font-bold ">Weight</h2>
            <Input
              className="w-16 h-6"
              type="text"
              placeholder="lbs"
              onChange={(e) => onWeightChange(parseFloat(e.target.value))}
            />
          </div>
        </div>
      </TabsContent>

      {/* metrics content */}
      <TabsContent value="metric">
        <div className="flex flex-col md:flex-row gap-2 items-center ">
          <div className={`${boxStyle}`}>
            <h2 className="font-bold">Height</h2>
            <Input
              className="w-16 h-6"
              type="text"
              placeholder="cm"
              onChange={(e) => onHeightChange(parseFloat(e.target.value))}
            />
          </div>

          <div className={`${boxStyle}`}>
            <h2 className="font-bold">Weight</h2>
            <Input
              className="w-16 h-6"
              type="text"
              placeholder="kg"
              onChange={(e) => onWeightChange(parseFloat(e.target.value))}
            />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}

export default Metrics;
