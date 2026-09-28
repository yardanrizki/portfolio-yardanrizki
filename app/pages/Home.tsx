"use client";

import { useEffect, useState } from "react";
import Hero, {
  type PortfolioHeroProfile,
  type PortfolioHeroPersonalInfo,
} from "../../components/Hero";
import Skills, {
  type PortfolioSkill,
} from "../../components/Skills";
import Experience, {
  type PortfolioExperience,
} from "../../components/Experience";
import Projects, { type PortfolioProject } from "../../components/Projects";
import Certifications from "../../components/Certifications";
import Contact from "../../components/Contact";
import Navigation from "../../components/Navigation";
import CustomCursor from "../../components/CustomCursor";
import FallingBadges from "../../components/FallingBadges";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import Statistics, {
  type PortfolioStatisticExperience,
} from "../../components/Statistics";

type PortfolioData = {
  profile: {
    id: string;
    slug: string;
    name: string;
    type: string;
    roleLabel: string | null;
    headlineEn: string | null;
    headlineId: string | null;
    summaryEn: string | null;
    summaryId: string | null;
  };
  personalInfo: PortfolioHeroPersonalInfo | null;
  skills: PortfolioSkill[];
  experiences: PortfolioExperience[];
  projects: PortfolioProject[];
  certificates: unknown[];
  trainings: unknown[];
  education: unknown[];
  publications: unknown[];
};

export default function Home() {
  const { theme } = useTheme();
  const { t } = useLanguage();

  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch("/api/portfolio?profile=general");

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Failed to fetch portfolio");
        }

        setPortfolio(result.data);
      } catch (error) {
        console.error("Failed to fetch portfolio:", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch portfolio"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-[#050B12] text-white"
          : "bg-gray-50 text-gray-900"
      }`}
      style={{ cursor: "none" }}
    >
      <CustomCursor />

      {theme === "dark" && <FallingBadges />}

      <Navigation />

      {isLoading && (
        <div className="fixed top-4 right-4 z-50 rounded-lg bg-black/80 px-4 py-2 text-sm text-white">
          Loading portfolio...
        </div>
      )}

      {error && (
        <div className="fixed top-4 right-4 z-50 rounded-lg bg-red-600 px-4 py-2 text-sm text-white">
          Failed to load portfolio
        </div>
      )}

      <Hero
      profile={portfolio?.profile || null}
      personalInfo={portfolio?.personalInfo || null}
      />
      <Statistics
        experiences={portfolio?.experiences || []}
        projectsCount={portfolio?.projects.length || 0}
        certificationsCount={portfolio?.certificates.length || 0}
      />
      <Skills skills={portfolio?.skills || []} />
      <Experience experiences={portfolio?.experiences || []} />
      <Projects projects={portfolio?.projects || []} />
      <Certifications />
      <Contact />

      <footer
        className={`py-8 text-center border-t ${
          theme === "dark" ? "border-cyan-500/20" : "border-gray-200"
        }`}
      >
        <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
          {t.footer.rights}
        </p>
      </footer>
    </div>
  );
}
