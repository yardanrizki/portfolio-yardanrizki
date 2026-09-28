import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
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
      data: projects,
    });
  } catch (error) {
    console.error("GET /api/projects error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch projects",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
  titleEn,
  titleId,
  shortDescriptionEn,
  shortDescriptionId,
  longDescriptionEn,
  longDescriptionId,
  techStack,
  roleInProject,
  status,
  profileIds,
} = body;

    if (!titleEn?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Project title is required",
        },
        { status: 400 }
      );
    }

    const user = await prisma.user.findFirst();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    const project = await prisma.project.create({
  data: {
    userId: user.id,

    titleEn: titleEn.trim(),
    titleId: titleId?.trim() || null,

    shortDescriptionEn:
      shortDescriptionEn?.trim() || null,

    shortDescriptionId:
      shortDescriptionId?.trim() || null,

    longDescriptionEn:
      longDescriptionEn?.trim() || null,

    longDescriptionId:
      longDescriptionId?.trim() || null,

    techStack:
      Array.isArray(techStack) ? techStack : [],

    roleInProject:
      roleInProject?.trim() || null,

    status: status || "COMPLETED",

    imageUrls: [],

    profiles: {
      create: Array.isArray(profileIds)
        ? profileIds.map((profileId: string) => ({
            profileId,
            isIncluded: true,
          }))
        : [],
    },
  },
});

    return NextResponse.json(
      {
        success: true,
        data: project,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/projects error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create project",
      },
      { status: 500 }
    );
  }
}