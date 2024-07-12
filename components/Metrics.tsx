import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "./ui/input";

function Metrics() {
  return (
    <Tabs defaultValue="metric" className="flex flex-col items-center w-full">

      <TabsList>
        <TabsTrigger value="imperial">Imperial</TabsTrigger>
        <TabsTrigger value="metric">Metric</TabsTrigger>
      </TabsList>

      {/* imperial content */}
      <TabsContent value="imperial">
        <div className="flex gap-4 items-center justify-between">
          <div className="flex flex-col h-32 border border-gray-100 rounded-lg p-4 gap-4 items-center">
            <h2 className="font-bold text-xl">Height</h2>
            <div className="flex  gap-4 ">
              <Input className="w-24" type="text" placeholder="ft" />
              <Input className="w-24" type="text" placeholder="inch" />
            </div>
          </div>

          <div className="flex flex-col h-32 border border-gray-100 rounded-lg p-4 gap-4 items-center">
            <h2 className="font-bold text-xl">Weight</h2>
            <Input className="w-24" type="text" placeholder="lbs" />
          </div>
        </div>
      </TabsContent>

      {/* metrics content */}
      <TabsContent value="metric">
      <div className="flex gap-4 items-center">
          <div className="flex flex-col  h-32 border border-gray-100 rounded-lg p-4 gap-4 items-center">
            <h2 className="font-bold text-xl">Height</h2>
              <Input className="w-24" type="text" placeholder="cm" />
            <div className="flex gap-4 ">
            </div>
          </div>

          <div className="flex flex-col border h-32 border-gray-100 rounded-lg p-4 gap-4 items-center">
            <h2 className="font-bold text-xl">Weight</h2>
            <Input className="w-24" type="text" placeholder="kg" />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}

export default Metrics;
