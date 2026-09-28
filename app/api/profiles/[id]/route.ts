import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

// GET /api/profiles/:id
export async function GET(
  _request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const profile = await prisma.profile.findUnique({
      where: {
        id,
      },
      include: {
        experiences: {
          include: {
            experience: true,
          },
          orderBy: {
            sortOrder: "asc",
          },
        },

        projects: {
          include: {
            project: true,
          },
          orderBy: {
            sortOrder: "asc",
          },
        },

        certificates: {
          include: {
            certificate: true,
          },
        },

        trainings: {
          include: {
            training: true,
          },
        },

        skills: {
          include: {
            skill: true,
          },
        },
      },
    });

    if (!profile) {
      return NextResponse.json(
        {
          success: false,
          message: "Profile not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: profile,
    });
  } catch (error) {
    console.error("GET /api/profiles/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch profile",
      },
      { status: 500 }
    );
  }
}

// PUT /api/profiles/:id
export async function PUT(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const {
      slug,
      name,
      type,
      roleLabel,
      headlineEn,
      headlineId,
      summaryEn,
      summaryId,
      isActive,
      sortOrder,
    } = body;

    if (!name?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Profile name is required",
        },
        { status: 400 }
      );
    }

    if (!slug?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Profile slug is required",
        },
        { status: 400 }
      );
    }

    const existingProfile = await prisma.profile.findUnique({
      where: {
        id,
      },
    });

    if (!existingProfile) {
      return NextResponse.json(
        {
          success: false,
          message: "Profile not found",
        },
        { status: 404 }
      );
    }

    const duplicateSlug = await prisma.profile.findFirst({
      where: {
        slug: slug.trim(),
        NOT: {
          id,
        },
      },
    });

    if (duplicateSlug) {
      return NextResponse.json(
        {
          success: false,
          message: "Profile slug already exists",
        },
        { status: 409 }
      );
    }

    const profile = await prisma.profile.update({
      where: {
        id,
      },
      data: {
        slug: slug.trim(),
        name: name.trim(),

        type: type || existingProfile.type,

        roleLabel: roleLabel?.trim() || null,

        headlineEn: headlineEn?.trim() || null,
        headlineId: headlineId?.trim() || null,

        summaryEn: summaryEn?.trim() || null,
        summaryId: summaryId?.trim() || null,

        ...(typeof isActive === "boolean"
          ? { isActive }
          : {}),

        ...(typeof sortOrder === "number"
          ? { sortOrder }
          : {}),
      },
    });

    return NextResponse.json({
      success: true,
      data: profile,
    });
  } catch (error) {
    console.error("PUT /api/profiles/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update profile",
      },
      { status: 500 }
    );
  }
}

// DELETE /api/profiles/:id
export async function DELETE(
  _request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const existingProfile = await prisma.profile.findUnique({
      where: {
        id,
      },
    });

    if (!existingProfile) {
      return NextResponse.json(
        {
          success: false,
          message: "Profile not found",
        },
        { status: 404 }
      );
    }

    await prisma.profile.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Profile deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /api/profiles/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete profile",
      },
      { status: 500 }
    );
  }
}