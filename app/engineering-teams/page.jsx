"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight, Users, Zap, Shield, Code2,
  GitBranch, Layers, RefreshCw, BarChart2, Terminal,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const FOR_YOU_IF = [
  {
    icon: "⊠",
    title: "No More IaC Hassles",
    color: "#8b5cf6",
    desc: "Stop making developers master Terraform, Ansible, or CloudFormation. QuickInfra auto-generates all IaC so your team stays focused on app code.",
  },
  {
    icon: "◈",
    title: "End Team Dependencies",
    color: "#3b82f6",
    desc: "Remove the constant back-and-forth with DevOps. Engineering teams provision and deploy independently — no tickets, no waiting, no blockers.",
  },
  {
    icon: "⚡",
    title: "Boost Dev Efficiency",
    color: "#10b981",
    desc: "Automation liberates developers from repetitive cloud migration tasks. More time building features, zero time wrangling infra pipelines.",
  },
];

const WHY_QUICKINFRA = [
  {
    icon: Terminal,
    title: "Simplify DevOps",
    tag: "Automation",
    color: "#8b5cf6",
    desc: "Complex DevOps processes automated end-to-end. Seamless app deployment on cloud without the DevOps headache — for every developer on your team.",
  },
  {
    icon: Code2,
    title: "Eliminate IaC Learning Curve",
    tag: "IaC Generation",
    color: "#3b82f6",
    desc: "QuickInfra generates the IaC scripts for you. Your team never needs to master Terraform syntax — focus on the product, not the plumbing.",
  },
  {
    icon: Layers,
    title: "Add Cloud Edge to Your Team",
    tag: "Upskilling",
    color: "#06b6d4",
    desc: "Developers can customise auto-generated IaC code to learn and enhance their cloud skills — making your team more versatile without a full course.",
  },
  {
    icon: Zap,
    title: "Accelerate Final Deployment",
    tag: "Speed",
    color: "#f59e0b",
    desc: "Minimise cloud deployment and migration effort through automation. Focus more on core product development and get to launch faster.",
  },
  {
    icon: Shield,
    title: "Stay Secure & Compliant",
    tag: "DevSecOps",
    color: "#ef4444",
    desc: "Security, compliance, and governance built into every deployment. SOC 2, HIPAA, PCI-DSS — handled for you so your team ships with confidence.",
  },
  {
    icon: BarChart2,
    title: "Cost-Efficient Cloud",
    tag: "FinOps",
    color: "#10b981",
    desc: "Automation and intelligent infrastructure management significantly reduce operational costs — making the most of your cloud budget.",
  },
];

const METRICS = [
  { before: "1x",     after: "4x",       label: "Dev productivity",   color: "#8b5cf6" },
  { before: "Weekly", after: "Daily",     label: "Deploy frequency",   color: "#3b82f6" },
  { before: "Days",   after: "Minutes",   label: "Infra provisioning", color: "#10b981" },
  { before: "40%",    after: "0%",        label: "Sprint time on ops", color: "#f59e0b" },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Connect Your Repo",         color: "#8b5cf6", desc: "Link your GitHub, GitLab, or Bitbucket repo. QuickInfra reads your app stack and proposes the right infra layout automatically." },
  { step: "02", title: "Auto-Generate IaC",         color: "#3b82f6", desc: "Terraform, Ansible configs generated for your stack. Review, customise, or ship as-is — your call, no syntax expertise needed." },
  { step: "03", title: "One-Click CI/CD",           color: "#06b6d4", desc: "Pipelines wired up and running. PRs trigger automated builds, tests, and deploys to staging and production without YAML wrestling." },
  { step: "04", title: "Monitor & Iterate",         color: "#10b981", desc: "Real-time observability, cost tracking, and drift detection. Your infra self-heals while your team ships the next feature." },
];

const CAPABILITIES = [
  { label: "Auto IaC generation",         icon: Code2,     color: "#8b5cf6" },
  { label: "One-click CI/CD pipelines",   icon: GitBranch, color: "#3b82f6" },
  { label: "Multi-cloud deployment",      icon: Layers,    color: "#06b6d4" },
  { label: "Security & compliance baked in", icon: Shield, color: "#ef4444" },
  { label: "Cost monitoring & alerts",    icon: BarChart2, color: "#10b981" },
  { label: "Drift detection & auto-heal", icon: RefreshCw, color: "#f59e0b" },
];

const TESTIMONIALS = [
  { quote: "Our devs used to spend 40% of each sprint on infra work. With QuickInfra that's down to zero. They just ship features now.", company: "SalesGarners Marketing", role: "IT Manager", initial: "S", color: "#8b5cf6" },
  { quote: "We went from weekly deploys to deploying multiple times a day. The CI/CD setup alone was worth it.", company: "Netsoftmate IT Solutions", role: "Managing Director", initial: "N", color: "#3b82f6" },
  { quote: "No more waiting on a DevOps ticket to get an environment. Engineers are completely unblocked.", company: "CloudAge", role: "Director", initial: "C", color: "#10b981" },
];

// ─── CI/CD Pipeline Visual ────────────────────────────────────────────────────

const PIPELINE_STAGES = [
  { id: "commit",   label: "Git Commit",      icon: GitBranch, color: "#8b5cf6" },
  { id: "iac",      label: "IaC Generate",    icon: Code2,     color: "#3b82f6" },
  { id: "build",    label: "Docker Build",    icon: Layers,    color: "#06b6d4" },
  { id: "test",     label: "Auto Test",       icon: Zap,       color: "#10b981" },
  { id: "deploy",   label: "K8s Deploy",      icon: RefreshCw, color: "#f59e0b" },
  { id: "monitor",  label: "Live Monitor",    icon: BarChart2, color: "#22c55e" },
];

function PipelineWidget() {
  const [active,   setActive]   = useState(0);
  const [mounted,  setMounted]  = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 120);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    setProgress(0);
    const piv = setInterval(() => setProgress((p) => {
      if (p >= 100) { clearInterval(piv); return 100; }
      return p + 4;
    }), 40);
    const stageTimer = setTimeout(() => {
      setActive((a) => (a + 1) % PIPELINE_STAGES.length);
    }, 1200);
    return () => { clearInterval(piv); clearTimeout(stageTimer); };
  }, [mounted, active]);

  const stage = PIPELINE_STAGES[active];

  return (
    <div
      style={{
        height: 520, width: "100%",
        opacity:    mounted ? 1 : 0,
        transform:  mounted ? "translateY(0) scale(1)" : "translateY(28px) scale(0.97)",
        transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
        willChange: "opacity, transform",
      }}
    >
      <div className="h-full" >
        <div className="h-full flex flex-col rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-900 shadow-2xl shadow-violet-500/10 dark:shadow-black/50">

          {/* Header */}
          <div className="flex-shrink-0 flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
              </span>
              <span className="text-sm font-bold text-white tracking-tight">CI/CD Pipeline · Live</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white/15 text-[10px] font-bold text-white border border-white/20">Auto-Generated</span>
              <span className="px-2 py-0.5 rounded-full bg-green-400/20 border border-green-400/30 text-[10px] font-bold text-green-300">Running</span>
            </div>
          </div>

          {/* Stage pills */}
          <div className="flex-shrink-0 flex items-center gap-1.5 px-4 py-3 border-b border-slate-100 dark:border-slate-800 overflow-x-auto">
            {PIPELINE_STAGES.map((s, i) => {
              const Icon = s.icon;
              const isActive = i === active;
              const isDone   = i < active;
              return (
                <div
                  key={s.id}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg flex-shrink-0 transition-all duration-300 text-[10px] font-bold"
                  style={{
                    background:  isActive ? s.color + "15" : isDone ? "#10b98110" : "#f8fafc",
                    color:       isActive ? s.color : isDone ? "#10b981" : "#94a3b8",
                    border:      `1px solid ${isActive ? s.color + "35" : isDone ? "#10b98125" : "#e2e8f0"}`,
                  }}
                >
                  <Icon size={10} />
                  {s.label}
                  {isDone && <span className="text-[9px]">✓</span>}
                </div>
              );
            })}
          </div>

          {/* Active stage detail */}
          <div className="flex-1 p-5 flex flex-col">
            <div
              className="rounded-xl p-4 mb-4 border flex items-start gap-4"
              style={{ background: stage.color + "08", borderColor: stage.color + "25" }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: stage.color + "18", color: stage.color, border: `1.5px solid ${stage.color}30` }}>
                <stage.icon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-extrabold text-slate-800 dark:text-slate-100">{stage.label}</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: stage.color + "20", color: stage.color }}>
                    {progress < 100 ? "Running..." : "✓ Done"}
                  </span>
                </div>
                {/* Progress bar */}
                <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-100"
                    style={{ width: `${progress}%`, background: stage.color }}
                  />
                </div>
                <div className="text-[10px] text-slate-400 mt-1.5 font-mono">{progress}% complete</div>
              </div>
            </div>

            {/* Resource rows */}
            <div className="flex flex-col gap-2">
              {[
                { label: "aws_ecs_service.api",     status: "active",  color: "#10b981" },
                { label: "aws_alb.api_gateway",     status: "active",  color: "#10b981" },
                { label: "aws_rds.postgres_main",   status: "active",  color: "#10b981" },
                { label: "aws_ecr.app_registry",    status: "syncing", color: "#f59e0b" },
              ].map(({ label, status, color }) => (
                <div key={label} className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">{label}</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: color + "15", color }}>
                    {status}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom stat */}
            <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">Pipeline generated by QuickInfra</span>
              <span className="text-[10px] font-bold text-violet-600 dark:text-violet-400">0 YAML written ✦</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function EngineeringTeamsPage() {
  const [heroVisible,  setHeroVisible]  = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const metricsRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsVisible(true); },
      { threshold: 0.2 }
    );
    if (metricsRef.current) obs.observe(metricsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[88vh] flex items-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-60 dark:opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(139,92,246,0.08),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(139,92,246,0.15),transparent)]" />

        <div className="relative max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left */}
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-7 border border-violet-200 dark:border-violet-500/30 bg-violet-50 dark:bg-violet-500/10"
                style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(12px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
              >
                <Users size={11} className="text-violet-600 dark:text-violet-400" />
                <span className="text-xs font-bold tracking-widest text-violet-600 dark:text-violet-400 uppercase">For Engineering Teams</span>
              </div>

              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.07] tracking-tight mb-6"
                style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(18px)", transition: "opacity 0.65s ease 0.08s, transform 0.65s ease 0.08s" }}
              >
                Let engineers<br />
                <span className="text-violet-600 dark:text-violet-400">do engineering.</span>
              </h1>

              <p
                className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-8 max-w-xl"
                style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(18px)", transition: "opacity 0.65s ease 0.16s, transform 0.65s ease 0.16s" }}
              >
                QuickInfra automates the entire cloud ops layer — IaC generation, CI/CD setup,
                compliance enforcement — so your best developers spend zero time on infrastructure
                and 100% on building the product.
              </p>

              <div
                className="flex flex-wrap gap-3 mb-10"
                style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(18px)", transition: "opacity 0.65s ease 0.24s, transform 0.65s ease 0.24s" }}
              >
                <Link href="https://console.quickinfra.cloud/" className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40 transition-all hover:-translate-y-0.5">
                  Start Free Trial <ArrowRight size={15} />
                </Link>
               
              </div>

              <div
                className="flex flex-wrap gap-6"
                style={{ opacity: heroVisible ? 1 : 0, transition: "opacity 0.65s ease 0.32s" }}
              >
                {[["4x", "Dev productivity"], ["0", "YAML written"], ["Daily", "Deploy frequency"]].map(([v, l]) => (
                  <div key={l}>
                    <div className="text-sm font-extrabold text-violet-600 dark:text-violet-400">{v}</div>
                    <div className="text-xs text-slate-400 dark:text-slate-600 mt-0.5">{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — pipeline widget */}
            <PipelineWidget />
          </div>
        </div>
      </section>

      {/* ── FOR YOU IF ───────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold tracking-widest uppercase text-violet-600 dark:text-violet-400 mb-3">Sound Familiar?</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">QuickInfra is for you if</h2>
            <p className="text-base text-slate-500 dark:text-slate-400 font-light max-w-lg mx-auto">
              Three signs your engineering team is losing velocity to ops work they shouldn't be doing.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FOR_YOU_IF.map(({ icon, title, color, desc }) => (
              <div
                key={title}
                className="rounded-2xl border bg-white dark:bg-slate-900 p-7 hover:-translate-y-1 transition-all hover:shadow-xl cursor-default overflow-hidden relative"
                style={{ borderColor: color + "30" }}
              >
                <div className="absolute top-0 inset-x-0 h-0.5" style={{ background: `linear-gradient(90deg, ${color}, ${color}44)` }} />
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-6 text-base font-extrabold" style={{ background: color + "15", color, border: `1.5px solid ${color}30` }}>
                  {icon}
                </div>
                <h3 className="text-base font-extrabold mb-3 tracking-tight">{title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BEFORE / AFTER METRICS ───────────────────────────────────────── */}
      <section ref={metricsRef} className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[10px] font-bold tracking-widest uppercase text-violet-600 dark:text-violet-400 mb-3">Real Impact</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Before vs After QuickInfra</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {METRICS.map(({ before, after, label, color }) => (
              <div key={label} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 text-center hover:-translate-y-1 transition-all hover:shadow-lg">
                <div className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-600 mb-3">{label}</div>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-sm font-bold text-red-400 line-through">{before}</span>
                  <span className="text-slate-300 dark:text-slate-700">→</span>
                </div>
                <div
                  className="text-3xl sm:text-4xl font-extrabold tracking-tight transition-colors duration-700"
                  style={{ color: statsVisible ? color : "#e2e8f0" }}
                >
                  {after}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY QUICKINFRA ───────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold tracking-widest uppercase text-violet-600 dark:text-violet-400 mb-3">Why QuickInfra</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">Built for Dev Teams That Ship</h2>
            <p className="text-base text-slate-500 dark:text-slate-400 font-light max-w-lg mx-auto">
              Six reasons engineering teams choose QuickInfra to eliminate the ops layer entirely.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY_QUICKINFRA.map(({ icon: Icon, title, tag, color, desc }) => (
              <div key={title} className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 hover:-translate-y-1 transition-all hover:shadow-lg cursor-default">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: color + "15", color, border: `1.5px solid ${color}30` }}>
                    <Icon size={18} />
                  </div>
                  <span className="text-[10px] font-extrabold tracking-widest uppercase text-slate-400 dark:text-slate-500">{tag}</span>
                </div>
                <h3 className="text-sm font-extrabold mb-2.5 leading-snug tracking-tight group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">{title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES GRID ────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[10px] font-bold tracking-widest uppercase text-violet-600 dark:text-violet-400 mb-3">Platform</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">Everything in One Place</h2>
            <p className="text-base text-slate-500 dark:text-slate-400 font-light max-w-lg mx-auto">
              One platform replaces your entire DevOps toolchain.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {CAPABILITIES.map(({ label, icon: Icon, color }) => (
              <div key={label} className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4 hover:-translate-y-0.5 hover:shadow-md transition-all cursor-default">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: color + "15", color }}>
                  <Icon size={15} />
                </div>
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 leading-tight">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold tracking-widest uppercase text-violet-600 dark:text-violet-400 mb-3">How It Works</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">From Repo to Production in Minutes</h2>
            <p className="text-base text-slate-500 dark:text-slate-400 font-light max-w-lg mx-auto">
              Four steps. Zero YAML. Zero ops tickets.
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {HOW_IT_WORKS.map(({ step, title, color, desc }) => (
                <div key={step} className="flex flex-col items-center text-center group">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5 text-xl font-extrabold font-mono relative z-10 transition-all duration-300 group-hover:scale-110"
                    style={{ background: color + "12", color, border: `2px solid ${color}30` }}
                  >
                    {step}
                  </div>
                  <h3 className="text-sm font-extrabold mb-2.5 tracking-tight">{title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold tracking-widest uppercase text-violet-600 dark:text-violet-400 mb-3">What Teams Say</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Engineering Teams That Unblocked</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map(({ quote, company, role, initial, color }) => (
              <div key={company} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-7 flex flex-col gap-5 relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-0.5" style={{ background: `linear-gradient(90deg, ${color}, ${color}44)` }} />
                <div className="text-3xl font-serif text-slate-100 dark:text-slate-800 leading-none">"</div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light flex-1">{quote}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white font-extrabold text-sm" style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}>
                    {initial}
                  </div>
                  <div>
                    <div className="text-sm font-bold">{company}</div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-slate-100 dark:border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(139,92,246,0.07),transparent)] dark:bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(139,92,246,0.12),transparent)]" />
        <div className="relative max-w-2xl mx-auto text-center">
          <p className="text-[10px] font-bold tracking-widest uppercase text-violet-600 dark:text-violet-400 mb-6">Get Started</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-6">
            Ready to transform your<br />cloud migration?
          </h2>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-10">
            Connect your repo. QuickInfra handles the rest — IaC, pipelines, compliance, monitoring.
            Your team ships features from day one.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="https://console.quickinfra.cloud/" className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold bg-violet-600 hover:bg-violet-500 text-white shadow-xl shadow-violet-600/25 hover:shadow-violet-600/40 transition-all hover:-translate-y-0.5">
              Start Free Trial <ArrowRight size={16} />
            </Link>
           
          </div>
          <p className="mt-6 text-[10px] font-bold tracking-widest uppercase text-slate-300 dark:text-slate-700">
            ISO/IEC 27001 · AWS Qualified Software · SOC 2 Ready
          </p>
        </div>
      </section>

    </div>
  );
}