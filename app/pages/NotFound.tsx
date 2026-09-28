import { motion } from "motion/react";
import { Home } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";

export default function NotFound() {
  const { theme } = useTheme();
  const { t } = useLanguage();

  return (
    <div className={`min-h-screen flex items-center justify-center px-6 transition-colors duration-300 ${
      theme === "dark" ? "bg-[#050B12]" : "bg-gray-50"
    }`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <h1 className="text-7xl sm:text-9xl font-bold mb-4">
          <span className={theme === "dark" ? "text-[#00FFFF]" : "text-blue-600"}>4</span>
          <span className={theme === "dark" ? "text-[#FF8C00]" : "text-orange-500"}>0</span>
          <span className={theme === "dark" ? "text-[#00FFFF]" : "text-blue-600"}>4</span>
        </h1>
        <h2 className={`text-2xl sm:text-3xl font-bold mb-4 ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}>
          {t.notFound.title}
        </h2>
        <p className={`mb-8 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          {t.notFound.description}
        </p>
        <a
          href="/"
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform ${
            theme === "dark"
              ? "bg-gradient-to-r from-[#00FFFF] to-[#00CCCC] text-[#050B12]"
              : "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
          }`}
        >
          <Home size={20} />
          {t.notFound.backHome}
        </a>
      </motion.div>
    </div>
  );
}
