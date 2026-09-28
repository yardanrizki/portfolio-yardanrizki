import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const education = await prisma.education.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        sortOrder: "asc",
      },
    });

    return NextResponse.json({
      success: true,
      data: education,
    });
  } catch (error) {
    console.error("GET /api/education error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch education",
      },
      { status: 500 }
    );
  }
}