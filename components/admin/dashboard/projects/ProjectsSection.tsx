"use client";

import { Plus, Edit, Trash2, X } from "lucide-react";

type Profile = {
  id: string;
  name: string;
  type: "GENERAL" | "ROLE" | "DOMAIN";
  roleLabel: string | null;
};

type ProjectsSectionProps = {
  projects: any[];
  profiles: Profile[];
  isLoadingProjects: boolean;
  isProjectFormOpen: boolean;
  isSavingProject: boolean;
  editingProjectId: string | null;
  selectedProfileIds: string[];
  projectForm: {
    titleEn: string;
    titleId: string;
    shortDescriptionEn: string;
    shortDescriptionId: string;
    longDescriptionEn: string;
    longDescriptionId: string;
    techStack: string;
    roleInProject: string;
    status: string;
    githubUrl: string;
    demoUrl: string;
    caseStudyUrl: string;
    coverImageUrl: string;
  };

  setEditingProjectId: (value: string | null) => void;
  setSelectedProfileIds: (
    value: string[] | ((prev: string[]) => string[])
  ) => void;
  
  setProjectForm: (
    value:
      | ProjectsSectionProps["projectForm"]
      | ((
          prev: ProjectsSectionProps["projectForm"]
        ) => ProjectsSectionProps["projectForm"])
  ) => void;
  setIsProjectFormOpen: (value: boolean) => void;
  handleEditProject: (id: string) => void;
  handleDeleteProject: (id: string) => void;
handleCreateProject: (event: React.FormEvent) => void;
};

export default function ProjectsSection({
  projects,
  profiles,
  isLoadingProjects,
  isProjectFormOpen,
  isSavingProject,
  editingProjectId,
  selectedProfileIds,
  projectForm,
  setEditingProjectId,
  setSelectedProfileIds,
  setProjectForm,
  setIsProjectFormOpen,
  handleEditProject,
  handleDeleteProject,
  handleCreateProject,
}: ProjectsSectionProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={() => {
            setEditingProjectId(null);
            setSelectedProfileIds([]);

            setProjectForm({
              titleEn: "",
              titleId: "",
              shortDescriptionEn: "",
              shortDescriptionId: "",
              longDescriptionEn: "",
              longDescriptionId: "",
              techStack: "",
              roleInProject: "",
              status: "COMPLETED",
              githubUrl: "",
              demoUrl: "",
              caseStudyUrl: "",
              coverImageUrl: "",
            });

            setIsProjectFormOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#00FFFF] to-[#00CCCC] text-[#050B12] font-semibold hover:scale-105 transition-transform"
        >
          <Plus size={20} />
          Add Project
        </button>
      </div>
      {isProjectFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0A1520] border border-cyan-500/20 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold">
                  {editingProjectId ? "Edit Project" : "Add Project"}
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  Add a new project to your portfolio.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsProjectFormOpen(false)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-5">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Title (English) *
                </label>
                <input
                  type="text"
                  value={projectForm.titleEn}
                  onChange={(e) =>
                    setProjectForm({
                      ...projectForm,
                      titleEn: e.target.value,
                    })
                  }
                  required
                  className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-[#00FFFF]"
                  placeholder="Website Inventory Management Application"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Title (Indonesia)
                </label>
                <input
                  type="text"
                  value={projectForm.titleId}
                  onChange={(e) =>
                    setProjectForm({
                      ...projectForm,
                      titleId: e.target.value,
                    })
                  }
                  className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-[#00FFFF]"
                />
              </div>
              <input
                type="url"
                value={projectForm.githubUrl}
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    githubUrl: e.target.value,
                  })
                }
                placeholder="GitHub URL"
              />
              <input
                type="url"
                value={projectForm.demoUrl}
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    demoUrl: e.target.value,
                  })
                }
                placeholder="Demo URL"
              />
              <input
                type="url"
                value={projectForm.caseStudyUrl}
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    caseStudyUrl: e.target.value,
                  })
                }
                placeholder="Case Study URL"
              />
              <input
                type="url"
                value={projectForm.coverImageUrl}
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    coverImageUrl: e.target.value,
                  })
                }
                placeholder="Cover Image URL"
              />

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Short Description (English)
                </label>
                <textarea
                  value={projectForm.shortDescriptionEn}
                  onChange={(e) =>
                    setProjectForm({
                      ...projectForm,
                      shortDescriptionEn: e.target.value,
                    })
                  }
                  rows={3}
                  className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-[#00FFFF]"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Short Description (Indonesia)
                </label>
                <textarea
                  value={projectForm.shortDescriptionId}
                  onChange={(e) =>
                    setProjectForm({
                      ...projectForm,
                      shortDescriptionId: e.target.value,
                    })
                  }
                  rows={3}
                  className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-[#00FFFF]"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Long Description (English)
                </label>
                <textarea
                  value={projectForm.longDescriptionEn}
                  onChange={(e) =>
                    setProjectForm({
                      ...projectForm,
                      longDescriptionEn: e.target.value,
                    })
                  }
                  rows={4}
                  className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-[#00FFFF]"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Long Description (Indonesia)
                </label>
                <textarea
                  value={projectForm.longDescriptionId}
                  onChange={(e) =>
                    setProjectForm({
                      ...projectForm,
                      longDescriptionId: e.target.value,
                    })
                  }
                  rows={4}
                  className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-[#00FFFF]"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Tech Stack
                </label>
                <input
                  type="text"
                  value={projectForm.techStack}
                  onChange={(e) =>
                    setProjectForm({
                      ...projectForm,
                      techStack: e.target.value,
                    })
                  }
                  placeholder="Next.js, TypeScript, Prisma, PostgreSQL"
                  className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-[#00FFFF]"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Separate each technology with a comma.
                </p>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Role</label>
                <input
                  type="text"
                  value={projectForm.roleInProject}
                  onChange={(e) =>
                    setProjectForm({
                      ...projectForm,
                      roleInProject: e.target.value,
                    })
                  }
                  placeholder="Developer"
                  className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-[#00FFFF]"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-3">
                  Profiles
                </label>

                <div className="grid sm:grid-cols-2 gap-3">
                  {profiles.map((profile) => {
                    const isSelected = selectedProfileIds.includes(profile.id);

                    return (
                      <label
                        key={profile.id}
                        className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                          isSelected
                            ? "border-[#00FFFF] bg-[#00FFFF]/10"
                            : "border-white/10 bg-white/5 hover:border-white/20"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(event) => {
                            if (event.target.checked) {
                              setSelectedProfileIds((current) => [
                                ...current,
                                profile.id,
                              ]);
                            } else {
                              setSelectedProfileIds((current) =>
                                current.filter((id) => id !== profile.id)
                              );
                            }
                          }}
                          className="mt-1"
                        />

                        <div>
                          <p className="font-medium text-white">
                            {profile.name}
                          </p>

                          {profile.roleLabel && (
                            <p className="text-xs text-gray-500 mt-1">
                              {profile.roleLabel}
                            </p>
                          )}
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Status
                </label>

                <select
                  value={projectForm.status}
                  onChange={(e) =>
                    setProjectForm({
                      ...projectForm,
                      status: e.target.value,
                    })
                  }
                  className="w-full rounded-lg bg-[#0A1520] border border-white/10 px-4 py-3 text-white outline-none focus:border-[#00FFFF]"
                >
                  <option value="PLANNING">Planning</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="MAINTENANCE">Maintenance</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setIsProjectFormOpen(false);
                    setEditingProjectId(null);
                  }}
                  className="px-5 py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-3 rounded-lg bg-gradient-to-r from-[#00FFFF] to-[#00CCCC] text-[#050B12] font-semibold disabled:opacity-50"
                >
                  {isSavingProject ? "Saving..." : "Save Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isLoadingProjects ? (
        <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-12 border border-white/10 text-center">
          <p className="text-gray-400">Loading projects...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-12 border border-white/10 text-center">
          <p className="text-gray-400">No projects found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => {
            const featuredProfile = project.profiles.filter(
  (profile: { isFeatured: boolean }) => profile.isFeatured
)

            return (
              <div
                key={project.id}
                className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">
                      {project.titleEn}
                    </h3>

                    <p className="text-gray-400 mb-3">
                      {project.shortDescriptionEn ||
                        "No description available."}
                    </p>

                    <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech: string) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full text-xs bg-[#00FFFF]/20 text-[#00FFFF]"
                        >
                          {tech}
                        </span>
                      ))}

                      {featuredProfile && (
                        <span className="px-3 py-1 rounded-full text-xs bg-[#FF8C00]/20 text-[#FF8C00]">
                          Featured
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
                      <span>Status: {project.status}</span>

                      {project.roleInProject && (
                        <span>Role: {project.roleInProject}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleEditProject(project.id)}
                      className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-[#00FFFF] hover:bg-[#00FFFF]/10 transition-all"
                      title="Edit project"
                    >
                      <Edit size={18} className="text-[#00FFFF]" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteProject(project.id)}
                      className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-red-500 hover:bg-red-500/10 transition-all"
                      title="Delete project"
                    >
                      <Trash2 size={18} className="text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
