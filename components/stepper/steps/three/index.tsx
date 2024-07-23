import { Card } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import OptionsCard from "../../OptionsCard";
import ectomorphBody from "@/app/assets/Ectomorph_body.jpg";
import mesomorphBody from "@/app/assets/Mesomorph_body.jpg";
import endomorphBody from "@/app/assets/Endomorph_body.png";

type BodiesTypes = "ECTOMORPH" | "MESOMORPH" | "ENDOMORPH";
const bodiesTypes = [
  {
    id: "ECTOMORPH",
    name: "Ectomorph",
    description:
      "Characterized by a slim, lean build with a fast metabolism. Ectomorphs often find it difficult to gain weight and muscle. Examples: Narrow shoulders and hips, low body fat, and long limbs",
    image: ectomorphBody,
  },
  {
    id: "MESOMORPH",
    name: "Mesomorph",
    description:
      "Typically has a muscular, well-defined build with a natural ability to gain muscle and strength easily. Examples: Broad shoulders, narrow waist, and a generally athletic appearance.",
    image: mesomorphBody,
  },
  {
    id: "ENDOMORPH",
    name: "Endomorph",
    description:
      "Tends to have a higher body fat percentage with a rounder physique. Endomorphs may find it easier to gain weight but struggle to lose fat. Examples: Wider waist, larger bone structure, and more fat accumulation in the lower body.",
    image: endomorphBody,
  },
];

interface StepThreeProps {
  onBodyTypeChange: (bodyType: BodiesTypes | null) => void;
}

function StepThree({ onBodyTypeChange }: StepThreeProps) {
  const [selectedBodyType, setSelectedBodyType] = useState<BodiesTypes | null>(
    null
  );

  const handleSelectBodyType = (bodyTypeId: BodiesTypes) => {
    setSelectedBodyType(bodyTypeId);
  };

  useEffect(() => {
    const bodyType= onBodyTypeChange(selectedBodyType);


    // Clean up on unmount
    // return () => clearInterval(bodyType);
  }, [selectedBodyType]);

  return (
    <Card className="cursor-pointer gap-0 border border-gray-200 rounded-lg">
      <div className=" grid grid-col-1 justify-items-center md:grid-cols-3 overflow-hidden">
        {bodiesTypes.map((type) => (
          <OptionsCard
            key={type.id}
            name={type.name}
            description={type.description}
            image={type.image}
            selected={type.id === selectedBodyType}
            onSelect={() => handleSelectBodyType(type.id as BodiesTypes)}
          />
        ))}
      </div>
    </Card>
  );
}

export default StepThree;
