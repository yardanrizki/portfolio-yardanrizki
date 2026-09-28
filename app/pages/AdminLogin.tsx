"use client";
import { useState } from "react";
import { Lock, Mail, Eye, EyeOff, Shield } from "lucide-react";
  import { motion } from "motion/react";
  import { useRouter } from "next/navigation";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "admin@yardanrizki.com" && password === "admin123") {
      router.push("/admin/dashboard");
    } else {
      alert("Invalid credentials. Demo: admin@yardanrizki.com / admin123");
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-6 py-12 transition-colors duration-300 ${
      theme === "dark" ? "bg-[#050B12]" : "bg-gray-50"
    }`}>
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {theme === "dark" ? (
          <>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00FFFF] opacity-10 blur-3xl rounded-full" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FF8C00] opacity-10 blur-3xl rounded-full" />
          </>
        ) : (
          <>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 opacity-10 blur-3xl rounded-full" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-400 opacity-10 blur-3xl rounded-full" />
          </>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        {/* Back to Home */}
        <a
          href="/"
          className={`inline-flex items-center gap-2 mb-8 transition-colors ${
            theme === "dark"
              ? "text-[#00FFFF] hover:text-[#00CCCC]"
              : "text-blue-600 hover:text-blue-700"
          }`}
        >
          ← {t.admin.backToHome}
        </a>

        {/* Login Card */}
        <div className={`relative backdrop-blur-xl rounded-3xl p-8 border shadow-2xl transition-colors duration-300 ${
          theme === "dark"
            ? "bg-white/5 border-cyan-500/30"
            : "bg-white border-gray-200"
        }`}>
          {/* Glow Effect */}
          {theme === "dark" && (
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 opacity-20 blur-xl rounded-3xl" />
          )}

          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                theme === "dark"
                  ? "bg-[#00FFFF]/20"
                  : "bg-blue-100"
              }`}>
                <Shield size={32} className={theme === "dark" ? "text-[#00FFFF]" : "text-blue-600"} />
              </div>
              <h1 className="text-3xl font-bold mb-2">{t.admin.portal}</h1>
              <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
                {t.admin.signInDesc}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Mail 
                    size={20} 
                    className={`transition-colors ${
                      theme === "dark"
                        ? "text-gray-400 group-focus-within:text-[#00FFFF]"
                        : "text-gray-400 group-focus-within:text-blue-600"
                    }`}
                  />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder={t.admin.emailPlaceholder}
                  className={`w-full pl-12 pr-4 py-3 rounded-lg border focus:outline-none transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-white/5 border-white/10 focus:border-[#00FFFF] text-white placeholder-gray-500"
                      : "bg-white border-gray-300 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                  }`}
                />
                {theme === "dark" && (
                  <div className="absolute inset-0 rounded-lg bg-[#00FFFF] opacity-0 group-focus-within:opacity-10 blur-md transition-opacity pointer-events-none" />
                )}
              </div>

              {/* Password Input */}
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Lock 
                    size={20} 
                    className={`transition-colors ${
                      theme === "dark"
                        ? "text-gray-400 group-focus-within:text-[#00FFFF]"
                        : "text-gray-400 group-focus-within:text-blue-600"
                    }`}
                  />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder={t.admin.passwordPlaceholder}
                  className={`w-full pl-12 pr-12 py-3 rounded-lg border focus:outline-none transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-white/5 border-white/10 focus:border-[#00FFFF] text-white placeholder-gray-500"
                      : "bg-white border-gray-300 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${
                    theme === "dark"
                      ? "text-gray-400 hover:text-[#00FFFF]"
                      : "text-gray-400 hover:text-blue-600"
                  }`}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {theme === "dark" && (
                  <div className="absolute inset-0 rounded-lg bg-[#00FFFF] opacity-0 group-focus-within:opacity-10 blur-md transition-opacity pointer-events-none" />
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className={`rounded ${
                      theme === "dark"
                        ? "border-white/10 bg-white/5"
                        : "border-gray-300 bg-white"
                    }`}
                  />
                  <span className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
                    {t.admin.rememberMe}
                  </span>
                </label>
                <a 
                  href="#" 
                  className={`transition-colors ${
                    theme === "dark"
                      ? "text-[#00FFFF] hover:text-[#00CCCC]"
                      : "text-blue-600 hover:text-blue-700"
                  }`}
                >
                  {t.admin.forgotPassword}
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="group relative w-full px-6 py-3 rounded-lg overflow-hidden transition-all duration-300"
              >
                <div className={`absolute inset-0 group-hover:scale-105 transition-transform ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-[#00FFFF] to-[#00CCCC]"
                    : "bg-gradient-to-r from-blue-600 to-blue-700"
                }`} />
                <div className={`relative flex items-center justify-center gap-2 font-semibold ${
                  theme === "dark" ? "text-[#050B12]" : "text-white"
                }`}>
                  <Lock size={20} />
                  {t.admin.signIn}
                </div>
              </button>
            </form>

            {/* Demo Credentials */}
            <div className={`mt-6 p-4 rounded-lg border ${
              theme === "dark"
                ? "bg-[#FF8C00]/10 border-[#FF8C00]/30"
                : "bg-orange-50 border-orange-200"
            }`}>
              <p className={`text-xs text-center ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}>
                {t.admin.demoCredentials}{" "}
                <span className={theme === "dark" ? "text-[#FF8C00]" : "text-orange-600"}>
                  admin@yardanrizki.com
                </span>{" "}
                /{" "}
                <span className={theme === "dark" ? "text-[#FF8C00]" : "text-orange-600"}>
                  admin123
                </span>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
