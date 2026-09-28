import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [
      totalProjects,
      totalCertificates,
      totalMessages,
      totalPublications,
    ] = await Promise.all([
      prisma.project.count({
        where: {
          isActive: true,
        },
      }),

      prisma.certificate.count({
        where: {
          isActive: true,
        },
      }),

      prisma.contactMessage.count(),

      prisma.publication.count({
        where: {
          isActive: true,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        totalProjects,
        totalCertificates,
        totalMessages,
        totalPublications,
      },
    });
  } catch (error) {
    console.error("GET /api/admin/overview error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch dashboard overview",
      },
      { status: 500 }
    );
  }
}   