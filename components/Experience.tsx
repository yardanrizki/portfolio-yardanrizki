"use client";
import { Briefcase, GraduationCap, Calendar, Building2, Users } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useTheme } from "../app/contexts/ThemeContext";
import { useLanguage } from "../app/contexts/LanguageContext";

const academicExperience = [
  {
    title: "PhD Researcher in AI",
    organization: "Tech University",
    period: "2023 - Present",
    description: "Leading research in deep learning applications for natural language processing.",
    publications: 3
  },
  {
    title: "Master's Thesis Research",
    organization: "State University",
    period: "2021 - 2023",
    description: "Developed novel machine learning algorithms for computer vision.",
    publications: 2
  },
  {
    title: "Research Assistant",
    organization: "AI Research Lab",
    period: "2020 - 2021",
    description: "Assisted in various AI research projects and published conference papers.",
    publications: 4
  }
];

const corporateExperience = [
  {
    title: "Senior Full Stack Developer",
    organization: "TechCorp Inc.",
    period: "2022 - Present",
    description: "Leading development of enterprise-scale web applications using React and Node.js.",
    achievements: ["Led team of 5 developers", "Reduced deployment time by 60%"]
  },
  {
    title: "Full Stack Developer",
    organization: "StartupXYZ",
    period: "2020 - 2022",
    description: "Built scalable microservices architecture and modern web interfaces.",
    achievements: ["Launched 3 major products", "Improved app performance by 40%"]
  },
  {
    title: "Junior Developer",
    organization: "Digital Agency",
    period: "2019 - 2020",
    description: "Developed client websites and web applications using modern frameworks.",
    achievements: ["Delivered 15+ client projects", "Achieved 98% client satisfaction"]
  }
];

const businessExperience = [
  {
    title: "Technology Consultant",
    organization: "Global Consulting Firm",
    period: "2023 - Present",
    description: "Advising Fortune 500 companies on digital transformation strategies.",
    projects: ["Digital Roadmap for Banking", "AI Implementation Strategy"]
  },
  {
    title: "Product Manager",
    organization: "SaaS Startup",
    period: "2022 - 2023",
    description: "Led product development from concept to market launch.",
    projects: ["MVP Launch (10K users)", "Product-Market Fit Strategy"]
  },
  {
    title: "Business Analyst",
    organization: "Tech Solutions Inc.",
    period: "2021 - 2022",
    description: "Analyzed business requirements and translated them into technical solutions.",
    projects: ["Process Automation", "Data Analytics Dashboard"]
  }
];

const organizationExperience = [
  {
    title: "President",
    organization: "Tech Community Club",
    period: "2022 - Present",
    description: "Leading a community of 500+ tech enthusiasts with workshops and events.",
    impact: "Organized 20+ events, 1000+ attendees"
  },
  {
    title: "Vice President",
    organization: "AI Research Society",
    period: "2021 - 2022",
    description: "Coordinated research collaborations and academic conferences.",
    impact: "3 conferences, 50+ papers published"
  },
  {
    title: "Volunteer Developer",
    organization: "Non-Profit Tech for Good",
    period: "2020 - 2021",
    description: "Built free software solutions for social impact organizations.",
    impact: "5 NGOs supported, 10K+ beneficiaries"
  }
];

type TabType = "academic" | "corporate" | "business" | "organization";

export default function Experience() {
  const [activeTab, setActiveTab] = useState<TabType>("corporate");
  const { theme } = useTheme();
  const { t } = useLanguage();

  const tabs = [
    { id: "academic" as TabType, label: t.experience.academic, icon: GraduationCap, color: theme === "dark" ? "#00FFFF" : "#2563eb" },
    { id: "corporate" as TabType, label: t.experience.corporate, icon: Briefcase, color: theme === "dark" ? "#FF8C00" : "#f97316" },
    { id: "business" as TabType, label: "Business", icon: Building2, color: theme === "dark" ? "#00FFFF" : "#2563eb" },
    { id: "organization" as TabType, label: "Organization", icon: Users, color: theme === "dark" ? "#FF8C00" : "#f97316" },
  ];

  const getExperienceData = () => {
    switch (activeTab) {
      case "academic":
        return academicExperience;
      case "corporate":
        return corporateExperience;
      case "business":
        return businessExperience;
      case "organization":
        return organizationExperience;
      default:
        return corporateExperience;
    }
  };

  const experienceData = getExperienceData();

  return (
    <section id="experience" className={`py-12 sm:py-20 px-4 sm:px-6 ${
      theme === "dark" ? "bg-[#050B12]" : "bg-white"
    }`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {t.experience.title.split(" ")[0]}{" "}
            <span className={theme === "dark" ? "text-[#FF8C00]" : "text-orange-500"}>
              {t.experience.title.split(" & ")[1]}
            </span>
          </h2>
          <p className={`text-base sm:text-lg ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}>
            {t.experience.subtitle}
          </p>
        </motion.div>

        {/* Tab Selector - Scrollable on mobile */}
        <div className="mb-12 overflow-x-auto pb-2">
          <div className="flex justify-center min-w-max px-4">
            <div className={`inline-flex rounded-xl p-1 border gap-2 ${
              theme === "dark"
                ? "bg-white/5 border-white/10"
                : "bg-gray-100 border-gray-200"
            }`}>
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
                    background: activeTab === tab.id ? tab.color : "transparent",
                  }}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className={`absolute left-4 sm:left-8 md:left-1/2 top-0 bottom-0 w-0.5 ${
            activeTab === "academic" || activeTab === "business"
              ? theme === "dark"
                ? "bg-gradient-to-b from-cyan-500 via-cyan-500/50 to-transparent"
                : "bg-gradient-to-b from-blue-500 via-blue-500/50 to-transparent"
              : theme === "dark"
              ? "bg-gradient-to-b from-orange-500 via-orange-500/50 to-transparent"
              : "bg-gradient-to-b from-orange-500 via-orange-500/50 to-transparent"
          }`} />

          {/* Experience Items */}
          <div className="space-y-8 sm:space-y-12">
            {experienceData.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline Dot */}
                <motion.div
                  whileHover={{ scale: 1.5 }}
                  className={`absolute left-4 sm:left-8 md:left-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-4 -ml-1.5 sm:-ml-2 shadow-lg cursor-pointer ${
                    activeTab === "academic" || activeTab === "business"
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
                  whileHover={{ scale: 1.02, y: -5 }}
                  className={`w-full md:w-5/12 ml-12 sm:ml-16 md:ml-0 ${
                    index % 2 === 0 ? "md:mr-auto md:pr-8 lg:pr-12" : "md:ml-auto md:pl-8 lg:pl-12"
                  }`}
                >
                  <div className={`backdrop-blur-xl rounded-2xl p-5 sm:p-6 border transition-all duration-300 cursor-pointer ${
                    theme === "dark"
                      ? activeTab === "academic" || activeTab === "business"
                        ? "bg-white/5 border-cyan-500/30 hover:border-cyan-500/50 hover:shadow-cyan-500/20"
                        : "bg-white/5 border-orange-500/30 hover:border-orange-500/50 hover:shadow-orange-500/20"
                      : activeTab === "academic" || activeTab === "business"
                      ? "bg-white border-blue-200 hover:border-blue-300 shadow-sm hover:shadow-lg"
                      : "bg-white border-orange-200 hover:border-orange-300 shadow-sm hover:shadow-lg"
                  } hover:shadow-xl`}>
                    <div className={`flex items-center gap-2 mb-2 text-sm ${
                      activeTab === "academic" || activeTab === "business"
                        ? theme === "dark" ? "text-[#00FFFF]" : "text-blue-600"
                        : theme === "dark" ? "text-[#FF8C00]" : "text-orange-600"
                    }`}>
                      <Calendar size={16} />
                      <span>{exp.period}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-1">{exp.title}</h3>
                    <p className={`mb-3 ${
                      activeTab === "academic" || activeTab === "business"
                        ? theme === "dark" ? "text-[#FF8C00]" : "text-orange-500"
                        : theme === "dark" ? "text-[#00FFFF]" : "text-blue-600"
                    }`}>{exp.organization}</p>
                    <p className={`mb-3 text-sm sm:text-base ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}>{exp.description}</p>
                    
                    {/* Additional Info based on category */}
                    {"publications" in exp && (
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs sm:text-sm ${
                        theme === "dark"
                          ? "bg-[#00FFFF]/20 text-[#00FFFF]"
                          : "bg-blue-100 text-blue-700"
                      }`}>
                        <GraduationCap size={16} />
                        {exp.publications} {t.experience.publications}
                      </div>
                    )}
                    
                    {"achievements" in exp && (
                      <div className="space-y-1 mt-2">
                        {exp.achievements.map((achievement, i) => (
                          <div key={i} className={`text-xs flex items-start gap-2 ${
                            theme === "dark" ? "text-gray-400" : "text-gray-600"
                          }`}>
                            <span className={theme === "dark" ? "text-[#FF8C00]" : "text-orange-500"}>✓</span>
                            {achievement}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {"projects" in exp && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {exp.projects.map((project, i) => (
                          <span key={i} className={`px-2 py-1 rounded-md text-xs border ${
                            theme === "dark"
                              ? "bg-white/5 border-white/10 text-gray-300"
                              : "bg-gray-50 border-gray-200 text-gray-700"
                          }`}>
                            {project}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {"impact" in exp && (
                      <div className={`mt-2 text-xs font-semibold ${
                        theme === "dark" ? "text-[#FF8C00]" : "text-orange-600"
                      }`}>
                        Impact: {exp.impact}
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
