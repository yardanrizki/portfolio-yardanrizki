import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

// GET /api/projects/:id
export async function GET(
  _request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const project = await prisma.project.findUnique({
      where: {
        id,
      },
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

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          message: "Project not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error("GET /api/projects/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch project",
      },
      { status: 500 }
    );
  }
}


// PUT /api/projects/:id
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
      shortDescriptionEn,
      shortDescriptionId,
      longDescriptionEn,
      longDescriptionId,
      techStack,
      roleInProject,
      status,
      githubUrl,
      demoUrl,
      caseStudyUrl,
      coverImageUrl,
      imageUrls,
      isActive,
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

    const existingProject = await prisma.project.findUnique({
      where: {
        id,
      },
    });

    if (!existingProject) {
      return NextResponse.json(
        {
          success: false,
          message: "Project not found",
        },
        { status: 404 }
      );
    }

    const project = await prisma.$transaction(async (tx) => {
      const updatedProject = await tx.project.update({
        where: {
          id,
        },
        data: {
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

          techStack: Array.isArray(techStack)
            ? techStack
            : existingProject.techStack,

          roleInProject:
            roleInProject?.trim() || null,

          status:
            status || existingProject.status,

          githubUrl:
            githubUrl?.trim() || null,

          demoUrl:
            demoUrl?.trim() || null,

          caseStudyUrl:
            caseStudyUrl?.trim() || null,

          coverImageUrl:
            coverImageUrl?.trim() || null,

          imageUrls:
            Array.isArray(imageUrls)
              ? imageUrls
              : existingProject.imageUrls,

          ...(typeof isActive === "boolean"
            ? { isActive }
            : {}),
        },
      });

      // Sinkronisasi Project ↔ Profile
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

        // Hapus seluruh relasi ProfileProject lama
        await tx.profileProject.deleteMany({
          where: {
            projectId: id,
          },
        });

        // Buat ulang relasi berdasarkan profileIds terbaru
        if (uniqueProfileIds.length > 0) {
          await tx.profileProject.createMany({
            data: uniqueProfileIds.map(
              (profileId: string, index: number) => ({
                profileId,
                projectId: id,
                isFeatured: false,
                isIncluded: true,
                sortOrder: index,
              })
            ),
          });
        }
      }

      return updatedProject;
    });

    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error("PUT /api/projects/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update project",
      },
      { status: 500 }
    );
  }
}


// DELETE /api/projects/:id
export async function DELETE(
  _request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const existingProject = await prisma.project.findUnique({
      where: {
        id,
      },
    });

    if (!existingProject) {
      return NextResponse.json(
        {
          success: false,
          message: "Project not found",
        },
        { status: 404 }
      );
    }

    await prisma.project.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /api/projects/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete project",
      },
      { status: 500 }
    );
  }
}