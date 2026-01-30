// import React from "react";
// import { motion } from "framer-motion";
// import {
//   Cpu,
//   Globe,
//   Zap,
//   Users,
//   Shield,
//   BarChart3,
//   Layers,
//   type LucideIcon,
// } from "lucide-react";

// interface Feature {
//   id: number;
//   title: string;
//   description: string;
//   icon: LucideIcon;
//   span: string;
//   gradient: string;
//   badge: string;
// }

// interface StatItem {
//   value: string;
//   label: string;
// }

// const Features: React.FC = () => {
//   const features: Feature[] = [
//     {
//       id: 1,
//       title: "Deterministic Reasoning",
//       description:
//         "Unlike standard LLMs, our agents follow strict logic gates for critical business decisions, ensuring 0% hallucination rates in financial contexts.",
//       icon: Cpu,
//       span: "md:col-span-2 md:row-span-2",
//       gradient: "from-emerald-500/10 to-transparent",
//       badge: "01 / Logic Core",
//     },
//     {
//       id: 2,
//       title: "Global Mesh Network",
//       description:
//         "Low-latency deployment across 35 regions with 99.99% uptime guaranteed.",
//       icon: Globe,
//       span: "md:col-span-1",
//       gradient: "from-black to-gray-900",
//       badge: "02 / Network",
//     },
//     {
//       id: 3,
//       title: "Real-time Sync",
//       description:
//         "Bi-directional CRM synchronization under 200ms for instant data updates.",
//       icon: Zap,
//       span: "md:col-span-1",
//       gradient: "from-gray-900 to-black",
//       badge: "03 / Speed",
//     },
//     {
//       id: 4,
//       title: "Multi-Agent Orchestration",
//       description:
//         "Deploy specialized agents for research, outreach, and closing that communicate in a private swarm network to close deals faster.",
//       icon: Users,
//       span: "md:col-span-2",
//       gradient: "from-emerald-500/5 to-transparent",
//       badge: "04 / Collaboration",
//     },
//     {
//       id: 5,
//       title: "Enterprise Security",
//       description:
//         "Bank-grade encryption with SOC 2 Type II compliance and data residency options.",
//       icon: Shield,
//       span: "md:col-span-1",
//       gradient: "from-gray-900 to-black",
//       badge: "05 / Security",
//     },
//     {
//       id: 6,
//       title: "Advanced Analytics",
//       description:
//         "Real-time insights with predictive models and conversion optimization.",
//       icon: BarChart3,
//       span: "md:col-span-1",
//       gradient: "from-black to-gray-900",
//       badge: "06 / Analytics",
//     },
//   ];

//   const stats: StatItem[] = [
//     { value: "200ms", label: "Response Time" },
//     { value: "99.99%", label: "Uptime SLA" },
//     { value: "35+", label: "Global Regions" },
//     { value: "0%", label: "Hallucination Rate" },
//   ];

//   return (
//     <section
//       id="features"
//       className="py-32 px-6 bg-black relative overflow-hidden"
//     >
//       {/* Background Elements */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#10b98110_1px,transparent_1px)] bg-[size:32px_32px]" />

//       <div className="max-w-7xl mx-auto relative z-10">
//         {/* Section Header */}
//         <div className="mb-20">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-8 border-b border-emerald-500/20"
//           >
//             <div>
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true }}
//                 className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full mb-6"
//               >
//                 <Layers className="w-4 h-4 text-emerald-400" />
//                 <span className="text-xs font-bold text-emerald-400 tracking-wider">
//                   OPERATIONAL ARCHITECTURE
//                 </span>
//               </motion.div>
//               <h2 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tighter">
//                 ENGINEERED FOR{" "}
//                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
//                   EXCELLENCE
//                 </span>
//               </h2>
//             </div>
//             <p className="text-gray-400 max-w-md text-right">
//               Built on proprietary logic layers that separate reasoning from
//               execution. Consistent. Audit-ready. Scalable.
//             </p>
//           </motion.div>
//         </div>

//         {/* Bento Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
//           {features.map((feature, index) => {
//             const IconComponent = feature.icon;
//             return (
//               <motion.div
//                 key={feature.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 className={`${feature.span} relative group`}
//               >
//                 <div className="h-full bg-gradient-to-br from-gray-900 to-black border border-emerald-500/20 rounded-3xl p-8 overflow-hidden hover:border-emerald-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10">
//                   {/* Background Pattern */}
//                   <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
//                     <div
//                       className={`absolute inset-0 bg-gradient-to-br ${feature.gradient}`}
//                     />
//                     <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98108_1px,transparent_1px),linear-gradient(to_bottom,#10b98108_1px,transparent_1px)] bg-[size:24px_24px]" />
//                   </div>

//                   {/* Icon */}
//                   <motion.div
//                     whileHover={{ scale: 1.1, rotate: 5 }}
//                     className="absolute top-8 right-8 w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-center backdrop-blur-sm"
//                   >
//                     <IconComponent className="w-7 h-7 text-emerald-400" />
//                   </motion.div>

//                   {/* Content */}
//                   <div className="relative z-10 h-full flex flex-col justify-end">
//                     <div className="space-y-4">
//                       <div className="text-xs font-bold text-emerald-400 tracking-widest uppercase">
//                         {feature.badge}
//                       </div>
//                       <h3 className="text-2xl md:text-3xl font-black text-white leading-tight">
//                         {feature.title}
//                       </h3>
//                       <p className="text-gray-400 leading-relaxed">
//                         {feature.description}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Hover Glow Effect */}
//                   <motion.div
//                     className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                     style={{
//                       background:
//                         "radial-gradient(circle at center, rgba(16, 185, 129, 0.1) 0%, transparent 70%)",
//                     }}
//                   />
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>

//         {/* Bottom Stats */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6, delay: 0.3 }}
//           className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 border-t border-emerald-500/20"
//         >
//           {stats.map((stat, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: index * 0.1 }}
//               className="text-center group cursor-pointer"
//             >
//               <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600 mb-2 group-hover:scale-110 transition-transform">
//                 {stat.value}
//               </div>
//               <div className="text-sm text-gray-500 uppercase tracking-wider">
//                 {stat.label}
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default Features;

import React from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  Globe,
  Zap,
  Users,
  Shield,
  BarChart3,
  Layers,
  type LucideIcon,
} from "lucide-react";

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  span: string;
  gradient?: string;
  badge: string;
}

interface StatItem {
  value: string;
  label: string;
}

const Features: React.FC = () => {
  const features: Feature[] = [
    {
      id: 1,
      title: "Deterministic Reasoning",
      description:
        "Unlike standard LLMs, our agents follow strict logic gates for critical business decisions, ensuring 0% hallucination rates in financial contexts.",
      icon: Cpu,
      span: "md:col-span-2 md:row-span-2",
      gradient: "from-emerald-500/10 to-transparent",
      badge: "01 / Logic Core",
    },
    {
      id: 2,
      title: "Global Mesh Network",
      description:
        "Low-latency deployment across 35 regions with 99.99% uptime guaranteed.",
      icon: Globe,
      span: "md:col-span-1",
      //   gradient: "from-black to-gray-900",
      badge: "02 / Network",
    },
    {
      id: 3,
      title: "Real-time Sync",
      description:
        "Bi-directional CRM synchronization under 200ms for instant data updates.",
      icon: Zap,
      span: "md:col-span-1",
      //   gradient: "from-gray-900 to-black",
      badge: "03 / Speed",
    },
    {
      id: 4,
      title: "Multi-Agent Orchestration",
      description:
        "Deploy specialized agents for research, outreach, and closing that communicate in a private swarm network to close deals faster.",
      icon: Users,
      span: "md:col-span-2",
    //   gradient: "from-emerald-500/5 to-transparent",
      badge: "04 / Collaboration",
    },
    {
      id: 5,
      title: "Enterprise Security",
      description:
        "Bank-grade encryption with SOC 2 Type II compliance and data residency options.",
      icon: Shield,
      span: "md:col-span-1",
    //   gradient: "from-gray-900 to-black",
      badge: "05 / Security",
    },
    {
      id: 6,
      title: "Advanced Analytics",
      description:
        "Real-time insights with predictive models and conversion optimization.",
      icon: BarChart3,
      span: "md:col-span-1",
    //   gradient: "from-black to-gray-900",
      badge: "06 / Analytics",
    },
  ];

  const stats: StatItem[] = [
    { value: "200ms", label: "Response Time" },
    { value: "99.99%", label: "Uptime SLA" },
    { value: "35+", label: "Global Regions" },
    { value: "0%", label: "Hallucination Rate" },
  ];

  return (
    <section
      id="features"
      className="py-32 px-6 bg-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#10b98110_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-8 border-b border-emerald-500/20"
          >
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full mb-6"
              >
                <Layers className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-emerald-400 tracking-wider">
                  OPERATIONAL ARCHITECTURE
                </span>
              </motion.div>
              <h2 className="text-5xl md:text-7xl font-black text-black leading-none tracking-tighter">
                ENGINEERED FOR{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
                  EXCELLENCE
                </span>
              </h2>
            </div>
            <p className="text-gray-600 max-w-md text-right">
              Built on proprietary logic layers that separate reasoning from
              execution. Consistent. Audit-ready. Scalable.
            </p>
          </motion.div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${feature.span} relative group`}
              >
                <div className="h-full bg-gradient-to-br from-gray-50 to-white border border-emerald-500/20 rounded-3xl p-8 overflow-hidden hover:border-emerald-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.gradient}`}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98108_1px,transparent_1px),linear-gradient(to_bottom,#10b98108_1px,transparent_1px)] bg-[size:24px_24px]" />
                  </div>

                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="absolute top-8 right-8 w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-center backdrop-blur-sm"
                  >
                    <IconComponent className="w-7 h-7 text-emerald-400" />
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-end">
                    <div className="space-y-4">
                      <div className="text-xs font-bold text-emerald-400 tracking-widest uppercase">
                        {feature.badge}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black text-black leading-tight">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background:
                        "radial-gradient(circle at center, rgba(16, 185, 129, 0.1) 0%, transparent 70%)",
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 border-t border-emerald-500/20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center group cursor-pointer"
            >
              <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600 mb-2 group-hover:scale-110 transition-transform">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
