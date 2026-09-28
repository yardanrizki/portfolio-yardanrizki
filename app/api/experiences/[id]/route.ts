import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  _request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const experience = await prisma.experience.findUnique({
      where: { id },
      include: {
        profiles: {
          include: {
            profile: true,
          },
          orderBy: {
            sortOrder: "asc",
          },
        },
      },
    });

    if (!experience) {
      return NextResponse.json(
        {
          success: false,
          message: "Experience not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: experience,
    });
  } catch (error) {
    console.error("GET /api/experiences/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch experience",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const {
      companyName,
      location,
      roleTitleEn,
      roleTitleId,
      employmentType,
      startDate,
      endDate,
      isCurrent,
      descriptionEn,
      descriptionId,
      responsibilities,
      achievements,
      logoUrl,
      websiteUrl,
      isActive,
      sortOrder,
      profileIds,
    } = body;

    const existingExperience = await prisma.experience.findUnique({
      where: { id },
    });

    if (!existingExperience) {
      return NextResponse.json(
        {
          success: false,
          message: "Experience not found",
        },
        { status: 404 }
      );
    }

    const experience = await prisma.$transaction(async (tx) => {
      const updatedExperience = await tx.experience.update({
        where: { id },
        data: {
          companyName:
            typeof companyName === "string"
              ? companyName.trim()
              : existingExperience.companyName,

          location:
            typeof location === "string"
              ? location.trim() || null
              : existingExperience.location,

          roleTitleEn:
            typeof roleTitleEn === "string"
              ? roleTitleEn.trim() || null
              : existingExperience.roleTitleEn,

          roleTitleId:
            typeof roleTitleId === "string"
              ? roleTitleId.trim() || null
              : existingExperience.roleTitleId,

          employmentType:
            employmentType ?? existingExperience.employmentType,

          startDate:
            startDate !== undefined
              ? new Date(startDate)
              : existingExperience.startDate,

          endDate:
            endDate !== undefined && endDate !== null && endDate !== ""
              ? new Date(endDate)
              : null,

          isCurrent:
            typeof isCurrent === "boolean"
              ? isCurrent
              : existingExperience.isCurrent,

          descriptionEn:
            typeof descriptionEn === "string"
              ? descriptionEn.trim() || null
              : existingExperience.descriptionEn,

          descriptionId:
            typeof descriptionId === "string"
              ? descriptionId.trim() || null
              : existingExperience.descriptionId,

          responsibilities:
            responsibilities !== undefined
              ? responsibilities
              : existingExperience.responsibilities,

          achievements:
            achievements !== undefined
              ? achievements
              : existingExperience.achievements,

          logoUrl:
            typeof logoUrl === "string"
              ? logoUrl.trim() || null
              : existingExperience.logoUrl,

          websiteUrl:
            typeof websiteUrl === "string"
              ? websiteUrl.trim() || null
              : existingExperience.websiteUrl,

          ...(typeof isActive === "boolean" ? { isActive } : {}),

          ...(typeof sortOrder === "number" ? { sortOrder } : {}),
        },
      });

      if (Array.isArray(profileIds)) {
        const uniqueProfileIds = [
          ...new Set(
            profileIds.filter(
              (profileId: unknown): profileId is string =>
                typeof profileId === "string" &&
                profileId.trim().length > 0
            )
          ),
        ];

        await tx.profileExperience.deleteMany({
          where: {
            experienceId: id,
          },
        });

        if (uniqueProfileIds.length > 0) {
          await tx.profileExperience.createMany({
            data: uniqueProfileIds.map(
              (profileId: string, index: number) => ({
                profileId,
                experienceId: id,
                isIncluded: true,
                sortOrder: index,
              })
            ),
          });
        }
      }

      return updatedExperience;
    });

    return NextResponse.json({
      success: true,
      message: "Experience updated successfully",
      data: experience,
    });
  } catch (error) {
    console.error("PUT /api/experiences/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update experience",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const existingExperience = await prisma.experience.findUnique({
      where: { id },
    });

    if (!existingExperience) {
      return NextResponse.json(
        {
          success: false,
          message: "Experience not found",
        },
        { status: 404 }
      );
    }

    await prisma.experience.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Experience deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /api/experiences/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete experience",
      },
      { status: 500 }
    );
  }
}