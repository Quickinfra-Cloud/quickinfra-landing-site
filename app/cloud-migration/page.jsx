"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Cloud,
  Shield,
  Search,
  Layers,
  Database,
  Settings,
  BarChart2,
  RefreshCw,
  Zap,
  Server,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const HERO_STATS = [
  { value: "80%", label: "Time Saved", sub: "On migration", color: "#06b6d4" },
  {
    value: "65%",
    label: "Cost Savings",
    sub: "Infra optimisation",
    color: "#10b981",
  },
  { value: "24/7", label: "Tech Support", sub: "Always on", color: "#3b82f6" },
  {
    value: "Zero",
    label: "Downtime",
    sub: "Migration guarantee",
    color: "#f59e0b",
  },
];

const MIGRATION_PHASES = [
  {
    step: "01",
    title: "Discovery",
    icon: Search,
    color: "#06b6d4",
    desc: "Identify servers, applications, and databases — agent-based or agentless. Build a complete inventory and set a direct path to your cloud foundation.",
    bullets: [
      "Automated asset discovery",
      "Dependency mapping",
      "Migration readiness assessment",
    ],
  },
  {
    step: "02",
    title: "Landing Zone",
    icon: Layers,
    color: "#3b82f6",
    desc: "Deploy a foundational cloud setup rapidly, aligned with best practices for AWS, Azure, GCP, and Oracle Cloud. Secure and scalable from the start.",
    bullets: [
      "Multi-cloud landing zones",
      "Security & governance built in",
      "Instant automated provisioning",
    ],
  },
  {
    step: "03",
    title: "Infrastructure Creation",
    icon: Server,
    color: "#8b5cf6",
    desc: "Select and customise infrastructure templates from a vast library. Auto-generate IaC for a streamlined, precise cloud environment build-out.",
    bullets: [
      "Template-driven IaC generation",
      "Terraform & Ansible scripts",
      "Environment versioning",
    ],
  },
  {
    step: "04",
    title: "App & Data Migration",
    icon: Database,
    color: "#10b981",
    desc: "Move applications and data with ease using migration templates that minimise operational impact — including migrations across private networks.",
    bullets: [
      "Zero-downtime migration",
      "Private network support",
      "Data integrity validation",
    ],
  },
  {
    step: "05",
    title: "Infrastructure Management",
    icon: Settings,
    color: "#f59e0b",
    desc: "Command your cloud with management tools for effortless oversight of networks, instances, and backups — reducing operational load and complexity.",
    bullets: [
      "Unified management dashboard",
      "Automated backup & recovery",
      "Cost monitoring & alerts",
    ],
  },
];

const CLOUD_PROVIDERS = [
  { name: "AWS", color: "#f59e0b", tag: "Primary Partner" },
  { name: "Azure", color: "#3b82f6", tag: "Full Support" },
  { name: "GCP", color: "#10b981", tag: "Full Support" },
  { name: "OCI", color: "#ef4444", tag: "Oracle Cloud" },
];

const ACCELERATORS = [
  {
    icon: Cloud,
    title: "Multi-Cloud Migration",
    color: "#06b6d4",
    desc: "Transition to any cloud platform effortlessly. AWS, Azure, GCP, and Oracle Cloud — fully automated migration to whichever you choose.",
  },
  {
    icon: Shield,
    title: "Stay Compliant & Secure",
    color: "#3b82f6",
    desc: "Policy-compliant templates keep your cloud configs secure and conformant with governance standards. Compliance checks simplified.",
  },
  {
    icon: RefreshCw,
    title: "All Migration Strategies",
    color: "#8b5cf6",
    desc: "Rehosting, replatforming, refactoring, or rearchitecting — we support all transition methodologies without locking you in.",
  },
  {
    icon: Settings,
    title: "Effortless Infra Management",
    color: "#10b981",
    desc: "Beyond migration, manage your cloud with QuickInfra's web-based interface that simplifies ongoing operations and governance.",
  },
  {
    icon: Zap,
    title: "Custom Scripting Simplified",
    color: "#f59e0b",
    desc: "Generate and customise Terraform, Ansible, and Python scripts effortlessly — a smooth support system for all your cloud resources.",
  },
  {
    icon: Layers,
    title: "Zero Hassle Landing Zones",
    color: "#ef4444",
    desc: "Instantly establish landing zones with automation — secure, compliant cloud spaces for any provider, up in minutes.",
  },
];

const END_TO_END = [
  {
    icon: Search,
    title: "Cloud Consultation",
    color: "#06b6d4",
    desc: "Navigate your cloud journey with expert guidance. Strategic planning that evaluates your needs to craft the perfect cloud roadmap — before a single resource is touched.",
  },
  {
    icon: Cloud,
    title: "Migration",
    color: "#3b82f6",
    desc: "Seamless cloud transitions for applications and data, designed for minimal business interruption. Strategic planning and testing ensure a flawless move.",
  },
  {
    icon: BarChart2,
    title: "Managed Support",
    color: "#10b981",
    desc: "Round-the-clock monitoring and swift issue resolution. Your cloud infrastructure stays secure, optimised, and performing at peak so you focus on business.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "What used to take our team months took a matter of weeks. The migration automation is unlike anything we've used before.",
    company: "Netsoftmate IT Solutions",
    role: "Managing Director",
    initial: "N",
    color: "#06b6d4",
  },
  {
    quote:
      "We saved 70% on infrastructure management costs after migrating with QuickInfra. The ROI was clear within the first month.",
    company: "SalesGarners Marketing",
    role: "IT Manager",
    initial: "S",
    color: "#3b82f6",
  },
  {
    quote:
      "Zero downtime during our entire migration. The team was stunned — we expected at least a weekend of disruption.",
    company: "CloudAge",
    role: "Director",
    initial: "C",
    color: "#10b981",
  },
];

// ─── Migration Journey Widget ──────────────────────────────────────────────────

const JOURNEY_STEPS = [
  { label: "On-Premise", icon: Server, color: "#64748b", done: true },
  { label: "Discovery", icon: Search, color: "#06b6d4", done: true },
  { label: "Landing Zone", icon: Layers, color: "#3b82f6", done: true },
  { label: "IaC Generation", icon: Zap, color: "#8b5cf6", active: true },
  { label: "Migration", icon: Cloud, color: "#10b981", done: false },
  { label: "Cloud Native", icon: Settings, color: "#f59e0b", done: false },
];

function MigrationWidget() {
  const [mounted, setMounted] = useState(false);
  const [activeStep, setActiveStep] = useState(3);
  const [progresses, setProgresses] = useState({});
  const timersRef = useRef([]);

  const addTimer = (fn, ms) => {
    const id = setTimeout(fn, ms);
    timersRef.current.push(id);
    return id;
  };

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 120);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    let step = 3;

    const runStep = (s) => {
      setActiveStep(s);
      setProgresses((p) => ({ ...p, [s]: 0 }));
      let pct = 0;
      const iv = setInterval(() => {
        pct += 3;
        setProgresses((p) => ({ ...p, [s]: Math.min(pct, 100) }));
        if (pct >= 100) {
          clearInterval(iv);
          const next = s < JOURNEY_STEPS.length - 1 ? s + 1 : 0;
          addTimer(() => runStep(next), 600);
        }
      }, 35);
      timersRef.current.push(iv);
    };

    addTimer(() => runStep(step), 800);
    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, [mounted]);

  const logs = [
    {
      text: "Scanning existing infrastructure...",
      color: "#67e8f9",
      done: true,
    },
    { text: "Generating Terraform templates", color: "#67e8f9", done: true },
    { text: "Creating VPC & subnet layout", color: "#a5f3fc", done: true },
    { text: "Provisioning security groups", color: "#a5f3fc", active: true },
    { text: "Deploying RDS instance...", color: "#94a3b8", done: false },
    { text: "Migrating application data...", color: "#94a3b8", done: false },
  ];

  return (
    <div
      style={{
        height: 520,
        width: "100%",
        opacity: mounted ? 1 : 0,
        transform: mounted
          ? "translateY(0) scale(1)"
          : "translateY(28px) scale(0.97)",
        transition:
          "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
        willChange: "opacity, transform",
      }}
    >
      <div
        className="h-full"
        style={{
          animation: "float 5s ease-in-out infinite",
          willChange: "transform",
        }}
      >
        <div className="h-full flex flex-col rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-900 shadow-2xl shadow-cyan-500/10 dark:shadow-black/50">
          {/* Header */}
          <div className="flex-shrink-0 flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-cyan-600 via-cyan-600 to-teal-600">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
              </span>
              <span className="text-sm font-bold text-white tracking-tight">
                Migration in Progress
              </span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-white/15 text-[10px] font-bold text-white border border-white/20">
              ap-south-1 · AWS
            </span>
          </div>

          {/* Journey progress */}
          <div className="flex-shrink-0 px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900">
            <p className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 mb-2.5">
              Migration Journey
            </p>
            <div className="flex items-center gap-1">
              {JOURNEY_STEPS.map((s, i) => {
                const Icon = s.icon;
                const isActive = i === activeStep;
                const isDone = i < activeStep || progresses[i] === 100;
                return (
                  <div
                    key={s.label}
                    className="flex items-center flex-1 min-w-0"
                  >
                    <div className="flex flex-col items-center flex-1 min-w-0">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-400 text-[10px]"
                        style={{
                          background: isActive
                            ? s.color + "20"
                            : isDone
                              ? "#10b98115"
                              : "#f1f5f9",
                          color: isActive
                            ? s.color
                            : isDone
                              ? "#10b981"
                              : "#94a3b8",
                          border: `1.5px solid ${isActive ? s.color + "50" : isDone ? "#10b98130" : "#e2e8f0"}`,
                          transform: isActive ? "scale(1.15)" : "scale(1)",
                        }}
                      >
                        {isDone ? "✓" : <Icon size={11} />}
                      </div>
                      <span
                        className="text-[8px] font-bold mt-1 text-center truncate w-full px-0.5"
                        style={{
                          color: isActive
                            ? s.color
                            : isDone
                              ? "#10b981"
                              : "#94a3b8",
                        }}
                      >
                        {s.label}
                      </span>
                    </div>
                    {i < JOURNEY_STEPS.length - 1 && (
                      <div
                        className="h-px flex-1 mx-1 mb-4 rounded-full"
                        style={{
                          background: i < activeStep ? "#10b981" : "#e2e8f0",
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
            {/* Active step progress bar */}
            <div className="mt-2 h-1 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-100"
                style={{
                  width: `${progresses[activeStep] || 0}%`,
                  background: JOURNEY_STEPS[activeStep]?.color || "#06b6d4",
                }}
              />
            </div>
          </div>

          {/* Log output */}
          <div className="flex-1 bg-[#0d1117] px-4 py-3 font-mono overflow-hidden">
            <p className="text-[9px] font-extrabold uppercase tracking-widest text-slate-600 mb-2.5">
              Activity Log
            </p>
            <div className="flex flex-col gap-1.5">
              {logs.map(({ text, color, done, active }, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <span className="text-[9px] w-5 flex-shrink-0 text-slate-700 text-right">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="text-[10.5px]"
                    style={{
                      color: done ? color : active ? "#fbbf24" : "#334155",
                      fontWeight: active ? 700 : 400,
                    }}
                  >
                    {active && <span style={{ color: "#fbbf24" }}>▶ </span>}
                    {done && <span style={{ color: "#10b981" }}>✓ </span>}
                    {text}
                  </span>
                  {active && (
                    <span
                      className="inline-block w-1.5 h-3 bg-yellow-400 ml-0.5"
                      style={{ animation: "dashBlink 1s step-end infinite" }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Stats footer */}
          <div className="flex-shrink-0 border-t border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60">
            <div className="grid grid-cols-3 divide-x divide-slate-200 dark:divide-slate-800">
              {[
                { label: "Resources", value: "47", color: "#06b6d4" },
                { label: "Migrated", value: "31", color: "#10b981" },
                { label: "Time Saved", value: "80%", color: "#f59e0b" },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex flex-col items-center py-3">
                  <span
                    className="text-base font-extrabold leading-none"
                    style={{ color }}
                  >
                    {value}
                  </span>
                  <span className="text-[9px] font-bold text-slate-500 dark:text-slate-600 mt-1 uppercase tracking-widest">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CloudMigrationPage() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [activePhase, setActivePhase] = useState(0);
  const [phaseVisible, setPhaseVisible] = useState(true);
  const statsRef = useRef(null);
  const cycleRef = useRef(null);

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

  const startCycle = () => {
    if (cycleRef.current) clearInterval(cycleRef.current);
    cycleRef.current = setInterval(() => {
      setPhaseVisible(false);
      setTimeout(() => {
        setActivePhase((p) => (p + 1) % MIGRATION_PHASES.length);
        setPhaseVisible(true);
      }, 280);
    }, 4500);
  };

  useEffect(() => {
    startCycle();
    return () => clearInterval(cycleRef.current);
  }, []);

  const switchPhase = (i) => {
    if (i === activePhase) return;
    setPhaseVisible(false);
    setTimeout(() => {
      setActivePhase(i);
      setPhaseVisible(true);
    }, 280);
    startCycle();
  };

  const phase = MIGRATION_PHASES[activePhase];

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[88vh] flex items-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-60 dark:opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(6,182,212,0.08),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(6,182,212,0.15),transparent)]" />

        <div className="relative max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-7 border border-cyan-200 dark:border-cyan-500/30 bg-cyan-50 dark:bg-cyan-500/10"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateY(0)" : "translateY(12px)",
                  transition: "opacity 0.6s ease, transform 0.6s ease",
                }}
              >
                <Cloud size={11} className="text-cyan-600 dark:text-cyan-400" />
                <span className="text-xs font-bold tracking-widest text-cyan-600 dark:text-cyan-400 uppercase">
                  Automated Cloud Migration
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
                Move to cloud.
                <br />
                <span className="text-cyan-600 dark:text-cyan-400">
                  Without the chaos.
                </span>
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
                QuickInfra fast-tracks cloud migration with expert-managed
                automation — delivering cost savings and a clear ROI. A swift,
                secure transition so you stay focused on business growth, not
                infrastructure.
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
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-600/25 hover:shadow-cyan-600/40 transition-all hover:-translate-y-0.5"
                >
                  Start Free Trial <ArrowRight size={15} />
                </Link>
              </div>

              <div
                className="flex flex-wrap gap-6"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transition: "opacity 0.65s ease 0.32s",
                }}
              >
                {[
                  ["AWS", "Qualified Software"],
                  ["ISO/IEC 27001", "Certified"],
                  ["Zero", "Downtime Migration"],
                ].map(([v, l]) => (
                  <div key={l}>
                    <div className="text-xs font-extrabold text-cyan-600 dark:text-cyan-400">
                      {v}
                    </div>
                    <div className="text-xs text-slate-400 dark:text-slate-600 mt-0.5">
                      {l}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <MigrationWidget />
          </div>
        </div>
      </section>

      {/* ── HERO STATS ───────────────────────────────────────────────────── */}
      <section
        ref={statsRef}
        className="border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 py-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {HERO_STATS.map(({ value, label, sub, color }) => (
              <div key={label} className="text-center">
                <div
                  className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-1 transition-colors duration-700"
                  style={{ color: statsVisible ? color : "#e2e8f0" }}
                >
                  {value}
                </div>
                <div className="text-sm font-bold mb-0.5">{label}</div>
                <div className="text-xs text-slate-400 font-light">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MIGRATION PHASES ─────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 mb-3">
              Migration Process
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              One-Stop Solution for All Cloud Ops
            </h2>
            <p className="text-base text-slate-500 dark:text-slate-400 font-light max-w-lg mx-auto">
              Five structured phases — from the first inventory scan to ongoing
              cloud management — fully automated.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start">
            {/* Phase tabs */}
            <div className="lg:col-span-2 flex flex-col gap-2.5">
              {MIGRATION_PHASES.map(({ step, title, icon: Icon, color }, i) => {
                const isActive = activePhase === i;
                return (
                  <button
                    key={step}
                    onClick={() => switchPhase(i)}
                    className="w-full text-left rounded-2xl border p-4 transition-all duration-300 focus:outline-none"
                    style={{
                      background: isActive ? color + "0d" : "white",
                      borderColor: isActive ? color + "55" : "#e2e8f0",
                      boxShadow: isActive ? `0 8px 24px ${color}18` : "none",
                      transform: isActive ? "translateX(4px)" : "translateX(0)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                        style={{
                          background: isActive ? color + "18" : "#f1f5f9",
                          color: isActive ? color : "#94a3b8",
                          border: `1.5px solid ${isActive ? color + "35" : "#e2e8f0"}`,
                        }}
                      >
                        <Icon size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div
                          className="text-[10px] font-extrabold uppercase tracking-widest mb-0.5"
                          style={{ color: isActive ? color : "#94a3b8" }}
                        >
                          Phase {step}
                        </div>
                        <div
                          className="text-sm font-extrabold tracking-tight"
                          style={{ color: isActive ? "#0f172a" : "#64748b" }}
                        >
                          {title}
                        </div>
                      </div>
                      <div
                        className="w-1 h-7 rounded-full flex-shrink-0 transition-all duration-300"
                        style={{ background: isActive ? color : "transparent" }}
                      />
                    </div>
                    {isActive && (
                      <div
                        className="mt-3 h-0.5 rounded-full overflow-hidden"
                        style={{ background: color + "20" }}
                      >
                        <div
                          key={activePhase}
                          className="h-full rounded-full"
                          style={{
                            background: color,
                            animation: "personaProgress 4.5s linear forwards",
                          }}
                        />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Phase detail card */}
            <div className="lg:col-span-3">
              <div
                className="rounded-2xl border bg-white dark:bg-slate-900 overflow-hidden"
                style={{
                  borderColor: phase.color + "30",
                  boxShadow: `0 20px 48px ${phase.color}12`,
                  opacity: phaseVisible ? 1 : 0,
                  transform: phaseVisible
                    ? "translateY(0) scale(1)"
                    : "translateY(12px) scale(0.985)",
                  transition:
                    "opacity 0.32s cubic-bezier(0.16,1,0.3,1), transform 0.32s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                <div
                  className="h-1 w-full"
                  style={{
                    background: `linear-gradient(90deg, ${phase.color}, ${phase.color}55)`,
                  }}
                />
                <div className="p-7 sm:p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: phase.color + "15",
                        border: `2px solid ${phase.color}25`,
                        color: phase.color,
                      }}
                    >
                      <phase.icon size={26} />
                    </div>
                    <div>
                      <div
                        className="text-[10px] font-extrabold uppercase tracking-widest mb-1"
                        style={{ color: phase.color }}
                      >
                        Phase {phase.step}
                      </div>
                      <h3 className="text-xl font-extrabold tracking-tight">
                        {phase.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-6">
                    {phase.desc}
                  </p>
                  <div className="space-y-2.5 border-t border-slate-100 dark:border-slate-800 pt-5">
                    {phase.bullets.map((b) => (
                      <div key={b} className="flex items-center gap-3">
                        <div
                          className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0"
                          style={{ background: phase.color + "20" }}
                        >
                          <span
                            className="text-[9px] font-extrabold"
                            style={{ color: phase.color }}
                          >
                            ✓
                          </span>
                        </div>
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          {b}
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

      {/* ── CLOUD PROVIDERS ──────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[10px] font-bold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 mb-3">
              Collaborative Excellence
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Migrate to Any Cloud
            </h2>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            {CLOUD_PROVIDERS.map(({ name, color, tag }) => (
              <div
                key={name}
                className="flex items-center gap-3 px-6 py-4 rounded-2xl border bg-white dark:bg-slate-900 hover:-translate-y-1 transition-all hover:shadow-lg cursor-default"
                style={{ borderColor: color + "30" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-sm"
                  style={{
                    background: color + "15",
                    color,
                    border: `1.5px solid ${color}30`,
                  }}
                >
                  {name.slice(0, 2)}
                </div>
                <div>
                  <div className="text-sm font-extrabold">{name}</div>
                  {/* <div className="text-[10px] text-slate-400 mt-0.5">{tag}</div> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MIGRATION ACCELERATORS ───────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 mb-3">
              Capabilities
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Accelerate Migration to Any Cloud
            </h2>
            <p className="text-base text-slate-500 dark:text-slate-400 font-light max-w-lg mx-auto">
              Six platform capabilities that make cloud migration faster, safer,
              and cheaper than any manual approach.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ACCELERATORS.map(({ icon: Icon, title, color, desc }) => (
              <div
                key={title}
                className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 hover:-translate-y-1 transition-all hover:shadow-lg cursor-default"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: color + "15",
                      color,
                      border: `1.5px solid ${color}30`,
                    }}
                  >
                    <Icon size={18} />
                  </div>
                </div>
                <h3 className="text-sm font-extrabold mb-2.5 leading-snug tracking-tight group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
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

      {/* ── END TO END SERVICES ──────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 mb-3">
              End-to-End
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Complete Cloud Services
            </h2>
            <p className="text-base text-slate-500 dark:text-slate-400 font-light max-w-lg mx-auto">
              From the first conversation to long-term managed support — we're
              with you at every step.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {END_TO_END.map(({ icon: Icon, title, color, desc }) => (
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
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                  style={{
                    background: color + "15",
                    color,
                    border: `2px solid ${color}25`,
                  }}
                >
                  <Icon size={22} />
                </div>
                <h3 className="text-base font-extrabold mb-3 tracking-tight">
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

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 mb-3">
              Customer Stories
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Migrations That Went Smoothly
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map(({ quote, company, role, initial, color }) => (
              <div
                key={company}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-7 flex flex-col gap-5 relative overflow-hidden"
              >
                <div
                  className="absolute top-0 inset-x-0 h-0.5"
                  style={{
                    background: `linear-gradient(90deg, ${color}, ${color}44)`,
                  }}
                />
                <div className="text-3xl font-serif text-slate-100 dark:text-slate-800 leading-none">
                  "
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light flex-1">
                  {quote}
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white font-extrabold text-sm"
                    style={{
                      background: `linear-gradient(135deg, ${color}, ${color}cc)`,
                    }}
                  >
                    {initial}
                  </div>
                  <div>
                    <div className="text-sm font-bold">{company}</div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                      {role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-slate-100 dark:border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(6,182,212,0.07),transparent)] dark:bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(6,182,212,0.12),transparent)]" />
        <div className="relative max-w-2xl mx-auto text-center">
          <p className="text-[10px] font-bold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 mb-6">
            Get Started
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-6">
            Ready to level up with
            <br />
            automated cloud migration?
          </h2>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-10">
            Schedule a demo and our team will map out your migration plan,
            estimate cost savings, and show you exactly how QuickInfra moves
            your infra to cloud — without the chaos.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="https://console.quickinfra.cloud/"
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-600/25 hover:shadow-cyan-600/40 transition-all hover:-translate-y-0.5"
            >
              Start Free Trial <ArrowRight size={15} />
            </Link>
          </div>
          <p className="mt-6 text-[10px] font-bold tracking-widest uppercase text-slate-300 dark:text-slate-700">
            ISO/IEC 27001 · AWS Qualified Software · Zero Downtime Guaranteed
          </p>
        </div>
      </section>
    </div>
  );
}
