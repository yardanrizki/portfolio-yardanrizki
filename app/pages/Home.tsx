"use client"; 
import Hero from "../../components/Hero";
import Statistics from "../../components/Statistics";
import Skills from "../../components/Skills";
import Experience from "../../components/Experience";
import Projects from "../../components/Projects";
import Certifications from "../../components/Certifications";
import Contact from "../../components/Contact";
import Navigation from "../../components/Navigation";
import CustomCursor from "../../components/CustomCursor";
import FallingBadges from "../../components/FallingBadges";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";

export default function Home() {
  const { theme } = useTheme();
  const { t } = useLanguage();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === "dark" ? "bg-[#050B12] text-white" : "bg-gray-50 text-gray-900"
    }`} style={{ cursor: 'none' }}>
      <CustomCursor />
      {theme === "dark" && <FallingBadges />}
      <Navigation />
      <Hero />
      <Statistics />
      <Skills />
      <Experience />
      <Projects />
      <Certifications />
      <Contact />
      
      {/* Footer */}
      <footer className={`py-8 text-center border-t ${
        theme === "dark" ? "border-cyan-500/20" : "border-gray-200"
      }`}>
        <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
          {t.footer.rights}
        </p>
      </footer>
    </div>
  );
}