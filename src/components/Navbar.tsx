import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  ChevronRight,
  LogOut,
  MessageCircle,
  Upload,
  FileText,
  User,
  TextSelect,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import Flogo from "../assets/images/flogo.svg";
import PromptEditor from "./Prompt";

interface NavLink {
  name: string;
  href: string;
}

interface UserData {
  id: number;
  tenant_id: number;
  email: string;
  role: string;
  created_at: string;
}

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [isPromptEditorOpen, setIsPromptEditorOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if user is logged in
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");

      if (token && userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (error) {
          console.error("Failed to parse user data:", error);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      }
    };

    checkAuth();

    // Listen for storage changes (in case user logs in/out in another tab)
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".profile-dropdown")) {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);

    toast.success("Logged out successfully", {
      position: "top-right",
      autoClose: 2000,
    });

    navigate("/");
  };

  const navLinks: NavLink[] = [
    { name: "Platform", href: "#platform" },
    { name: "Features", href: "#features" },
  ];

  // Get user initials for avatar
  const getUserInitials = (email: string): string => {
    return email.charAt(0).toUpperCase();
  };

  // Get role-based menu items
  const getRoleMenuItems = () => {
    if (!user) return [];

    if (user.role === "user") {
      return [
        {
          icon: MessageCircle,
          label: "Chat",
          onClick: () => {
            setIsProfileOpen(false);
            setIsMobileMenuOpen(false);
            navigate("/chat");
          },
        },
      ];
    } else if (user.role === "admin") {
      return [
        {
          icon: Upload,
          label: "Knowledge Base",
          onClick: () => {
            setIsProfileOpen(false);
            setIsMobileMenuOpen(false);
            navigate("/knowledge-base");
          },
        },
        {
          icon: FileText,
          label: "Documents List",
          onClick: () => {
            setIsProfileOpen(false);
            setIsMobileMenuOpen(false);
            navigate("/documents");
          },
        },
        {
          icon: User,
          label: "Users",
          onClick: () => {
            setIsProfileOpen(false);
            setIsMobileMenuOpen(false);
            navigate("/users-list");
          },
        },
        {
          icon: TextSelect,
          label: "Prompt",
          onClick: () => {
            setIsProfileOpen(false);
            setIsMobileMenuOpen(false);
            setIsPromptEditorOpen(true);
          },
        },
      ];
    }

    return [];
  };

  const roleMenuItems = getRoleMenuItems();

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-emerald-500/20 shadow-2xl shadow-emerald-500/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <img src={Flogo} alt="Forum" className="w-30" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {/* Platform & Features Links */}
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative px-4 py-2 text-md font-medium text-gray-600 hover:text-black transition-colors group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-600 group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}

              {/* Role-based Navigation Links (if logged in) */}
              {user &&
                roleMenuItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={item.label}
                      onClick={item.onClick}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (navLinks.length + index) * 0.1 }}
                      className="relative px-4 py-2 text-md font-medium text-gray-600 hover:text-black transition-colors group flex items-center gap-2"
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-600 group-hover:w-full transition-all duration-300" />
                    </motion.button>
                  );
                })}
            </div>

            {/* CTA Buttons or Profile */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                // Profile Dropdown
                <div className="relative profile-dropdown">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-emerald-50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                      {getUserInitials(user.email)}
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-semibold text-gray-800">
                        {user.email.split("@")[0]}
                      </div>
                      <div className="text-xs text-gray-500 capitalize">
                        {user.role}
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 text-gray-500 transition-transform ${
                        isProfileOpen ? "rotate-90" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute mt-2 max-w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
                      >
                        {/* User Info */}
                        <div className="px-4 py-3 bg-gradient-to-r from-emerald-50 to-emerald-100 border-b border-emerald-200">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                              {getUserInitials(user.email)}
                            </div>
                            <div>
                              <div className="text-sm font-bold text-gray-800">
                                {user.email}
                              </div>
                              <div className="text-xs text-gray-600 capitalize">
                                {user.role}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="py-2">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            <span className="font-semibold">Logout</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                // Login/Signup Buttons (when not logged in)
                <>
                  <Link
                    to="/login"
                    className="group relative px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold text-sm rounded-lg overflow-hidden hover:shadow-lg hover:shadow-emerald-500/50 transition-all"
                  >
                    <span className="relative z-10">Get Started</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-black hover:text-emerald-600 transition-colors"
              aria-label="Toggle menu"
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
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white/98 backdrop-blur-xl border-t border-emerald-500/20"
            >
              <div className="px-6 py-6 space-y-4">
                {/* Platform & Features */}
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between py-3 text-gray-600 hover:text-black transition-colors border-b border-gray-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="text-lg font-medium">{link.name}</span>
                    <ChevronRight size={20} className="text-emerald-500" />
                  </motion.a>
                ))}

                {user ? (
                  // Mobile Profile Section
                  <div className="pt-6 space-y-3 border-t border-gray-200">
                    {/* User Info */}
                    <div className="flex items-center space-x-3 px-4 py-3 bg-emerald-50 rounded-lg">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {getUserInitials(user.email)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-800">
                          {user.email}
                        </div>
                        <div className="text-xs text-gray-600 capitalize">
                          {user.role}
                        </div>
                      </div>
                    </div>

                    {/* Mobile Menu Items - Role Based */}
                    {roleMenuItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.label}
                          onClick={item.onClick}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-emerald-50 rounded-lg transition-colors"
                        >
                          <Icon className="w-5 h-5 text-emerald-600" />
                          <span className="font-medium">{item.label}</span>
                        </button>
                      );
                    })}

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="font-bold">Logout</span>
                    </button>
                  </div>
                ) : (
                  // Mobile Login/Signup Buttons
                  <div className="pt-6 space-y-3 border-t border-gray-200">
                    <Link
                      to="/login"
                      className="block w-full text-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Prompt Editor Modal */}
      <PromptEditor
        isOpen={isPromptEditorOpen}
        onClose={() => setIsPromptEditorOpen(false)}
      />
    </>
  );
};

export default Navbar;
