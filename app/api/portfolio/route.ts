import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const profileSlug = searchParams.get("profile") || "general";

    const profile = await prisma.profile.findFirst({
      where: {
        slug: profileSlug,
        isActive: true,
      },
      orderBy: {
        sortOrder: "asc",
      },
      include: {
        user: {
          include: {
            personalInfo: true,
            education: {
              where: {
                isActive: true,
              },
              orderBy: {
                sortOrder: "asc",
              },
            },
            publications: {
              where: {
                isActive: true,
              },
              orderBy: {
                sortOrder: "asc",
              },
            },
          },
        },

        skills: {
          where: {
            isIncluded: true,
            skill: {
              isActive: true,
            },
          },
          orderBy: {
            sortOrder: "asc",
          },
          include: {
            skill: true,
          },
        },

        experiences: {
          where: {
            isIncluded: true,
            experience: {
              isActive: true,
            },
          },
          orderBy: {
            sortOrder: "asc",
          },
          include: {
            experience: true,
          },
        },

        projects: {
          where: {
            isIncluded: true,
            project: {
              isActive: true,
            },
          },
          orderBy: {
            sortOrder: "asc",
          },
          include: {
            project: {
              include: {
                profiles: {
                  include: {
                    profile: true,
                  },
                },
              },
            },
          },
        },

        certificates: {
          where: {
            isIncluded: true,
            certificate: {
              isActive: true,
            },
          },
          orderBy: {
            sortOrder: "asc",
          },
          include: {
            certificate: true,
          },
        },

        trainings: {
          where: {
            isIncluded: true,
            training: {
              isActive: true,
            },
          },
          orderBy: {
            sortOrder: "asc",
          },
          include: {
            training: true,
          },
        },
      },
    });

    if (!profile) {
      return NextResponse.json(
        {
          success: false,
          message: `Profile "${profileSlug}" not found`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        profile: {
          id: profile.id,
          slug: profile.slug,
          name: profile.name,
          type: profile.type,
          roleLabel: profile.roleLabel,
          headlineEn: profile.headlineEn,
          headlineId: profile.headlineId,
          summaryEn: profile.summaryEn,
          summaryId: profile.summaryId,
        },

        personalInfo: profile.user.personalInfo,

        skills: profile.skills.map(({ skill, ...assignment }) => ({
          ...skill,
          isHighlighted: assignment.isHighlighted,
          sortOrder: assignment.sortOrder,
        })),

        experiences: profile.experiences.map(
          ({ experience, ...assignment }) => ({
            ...experience,
            sortOrder: assignment.sortOrder,
          })
        ),

        projects: profile.projects.map(({ project, ...assignment }) => ({
          ...project,
          isFeatured: assignment.isFeatured,
          sortOrder: assignment.sortOrder,
          profiles: project.profiles,
        })),

        certificates: profile.certificates.map(
          ({ certificate, ...assignment }) => ({
            ...certificate,
            sortOrder: assignment.sortOrder,
          })
        ),

        trainings: profile.trainings.map(({ training, ...assignment }) => ({
          ...training,
          sortOrder: assignment.sortOrder,
        })),

        education: profile.user.education,

        publications: profile.user.publications,
      },
    });
  } catch (error) {
    console.error("GET /api/portfolio error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch portfolio data",
      },
      { status: 500 }
    );
  }
}
