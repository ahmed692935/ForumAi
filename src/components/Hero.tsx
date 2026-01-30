// import React from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { ArrowRight, Sparkles, Zap, TrendingUp } from "lucide-react";

// interface Stat {
//   label: string;
//   value: string;
//   icon: React.ComponentType<{ className?: string }>;
// }

// const Hero: React.FC = () => {
//   const stats: Stat[] = [
//     { label: "Active Conversations", value: "10K+", icon: Zap },
//     { label: "Revenue Generated", value: "€5.2M", icon: TrendingUp },
//     { label: "Success Rate", value: "99.8%", icon: Sparkles },
//   ];

//   return (
//     <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
//       {/* Animated Background */}
//       <div className="absolute inset-0">
//         {/* Grid Pattern */}
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98108_1px,transparent_1px),linear-gradient(to_bottom,#10b98108_1px,transparent_1px)] bg-[size:4rem_4rem]" />

//         {/* Gradient Orbs */}
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

//       <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32">
//         <div className="grid lg:grid-cols-2 gap-16 items-center">
//           {/* Left Content */}
//           <div className="space-y-8">
//             {/* Badge */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full backdrop-blur-sm"
//             >
//               <Sparkles className="w-4 h-4 text-emerald-400" />
//               <span className="text-sm font-semibold text-emerald-400 tracking-wide">
//                 AI-POWERED SALES AUTOMATION
//               </span>
//               <div className="flex items-center gap-1">
//                 <span className="relative flex h-2 w-2">
//                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
//                   <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
//                 </span>
//               </div>
//             </motion.div>

//             {/* Heading */}
//             <motion.h1
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.1 }}
//               className="text-6xl lg:text-8xl font-black text-white leading-none tracking-tighter"
//             >
//               CLINICAL{" "}
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600">
//                 PRECISION
//               </span>{" "}
//               IN SALES.
//             </motion.h1>

//             {/* Description */}
//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               className="text-xl text-gray-400 leading-relaxed max-w-2xl"
//             >
//               FORUM engineers high-performance AI agents that handle complex
//               sales conversations with the rigor of Swiss manufacturing.
//               <span className="block mt-2 text-emerald-400 font-semibold">
//                 Close deals faster. Scale infinitely.
//               </span>
//             </motion.p>

//             {/* CTA Buttons */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.3 }}
//               className="flex flex-wrap gap-4"
//             >
//               <Link
//                 to="/signup"
//                 className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-black font-bold rounded-lg overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300"
//               >
//                 <span className="relative z-10 flex items-center gap-2">
//                   START FREE TRIAL
//                   <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                 </span>
//                 <motion.div
//                   className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500"
//                   initial={{ x: "-100%" }}
//                   whileHover={{ x: 0 }}
//                   transition={{ duration: 0.3 }}
//                 />
//               </Link>
//               <button className="px-8 py-4 bg-white/5 border border-emerald-500/30 text-white font-bold rounded-lg hover:bg-white/10 hover:border-emerald-500/50 transition-all backdrop-blur-sm">
//                 VIEW DEMO
//               </button>
//             </motion.div>

//             {/* Stats */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.4 }}
//               className="flex flex-wrap gap-8 pt-8 border-t border-gray-800"
//             >
//               {stats.map((stat, index) => {
//                 const IconComponent = stat.icon;
//                 return (
//                   <div key={index} className="flex items-center gap-3">
//                     <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
//                       <IconComponent className="w-5 h-5 text-emerald-400" />
//                     </div>
//                     <div>
//                       <div className="text-2xl font-black text-white">
//                         {stat.value}
//                       </div>
//                       <div className="text-xs text-gray-500 uppercase tracking-wide">
//                         {stat.label}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </motion.div>
//           </div>

//           {/* Right Content - Interactive Card */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
//             animate={{ opacity: 1, scale: 1, rotateY: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="relative"
//           >
//             {/* Main Card */}
//             <div className="relative bg-gradient-to-br from-gray-900 to-black border border-emerald-500/30 rounded-3xl p-8 shadow-2xl shadow-emerald-500/20">
//               {/* Header */}
//               <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-800">
//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
//                     <Zap className="w-6 h-6 text-black" />
//                   </div>
//                   <div>
//                     <div className="text-lg font-bold text-white">
//                       VERA AI AGENT
//                     </div>
//                     <div className="text-sm text-emerald-400 font-semibold">
//                       Active • v2.4
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex gap-2">
//                   <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
//                   <div className="w-3 h-3 rounded-full bg-gray-700" />
//                   <div className="w-3 h-3 rounded-full bg-gray-700" />
//                 </div>
//               </div>

//               {/* Chat Messages */}
//               <div className="space-y-4 mb-6">
//                 <motion.div
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: 0.6 }}
//                   className="flex gap-3"
//                 >
//                   <div className="w-8 h-8 rounded-full bg-white flex-shrink-0" />
//                   <div className="bg-gray-800 border border-gray-700 p-4 rounded-2xl rounded-tl-none max-w-[80%]">
//                     <p className="text-sm text-gray-300">
//                       Analyze Q3 pipeline velocity and identify bottlenecks in
//                       the enterprise segment.
//                     </p>
//                   </div>
//                 </motion.div>

//                 <motion.div
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: 0.9 }}
//                   className="flex gap-3 flex-row-reverse"
//                 >
//                   <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center flex-shrink-0">
//                     <Zap className="w-4 h-4 text-black" />
//                   </div>
//                   <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl rounded-tr-none max-w-[80%]">
//                     <p className="text-sm text-gray-200 mb-3">
//                       Processing complete. Analysis indicates a 14% drop in
//                       conversion at the "Technical Review" stage.
//                     </p>
//                     <div className="bg-black/50 border border-emerald-500/20 p-3 rounded-lg space-y-2">
//                       <div className="flex justify-between text-xs">
//                         <span className="text-gray-400">Velocity Score</span>
//                         <span className="text-emerald-400 font-bold">
//                           +2.4%
//                         </span>
//                       </div>
//                       <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
//                         <motion.div
//                           initial={{ width: 0 }}
//                           animate={{ width: "72%" }}
//                           transition={{ delay: 1.2, duration: 1 }}
//                           className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </motion.div>

//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 1.4 }}
//                   className="flex gap-2 items-center text-xs text-gray-500 pl-11"
//                 >
//                   <span>Vera is analyzing...</span>
//                   <div className="flex gap-1">
//                     {[0, 1, 2].map((i) => (
//                       <motion.div
//                         key={i}
//                         animate={{ y: [0, -5, 0] }}
//                         transition={{
//                           repeat: Infinity,
//                           duration: 0.6,
//                           delay: i * 0.1,
//                         }}
//                         className="w-1.5 h-1.5 bg-emerald-500 rounded-full"
//                       />
//                     ))}
//                   </div>
//                 </motion.div>
//               </div>
//             </div>

//             {/* Floating Stats Card */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 1.0 }}
//               className="absolute -bottom-6 -left-6 bg-black border border-emerald-500/30 rounded-2xl p-6 shadow-2xl shadow-emerald-500/20 backdrop-blur-xl"
//             >
//               <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
//                 Monthly Revenue
//               </div>
//               <div className="text-3xl font-black text-white mb-2">€142.5K</div>
//               <div className="flex items-center gap-2 text-xs">
//                 <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-1 rounded">
//                   ▲ 12.8%
//                 </span>
//                 <span className="text-gray-500">vs last month</span>
//               </div>
//             </motion.div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, TrendingUp } from "lucide-react";

interface Stat {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}

const Hero: React.FC = () => {
  const stats: Stat[] = [
    { label: "Active Conversations", value: "10K+", icon: Zap },
    { label: "Revenue Generated", value: "€5.2M", icon: TrendingUp },
    { label: "Success Rate", value: "99.8%", icon: Sparkles },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98108_1px,transparent_1px),linear-gradient(to_bottom,#10b98108_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        {/* Gradient Orbs */}
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

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-semibold text-emerald-400 tracking-wide">
                AI-POWERED SALES AUTOMATION
              </span>
              <div className="flex items-center gap-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-6xl lg:text-8xl font-black text-black leading-none tracking-tighter"
            >
              CLINICAL{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600">
                PRECISION
              </span>{" "}
              IN SALES.
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 leading-relaxed max-w-2xl"
            >
              FORUM engineers high-performance AI agents that handle complex
              sales conversations with the rigor of Swiss manufacturing.
              <span className="block mt-2 text-emerald-600 font-semibold">
                Close deals faster. Scale infinitely.
              </span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/signup"
                className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-lg overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  START FREE TRIAL
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
              <button className="px-8 py-4 bg-black/5 border border-emerald-500/30 text-black font-bold rounded-lg hover:bg-black/10 hover:border-emerald-500/50 transition-all backdrop-blur-sm">
                VIEW DEMO
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-8 pt-8 border-t border-gray-800"
            >
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-black">
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Right Content - Interactive Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main Card */}
            <div className="relative bg-gradient-to-br from-gray-50 to-white border border-emerald-500/30 rounded-3xl p-8 shadow-2xl shadow-emerald-500/20">
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-black">
                      VERA AI AGENT
                    </div>
                    <div className="text-sm text-emerald-600 font-semibold">
                      Active • v2.4
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <div className="w-3 h-3 rounded-full bg-gray-700" />
                  <div className="w-3 h-3 rounded-full bg-gray-700" />
                </div>
              </div>

              {/* Chat Messages */}
              <div className="space-y-4 mb-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-black flex-shrink-0" />
                  <div className="bg-gray-100 border border-gray-200 p-4 rounded-2xl rounded-tl-none max-w-[80%]">
                    <p className="text-sm text-gray-700">
                      Analyze Q3 pipeline velocity and identify bottlenecks in
                      the enterprise segment.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                  className="flex gap-3 flex-row-reverse"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl rounded-tr-none max-w-[80%]">
                    <p className="text-sm text-gray-800 mb-3">
                      Processing complete. Analysis indicates a 14% drop in
                      conversion at the "Technical Review" stage.
                    </p>
                    <div className="bg-white/80 border border-emerald-200 p-3 rounded-lg space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Velocity Score</span>
                        <span className="text-emerald-600 font-bold">
                          +2.4%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "72%" }}
                          transition={{ delay: 1.2, duration: 1 }}
                          className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                  className="flex gap-2 items-center text-xs text-gray-500 pl-11"
                >
                  <span>Vera is analyzing...</span>
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.6,
                          delay: i * 0.1,
                        }}
                        className="w-1.5 h-1.5 bg-emerald-500 rounded-full"
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="absolute -bottom-6 -left-6 bg-white border border-emerald-500/30 rounded-2xl p-6 shadow-2xl shadow-emerald-500/20 backdrop-blur-xl"
            >
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                Monthly Revenue
              </div>
              <div className="text-3xl font-black text-black mb-2">€142.5K</div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-1 rounded">
                  ▲ 12.8%
                </span>
                <span className="text-gray-500">vs last month</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
