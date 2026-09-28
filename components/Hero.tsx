"use client";
import { Download, Briefcase, ChevronDown, Eye } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useTheme } from "../app/contexts/ThemeContext";
import { useLanguage } from "../app/contexts/LanguageContext";
import { useState } from "react";
import CVViewer from "./CVViewer";

// Multi-profession with sub-categories
const professions = [
  {
    main: "Full Stack Developer",
    sub: ["Web Development", "Mobile Apps", "Cloud Architecture", "DevOps Engineer"]
  },
  {
    main: "AI/ML Researcher",
    sub: ["Deep Learning", "Natural Language Processing", "Computer Vision", "Data Science"]
  },
  {
    main: "UI/UX Designer",
    sub: ["Product Design", "User Research", "Interaction Design", "Design Systems"]
  },
  {
    main: "Business Consultant",
    sub: ["Digital Transformation", "Product Strategy", "Business Analysis", "Project Management"]
  }
];

export default function Hero() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [currentProfIndex, setCurrentProfIndex] = useState(0);
  const [showSubProf, setShowSubProf] = useState(false);
  const [cvViewerOpen, setCvViewerOpen] = useState(false);
  const [viewerType, setViewerType] = useState<"cv" | "portfolio">("cv");

  // Auto-rotate professions
  useState(() => {
    const interval = setInterval(() => {
      setCurrentProfIndex((prev) => (prev + 1) % professions.length);
    }, 4000);
    return () => clearInterval(interval);
  });

  const currentProf = professions[currentProfIndex];

  const handleDownloadCV = () => {
    // Simulate CV download
    const link = document.createElement('a');
    link.href = '#'; // Replace with actual CV URL
    link.download = 'YardanRizki_CV.pdf';
    link.click();
  };

  const handleViewCV = () => {
    setViewerType("cv");
    setCvViewerOpen(true);
  };

  const handleViewPortfolio = () => {
    setViewerType("portfolio");
    setCvViewerOpen(true);
  };

  return (
    <>
      <section id="hero" className="min-h-screen flex items-center pt-20 px-4 sm:px-6 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {theme === "dark" && (
            <>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500 blur-3xl rounded-full"
              />
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{ duration: 10, repeat: Infinity, delay: 1 }}
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500 blur-3xl rounded-full"
              />
            </>
          )}
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - About Me with Glassmorphism */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative order-2 md:order-1"
            >
              {/* Glassmorphism Card */}
              <div className={`relative backdrop-blur-xl rounded-3xl p-6 sm:p-8 border shadow-2xl transition-all duration-300 hover:scale-[1.02] ${
                theme === "dark"
                  ? "bg-white/5 border-cyan-500/30"
                  : "bg-white/80 border-gray-200"
              }`}>
                {/* Glow Effect */}
                {theme === "dark" && (
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-transparent opacity-20 blur-xl rounded-3xl" />
                )}
                
                <div className="relative z-10">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
                  >
                    <span className={theme === "dark" ? "text-[#00FFFF]" : "text-blue-600"}>
                      Yardan
                    </span>{" "}
                    <span className={theme === "dark" ? "text-[#FF8C00]" : "text-orange-500"}>
                      Rizki
                    </span>
                  </motion.h1>
                  
                  {/* Animated Multi-Profession Display */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-4 mb-8"
                  >
                    {/* Main Profession - Animated */}
                    <div className="relative min-h-[32px]">
                      <AnimatePresence mode="wait">
                        <motion.h2
                          key={currentProfIndex}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -20, opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          className={`text-xl sm:text-2xl font-bold ${
                            theme === "dark" ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {currentProf.main}
                        </motion.h2>
                      </AnimatePresence>
                    </div>

                    {/* Sub-Professions Dropdown */}
                    <div className="relative">
                      <button
                        onClick={() => setShowSubProf(!showSubProf)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                          theme === "dark"
                            ? "bg-white/5 border-white/10 hover:border-cyan-500/50 text-gray-400"
                            : "bg-gray-50 border-gray-200 hover:border-blue-300 text-gray-600"
                        }`}
                      >
                        <span className="text-sm">Specializations</span>
                        <motion.div
                          animate={{ rotate: showSubProf ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown size={16} />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {showSubProf && (
                          <motion.div
                            initial={{ opacity: 0, y: -10, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: "auto" }}
                            exit={{ opacity: 0, y: -10, height: 0 }}
                            className={`mt-2 p-3 rounded-lg border ${
                              theme === "dark"
                                ? "bg-white/5 border-white/10"
                                : "bg-white border-gray-200"
                            }`}
                          >
                            <div className="flex flex-wrap gap-2">
                              {currentProf.sub.map((subProf, index) => (
                                <motion.span
                                  key={subProf}
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{ delay: index * 0.1 }}
                                  className={`px-3 py-1 rounded-full text-xs border cursor-pointer transition-all hover:scale-105 ${
                                    theme === "dark"
                                      ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20"
                                      : "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                                  }`}
                                >
                                  {subProf}
                                </motion.span>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <p className={`leading-relaxed text-sm sm:text-base ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}>
                      {t.hero.description}
                    </p>
                  </motion.div>

                  {/* Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-wrap gap-4"
                  >
                    <div className="relative group">
                      <button
                        onClick={handleDownloadCV}
                        className="relative px-4 sm:px-6 py-3 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105"
                      >
                        <div className={`absolute inset-0 group-hover:scale-110 transition-transform ${
                          theme === "dark"
                            ? "bg-gradient-to-r from-[#00FFFF] to-[#00CCCC]"
                            : "bg-gradient-to-r from-blue-600 to-blue-700"
                        }`} />
                        <div className={`relative flex items-center gap-2 font-semibold text-sm sm:text-base ${
                          theme === "dark" ? "text-[#050B12]" : "text-white"
                        }`}>
                          <Download size={20} />
                          {t.hero.downloadCV}
                        </div>
                      </button>
                      
                      {/* View CV Option */}
                      <button
                        onClick={handleViewCV}
                        className={`absolute -bottom-8 left-0 opacity-0 group-hover:opacity-100 transition-opacity text-xs flex items-center gap-1 ${
                          theme === "dark" ? "text-cyan-400" : "text-blue-600"
                        }`}
                      >
                        <Eye size={14} />
                        View CV
                      </button>
                    </div>
                    
                    <div className="relative group">
                      <button
                        onClick={handleViewPortfolio}
                        className={`relative px-4 sm:px-6 py-3 rounded-lg border transition-all duration-300 hover:scale-105 ${
                          theme === "dark"
                            ? "border-[#FF8C00] hover:bg-[#FF8C00]/10"
                            : "border-orange-500 hover:bg-orange-50"
                        }`}
                      >
                        <div className={`flex items-center gap-2 text-sm sm:text-base ${
                          theme === "dark" ? "text-[#FF8C00]" : "text-orange-500"
                        }`}>
                          <Briefcase size={20} />
                          {t.hero.viewPortfolio}
                        </div>
                      </button>
                      
                      {/* Download Portfolio Option */}
                      <button
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = '#';
                          link.download = 'YardanRizki_Portfolio.pdf';
                          link.click();
                        }}
                        className={`absolute -bottom-8 left-0 opacity-0 group-hover:opacity-100 transition-opacity text-xs flex items-center gap-1 ${
                          theme === "dark" ? "text-orange-400" : "text-orange-600"
                        }`}
                      >
                        <Download size={14} />
                        Download
                      </button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Profile Photo with Better Integration */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center order-1 md:order-2"
            >
              <div className="relative">
                {/* Animated Aura Layers */}
                {theme === "dark" ? (
                  <>
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00FFFF] to-[#00CCCC] blur-3xl"
                    />
                    <motion.div
                      animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.2, 0.4, 0.2],
                      }}
                      transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                      className="absolute -inset-4 rounded-full bg-[#00FFFF] blur-2xl"
                    />
                  </>
                ) : (
                  <>
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.2, 0.35, 0.2],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 blur-3xl"
                    />
                  </>
                )}
                
                {/* Photo Container with Standing/Sitting Pose */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden shadow-2xl cursor-pointer`}
                >
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80"
                    alt="YardanRizki Profile"
                    className="w-full h-full object-cover object-center"
                  />
                  
                  {/* Gradient Overlay for Better Integration */}
                  <div className={`absolute inset-0 bg-gradient-to-t pointer-events-none ${
                    theme === "dark"
                      ? "from-[#050B12]/40 via-transparent to-transparent"
                      : "from-gray-100/30 via-transparent to-transparent"
                  }`} />
                  
                  {/* Floating Badge */}
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1 }}
                    className={`absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full backdrop-blur-md border text-xs sm:text-sm font-bold whitespace-nowrap ${
                      theme === "dark"
                        ? "bg-[#00FFFF]/20 border-[#00FFFF]/50 text-[#00FFFF]"
                        : "bg-blue-500/20 border-blue-500/50 text-blue-700"
                    }`}
                  >
                    ✨ Available for Projects
                  </motion.div>
                </motion.div>

                {/* Orbiting Icons */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 pointer-events-none"
                >
                  {[0, 90, 180, 270].map((angle, i) => (
                    <motion.div
                      key={angle}
                      className={`absolute w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${
                        theme === "dark"
                          ? "bg-[#FF8C00]/20 border-2 border-[#FF8C00]/50"
                          : "bg-orange-500/20 border-2 border-orange-500/50"
                      }`}
                      style={{
                        top: "50%",
                        left: "50%",
                        transform: `rotate(${angle}deg) translate(160px) rotate(-${angle}deg)`,
                      }}
                    >
                      <span className="text-xs">💻</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CV/Portfolio Viewer Modal */}
      <CVViewer
        isOpen={cvViewerOpen}
        onClose={() => setCvViewerOpen(false)}
        type={viewerType}
      />
    </>
  );
}