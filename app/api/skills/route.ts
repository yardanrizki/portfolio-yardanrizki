import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        sortOrder: "asc",
      },
      include: {
        profiles: {
          include: {
            profile: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: skills,
    });
  } catch (error) {
    console.error("GET /api/skills error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch skills",
      },
      { status: 500 }
    );
  }
}