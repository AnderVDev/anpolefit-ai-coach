import { Card } from "@/components/ui/card";
import React from "react";
import Metrics from "./Metrics";
import ActivityCard from "@/components/ActivityCard";
import { UserRound } from "lucide-react";
import GenderCard from "./GenderCard";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  gender: z.enum(["MALE", "FEMALE"], { message: "Must select a Gender" }),
  age: z
    .number({
      required_error: "Age is required",
      invalid_type_error: "Age must be a number greater than 10",
    })
    .min(10, { message: "Must be greater than 10" })
    .max(90, { message: "Must be less than 90" }),
  metrics: z.object({
    weight: z.number({ required_error: "Weight is required" }).positive(),
    height: z.number({ required_error: "Height is required" }).positive(),
  }),
  activity: z.enum(["SEDENTARY", "LIGHT", "MODERATE", "VERY"], {
    message: "Must select an Activity",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

type GendersTypes = "MALE" | "FEMALE";
const genders = [
  { id: "MALE", gender: "Male", icon: <UserRound size={16} /> },
  { id: "FEMALE", gender: "Female", icon: <UserRound size={16} /> },
];

type Activities = "SEDENTARY" | "LIGHT" | "MODERATE" | "VERY";
const activities = [
  {
    id: "SEDENTARY",
    title: "Sedentary",
    description: "Minimal physical activity.",
    image: "image",
  },
  {
    id: "LIGHT",
    title: "Light Activity",
    description: "Walking short distances.",
    image: "image",
  },
  {
    id: "MODERATE",
    title: "Moderate Activity",
    description: "Brisk walking, recreational swimming, gardening.",
    image: "image",
  },
  {
    id: "VERY",
    title: "Very Active",
    description: "Running, cycling at a fast pace, playing competitive sports.",
    image: "image",
  },
];

interface StepOneProps {
  onDataChange: (data: {
    age: number | null;
    weight: number | null;
    height: number | null;
    gender: GendersTypes | null;
    activity: Activities | null;
  }) => void;
  onStepSubmitSuccess: (isCompleted: boolean) => void;
  onStepSuccess: (nextStep: number) => void;
}

function StepOne({
  onDataChange,
  onStepSubmitSuccess,
  onStepSuccess,
}: StepOneProps) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gender: null,
      age: 0,
      metrics: {
        weight: null,
        height: null,
      },
      activity: null,
    },
  });
  const { watch, setValue, handleSubmit, control } = form;

  const watchAllFields = watch();

  const handleSelectGender = (genderId: GendersTypes) => {
    setValue("gender", genderId);
  };

  const handleSelectActivity = (activityId: Activities) => {
    setValue("activity", activityId);
  };

  const onSubmit: SubmitHandler<FormSchema> = () =>
    // values: FormSchema,
    // e: React.FormEvent<HTMLFormElement>
    {
      const { age, metrics, gender, activity } = watchAllFields;
      // e.preventDefault();
      onDataChange({
        age: age,
        weight: metrics.weight,
        height: metrics.height,
        gender: gender,
        activity: activity,
      });
      onStepSubmitSuccess(true);
      // onStepSuccess(2);
      // console.log("Form values", values);
    };
  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center justify-center flex-col flex-grow p-4 gap-2"
      >
        <Card className="flex items-center justify-center flex-col flex-grow border border-gray-200 rounded-lg gap-2 px-2 m-0">
          <section className="w-60 mt-2 md:w-[590px] flex flex-col md:grid md:grid-cols-3 justify-between">
            <div className="items-center w-60 h-48 flex flex-col md:col-start-1 md:col-span-1 place-content-between  ">
              <Card className="flex items-center flex-col border border-gray-200 rounded-lg cursor-pointer p-0 h-28 w-60">
                <FormField
                  control={control}
                  name="gender"
                  render={({ field }: any) => (
                    <FormItem className="flex flex-col items-center justify-center my-2">
                      <FormLabel className="text-base font-bold">
                        Gender
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-2">
                          {genders.map((gender) => (
                            <GenderCard
                              key={gender.id}
                              gender={gender.gender}
                              icon={gender.icon}
                              selected={gender.id === field.value}
                              onSelect={() => {
                                field.onChange(gender.id);
                                handleSelectGender(gender.id as GendersTypes);
                              }}
                            />
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Card>

              <Card className="flex items-center justify-center flex-col md:flex-row border  md:gap-4 border-gray-200 rounded-lg cursor-pointer mt-2 p-0 h-28 md:h-24 w-60">
                <FormField
                  control={control}
                  name="age"
                  render={({ field }: any) => (
                    <FormItem className="flex flex-col items-center justify-center">
                      <div className="flex gap-1 items-center justify-center">
                        <FormLabel className="text-base font-bold">
                          Age
                        </FormLabel>
                        <FormControl className="">
                          <Input
                            type="number"
                            className="w-14 h-8 p-2"
                            placeholder="age"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Card>
            </div>

            {/* Metrics */}
            <Card className="w-60 p-2 mt-2 md:mt-0 md:mr-1 flex items-center justify-center flex-col flex-grow md:w-80 md:h-48 mx-auto  md:col-end-4 md:col-span-2  border border-gray-200 rounded-lg cursor-pointer ">
              <FormField
                control={control}
                name="metrics"
                render={({ field }: any) => (
                  <FormItem>
                    {/* <FormLabel>Age</FormLabel> */}
                    <FormControl>
                      <Metrics
                        onHeightChange={(value) =>
                          setValue("metrics.height", Number(value))
                        }
                        onWeightChange={(value) =>
                          setValue("metrics.weight", Number(value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Card>
          </section>

          {/* Activities */}
          <Card className=" w-60 h-auto mb-2 md:w-[590px] flex flex-col items-center justify-center border border-gray-200 rounded-lg cursor-pointer ">
            <section className="w-60 md:w-[590px] grid grid-col-1 justify-between">
              <FormField
                control={control}
                name="activity"
                render={({ field }: any) => (
                  <FormItem className="w-60 md:w-[590px] flex flex-wrap flex-col items-center justify-center mb-1">
                    <FormLabel className="mt-2 text-base font-bold">
                      How Active Are You?
                    </FormLabel>
                    <FormControl className="grid grid-col-1 md:grid-cols-2 gap-1 m-1 p-1">
                      <div className="">
                        {activities.map((activity) => (
                          <ActivityCard
                            key={activity.id}
                            title={activity.title}
                            description={activity.description}
                            image={activity.image}
                            selected={activity.id === field.value}
                            onSelect={() => {
                              field.onChange(activity.id);
                              handleSelectActivity(activity.id as Activities);
                            }}
                          />
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>
          </Card>
        </Card>

        <Button className="bg-gray-500 rounded-lg m-0 " type="submit">
          Next
        </Button>
      </form>
    </Form>
  );
}

export default StepOne;
