"use client";

import {
  Briefcase,
  GraduationCap,
  Calendar,
  Building2,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useTheme } from "../app/contexts/ThemeContext";
import { useLanguage } from "../app/contexts/LanguageContext";

export type PortfolioExperience = {
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
};

interface ExperienceProps {
  experiences: PortfolioExperience[];
}

type TabType = "academic" | "corporate" | "business" | "organization";

type DisplayExperience = PortfolioExperience & {
  title: string;
  organization: string;
  period: string;
  description: string;
  achievementsList: string[];
};

function formatDate(date: string | null, isCurrent: boolean) {
  if (!date || isCurrent) {
    return "Present";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function formatPeriod(experience: PortfolioExperience) {
  const start = new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(new Date(experience.startDate));

  const end = formatDate(experience.endDate, experience.isCurrent);

  return `${start} - ${end}`;
}

function getTabType(experience: PortfolioExperience): TabType {
  if (experience.employmentType === "ORGANIZATION") {
    return "organization";
  }

  return "corporate";
}

function normalizeAchievements(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(
    (item): item is string => typeof item === "string" && item.trim().length > 0
  );
}

export default function Experience({
  experiences,
}: ExperienceProps) {
  const [activeTab, setActiveTab] = useState<TabType>("corporate");
  const { theme } = useTheme();
  const { t } = useLanguage();

  const tabs = [
    {
      id: "academic" as TabType,
      label: t.experience.academic,
      icon: GraduationCap,
      color: theme === "dark" ? "#00FFFF" : "#2563eb",
    },
    {
      id: "corporate" as TabType,
      label: t.experience.corporate,
      icon: Briefcase,
      color: theme === "dark" ? "#FF8C00" : "#f97316",
    },
    {
      id: "business" as TabType,
      label: "Business",
      icon: Building2,
      color: theme === "dark" ? "#00FFFF" : "#2563eb",
    },
    {
      id: "organization" as TabType,
      label: "Organization",
      icon: Users,
      color: theme === "dark" ? "#FF8C00" : "#f97316",
    },
  ];

  const experienceData: DisplayExperience[] = experiences
    .filter((experience) => experience.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .filter((experience) => getTabType(experience) === activeTab)
    .map((experience) => ({
      ...experience,
      title:
        experience.roleTitleEn ||
        experience.roleTitleId ||
        "Experience",
      organization: experience.companyName,
      period: formatPeriod(experience),
      description:
        experience.descriptionEn ||
        experience.descriptionId ||
        "",
      achievementsList: normalizeAchievements(
        experience.achievements
      ),
    }));

  const isAcademicOrBusiness =
    activeTab === "academic" || activeTab === "business";

  return (
    <section
      id="experience"
      className={`py-12 sm:py-20 px-4 sm:px-6 ${
        theme === "dark" ? "bg-[#050B12]" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {t.experience.title.split(" ")[0]}{" "}
            <span
              className={
                theme === "dark"
                  ? "text-[#FF8C00]"
                  : "text-orange-500"
              }
            >
              {t.experience.title.split(" & ")[1]}
            </span>
          </h2>

          <p
            className={`text-base sm:text-lg ${
              theme === "dark"
                ? "text-gray-400"
                : "text-gray-600"
            }`}
          >
            {t.experience.subtitle}
          </p>
        </motion.div>

        {/* Tab Selector */}
        <div className="mb-12 overflow-x-auto pb-2">
          <div className="flex justify-center min-w-max px-4">
            <div
              className={`inline-flex rounded-xl p-1 border gap-2 ${
                theme === "dark"
                  ? "bg-white/5 border-white/10"
                  : "bg-gray-100 border-gray-200"
              }`}
            >
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 sm:px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-2 text-xs sm:text-base whitespace-nowrap ${
                    activeTab === tab.id
                      ? theme === "dark"
                        ? "text-[#050B12]"
                        : "text-white"
                      : theme === "dark"
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  style={{
                    background:
                      activeTab === tab.id
                        ? tab.color
                        : "transparent",
                  }}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Empty State */}
        {experienceData.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-center py-16 rounded-2xl border ${
              theme === "dark"
                ? "bg-white/5 border-white/10 text-gray-400"
                : "bg-gray-50 border-gray-200 text-gray-500"
            }`}
          >
            No experience available in this category yet.
          </motion.div>
        )}

        {/* Timeline */}
        {experienceData.length > 0 && (
          <div className="relative">
            {/* Timeline Line */}
            <div
              className={`absolute left-4 sm:left-8 md:left-1/2 top-0 bottom-0 w-0.5 ${
                isAcademicOrBusiness
                  ? theme === "dark"
                    ? "bg-gradient-to-b from-cyan-500 via-cyan-500/50 to-transparent"
                    : "bg-gradient-to-b from-blue-500 via-blue-500/50 to-transparent"
                  : theme === "dark"
                  ? "bg-gradient-to-b from-orange-500 via-orange-500/50 to-transparent"
                  : "bg-gradient-to-b from-orange-500 via-orange-500/50 to-transparent"
              }`}
            />

            {/* Experience Items */}
            <div className="space-y-8 sm:space-y-12">
              {experienceData.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{
                    opacity: 0,
                    x: index % 2 === 0 ? -50 : 50,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className={`relative flex items-center ${
                    index % 2 === 0
                      ? "md:flex-row"
                      : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline Dot */}
                  <motion.div
                    whileHover={{ scale: 1.5 }}
                    className={`absolute left-4 sm:left-8 md:left-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-4 -ml-1.5 sm:-ml-2 shadow-lg cursor-pointer ${
                      isAcademicOrBusiness
                        ? theme === "dark"
                          ? "bg-[#00FFFF] border-[#050B12] shadow-cyan-500/50"
                          : "bg-blue-500 border-white shadow-blue-500/50"
                        : theme === "dark"
                        ? "bg-[#FF8C00] border-[#050B12] shadow-orange-500/50"
                        : "bg-orange-500 border-white shadow-orange-500/50"
                    }`}
                  />

                  {/* Content Card */}
                  <motion.div
                    whileHover={{
                      scale: 1.02,
                      y: -5,
                    }}
                    className={`w-full md:w-5/12 ml-12 sm:ml-16 md:ml-0 ${
                      index % 2 === 0
                        ? "md:mr-auto md:pr-8 lg:pr-12"
                        : "md:ml-auto md:pl-8 lg:pl-12"
                    }`}
                  >
                    <div
                      className={`backdrop-blur-xl rounded-2xl p-5 sm:p-6 border transition-all duration-300 cursor-pointer ${
                        theme === "dark"
                          ? isAcademicOrBusiness
                            ? "bg-white/5 border-cyan-500/30 hover:border-cyan-500/50 hover:shadow-cyan-500/20"
                            : "bg-white/5 border-orange-500/30 hover:border-orange-500/50 hover:shadow-orange-500/20"
                          : isAcademicOrBusiness
                          ? "bg-white border-blue-200 hover:border-blue-300 shadow-sm hover:shadow-lg"
                          : "bg-white border-orange-200 hover:border-orange-300 shadow-sm hover:shadow-lg"
                      } hover:shadow-xl`}
                    >
                      {/* Period */}
                      <div
                        className={`flex items-center gap-2 mb-2 text-sm ${
                          isAcademicOrBusiness
                            ? theme === "dark"
                              ? "text-[#00FFFF]"
                              : "text-blue-600"
                            : theme === "dark"
                            ? "text-[#FF8C00]"
                            : "text-orange-600"
                        }`}
                      >
                        <Calendar size={16} />
                        <span>{exp.period}</span>
                      </div>

                      {/* Role */}
                      <h3 className="text-lg sm:text-xl font-bold mb-1">
                        {exp.title}
                      </h3>

                      {/* Organization */}
                      <p
                        className={`mb-3 ${
                          isAcademicOrBusiness
                            ? theme === "dark"
                              ? "text-[#FF8C00]"
                              : "text-orange-500"
                            : theme === "dark"
                            ? "text-[#00FFFF]"
                            : "text-blue-600"
                        }`}
                      >
                        {exp.organization}
                      </p>

                      {/* Description */}
                      {exp.description && (
                        <p
                          className={`mb-3 text-sm sm:text-base ${
                            theme === "dark"
                              ? "text-gray-400"
                              : "text-gray-600"
                          }`}
                        >
                          {exp.description}
                        </p>
                      )}

                      {/* Achievements */}
                      {exp.achievementsList.length > 0 && (
                        <div className="space-y-1 mt-2">
                          {exp.achievementsList.map(
                            (achievement, i) => (
                              <div
                                key={i}
                                className={`text-xs flex items-start gap-2 ${
                                  theme === "dark"
                                    ? "text-gray-400"
                                    : "text-gray-600"
                                }`}
                              >
                                <span
                                  className={
                                    theme === "dark"
                                      ? "text-[#FF8C00]"
                                      : "text-orange-500"
                                  }
                                >
                                  ✓
                                </span>
                                {achievement}
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}