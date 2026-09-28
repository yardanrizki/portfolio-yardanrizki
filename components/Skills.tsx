import { motion } from "motion/react";
import { useTheme } from "../app/contexts/ThemeContext";
import { useLanguage } from "../app/contexts/LanguageContext";
import {
  Code,
  Globe,
  Smartphone,
  Cpu,
  Database as DatabaseIcon,
  Brain,
  Users,
  MessageSquare,
  Lightbulb,
  Clock,
  Target,
  Puzzle,
  Wrench,
  GitBranch,
  Briefcase,
  Cloud,
  Server,
  Film,
  Palette,
  Package,
  Terminal,
} from "lucide-react";

export type PortfolioSkill = {
  id: string;
  name: string;
  category: string;
  iconName: string | null;
  iconUrl: string | null;
  isActive: boolean;
  sortOrder: number;
  isHighlighted: boolean;
};

interface Skill {
  name: string;
  color: string;
  icon?: any;
  isHighlighted?: boolean;
}

interface SkillCategory {
  category: string;
  color: string;
  icon: any;
  skills: Skill[];
}

interface SkillsProps {
  skills: PortfolioSkill[];
}

const skillColors: Record<string, string> = {
  HTML: "#E34F26",
  CSS: "#1572B6",
  JavaScript: "#F7DF1E",
  TypeScript: "#3178C6",
  "React.js": "#61DAFB",
  React: "#61DAFB",
  "Next.js": "#FFFFFF",
  PHP: "#777BB4",
  Laravel: "#FF2D20",
  Flutter: "#02569B",
  Arduino: "#00979D",
  Mikrokontroler: "#00979D",
  Python: "#3776AB",
  TensorFlow: "#FF6F00",
  CNN: "#FF6F00",
  SVM: "#F7931E",
  MySQL: "#4479A1",
  PostgreSQL: "#4169E1",
  MongoDB: "#47A248",
  Canva: "#00C4CC",
  "Adobe Photoshop": "#31A8FF",
  "Adobe Premiere": "#9999FF",
  "Microsoft Office": "#D83B01",
  "Google Workspace": "#4285F4",
  "TCP/IP": "#2563eb",
  Subnetting: "#2563eb",
  "DHCP/DNS": "#2563eb",
  "Cisco Packet Tracer": "#2563eb",
  "Maintenance Komputer & Printer": "#64748b",
  Komunikasi: "#4ECDC4",
  "Kerja Sama Tim": "#F38181",
  Adaptasi: "#95E1D3",
  "Manajemen Waktu": "#95E1D3",
  "Pemecahan Masalah": "#FFD93D",
};

const skillIcons: Record<string, any> = {
  HTML: Code,
  CSS: Code,
  JavaScript: Code,
  TypeScript: Code,
  "React.js": Code,
  React: Code,
  "Next.js": Code,
  PHP: Code,
  Laravel: Code,

  Flutter: Smartphone,

  Arduino: Cpu,
  Mikrokontroler: Cpu,

  Python: Code,
  TensorFlow: Brain,
  CNN: Brain,
  SVM: Brain,

  MySQL: DatabaseIcon,
  PostgreSQL: DatabaseIcon,
  MongoDB: DatabaseIcon,

  Canva: Palette,
  "Adobe Photoshop": Palette,
  "Adobe Premiere": Film,

  "Microsoft Office": Briefcase,
  "Google Workspace": Briefcase,

  "TCP/IP": Server,
  Subnetting: Server,
  "DHCP/DNS": Server,
  "Cisco Packet Tracer": Server,
  "Maintenance Komputer & Printer": Wrench,

  Komunikasi: MessageSquare,
  "Kerja Sama Tim": Users,
  Adaptasi: Target,
  "Manajemen Waktu": Clock,
  "Pemecahan Masalah": Lightbulb,
};

export default function Skills({ skills }: SkillsProps) {
  const { theme } = useTheme();
  const { t } = useLanguage();

  const getSkillColor = (skill: PortfolioSkill) => {
    return (
      skillColors[skill.name] ||
      (theme === "dark" ? "#00FFFF" : "#2563eb")
    );
  };

  const getSkillIcon = (skill: PortfolioSkill) => {
    return skillIcons[skill.name] || Code;
  };

  const categoryConfig: Record<
    string,
    {
      label: string;
      color: string;
      icon: any;
      section: "hard" | "soft" | "tools";
    }
  > = {
    WEB_DEVELOPMENT: {
      label: t.skills.webDev,
      color: theme === "dark" ? "#00FFFF" : "#2563eb",
      icon: Globe,
      section: "hard",
    },
    MOBILE_DEVELOPMENT: {
      label: t.skills.mobileDev,
      color: theme === "dark" ? "#FF8C00" : "#f97316",
      icon: Smartphone,
      section: "hard",
    },
    IOT: {
      label: t.skills.iotArduino,
      color: theme === "dark" ? "#00FFFF" : "#2563eb",
      icon: Cpu,
      section: "hard",
    },
    DATA_SCIENCE: {
      label: t.skills.dataScience,
      color: theme === "dark" ? "#FF8C00" : "#f97316",
      icon: DatabaseIcon,
      section: "hard",
    },
    AI_MACHINE_LEARNING: {
      label: t.skills.aiMachineLearning,
      color: theme === "dark" ? "#00FFFF" : "#2563eb",
      icon: Brain,
      section: "hard",
    },
    DATABASE: {
      label: t.skills.database,
      color: theme === "dark" ? "#00FFFF" : "#2563eb",
      icon: DatabaseIcon,
      section: "hard",
    },
    SOFT_SKILLS: {
      label: t.skills.softSkills,
      color: theme === "dark" ? "#FF8C00" : "#f97316",
      icon: Users,
      section: "soft",
    },
    DESIGN: {
      label: t.skills.design,
      color: theme === "dark" ? "#FF8C00" : "#f97316",
      icon: Palette,
      section: "tools",
    },
    PRODUCTIVITY: {
      label: t.skills.productivity,
      color: theme === "dark" ? "#00FFFF" : "#2563eb",
      icon: Briefcase,
      section: "tools",
    },
    CLOUD_DEVOPS: {
      label: t.skills.cloudDevOps,
      color: theme === "dark" ? "#FF8C00" : "#f97316",
      icon: Cloud,
      section: "tools",
    },
    VIDEO_EDITING: {
      label: t.skills.videoEditing,
      color: theme === "dark" ? "#FF8C00" : "#f97316",
      icon: Film,
      section: "tools",
    },
    OTHER: {
      label: t.skills.devTools,
      color: theme === "dark" ? "#00FFFF" : "#2563eb",
      icon: Wrench,
      section: "tools",
    },
  };

  const groupedSkills = skills
    .filter((skill) => skill.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .reduce(
      (groups, skill) => {
        const config = categoryConfig[skill.category];

        if (!config) {
          return groups;
        }

        if (!groups[skill.category]) {
          groups[skill.category] = {
            category: config.label,
            color: config.color,
            icon: config.icon,
            section: config.section,
            skills: [],
          };
        }

        groups[skill.category].skills.push({
          name: skill.name,
          color: getSkillColor(skill),
          icon: getSkillIcon(skill),
          isHighlighted: skill.isHighlighted,
        });

        return groups;
      },
      {} as Record<
        string,
        SkillCategory & {
          section: "hard" | "soft" | "tools";
        }
      >
    );

  const hardSkills = Object.values(groupedSkills).filter(
    (category) => category.section === "hard"
  );

  const softSkills = Object.values(groupedSkills).filter(
    (category) => category.section === "soft"
  );

  const tools = Object.values(groupedSkills).filter(
    (category) => category.section === "tools"
  );

  return (
    <section
      id="skills"
      className={`py-12 sm:py-20 px-4 sm:px-6 ${
        theme === "dark"
          ? "bg-gradient-to-b from-[#050B12] to-[#0A1520]"
          : "bg-gradient-to-b from-gray-50 to-white"
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
            {t.skills.title.split(" ")[0]}{" "}
            <span
              className={
                theme === "dark"
                  ? "text-[#00FFFF]"
                  : "text-blue-600"
              }
            >
              {t.skills.title.split(" ").slice(1).join(" ")}
            </span>
          </h2>

          <p
            className={`text-base sm:text-lg ${
              theme === "dark"
                ? "text-gray-400"
                : "text-gray-600"
            }`}
          >
            {t.skills.subtitle}
          </p>
        </motion.div>

        {/* Hard Skills */}
        {hardSkills.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h3
              className={`text-2xl sm:text-3xl font-bold mb-6 ${
                theme === "dark"
                  ? "text-[#00FFFF]"
                  : "text-blue-600"
              }`}
            >
              {t.skills.hardSkills}
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {hardSkills.map((category, index) => (
                <SkillCard
                  key={category.category}
                  category={category}
                  index={index}
                  theme={theme}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Soft Skills */}
        {softSkills.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h3
              className={`text-2xl sm:text-3xl font-bold mb-6 ${
                theme === "dark"
                  ? "text-[#FF8C00]"
                  : "text-orange-600"
              }`}
            >
              {t.skills.softSkills}
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {softSkills.map((category, index) => (
                <SkillCard
                  key={category.category}
                  category={category}
                  index={index}
                  theme={theme}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Tools & Platforms */}
        {tools.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3
              className={`text-2xl sm:text-3xl font-bold mb-6 ${
                theme === "dark"
                  ? "text-[#00FFFF]"
                  : "text-blue-600"
              }`}
            >
              {t.skills.tools}
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {tools.map((category, index) => (
                <SkillCard
                  key={category.category}
                  category={category}
                  index={index}
                  theme={theme}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function SkillCard({
  category,
  index,
  theme,
}: {
  category: SkillCategory;
  index: number;
  theme: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="relative group"
    >
      <div
        className={`relative backdrop-blur-xl rounded-2xl p-5 sm:p-6 border transition-all duration-300 ${
          theme === "dark"
            ? "bg-white/5 border-white/10 hover:border-cyan-500/50"
            : "bg-white border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-lg"
        }`}
      >
        {theme === "dark" && (
          <div
            className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity"
            style={{ background: category.color }}
          />
        )}

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <category.icon
              size={24}
              style={{ color: category.color }}
            />

            <h3
              className="text-lg sm:text-xl font-bold"
              style={{ color: category.color }}
            >
              {category.category}
            </h3>
          </div>

          <div className="grid grid-cols-5 gap-3 sm:gap-4">
            {category.skills.map((skill) => {
              const SkillIcon = skill.icon || Code;

              return (
                <motion.div
                  key={skill.name}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="relative group/icon cursor-pointer"
                >
                  <div
                    className={`aspect-square rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-300 p-2 ${
                      theme === "dark"
                        ? "bg-white/5 hover:bg-white/10"
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    <SkillIcon
                      size={20}
                      style={{ color: skill.color }}
                      className="transition-transform group-hover/icon:scale-110"
                    />

                    <span
                      className="text-[8px] font-semibold text-center leading-tight"
                      style={{ color: skill.color }}
                    >
                      {skill.name.length > 8
                        ? skill.name.substring(0, 7) + "..."
                        : skill.name}
                    </span>
                  </div>

                  <div
                    className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover/icon:opacity-100 transition-opacity pointer-events-none z-20 ${
                      theme === "dark"
                        ? "bg-[#0A1520] border border-white/20 text-white"
                        : "bg-white border border-gray-200 text-gray-900 shadow-lg"
                    }`}
                  >
                    {skill.name}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}