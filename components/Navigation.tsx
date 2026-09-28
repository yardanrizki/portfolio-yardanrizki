"use client"
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, Globe } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "../app/contexts/ThemeContext";
import { useLanguage } from "../app/contexts/LanguageContext";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: t.nav.about, href: "#hero" },
    { label: t.nav.skills, href: "#skills" },
    { label: t.nav.experience, href: "#experience" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.certifications, href: "#certifications" },
    { label: t.nav.contact, href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? theme === "dark"
            ? "bg-[#050B12]/90 backdrop-blur-lg border-b border-cyan-500/20"
            : "bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-xl sm:text-2xl font-bold cursor-pointer"
            onClick={() => scrollToSection("#hero")}
          >
            <span className={theme === "dark" ? "text-[#00FFFF]" : "text-blue-600"}>
              Yardan
            </span>
            <span className={theme === "dark" ? "text-[#FF8C00]" : "text-orange-500"}>
              Rizki
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className={`transition-colors relative group ${
                  theme === "dark"
                    ? "text-gray-300 hover:text-[#00FFFF]"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full ${
                    theme === "dark" ? "bg-[#00FFFF]" : "bg-blue-600"
                  }`}
                />
              </button>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all duration-300 ${
                theme === "dark"
                  ? "bg-white/5 hover:bg-white/10 text-[#00FFFF]"
                  : "bg-gray-100 hover:bg-gray-200 text-orange-500"
              }`}
              aria-label="Toggle theme"
            >
              <motion.div
                initial={false}
                animate={{ rotate: theme === "dark" ? 0 : 180 }}
                transition={{ duration: 0.3 }}
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </motion.div>
            </button>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-white/5 hover:bg-white/10 text-gray-300"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                <Globe size={18} />
                <span className="text-sm uppercase">{language}</span>
              </button>
              
              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`absolute right-0 mt-2 rounded-lg shadow-lg overflow-hidden ${
                      theme === "dark"
                        ? "bg-[#0A1520] border border-cyan-500/20"
                        : "bg-white border border-gray-200"
                    }`}
                  >
                    <button
                      onClick={() => {
                        setLanguage("en");
                        setIsLangMenuOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left transition-colors ${
                        theme === "dark"
                          ? "hover:bg-white/5 text-gray-300"
                          : "hover:bg-gray-100 text-gray-700"
                      } ${language === "en" ? "bg-white/10" : ""}`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => {
                        setLanguage("id");
                        setIsLangMenuOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left transition-colors ${
                        theme === "dark"
                          ? "hover:bg-white/5 text-gray-300"
                          : "hover:bg-gray-100 text-gray-700"
                      } ${language === "id" ? "bg-white/10" : ""}`}
                    >
                      Bahasa Indonesia
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a
              href="/admin"
              className={`px-4 py-2 rounded-lg transition-colors ${
                theme === "dark"
                  ? "bg-[#FF8C00] hover:bg-[#FF8C00]/80 text-white"
                  : "bg-orange-500 hover:bg-orange-600 text-white"
              }`}
            >
              {t.nav.admin}
            </a>
          </div>

          {/* Mobile Controls */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Theme Toggle Mobile */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all ${
                theme === "dark"
                  ? "bg-white/5 text-[#00FFFF]"
                  : "bg-gray-100 text-orange-500"
              }`}
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={theme === "dark" ? "text-[#00FFFF]" : "text-blue-600"}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 pb-4 space-y-3"
            >
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className={`block w-full text-left py-2 px-3 rounded-lg transition-colors ${
                    theme === "dark"
                      ? "text-gray-300 hover:text-[#00FFFF] hover:bg-white/5"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </button>
              ))}

              {/* Language Selector Mobile */}
              <div className={`flex gap-2 px-3 py-2 ${
                theme === "dark" ? "border-t border-cyan-500/20" : "border-t border-gray-200"
              } mt-2 pt-4`}>
                <button
                  onClick={() => {
                    setLanguage("en");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex-1 py-2 px-3 rounded-lg transition-colors ${
                    language === "en"
                      ? theme === "dark"
                        ? "bg-[#00FFFF] text-[#050B12]"
                        : "bg-blue-600 text-white"
                      : theme === "dark"
                      ? "bg-white/5 text-gray-300"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => {
                    setLanguage("id");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex-1 py-2 px-3 rounded-lg transition-colors ${
                    language === "id"
                      ? theme === "dark"
                        ? "bg-[#00FFFF] text-[#050B12]"
                        : "bg-blue-600 text-white"
                      : theme === "dark"
                      ? "bg-white/5 text-gray-300"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  ID
                </button>
              </div>

              <a
                href="/admin"
                className={`block text-center px-4 py-2 rounded-lg transition-colors ${
                  theme === "dark"
                    ? "bg-[#FF8C00] hover:bg-[#FF8C00]/80 text-white"
                    : "bg-orange-500 hover:bg-orange-600 text-white"
                }`}
              >
                {t.nav.admin}
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
