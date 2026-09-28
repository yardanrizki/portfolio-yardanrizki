"use client";
import { useEffect, useState } from "react";
import ProjectsSection from "@/components/admin/dashboard/projects/ProjectsSection";
import ExperienceSection from "@/components/admin/dashboard/experience/ExperienceSection";
import OverviewSection from "@/components/admin/dashboard/overview/OverviewSection";
import ProfilesSection from "@/components/admin/dashboard/profiles/ProfilesSection";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Award,
  MessageSquare,
  Settings,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Menu,
  GraduationCap,
  X,
  UserRound,
} from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import TrainingsSection from "@/components/admin/dashboard/trainings/TrainingsSection";
import CertificationsSection from "@/components/admin/dashboard/certifications/CertificationsSection";

type DashboardStats = {
  totalProjects: number;
  totalCertificates: number;
  totalMessages: number;
  totalPublications: number;
};
type Project = {
  id: string;
  titleEn: string;
  titleId: string | null;
  shortDescriptionEn: string | null;
  shortDescriptionId: string | null;
  techStack: string[];
  roleInProject: string | null;
  status: string;
  coverImageUrl: string | null;
  isActive: boolean;
  profiles: {
    isFeatured: boolean;
    isIncluded: boolean;
    profile: {
      name: string;
      slug: string;
    };
  }[];
};

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

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    totalCertificates: 0,
    totalMessages: 0,
    totalPublications: 0,
  });
  const [projects, setProjects] = useState<Project[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isLoadingProfiles, setIsLoadingProfiles] = useState(false);
  const [isProfileFormOpen, setIsProfileFormOpen] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [editingProfileId, setEditingProfileId] = useState<string | null>(null);

  const [profileForm, setProfileForm] = useState({
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
  const [selectedProfileIds, setSelectedProfileIds] = useState<string[]>([]);

  const [isLoadingProjects, setIsLoadingProjects] = useState(false);
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const [isSavingProject, setIsSavingProject] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoadingExperiences, setIsLoadingExperiences] = useState(false);
  const [isExperienceFormOpen, setIsExperienceFormOpen] = useState(false);
  const [isSavingExperience, setIsSavingExperience] = useState(false);
  const [editingExperienceId, setEditingExperienceId] = useState<string | null>(
    null
  );
  const [trainings, setTrainings] = useState<any[]>([]);
  const [isLoadingTrainings, setIsLoadingTrainings] = useState(false);
  const [isTrainingFormOpen, setIsTrainingFormOpen] = useState(false);
  const [isSavingTraining, setIsSavingTraining] = useState(false);
  const [editingTrainingId, setEditingTrainingId] = useState<string | null>(
    null
  );

  const [selectedTrainingProfileIds, setSelectedTrainingProfileIds] = useState<
    string[]
  >([]);

  const [trainingForm, setTrainingForm] = useState({
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

  const [certificates, setCertificates] = useState<any[]>([]);
  const [isLoadingCertificates, setIsLoadingCertificates] = useState(false);
  const [isCertificateFormOpen, setIsCertificateFormOpen] = useState(false);
  const [isSavingCertificate, setIsSavingCertificate] = useState(false);
  const [editingCertificateId, setEditingCertificateId] = useState<
    string | null
  >(null);

  const [selectedCertificateProfileIds, setSelectedCertificateProfileIds] =
    useState<string[]>([]);

  const [certificateForm, setCertificateForm] = useState({
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
  const [selectedExperienceProfileIds, setSelectedExperienceProfileIds] =
    useState<string[]>([]);

  const [experienceForm, setExperienceForm] = useState({
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
  const fetchCertificates = async () => {
    try {
      setIsLoadingCertificates(true);

      const response = await fetch("/api/certificates");
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to fetch certificates");
      }

      setCertificates(result.data);
    } catch (error) {
      console.error("Failed to fetch certificates:", error);
    } finally {
      setIsLoadingCertificates(false);
    }
  };

  const fetchTrainings = async () => {
    try {
      setIsLoadingTrainings(true);

      const response = await fetch("/api/trainings");
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to fetch trainings");
      }

      setTrainings(result.data);
    } catch (error) {
      console.error("Failed to fetch trainings:", error);
    } finally {
      setIsLoadingTrainings(false);
    }
  };

  const fetchProfiles = async () => {
    try {
      setIsLoadingProfiles(true);

      const response = await fetch("/api/profiles");
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to fetch profiles");
      }

      setProfiles(result.data);
    } catch (error) {
      console.error("Failed to fetch profiles:", error);
    } finally {
      setIsLoadingProfiles(false);
    }
  };
  const [projectForm, setProjectForm] = useState({
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
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const router = useRouter();

  const fetchExperiences = async () => {
    try {
      setIsLoadingExperiences(true);

      const response = await fetch("/api/experiences");
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to fetch experiences");
      }

      setExperiences(result.data || []);
    } catch (error) {
      console.error("Failed to fetch experiences:", error);
    } finally {
      setIsLoadingExperiences(false);
    }
  };

  const handleCreateExperience = async () => {
    try {
      setIsSavingExperience(true);

      const payload = {
        ...experienceForm,

        employmentType: experienceForm.employmentType || null,

        endDate:
          experienceForm.isCurrent || !experienceForm.endDate
            ? null
            : experienceForm.endDate,

        responsibilities: experienceForm.responsibilities
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),

        achievements: experienceForm.achievements
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),

        profileIds: selectedExperienceProfileIds,
      };
      console.log("EXPERIENCE FORM:", experienceForm);
      console.log("START DATE:", experienceForm.startDate);
      const response = await fetch("/api/experiences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName: experienceForm.companyName,
          location: experienceForm.location,
          roleTitleEn: experienceForm.roleTitleEn,
          roleTitleId: experienceForm.roleTitleId,
          employmentType: experienceForm.employmentType,
          startDate: experienceForm.startDate,
          endDate: experienceForm.endDate || null,
          isCurrent: experienceForm.isCurrent,
          descriptionEn: experienceForm.descriptionEn,
          descriptionId: experienceForm.descriptionId,
          responsibilities: experienceForm.responsibilities
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean),
          achievements: experienceForm.achievements
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean),
          logoUrl: experienceForm.logoUrl,
          websiteUrl: experienceForm.websiteUrl,
          isActive: experienceForm.isActive,
          sortOrder: experienceForm.sortOrder,
          profileIds: selectedExperienceProfileIds,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to create experience");
      }

      await fetchExperiences();

      setIsExperienceFormOpen(false);
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
    } catch (error) {
      console.error("Failed to create experience:", error);
    } finally {
      setIsSavingExperience(false);
    }
  };

  const handleEditExperience = async (id: string) => {
    try {
      const response = await fetch(`/api/experiences/${id}`);
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to fetch experience");
      }

      const experience = result.data;

      setExperienceForm({
        companyName: experience.companyName ?? "",
        location: experience.location ?? "",
        roleTitleEn: experience.roleTitleEn ?? "",
        roleTitleId: experience.roleTitleId ?? "",
        employmentType: experience.employmentType ?? "",
        startDate: experience.startDate
          ? experience.startDate.slice(0, 10)
          : "",
        endDate: experience.endDate ? experience.endDate.slice(0, 10) : "",
        isCurrent: experience.isCurrent ?? false,
        descriptionEn: experience.descriptionEn ?? "",
        descriptionId: experience.descriptionId ?? "",
        responsibilities: Array.isArray(experience.responsibilities)
          ? experience.responsibilities.join("\n")
          : "",
        achievements: Array.isArray(experience.achievements)
          ? experience.achievements.join("\n")
          : "",
        logoUrl: experience.logoUrl ?? "",
        websiteUrl: experience.websiteUrl ?? "",
        isActive: experience.isActive ?? true,
        sortOrder: experience.sortOrder ?? 0,
      });

      setSelectedExperienceProfileIds(
        Array.isArray(experience.profiles)
          ? experience.profiles.map(
              (item: { profileId: string }) => item.profileId
            )
          : []
      );

      setEditingExperienceId(id);
      setIsExperienceFormOpen(true);
    } catch (error) {
      console.error("Failed to edit experience:", error);
    }
  };

  const handleUpdateExperience = async () => {
    if (!editingExperienceId) return;

    try {
      setIsSavingExperience(true);

      const payload = {
        ...experienceForm,

        employmentType: experienceForm.employmentType || null,

        endDate:
          experienceForm.isCurrent || !experienceForm.endDate
            ? null
            : experienceForm.endDate,

        responsibilities: experienceForm.responsibilities
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),

        achievements: experienceForm.achievements
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),

        profileIds: selectedExperienceProfileIds,
      };

      const response = await fetch(`/api/experiences/${editingExperienceId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to update experience");
      }

      await fetchExperiences();

      setIsExperienceFormOpen(false);
      setEditingExperienceId(null);
      setSelectedExperienceProfileIds([]);
    } catch (error) {
      console.error("Failed to update experience:", error);
    } finally {
      setIsSavingExperience(false);
    }
  };

  const handleDeleteExperience = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this experience?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`/api/experiences/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to delete experience");
      }

      await fetchExperiences();
    } catch (error) {
      console.error("Failed to delete experience:", error);
    }
  };
  const handleCreateProfile = async () => {
    try {
      setIsSavingProfile(true);

      const response = await fetch("/api/profiles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug: profileForm.slug,
          name: profileForm.name,
          type: profileForm.type,
          roleLabel: profileForm.roleLabel,
          headlineEn: profileForm.headlineEn,
          headlineId: profileForm.headlineId,
          summaryEn: profileForm.summaryEn,
          summaryId: profileForm.summaryId,
          isActive: profileForm.isActive,
          sortOrder: profileForm.sortOrder,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to create profile");
      }

      await fetchProfiles();

      setIsProfileFormOpen(false);
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
    } catch (error) {
      console.error("Failed to create profile:", error);
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleEditProfile = async (id: string) => {
    try {
      const response = await fetch(`/api/profiles/${id}`);
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to fetch profile");
      }

      const profile = result.data;

      setProfileForm({
        slug: profile.slug ?? "",
        name: profile.name ?? "",
        type: profile.type ?? "GENERAL",
        roleLabel: profile.roleLabel ?? "",
        headlineEn: profile.headlineEn ?? "",
        headlineId: profile.headlineId ?? "",
        summaryEn: profile.summaryEn ?? "",
        summaryId: profile.summaryId ?? "",
        isActive: profile.isActive ?? true,
        sortOrder: profile.sortOrder ?? 0,
      });

      setEditingProfileId(id);
      setIsProfileFormOpen(true);
    } catch (error) {
      console.error("Failed to edit profile:", error);
    }
  };

  const handleUpdateProfile = async () => {
    if (!editingProfileId) return;

    try {
      setIsSavingProfile(true);

      const response = await fetch(`/api/profiles/${editingProfileId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug: profileForm.slug,
          name: profileForm.name,
          type: profileForm.type,
          roleLabel: profileForm.roleLabel,
          headlineEn: profileForm.headlineEn,
          headlineId: profileForm.headlineId,
          summaryEn: profileForm.summaryEn,
          summaryId: profileForm.summaryId,
          isActive: profileForm.isActive,
          sortOrder: profileForm.sortOrder,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to update profile");
      }

      await fetchProfiles();

      setIsProfileFormOpen(false);
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
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleDeleteProfile = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this profile?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`/api/profiles/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to delete profile");
      }

      await fetchProfiles();
    } catch (error) {
      console.error("Failed to delete profile:", error);
    }
  };

  const handleCreateCertificate = async () => {
    try {
      setIsSavingCertificate(true);

      const response = await fetch("/api/certificates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titleEn: certificateForm.titleEn,
          titleId: certificateForm.titleId,
          issuerEn: certificateForm.issuerEn,
          issuerId: certificateForm.issuerId,
          issuedDate: certificateForm.issuedDate || null,
          expiryDate: certificateForm.expiryDate || null,
          credentialId: certificateForm.credentialId,
          verifyUrl: certificateForm.verifyUrl,
          type: certificateForm.type,
          coverImageUrl: certificateForm.coverImageUrl,
          isActive: certificateForm.isActive,
          sortOrder: certificateForm.sortOrder,
          profileIds: selectedCertificateProfileIds,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to create certificate");
      }

      await fetchCertificates();

      setIsCertificateFormOpen(false);
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
    } catch (error) {
      console.error("Failed to create certificate:", error);
    } finally {
      setIsSavingCertificate(false);
    }
  };

  const handleEditCertificate = async (id: string) => {
    try {
      const response = await fetch(`/api/certificates/${id}`);
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to fetch certificate");
      }

      const certificate = result.data;

      setCertificateForm({
        titleEn: certificate.titleEn ?? "",
        titleId: certificate.titleId ?? "",
        issuerEn: certificate.issuerEn ?? "",
        issuerId: certificate.issuerId ?? "",
        issuedDate: certificate.issuedDate
          ? certificate.issuedDate.slice(0, 10)
          : "",
        expiryDate: certificate.expiryDate
          ? certificate.expiryDate.slice(0, 10)
          : "",
        credentialId: certificate.credentialId ?? "",
        verifyUrl: certificate.verifyUrl ?? "",
        type: certificate.type ?? "CERTIFICATION",
        coverImageUrl: certificate.coverImageUrl ?? "",
        isActive: certificate.isActive ?? true,
        sortOrder: certificate.sortOrder ?? 0,
      });

      setSelectedCertificateProfileIds(
        Array.isArray(certificate.profiles)
          ? certificate.profiles.map(
              (item: { profileId: string }) => item.profileId
            )
          : []
      );

      setEditingCertificateId(id);
      setIsCertificateFormOpen(true);
    } catch (error) {
      console.error("Failed to edit certificate:", error);
    }
  };

  const handleUpdateCertificate = async () => {
    if (!editingCertificateId) return;

    try {
      setIsSavingCertificate(true);

      const response = await fetch(
        `/api/certificates/${editingCertificateId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            titleEn: certificateForm.titleEn,
            titleId: certificateForm.titleId,
            issuerEn: certificateForm.issuerEn,
            issuerId: certificateForm.issuerId,
            issuedDate: certificateForm.issuedDate || null,
            expiryDate: certificateForm.expiryDate || null,
            credentialId: certificateForm.credentialId,
            verifyUrl: certificateForm.verifyUrl,
            type: certificateForm.type,
            coverImageUrl: certificateForm.coverImageUrl,
            isActive: certificateForm.isActive,
            sortOrder: certificateForm.sortOrder,
            profileIds: selectedCertificateProfileIds,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to update certificate");
      }

      await fetchCertificates();

      setIsCertificateFormOpen(false);
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
    } catch (error) {
      console.error("Failed to update certificate:", error);
    } finally {
      setIsSavingCertificate(false);
    }
  };

  const handleDeleteCertificate = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this certificate?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`/api/certificates/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to delete certificate");
      }

      await fetchCertificates();
    } catch (error) {
      console.error("Failed to delete certificate:", error);
    }
  };

  const handleCreateTraining = async () => {
    try {
      setIsSavingTraining(true);

      const response = await fetch("/api/trainings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titleEn: trainingForm.titleEn,
          titleId: trainingForm.titleId,
          providerEn: trainingForm.providerEn,
          providerId: trainingForm.providerId,
          startDate: trainingForm.startDate || null,
          endDate: trainingForm.endDate || null,
          durationHours: trainingForm.durationHours
            ? Number(trainingForm.durationHours)
            : null,
          certificateUrl: trainingForm.certificateUrl,
          verifyUrl: trainingForm.verifyUrl,
          coverImageUrl: trainingForm.coverImageUrl,
          isActive: trainingForm.isActive,
          sortOrder: trainingForm.sortOrder,
          profileIds: selectedTrainingProfileIds,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to create training");
      }

      await fetchTrainings();
      await fetchProfiles();

      setIsTrainingFormOpen(false);
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
    } catch (error) {
      console.error("Failed to create training:", error);
    } finally {
      setIsSavingTraining(false);
    }
  };

  const handleEditTraining = async (id: string) => {
    try {
      const response = await fetch(`/api/trainings/${id}`);
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to fetch training");
      }

      const training = result.data;

      setTrainingForm({
        titleEn: training.titleEn ?? "",
        titleId: training.titleId ?? "",
        providerEn: training.providerEn ?? "",
        providerId: training.providerId ?? "",
        startDate: training.startDate ? training.startDate.slice(0, 10) : "",
        endDate: training.endDate ? training.endDate.slice(0, 10) : "",
        durationHours:
          training.durationHours !== null &&
          training.durationHours !== undefined
            ? String(training.durationHours)
            : "",
        certificateUrl: training.certificateUrl ?? "",
        verifyUrl: training.verifyUrl ?? "",
        coverImageUrl: training.coverImageUrl ?? "",
        isActive: training.isActive ?? true,
        sortOrder: training.sortOrder ?? 0,
      });

      setSelectedTrainingProfileIds(
        Array.isArray(training.profiles)
          ? training.profiles.map(
              (item: { profileId: string }) => item.profileId
            )
          : []
      );

      setEditingTrainingId(id);
      setIsTrainingFormOpen(true);
    } catch (error) {
      console.error("Failed to edit training:", error);
    }
  };

  const handleUpdateTraining = async () => {
    if (!editingTrainingId) return;

    try {
      setIsSavingTraining(true);

      const response = await fetch(`/api/trainings/${editingTrainingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titleEn: trainingForm.titleEn,
          titleId: trainingForm.titleId,
          providerEn: trainingForm.providerEn,
          providerId: trainingForm.providerId,
          startDate: trainingForm.startDate || null,
          endDate: trainingForm.endDate || null,
          durationHours: trainingForm.durationHours
            ? Number(trainingForm.durationHours)
            : null,
          certificateUrl: trainingForm.certificateUrl,
          verifyUrl: trainingForm.verifyUrl,
          coverImageUrl: trainingForm.coverImageUrl,
          isActive: trainingForm.isActive,
          sortOrder: trainingForm.sortOrder,
          profileIds: selectedTrainingProfileIds,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to update training");
      }

      await fetchTrainings();
      await fetchProfiles();

      setIsTrainingFormOpen(false);
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
    } catch (error) {
      console.error("Failed to update training:", error);
    } finally {
      setIsSavingTraining(false);
    }
  };

  const handleDeleteTraining = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this training?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`/api/trainings/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to delete training");
      }

      await fetchTrainings();
      await fetchProfiles();
    } catch (error) {
      console.error("Failed to delete training:", error);
    }
  };

  const fetchProjects = async () => {
    try {
      setIsLoadingProjects(true);

      const response = await fetch("/api/projects");

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const result = await response.json();

      if (result.success) {
        setProjects(result.data);
      }
    } catch (error) {
      console.error("Projects fetch error:", error);
    } finally {
      setIsLoadingProjects(false);
    }
  };
  const handleCreateProject = async (event: React.FormEvent) => {
    event.preventDefault();
    const isEditing = Boolean(editingProjectId);
    try {
      setIsSavingProject(true);

      const payload = {
        ...projectForm,

        techStack: projectForm.techStack
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        profileIds: selectedProfileIds,
      };

      const response = await fetch(
        isEditing ? `/api/projects/${editingProjectId}` : "/api/projects",
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            (isEditing
              ? "Failed to update project"
              : "Failed to create project")
        );
      }

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

      setEditingProjectId(null);
      setIsProjectFormOpen(false);

      await fetchProjects();
    } catch (error) {
      console.error(
        isEditing ? "Update project error:" : "Create project error:",
        error
      );

      alert(error instanceof Error ? error.message : "Failed to save project");
    } finally {
      setIsSavingProject(false);
    }
  };
  const handleDeleteProject = async (projectId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to delete project");
      }

      await fetchProjects();
    } catch (error) {
      console.error("Delete project error:", error);

      alert(
        error instanceof Error ? error.message : "Failed to delete project"
      );
    }
  };
  const handleEditProject = async (projectId: string) => {
    try {
      const response = await fetch(`/api/projects/${projectId}`);

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to fetch project");
      }

      const project = result.data;

      setEditingProjectId(project.id);

      setProjectForm({
        titleEn: project.titleEn || "",
        titleId: project.titleId || "",
        shortDescriptionEn: project.shortDescriptionEn || "",
        shortDescriptionId: project.shortDescriptionId || "",
        longDescriptionEn: project.longDescriptionEn || "",
        longDescriptionId: project.longDescriptionId || "",
        techStack: Array.isArray(project.techStack)
          ? project.techStack.join(", ")
          : "",
        roleInProject: project.roleInProject || "",
        status: project.status || "COMPLETED",
        githubUrl: project.githubUrl || "",
        demoUrl: project.demoUrl || "",
        caseStudyUrl: project.caseStudyUrl || "",
        coverImageUrl: project.coverImageUrl || "",
      });
      setSelectedProfileIds(
        Array.isArray(project.profiles)
          ? project.profiles.map(
              (item: { profileId: string }) => item.profileId
            )
          : []
      );

      setIsProjectFormOpen(true);
    } catch (error) {
      console.error("Edit project error:", error);

      alert(error instanceof Error ? error.message : "Failed to load project");
    }
  };

  useEffect(() => {
    if (activeTab === "projects") {
      fetchProjects();
      fetchProfiles();
    }

    if (activeTab === "experience") {
      fetchExperiences();
      fetchProfiles();
    }

    if (activeTab === "certifications") {
      fetchCertificates();
      fetchProfiles();
    }

    if (activeTab === "profiles") {
      fetchProfiles();
    }

    if (activeTab === "trainings") {
      fetchTrainings();
      fetchProfiles();
    }
  }, [activeTab]);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/admin/overview");

        if (!response.ok) {
          throw new Error("Failed to fetch dashboard stats");
        }

        const result = await response.json();

        if (result.success) {
          setStats(result.data);
        }
      } catch (error) {
        console.error("Dashboard stats error:", error);
      } finally {
        setIsLoadingStats(false);
      }
    }

    fetchStats();
  }, []);

  const handleLogout = () => {
    router.push("/admin");
  };

  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "experience", label: "Experience", icon: FileText },
    { id: "certifications", label: "Certifications", icon: Award },
    { id: "trainings", label: "Trainings", icon: GraduationCap },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "profiles", label: "Profiles", icon: UserRound },
  ];

  const recentMessages = [
    {
      name: "John Doe",
      email: "john@example.com",
      subject: "Project Inquiry",
      date: "2 hours ago",
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      subject: "Collaboration",
      date: "5 hours ago",
    },
    {
      name: "Mike Johnson",
      email: "mike@example.com",
      subject: "Job Offer",
      date: "1 day ago",
    },
  ];

  return (
    <div className="min-h-screen bg-[#050B12] text-white">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white/5 border border-white/10 text-[#00FFFF]"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#0A1520] border-r border-cyan-500/20 transition-transform duration-300 ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="p-6 border-b border-cyan-500/20">
              <h1 className="text-2xl font-bold">
                <span className="text-[#00FFFF]">Admin</span>
                <span className="text-[#FF8C00]">Panel</span>
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                YardanRizki Portfolio
              </p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    activeTab === item.id
                      ? "bg-[#00FFFF] text-[#050B12]"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <item.icon size={20} />
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-cyan-500/20">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-400/10 transition-all duration-300"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">
              {menuItems.find((item) => item.id === activeTab)?.label}
            </h2>
            <p className="text-gray-400">Manage your portfolio content</p>
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <OverviewSection
              stats={stats}
              isLoadingStats={isLoadingStats}
              recentMessages={recentMessages}
            />
          )}

          {activeTab === "projects" && (
            <ProjectsSection
              projects={projects}
              profiles={profiles}
              isLoadingProjects={isLoadingProjects}
              isProjectFormOpen={isProjectFormOpen}
              isSavingProject={isSavingProject}
              editingProjectId={editingProjectId}
              selectedProfileIds={selectedProfileIds}
              projectForm={projectForm}
              setEditingProjectId={setEditingProjectId}
              setSelectedProfileIds={setSelectedProfileIds}
              setProjectForm={setProjectForm}
              setIsProjectFormOpen={setIsProjectFormOpen}
              handleEditProject={handleEditProject}
              handleDeleteProject={handleDeleteProject}
              handleCreateProject={handleCreateProject}
            />
          )}

          {/* Other Tabs - Placeholder */}
          {activeTab === "experience" && (
            <ExperienceSection
              experiences={experiences}
              profiles={profiles}
              isLoadingExperiences={isLoadingExperiences}
              isExperienceFormOpen={isExperienceFormOpen}
              isSavingExperience={isSavingExperience}
              editingExperienceId={editingExperienceId}
              selectedExperienceProfileIds={selectedExperienceProfileIds}
              experienceForm={experienceForm}
              setEditingExperienceId={setEditingExperienceId}
              setSelectedExperienceProfileIds={
                setSelectedExperienceProfileIds
              }
              setExperienceForm={setExperienceForm}
              setIsExperienceFormOpen={setIsExperienceFormOpen}
              handleCreateExperience={handleCreateExperience}
              handleUpdateExperience={handleUpdateExperience}
              handleEditExperience={handleEditExperience}
              handleDeleteExperience={handleDeleteExperience}
            />
          )}
          {activeTab === "profiles" && (
            <ProfilesSection
              profiles={profiles}
              isLoadingProfiles={isLoadingProfiles}
              isProfileFormOpen={isProfileFormOpen}
              isSavingProfile={isSavingProfile}
              editingProfileId={editingProfileId}
              profileForm={profileForm}
              setEditingProfileId={setEditingProfileId}
              setProfileForm={setProfileForm}
              setIsProfileFormOpen={setIsProfileFormOpen}
              handleCreateProfile={handleCreateProfile}
              handleUpdateProfile={handleUpdateProfile}
              handleEditProfile={handleEditProfile}
              handleDeleteProfile={handleDeleteProfile}
            />
          )}
          {activeTab === "certifications" && (
            <CertificationsSection
              certificates={certificates}
              profiles={profiles}
              isLoadingCertificates={isLoadingCertificates}
              isCertificateFormOpen={isCertificateFormOpen}
              isSavingCertificate={isSavingCertificate}
              editingCertificateId={editingCertificateId}
              selectedCertificateProfileIds={selectedCertificateProfileIds}
              certificateForm={certificateForm}
              setEditingCertificateId={setEditingCertificateId}
              setSelectedCertificateProfileIds={
                setSelectedCertificateProfileIds
              }
              setCertificateForm={setCertificateForm}
              setIsCertificateFormOpen={setIsCertificateFormOpen}
              handleEditCertificate={handleEditCertificate}
              handleDeleteCertificate={handleDeleteCertificate}
              handleCreateCertificate={handleCreateCertificate}
              handleUpdateCertificate={handleUpdateCertificate}
            />
          )}
          {activeTab === "trainings" && (
            <TrainingsSection
              trainings={trainings}
              profiles={profiles}
              isLoadingTrainings={isLoadingTrainings}
              isTrainingFormOpen={isTrainingFormOpen}
              isSavingTraining={isSavingTraining}
              editingTrainingId={editingTrainingId}
              selectedTrainingProfileIds={selectedTrainingProfileIds}
              trainingForm={trainingForm}
              setEditingTrainingId={setEditingTrainingId}
              setSelectedTrainingProfileIds={setSelectedTrainingProfileIds}
              setTrainingForm={setTrainingForm}
              setIsTrainingFormOpen={setIsTrainingFormOpen}
              handleEditTraining={handleEditTraining}
              handleDeleteTraining={handleDeleteTraining}
              handleCreateTraining={handleCreateTraining}
              handleUpdateTraining={handleUpdateTraining}
            />
          )}
          {["messages", "settings"].includes(activeTab) && (
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-12 border border-white/10 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#00FFFF]/20 flex items-center justify-center">
                {menuItems.find((item) => item.id === activeTab)?.icon && (
                  <div className="text-[#00FFFF]">
                    {(() => {
                      const Icon = menuItems.find(
                        (item) => item.id === activeTab
                      )!.icon;

                      return <Icon size={32} />;
                    })()}
                  </div>
                )}
              </div>

              <h3 className="text-2xl font-bold mb-2">
                {menuItems.find((item) => item.id === activeTab)?.label}{" "}
                Management
              </h3>

              <p className="text-gray-400 mb-6">
                This section will allow you to manage your {activeTab} content.
              </p>

              <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#00FFFF] to-[#00CCCC] text-[#050B12] font-semibold hover:scale-105 transition-transform">
                Coming Soon
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}




