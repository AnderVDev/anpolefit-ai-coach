import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
};

interface RecipesLayoutProps {
  children: React.ReactNode;
}

export default function RecipesLayout({ children }: RecipesLayoutProps) {
  return (
    <>
      <div className="space-y-6 p-10">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Recipes</h2>
          <p className="text-muted-foreground">search for recipe ideas.</p>
        </div>
        <Separator className="" />
        <div className="flex flex-col ">
          {children}
        </div>
      </div>
    </>
  );
}
