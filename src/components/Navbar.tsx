// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Menu, X, ChevronRight } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// interface NavLink {
//   name: string;
//   href: string;
// }

// const Navbar: React.FC = () => {
//   const [isScrolled, setIsScrolled] = useState<boolean>(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

//   useEffect(() => {
//     const handleScroll = (): void => {
//       setIsScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const navLinks: NavLink[] = [
//     { name: "Platform", href: "#platform" },
//     { name: "Features", href: "#features" },
//     { name: "Pricing", href: "#pricing" },
//     { name: "Docs", href: "#docs" },
//   ];

//   return (
//     <motion.nav
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       transition={{ duration: 0.6, ease: "easeOut" }}
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         isScrolled
//           ? "bg-black/95 backdrop-blur-xl border-b border-emerald-500/20 shadow-2xl shadow-emerald-500/5"
//           : "bg-transparent"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-6 lg:px-8">
//         <div className="flex items-center justify-between h-20">
//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-2 group">
//             <motion.div
//               whileHover={{ rotate: 180 }}
//               transition={{ duration: 0.3 }}
//               className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/50"
//             >
//               <span className="text-black font-black text-xl">F</span>
//             </motion.div>
//             <span className="text-2xl font-black text-white tracking-tight">
//               FORUM
//             </span>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-1">
//             {navLinks.map((link, index) => (
//               <motion.a
//                 key={link.name}
//                 href={link.href}
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 className="relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors group"
//               >
//                 {link.name}
//                 <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-600 group-hover:w-full transition-all duration-300" />
//               </motion.a>
//             ))}
//           </div>

//           {/* CTA Buttons */}
//           <div className="hidden md:flex items-center space-x-4">
//             <Link
//               to="/login"
//               className="px-6 py-2.5 text-sm font-semibold text-white hover:text-emerald-400 transition-colors"
//             >
//               Log In
//             </Link>
//             <Link
//               to="/signup"
//               className="group relative px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-black font-semibold text-sm rounded-lg overflow-hidden hover:shadow-lg hover:shadow-emerald-500/50 transition-all"
//             >
//               <span className="relative z-10">Get Started</span>
//               <motion.div
//                 className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500"
//                 initial={{ x: "-100%" }}
//                 whileHover={{ x: 0 }}
//                 transition={{ duration: 0.3 }}
//               />
//             </Link>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             className="md:hidden p-2 text-white hover:text-emerald-400 transition-colors"
//             aria-label="Toggle menu"
//           >
//             {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.3 }}
//             className="md:hidden bg-black/98 backdrop-blur-xl border-t border-emerald-500/20"
//           >
//             <div className="px-6 py-6 space-y-4">
//               {navLinks.map((link, index) => (
//                 <motion.a
//                   key={link.name}
//                   href={link.href}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                   className="flex items-center justify-between py-3 text-gray-300 hover:text-white transition-colors border-b border-gray-800"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   <span className="text-lg font-medium">{link.name}</span>
//                   <ChevronRight size={20} className="text-emerald-500" />
//                 </motion.a>
//               ))}
//               <div className="pt-6 space-y-3">
//                 <Link
//                   to="/login"
//                   className="block w-full text-center px-6 py-3 text-white font-semibold border border-emerald-500/30 rounded-lg hover:bg-emerald-500/10 transition-colors"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   Log In
//                 </Link>
//                 <Link
//                   to="/signup"
//                   className="block w-full text-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   Get Started
//                 </Link>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.nav>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Flogo from "../../src/assets/images/flogo.svg";

interface NavLink {
  name: string;
  href: string;
}

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks: NavLink[] = [
    { name: "Platform", href: "#platform" },
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Docs", href: "#docs" },
  ];

  return (
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
            {/* <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/50"
            >
              <span className="text-black font-black text-xl">F</span>
            </motion.div>
            <span className="text-2xl font-black text-black tracking-tight">
              FORUM
            </span> */}
            <img src={Flogo} alt="Forum" className="w-30" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative px-4 py-2 text-sm font-medium text-gray-600 hover:text-black transition-colors group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-600 group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login"
              className="px-6 py-2.5 text-sm font-semibold text-black hover:text-emerald-600 transition-colors"
            >
              Log In
            </Link>
            <Link
              to="/signup"
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
              <div className="pt-6 space-y-3">
                <Link
                  to="/login"
                  className="block w-full text-center px-6 py-3 text-black font-semibold border border-emerald-500/30 rounded-lg hover:bg-emerald-500/10 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="block w-full text-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
