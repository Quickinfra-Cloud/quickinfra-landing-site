"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Zap,
  BarChart2,
  RefreshCw,
  Clock,
  Users,
  CheckCircle,
  ChevronRight,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const PARTNER_BENEFITS = [
  {
    icon: "⚡",
    label: "Latest AWS Innovations",
    desc: "Direct access to cutting-edge AWS services before general availability.",
  },
  {
    icon: "⊕",
    label: "Enhanced Support",
    desc: "Priority technical support with direct escalation to AWS engineering.",
  },
  {
    icon: "$",
    label: "Cost-Optimised Solutions",
    desc: "AWS-backed pricing models and right-sizing recommendations built in.",
  },
  {
    icon: "◈",
    label: "Seamless Integration",
    desc: "Native compatibility across the full AWS service catalogue.",
  },
];

const THREE_PILLARS = [
  {
    icon: Shield,
    title: "Security First",
    color: "#ef4444",
    points: [
      "Implement security controls from day one",
      "Continuous compliance monitoring",
      "Automated security patches & updates",
    ],
  },
  {
    icon: Zap,
    title: "Operational Efficiency",
    color: "#3b82f6",
    points: [
      "Streamlined workflows and processes",
      "Reduced manual intervention",
      "Faster time to market",
    ],
  },
  {
    icon: BarChart2,
    title: "Scalability",
    color: "#10b981",
    points: [
      "Future-proof architecture",
      "Flexible resource allocation",
      "Cost-optimised infrastructure",
    ],
  },
];

const SOLUTIONS = [
  {
    title: "DevOps as a Service (DaaS)",
    tag: "DaaS",
    color: "#3b82f6",
    icon: RefreshCw,
    desc: "Transform your development lifecycle. We handle the complexity of DevOps tools so your team focuses on innovation.",
    points: [
      "Automated CI/CD pipeline setup & management",
      "Integration with popular dev tools",
      "Continuous monitoring & optimisation",
      "Built-in security controls & compliance",
    ],
  },
  {
    title: "Infrastructure as Code",
    tag: "IaC",
    color: "#8b5cf6",
    icon: Zap,
    desc: "Turn complex infrastructure provisioning into simple, repeatable code built on AWS-native tools.",
    points: [
      "Template-driven infrastructure deployment",
      "Version-controlled environment management",
      "Automated testing & validation",
      "Cost optimisation through right-sizing",
    ],
  },
  {
    title: "Landing Zone Management",
    tag: "Landing Zone",
    color: "#10b981",
    icon: Shield,
    desc: "Create and maintain secure, scalable AWS environments with a strong foundation from day one.",
    points: [
      "Multi-account AWS environment setup",
      "Standardised security controls",
      "Automated account provisioning",
      "Centralised logging & monitoring",
    ],
  },
];

const WHY_US = [
  {
    icon: "◎",
    title: "AWS Expertise",
    color: "#3b82f6",
    desc: "Multiple AWS certifications, battle-tested methodologies, and deep knowledge across the full AWS ecosystem — from fundamentals to advanced architectures.",
  },
  {
    icon: "✦",
    title: "Proven Track Record",
    color: "#8b5cf6",
    desc: "100+ cloud transformation projects delivered across fintech, healthcare, and e-commerce. Complex microservices, high-availability systems, large-scale data platforms.",
  },
  {
    icon: "◈",
    title: "Customer-Centric",
    color: "#10b981",
    desc: "We start by understanding your unique challenges, not prescribing a template. Customised DevOps strategies that align with your team and evolve with your needs.",
  },
  {
    icon: "⚡",
    title: "Innovation Focus",
    color: "#f59e0b",
    desc: "Dedicated R&D evaluates emerging AWS services continuously. We've pioneered containerisation, serverless, and IaC implementations to future-proof your infra.",
  },
  {
    icon: "⊕",
    title: "24/7 Support",
    color: "#ef4444",
    desc: "Global team. Around-the-clock monitoring and incident response. Average response time under 15 minutes. AI-powered detection before issues impact your business.",
  },
  {
    icon: "⟳",
    title: "DevOps Competency",
    color: "#06b6d4",
    desc: "On the path to AWS DevOps Competency certification — demonstrating the highest standards of technical delivery across CI/CD, automation, and security.",
  },
];

const CASE_STUDIES = [
  {
    name: "Fayredge",
    initial: "F",
    color: "#3b82f6",
    tag: "Fintech · Cloud Migration",
  },
  {
    name: "Brilliant Infotech",
    initial: "B",
    color: "#8b5cf6",
    tag: "IT Services · DevOps Automation",
  },
  {
    name: "Vivelogis",
    initial: "V",
    color: "#10b981",
    tag: "Logistics · Infrastructure IaC",
  },
];

const STATS = [
  { value: "100+", label: "Cloud Projects", color: "#3b82f6" },
  { value: "<15m", label: "Avg Response Time", color: "#10b981" },
  { value: "AWS", label: "Qualified Software", color: "#f59e0b" },
  { value: "24/7", label: "Infrastructure Ops", color: "#8b5cf6" },
];

// ─── AWS Badge component ───────────────────────────────────────────────────────

function AWSBadge({ label, sub }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#f59e0b]/30 bg-[#f59e0b]/5">
      <div className="w-6 h-6 rounded-md bg-[#f59e0b]/20 flex items-center justify-center flex-shrink-0">
        <span className="text-[10px] font-extrabold text-[#f59e0b]">AWS</span>
      </div>
      <div>
        <div className="text-[11px] font-extrabold text-slate-800 dark:text-white">
          {label}
        </div>
        {sub && <div className="text-[9px] text-slate-400 mt-0.5">{sub}</div>}
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function AWSPartnersPage() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [activeSol, setActiveSol] = useState(0);
  const statsRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setStatsVisible(true);
      },
      { threshold: 0.2 },
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  // Auto-cycle solutions tabs
  useEffect(() => {
    const t = setInterval(
      () => setActiveSol((s) => (s + 1) % SOLUTIONS.length),
      4000,
    );
    return () => clearInterval(t);
  }, []);

  const sol = SOLUTIONS[activeSol];

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-60 dark:opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(245,158,11,0.07),transparent)] dark:bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(245,158,11,0.12),transparent)]" />

        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left */}
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-7 border border-[#f59e0b]/30 bg-[#f59e0b]/8"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateY(0)" : "translateY(12px)",
                  transition: "opacity 0.6s ease, transform 0.6s ease",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] animate-pulse" />
                <span className="text-xs font-bold tracking-widest text-[#d97706] dark:text-[#fbbf24] uppercase">
                  AWS Qualified Software
                </span>
              </div>

              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.07] tracking-tight mb-6"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateY(0)" : "translateY(18px)",
                  transition:
                    "opacity 0.65s ease 0.08s, transform 0.65s ease 0.08s",
                }}
              >
                Strategic
                <br />
                <span className="text-[#f59e0b]">AWS Partnership</span>
              </h1>

              <p
                className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-8 max-w-xl"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateY(0)" : "translateY(18px)",
                  transition:
                    "opacity 0.65s ease 0.16s, transform 0.65s ease 0.16s",
                }}
              >
                QuickInfra partners with AWS to deliver cloud solutions that
                transform how organisations build, deploy, and manage
                infrastructure. Deep expertise, certified team, and a proven
                track record across industries.
              </p>

              <div
                className="flex flex-wrap gap-3 mb-10"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateY(0)" : "translateY(18px)",
                  transition:
                    "opacity 0.65s ease 0.24s, transform 0.65s ease 0.24s",
                }}
              >
                <Link
                  href="https://console.quickinfra.cloud/"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-[#f59e0b] hover:bg-[#d97706] text-white shadow-lg shadow-[#f59e0b]/25 transition-all hover:-translate-y-0.5"
                >
                  Start Free Trial <ArrowRight size={15} />
                </Link>
              </div>

              {/* AWS badges row */}
              <div
                className="flex flex-wrap gap-2"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transition: "opacity 0.65s ease 0.32s",
                }}
              >
                <AWSBadge
                  label="Select Tier Partner"
                  sub="AWS Partner Network"
                />
                <AWSBadge label="DevOps Competency" sub="In Progress" />
                <AWSBadge label="ISO/IEC 27001" sub="Certified" />
              </div>
            </div>

            {/* Right — Partnership visual card */}
            <div
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
              }}
            >
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-2xl shadow-slate-200/60 dark:shadow-black/40">
                {/* Card header */}
                <div className="px-6 py-4 bg-gradient-to-r from-[#f59e0b] via-[#d97706] to-[#b45309] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white font-extrabold text-sm">
                      QI
                    </div>
                    <span className="text-white font-bold text-sm">
                      QuickInfra × AWS
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                    </span>
                    <span className="text-[10px] font-bold text-white/80">
                      Active Partner
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  {/* Partnership tiers */}
                  <div className="space-y-2.5 mb-6">
                    {[
                      {
                        label: "Partner Tier",
                        value: "Select",
                        color: "#f59e0b",
                        active: true,
                      },
                      {
                        label: "DevOps Competency",
                        value: "In Certification",
                        color: "#3b82f6",
                        active: false,
                      },
                      {
                        label: "Certifications",
                        value: "Multiple AWS Certs",
                        color: "#10b981",
                        active: true,
                      },
                      {
                        label: "Support Level",
                        value: "Priority + Direct",
                        color: "#8b5cf6",
                        active: true,
                      },
                      {
                        label: "Industries Served",
                        value: "Fintech · Health · Retail",
                        color: "#06b6d4",
                        active: true,
                      },
                    ].map(({ label, value, color, active }) => (
                      <div
                        key={label}
                        className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800 last:border-0"
                      >
                        <span className="text-xs text-slate-400">{label}</span>
                        <div className="flex items-center gap-1.5">
                          {active && (
                            <span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ background: color }}
                            />
                          )}
                          <span className="text-xs font-bold" style={{ color }}>
                            {value}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { n: "100+", label: "Projects", color: "#3b82f6" },
                      { n: "24/7", label: "Support", color: "#10b981" },
                      { n: "<15m", label: "Response", color: "#f59e0b" },
                    ].map(({ n, label, color }) => (
                      <div
                        key={label}
                        className="rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 p-3 text-center"
                      >
                        <div
                          className="text-base font-extrabold"
                          style={{ color }}
                        >
                          {n}
                        </div>
                        <div className="text-[9px] text-slate-400 mt-0.5 font-bold uppercase tracking-wider">
                          {label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────────────── */}
      <section
        ref={statsRef}
        className="border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 py-10 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div
                  className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-1 transition-colors duration-700"
                  style={{ color: statsVisible ? s.color : "#e2e8f0" }}
                >
                  {s.value}
                </div>
                <div className="text-xs font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNER BENEFITS ─────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold tracking-widest uppercase text-[#d97706] dark:text-[#fbbf24] mb-3">
              Partnership Advantage
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Exclusive AWS Partner Benefits
            </h2>
            <p className="text-base text-slate-500 dark:text-slate-400 font-light max-w-2xl mx-auto">
              As an AWS Qualified Software specialising in DevOps excellence,
              QuickInfra delivers transformative cloud solutions with exclusive
              access to resources and expertise unavailable elsewhere.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PARTNER_BENEFITS.map(({ icon, label, desc }, i) => {
              const colors = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"];
              const color = colors[i];
              return (
                <div
                  key={label}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 hover:-translate-y-1 transition-all hover:shadow-lg cursor-default"
                  style={{ "--hc": color }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 text-base font-extrabold"
                    style={{
                      background: color + "15",
                      color,
                      border: `1.5px solid ${color}30`,
                    }}
                  >
                    {icon}
                  </div>
                  <h3 className="text-sm font-extrabold mb-2 tracking-tight">
                    {label}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                    {desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── THREE PILLARS ────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold tracking-widest uppercase text-[#d97706] dark:text-[#fbbf24] mb-3">
              Cloud & DevOps Excellence
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Empowering Your Cloud Journey
            </h2>
            <p className="text-base text-slate-500 dark:text-slate-400 font-light max-w-xl mx-auto">
              Successful cloud adoption demands a strategic approach aligned to
              your business. We guide organisations through three core pillars.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {THREE_PILLARS.map(({ icon: Icon, title, color, points }) => (
              <div
                key={title}
                className="rounded-2xl border bg-white dark:bg-slate-900 p-7 hover:-translate-y-1 transition-all hover:shadow-xl cursor-default overflow-hidden relative"
                style={{ borderColor: color + "30" }}
              >
                <div
                  className="absolute top-0 inset-x-0 h-0.5"
                  style={{
                    background: `linear-gradient(90deg, ${color}, ${color}44)`,
                  }}
                />
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-6"
                  style={{
                    background: color + "15",
                    color,
                    border: `1.5px solid ${color}30`,
                  }}
                >
                  <Icon size={20} />
                </div>
                <h3 className="text-base font-extrabold mb-4 tracking-tight">
                  {title}
                </h3>
                <div className="space-y-2.5">
                  {points.map((pt) => (
                    <div key={pt} className="flex items-start gap-2.5">
                      <div
                        className="w-4 h-4 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: color + "20" }}
                      >
                        <span
                          className="text-[9px] font-extrabold"
                          style={{ color }}
                        >
                          ✓
                        </span>
                      </div>
                      <span className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                        {pt}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED SOLUTIONS ───────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold tracking-widest uppercase text-[#d97706] dark:text-[#fbbf24] mb-3">
              Featured Solutions
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              What We Deliver on AWS
            </h2>
            <p className="text-base text-slate-500 dark:text-slate-400 font-light max-w-lg mx-auto">
              Three battle-tested service offerings — each built on AWS-native
              tools and best practices.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10 items-start">
            {/* Tab selector */}
            <div className="lg:col-span-2 flex flex-col gap-3">
              {SOLUTIONS.map(({ title, tag, color, icon: Icon }, i) => {
                const isActive = activeSol === i;
                return (
                  <button
                    key={title}
                    onClick={() => setActiveSol(i)}
                    className="w-full text-left rounded-2xl border p-4 sm:p-5 transition-all duration-300 focus:outline-none"
                    style={{
                      background: isActive ? color + "0d" : "white",
                      borderColor: isActive ? color + "55" : "#e2e8f0",
                      boxShadow: isActive ? `0 8px 24px ${color}18` : "none",
                      transform: isActive ? "translateX(4px)" : "translateX(0)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                        style={{
                          background: isActive ? color + "18" : "#f1f5f9",
                          color: isActive ? color : "#94a3b8",
                          border: `1.5px solid ${isActive ? color + "35" : "#e2e8f0"}`,
                        }}
                      >
                        <Icon size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div
                          className="text-sm font-extrabold tracking-tight"
                          style={{ color: isActive ? "#0f172a" : "#64748b" }}
                        >
                          {title}
                        </div>
                        <div
                          className="text-[11px] font-medium mt-0.5"
                          style={{ color: isActive ? color : "#94a3b8" }}
                        >
                          {tag}
                        </div>
                      </div>
                      <div
                        className="w-1 h-8 rounded-full flex-shrink-0 transition-all duration-300"
                        style={{ background: isActive ? color : "transparent" }}
                      />
                    </div>
                    {isActive && (
                      <div
                        className="mt-3 h-0.5 rounded-full overflow-hidden"
                        style={{ background: color + "20" }}
                      >
                        <div
                          key={activeSol}
                          className="h-full rounded-full"
                          style={{
                            background: color,
                            animation: "personaProgress 4s linear forwards",
                          }}
                        />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Solution detail card */}
            <div className="lg:col-span-3">
              <div
                className="rounded-2xl border bg-white dark:bg-slate-900 overflow-hidden"
                style={{
                  borderColor: sol.color + "30",
                  boxShadow: `0 20px 48px ${sol.color}12`,
                }}
              >
                <div
                  className="h-1 w-full"
                  style={{
                    background: `linear-gradient(90deg, ${sol.color}, ${sol.color}55)`,
                  }}
                />
                <div className="p-7 sm:p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: sol.color + "15",
                        border: `2px solid ${sol.color}25`,
                        color: sol.color,
                      }}
                    >
                      <sol.icon size={26} />
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold tracking-tight">
                        {sol.title}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: sol.color }}
                        />
                        <span
                          className="text-xs font-semibold"
                          style={{ color: sol.color }}
                        >
                          {sol.tag}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-6">
                    {sol.desc}
                  </p>
                  <div className="space-y-2.5 border-t border-slate-100 dark:border-slate-800 pt-5">
                    {sol.points.map((pt) => (
                      <div key={pt} className="flex items-start gap-3">
                        <div
                          className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: sol.color + "20" }}
                        >
                          <span
                            className="text-[9px] font-extrabold"
                            style={{ color: sol.color }}
                          >
                            ✓
                          </span>
                        </div>
                        <span className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                          {pt}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold tracking-widest uppercase text-[#d97706] dark:text-[#fbbf24] mb-3">
              Why QuickInfra
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Why Choose QuickInfra Cloud?
            </h2>
            <p className="text-base text-slate-500 dark:text-slate-400 font-light max-w-lg mx-auto">
              Six reasons our AWS partnership translates into real business
              outcomes for you.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY_US.map(({ icon, title, color, desc }) => (
              <div
                key={title}
                className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 hover:-translate-y-1 transition-all hover:shadow-lg cursor-default"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 text-base"
                  style={{
                    background: color + "15",
                    color,
                    border: `1.5px solid ${color}30`,
                  }}
                >
                  {icon}
                </div>
                <h3 className="text-sm font-extrabold mb-2 tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES ─────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold tracking-widest uppercase text-[#d97706] dark:text-[#fbbf24] mb-3">
              Client Work
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Case Studies
            </h2>
            <p className="text-base text-slate-500 dark:text-slate-400 font-light max-w-lg mx-auto">
              Real outcomes for real companies — across fintech, IT services,
              and logistics.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {CASE_STUDIES.map(({ name, initial, color, tag }) => (
              <div
                key={name}
                className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-7 hover:-translate-y-1 transition-all hover:shadow-xl cursor-pointer overflow-hidden relative"
              >
                <div
                  className="absolute top-0 inset-x-0 h-0.5"
                  style={{
                    background: `linear-gradient(90deg, ${color}, ${color}44)`,
                  }}
                />
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 text-xl font-extrabold text-white shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${color}, ${color}cc)`,
                    boxShadow: `0 8px 20px ${color}30`,
                  }}
                >
                  {initial}
                </div>
                <h3 className="text-sm font-extrabold mb-1 tracking-tight">
                  {name}
                </h3>
                <p className="text-[11px] text-slate-400 mb-4">{tag}</p>
                <div
                  className="flex items-center gap-1 text-[11px] font-bold"
                  style={{ color }}
                >
                  View Case Study <ChevronRight size={13} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-slate-100 dark:border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(245,158,11,0.06),transparent)] dark:bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(245,158,11,0.1),transparent)]" />
        <div className="relative max-w-2xl mx-auto text-center">
          <p className="text-[10px] font-bold tracking-widest uppercase text-[#d97706] dark:text-[#fbbf24] mb-6">
            Get Started
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-6">
            Ready to accelerate
            <br />
            your cloud journey?
          </h2>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-10">
            Talk to our AWS-certified team today. We'll scope your
            infrastructure, identify quick wins, and map out a roadmap built
            around your business goals.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="https://console.quickinfra.cloud/"
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-[#f59e0b] hover:bg-[#d97706] text-white shadow-lg shadow-[#f59e0b]/25 transition-all hover:-translate-y-0.5"
            >
              Start Free Trial <ArrowRight size={15} />
            </Link>
          </div>
          <p className="mt-6 text-[10px] font-bold tracking-widest uppercase text-slate-300 dark:text-slate-700">
            AWS Qualified Software · ISO/IEC 27001 · SOC 2 Ready
          </p>
        </div>
      </section>
    </div>
  );
}
