"use client";
import { ExternalLink, Tag, X, ShoppingCart, Eye, Code2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useTheme } from "../app/contexts/ThemeContext";
import { useLanguage } from "../app/contexts/LanguageContext";
import OrderModal from "./OrderModal";

export type PortfolioProject = {
  id: string;
  titleEn: string;
  titleId: string | null;
  shortDescriptionEn: string | null;
  shortDescriptionId: string | null;
  longDescriptionEn: string | null;
  longDescriptionId: string | null;
  techStack: string[];
  roleInProject: string | null;
  status: string;
  githubUrl: string | null;
  demoUrl: string | null;
  coverImageUrl: string | null;
  imageUrls: string[];
  profiles: {
    profile: {
      slug: string;
      name: string;
      roleLabel: string | null;
    };
  }[];
};

type NormalizedProject = PortfolioProject & {
  categories: ("Web Dev" | "AI")[];
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  image: string;
  link: string;
};

type ProjectsProps = {
  projects: PortfolioProject[];
};

export default function Projects({ projects }: ProjectsProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] =
    useState<NormalizedProject | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [projectToOrder, setProjectToOrder] =
    useState<NormalizedProject | null>(null);
  const { theme } = useTheme();
  const { t } = useLanguage();

  const categories = [t.projects.all, t.projects.webDev, t.projects.ai];
  const categoryMap: Record<string, "All" | "Web Dev" | "AI"> = {
    [t.projects.all]: "All",
    [t.projects.webDev]: "Web Dev",
    [t.projects.ai]: "AI",
  };

  const normalizedProjects: NormalizedProject[] = projects.map((project) => {
    const categories = project.profiles
      .map(({ profile }) => {
        if (
          profile.slug === "software-web-development" ||
          profile.roleLabel?.toLowerCase().includes("software") ||
          profile.roleLabel?.toLowerCase().includes("web")
        ) {
          return "Web Dev";
        }

        if (
          profile.slug === "ai-data-science" ||
          profile.roleLabel?.toLowerCase().includes("ai") ||
          profile.roleLabel?.toLowerCase().includes("data")
        ) {
          return "AI";
        }

        return null;
      })
      .filter((category): category is "Web Dev" | "AI" => category !== null);

    return {
      ...project,
      categories: [...new Set(categories)],
      title: project.titleEn,
      description: project.shortDescriptionEn || "",
      longDescription:
        project.longDescriptionEn || project.shortDescriptionEn || "",
      tags: project.techStack,
      image:
        project.coverImageUrl ||
        project.imageUrls?.[0] ||
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
      link: project.demoUrl || project.githubUrl || "#",
    };
  });

  // Filter projects based on category - project can appear in multiple categories
  const activeCategoryKey = categoryMap[activeCategory];

  const filteredProjects =
    activeCategoryKey === "All"
      ? normalizedProjects
      : normalizedProjects.filter((project) =>
          project.categories.includes(activeCategoryKey)
        );

  const handleOrderNow = (project: NormalizedProject) => {
    setProjectToOrder(project);
    setSelectedProject(null);
    setIsOrderModalOpen(true);
  };

  return (
    <section
      id="projects"
      className={`py-12 sm:py-20 px-4 sm:px-6 ${
        theme === "dark"
          ? "bg-gradient-to-b from-[#0A1520] to-[#050B12]"
          : "bg-gradient-to-b from-white to-gray-50"
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
            {t.projects.title.split(" ")[0]}{" "}
            <span
              className={theme === "dark" ? "text-[#00FFFF]" : "text-blue-600"}
            >
              {t.projects.title.split(" ").slice(1).join(" ")}
            </span>
          </h2>
          <p
            className={`text-base sm:text-lg ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {t.projects.subtitle}
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12 flex-wrap gap-3 sm:gap-4">
          {categories.map((category) => {
            const categoryKey = categoryMap[category];
            const count =
              categoryKey === "All"
                ? normalizedProjects.length
                : normalizedProjects.filter((p) =>
                    p.categories.includes(categoryKey)
                  ).length;
            return (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 sm:px-6 py-2 rounded-full transition-all duration-300 text-sm sm:text-base flex items-center gap-2 ${
                  activeCategory === category
                    ? theme === "dark"
                      ? "bg-gradient-to-r from-[#00FFFF] to-[#00CCCC] text-[#050B12]"
                      : "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                    : theme === "dark"
                      ? "bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-cyan-500/50"
                      : "bg-white border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-blue-300 shadow-sm"
                }`}
              >
                {category}
                <span
                  className={`px-2 py-0.5 rounded-full text-xs ${
                    activeCategory === category
                      ? theme === "dark"
                        ? "bg-[#050B12]/30"
                        : "bg-white/30"
                      : theme === "dark"
                        ? "bg-white/10"
                        : "bg-gray-100"
                  }`}
                >
                  {count}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={`${project.title}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              {/* Card */}
              <motion.div
                whileHover={{ y: -10 }}
                className={`relative backdrop-blur-xl rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer ${
                  theme === "dark"
                    ? "bg-white/5 border-white/10 hover:border-cyan-500/50"
                    : "bg-white border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-xl"
                }`}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay on Hover */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      theme === "dark"
                        ? "bg-gradient-to-t from-[#050B12] via-[#050B12]/50 to-transparent"
                        : "bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent"
                    }`}
                  >
                    <motion.button
                      onClick={() => setSelectedProject(project)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ${
                        theme === "dark"
                          ? "bg-[#00FFFF] text-[#050B12]"
                          : "bg-blue-600 text-white"
                      }`}
                    >
                      <Eye size={16} />
                      View Details
                    </motion.button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  {/* Category Badges - Show all categories */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.categories.map((cat) => (
                      <div
                        key={cat}
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs ${
                          cat === "AI"
                            ? theme === "dark"
                              ? "bg-[#00FFFF]/20 text-[#00FFFF]"
                              : "bg-blue-100 text-blue-700"
                            : theme === "dark"
                              ? "bg-[#FF8C00]/20 text-[#FF8C00]"
                              : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        <Tag size={12} />
                        {cat}
                      </div>
                    ))}
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold mb-2">
                    {project.title}
                  </h3>
                  <p
                    className={`text-sm mb-4 line-clamp-2 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className={`px-2 py-1 rounded-md text-xs border ${
                          theme === "dark"
                            ? "bg-white/5 border-white/10 text-gray-300"
                            : "bg-gray-50 border-gray-200 text-gray-700"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span
                        className={`px-2 py-1 rounded-md text-xs ${
                          theme === "dark" ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal - Same as before */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border ${
                theme === "dark"
                  ? "bg-[#0A1520] border-cyan-500/30"
                  : "bg-white border-gray-200"
              }`}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className={`absolute top-4 right-4 p-2 rounded-full transition-colors z-10 ${
                  theme === "dark"
                    ? "bg-white/10 hover:bg-white/20 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                }`}
              >
                <X size={24} />
              </button>

              {/* Header Image */}
              <div className="relative h-64 sm:h-80">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${
                    theme === "dark"
                      ? "from-[#0A1520] to-transparent"
                      : "from-white to-transparent"
                  }`}
                />
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8">
                {/* Category Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedProject.categories.map((cat) => (
                    <div
                      key={cat}
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                        cat === "AI"
                          ? theme === "dark"
                            ? "bg-[#00FFFF]/20 text-[#00FFFF]"
                            : "bg-blue-100 text-blue-700"
                          : theme === "dark"
                            ? "bg-[#FF8C00]/20 text-[#FF8C00]"
                            : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      <Tag size={14} />
                      {cat}
                    </div>
                  ))}
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                  {selectedProject.title}
                </h2>

                <p
                  className={`text-base mb-6 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {selectedProject.longDescription}
                </p>

                {/* Project Info */}
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div
                    className={`p-4 rounded-xl border ${
                      theme === "dark"
                        ? "bg-white/5 border-white/10"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div
                      className={`text-sm mb-1 ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Role
                    </div>
                    <div
                      className={`font-bold ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {selectedProject.roleInProject || "Developer"}
                    </div>
                  </div>

                  <div
                    className={`p-4 rounded-xl border ${
                      theme === "dark"
                        ? "bg-white/5 border-white/10"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div
                      className={`text-sm mb-1 ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Status
                    </div>
                    <div
                      className={`font-bold ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {selectedProject.status.replaceAll("_", " ")}
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-3 py-2 rounded-lg border ${
                          theme === "dark"
                            ? "bg-white/5 border-white/10 text-gray-300"
                            : "bg-gray-50 border-gray-200 text-gray-700"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleOrderNow(selectedProject)}
                    className="flex-1 sm:flex-none group relative px-6 py-3 rounded-lg overflow-hidden transition-all duration-300"
                  >
                    <div
                      className={`absolute inset-0 group-hover:scale-110 transition-transform ${
                        theme === "dark"
                          ? "bg-gradient-to-r from-[#00FFFF] to-[#00CCCC]"
                          : "bg-gradient-to-r from-blue-600 to-blue-700"
                      }`}
                    />
                    <div
                      className={`relative flex items-center justify-center gap-2 font-semibold ${
                        theme === "dark" ? "text-[#050B12]" : "text-white"
                      }`}
                    >
                      <ShoppingCart size={20} />
                      Order Now
                    </div>
                  </motion.button>

                  <motion.a
                    href={selectedProject.link}
                    target="_blank"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-lg border font-semibold transition-colors ${
                      theme === "dark"
                        ? "border-white/20 hover:bg-white/5 text-gray-300"
                        : "border-gray-300 hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <Code2 size={20} />
                    View Code
                  </motion.a>

                  <motion.a
                    href={selectedProject.link}
                    target="_blank"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-lg border font-semibold transition-colors ${
                      theme === "dark"
                        ? "border-[#FF8C00] hover:bg-[#FF8C00]/10 text-[#FF8C00]"
                        : "border-orange-500 hover:bg-orange-50 text-orange-600"
                    }`}
                  >
                    <ExternalLink size={20} />
                    Live Demo
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Order Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        projectName={projectToOrder?.title || ""}
      />
    </section>
  );
}
