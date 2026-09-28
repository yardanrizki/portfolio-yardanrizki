"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "../app/contexts/ThemeContext";
import { useLanguage } from "../app/contexts/LanguageContext";
import { X, Send } from "lucide-react";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
}

export default function OrderModal({ isOpen, onClose, projectName }: OrderModalProps) {
  const { theme } = useTheme();
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    deadline: "",
    description: "",
  });

  const budgetOptions = [
    { value: "under1k", label: t.order.under1k },
    { value: "1k-5k", label: t.order.range1k5k },
    { value: "5k-10k", label: t.order.range5k10k },
    { value: "above10k", label: t.order.above10k },
  ];

  const deadlineOptions = [
    { value: "1week", label: t.order.week1 },
    { value: "2weeks", label: t.order.weeks2 },
    { value: "1month", label: t.order.month1 },
    { value: "3months", label: t.order.months3 },
    { value: "flexible", label: t.order.flexible },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (will be connected to backend later)
    console.log("Order submitted:", { ...formData, projectName });
    alert(
      `Order submitted for ${projectName}!\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nBudget: ${formData.budget}\nDeadline: ${formData.deadline}\nDescription: ${formData.description}`
    );
    onClose();
    setFormData({
      name: "",
      email: "",
      phone: "",
      budget: "",
      deadline: "",
      description: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto pointer-events-auto"
            >
              <div
                className={`relative rounded-2xl p-6 sm:p-8 border ${
                  theme === "dark"
                    ? "bg-[#0A1520] border-white/20"
                    : "bg-white border-gray-200 shadow-2xl"
                }`}
              >
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className={`absolute top-4 right-4 p-2 rounded-lg transition-colors ${
                    theme === "dark"
                      ? "hover:bg-white/10 text-gray-400 hover:text-white"
                      : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <X size={24} />
                </button>

                {/* Header */}
                <div className="mb-6">
                  <h2
                    className={`text-2xl sm:text-3xl font-bold mb-2 ${
                      theme === "dark" ? "text-[#00FFFF]" : "text-blue-600"
                    }`}
                  >
                    {t.order.title}
                  </h2>
                  <p
                    className={`text-base ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {t.order.subtitle}
                  </p>
                </div>

                {/* Project Name Display */}
                <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
                  <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    {t.order.projectName}:
                  </p>
                  <p
                    className={`text-lg font-bold ${
                      theme === "dark" ? "text-[#00FFFF]" : "text-blue-600"
                    }`}
                  >
                    {projectName}
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className={`block text-sm font-medium mb-2 ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {t.order.name}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border transition-all ${
                        theme === "dark"
                          ? "bg-white/5 border-white/10 text-white focus:border-cyan-500 focus:bg-white/10"
                          : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
                      } focus:outline-none focus:ring-2 focus:ring-cyan-500/20`}
                      placeholder={t.order.name}
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="email"
                        className={`block text-sm font-medium mb-2 ${
                          theme === "dark" ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {t.order.email}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border transition-all ${
                          theme === "dark"
                            ? "bg-white/5 border-white/10 text-white focus:border-cyan-500 focus:bg-white/10"
                            : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
                        } focus:outline-none focus:ring-2 focus:ring-cyan-500/20`}
                        placeholder={t.order.email}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className={`block text-sm font-medium mb-2 ${
                          theme === "dark" ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {t.order.phone}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border transition-all ${
                          theme === "dark"
                            ? "bg-white/5 border-white/10 text-white focus:border-cyan-500 focus:bg-white/10"
                            : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
                        } focus:outline-none focus:ring-2 focus:ring-cyan-500/20`}
                        placeholder="+62 xxx xxxx xxxx"
                      />
                    </div>
                  </div>

                  {/* Budget & Deadline */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="budget"
                        className={`block text-sm font-medium mb-2 ${
                          theme === "dark" ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {t.order.budget}
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        required
                        value={formData.budget}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border transition-all ${
                          theme === "dark"
                            ? "bg-white/5 border-white/10 text-white focus:border-cyan-500 focus:bg-white/10"
                            : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
                        } focus:outline-none focus:ring-2 focus:ring-cyan-500/20`}
                      >
                        <option value="">{t.order.selectBudget}</option>
                        {budgetOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="deadline"
                        className={`block text-sm font-medium mb-2 ${
                          theme === "dark" ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {t.order.deadline}
                      </label>
                      <select
                        id="deadline"
                        name="deadline"
                        required
                        value={formData.deadline}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border transition-all ${
                          theme === "dark"
                            ? "bg-white/5 border-white/10 text-white focus:border-cyan-500 focus:bg-white/10"
                            : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
                        } focus:outline-none focus:ring-2 focus:ring-cyan-500/20`}
                      >
                        <option value="">{t.order.selectDeadline}</option>
                        {deadlineOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label
                      htmlFor="description"
                      className={`block text-sm font-medium mb-2 ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {t.order.description}
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      required
                      rows={4}
                      value={formData.description}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border transition-all resize-none ${
                        theme === "dark"
                          ? "bg-white/5 border-white/10 text-white focus:border-cyan-500 focus:bg-white/10"
                          : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
                      } focus:outline-none focus:ring-2 focus:ring-cyan-500/20`}
                      placeholder={t.order.description}
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all ${
                        theme === "dark"
                          ? "bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300"
                      }`}
                    >
                      {t.order.cancel}
                    </button>

                    <button
                      type="submit"
                      className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                        theme === "dark"
                          ? "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white"
                          : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white"
                      }`}
                    >
                      <Send size={18} />
                      {t.order.send}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
