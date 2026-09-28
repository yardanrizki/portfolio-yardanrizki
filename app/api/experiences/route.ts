import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
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
      data: experiences,
    });
  } catch (error) {
    console.error("GET /api/experiences error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch experiences",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
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

    if (
      typeof companyName !== "string" ||
      !companyName.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Company name is required",
        },
        { status: 400 }
      );
    }

    if (!startDate) {
      return NextResponse.json(
        {
          success: false,
          message: "Start date is required",
        },
        { status: 400 }
      );
    }
    
const ownerUserId = process.env.OWNER_USER_ID;

console.log("OWNER_USER_ID:", ownerUserId);

if (!ownerUserId) {
  return NextResponse.json(
    {
      success: false,
      message: "OWNER_USER_ID is not configured",
    },
    { status: 500 }
  );
}

const ownerUser = await prisma.user.findUnique({
  where: {
    id: ownerUserId,
  },
});

console.log("OWNER USER FOUND:", !!ownerUser);
console.log("OWNER USER:", ownerUser);

if (!ownerUser) {
  return NextResponse.json(
    {
      success: false,
      message: `Owner user not found: ${ownerUserId}`,
    },
    { status: 500 }
  );
}

      const experience = await prisma.$transaction(async (tx) => {
      const createdExperience = await tx.experience.create({
        data: {
          userId: ownerUserId,

          companyName: companyName.trim(),

          location:
            typeof location === "string"
              ? location.trim() || null
              : null,

          roleTitleEn:
            typeof roleTitleEn === "string"
              ? roleTitleEn.trim() || null
              : null,

          roleTitleId:
            typeof roleTitleId === "string"
              ? roleTitleId.trim() || null
              : null,

          employmentType: employmentType || null,

          startDate: new Date(startDate),

          endDate:
            endDate !== undefined &&
            endDate !== null &&
            endDate !== ""
              ? new Date(endDate)
              : null,

          isCurrent:
            typeof isCurrent === "boolean"
              ? isCurrent
              : false,

          descriptionEn:
            typeof descriptionEn === "string"
              ? descriptionEn.trim() || null
              : null,

          descriptionId:
            typeof descriptionId === "string"
              ? descriptionId.trim() || null
              : null,

          responsibilities:
            responsibilities !== undefined
              ? responsibilities
              : null,

          achievements:
            achievements !== undefined
              ? achievements
              : null,

          logoUrl:
            typeof logoUrl === "string"
              ? logoUrl.trim() || null
              : null,

          websiteUrl:
            typeof websiteUrl === "string"
              ? websiteUrl.trim() || null
              : null,

          isActive:
            typeof isActive === "boolean"
              ? isActive
              : true,

          sortOrder:
            typeof sortOrder === "number"
              ? sortOrder
              : 0,
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

        if (uniqueProfileIds.length > 0) {
          await tx.profileExperience.createMany({
            data: uniqueProfileIds.map(
              (profileId: string, index: number) => ({
                profileId,
                experienceId: createdExperience.id,
                isIncluded: true,
                sortOrder: index,
              })
            ),
          });
        }
      }

      return createdExperience;
    });

    return NextResponse.json(
      {
        success: true,
        message: "Experience created successfully",
        data: experience,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/experiences error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create experience",
      },
      { status: 500 }
    );
  }
}
