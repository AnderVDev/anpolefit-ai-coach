import { Card } from "@/components/ui/card";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  // return <SignIn />;
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-20">
      <Card className=" p-8 space-y-8 bg-white shadow-lg rounded-xl">
        <SignIn />
      </Card>
    </div>
  );
}
