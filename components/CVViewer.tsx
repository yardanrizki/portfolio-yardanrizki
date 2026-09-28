"use client";
import { X, Download, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useTheme } from "../app/contexts/ThemeContext";

interface CVViewerProps {
  isOpen: boolean;
  onClose: () => void;
  type: "cv" | "portfolio";
}

// Mock CV/Portfolio pages
const cvPages = [
  "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800",
  "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=800"
];

const portfolioPages = [
  "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
  "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800"
];

export default function CVViewer({ isOpen, onClose, type }: CVViewerProps) {
  const { theme } = useTheme();
  const [currentPage, setCurrentPage] = useState(0);
  const [zoom, setZoom] = useState(100);

  const pages = type === "cv" ? cvPages : portfolioPages;
  const title = type === "cv" ? "Curriculum Vitae" : "Portfolio Document";

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '#'; // Replace with actual PDF URL
    link.download = type === "cv" ? 'YardanRizki_CV.pdf' : 'YardanRizki_Portfolio.pdf';
    link.click();
    
    alert(type === "cv" 
      ? "CV download started!"
      : "Portfolio download started!"
    );
  };

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const zoomIn = () => {
    if (zoom < 200) {
      setZoom(prev => prev + 25);
    }
  };

  const zoomOut = () => {
    if (zoom > 50) {
      setZoom(prev => prev - 25);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className={`relative w-full max-w-5xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden ${
            theme === "dark"
              ? "bg-[#0A1520]"
              : "bg-white"
          }`}
        >
          {/* Header */}
          <div className={`flex items-center justify-between px-6 py-4 border-b ${
            theme === "dark" ? "border-white/10" : "border-gray-200"
          }`}>
            <div>
              <h2 className="text-xl font-bold">{title}</h2>
              <p className={`text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}>
                Page {currentPage + 1} of {pages.length}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* Zoom Controls */}
              <button
                onClick={zoomOut}
                disabled={zoom <= 50}
                className={`p-2 rounded-lg transition-colors ${
                  theme === "dark"
                    ? "bg-white/5 hover:bg-white/10 text-white disabled:opacity-30"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-900 disabled:opacity-30"
                }`}
              >
                <ZoomOut size={20} />
              </button>
              
              <span className={`text-sm font-mono min-w-[60px] text-center ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}>
                {zoom}%
              </span>
              
              <button
                onClick={zoomIn}
                disabled={zoom >= 200}
                className={`p-2 rounded-lg transition-colors ${
                  theme === "dark"
                    ? "bg-white/5 hover:bg-white/10 text-white disabled:opacity-30"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-900 disabled:opacity-30"
                }`}
              >
                <ZoomIn size={20} />
              </button>

              {/* Download Button */}
              <button
                onClick={handleDownload}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                  theme === "dark"
                    ? "bg-[#00FFFF] text-[#050B12] hover:bg-[#00CCCC]"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                <Download size={18} />
                Download
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                className={`p-2 rounded-lg transition-colors ${
                  theme === "dark"
                    ? "bg-white/5 hover:bg-white/10 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                }`}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Document Viewer */}
          <div className={`flex-1 overflow-auto ${
            theme === "dark" ? "bg-[#050B12]" : "bg-gray-100"
          }`}>
            <div className="flex items-center justify-center min-h-full p-8">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="relative"
                style={{
                  transform: `scale(${zoom / 100})`,
                  transformOrigin: 'center',
                }}
              >
                <img
                  src={pages[currentPage]}
                  alt={`${title} - Page ${currentPage + 1}`}
                  className="max-w-full h-auto shadow-2xl rounded-lg"
                />
              </motion.div>
            </div>
          </div>

          {/* Navigation Footer */}
          <div className={`flex items-center justify-between px-6 py-4 border-t ${
            theme === "dark" ? "border-white/10" : "border-gray-200"
          }`}>
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
                theme === "dark"
                  ? "bg-white/5 hover:bg-white/10 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-900"
              }`}
            >
              <ChevronLeft size={20} />
              Previous
            </button>

            {/* Page Indicators */}
            <div className="flex items-center gap-2">
              {pages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentPage
                      ? theme === "dark"
                        ? "bg-[#00FFFF] w-6"
                        : "bg-blue-600 w-6"
                      : theme === "dark"
                      ? "bg-white/20"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextPage}
              disabled={currentPage === pages.length - 1}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
                theme === "dark"
                  ? "bg-white/5 hover:bg-white/10 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-900"
              }`}
            >
              Next
              <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
