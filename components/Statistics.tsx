"use client";

import { motion } from "motion/react";
import { useTheme } from "../app/contexts/ThemeContext";
import { useLanguage } from "../app/contexts/LanguageContext";
import { Briefcase, FolderOpen, Award } from "lucide-react";

export type PortfolioStatisticExperience = {
  startDate: string;
  isActive: boolean;
};

interface StatisticsProps {
  experiences: PortfolioStatisticExperience[];
  projectsCount: number;
  certificationsCount: number;
}

function calculateYearsExperience(
  experiences: PortfolioStatisticExperience[]
) {
  const activeExperiences = experiences.filter(
    (experience) => experience.isActive
  );

  if (activeExperiences.length === 0) {
    return "0+";
  }

  const earliestStart = activeExperiences.reduce(
    (earliest, experience) => {
      const start = new Date(experience.startDate);

      return start < earliest ? start : earliest;
    },
    new Date(activeExperiences[0].startDate)
  );

  const now = new Date();

  const years =
    (now.getTime() - earliestStart.getTime()) /
    (1000 * 60 * 60 * 24 * 365.25);

  return `${Math.max(0, Math.floor(years))}+`;
}

export default function Statistics({
  experiences,
  projectsCount,
  certificationsCount,
}: StatisticsProps) {
  const { theme } = useTheme();
  const { t } = useLanguage();

  const stats = [
    {
      icon: Briefcase,
      value: calculateYearsExperience(experiences),
      label: t.statistics.yearsExperience,
      color: theme === "dark" ? "#00FFFF" : "#2563eb",
    },
    {
      icon: FolderOpen,
      value: `${projectsCount}+`,
      label: t.statistics.projectsCompleted,
      color: theme === "dark" ? "#FF8C00" : "#f97316",
    },
    {
      icon: Award,
      value: `${certificationsCount}+`,
      label: t.statistics.certifications,
      color: theme === "dark" ? "#00FFFF" : "#2563eb",
    },
  ];

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    projectsSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className={`py-12 sm:py-16 px-4 sm:px-6 ${
        theme === "dark"
          ? "bg-gradient-to-b from-[#0A1520] to-[#050B12]"
          : "bg-gradient-to-b from-white to-gray-50"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative group cursor-pointer"
            >
              <div
                className={`relative backdrop-blur-xl rounded-2xl p-6 sm:p-8 border transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-white/5 border-white/10 hover:border-cyan-500/50"
                    : "bg-white border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-lg"
                }`}
              >
                {theme === "dark" && (
                  <div
                    className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity"
                    style={{ background: stat.color }}
                  />
                )}

                <div className="relative z-10 text-center">
                  <div className="flex justify-center mb-4">
                    <div
                      className={`p-3 rounded-xl ${
                        theme === "dark"
                          ? "bg-white/10"
                          : "bg-gray-100"
                      }`}
                    >
                      <stat.icon
                        size={28}
                        style={{ color: stat.color }}
                      />
                    </div>
                  </div>

                  <h3
                    className="text-3xl sm:text-4xl font-bold mb-2"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </h3>

                  <p
                    className={`text-sm sm:text-base ${
                      theme === "dark"
                        ? "text-gray-400"
                        : "text-gray-600"
                    }`}
                  >
                    {stat.label}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToProjects}
            className={`relative group px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
              theme === "dark"
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-400 hover:to-blue-400"
                : "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-500 hover:to-blue-600"
            }`}
          >
            {theme === "dark" && (
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
            )}

            <span className="relative flex items-center gap-2">
              <FolderOpen size={20} />
              {t.hero.viewProjects}
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}