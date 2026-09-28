"use client"
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useTheme } from "../app/contexts/ThemeContext";
import { useLanguage } from "../app/contexts/LanguageContext";

export default function Contact() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    const message = t.language === "id"
      ? "Terima kasih atas pesan Anda! Saya akan segera menghubungi Anda."
      : "Thank you for your message! I'll get back to you soon.";
    alert(message);
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className={`py-12 sm:py-20 px-4 sm:px-6 ${
      theme === "dark"
        ? "bg-gradient-to-b from-[#050B12] to-[#0A1520]"
        : "bg-gradient-to-b from-gray-50 to-white"
    }`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {t.contact.title.split(" ")[0]}{" "}
            <span className={theme === "dark" ? "text-[#00FFFF]" : "text-blue-600"}>
              {t.contact.title.split(" ").slice(1).join(" ")}
            </span>
          </h2>
          <p className={`text-base sm:text-lg ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}>
            {t.contact.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-6">{t.contact.info}</h3>
              
              {/* Contact Items */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 group">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center group-hover:bg-opacity-40 transition-colors ${
                    theme === "dark"
                      ? "bg-[#00FFFF]/20 group-hover:bg-[#00FFFF]/30"
                      : "bg-blue-100 group-hover:bg-blue-200"
                  }`}>
                    <Mail className={theme === "dark" ? "text-[#00FFFF]" : "text-blue-600"} size={20} />
                  </div>
                  <div>
                    <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                      {t.contact.email}
                    </p>
                    <a 
                      href="mailto:yardan@example.com" 
                      className={`transition-colors ${
                        theme === "dark"
                          ? "text-white hover:text-[#00FFFF]"
                          : "text-gray-900 hover:text-blue-600"
                      }`}
                    >
                      yardan@example.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center group-hover:bg-opacity-40 transition-colors ${
                    theme === "dark"
                      ? "bg-[#FF8C00]/20 group-hover:bg-[#FF8C00]/30"
                      : "bg-orange-100 group-hover:bg-orange-200"
                  }`}>
                    <Phone className={theme === "dark" ? "text-[#FF8C00]" : "text-orange-500"} size={20} />
                  </div>
                  <div>
                    <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                      {t.contact.phone}
                    </p>
                    <a 
                      href="tel:+1234567890" 
                      className={`transition-colors ${
                        theme === "dark"
                          ? "text-white hover:text-[#FF8C00]"
                          : "text-gray-900 hover:text-orange-500"
                      }`}
                    >
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center group-hover:bg-opacity-40 transition-colors ${
                    theme === "dark"
                      ? "bg-[#00FFFF]/20 group-hover:bg-[#00FFFF]/30"
                      : "bg-blue-100 group-hover:bg-blue-200"
                  }`}>
                    <MapPin className={theme === "dark" ? "text-[#00FFFF]" : "text-blue-600"} size={20} />
                  </div>
                  <div>
                    <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                      {t.contact.location}
                    </p>
                    <p className={theme === "dark" ? "text-white" : "text-gray-900"}>
                      San Francisco, CA
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg sm:text-xl font-bold mb-4">{t.contact.connectWith}</h4>
              <div className="flex gap-4">
              </div>
            </div>
          </motion.div>

          {/* Contact Form - Floating with Glowing Borders */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Floating Card */}
            <div className={`relative backdrop-blur-xl rounded-2xl p-6 sm:p-8 border shadow-2xl ${
              theme === "dark"
                ? "bg-white/5 border-white/10"
                : "bg-white border-gray-200"
            }`}>
              {/* Glow Effect */}
              {theme === "dark" && (
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00FFFF] via-[#FF8C00] to-[#00FFFF] opacity-20 blur-xl rounded-2xl" />
              )}
              
              <form onSubmit={handleSubmit} className="relative z-10 space-y-4 sm:space-y-6">
                {/* Name Input */}
                <div className="relative group">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder={t.contact.name}
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none transition-all duration-300 placeholder:text-sm sm:placeholder:text-base ${
                      theme === "dark"
                        ? "bg-white/5 border-white/10 focus:border-[#00FFFF] text-white placeholder-gray-500"
                        : "bg-white border-gray-300 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                    }`}
                  />
                  {theme === "dark" && (
                    <div className="absolute inset-0 rounded-lg bg-[#00FFFF] opacity-0 group-focus-within:opacity-10 blur-md transition-opacity pointer-events-none" />
                  )}
                </div>

                {/* Email Input */}
                <div className="relative group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder={t.contact.email}
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none transition-all duration-300 placeholder:text-sm sm:placeholder:text-base ${
                      theme === "dark"
                        ? "bg-white/5 border-white/10 focus:border-[#00FFFF] text-white placeholder-gray-500"
                        : "bg-white border-gray-300 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                    }`}
                  />
                  {theme === "dark" && (
                    <div className="absolute inset-0 rounded-lg bg-[#00FFFF] opacity-0 group-focus-within:opacity-10 blur-md transition-opacity pointer-events-none" />
                  )}
                </div>

                {/* Phone Input */}
                <div className="relative group">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder={t.contact.phone}
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none transition-all duration-300 placeholder:text-sm sm:placeholder:text-base ${
                      theme === "dark"
                        ? "bg-white/5 border-white/10 focus:border-[#00FFFF] text-white placeholder-gray-500"
                        : "bg-white border-gray-300 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                    }`}
                  />
                  {theme === "dark" && (
                    <div className="absolute inset-0 rounded-lg bg-[#00FFFF] opacity-0 group-focus-within:opacity-10 blur-md transition-opacity pointer-events-none" />
                  )}
                </div>

                {/* Subject Input */}
                <div className="relative group">
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder={t.contact.subject}
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none transition-all duration-300 placeholder:text-sm sm:placeholder:text-base ${
                      theme === "dark"
                        ? "bg-white/5 border-white/10 focus:border-[#00FFFF] text-white placeholder-gray-500"
                        : "bg-white border-gray-300 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                    }`}
                  />
                  {theme === "dark" && (
                    <div className="absolute inset-0 rounded-lg bg-[#00FFFF] opacity-0 group-focus-within:opacity-10 blur-md transition-opacity pointer-events-none" />
                  )}
                </div>

                {/* Message Textarea */}
                <div className="relative group">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder={t.contact.message}
                    rows={5}
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none transition-all duration-300 resize-none placeholder:text-sm sm:placeholder:text-base ${
                      theme === "dark"
                        ? "bg-white/5 border-white/10 focus:border-[#00FFFF] text-white placeholder-gray-500"
                        : "bg-white border-gray-300 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                    }`}
                  />
                  {theme === "dark" && (
                    <div className="absolute inset-0 rounded-lg bg-[#00FFFF] opacity-0 group-focus-within:opacity-10 blur-md transition-opacity pointer-events-none" />
                  )}
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
                    {t.contact.send}
                    <Send size={20} />
                  </div>
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}