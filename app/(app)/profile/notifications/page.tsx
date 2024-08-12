import { Separator } from "@/components/ui/separator";
import { NotificationsForm } from "./notifications-form";
import { prismadb } from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs/server";
import ProfileContainer from "./ProfileContainer";

export default async function SettingsNotificationsPage() {
  const user = await currentUser();

  if (!user) {
    throw new Error("No user");
  }

  let challengePreferences = await prismadb.challengePreferences.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (!challengePreferences) {
    challengePreferences = await prismadb.challengePreferences.create({
      data: {
        userId: user.id,
        challengeId: "EASY",
      },
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Notifications</h3>
        <p className="text-sm text-muted-foreground">
          Configure how you receive notifications.
        </p>
      </div>
      <Separator />
      {/* <NotificationsForm /> */}
      <ProfileContainer challengePreferences={challengePreferences} />
    </div>
  );
}
