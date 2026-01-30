// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//   Mail,
//   Lock,
//   User,
//   Building,
//   ArrowRight,
//   Eye,
//   EyeOff,
//   Sparkles,
//   CheckCircle2,
// } from "lucide-react";

// interface SignupFormData {
//   fullName: string;
//   email: string;
//   company: string;
//   password: string;
// }

// const Signup: React.FC = () => {
//   const [showPassword, setShowPassword] = useState<boolean>(false);
//   const [formData, setFormData] = useState<SignupFormData>({
//     fullName: "",
//     email: "",
//     company: "",
//     password: "",
//   });

//   const handleSubmit = (e: any): void => {
//     e.preventDefault();
//     // Handle signup logic here
//     console.log("Signup attempt:", formData);
//   };

//   const handleChange = (e: any): void => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const benefits: string[] = [
//     "Free 14-day trial",
//     "No credit card required",
//     "Setup in 5 minutes",
//     "Cancel anytime",
//   ];

//   return (
//     <div className="min-h-screen bg-black flex items-center justify-center px-6 py-12 relative overflow-hidden">
//       {/* Background Effects */}
//       <div className="absolute inset-0">
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98108_1px,transparent_1px),linear-gradient(to_bottom,#10b98108_1px,transparent_1px)] bg-[size:4rem_4rem]" />
//         <motion.div
//           animate={{
//             scale: [1, 1.2, 1],
//             opacity: [0.3, 0.5, 0.3],
//           }}
//           transition={{
//             duration: 8,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//           className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px]"
//         />
//         <motion.div
//           animate={{
//             scale: [1.2, 1, 1.2],
//             opacity: [0.2, 0.4, 0.2],
//           }}
//           transition={{
//             duration: 10,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//           className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-[120px]"
//         />
//       </div>

//       <div className="relative z-10 w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
//         {/* Left Side - Benefits */}
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.6 }}
//           className="hidden lg:block space-y-8"
//         >
//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-2 group mb-12">
//             <motion.div
//               whileHover={{ rotate: 180 }}
//               transition={{ duration: 0.3 }}
//               className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/50"
//             >
//               <span className="text-black font-black text-3xl">F</span>
//             </motion.div>
//             <span className="text-4xl font-black text-white tracking-tight">
//               FORUM
//             </span>
//           </Link>

//           <div>
//             <h2 className="text-5xl font-black text-white leading-tight mb-4">
//               Join the Future of{" "}
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
//                 Sales Automation
//               </span>
//             </h2>
//             <p className="text-xl text-gray-400 leading-relaxed">
//               Transform your sales process with AI agents that work 24/7 to
//               close more deals.
//             </p>
//           </div>

//           {/* Benefits List */}
//           <div className="space-y-4">
//             {benefits.map((benefit, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.2 + index * 0.1 }}
//                 className="flex items-center gap-3"
//               >
//                 <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
//                   <CheckCircle2 className="w-5 h-5 text-emerald-400" />
//                 </div>
//                 <span className="text-lg text-gray-300 font-medium">
//                   {benefit}
//                 </span>
//               </motion.div>
//             ))}
//           </div>

//           {/* Trust Indicators */}
//           <div className="pt-8 border-t border-emerald-500/20">
//             <p className="text-sm text-gray-500 mb-4">
//               Trusted by 1,000+ companies
//             </p>
//             <div className="flex gap-8 opacity-50">
//               <div className="text-2xl font-black text-white">ACME</div>
//               <div className="text-2xl font-black text-white">TECH</div>
//               <div className="text-2xl font-black text-white">CORP</div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Right Side - Signup Form */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           className="w-full"
//         >
//           {/* Mobile Logo */}
//           <Link
//             to="/"
//             className="flex lg:hidden items-center justify-center space-x-2 mb-8 group"
//           >
//             <motion.div
//               whileHover={{ rotate: 180 }}
//               transition={{ duration: 0.3 }}
//               className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/50"
//             >
//               <span className="text-black font-black text-2xl">F</span>
//             </motion.div>
//             <span className="text-3xl font-black text-white tracking-tight">
//               FORUM
//             </span>
//           </Link>

//           <div className="bg-gradient-to-br from-gray-900 to-black border border-emerald-500/20 rounded-3xl p-8 shadow-2xl shadow-emerald-500/10 backdrop-blur-xl">
//             {/* Header */}
//             <div className="text-center mb-8">
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ delay: 0.3 }}
//                 className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full mb-6"
//               >
//                 <Sparkles className="w-4 h-4 text-emerald-400" />
//                 <span className="text-sm font-bold text-emerald-400 tracking-wider">
//                   START YOUR FREE TRIAL
//                 </span>
//               </motion.div>
//               <h1 className="text-4xl font-black text-white mb-2">
//                 Create Account
//               </h1>
//               <p className="text-gray-400">
//                 Get started with your 14-day free trial
//               </p>
//             </div>

//             {/* Form */}
//             <form onSubmit={handleSubmit} className="space-y-5">
//               {/* Full Name Field */}
//               <div>
//                 <label
//                   htmlFor="fullName"
//                   className="block text-sm font-semibold text-gray-300 mb-2"
//                 >
//                   Full Name
//                 </label>
//                 <div className="relative">
//                   <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
//                   <input
//                     type="text"
//                     id="fullName"
//                     name="fullName"
//                     value={formData.fullName}
//                     onChange={handleChange}
//                     required
//                     className="w-full pl-12 pr-4 py-3.5 bg-black/50 border border-emerald-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:bg-black/70 transition-all"
//                     placeholder="John Doe"
//                   />
//                 </div>
//               </div>

//               {/* Email Field */}
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-semibold text-gray-300 mb-2"
//                 >
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     className="w-full pl-12 pr-4 py-3.5 bg-black/50 border border-emerald-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:bg-black/70 transition-all"
//                     placeholder="you@company.com"
//                   />
//                 </div>
//               </div>

//               {/* Company Field */}
//               <div>
//                 <label
//                   htmlFor="company"
//                   className="block text-sm font-semibold text-gray-300 mb-2"
//                 >
//                   Company Name
//                 </label>
//                 <div className="relative">
//                   <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
//                   <input
//                     type="text"
//                     id="company"
//                     name="company"
//                     value={formData.company}
//                     onChange={handleChange}
//                     required
//                     className="w-full pl-12 pr-4 py-3.5 bg-black/50 border border-emerald-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:bg-black/70 transition-all"
//                     placeholder="Acme Inc."
//                   />
//                 </div>
//               </div>

//               {/* Password Field */}
//               <div>
//                 <label
//                   htmlFor="password"
//                   className="block text-sm font-semibold text-gray-300 mb-2"
//                 >
//                   Password
//                 </label>
//                 <div className="relative">
//                   <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     id="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                     className="w-full pl-12 pr-12 py-3.5 bg-black/50 border border-emerald-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:bg-black/70 transition-all"
//                     placeholder="••••••••"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-emerald-400 transition-colors"
//                   >
//                     {showPassword ? (
//                       <EyeOff className="w-5 h-5" />
//                     ) : (
//                       <Eye className="w-5 h-5" />
//                     )}
//                   </button>
//                 </div>
//                 <p className="mt-2 text-xs text-gray-500">
//                   Must be at least 8 characters
//                 </p>
//               </div>

//               {/* Terms Checkbox */}
//               <label className="flex items-start gap-3 text-sm text-gray-400 cursor-pointer group">
//                 <input
//                   type="checkbox"
//                   required
//                   className="mt-0.5 w-4 h-4 rounded border-emerald-500/30 bg-black/50 text-emerald-500 focus:ring-emerald-500/50"
//                 />
//                 <span className="group-hover:text-white transition-colors">
//                   I agree to the{" "}
//                   <a
//                     href="#"
//                     className="text-emerald-400 hover:text-emerald-300"
//                   >
//                     Terms of Service
//                   </a>{" "}
//                   and{" "}
//                   <a
//                     href="#"
//                     className="text-emerald-400 hover:text-emerald-300"
//                   >
//                     Privacy Policy
//                   </a>
//                 </span>
//               </label>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 className="group relative w-full px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-black font-bold text-lg rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 mt-6"
//               >
//                 <span className="relative z-10 flex items-center justify-center gap-2">
//                   Create Account
//                   <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                 </span>
//                 <motion.div
//                   className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500"
//                   initial={{ x: "-100%" }}
//                   whileHover={{ x: 0 }}
//                   transition={{ duration: 0.3 }}
//                 />
//               </button>
//             </form>

//             {/* Divider */}
//             <div className="relative my-6">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-800" />
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-4 bg-gray-900 text-gray-500">
//                   Or sign up with
//                 </span>
//               </div>
//             </div>

//             {/* Social Signup */}
//             <div className="grid grid-cols-2 gap-4">
//               <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-emerald-500/20 rounded-xl text-white hover:bg-white/10 hover:border-emerald-500/40 transition-all">
//                 <svg
//                   className="w-5 h-5"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                 >
//                   <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
//                   <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
//                   <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
//                   <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
//                 </svg>
//                 <span className="font-semibold text-sm">Google</span>
//               </button>
//               <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-emerald-500/20 rounded-xl text-white hover:bg-white/10 hover:border-emerald-500/40 transition-all">
//                 <svg
//                   className="w-5 h-5"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                 >
//                   <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
//                 </svg>
//                 <span className="font-semibold text-sm">GitHub</span>
//               </button>
//             </div>

//             {/* Login Link */}
//             <p className="mt-6 text-center text-gray-400">
//               Already have an account?{" "}
//               <Link
//                 to="/login"
//                 className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
//               >
//                 Sign in
//               </Link>
//             </p>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Signup;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Flogo from "../assets/images/flogo.svg";
import {
  Mail,
  Lock,
  User,
  //   Building,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

interface SignupFormData {
  fullName: string;
  email: string;
  company: string;
  password: string;
}

const Signup: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<SignupFormData>({
    fullName: "",
    email: "",
    company: "",
    password: "",
  });

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    // Handle signup logic here
    console.log("Signup attempt:", formData);
  };

  const handleChange = (e: any): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const benefits: string[] = [
    "Free 14-day trial",
    "No credit card required",
    "Setup in 5 minutes",
    "Cancel anytime",
  ];

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98108_1px,transparent_1px),linear-gradient(to_bottom,#10b98108_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-[120px]"
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Benefits */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block space-y-8"
        >
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group mb-12">
            {/* <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/50"
            >
              <span className="text-black font-black text-3xl">F</span>
            </motion.div>
            <span className="text-4xl font-black text-black tracking-tight">
              FORUM
            </span> */}
            <img src={Flogo} alt="Forum" className="w-30" />
          </Link>

          <div>
            <h2 className="text-5xl font-black text-black leading-tight mb-4">
              Join the Future of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
                Sales Automation
              </span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Transform your sales process with AI agents that work 24/7 to
              close more deals.
            </p>
          </div>

          {/* Benefits List */}
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="text-lg text-gray-700 font-medium">
                  {benefit}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="pt-8 border-t border-emerald-500/20">
            <p className="text-sm text-gray-500 mb-4">
              Trusted by 1,000+ companies
            </p>
            <div className="flex gap-8 opacity-50">
              <div className="text-2xl font-black text-black">ACME</div>
              <div className="text-2xl font-black text-black">TECH</div>
              <div className="text-2xl font-black text-black">CORP</div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Signup Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full"
        >
          {/* Mobile Logo */}
          <Link
            to="/"
            className="flex lg:hidden items-center justify-center space-x-2 mb-8 group"
          >
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/50"
            >
              <span className="text-black font-black text-2xl">F</span>
            </motion.div>
            <span className="text-3xl font-black text-black tracking-tight">
              FORUM
            </span>
          </Link>

          <div className="bg-gradient-to-br from-gray-50 to-white border border-emerald-500/20 rounded-3xl p-8 shadow-2xl shadow-emerald-500/10 backdrop-blur-xl">
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full mb-6"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-bold text-emerald-400 tracking-wider">
                  START YOUR FREE TRIAL
                </span>
              </motion.div>
              <h1 className="text-4xl font-black text-black mb-2">
                Create Account
              </h1>
              <p className="text-gray-600">
                Get started with your 14-day free trial
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name Field */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  User name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-white/50 border border-emerald-500/20 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:bg-white/70 transition-all"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-white/50 border border-emerald-500/20 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:bg-white/70 transition-all"
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              {/* Company Field */}
              {/* <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Company Name
                </label>
                <div className="relative">
                  <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-white/50 border border-emerald-500/20 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:bg-white/70 transition-all"
                    placeholder="Acme Inc."
                  />
                </div>
              </div> */}

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-12 py-3.5 bg-white/50 border border-emerald-500/20 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:bg-white/70 transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-emerald-400 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Must be at least 8 characters
                </p>
              </div>

              {/* Terms Checkbox */}
              {/* <label className="flex items-start gap-3 text-sm text-gray-600 cursor-pointer group">
                <input
                  type="checkbox"
                  required
                  className="mt-0.5 w-4 h-4 rounded border-emerald-500/30 bg-white/50 text-emerald-500 focus:ring-emerald-500/50"
                />
                <span className="group-hover:text-black transition-colors">
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-emerald-600 hover:text-emerald-700"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-emerald-600 hover:text-emerald-700"
                  >
                    Privacy Policy
                  </a>
                </span>
              </label> */}

              {/* Submit Button */}
              <button
                type="submit"
                className="group relative w-full px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold text-lg rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 mt-6"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Create Account
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </button>
            </form>

            {/* Divider */}
            {/* <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-800" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-50 text-gray-500">
                  Or sign up with
                </span>
              </div>
            </div> */}

            {/* Social Signup */}
            {/* <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 px-4 py-3 bg-black/5 border border-emerald-500/20 rounded-xl text-black hover:bg-black/10 hover:border-emerald-500/40 transition-all">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span className="font-semibold text-sm">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-3 bg-black/5 border border-emerald-500/20 rounded-xl text-black hover:bg-black/10 hover:border-emerald-500/40 transition-all">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                <span className="font-semibold text-sm">GitHub</span>
              </button>
            </div> */}

            {/* Login Link */}
            <p className="mt-6 text-center text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
