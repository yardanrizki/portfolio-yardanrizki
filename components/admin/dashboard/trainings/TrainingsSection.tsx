"use client";

import { Award } from "lucide-react";

type Profile = {
  id: string;
  name: string;
  type: "GENERAL" | "ROLE" | "DOMAIN";
};

type TrainingsSectionProps = {
  trainings: any[];
  profiles: Profile[];
  isLoadingTrainings: boolean;
  isTrainingFormOpen: boolean;
  isSavingTraining: boolean;
  editingTrainingId: string | null;
  selectedTrainingProfileIds: string[];
  trainingForm: {
    titleEn: string;
    titleId: string;
    providerEn: string;
    providerId: string;
    startDate: string;
    endDate: string;
    durationHours: string;
    certificateUrl: string;
    verifyUrl: string;
    coverImageUrl: string;
    isActive: boolean;
    sortOrder: number;
  };
  setEditingTrainingId: (value: string | null) => void;
  setSelectedTrainingProfileIds: (
    value: string[] | ((prev: string[]) => string[])
  ) => void;
  setTrainingForm: (
    value:
      | TrainingsSectionProps["trainingForm"]
      | ((
          prev: TrainingsSectionProps["trainingForm"]
        ) => TrainingsSectionProps["trainingForm"])
  ) => void;
  setIsTrainingFormOpen: (value: boolean) => void;
  handleEditTraining: (id: string) => void;
  handleDeleteTraining: (id: string) => void;
  handleCreateTraining: () => void;
  handleUpdateTraining: () => void;
};

export default function TrainingsSection({
  trainings,
  profiles,
  isLoadingTrainings,
  isTrainingFormOpen,
  isSavingTraining,
  editingTrainingId,
  selectedTrainingProfileIds,
  trainingForm,
  setEditingTrainingId,
  setSelectedTrainingProfileIds,
  setTrainingForm,
  setIsTrainingFormOpen,
  handleEditTraining,
  handleDeleteTraining,
  handleCreateTraining,
  handleUpdateTraining,
}: TrainingsSectionProps) {
  return (<div className="space-y-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Trainings
                </h2>

                <p className="text-gray-400 mt-1">
                  Manage training programs, learning records, and professional development.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingTrainingId(null);
                  setSelectedTrainingProfileIds([]);

                  setTrainingForm({
                    titleEn: "",
                    titleId: "",
                    providerEn: "",
                    providerId: "",
                    startDate: "",
                    endDate: "",
                    durationHours: "",
                    certificateUrl: "",
                    verifyUrl: "",
                    coverImageUrl: "",
                    isActive: true,
                    sortOrder: 0,
                  });

                  setIsTrainingFormOpen(true);
                }}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#00FFFF] to-[#00CCCC] text-[#050B12] font-semibold hover:scale-105 transition-transform"
              >
                + Add Training
              </button>
            </div>

            {/* Loading */}
            {isLoadingTrainings && (
              <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-12 border border-white/10 text-center">
                <p className="text-gray-400">Loading trainings...</p>
              </div>
            )}

            {/* Empty */}
            {!isLoadingTrainings && trainings.length === 0 && (
              <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-12 border border-white/10 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#00FFFF]/20 flex items-center justify-center">
                  <Award size={32} className="text-[#00FFFF]" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  No Trainings
                </h3>

                <p className="text-gray-400 mb-6">
                  Add your first training record to get started.
                </p>

                <button
                  onClick={() => {
                    setEditingTrainingId(null);
                    setSelectedTrainingProfileIds([]);

                    setTrainingForm({
                      titleEn: "",
                      titleId: "",
                      providerEn: "",
                      providerId: "",
                      startDate: "",
                      endDate: "",
                      durationHours: "",
                      certificateUrl: "",
                      verifyUrl: "",
                      coverImageUrl: "",
                      isActive: true,
                      sortOrder: 0,
                    });

                    setIsTrainingFormOpen(true);
                  }}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#00FFFF] to-[#00CCCC] text-[#050B12] font-semibold"
                >
                  Add Training
                </button>
              </div>
            )}

            {/* Training List */}
            {!isLoadingTrainings && trainings.length > 0 && (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                {trainings.map((training) => (
                  <div
                    key={training.id}
                    className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-white">
                          {training.titleEn}
                        </h3>

                        {training.providerEn && (
                          <p className="text-sm text-gray-400 mt-1">
                            {training.providerEn}
                          </p>
                        )}
                      </div>

                      <span
                        className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium ${
                          training.isActive
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {training.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Start Date</p>
                        <p className="text-gray-300 mt-1">
                          {training.startDate
                            ? new Date(
                                training.startDate
                              ).toLocaleDateString()
                            : "-"}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-500">End Date</p>
                        <p className="text-gray-300 mt-1">
                          {training.endDate
                            ? new Date(
                                training.endDate
                              ).toLocaleDateString()
                            : "-"}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-500">Duration</p>
                        <p className="text-gray-300 mt-1">
                          {training.durationHours
                            ? `${training.durationHours} hours`
                            : "-"}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-500">Sort Order</p>
                        <p className="text-gray-300 mt-1">
                          {training.sortOrder ?? 0}
                        </p>
                      </div>
                    </div>

                    {/* Profiles */}
                    <div className="mt-5">
                      <p className="text-gray-500 text-sm mb-2">
                        Profiles
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {Array.isArray(training.profiles) &&
                        training.profiles.length > 0 ? (
                          training.profiles.map(
                            (item: {
                              id: string;
                              profileId: string;
                              profile?: {
                                name: string;
                              };
                            }) => (
                              <span
                                key={item.id}
                                className="px-2.5 py-1 rounded-lg bg-[#00FFFF]/10 text-[#00FFFF] text-xs"
                              >
                                {item.profile?.name ?? "Unknown Profile"}
                              </span>
                            )
                          )
                        ) : (
                          <span className="text-gray-600 text-xs">
                            No profile assigned
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap gap-3 mt-5">
                      {training.certificateUrl && (
                        <a
                          href={training.certificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-[#00FFFF] hover:underline"
                        >
                          Certificate
                        </a>
                      )}

                      {training.verifyUrl && (
                        <a
                          href={training.verifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-[#00FFFF] hover:underline"
                        >
                          Verify
                        </a>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-2 mt-6 pt-5 border-t border-white/10">
                      <button
                        onClick={() => handleEditTraining(training.id)}
                        className="px-4 py-2 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDeleteTraining(training.id)}
                        className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Training Modal */}
            {isTrainingFormOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0A1520] border border-white/10 rounded-2xl shadow-2xl">
                  {/* Header */}
                  <div className="p-6 border-b border-white/10 flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {editingTrainingId
                          ? "Edit Training"
                          : "Add Training"}
                      </h3>

                      <p className="text-sm text-gray-400 mt-1">
                        Manage training information and profile assignment.
                      </p>
                    </div>

                    <button
                      onClick={() => setIsTrainingFormOpen(false)}
                      className="text-gray-400 hover:text-white text-xl"
                    >
                      ×
                    </button>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Title */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">
                          Title EN
                        </label>

                        <input
                          value={trainingForm.titleEn}
                          onChange={(e) =>
                            setTrainingForm((prev) => ({
                              ...prev,
                              titleEn: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#00FFFF]"
                          placeholder="Training title"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-400 mb-2">
                          Title ID
                        </label>

                        <input
                          value={trainingForm.titleId}
                          onChange={(e) =>
                            setTrainingForm((prev) => ({
                              ...prev,
                              titleId: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#00FFFF]"
                          placeholder="Judul pelatihan"
                        />
                      </div>
                    </div>

                    {/* Provider */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">
                          Provider EN
                        </label>

                        <input
                          value={trainingForm.providerEn}
                          onChange={(e) =>
                            setTrainingForm((prev) => ({
                              ...prev,
                              providerEn: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#00FFFF]"
                          placeholder="Training provider"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-400 mb-2">
                          Provider ID
                        </label>

                        <input
                          value={trainingForm.providerId}
                          onChange={(e) =>
                            setTrainingForm((prev) => ({
                              ...prev,
                              providerId: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#00FFFF]"
                          placeholder="Penyelenggara pelatihan"
                        />
                      </div>
                    </div>

                    {/* Dates + Duration */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">
                          Start Date
                        </label>

                        <input
                          type="date"
                          value={trainingForm.startDate}
                          onChange={(e) =>
                            setTrainingForm((prev) => ({
                              ...prev,
                              startDate: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#00FFFF]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-400 mb-2">
                          End Date
                        </label>

                        <input
                          type="date"
                          value={trainingForm.endDate}
                          onChange={(e) =>
                            setTrainingForm((prev) => ({
                              ...prev,
                              endDate: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#00FFFF]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-400 mb-2">
                          Duration (Hours)
                        </label>

                        <input
                          type="number"
                          min="0"
                          value={trainingForm.durationHours}
                          onChange={(e) =>
                            setTrainingForm((prev) => ({
                              ...prev,
                              durationHours: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#00FFFF]"
                          placeholder="40"
                        />
                      </div>
                    </div>

                    {/* URLs */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">
                          Certificate URL
                        </label>

                        <input
                          type="url"
                          value={trainingForm.certificateUrl}
                          onChange={(e) =>
                            setTrainingForm((prev) => ({
                              ...prev,
                              certificateUrl: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#00FFFF]"
                          placeholder="https://..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-400 mb-2">
                          Verification URL
                        </label>

                        <input
                          type="url"
                          value={trainingForm.verifyUrl}
                          onChange={(e) =>
                            setTrainingForm((prev) => ({
                              ...prev,
                              verifyUrl: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#00FFFF]"
                          placeholder="https://..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-400 mb-2">
                          Cover Image URL
                        </label>

                        <input
                          type="url"
                          value={trainingForm.coverImageUrl}
                          onChange={(e) =>
                            setTrainingForm((prev) => ({
                              ...prev,
                              coverImageUrl: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#00FFFF]"
                          placeholder="https://..."
                        />
                      </div>
                    </div>

                    {/* Profile Assignment */}
                    <div>
                      <label className="block text-sm text-gray-400 mb-3">
                        Assign to Profiles
                      </label>

                      {profiles.length === 0 ? (
                        <p className="text-sm text-gray-500">
                          No profiles available.
                        </p>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {profiles.map((profile) => {
                            const checked =
                              selectedTrainingProfileIds.includes(
                                profile.id
                              );

                            return (
                              <label
                                key={profile.id}
                                className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${
                                  checked
                                    ? "border-[#00FFFF]/50 bg-[#00FFFF]/10"
                                    : "border-white/10 bg-white/5 hover:bg-white/10"
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  onChange={(e) => {
                                    setSelectedTrainingProfileIds(
                                      (prev) =>
                                        e.target.checked
                                          ? [...prev, profile.id]
                                          : prev.filter(
                                              (id) => id !== profile.id
                                            )
                                    );
                                  }}
                                  className="accent-cyan-400"
                                />

                                <div>
                                  <p className="text-white font-medium">
                                    {profile.name}
                                  </p>

                                  <p className="text-xs text-gray-500">
                                    {profile.type}
                                  </p>
                                </div>
                              </label>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Sort + Active */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
                      <div className="flex-1">
                        <label className="block text-sm text-gray-400 mb-2">
                          Sort Order
                        </label>

                        <input
                          type="number"
                          value={trainingForm.sortOrder}
                          onChange={(e) =>
                            setTrainingForm((prev) => ({
                              ...prev,
                              sortOrder: Number(e.target.value),
                            }))
                          }
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#00FFFF]"
                        />
                      </div>

                      <label className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={trainingForm.isActive}
                          onChange={(e) =>
                            setTrainingForm((prev) => ({
                              ...prev,
                              isActive: e.target.checked,
                            }))
                          }
                          className="accent-cyan-400"
                        />

                        <span className="text-gray-300">Active</span>
                      </label>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="p-6 border-t border-white/10 flex justify-end gap-3">
                    <button
                      onClick={() => setIsTrainingFormOpen(false)}
                      className="px-5 py-3 rounded-xl bg-white/5 text-gray-300 hover:bg-white/10"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={
                        editingTrainingId
                          ? handleUpdateTraining
                          : handleCreateTraining
                      }
                      disabled={
                        isSavingTraining ||
                        !trainingForm.titleEn.trim()
                      }
                      className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#00FFFF] to-[#00CCCC] text-[#050B12] font-semibold disabled:opacity-50"
                    >
                      {isSavingTraining
                        ? "Saving..."
                        : editingTrainingId
                          ? "Update Training"
                          : "Create Training"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>);
} 


