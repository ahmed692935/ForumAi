import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Twitter,
  Linkedin,
  Github,
  Mail,
  ArrowUpRight,
  Zap,
  type LucideIcon,
} from "lucide-react";

interface FooterLink {
  name: string;
  href: string;
}

interface FooterSection {
  [key: string]: FooterLink[];
}

interface SocialLink {
  icon: LucideIcon;
  href: string;
  label: string;
}

const Footer: React.FC = () => {
  const footerLinks: FooterSection = {
    Product: [
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#pricing" },
      { name: "Integration", href: "#integration" },
      { name: "API Docs", href: "#docs" },
    ],
    Company: [
      { name: "About", href: "#about" },
      { name: "Blog", href: "#blog" },
      { name: "Careers", href: "#careers" },
      { name: "Contact", href: "#contact" },
    ],
    Legal: [
      { name: "Privacy", href: "#privacy" },
      { name: "Terms", href: "#terms" },
      { name: "Security", href: "#security" },
      { name: "Compliance", href: "#compliance" },
    ],
  };

  const socialLinks: SocialLink[] = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  return (
    <footer className="bg-black border-t border-emerald-500/20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98105_1px,transparent_1px),linear-gradient(to_bottom,#10b98105_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center space-x-2 group">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
                className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/50"
              >
                <span className="text-black font-black text-2xl">F</span>
              </motion.div>
              <span className="text-3xl font-black text-white tracking-tight">
                FORUM
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed max-w-xs">
              Engineering high-performance AI agents for the future of sales
              automation.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center justify-center text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all"
                    aria-label={social.label}
                  >
                    <IconComponent className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Link Sections */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <div key={category} className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link, linkIndex) => (
                  <motion.li
                    key={linkIndex}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + linkIndex * 0.05 }}
                  >
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-emerald-400 transition-colors inline-flex items-center gap-1 group"
                    >
                      <span>{link.name}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-8 border-t border-b border-emerald-500/20 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center justify-center md:justify-start gap-2">
                <Zap className="w-5 h-5 text-emerald-400" />
                Stay Updated
              </h3>
              <p className="text-gray-400 text-sm">
                Get the latest updates on AI sales automation
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-3 bg-white/5 border border-emerald-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all backdrop-blur-sm"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© 2026 Forum Systems Inc. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-emerald-400 font-semibold">
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
