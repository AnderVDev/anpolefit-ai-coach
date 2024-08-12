import { Card } from "@/components/ui/card";
import { SignUp } from "@clerk/nextjs";

export default function Page() {

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-20">
      <Card className=" p-8 space-y-8 bg-white shadow-lg rounded-xl">
        <SignUp />
      </Card>
    </div>
  );
}