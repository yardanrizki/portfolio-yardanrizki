import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const publications = await prisma.publication.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        sortOrder: "asc",
      },
    });

    return NextResponse.json({
      success: true,
      data: publications,
    });
  } catch (error) {
    console.error("GET /api/publications error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch publications",
      },
      { status: 500 }
    );
  }
}