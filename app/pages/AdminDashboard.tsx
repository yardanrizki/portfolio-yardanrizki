  import { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Award,
  MessageSquare,
  Settings,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Menu,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/admin");
  };

  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "experience", label: "Experience", icon: FileText },
    { id: "certifications", label: "Certifications", icon: Award },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  // Mock data
  const stats = [
    { label: "Total Projects", value: "12", color: "#00FFFF" },
    { label: "Certifications", value: "8", color: "#FF8C00" },
    { label: "Messages", value: "24", color: "#00FFFF" },
    { label: "Publications", value: "15", color: "#FF8C00" },
  ];

  const recentMessages = [
    { name: "John Doe", email: "john@example.com", subject: "Project Inquiry", date: "2 hours ago" },
    { name: "Jane Smith", email: "jane@example.com", subject: "Collaboration", date: "5 hours ago" },
    { name: "Mike Johnson", email: "mike@example.com", subject: "Job Offer", date: "1 day ago" },
  ];

  return (
    <div className="min-h-screen bg-[#050B12] text-white">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white/5 border border-white/10 text-[#00FFFF]"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#0A1520] border-r border-cyan-500/20 transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="p-6 border-b border-cyan-500/20">
              <h1 className="text-2xl font-bold">
                <span className="text-[#00FFFF]">Admin</span>
                <span className="text-[#FF8C00]">Panel</span>
              </h1>
              <p className="text-sm text-gray-400 mt-1">YardanRizki Portfolio</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    activeTab === item.id
                      ? "bg-[#00FFFF] text-[#050B12]"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <item.icon size={20} />
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-cyan-500/20">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-400/10 transition-all duration-300"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">
              {menuItems.find((item) => item.id === activeTab)?.label}
            </h2>
            <p className="text-gray-400">Manage your portfolio content</p>
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10"
                  >
                    <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                    <p className="text-4xl font-bold" style={{ color: stat.color }}>
                      {stat.value}
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
                          <p className="text-sm text-gray-400 mb-1">{message.email}</p>
                          <p className="text-sm text-[#00FFFF]">{message.subject}</p>
                        </div>
                        <span className="text-xs text-gray-500">{message.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="flex justify-end">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#00FFFF] to-[#00CCCC] text-[#050B12] font-semibold hover:scale-105 transition-transform">
                  <Plus size={20} />
                  Add Project
                </button>
              </div>

              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-cyan-500/50 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">Project Title {i}</h3>
                        <p className="text-gray-400 mb-3">
                          Brief description of the project and its key features.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 rounded-full text-xs bg-[#00FFFF]/20 text-[#00FFFF]">
                            Web Dev
                          </span>
                          <span className="px-3 py-1 rounded-full text-xs bg-[#FF8C00]/20 text-[#FF8C00]">
                            Featured
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-[#00FFFF] hover:bg-[#00FFFF]/10 transition-all">
                          <Edit size={18} className="text-[#00FFFF]" />
                        </button>
                        <button className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-red-500 hover:bg-red-500/10 transition-all">
                          <Trash2 size={18} className="text-red-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other Tabs - Placeholder */}
          {["experience", "certifications", "messages", "settings"].includes(activeTab) && (
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-12 border border-white/10 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#00FFFF]/20 flex items-center justify-center">
                {menuItems.find((item) => item.id === activeTab)?.icon && (
                  <div className="text-[#00FFFF]">
                    {(() => {
                      const Icon = menuItems.find((item) => item.id === activeTab)!.icon;
                      return <Icon size={32} />;
                    })()}
                  </div>
                )}
              </div>
              <h3 className="text-2xl font-bold mb-2">
                {menuItems.find((item) => item.id === activeTab)?.label} Management
              </h3>
              <p className="text-gray-400 mb-6">
                This section will allow you to manage your {activeTab} content.
              </p>
              <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#00FFFF] to-[#00CCCC] text-[#050B12] font-semibold hover:scale-105 transition-transform">
                Coming Soon
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
