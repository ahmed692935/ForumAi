import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  Mail,
  Lock,
  UserPlus,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Shield,
} from "lucide-react";
import { registerUser } from "../api/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

interface OnboardFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const OnboardUser: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<OnboardFormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: any): Promise<void> => {
    e.preventDefault();

    // Validation
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        tenant_id: 1,
        email: formData.email,
        password: formData.password,
      };

      const response = await registerUser(payload);

      // Show success toast
      toast.success(
        `User ${response.user.email} has been successfully onboarded!`,
        {
          position: "top-right",
          autoClose: 3000,
          icon: <CheckCircle className="w-5 h-5" />,
        },
      );

      // Reset form
      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
      });
      navigate("/users-list");
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to onboard user. Please try again.";

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 4000,
        icon: <AlertCircle className="w-5 h-5" />,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: any): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 pt-24 pb-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          {/* <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full mb-4">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-bold text-emerald-600 tracking-wider">
              ADMIN ONLY
            </span>
          </div> */}
          <h1 className="text-4xl font-black text-gray-900 mb-3">
            Onboard New User
          </h1>
          <p className="text-lg text-gray-600">
            Create a new user account for your organization
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
        >
          {/* Card Header */}
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-8 py-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <UserPlus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  User Information
                </h2>
                <p className="text-emerald-100 text-sm">
                  Fill in the details to create a new account
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2"
              >
                <Mail className="w-4 h-4 text-emerald-600" />
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="user@company.com"
              />
              <p className="mt-2 text-xs text-gray-500">
                User will receive login credentials at this email
              </p>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2"
              >
                <Lock className="w-4 h-4 text-emerald-600" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3.5 pr-12 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="••••••••"
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-emerald-600 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              <div className="mt-2 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-600">
                  Password must be at least 8 characters long and include a mix
                  of letters and numbers
                </p>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2"
              >
                <Lock className="w-4 h-4 text-emerald-600" />
                Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="••••••••"
                minLength={8}
              />
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 pt-6">
              {/* Info Box */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6">
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-emerald-900">
                      What happens next?
                    </p>
                    <ul className="text-sm text-emerald-700 space-y-1">
                      <li>• User account will be created immediately</li>
                      <li>• User can log in using the provided credentials</li>
                      <li>• User will have access to the chat interface</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                className="w-full px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold text-lg rounded-xl shadow-lg shadow-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/60 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    Create User Account
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Security Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center text-sm text-gray-500"
        >
          <div className="flex items-center justify-center gap-2">
            <Shield className="w-4 h-4" />
            <span>
              All user data is encrypted and stored securely. Only admins can
              create new users.
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OnboardUser;
