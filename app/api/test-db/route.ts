import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: "yardanrizki@gmail.com",
      },
      include: {
        personalInfo: true,
        profiles: true,
        experiences: true,
        projects: true,
        education: true,
        publications: true,
        certificates: true,
        trainings: true,
        skills: true,
        languages: true,
      },
    });

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Database connection failed",
      },
      { status: 500 }
    );
  }
}