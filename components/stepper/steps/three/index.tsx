import { Card } from "@/components/ui/card";
import React, { useState } from "react";
import OptionsCard from "../../OptionsCard";
import ectomorphBody from "@/app/assets/Ectomorph_body.jpg";
import mesomorphBody from "@/app/assets/Mesomorph_body.jpg";
import endomorphBody from "@/app/assets/Endomorph_body.png";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  bodyType: z.enum(["ECTOMORPH", "MESOMORPH", "ENDOMORPH"], {
    message: "Must select a Body Type",
  }),
});
type FormSchema = z.infer<typeof formSchema>;
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
  onStepSubmitSuccess: (isCompleted: boolean) => void;
  onStepSuccess: (nextStep: number) => void;
  onStepBack: () => void;
}

function StepThree({
  onBodyTypeChange,
  onStepSubmitSuccess,
  onStepSuccess,
  onStepBack,
}: StepThreeProps) {
  const [selectedBodyType, setSelectedBodyType] = useState<BodiesTypes | null>(
    null
  );
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bodyType: undefined,
    },
  });
  const { watch, handleSubmit, control, setValue } = form;

  const watchAllFields = watch();

  const handleSelectBodyType = (bodyTypeId: BodiesTypes) => {
    setSelectedBodyType(bodyTypeId);
    setValue("bodyType", bodyTypeId);
  };

  const onSubmit: SubmitHandler<FormSchema> = () => {
    const { bodyType } = watchAllFields;
    onBodyTypeChange(bodyType);
    onStepSubmitSuccess(true);
    onStepSuccess(4); // or the next step number you want to proceed to
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit(onSubmit)();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleFormSubmit}
        className="flex items-center justify-center flex-col flex-grow p-4 gap-2"
      >
        <FormField
          control={control}
          name="bodyType"
          render={({ field }: any) => (
            <FormItem className="flex flex-col items-center justify-center my-2">
              {/* <FormLabel className="text-base font-bold">Expectation</FormLabel> */}
              <FormControl>
                <Card className="cursor-pointer gap-0 border border-gray-200 rounded-lg">
                  <div className=" grid grid-col-1 justify-items-center md:grid-cols-3 overflow-hidden">
                    {bodiesTypes.map((type) => (
                      <OptionsCard
                        key={type.id}
                        name={type.name}
                        description={type.description}
                        image={type.image}
                        selected={type.id === selectedBodyType}
                        onSelect={() => {
                          field.onChange(type.id);
                          handleSelectBodyType(type.id as BodiesTypes);
                        }}
                      />
                    ))}
                  </div>
                </Card>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <section className="flex gap-2">
          <Button
            className="bg-purple-400 hover:bg-gray-500 rounded-lg m-0 "
            type="button"
            onClick={onStepBack}
          >
            Back
          </Button>
          <Button className="bg-gray-500 rounded-lg m-0 " type="submit">
            Next
          </Button>
        </section>
      </form>
    </Form>
  );
}

export default StepThree;
