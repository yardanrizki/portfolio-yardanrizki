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

interface Skill {
  name: string;
  color: string;
  icon?: any;
}

interface SkillCategory {
  category: string;
  color: string;
  icon: any;
  skills: Skill[];
}

export default function Skills() {
  const { theme } = useTheme();
  const { t } = useLanguage();

  // Hard Skills - Programming & Development
  const hardSkills: SkillCategory[] = [
    {
      category: t.skills.webDev,
      color: theme === "dark" ? "#00FFFF" : "#2563eb",
      icon: Globe,
      skills: [
        { name: "HTML", color: "#E34F26", icon: Code },
        { name: "CSS", color: "#1572B6", icon: Code },
        { name: "JavaScript", color: "#F7DF1E", icon: Code },
        { name: "TypeScript", color: "#3178C6", icon: Code },
        { name: "React", color: "#61DAFB", icon: Code },
        { name: "Next.js", color: theme === "dark" ? "#FFFFFF" : "#000000", icon: Code },
        { name: "Node.js", color: "#339933", icon: Code },
        { name: "Express", color: theme === "dark" ? "#FFFFFF" : "#000000", icon: Code },
        { name: "PHP", color: "#777BB4", icon: Code },
        { name: "Laravel", color: "#FF2D20", icon: Code },
      ],
    },
    {
      category: t.skills.mobileDev,
      color: theme === "dark" ? "#FF8C00" : "#f97316",
      icon: Smartphone,
      skills: [
        { name: "Flutter", color: "#02569B", icon: Smartphone },
        { name: "React Native", color: "#61DAFB", icon: Smartphone },
        { name: "Kotlin", color: "#7F52FF", icon: Smartphone },
        { name: "Swift", color: "#FA7343", icon: Smartphone },
        { name: "Java", color: "#007396", icon: Smartphone },
        { name: "Android SDK", color: "#3DDC84", icon: Smartphone },
        { name: "iOS SDK", color: "#000000", icon: Smartphone },
      ],
    },
    {
      category: t.skills.iotArduino,
      color: theme === "dark" ? "#00FFFF" : "#2563eb",
      icon: Cpu,
      skills: [
        { name: "Arduino", color: "#00979D", icon: Cpu },
        { name: "ESP32", color: "#E7352C", icon: Cpu },
        { name: "Raspberry Pi", color: "#C51A4A", icon: Cpu },
        { name: "C/C++", color: "#00599C", icon: Code },
        { name: "MicroPython", color: "#2B2728", icon: Code },
        { name: "Sensors", color: "#FF6B6B", icon: Cpu },
        { name: "MQTT", color: "#660066", icon: Cpu },
      ],
    },
    {
      category: t.skills.dataScience,
      color: theme === "dark" ? "#FF8C00" : "#f97316",
      icon: DatabaseIcon,
      skills: [
        { name: "Python", color: "#3776AB", icon: Code },
        { name: "R", color: "#276DC3", icon: Code },
        { name: "Pandas", color: "#150458", icon: DatabaseIcon },
        { name: "NumPy", color: "#013243", icon: DatabaseIcon },
        { name: "Matplotlib", color: "#11557C", icon: DatabaseIcon },
        { name: "SQL", color: "#4479A1", icon: DatabaseIcon },
        { name: "Jupyter", color: "#F37626", icon: DatabaseIcon },
      ],
    },
    {
      category: t.skills.aiMachineLearning,
      color: theme === "dark" ? "#00FFFF" : "#2563eb",
      icon: Brain,
      skills: [
        { name: "TensorFlow", color: "#FF6F00", icon: Brain },
        { name: "PyTorch", color: "#EE4C2C", icon: Brain },
        { name: "Scikit-learn", color: "#F7931E", icon: Brain },
        { name: "Keras", color: "#D00000", icon: Brain },
        { name: "OpenCV", color: "#5C3EE8", icon: Brain },
        { name: "NLP", color: "#00D084", icon: Brain },
        { name: "Deep Learning", color: "#FF6B6B", icon: Brain },
      ],
    },
  ];

  // Soft Skills
  const softSkills: SkillCategory[] = [
    {
      category: t.skills.softSkills,
      color: theme === "dark" ? "#FF8C00" : "#f97316",
      icon: Users,
      skills: [
        { name: t.skills.leadership, color: "#FF6B6B", icon: Target },
        { name: t.skills.communication, color: "#4ECDC4", icon: MessageSquare },
        { name: t.skills.problemSolving, color: "#FFD93D", icon: Lightbulb },
        { name: t.skills.timeManagement, color: "#95E1D3", icon: Clock },
        { name: t.skills.teamwork, color: "#F38181", icon: Users },
        { name: t.skills.criticalThinking, color: "#AA96DA", icon: Puzzle },
      ],
    },
  ];

  // Tools & Platforms
  const tools: SkillCategory[] = [
    {
      category: t.skills.devTools,
      color: theme === "dark" ? "#00FFFF" : "#2563eb",
      icon: Wrench,
      skills: [
        { name: "VS Code", color: "#007ACC", icon: Code },
        { name: "Git", color: "#F05032", icon: GitBranch },
        { name: "GitHub", color: theme === "dark" ? "#FFFFFF" : "#181717", icon: GitBranch },
        { name: "Postman", color: "#FF6C37", icon: Terminal },
        { name: "npm", color: "#CB3837", icon: Package },
        { name: "Webpack", color: "#8DD6F9", icon: Package },
        { name: "Vite", color: "#646CFF", icon: Package },
      ],
    },
    {
      category: t.skills.design,
      color: theme === "dark" ? "#FF8C00" : "#f97316",
      icon: Palette,
      skills: [
        { name: "Figma", color: "#F24E1E", icon: Palette },
        { name: "Adobe XD", color: "#FF61F6", icon: Palette },
        { name: "Photoshop", color: "#31A8FF", icon: Palette },
        { name: "Illustrator", color: "#FF9A00", icon: Palette },
        { name: "Canva", color: "#00C4CC", icon: Palette },
        { name: "Sketch", color: "#F7B500", icon: Palette },
      ],
    },
    {
      category: t.skills.productivity,
      color: theme === "dark" ? "#00FFFF" : "#2563eb",
      icon: Briefcase,
      skills: [
        { name: "Microsoft Office", color: "#D83B01", icon: Briefcase },
        { name: "Word", color: "#2B579A", icon: Briefcase },
        { name: "Excel", color: "#217346", icon: Briefcase },
        { name: "PowerPoint", color: "#D24726", icon: Briefcase },
        { name: "Google Workspace", color: "#4285F4", icon: Briefcase },
        { name: "Docs", color: "#4285F4", icon: Briefcase },
        { name: "Sheets", color: "#0F9D58", icon: Briefcase },
        { name: "Slides", color: "#FBBC04", icon: Briefcase },
      ],
    },
    {
      category: t.skills.cloudDevOps,
      color: theme === "dark" ? "#FF8C00" : "#f97316",
      icon: Cloud,
      skills: [
        { name: "AWS", color: "#FF9900", icon: Cloud },
        { name: "Google Cloud", color: "#4285F4", icon: Cloud },
        { name: "Azure", color: "#0089D6", icon: Cloud },
        { name: "Docker", color: "#2496ED", icon: Package },
        { name: "Kubernetes", color: "#326CE5", icon: Server },
        { name: "GitHub Actions", color: "#2088FF", icon: GitBranch },
        { name: "Linux", color: "#FCC624", icon: Terminal },
      ],
    },
    {
      category: t.skills.database,
      color: theme === "dark" ? "#00FFFF" : "#2563eb",
      icon: DatabaseIcon,
      skills: [
        { name: "PostgreSQL", color: "#4169E1", icon: DatabaseIcon },
        { name: "MongoDB", color: "#47A248", icon: DatabaseIcon },
        { name: "MySQL", color: "#4479A1", icon: DatabaseIcon },
        { name: "Redis", color: "#DC382D", icon: DatabaseIcon },
        { name: "Firebase", color: "#FFCA28", icon: DatabaseIcon },
        { name: "Supabase", color: "#3ECF8E", icon: DatabaseIcon },
      ],
    },
    {
      category: t.skills.videoEditing,
      color: theme === "dark" ? "#FF8C00" : "#f97316",
      icon: Film,
      skills: [
        { name: "Premiere Pro", color: "#9999FF", icon: Film },
        { name: "After Effects", color: "#9999FF", icon: Film },
        { name: "DaVinci Resolve", color: "#E63946", icon: Film },
        { name: "Final Cut Pro", color: "#1A1A1A", icon: Film },
        { name: "CapCut", color: "#000000", icon: Film },
      ],
    },
  ];

  const allCategories = [...hardSkills, ...softSkills, ...tools];

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
            <span className={theme === "dark" ? "text-[#00FFFF]" : "text-blue-600"}>
              {t.skills.title.split(" ").slice(1).join(" ")}
            </span>
          </h2>
          <p
            className={`text-base sm:text-lg ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {t.skills.subtitle}
          </p>
        </motion.div>

        {/* Hard Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h3
            className={`text-2xl sm:text-3xl font-bold mb-6 ${
              theme === "dark" ? "text-[#00FFFF]" : "text-blue-600"
            }`}
          >
            {t.skills.hardSkills}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {hardSkills.map((category, index) => (
              <SkillCard key={category.category} category={category} index={index} theme={theme} />
            ))}
          </div>
        </motion.div>

        {/* Soft Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h3
            className={`text-2xl sm:text-3xl font-bold mb-6 ${
              theme === "dark" ? "text-[#FF8C00]" : "text-orange-600"
            }`}
          >
            {t.skills.softSkills}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {softSkills.map((category, index) => (
              <SkillCard key={category.category} category={category} index={index} theme={theme} />
            ))}
          </div>
        </motion.div>

        {/* Tools & Platforms Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3
            className={`text-2xl sm:text-3xl font-bold mb-6 ${
              theme === "dark" ? "text-[#00FFFF]" : "text-blue-600"
            }`}
          >
            {t.skills.tools}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {tools.map((category, index) => (
              <SkillCard key={category.category} category={category} index={index} theme={theme} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Skill Card Component
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
      {/* Card */}
      <div
        className={`relative backdrop-blur-xl rounded-2xl p-5 sm:p-6 border transition-all duration-300 ${
          theme === "dark"
            ? "bg-white/5 border-white/10 hover:border-cyan-500/50"
            : "bg-white border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-lg"
        }`}
      >
        {/* Glow Effect on Hover */}
        {theme === "dark" && (
          <div
            className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity"
            style={{ background: category.color }}
          />
        )}

        <div className="relative z-10">
          {/* Category Name with Icon */}
          <div className="flex items-center gap-3 mb-4">
            <category.icon size={24} style={{ color: category.color }} />
            <h3 className="text-lg sm:text-xl font-bold" style={{ color: category.color }}>
              {category.category}
            </h3>
          </div>

          {/* Skills Grid */}
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
                      theme === "dark" ? "bg-white/5 hover:bg-white/10" : "bg-gray-50 hover:bg-gray-100"
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
                      {skill.name.length > 8 ? skill.name.substring(0, 7) + "..." : skill.name}
                    </span>
                  </div>

                  {/* Tooltip */}
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
