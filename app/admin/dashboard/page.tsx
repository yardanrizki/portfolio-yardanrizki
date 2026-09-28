"use client";
import { useEffect, useState } from "react";
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
  X,
  UserRound,
} from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

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
const [editingTrainingId, setEditingTrainingId] =
  useState<string | null>(null);

const [selectedTrainingProfileIds, setSelectedTrainingProfileIds] =
  useState<string[]>([]);

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
      throw new Error(
        result.message || "Failed to fetch trainings"
      );
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
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    label: "Total Projects",
                    value: stats.totalProjects,
                    color: "#00FFFF",
                  },
                  {
                    label: "Certifications",
                    value: stats.totalCertificates,
                    color: "#FF8C00",
                  },
                  {
                    label: "Messages",
                    value: stats.totalMessages,
                    color: "#00FFFF",
                  },
                  {
                    label: "Publications",
                    value: stats.totalPublications,
                    color: "#FF8C00",
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10"
                  >
                    <p className="text-gray-400 text-sm mb-2">{stat.label}</p>

                    <p
                      className="text-4xl font-bold"
                      style={{ color: stat.color }}
                    >
                      {isLoadingStats ? "..." : stat.value}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Recent Messages */}
              <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Recent Messages</h3>
                  <button className="text-[#00FFFF] hover:text-[#00CCCC] transition-colors">
                    View All
                  </button>
                </div>

                <div className="space-y-4">
                  {recentMessages.map((message, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{message.name}</h4>
                          <p className="text-sm text-gray-400 mb-1">
                            {message.email}
                          </p>
                          <p className="text-sm text-[#00FFFF]">
                            {message.subject}
                          </p>
                        </div>
                        <span className="text-xs text-gray-500">
                          {message.date}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === "projects" && (
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
                        <label className="block text-sm text-gray-400 mb-2">
                          Role
                        </label>
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
                            const isSelected = selectedProfileIds.includes(
                              profile.id
                            );

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
                                        current.filter(
                                          (id) => id !== profile.id
                                        )
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
                    const featuredProfile = project.profiles.find(
                      (profile) => profile.isFeatured
                    );

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
                              {project.techStack.map((tech) => (
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
          )}

          {/* Other Tabs - Placeholder */}
          {activeTab === "experience" && (
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
                          Role Title — English
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
                          Role Title — Indonesian
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
                        Description — English
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
                        Description — Indonesian
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
          )}
          {/* Profiles */}
          {activeTab === "profiles" && (
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
                            Headline — English
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
                            Headline — Indonesian
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
                            Summary — English
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
                            Summary — Indonesian
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
          )}

          {activeTab === "certifications" && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Certifications
                  </h2>
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

                  <h3 className="text-xl font-bold text-white mb-2">
                    No Certificates
                  </h3>

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
                          <p className="text-gray-300 mt-1">
                            {certificate.type}
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-500">Issued</p>
                          <p className="text-gray-300 mt-1">
                            {certificate.issuedDate
                              ? new Date(
                                  certificate.issuedDate
                                ).toLocaleDateString()
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
                          onClick={() =>
                            handleDeleteCertificate(certificate.id)
                          }
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
                              const checked =
                                selectedCertificateProfileIds.includes(
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
                                      setSelectedCertificateProfileIds(
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
