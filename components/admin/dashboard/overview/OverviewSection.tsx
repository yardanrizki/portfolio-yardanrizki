"use client";

import { motion } from "motion/react";

type OverviewStats = {
  totalProjects: number;
  totalCertificates: number;
  totalMessages: number;
  totalPublications: number;
};

type RecentMessage = {
  name: string;
  email: string;
  subject: string;
  date: string;
};

type OverviewSectionProps = {
  stats: OverviewStats;
  isLoadingStats: boolean;
  recentMessages: RecentMessage[];
};

export default function OverviewSection({
  stats,
  isLoadingStats,
  recentMessages,
}: OverviewSectionProps) {
  return (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    label: "Total Projects",
                    value: stats.totalProjects,
                    color: "#00FFFF",
                  },
                  {
                    label: "Certifications",
                    value: stats.totalCertificates,
                    color: "#FF8C00",
                  },
                  {
                    label: "Messages",
                    value: stats.totalMessages,
                    color: "#00FFFF",
                  },
                  {
                    label: "Publications",
                    value: stats.totalPublications,
                    color: "#FF8C00",
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10"
                  >
                    <p className="text-gray-400 text-sm mb-2">{stat.label}</p>

                    <p
                      className="text-4xl font-bold"
                      style={{ color: stat.color }}
                    >
                      {isLoadingStats ? "..." : stat.value}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Recent Messages */}
              <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Recent Messages</h3>
                  <button className="text-[#00FFFF] hover:text-[#00CCCC] transition-colors">
                    View All
                  </button>
                </div>

                <div className="space-y-4">
                  {recentMessages.map((message, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{message.name}</h4>
                          <p className="text-sm text-gray-400 mb-1">
                            {message.email}
                          </p>
                          <p className="text-sm text-[#00FFFF]">
                            {message.subject}
                          </p>
                        </div>
                        <span className="text-xs text-gray-500">
                          {message.date}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
  );
}
