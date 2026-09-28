import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const trainings = await prisma.training.findMany({
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
      data: trainings,
    });
  } catch (error) {
    console.error("GET /api/trainings error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch trainings",
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
      providerEn,
      providerId,
      startDate,
      endDate,
      durationHours,
      certificateUrl,
      verifyUrl,
      coverImageUrl,
      isActive,
      sortOrder,
      profileIds = [],
    } = body;

    if (!titleEn) {
      return NextResponse.json(
        {
          success: false,
          message: "Training title is required",
        },
        { status: 400 }
      );
    }

    const ownerUserId = process.env.OWNER_USER_ID;

    if (!ownerUserId) {
      return NextResponse.json(
        {
          success: false,
          message: "OWNER_USER_ID is not configured",
        },
        { status: 500 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: ownerUserId,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Owner user not found",
        },
        { status: 404 }
      );
    }

    const training = await prisma.training.create({
      data: {
        userId: ownerUserId,
        titleEn,
        titleId: titleId || null,
        providerEn: providerEn || null,
        providerId: providerId || null,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        durationHours:
          durationHours !== undefined &&
          durationHours !== null &&
          durationHours !== ""
            ? Number(durationHours)
            : null,
        certificateUrl: certificateUrl || null,
        verifyUrl: verifyUrl || null,
        coverImageUrl: coverImageUrl || null,
        isActive: isActive ?? true,
        sortOrder: sortOrder ?? 0,

        profiles: {
          create: Array.isArray(profileIds)
            ? profileIds.map((profileId: string) => ({
                profileId,
              }))
            : [],
        },
      },

      include: {
        profiles: {
          include: {
            profile: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Training created successfully",
        data: training,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/trainings error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create training",
      },
      { status: 500 }
    );
  }
}