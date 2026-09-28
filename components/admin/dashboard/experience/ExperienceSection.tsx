"use client";

import { Plus, X, Edit, Trash2 } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

type Experience = {
  id: string;
  companyName: string;
  location: string | null;
  roleTitleEn: string | null;
  roleTitleId: string | null;
  employmentType: string | null;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  descriptionEn: string | null;
  descriptionId: string | null;
  responsibilities: unknown;
  achievements: unknown;
  logoUrl: string | null;
  websiteUrl: string | null;
  isActive: boolean;
  sortOrder: number;
  profiles: {
    profileId: string;
    isIncluded: boolean;
    sortOrder: number;
    profile: {
      name: string;
      slug: string;
    };
  }[];
};

type Profile = {
  id: string;
  slug: string;
  name: string;
  type: "GENERAL" | "ROLE" | "DOMAIN";
  roleLabel: string | null;
};

type ExperienceForm = {
  companyName: string;
  location: string;
  roleTitleEn: string;
  roleTitleId: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  descriptionEn: string;
  descriptionId: string;
  responsibilities: string;
  achievements: string;
  logoUrl: string;
  websiteUrl: string;
  isActive: boolean;
  sortOrder: number;
};

type ExperienceSectionProps = {
  experiences: Experience[];
  profiles: Profile[];

  isLoadingExperiences: boolean;
  isExperienceFormOpen: boolean;
  isSavingExperience: boolean;
  editingExperienceId: string | null;

  selectedExperienceProfileIds: string[];

  experienceForm: ExperienceForm;

  setEditingExperienceId: Dispatch<SetStateAction<string | null>>;
  setSelectedExperienceProfileIds: Dispatch<SetStateAction<string[]>>;
  setExperienceForm: Dispatch<SetStateAction<ExperienceForm>>;
  setIsExperienceFormOpen: Dispatch<SetStateAction<boolean>>;

  handleCreateExperience: () => Promise<void>;
  handleUpdateExperience: () => Promise<void>;
  handleEditExperience: (id: string) => Promise<void>;
  handleDeleteExperience: (id: string) => Promise<void>;
};

export default function ExperienceSection({
  experiences,
  profiles,
  isLoadingExperiences,
  isExperienceFormOpen,
  isSavingExperience,
  editingExperienceId,
  selectedExperienceProfileIds,
  experienceForm,
  setEditingExperienceId,
  setSelectedExperienceProfileIds,
  setExperienceForm,
  setIsExperienceFormOpen,
  handleCreateExperience,
  handleUpdateExperience,
  handleEditExperience,
  handleDeleteExperience,
}: ExperienceSectionProps) {
  return (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Experience Management</h2>
                  <p className="text-sm text-gray-400 mt-1">
                    Manage your professional and organizational experience.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setEditingExperienceId(null);
                    setSelectedExperienceProfileIds([]);

                    setExperienceForm({
                      companyName: "",
                      location: "",
                      roleTitleEn: "",
                      roleTitleId: "",
                      employmentType: "",
                      startDate: "",
                      endDate: "",
                      isCurrent: false,
                      descriptionEn: "",
                      descriptionId: "",
                      responsibilities: "",
                      achievements: "",
                      logoUrl: "",
                      websiteUrl: "",
                      isActive: true,
                      sortOrder: 0,
                    });

                    setIsExperienceFormOpen(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#00FFFF] to-[#00CCCC] text-[#050B12] font-semibold hover:scale-105 transition-transform"
                >
                  <Plus size={20} />
                  Add Experience
                </button>
              </div>

              {isExperienceFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                  <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0A1520] border border-cyan-500/20 p-6">
                    {/* Header */}
                    <div className="mb-6 flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-bold">
                          {editingExperienceId
                            ? "Edit Experience"
                            : "Add Experience"}
                        </h3>

                        <p className="text-sm text-gray-400 mt-1">
                          Store the experience once and assign it to one or more
                          profiles.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setIsExperienceFormOpen(false);
                          setEditingExperienceId(null);
                          setSelectedExperienceProfileIds([]);
                        }}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      {/* Company */}
                      <div>
                        <label className="mb-2 block text-sm font-medium">
                          Company / Organization
                        </label>

                        <input
                          type="text"
                          value={experienceForm.companyName}
                          onChange={(e) =>
                            setExperienceForm((prev) => ({
                              ...prev,
                              companyName: e.target.value,
                            }))
                          }
                          placeholder="PT Example Indonesia"
                          className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-[#00FFFF]"
                        />
                      </div>

                      {/* Location */}
                      <div>
                        <label className="mb-2 block text-sm font-medium">
                          Location
                        </label>

                        <input
                          type="text"
                          value={experienceForm.location}
                          onChange={(e) =>
                            setExperienceForm((prev) => ({
                              ...prev,
                              location: e.target.value,
                            }))
                          }
                          placeholder="Medan, Indonesia"
                          className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-[#00FFFF]"
                        />
                      </div>

                      {/* Role EN */}
                      <div>
                        <label className="mb-2 block text-sm font-medium">
                          Role Title ΓÇö English
                        </label>

                        <input
                          type="text"
                          value={experienceForm.roleTitleEn}
                          onChange={(e) =>
                            setExperienceForm((prev) => ({
                              ...prev,
                              roleTitleEn: e.target.value,
                            }))
                          }
                          placeholder="Software Engineer"
                          className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-[#00FFFF]"
                        />
                      </div>

                      {/* Role ID */}
                      <div>
                        <label className="mb-2 block text-sm font-medium">
                          Role Title ΓÇö Indonesian
                        </label>

                        <input
                          type="text"
                          value={experienceForm.roleTitleId}
                          onChange={(e) =>
                            setExperienceForm((prev) => ({
                              ...prev,
                              roleTitleId: e.target.value,
                            }))
                          }
                          placeholder="Software Engineer"
                          className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-[#00FFFF]"
                        />
                      </div>

                      {/* Employment Type */}
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">
                          Employment Type
                        </label>

                        <select
                          value={experienceForm.employmentType}
                          onChange={(e) =>
                            setExperienceForm((prev) => ({
                              ...prev,
                              employmentType: e.target.value,
                            }))
                          }
                          className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-[#00FFFF]"
                        >
                          <option value="">Select type</option>
                          <option value="FULL_TIME">Full Time</option>
                          <option value="PART_TIME">Part Time</option>
                          <option value="CONTRACT">Contract</option>
                          <option value="INTERNSHIP">Internship</option>
                          <option value="FREELANCE">Freelance</option>
                          <option value="VOLUNTEER">Volunteer</option>
                          <option value="ORGANIZATION">Organization</option>
                          <option value="OTHER">Other</option>
                        </select>
                      </div>

                      {/* Start Date */}
                      <div>
                        <label className="mb-2 block text-sm font-medium">
                          Start Date
                        </label>

                        <input
                          type="date"
                          value={experienceForm.startDate}
                          onChange={(e) =>
                            setExperienceForm((prev) => ({
                              ...prev,
                              startDate: e.target.value,
                            }))
                          }
                          className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-[#00FFFF]"
                        />
                      </div>

                      {/* End Date */}
                      <div>
                        <label className="mb-2 block text-sm font-medium">
                          End Date
                        </label>

                        <input
                          type="date"
                          value={experienceForm.endDate}
                          disabled={experienceForm.isCurrent}
                          onChange={(e) =>
                            setExperienceForm((prev) => ({
                              ...prev,
                              endDate: e.target.value,
                            }))
                          }
                          className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-[#00FFFF] disabled:bg-white/10 disabled:text-gray-500"
                        />
                      </div>

                      {/* Logo */}
                      <div>
                        <label className="mb-2 block text-sm font-medium">
                          Logo URL
                        </label>

                        <input
                          type="url"
                          value={experienceForm.logoUrl}
                          onChange={(e) =>
                            setExperienceForm((prev) => ({
                              ...prev,
                              logoUrl: e.target.value,
                            }))
                          }
                          placeholder="https://..."
                          className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-[#00FFFF]"
                        />
                      </div>

                      {/* Website */}
                      <div>
                        <label className="mb-2 block text-sm font-medium">
                          Website URL
                        </label>

                        <input
                          type="url"
                          value={experienceForm.websiteUrl}
                          onChange={(e) =>
                            setExperienceForm((prev) => ({
                              ...prev,
                              websiteUrl: e.target.value,
                            }))
                          }
                          placeholder="https://..."
                          className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-[#00FFFF]"
                        />
                      </div>

                      {/* Sort Order */}
                      <div>
                        <label className="mb-2 block text-sm font-medium">
                          Sort Order
                        </label>

                        <input
                          type="number"
                          value={experienceForm.sortOrder}
                          onChange={(e) =>
                            setExperienceForm((prev) => ({
                              ...prev,
                              sortOrder: Number(e.target.value),
                            }))
                          }
                          className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-[#00FFFF]"
                        />
                      </div>
                    </div>

                    {/* Current */}
                    <div className="mt-5">
                      <label className="flex items-center gap-2 text-sm text-gray-400">
                        <input
                          type="checkbox"
                          checked={experienceForm.isCurrent}
                          onChange={(e) =>
                            setExperienceForm((prev) => ({
                              ...prev,
                              isCurrent: e.target.checked,
                              endDate: e.target.checked ? "" : prev.endDate,
                            }))
                          }
                        />
                        This is my current experience
                      </label>
                    </div>

                    {/* Description EN */}
                    <div className="mt-5">
                      <label className="mb-2 block text-sm font-medium">
                        Description ΓÇö English
                      </label>

                      <textarea
                        rows={4}
                        value={experienceForm.descriptionEn}
                        onChange={(e) =>
                          setExperienceForm((prev) => ({
                            ...prev,
                            descriptionEn: e.target.value,
                          }))
                        }
                        placeholder="Brief description of this experience..."
                        className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-[#00FFFF]"
                      />
                    </div>

                    {/* Description ID */}
                    <div className="mt-5">
                      <label className="mb-2 block text-sm font-medium">
                        Description ΓÇö Indonesian
                      </label>

                      <textarea
                        rows={4}
                        value={experienceForm.descriptionId}
                        onChange={(e) =>
                          setExperienceForm((prev) => ({
                            ...prev,
                            descriptionId: e.target.value,
                          }))
                        }
                        placeholder="Deskripsi singkat pengalaman..."
                        className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-[#00FFFF]"
                      />
                    </div>

                    {/* Responsibilities */}
                    <div className="mt-5">
                      <label className="mb-2 block text-sm font-medium">
                        Responsibilities
                      </label>

                      <textarea
                        rows={5}
                        value={experienceForm.responsibilities}
                        onChange={(e) =>
                          setExperienceForm((prev) => ({
                            ...prev,
                            responsibilities: e.target.value,
                          }))
                        }
                        placeholder={`Enter one responsibility per line.\nExample:\nDevelop web applications\nManage database infrastructure\nMaintain production systems`}
                        className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-[#00FFFF]"
                      />
                    </div>

                    {/* Achievements */}
                    <div className="mt-5">
                      <label className="mb-2 block text-sm font-medium">
                        Achievements
                      </label>

                      <textarea
                        rows={5}
                        value={experienceForm.achievements}
                        onChange={(e) =>
                          setExperienceForm((prev) => ({
                            ...prev,
                            achievements: e.target.value,
                          }))
                        }
                        placeholder={`Enter one achievement per line.\nExample:\nReduced deployment time by 40%\nBuilt internal management system`}
                        className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-[#00FFFF]"
                      />
                    </div>

                    {/* Profiles */}
                    <div className="mt-5">
                      <label className="mb-3 block text-sm font-medium">
                        Assign to Profiles
                      </label>

                      {profiles.length === 0 ? (
                        <p className="text-sm text-gray-500">
                          No profiles available.
                        </p>
                      ) : (
                        <div className="grid gap-3 md:grid-cols-2">
                          {profiles.map((profile) => {
                            const isSelected =
                              selectedExperienceProfileIds.includes(profile.id);

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
                                  onChange={(e) => {
                                    setSelectedExperienceProfileIds((prev) =>
                                      e.target.checked
                                        ? [...prev, profile.id]
                                        : prev.filter((id) => id !== profile.id)
                                    );
                                  }}
                                />

                                <div>
                                  <p className="font-medium text-white">
                                    {profile.name}
                                  </p>

                                  <p className="font-medium text-white">
                                    {profile.roleLabel || profile.slug}
                                  </p>
                                </div>
                              </label>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Active */}
                    <div className="mt-5">
                      <label className="flex items-center gap-2 text-sm text-gray-400">
                        <input
                          type="checkbox"
                          checked={experienceForm.isActive}
                          onChange={(e) =>
                            setExperienceForm((prev) => ({
                              ...prev,
                              isActive: e.target.checked,
                            }))
                          }
                        />
                        Active
                      </label>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => {
                          setIsExperienceFormOpen(false);
                          setEditingExperienceId(null);
                          setSelectedExperienceProfileIds([]);
                        }}
                        className="px-5 py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10"
                      >
                        Cancel
                      </button>

                      <button
                        type="button"
                        disabled={isSavingExperience}
                        onClick={
                          editingExperienceId
                            ? handleUpdateExperience
                            : handleCreateExperience
                        }
                        className="px-5 py-3 rounded-lg bg-gradient-to-r from-[#00FFFF] to-[#00CCCC] text-[#050B12] font-semibold disabled:opacity-50"
                      >
                        {isSavingExperience
                          ? "Saving..."
                          : editingExperienceId
                            ? "Update Experience"
                            : "Save Experience"}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Experience List */}
              {!isExperienceFormOpen && (
                <>
                  {isLoadingExperiences ? (
                    <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-12 border border-white/10 text-center">
                      Loading experiences...
                    </div>
                  ) : experiences.length === 0 ? (
                    <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-12 border border-white/10 text-center">
                      No experiences found.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {experiences.map((experience) => (
                        <div
                          key={experience.id}
                          className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-cyan-500/50 transition-all duration-300"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="text-xl font-bold mb-2">
                                {experience.companyName}
                              </h3>

                              {experience.roleTitleEn && (
                                <p className="text-gray-400 mb-3">
                                  {experience.roleTitleEn}
                                </p>
                              )}

                              <p className="text-sm text-gray-500">
                                {experience.location ||
                                  "Location not specified"}
                              </p>
                            </div>

                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  handleEditExperience(experience.id)
                                }
                                className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-[#00FFFF] hover:bg-[#00FFFF]/10 transition-all"
                                title="Edit experience"
                              >
                                <Edit size={18} className="text-[#00FFFF]" />
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleDeleteExperience(experience.id)
                                }
                                className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-red-500 hover:bg-red-500/10 transition-all"
                                title="Delete experience"
                              >
                                <Trash2 size={18} className="text-red-400" />
                              </button>
                            </div>
                          </div>

                          <div className="mt-4 flex flex-wrap gap-2">
                            {experience.employmentType && (
                              <span className="px-3 py-1 rounded-full text-xs bg-[#00FFFF]/20 text-[#00FFFF]">
                                {experience.employmentType}
                              </span>
                            )}

                            {experience.isCurrent && (
                              <span className="px-3 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
                                Current
                              </span>
                            )}

                            {!experience.isActive && (
                              <span className="px-3 py-1 rounded-full text-xs bg-red-500/20 text-red-400">
                                Inactive
                              </span>
                            )}
                          </div>

                          {experience.profiles?.length > 0 && (
                            <div className="mt-4">
                              <p className="mb-2 text-xs font-medium text-gray-500">
                                Profiles
                              </p>

                              <div className="flex flex-wrap gap-2">
                                {experience.profiles.map((item) => (
                                  <span
                                    key={item.profileId}
                                    className="px-3 py-1 rounded-full text-xs bg-[#00FFFF]/20 text-[#00FFFF]"
                                  >
                                    {item.profile.name}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
  );
}


