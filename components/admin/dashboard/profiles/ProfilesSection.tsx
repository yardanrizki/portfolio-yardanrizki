"use client";

import { Plus, X, Edit, Trash2, UserRound } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

type Profile = {
  id: string;
  slug: string;
  name: string;
  type: string;
  roleLabel: string | null;
  headlineEn: string | null;
  headlineId: string | null;
  summaryEn: string | null;
  summaryId: string | null;
  isActive: boolean;
  sortOrder: number;
  _count?: {
    experiences: number;
    projects: number;
    certificates: number;
    trainings: number;
    skills: number;
  };
};

type ProfileForm = {
  slug: string;
  name: string;
  type: string;
  roleLabel: string;
  headlineEn: string;
  headlineId: string;
  summaryEn: string;
  summaryId: string;
  isActive: boolean;
  sortOrder: number;
};

type ProfilesSectionProps = {
  profiles: Profile[];

  isLoadingProfiles: boolean;
  isProfileFormOpen: boolean;
  isSavingProfile: boolean;
  editingProfileId: string | null;

  profileForm: ProfileForm;

  setEditingProfileId: Dispatch<SetStateAction<string | null>>;
  setProfileForm: Dispatch<SetStateAction<ProfileForm>>;
  setIsProfileFormOpen: Dispatch<SetStateAction<boolean>>;

  handleCreateProfile: () => Promise<void>;
  handleUpdateProfile: () => Promise<void>;
  handleEditProfile: (id: string) => Promise<void>;
  handleDeleteProfile: (id: string) => Promise<void>;
};

export default function ProfilesSection({
  profiles,
  isLoadingProfiles,
  isProfileFormOpen,
  isSavingProfile,
  editingProfileId,
  profileForm,
  setEditingProfileId,
  setProfileForm,
  setIsProfileFormOpen,
  handleCreateProfile,
  handleUpdateProfile,
  handleEditProfile,
  handleDeleteProfile,
}: ProfilesSectionProps) {
  return (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-white">
                    Profile Management
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">
                    Manage profile master data and portfolio identity.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingProfileId(null);

                    setProfileForm({
                      slug: "",
                      name: "",
                      type: "GENERAL",
                      roleLabel: "",
                      headlineEn: "",
                      headlineId: "",
                      summaryEn: "",
                      summaryId: "",
                      isActive: true,
                      sortOrder: 0,
                    });

                    setIsProfileFormOpen(true);
                  }}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#00FFFF] to-[#00CCCC] text-[#050B12] font-semibold transition-all duration-300 hover:scale-[1.02]"
                >
                  <Plus size={18} />
                  Add Profile
                </button>
              </div>

              {/* Profile List */}
              {isLoadingProfiles ? (
                <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-12 border border-white/10 text-center">
                  <p className="text-gray-400">Loading profiles...</p>
                </div>
              ) : profiles.length === 0 ? (
                <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-12 border border-white/10 text-center">
                  <UserRound size={40} className="mx-auto mb-4 text-gray-500" />

                  <h3 className="text-lg font-medium text-white">
                    No profiles yet
                  </h3>

                  <p className="text-sm text-gray-400 mt-2">
                    Create your first profile to organize your portfolio.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  {profiles.map((profile) => (
                    <div
                      key={profile.id}
                      className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-5 hover:border-white/20 transition-all duration-300"
                    >
                      {/* Card Header */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-lg font-semibold text-white">
                              {profile.name}
                            </h3>

                            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#00FFFF]/10 text-[#00FFFF] border border-[#00FFFF]/20">
                              {profile.type}
                            </span>

                            <span
                              className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                                profile.isActive
                                  ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                  : "bg-red-500/10 text-red-400 border border-red-500/20"
                              }`}
                            >
                              {profile.isActive ? "Active" : "Inactive"}
                            </span>
                          </div>

                          <p className="text-sm text-gray-500 mt-1">
                            /{profile.slug}
                          </p>

                          {profile.roleLabel && (
                            <p className="text-sm text-gray-300 mt-2">
                              {profile.roleLabel}
                            </p>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => handleEditProfile(profile.id)}
                            className="p-2 rounded-lg text-gray-400 hover:text-[#00FFFF] hover:bg-white/5 transition-colors"
                            title="Edit profile"
                          >
                            <Edit size={18} />
                          </button>

                          <button
                            onClick={() => handleDeleteProfile(profile.id)}
                            className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-white/5 transition-colors"
                            title="Delete profile"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>

                      {/* Headline */}
                      {profile.headlineEn && (
                        <p className="text-sm text-gray-300 mt-4 line-clamp-2">
                          {profile.headlineEn}
                        </p>
                      )}

                      {/* Relation Counts */}
                      <div className="grid grid-cols-5 gap-2 mt-5">
                        <div className="rounded-xl bg-white/5 border border-white/5 p-3 text-center">
                          <p className="text-lg font-semibold text-white">
                            {profile._count?.experiences ?? 0}
                          </p>
                          <p className="text-[10px] text-gray-500 uppercase tracking-wide">
                            Exp
                          </p>
                        </div>

                        <div className="rounded-xl bg-white/5 border border-white/5 p-3 text-center">
                          <p className="text-lg font-semibold text-white">
                            {profile._count?.projects ?? 0}
                          </p>
                          <p className="text-[10px] text-gray-500 uppercase tracking-wide">
                            Projects
                          </p>
                        </div>

                        <div className="rounded-xl bg-white/5 border border-white/5 p-3 text-center">
                          <p className="text-lg font-semibold text-white">
                            {profile._count?.certificates ?? 0}
                          </p>
                          <p className="text-[10px] text-gray-500 uppercase tracking-wide">
                            Certs
                          </p>
                        </div>

                        <div className="rounded-xl bg-white/5 border border-white/5 p-3 text-center">
                          <p className="text-lg font-semibold text-white">
                            {profile._count?.trainings ?? 0}
                          </p>
                          <p className="text-[10px] text-gray-500 uppercase tracking-wide">
                            Training
                          </p>
                        </div>

                        <div className="rounded-xl bg-white/5 border border-white/5 p-3 text-center">
                          <p className="text-lg font-semibold text-white">
                            {profile._count?.skills ?? 0}
                          </p>
                          <p className="text-[10px] text-gray-500 uppercase tracking-wide">
                            Skills
                          </p>
                        </div>
                      </div>

                      {/* Sort Order */}
                      <div className="mt-4 pt-4 border-t border-white/5">
                        <p className="text-xs text-gray-500">
                          Sort Order:{" "}
                          <span className="text-gray-300">
                            {profile.sortOrder}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Profile Form Modal */}
              {isProfileFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                  <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0A1520] border border-cyan-500/20 p-6">
                    {/* Modal Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {editingProfileId ? "Edit Profile" : "Create Profile"}
                        </h3>

                        <p className="text-sm text-gray-400 mt-1">
                          Configure profile identity and metadata.
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setIsProfileFormOpen(false);
                          setEditingProfileId(null);
                        }}
                        className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    <div className="space-y-5">
                      {/* Name + Slug */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-300 mb-2">
                            Name
                          </label>

                          <input
                            type="text"
                            value={profileForm.name}
                            onChange={(e) =>
                              setProfileForm({
                                ...profileForm,
                                name: e.target.value,
                              })
                            }
                            placeholder="General Profile"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 outline-none focus:border-[#00FFFF]"
                          />
                        </div>

                        <div>
                          <label className="block text-sm text-gray-300 mb-2">
                            Slug
                          </label>

                          <input
                            type="text"
                            value={profileForm.slug}
                            onChange={(e) =>
                              setProfileForm({
                                ...profileForm,
                                slug: e.target.value,
                              })
                            }
                            placeholder="general"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 outline-none focus:border-[#00FFFF]"
                          />
                        </div>
                      </div>

                      {/* Type + Role Label */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-300 mb-2">
                            Type
                          </label>

                          <select
                            value={profileForm.type}
                            onChange={(e) =>
                              setProfileForm({
                                ...profileForm,
                                type: e.target.value as
                                  "GENERAL" | "ROLE" | "DOMAIN",
                              })
                            }
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#00FFFF]"
                          >
                            <option value="GENERAL" className="bg-[#0A1520]">
                              GENERAL
                            </option>

                            <option value="ROLE" className="bg-[#0A1520]">
                              ROLE
                            </option>

                            <option value="DOMAIN" className="bg-[#0A1520]">
                              DOMAIN
                            </option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm text-gray-300 mb-2">
                            Role Label
                          </label>

                          <input
                            type="text"
                            value={profileForm.roleLabel}
                            onChange={(e) =>
                              setProfileForm({
                                ...profileForm,
                                roleLabel: e.target.value,
                              })
                            }
                            placeholder="Software Engineer"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 outline-none focus:border-[#00FFFF]"
                          />
                        </div>
                      </div>

                      {/* Headlines */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-300 mb-2">
                            Headline â€” English
                          </label>

                          <input
                            type="text"
                            value={profileForm.headlineEn}
                            onChange={(e) =>
                              setProfileForm({
                                ...profileForm,
                                headlineEn: e.target.value,
                              })
                            }
                            placeholder="Technology and Business Professional"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 outline-none focus:border-[#00FFFF]"
                          />
                        </div>

                        <div>
                          <label className="block text-sm text-gray-300 mb-2">
                            Headline â€” Indonesian
                          </label>

                          <input
                            type="text"
                            value={profileForm.headlineId}
                            onChange={(e) =>
                              setProfileForm({
                                ...profileForm,
                                headlineId: e.target.value,
                              })
                            }
                            placeholder="Profesional Teknologi dan Bisnis"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 outline-none focus:border-[#00FFFF]"
                          />
                        </div>
                      </div>

                      {/* Summary */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-300 mb-2">
                            Summary â€” English
                          </label>

                          <textarea
                            value={profileForm.summaryEn}
                            onChange={(e) =>
                              setProfileForm({
                                ...profileForm,
                                summaryEn: e.target.value,
                              })
                            }
                            rows={5}
                            placeholder="Professional summary..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 outline-none focus:border-[#00FFFF] resize-none"
                          />
                        </div>

                        <div>
                          <label className="block text-sm text-gray-300 mb-2">
                            Summary â€” Indonesian
                          </label>

                          <textarea
                            value={profileForm.summaryId}
                            onChange={(e) =>
                              setProfileForm({
                                ...profileForm,
                                summaryId: e.target.value,
                              })
                            }
                            rows={5}
                            placeholder="Ringkasan profesional..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 outline-none focus:border-[#00FFFF] resize-none"
                          />
                        </div>
                      </div>

                      {/* Sort + Active */}
                      <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                        <div className="w-full sm:w-40">
                          <label className="block text-sm text-gray-300 mb-2">
                            Sort Order
                          </label>

                          <input
                            type="number"
                            value={profileForm.sortOrder}
                            onChange={(e) =>
                              setProfileForm({
                                ...profileForm,
                                sortOrder: Number(e.target.value),
                              })
                            }
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#00FFFF]"
                          />
                        </div>

                        <label className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={profileForm.isActive}
                            onChange={(e) =>
                              setProfileForm({
                                ...profileForm,
                                isActive: e.target.checked,
                              })
                            }
                            className="w-4 h-4 accent-cyan-400"
                          />

                          <span className="text-sm text-gray-300">
                            Active Profile
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Modal Actions */}
                    <div className="flex justify-end gap-3 mt-8 pt-5 border-t border-white/10">
                      <button
                        onClick={() => {
                          setIsProfileFormOpen(false);
                          setEditingProfileId(null);
                        }}
                        disabled={isSavingProfile}
                        className="px-5 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-colors disabled:opacity-50"
                      >
                        Cancel
                      </button>

                      <button
                        onClick={
                          editingProfileId
                            ? handleUpdateProfile
                            : handleCreateProfile
                        }
                        disabled={
                          isSavingProfile ||
                          !profileForm.name.trim() ||
                          !profileForm.slug.trim()
                        }
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#00FFFF] to-[#00CCCC] text-[#050B12] font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSavingProfile
                          ? "Saving..."
                          : editingProfileId
                            ? "Update Profile"
                            : "Create Profile"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
  );
}

