import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const certificates = await prisma.certificate.findMany({
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
      data: certificates,
    });
  } catch (error) {
    console.error("GET /api/certificates error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch certificates",
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
      issuerEn,
      issuerId,
      issuedDate,
      expiryDate,
      credentialId,
      verifyUrl,
      type,
      coverImageUrl,
      isActive,
      sortOrder,
      profileIds = [],
    } = body;

    if (!titleEn) {
      return NextResponse.json(
        {
          success: false,
          message: "Certificate title is required",
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

    const certificate = await prisma.certificate.create({
      data: {
        userId: ownerUserId,
        titleEn,
        titleId: titleId || null,
        issuerEn: issuerEn || null,
        issuerId: issuerId || null,
        issuedDate: issuedDate ? new Date(issuedDate) : null,
        expiryDate: expiryDate ? new Date(expiryDate) : null,
        credentialId: credentialId || null,
        verifyUrl: verifyUrl || null,
        type: type || "CERTIFICATION",
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
        message: "Certificate created successfully",
        data: certificate,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/certificates error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create certificate",
      },
      { status: 500 }
    );
  }
}