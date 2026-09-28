"use client";import {
  ExternalLink,
  Tag,
  X,
  ShoppingCart,
  Eye,
  Calendar,
  Users,
  Code2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useTheme } from "../app/contexts/ThemeContext";
import { useLanguage } from "../app/contexts/LanguageContext";
import OrderModal from "./OrderModal";

const projects = [
  {
    title: "AI-Powered Analytics Dashboard",
    description: "Real-time analytics platform with machine learning predictions and beautiful data visualizations.",
    longDescription: "A comprehensive analytics solution that leverages machine learning algorithms to provide predictive insights. Features include real-time data processing, customizable dashboards, automated reporting, and AI-driven recommendations for business optimization.",
    categories: ["AI"], // Only AI
    tags: ["Machine Learning", "React", "Python"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    link: "#",
    price: "$2,500",
    duration: "4-6 weeks",
    team: "3-4 developers",
    features: ["Real-time Analytics", "ML Predictions", "Custom Dashboards", "API Integration"]
  },
  {
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.",
    longDescription: "Modern e-commerce platform built with scalability in mind. Includes secure payment processing, real-time inventory tracking, advanced search and filtering, customer management, and comprehensive admin panel for complete store control.",
    categories: ["Web Dev"], // Only Web Dev
    tags: ["React", "Node.js", "MongoDB"],
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800",
    link: "#",
    price: "$3,500",
    duration: "6-8 weeks",
    team: "4-5 developers",
    features: ["Payment Gateway", "Inventory System", "Admin Dashboard", "Customer Portal"]
  },
  {
    title: "Neural Network Visualizer",
    description: "Interactive tool for visualizing and understanding neural network architectures and training processes.",
    longDescription: "Educational and research tool that makes neural networks transparent and understandable. Visualize layer architectures, activation functions, training progress, and model performance in real-time with interactive 3D representations.",
    categories: ["AI"], // Only AI
    tags: ["TensorFlow", "D3.js", "Python"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
    link: "#",
    price: "$1,800",
    duration: "3-4 weeks",
    team: "2-3 developers",
    features: ["3D Visualization", "Real-time Training", "Model Comparison", "Export Results"]
  },
  {
    title: "Smart Task Management System",
    description: "AI-enhanced project management tool with real-time collaboration and intelligent task prioritization.",
    longDescription: "Enterprise-grade project management solution with AI-powered task prioritization, real-time collaboration, time management, resource allocation, and integrated team communication. The AI analyzes team patterns and suggests optimal workflows.",
    categories: ["Web Dev", "AI"], // Both categories!
    tags: ["React", "WebSocket", "Machine Learning", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800",
    link: "#",
    price: "$3,200",
    duration: "5-7 weeks",
    team: "4 developers",
    features: ["AI Task Prioritization", "Real-time Updates", "Team Chat", "Smart Scheduling"]
  },
  {
    title: "Natural Language Processor",
    description: "Advanced NLP system for sentiment analysis, entity recognition, and text summarization.",
    longDescription: "State-of-the-art NLP solution powered by transformer models. Processes and analyzes text at scale with high accuracy for sentiment analysis, named entity recognition, text classification, and automatic summarization.",
    categories: ["AI"], // Only AI
    tags: ["NLP", "BERT", "FastAPI"],
    image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800",
    link: "#",
    price: "$3,000",
    duration: "5-7 weeks",
    team: "3-4 developers",
    features: ["Sentiment Analysis", "Entity Recognition", "Text Summarization", "Multi-language Support"]
  },
  {
    title: "Portfolio CMS",
    description: "Custom content management system for creative professionals with drag-and-drop interface.",
    longDescription: "Beautiful and intuitive CMS designed specifically for creative professionals. Features drag-and-drop page builder, media management, SEO optimization, responsive templates, and easy customization without coding.",
    categories: ["Web Dev"], // Only Web Dev
    tags: ["Next.js", "Tailwind", "Supabase"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    link: "#",
    price: "$1,500",
    duration: "3-4 weeks",
    team: "2 developers",
    features: ["Drag & Drop Builder", "Media Management", "SEO Tools", "Custom Templates"]
  },
  {
    title: "AI Content Generator Platform",
    description: "Web-based AI platform for generating marketing content, social media posts, and blog articles.",
    longDescription: "Revolutionary content generation platform powered by advanced language models. Create high-quality marketing copy, social media content, blog posts, and product descriptions in seconds. Includes SEO optimization and brand voice customization.",
    categories: ["Web Dev", "AI"], // Both categories!
    tags: ["React", "GPT-4", "Node.js", "MongoDB"],
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800",
    link: "#",
    price: "$4,200",
    duration: "6-8 weeks",
    team: "4-5 developers",
    features: ["AI Content Generation", "SEO Optimization", "Brand Voice Training", "Multi-format Export"]
  },
  {
    title: "Intelligent Chatbot Builder",
    description: "No-code platform for building AI-powered chatbots with natural language understanding.",
    longDescription: "Complete chatbot development platform with visual flow builder and advanced AI capabilities. Train custom models, integrate with multiple channels, analyze conversations, and automate customer support without writing code.",
    categories: ["Web Dev", "AI"], // Both categories!
    tags: ["React", "NLP", "TensorFlow", "WebSocket"],
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800",
    link: "#",
    price: "$3,800",
    duration: "5-7 weeks",
    team: "4 developers",
    features: ["Visual Flow Builder", "NLP Training", "Multi-channel Integration", "Analytics Dashboard"]
  }
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [projectToOrder, setProjectToOrder] = useState<typeof projects[0] | null>(null);
  const { theme } = useTheme();
  const { t } = useLanguage();

  const categories = [t.projects.all, t.projects.webDev, t.projects.ai];
  const categoryMap: Record<string, string> = {
    [t.projects.all]: "All",
    [t.projects.webDev]: "Web Dev",
    [t.projects.ai]: "AI"
  };

  // Filter projects based on category - project can appear in multiple categories
  const filteredProjects =
    categoryMap[activeCategory] === "All"
      ? projects
      : projects.filter((p) => p.categories.includes(categoryMap[activeCategory]));

  const handleOrderNow = (project: typeof projects[0]) => {
    setProjectToOrder(project);
    setSelectedProject(null);
    setIsOrderModalOpen(true);
  };

  return (
    <section id="projects" className={`py-12 sm:py-20 px-4 sm:px-6 ${
      theme === "dark"
        ? "bg-gradient-to-b from-[#0A1520] to-[#050B12]"
        : "bg-gradient-to-b from-white to-gray-50"
    }`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {t.projects.title.split(" ")[0]}{" "}
            <span className={theme === "dark" ? "text-[#00FFFF]" : "text-blue-600"}>
              {t.projects.title.split(" ").slice(1).join(" ")}
            </span>
          </h2>
          <p className={`text-base sm:text-lg ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}>
            {t.projects.subtitle}
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12 flex-wrap gap-3 sm:gap-4">
          {categories.map((category) => {
            const categoryKey = categoryMap[category];
            const count = categoryKey === "All" 
              ? projects.length 
              : projects.filter(p => p.categories.includes(categoryKey)).length;
            
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
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  activeCategory === category
                    ? theme === "dark"
                      ? "bg-[#050B12]/30"
                      : "bg-white/30"
                    : theme === "dark"
                    ? "bg-white/10"
                    : "bg-gray-100"
                }`}>
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
                  <div className={`absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    theme === "dark"
                      ? "bg-gradient-to-t from-[#050B12] via-[#050B12]/50 to-transparent"
                      : "bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent"
                  }`}>
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

                  <h3 className="text-lg sm:text-xl font-bold mb-2">{project.title}</h3>
                  <p className={`text-sm mb-4 line-clamp-2 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}>
                    {project.description}
                  </p>

                  {/* Price Tag */}
                  <div className={`text-xl font-bold mb-4 ${
                    theme === "dark" ? "text-[#00FFFF]" : "text-blue-600"
                  }`}>
                    {project.price}
                  </div>

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
                      <span className={`px-2 py-1 rounded-md text-xs ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}>
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
                <div className={`absolute inset-0 bg-gradient-to-t ${
                  theme === "dark"
                    ? "from-[#0A1520] to-transparent"
                    : "from-white to-transparent"
                }`} />
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

                <h2 className="text-2xl sm:text-3xl font-bold mb-4">{selectedProject.title}</h2>
                
                <p className={`text-base mb-6 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}>
                  {selectedProject.longDescription}
                </p>

                {/* Project Info Grid */}
                <div className="grid sm:grid-cols-3 gap-4 mb-6">
                  <div className={`p-4 rounded-xl border ${
                    theme === "dark"
                      ? "bg-white/5 border-white/10"
                      : "bg-gray-50 border-gray-200"
                  }`}>
                    <div className={`text-2xl font-bold mb-1 ${
                      theme === "dark" ? "text-[#00FFFF]" : "text-blue-600"
                    }`}>
                      {selectedProject.price}
                    </div>
                    <div className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}>
                      Starting Price
                    </div>
                  </div>

                  <div className={`p-4 rounded-xl border ${
                    theme === "dark"
                      ? "bg-white/5 border-white/10"
                      : "bg-gray-50 border-gray-200"
                  }`}>
                    <div className={`flex items-center gap-2 mb-1 ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}>
                      <Calendar size={20} />
                      <span className="font-bold">{selectedProject.duration}</span>
                    </div>
                    <div className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}>
                      Timeline
                    </div>
                  </div>

                  <div className={`p-4 rounded-xl border ${
                    theme === "dark"
                      ? "bg-white/5 border-white/10"
                      : "bg-gray-50 border-gray-200"
                  }`}>
                    <div className={`flex items-center gap-2 mb-1 ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}>
                      <Users size={20} />
                      <span className="font-bold">{selectedProject.team}</span>
                    </div>
                    <div className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}>
                      Team Size
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3">Key Features</h3>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {selectedProject.features.map((feature, i) => (
                      <div key={i} className={`flex items-center gap-2 ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}>
                        <span className={theme === "dark" ? "text-[#00FFFF]" : "text-blue-600"}>✓</span>
                        {feature}
                      </div>
                    ))}
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
                    <div className={`absolute inset-0 group-hover:scale-110 transition-transform ${
                      theme === "dark"
                        ? "bg-gradient-to-r from-[#00FFFF] to-[#00CCCC]"
                        : "bg-gradient-to-r from-blue-600 to-blue-700"
                    }`} />
                    <div className={`relative flex items-center justify-center gap-2 font-semibold ${
                      theme === "dark" ? "text-[#050B12]" : "text-white"
                    }`}>
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