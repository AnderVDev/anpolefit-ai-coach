import { prismadb } from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(request: Request) {
  const user = await currentUser();
  //validation
  const body = await request.json();
  const {
    activity,
    age,
    bodyType,
    expectation,
    gender,
    height,
    weight,
    tdci,
    proteinKcal,
    proteinGrams,
    carbKcal,
    carbGrams,
    fatKcal,
    fatGrams,
  } = body;

  if (
    !user ||
    !activity ||
    !age ||
    !bodyType ||
    !expectation ||
    !gender ||
    !height ||
    !weight ||
    !tdci ||
    !proteinKcal ||
    !proteinGrams ||
    !carbKcal ||
    !carbGrams ||
    !fatKcal ||
    !fatGrams
  ) {
    return NextResponse.json(
      { success: false, message: "Missing required fields" },
      {
        status: 400,
      }
    );
  }

  try {
    const userExistedMacrosProfile =
      await prismadb.userMacrosProfiles.findUnique({
        where: { userId: user.id },
      });

    if (!userExistedMacrosProfile) {
      const userMacrosProfile = await prismadb.userMacrosProfiles.create({
        data: {
          userId: user.id,
          activity: activity,
          age: age,
          bodyType: bodyType,
          expectation: expectation,
          gender: gender,
          height: height,
          weight: weight,
          tdci: tdci,
          proteinKcal: proteinKcal,
          proteinGrams: proteinGrams,
          carbKcal: carbKcal,
          carbGrams: carbGrams,
          fatKcal: fatKcal,
          fatGrams: fatGrams,
        },
      });
      return NextResponse.json(
        { success: true, userMacrosProfile },
        { status: 201 }
      );
    } else {
      const userMacrosProfile = await prismadb.userMacrosProfiles.update({
        where: {
          userId: user.id,
        },
        data: {
          activity,
          age,
          bodyType,
          expectation,
          gender,
          height,
          weight,
          tdci,
          proteinKcal,
          proteinGrams,
          carbKcal,
          carbGrams,
          fatKcal,
          fatGrams,
        },
      });
      return NextResponse.json(
        { success: true, userMacrosProfile },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}
