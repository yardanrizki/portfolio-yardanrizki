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

    const certificate = await prisma.certificate.findUnique({
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

    if (!certificate) {
      return NextResponse.json(
        {
          success: false,
          message: "Certificate not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: certificate,
    });
  } catch (error) {
    console.error("GET /api/certificates/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch certificate",
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

    const existingCertificate =
      await prisma.certificate.findUnique({
        where: {
          id,
        },
      });

    if (!existingCertificate) {
      return NextResponse.json(
        {
          success: false,
          message: "Certificate not found",
        },
        { status: 404 }
      );
    }

    const certificate = await prisma.$transaction(
      async (tx) => {
        await tx.profileCertificate.deleteMany({
          where: {
            certificateId: id,
          },
        });

        return tx.certificate.update({
          where: {
            id,
          },
          data: {
            titleEn,
            titleId: titleId || null,
            issuerEn: issuerEn || null,
            issuerId: issuerId || null,
            issuedDate: issuedDate
              ? new Date(issuedDate)
              : null,
            expiryDate: expiryDate
              ? new Date(expiryDate)
              : null,
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
      }
    );

    return NextResponse.json({
      success: true,
      message: "Certificate updated successfully",
      data: certificate,
    });
  } catch (error) {
    console.error(
      "PUT /api/certificates/[id] error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update certificate",
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

    const certificate = await prisma.certificate.findUnique({
      where: {
        id,
      },
    });

    if (!certificate) {
      return NextResponse.json(
        {
          success: false,
          message: "Certificate not found",
        },
        { status: 404 }
      );
    }

    await prisma.certificate.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Certificate deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /api/certificates/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete certificate",
      },
      { status: 500 }
    );
  }
}