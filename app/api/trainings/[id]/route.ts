import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const training = await prisma.training.findUnique({
      where: {
        id,
      },
      include: {
        profiles: {
          include: {
            profile: true,
          },
        },
      },
    });

    if (!training) {
      return NextResponse.json(
        {
          success: false,
          message: "Training not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: training,
    });
  } catch (error) {
    console.error("GET /api/trainings/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch training",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
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

    const existingTraining = await prisma.training.findUnique({
      where: {
        id,
      },
    });

    if (!existingTraining) {
      return NextResponse.json(
        {
          success: false,
          message: "Training not found",
        },
        { status: 404 }
      );
    }

    const training = await prisma.$transaction(async (tx) => {
      await tx.profileTraining.deleteMany({
        where: {
          trainingId: id,
        },
      });

      return tx.training.update({
        where: {
          id,
        },
        data: {
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
    });

    return NextResponse.json({
      success: true,
      message: "Training updated successfully",
      data: training,
    });
  } catch (error) {
    console.error("PUT /api/trainings/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update training",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const existingTraining = await prisma.training.findUnique({
      where: {
        id,
      },
    });

    if (!existingTraining) {
      return NextResponse.json(
        {
          success: false,
          message: "Training not found",
        },
        { status: 404 }
      );
    }

    await prisma.training.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Training deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /api/trainings/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete training",
      },
      { status: 500 }
    );
  }
}