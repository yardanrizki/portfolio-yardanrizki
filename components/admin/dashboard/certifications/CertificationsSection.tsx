"use client";
import { Award } from "lucide-react";

type Profile = {
  id: string;
  name: string;
  type: "GENERAL" | "ROLE" | "DOMAIN";
};

type CertificationsSectionProps = {
  certificates: any[];
  profiles: Profile[];
  isLoadingCertificates: boolean;
  isCertificateFormOpen: boolean;
  isSavingCertificate: boolean;
  editingCertificateId: string | null;
  selectedCertificateProfileIds: string[];
  certificateForm: {
    titleEn: string;
    titleId: string;
    issuerEn: string;
    issuerId: string;
    issuedDate: string;
    expiryDate: string;
    credentialId: string;
    verifyUrl: string;
    type: string;
    coverImageUrl: string;
    isActive: boolean;
    sortOrder: number;
  };
  setEditingCertificateId: (value: string | null) => void;
  setSelectedCertificateProfileIds: (
    value: string[] | ((prev: string[]) => string[])
  ) => void;
  setCertificateForm: (
    value:
      | CertificationsSectionProps["certificateForm"]
      | ((
          prev: CertificationsSectionProps["certificateForm"]
        ) => CertificationsSectionProps["certificateForm"])
  ) => void;
  setIsCertificateFormOpen: (value: boolean) => void;
  handleEditCertificate: (id: string) => void;
  handleDeleteCertificate: (id: string) => void;
  handleCreateCertificate: () => void;
  handleUpdateCertificate: () => void;
};

export default function CertificationsSection({
  certificates,
  profiles,
  isLoadingCertificates,
  isCertificateFormOpen,
  isSavingCertificate,
  editingCertificateId,
  selectedCertificateProfileIds,
  certificateForm,
  setEditingCertificateId,
  setSelectedCertificateProfileIds,
  setCertificateForm,
  setIsCertificateFormOpen,
  handleEditCertificate,
  handleDeleteCertificate,
  handleCreateCertificate,
  handleUpdateCertificate,
}: CertificationsSectionProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Certifications</h2>
          <p className="text-gray-400 mt-1">
            Manage certifications, courses, awards, and credentials.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingCertificateId(null);
            setSelectedCertificateProfileIds([]);

            setCertificateForm({
              titleEn: "",
              titleId: "",
              issuerEn: "",
              issuerId: "",
              issuedDate: "",
              expiryDate: "",
              credentialId: "",
              verifyUrl: "",
              type: "CERTIFICATION",
              coverImageUrl: "",
              isActive: true,
              sortOrder: 0,
            });

            setIsCertificateFormOpen(true);
          }}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#00FFFF] to-[#00CCCC] text-[#050B12] font-semibold hover:scale-105 transition-transform"
        >
          + Add Certificate
        </button>
      </div>

      {/* Loading */}
      {isLoadingCertificates && (
        <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-12 border border-white/10 text-center">
          <p className="text-gray-400">Loading certificates...</p>
        </div>
      )}

      {/* Empty */}
      {!isLoadingCertificates && certificates.length === 0 && (
        <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-12 border border-white/10 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#00FFFF]/20 flex items-center justify-center">
            <Award size={32} className="text-[#00FFFF]" />
          </div>

          <h3 className="text-xl font-bold text-white mb-2">No Certificates</h3>

          <p className="text-gray-400 mb-6">
            Add your first certificate to get started.
          </p>

          <button
            onClick={() => {
              setEditingCertificateId(null);
              setSelectedCertificateProfileIds([]);
              setIsCertificateFormOpen(true);
            }}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#00FFFF] to-[#00CCCC] text-[#050B12] font-semibold"
          >
            Add Certificate
          </button>
        </div>
      )}

      {/* Certificate List */}
      {!isLoadingCertificates && certificates.length > 0 && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          {certificates.map((certificate) => (
            <div
              key={certificate.id}
              className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-white">
                    {certificate.titleEn}
                  </h3>

                  {certificate.issuerEn && (
                    <p className="text-sm text-gray-400 mt-1">
                      {certificate.issuerEn}
                    </p>
                  )}
                </div>

                <span
                  className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium ${
                    certificate.isActive
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {certificate.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Type</p>
                  <p className="text-gray-300 mt-1">{certificate.type}</p>
                </div>

                <div>
                  <p className="text-gray-500">Issued</p>
                  <p className="text-gray-300 mt-1">
                    {certificate.issuedDate
                      ? new Date(certificate.issuedDate).toLocaleDateString()
                      : "-"}
                  </p>
                </div>
              </div>

              {/* Profiles */}
              <div className="mt-5">
                <p className="text-gray-500 text-sm mb-2">Profiles</p>

                <div className="flex flex-wrap gap-2">
                  {Array.isArray(certificate.profiles) &&
                  certificate.profiles.length > 0 ? (
                    certificate.profiles.map(
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

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 mt-6 pt-5 border-t border-white/10">
                <button
                  onClick={() => handleEditCertificate(certificate.id)}
                  className="px-4 py-2 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDeleteCertificate(certificate.id)}
                  className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Certificate Modal */}
      {isCertificateFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0A1520] border border-white/10 rounded-2xl shadow-2xl">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">
                  {editingCertificateId
                    ? "Edit Certificate"
                    : "Add Certificate"}
                </h3>

                <p className="text-sm text-gray-400 mt-1">
                  Manage certificate information and profile assignment.
                </p>
              </div>

              <button
                onClick={() => setIsCertificateFormOpen(false)}
                className="text-gray-400 hover:text-white text-xl"
              >
                Ã—
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
                    value={certificateForm.titleEn}
                    onChange={(e) =>
                      setCertificateForm((prev) => ({
                        ...prev,
                        titleEn: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#00FFFF]"
                    placeholder="Certificate title"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Title ID
                  </label>

                  <input
                    value={certificateForm.titleId}
                    onChange={(e) =>
                      setCertificateForm((prev) => ({
                        ...prev,
                        titleId: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#00FFFF]"
                    placeholder="Judul sertifikat"
                  />
                </div>
              </div>

              {/* Issuer */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Issuer EN
                  </label>

                  <input
                    value={certificateForm.issuerEn}
                    onChange={(e) =>
                      setCertificateForm((prev) => ({
                        ...prev,
                        issuerEn: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#00FFFF]"
                    placeholder="Issuer"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Issuer ID
                  </label>

                  <input
                    value={certificateForm.issuerId}
                    onChange={(e) =>
                      setCertificateForm((prev) => ({
                        ...prev,
                        issuerId: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#00FFFF]"
                    placeholder="Penerbit"
                  />
                </div>
              </div>

              {/* Dates + Type */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Issued Date
                  </label>

                  <input
                    type="date"
                    value={certificateForm.issuedDate}
                    onChange={(e) =>
                      setCertificateForm((prev) => ({
                        ...prev,
                        issuedDate: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#00FFFF]"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Expiry Date
                  </label>

                  <input
                    type="date"
                    value={certificateForm.expiryDate}
                    onChange={(e) =>
                      setCertificateForm((prev) => ({
                        ...prev,
                        expiryDate: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#00FFFF]"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Type
                  </label>

                  <select
                    value={certificateForm.type}
                    onChange={(e) =>
                      setCertificateForm((prev) => ({
                        ...prev,
                        type: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#00FFFF]"
                  >
                    <option value="CERTIFICATION">Certification</option>
                    <option value="COURSE">Course</option>
                    <option value="TRAINING">Training</option>
                    <option value="AWARD">Award</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
              </div>

              {/* Credential */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Credential ID
                  </label>

                  <input
                    value={certificateForm.credentialId}
                    onChange={(e) =>
                      setCertificateForm((prev) => ({
                        ...prev,
                        credentialId: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#00FFFF]"
                    placeholder="Credential ID"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Verification URL
                  </label>

                  <input
                    value={certificateForm.verifyUrl}
                    onChange={(e) =>
                      setCertificateForm((prev) => ({
                        ...prev,
                        verifyUrl: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#00FFFF]"
                    placeholder="https://..."
                  />
                </div>
              </div>

              {/* Cover */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Cover Image URL
                </label>

                <input
                  value={certificateForm.coverImageUrl}
                  onChange={(e) =>
                    setCertificateForm((prev) => ({
                      ...prev,
                      coverImageUrl: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#00FFFF]"
                  placeholder="https://..."
                />
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
                      const checked = selectedCertificateProfileIds.includes(
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
                              setSelectedCertificateProfileIds((prev) =>
                                e.target.checked
                                  ? [...prev, profile.id]
                                  : prev.filter((id) => id !== profile.id)
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
                    value={certificateForm.sortOrder}
                    onChange={(e) =>
                      setCertificateForm((prev) => ({
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
                    checked={certificateForm.isActive}
                    onChange={(e) =>
                      setCertificateForm((prev) => ({
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
                onClick={() => setIsCertificateFormOpen(false)}
                className="px-5 py-3 rounded-xl bg-white/5 text-gray-300 hover:bg-white/10"
              >
                Cancel
              </button>

              <button
                onClick={
                  editingCertificateId
                    ? handleUpdateCertificate
                    : handleCreateCertificate
                }
                disabled={isSavingCertificate}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#00FFFF] to-[#00CCCC] text-[#050B12] font-semibold disabled:opacity-50"
              >
                {isSavingCertificate
                  ? "Saving..."
                  : editingCertificateId
                    ? "Update Certificate"
                    : "Create Certificate"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
