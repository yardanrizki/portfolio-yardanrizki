import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const profiles = await prisma.profile.findMany({
      orderBy: {
        sortOrder: "asc",
      },
      include: {
        _count: {
          select: {
            experiences: true,
            projects: true,
            certificates: true,
            trainings: true,
            skills: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: profiles,
    });
  } catch (error) {
    console.error("GET /api/profiles error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch profiles",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
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

    const ownerUser = await prisma.user.findUnique({
      where: {
        id: ownerUserId,
      },
    });

    if (!ownerUser) {
      return NextResponse.json(
        {
          success: false,
          message: `Owner user not found: ${ownerUserId}`,
        },
        { status: 500 }
      );
    }

    const existingSlug = await prisma.profile.findUnique({
      where: {
        slug: slug.trim(),
      },
    });

    if (existingSlug) {
      return NextResponse.json(
        {
          success: false,
          message: "Profile slug already exists",
        },
        { status: 409 }
      );
    }

    const profile = await prisma.profile.create({
      data: {
        userId: ownerUserId,

        slug: slug.trim(),
        name: name.trim(),

        type: type || "GENERAL",

        roleLabel: roleLabel?.trim() || null,

        headlineEn: headlineEn?.trim() || null,
        headlineId: headlineId?.trim() || null,

        summaryEn: summaryEn?.trim() || null,
        summaryId: summaryId?.trim() || null,

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

    return NextResponse.json(
      {
        success: true,
        data: profile,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/profiles error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create profile",
      },
      { status: 500 }
    );
  }
}