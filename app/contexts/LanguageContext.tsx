"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "id";

interface Translation {
  language: Language;

  admin: {
    backToHome: string;
    portal: string;
    signInDesc: string;
    emailPlaceholder: string;
    passwordPlaceholder: string;
    rememberMe: string;
    forgotPassword: string;
    signIn: string;
    demoCredentials: string;
  };

  footer: {
    rights: string;
  };

  notFound: {
    title: string;
    description: string;
    backHome: string;
  };

  certifications: {
    title: string;
    subtitle: string;
  };

  contact: {
    title: string;
    subtitle: string;
    info: string;
    email: string;
    phone: string;
    location: string;
    connectWith: string;
    name: string;
    subject: string;
    message: string;
    send: string;
  };

  experience: {
    academic: string;
    corporate: string;
    title: string;
    subtitle: string;
    publications: string;
  };

  hero: {
    description: string;
    downloadCV: string;
    viewPortfolio: string;
    viewProjects: string;
  };

  nav: {
    about: string;
    skills: string;
    experience: string;
    projects: string;
    certifications: string;
    contact: string;
    admin: string;
  };

  order: {
    under1k: string;
    range1k5k: string;
    range5k10k: string;
    above10k: string;
    week1: string;
    weeks2: string;
    month1: string;
    months3: string;
    flexible: string;
    title: string;
    subtitle: string;
    projectName: string;
    name: string;
    email: string;
    phone: string;
    budget: string;
    selectBudget: string;
    deadline: string;
    selectDeadline: string;
    description: string;
    cancel: string;
    send: string;
  };

  projects: {
    all: string;
    webDev: string;
    ai: string;
    title: string;
    subtitle: string;
  };

  skills: {
    webDev: string;
    mobileDev: string;
    iotArduino: string;
    dataScience: string;
    aiMachineLearning: string;
    softSkills: string;
    leadership: string;
    communication: string;
    problemSolving: string;
    timeManagement: string;
    teamwork: string;
    criticalThinking: string;
    devTools: string;
    design: string;
    productivity: string;
    cloudDevOps: string;
    database: string;
    videoEditing: string;
    title: string;
    subtitle: string;
    hardSkills: string;
    tools: string;
  };

  statistics: {
    yearsExperience: string;
    projectsCompleted: string;
    certifications: string;
    happyClients: string;
  };
}

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translation;
}

const translations: Record<Language, Translation> = {
  id: {
    language: "id",

    admin: {
      backToHome: "Kembali ke Beranda",
      portal: "Portal Admin",
      signInDesc: "Masuk ke dashboard administrator",
      emailPlaceholder: "Email",
      passwordPlaceholder: "Password",
      rememberMe: "Ingat saya",
      forgotPassword: "Lupa password?",
      signIn: "Masuk",
      demoCredentials: "Demo credentials",
    },

    footer: {
      rights: "Hak cipta dilindungi.",
    },

    notFound: {
      title: "Halaman Tidak Ditemukan",
      description: "Halaman yang Anda cari tidak tersedia.",
      backHome: "Kembali ke Beranda",
    },

    certifications: {
      title: "Sertifikasi & Kredensial",
      subtitle: "Sertifikasi profesional dan kredensial yang telah diperoleh.",
    },

    contact: {
      title: "Hubungi Saya",
      subtitle: "Mari berdiskusi mengenai proyek, kolaborasi, atau peluang kerja.",
      info: "Informasi Kontak",
      email: "Email",
      phone: "Telepon",
      location: "Lokasi",
      connectWith: "Terhubung Dengan Saya",
      name: "Nama",
      subject: "Subjek",
      message: "Pesan",
      send: "Kirim Pesan",
    },

    experience: {
      academic: "Akademik",
      corporate: "Profesional",
      title: "Pengalaman & Pendidikan",
      subtitle: "Perjalanan akademik dan profesional.",
      publications: "publikasi",
    },

    hero: {
      description:
        "Founder, developer, dan entrepreneur yang berfokus pada teknologi, AI, software development, dan digital business.",
      downloadCV: "Download CV",
      viewPortfolio: "Lihat Portfolio",
      viewProjects: "Lihat Proyek",
    },

    nav: {
      about: "Tentang",
      skills: "Keahlian",
      experience: "Pengalaman",
      projects: "Proyek",
      certifications: "Sertifikasi",
      contact: "Kontak",
      admin: "Admin",
    },

    order: {
      under1k: "< Rp1 juta",
      range1k5k: "Rp1–5 juta",
      range5k10k: "Rp5–10 juta",
      above10k: "> Rp10 juta",
      week1: "1 minggu",
      weeks2: "2 minggu",
      month1: "1 bulan",
      months3: "3 bulan",
      flexible: "Fleksibel",
      title: "Pesan Proyek",
      subtitle: "Ceritakan kebutuhan proyek Anda.",
      projectName: "Nama Proyek",
      name: "Nama",
      email: "Email",
      phone: "Nomor Telepon",
      budget: "Budget",
      selectBudget: "Pilih Budget",
      deadline: "Deadline",
      selectDeadline: "Pilih Deadline",
      description: "Deskripsi",
      cancel: "Batal",
      send: "Kirim",
    },

    projects: {
      all: "Semua",
      webDev: "Web Development",
      ai: "AI",
      title: "Proyek Saya",
      subtitle: "Beberapa proyek yang telah saya kerjakan.",
    },

    skills: {
      webDev: "Web Development",
      mobileDev: "Mobile Development",
      iotArduino: "IoT & Arduino",
      dataScience: "Data Science",
      aiMachineLearning: "AI & Machine Learning",
      softSkills: "Soft Skills",
      leadership: "Leadership",
      communication: "Communication",
      problemSolving: "Problem Solving",
      timeManagement: "Time Management",
      teamwork: "Teamwork",
      criticalThinking: "Critical Thinking",
      devTools: "Development Tools",
      design: "Design",
      productivity: "Productivity",
      cloudDevOps: "Cloud & DevOps",
      database: "Database",
      videoEditing: "Video Editing",
      title: "Skills & Keahlian",
      subtitle: "Teknologi dan kompetensi yang saya gunakan.",
      hardSkills: "Hard Skills",
      tools: "Tools",
    },

    statistics: {
      yearsExperience: "Tahun Pengalaman",
      projectsCompleted: "Proyek Selesai",
      certifications: "Sertifikasi",
      happyClients: "Klien",
    },
  },

  en: {
    language: "en",

    admin: {
      backToHome: "Back to Home",
      portal: "Admin Portal",
      signInDesc: "Sign in to the administrator dashboard",
      emailPlaceholder: "Email",
      passwordPlaceholder: "Password",
      rememberMe: "Remember me",
      forgotPassword: "Forgot password?",
      signIn: "Sign In",
      demoCredentials: "Demo credentials",
    },

    footer: {
      rights: "All rights reserved.",
    },

    notFound: {
      title: "Page Not Found",
      description: "The page you are looking for is not available.",
      backHome: "Back to Home",
    },

    certifications: {
      title: "Certifications & Credentials",
      subtitle: "Professional certifications and credentials I have earned.",
    },

    contact: {
      title: "Contact Me",
      subtitle: "Let's discuss a project, collaboration, or career opportunity.",
      info: "Contact Information",
      email: "Email",
      phone: "Phone",
      location: "Location",
      connectWith: "Connect With Me",
      name: "Name",
      subject: "Subject",
      message: "Message",
      send: "Send Message",
    },

    experience: {
      academic: "Academic",
      corporate: "Professional",
      title: "Experience & Education",
      subtitle: "My academic and professional journey.",
      publications: "publications",
    },

    hero: {
      description:
        "Founder, developer, and entrepreneur focused on technology, AI, software development, and digital business.",
      downloadCV: "Download CV",
      viewPortfolio: "View Portfolio",
      viewProjects: "View Projects",
    },

    nav: {
      about: "About",
      skills: "Skills",
      experience: "Experience",
      projects: "Projects",
      certifications: "Certifications",
      contact: "Contact",
      admin: "Admin",
    },

    order: {
      under1k: "< Rp1 million",
      range1k5k: "Rp1–5 million",
      range5k10k: "Rp5–10 million",
      above10k: "> Rp10 million",
      week1: "1 week",
      weeks2: "2 weeks",
      month1: "1 month",
      months3: "3 months",
      flexible: "Flexible",
      title: "Order a Project",
      subtitle: "Tell me about your project requirements.",
      projectName: "Project Name",
      name: "Name",
      email: "Email",
      phone: "Phone Number",
      budget: "Budget",
      selectBudget: "Select Budget",
      deadline: "Deadline",
      selectDeadline: "Select Deadline",
      description: "Description",
      cancel: "Cancel",
      send: "Send",
    },

    projects: {
      all: "All",
      webDev: "Web Dev",
      ai: "AI",
      title: "My Projects",
      subtitle: "Some of the projects I have worked on.",
    },

    skills: {
      webDev: "Web Development",
      mobileDev: "Mobile Development",
      iotArduino: "IoT & Arduino",
      dataScience: "Data Science",
      aiMachineLearning: "AI & Machine Learning",
      softSkills: "Soft Skills",
      leadership: "Leadership",
      communication: "Communication",
      problemSolving: "Problem Solving",
      timeManagement: "Time Management",
      teamwork: "Teamwork",
      criticalThinking: "Critical Thinking",
      devTools: "Development Tools",
      design: "Design",
      productivity: "Productivity",
      cloudDevOps: "Cloud & DevOps",
      database: "Database",
      videoEditing: "Video Editing",
      title: "Skills & Expertise",
      subtitle: "Technologies and competencies I use.",
      hardSkills: "Hard Skills",
      tools: "Tools",
    },

    statistics: {
      yearsExperience: "Years of Experience",
      projectsCompleted: "Projects Completed",
      certifications: "Certifications",
      happyClients: "Clients",
    },
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("id");

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}