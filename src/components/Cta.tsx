// import React from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

// const CTA: React.FC = () => {
//   const benefits: string[] = [
//     "Free 14-day trial",
//     "No credit card required",
//     "Cancel anytime",
//     "Enterprise support included",
//   ];

//   return (
//     <section className="py-32 px-6 bg-gradient-to-b from-black via-emerald-950/10 to-black relative overflow-hidden">
//       {/* Background Effects */}
//       <div className="absolute inset-0">
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#10b98120_1px,transparent_1px)] bg-[size:48px_48px]" />
//         <motion.div
//           animate={{
//             scale: [1, 1.2, 1],
//             opacity: [0.2, 0.3, 0.2],
//           }}
//           transition={{
//             duration: 8,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[150px]"
//         />
//       </div>

//       <div className="max-w-4xl mx-auto relative z-10">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-center space-y-8"
//         >
//           {/* Badge */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true }}
//             className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full backdrop-blur-sm"
//           >
//             <Sparkles className="w-4 h-4 text-emerald-400" />
//             <span className="text-sm font-bold text-emerald-400 tracking-wider">
//               JOIN 1,000+ REVENUE TEAMS
//             </span>
//           </motion.div>

//           {/* Heading */}
//           <h2 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter">
//             READY FOR{" "}
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600">
//               DEPLOYMENT?
//             </span>
//           </h2>

//           {/* Description */}
//           <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
//             Join the elite tier of revenue organizations. Integration takes less
//             than 5 minutes with our one-click CRM connectors.
//           </p>

//           {/* Benefits List */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.2 }}
//             className="flex flex-wrap justify-center gap-6 py-8"
//           >
//             {benefits.map((benefit, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, x: -20 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: 0.3 + index * 0.1 }}
//                 className="flex items-center gap-2 text-gray-300"
//               >
//                 <CheckCircle2 className="w-5 h-5 text-emerald-400" />
//                 <span className="text-sm font-medium">{benefit}</span>
//               </motion.div>
//             ))}
//           </motion.div>

//           {/* CTA Buttons */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.4 }}
//             className="flex flex-col sm:flex-row justify-center gap-4 pt-8"
//           >
//             <Link
//               to="/signup"
//               className="group relative px-10 py-5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-black font-bold text-lg rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300"
//             >
//               <span className="relative z-10 flex items-center justify-center gap-2">
//                 START FREE TRIAL
//                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//               </span>
//               <motion.div
//                 className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500"
//                 initial={{ x: "-100%" }}
//                 whileHover={{ x: 0 }}
//                 transition={{ duration: 0.3 }}
//               />
//             </Link>

//             <button className="px-10 py-5 bg-white/5 border-2 border-emerald-500/30 text-white font-bold text-lg rounded-xl hover:bg-white/10 hover:border-emerald-500/50 transition-all backdrop-blur-sm">
//               TALK TO SALES
//             </button>
//           </motion.div>

//           {/* Trust Badge */}
//           <motion.p
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.6 }}
//             className="text-sm text-gray-500 pt-8"
//           >
//             Trusted by leading enterprises • SOC 2 Type II Certified • GDPR
//             Compliant
//           </motion.p>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default CTA;

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

const CTA: React.FC = () => {
  const benefits: string[] = [
    "Free 14-day trial",
    "No credit card required",
    "Cancel anytime",
    "Enterprise support included",
  ];

  return (
    <section className="py-32 px-6 bg-gradient-to-b from-white via-emerald-50/80 to-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#10b98120_1px,transparent_1px)] bg-[size:48px_48px]" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[150px]"
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-bold text-emerald-400 tracking-wider">
              JOIN 1,000+ REVENUE TEAMS
            </span>
          </motion.div>

          {/* Heading */}
          <h2 className="text-5xl md:text-7xl font-black text-black leading-tight tracking-tighter">
            READY FOR{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600">
              DEPLOYMENT?
            </span>
          </h2>

          {/* Description */}
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Join the elite tier of revenue organizations. Integration takes less
            than 5 minutes with our one-click CRM connectors.
          </p>

          {/* Benefits List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-6 py-8"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-2 text-gray-700"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span className="text-sm font-medium">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4 pt-8"
          >
            <Link
              to="/signup"
              className="group relative px-10 py-5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold text-lg rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
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

            <button className="px-10 py-5 bg-black/5 border-2 border-emerald-500/30 text-black font-bold text-lg rounded-xl hover:bg-black/10 hover:border-emerald-500/50 transition-all backdrop-blur-sm">
              TALK TO SALES
            </button>
          </motion.div>

          {/* Trust Badge */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-sm text-gray-500 pt-8"
          >
            Trusted by leading enterprises • SOC 2 Type II Certified • GDPR
            Compliant
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
