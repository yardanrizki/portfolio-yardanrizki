import { Award, FileText, Download } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "../app/contexts/ThemeContext";
import { useLanguage } from "../app/contexts/LanguageContext";

const certifications = [
  {
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2024",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400",
    pdfUrl: "#"
  },
  {
    title: "Google Cloud Professional",
    issuer: "Google Cloud",
    date: "2023",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400",
    pdfUrl: "#"
  },
  {
    title: "Machine Learning Specialization",
    issuer: "Stanford University",
    date: "2023",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
    pdfUrl: "#"
  },
  {
    title: "Full Stack Web Development",
    issuer: "Meta",
    date: "2022",
    image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=400",
    pdfUrl: "#"
  },
  {
    title: "Professional Scrum Master",
    issuer: "Scrum.org",
    date: "2022",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400",
    pdfUrl: "#"
  },
  {
    title: "Advanced React & Redux",
    issuer: "Udemy",
    date: "2021",
    image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=400",
    pdfUrl: "#"
  }
];

export default function Certifications() {
  const { theme } = useTheme();
  const { t } = useLanguage();

  return (
    <section id="certifications" className={`py-12 sm:py-20 px-4 sm:px-6 ${
      theme === "dark" ? "bg-[#050B12]" : "bg-white"
    }`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className={theme === "dark" ? "text-[#FF8C00]" : "text-orange-500"}>
              {t.certifications.title.split(" & ")[0]}
            </span>{" "}
            {t.certifications.title.split(" & ")[1]}
          </h2>
          <p className={`text-base sm:text-lg ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}>
            {t.certifications.subtitle}
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              {/* Card */}
              <div className={`relative backdrop-blur-xl rounded-2xl overflow-hidden border transition-all duration-300 ${
                theme === "dark"
                  ? "bg-white/5 border-white/10 hover:border-orange-500/50"
                  : "bg-white border-gray-200 hover:border-orange-300 shadow-sm hover:shadow-xl"
              }`}>
                {/* Image Preview */}
                <div className={`relative h-48 overflow-hidden ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-[#0A1520] to-[#050B12]"
                    : "bg-gradient-to-br from-gray-100 to-gray-50"
                }`}>
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
                      theme === "dark" ? "opacity-60 group-hover:opacity-80" : "opacity-50 group-hover:opacity-70"
                    }`}
                  />
                  
                  {/* Award Icon Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full backdrop-blur-sm flex items-center justify-center border ${
                      theme === "dark"
                        ? "bg-[#FF8C00]/20 border-[#FF8C00]/50"
                        : "bg-orange-500/20 border-orange-500/50"
                    }`}>
                      <Award size={28} className={theme === "dark" ? "text-[#FF8C00]" : "text-orange-500"} />
                    </div>
                  </div>

                  {/* Download Button - Shows on Hover */}
                  <a
                    href={cert.pdfUrl}
                    className={`absolute top-4 right-4 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 hover:scale-110 ${
                      theme === "dark"
                        ? "bg-[#00FFFF] text-[#050B12]"
                        : "bg-blue-600 text-white"
                    }`}
                    title="Download Certificate"
                  >
                    <Download size={16} />
                  </a>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-base sm:text-lg font-bold flex-1">{cert.title}</h3>
                    <FileText size={20} className={theme === "dark" ? "text-[#00FFFF]" : "text-blue-600"} />
                  </div>
                  <p className={`text-sm mb-1 ${
                    theme === "dark" ? "text-[#FF8C00]" : "text-orange-500"
                  }`}>{cert.issuer}</p>
                  <p className={`text-xs ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}>{cert.date}</p>
                </div>

                {/* Glow Effect on Hover */}
                {theme === "dark" && (
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF8C00] to-[#FF6600] opacity-0 group-hover:opacity-20 blur-xl transition-opacity rounded-2xl" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
