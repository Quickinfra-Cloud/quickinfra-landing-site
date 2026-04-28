"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Zap,
  Shield,
  BarChart2,
  RefreshCw,
  Layers,
  Database,
  Cpu,
  GitBranch,
  TrendingUp,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const FOR_YOU_IF = [
  {
    icon: "◈",
    title: "Readymade AI/ML Templates",
    color: "#a855f7",
    desc: "Looking to simplify cloud infra creation with pre-built AI/ML templates — GPU clusters, model serving endpoints, training pipelines, all wired up.",
  },
  {
    icon: "⟳",
    title: "Flexible Platform Growth",
    color: "#7c3aed",
    desc: "Want to grow your platform flexibly while staying focused on your core building objectives — not on provisioning, scaling, or pipeline management.",
  },
  {
    icon: "$",
    title: "No DevOps, Cost-Efficient Scale",
    color: "#6d28d9",
    desc: "Don't have a DevOps team but need to scale fast with a cost-efficient approach — AI infra that provisions itself and rightsizes automatically.",
  },
];

const WHY_QUICKINFRA = [
  {
    icon: Cpu,
    title: "Accelerate AI Innovation",
    tag: "MLOps",
    color: "#a855f7",
    desc: "Navigate the complex DevOps landscape of AI with ease. QuickInfra streamlines the entire MLOps process — accelerating your path from concept to deployment.",
  },
  {
    icon: Zap,
    title: "One-Click Deploy, Update, Scale",
    tag: "Automation",
    color: "#7c3aed",
    desc: "Deploy a new model, update an existing one, or scale to meet inference demand — with a single click. Speed and agility for every release cycle.",
  },
  {
    icon: Layers,
    title: "Close the Cloud Skill Gap",
    tag: "Upskilling",
    color: "#8b5cf6",
    desc: "Don't be constrained by talent shortages. QuickInfra's intelligent automation empowers your existing dev team to unlock cloud-based AI/ML capabilities.",
  },
  {
    icon: BarChart2,
    title: "Unprecedented Cost Efficiency",
    tag: "FinOps",
    color: "#a855f7",
    desc: "One-click infra creation and migration tools offer significant time and cost savings — letting you invest more in what matters: training better models.",
  },
  {
    icon: Database,
    title: "Seamless AI Data Migration",
    tag: "Migration",
    color: "#7c3aed",
    desc: "Transitioning AI/ML projects to cloud? QuickInfra ensures continuity across datasets and models. No disruptions to training runs, just smooth progression.",
  },
  {
    icon: Shield,
    title: "Enhanced Security",
    tag: "DevSecOps",
    color: "#6d28d9",
    desc: "Security-first approach with encrypted data storage and transfer. Your training data, model weights, and inference endpoints stay protected at all times.",
  },
];

const METRICS = [
  {
    before: "Days",
    after: "Hours",
    label: "Model deploy time",
    color: "#a855f7",
  },
  {
    before: "Manual",
    after: "1-click",
    label: "Infra provisioning",
    color: "#7c3aed",
  },
  {
    before: "3+ hires",
    after: "0",
    label: "MLOps headcount",
    color: "#8b5cf6",
  },
  { before: "60%", after: "~10%", label: "GPU idle time", color: "#6d28d9" },
];

const ML_TEMPLATES = [
  {
    name: "LLM Inference Stack",
    tag: "NLP",
    color: "#a855f7",
    resources: ["GPU cluster", "Model endpoint", "Load balancer"],
  },
  {
    name: "Training Pipeline",
    tag: "Training",
    color: "#7c3aed",
    resources: ["Spot instances", "S3 data lake", "MLflow tracking"],
  },
  {
    name: "Computer Vision API",
    tag: "CV",
    color: "#8b5cf6",
    resources: ["ECS service", "ECR registry", "CloudFront CDN"],
  },
  {
    name: "Feature Store",
    tag: "Data",
    color: "#6d28d9",
    resources: ["RDS Postgres", "Redis cache", "SageMaker Feature Store"],
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Pick Your AI Stack",
    color: "#a855f7",
    desc: "Choose from pre-built AI/ML templates — LLM inference, training pipelines, computer vision APIs, feature stores, and more.",
  },
  {
    step: "02",
    title: "Auto-Provision Infra",
    color: "#7c3aed",
    desc: "GPU clusters, model endpoints, data lakes provisioned automatically. Zero manual Terraform. Zero ops tickets.",
  },
  {
    step: "03",
    title: "Deploy & Serve Models",
    color: "#8b5cf6",
    desc: "One-click model deployment with auto-scaling endpoints. Update model versions without downtime or re-provisioning.",
  },
  {
    step: "04",
    title: "Monitor & Optimise Cost",
    color: "#6d28d9",
    desc: "GPU utilisation tracking, idle instance rightsizing, and inference cost alerts — continuous cost optimisation around the clock.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "We went from weeks of infra setup to deploying our first model endpoint in under a day. QuickInfra removed every blocker between our ML team and production.",
    company: "SalesGarners Marketing Pvt. Ltd.",
    role: "IT Manager",
    initial: "S",
    color: "#a855f7",
  },
  {
    quote:
      "GPU idle time dropped from 60% to under 10% after QuickInfra started managing our training cluster scheduling. Significant cost savings immediately.",
    company: "Netsoftmate IT Solutions",
    role: "Managing Director",
    initial: "N",
    color: "#7c3aed",
  },
  {
    quote:
      "Our ML engineers now ship model updates the same day. No waiting on a DevOps ticket, no YAML, just push and it's live.",
    company: "CloudAge",
    role: "Director",
    initial: "C",
    color: "#8b5cf6",
  },
];

// ─── ML Infrastructure Widget ─────────────────────────────────────────────────

const MODEL_RUNS = [
  {
    name: "gpt-finetune-v3",
    status: "training",
    progress: 72,
    gpu: "A100 × 4",
    eta: "1h 12m",
    color: "#a855f7",
  },
  {
    name: "cv-detection-prod",
    status: "serving",
    progress: 100,
    gpu: "T4 × 2",
    eta: "live",
    color: "#10b981",
  },
  {
    name: "embedding-v2",
    status: "queued",
    progress: 0,
    gpu: "A100 × 2",
    eta: "~2h",
    color: "#f59e0b",
  },
  {
    name: "rlhf-reward-model",
    status: "training",
    progress: 34,
    gpu: "A100 × 8",
    eta: "4h 38m",
    color: "#a855f7",
  },
];

const INFERENCE_STATS = [
  { label: "Requests/s", value: "2.4k", color: "#a855f7" },
  { label: "Avg Latency", value: "38ms", color: "#10b981" },
  { label: "GPU Util", value: "87%", color: "#f59e0b" },
];

function AiMlWidget() {
  const [mounted, setMounted] = useState(false);
  const [activeLine, setActiveLine] = useState(0);
  const [trainingPct, setTrainingPct] = useState(72);
  const [rlhfPct, setRlhfPct] = useState(34);
  const [animatingId, setAnimatingId] = useState(null);
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

  // Cycle highlight
  useEffect(() => {
    if (!mounted) return;
    const iv = setInterval(() => {
      setActiveLine((n) => (n + 1) % MODEL_RUNS.length);
    }, 1600);
    return () => clearInterval(iv);
  }, [mounted]);

  // Slowly increment training progress
  useEffect(() => {
    if (!mounted) return;
    const iv = setInterval(() => {
      setTrainingPct((p) => (p >= 99 ? 60 : p + 0.4));
      setRlhfPct((p) => (p >= 99 ? 20 : p + 0.2));
    }, 200);
    return () => clearInterval(iv);
  }, [mounted]);

  const runs = [
    { ...MODEL_RUNS[0], progress: Math.round(trainingPct) },
    MODEL_RUNS[1],
    MODEL_RUNS[2],
    { ...MODEL_RUNS[3], progress: Math.round(rlhfPct) },
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
       
      >
        <div className="h-full flex flex-col rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-900 shadow-2xl shadow-purple-500/10 dark:shadow-black/50">
          {/* Header */}
          <div className="flex-shrink-0 flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-purple-700 via-violet-700 to-indigo-700">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-300 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-300" />
              </span>
              <span className="text-sm font-bold text-white tracking-tight">
                AI/ML Infra · Live
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white/15 text-[10px] font-bold text-white border border-white/20">
                ap-south-1 · AWS
              </span>
              <span className="px-2 py-0.5 rounded-full bg-purple-400/25 border border-purple-400/30 text-[10px] font-bold text-purple-200">
                GPU Ready
              </span>
            </div>
          </div>

          {/* Inference stats strip */}
          <div className="flex-shrink-0 grid grid-cols-3 divide-x divide-slate-100 dark:divide-slate-800 border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900">
            {INFERENCE_STATS.map(({ label, value, color }) => (
              <div key={label} className="flex flex-col items-center py-2.5">
                <span
                  className="text-base font-extrabold leading-none"
                  style={{ color }}
                >
                  {value}
                </span>
                <span className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Model runs table */}
          <div className="flex-1 overflow-hidden">
            {/* Table header */}
            <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/20">
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 flex-1">
                Model Run
              </span>
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 w-20 hidden sm:block">
                GPU
              </span>
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 w-16 text-right">
                ETA
              </span>
            </div>

            {runs.map((run, i) => (
              <div
                key={run.name}
                className="px-4 py-3 border-b border-slate-50 dark:border-slate-800/50 transition-all duration-300"
                style={{
                  background:
                    activeLine === i ? run.color + "08" : "transparent",
                }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  {/* Status dot */}
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{
                      background:
                        run.status === "serving"
                          ? "#10b981"
                          : run.status === "training"
                            ? run.color
                            : "#f59e0b",
                      animation:
                        run.status === "training"
                          ? "dashPulse 1.5s ease-in-out infinite"
                          : "none",
                    }}
                  />
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex-1 truncate font-mono">
                    {run.name}
                  </span>
                  <span
                    className="text-[9px] font-extrabold px-1.5 py-0.5 rounded hidden sm:block w-20 text-center truncate"
                    style={{ background: run.color + "15", color: run.color }}
                  >
                    {run.gpu}
                  </span>
                  <span
                    className="text-[10px] font-bold w-16 text-right"
                    style={{
                      color:
                        run.status === "serving"
                          ? "#10b981"
                          : run.status === "queued"
                            ? "#f59e0b"
                            : run.color,
                    }}
                  >
                    {run.eta}
                  </span>
                </div>
                {/* Progress bar */}
                <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden ml-4">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${run.progress}%`,
                      background:
                        run.status === "serving"
                          ? "#10b981"
                          : run.status === "queued"
                            ? "#f59e0b40"
                            : run.color,
                    }}
                  />
                </div>
                <div className="flex justify-between mt-1 ml-4">
                  <span className="text-[9px] font-mono text-slate-400 capitalize">
                    {run.status}
                  </span>
                  <span className="text-[9px] font-mono text-slate-400">
                    {run.progress}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex-shrink-0 border-t border-slate-100 dark:border-slate-800 px-4 py-2.5 bg-slate-50/60 dark:bg-slate-900/60 flex items-center justify-between">
            <span className="text-[9px] text-slate-400 font-mono">
              Infra auto-provisioned by QuickInfra
            </span>
            <span className="text-[9px] font-bold text-purple-600 dark:text-purple-400">
              0 Terraform written ✦
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AiMlPage() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [activeTpl, setActiveTpl] = useState(0);
  const metricsRef = useRef(null);
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
    if (metricsRef.current) obs.observe(metricsRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    cycleRef.current = setInterval(
      () => setActiveTpl((t) => (t + 1) % ML_TEMPLATES.length),
      3000,
    );
    return () => clearInterval(cycleRef.current);
  }, []);

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[88vh] flex items-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-60 dark:opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(168,85,247,0.08),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(168,85,247,0.16),transparent)]" />

        <div className="relative max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-7 border border-purple-200 dark:border-purple-500/30 bg-purple-50 dark:bg-purple-500/10"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateY(0)" : "translateY(12px)",
                  transition: "opacity 0.6s ease, transform 0.6s ease",
                }}
              >
                <Cpu
                  size={11}
                  className="text-purple-600 dark:text-purple-400"
                />
                <span className="text-xs font-bold tracking-widest text-purple-600 dark:text-purple-400 uppercase">
                  For AI / ML Teams
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
                Ship models.
                <br />
                <span className="text-purple-600 dark:text-purple-400">
                  Not pipelines.
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
                Build reliable infrastructure for your AI/ML platform with the
                automated efficiency of QuickInfra. Deploy, manage, and scale
                GPU workloads like never before — without a single MLOps hire.
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
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-xl shadow-purple-600/25 hover:shadow-purple-600/40 transition-all hover:-translate-y-0.5"
            >
              Start Free Trial
              <ArrowRight size={16} />
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
                  ["1-click", "Model deployment"],
                  ["~10%", "GPU idle time"],
                  ["0", "MLOps hires needed"],
                ].map(([v, l]) => (
                  <div key={l}>
                    <div className="text-sm font-extrabold text-purple-600 dark:text-purple-400">
                      {v}
                    </div>
                    <div className="text-xs text-slate-400 dark:text-slate-600 mt-0.5">
                      {l}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <AiMlWidget />
          </div>
        </div>
      </section>

      {/* ── FOR YOU IF ───────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold tracking-widest uppercase text-purple-600 dark:text-purple-400 mb-3">
              Built for AI Teams
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              QuickInfra is for you if
            </h2>
            <p className="text-base text-slate-500 dark:text-slate-400 font-light max-w-lg mx-auto">
              Three signs your AI/ML team is losing time on infra instead of
              innovation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FOR_YOU_IF.map(({ icon, title, color, desc }) => (
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
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-6 text-base font-extrabold"
                  style={{
                    background: color + "15",
                    color,
                    border: `1.5px solid ${color}30`,
                  }}
                >
                  {icon}
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

      {/* ── BEFORE / AFTER ───────────────────────────────────────────────── */}
      <section ref={metricsRef} className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[10px] font-bold tracking-widest uppercase text-purple-600 dark:text-purple-400 mb-3">
              Real Impact
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Before vs After QuickInfra
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {METRICS.map(({ before, after, label, color }) => (
              <div
                key={label}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 text-center hover:-translate-y-1 transition-all hover:shadow-lg"
              >
                <div className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-600 mb-3">
                  {label}
                </div>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-sm font-bold text-red-400 line-through">
                    {before}
                  </span>
                  <span className="text-slate-300 dark:text-slate-700">→</span>
                </div>
                <div
                  className="text-2xl sm:text-3xl font-extrabold tracking-tight transition-colors duration-700"
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
            <p className="text-[10px] font-bold tracking-widest uppercase text-purple-600 dark:text-purple-400 mb-3">
              Why QuickInfra
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Built for the AI Revolution
            </h2>
            <p className="text-base text-slate-500 dark:text-slate-400 font-light max-w-lg mx-auto">
              Seven reasons AI/ML teams choose QuickInfra to eliminate infra
              overhead entirely.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY_QUICKINFRA.map(({ icon: Icon, title, tag, color, desc }) => (
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
                  <span className="text-[10px] font-extrabold tracking-widest uppercase text-slate-400 dark:text-slate-500">
                    {tag}
                  </span>
                </div>
                <h3 className="text-sm font-extrabold mb-2.5 leading-snug tracking-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
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

      {/* ── AI/ML TEMPLATES ──────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold tracking-widest uppercase text-purple-600 dark:text-purple-400 mb-3">
              Ready-Made Templates
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Pre-Built AI/ML Infra Stacks
            </h2>
            <p className="text-base text-slate-500 dark:text-slate-400 font-light max-w-lg mx-auto">
              Pick a template, customise the parameters, and your AI
              infrastructure is provisioned in minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ML_TEMPLATES.map(({ name, tag, color, resources }, i) => {
              const isActive = activeTpl === i;
              return (
                <div
                  key={name}
                  onClick={() => setActiveTpl(i)}
                  className="rounded-2xl border bg-white dark:bg-slate-900 p-5 cursor-pointer transition-all duration-300 overflow-hidden relative"
                  style={{
                    borderColor: isActive ? color + "55" : "#e2e8f0",
                    boxShadow: isActive ? `0 8px 28px ${color}18` : "none",
                    transform: isActive ? "translateY(-4px)" : "translateY(0)",
                  }}
                >
                  <div
                    className="absolute top-0 inset-x-0 h-0.5 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(90deg, ${color}, ${color}44)`,
                      opacity: isActive ? 1 : 0,
                    }}
                  />

                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-[10px] font-extrabold px-2 py-0.5 rounded-md"
                      style={{ background: color + "18", color }}
                    >
                      {tag}
                    </span>
                    {isActive && (
                      <span className="text-[9px] font-bold text-green-500 flex items-center gap-1">
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-green-400"
                          style={{
                            animation: "dashPulse 1.5s ease-in-out infinite",
                          }}
                        />
                        Ready
                      </span>
                    )}
                  </div>

                  <h3
                    className="text-sm font-extrabold mb-3 tracking-tight"
                    style={{ color: isActive ? color : undefined }}
                  >
                    {name}
                  </h3>

                  <div className="space-y-1.5">
                    {resources.map((r) => (
                      <div key={r} className="flex items-center gap-2">
                        <span
                          className="w-1 h-1 rounded-full flex-shrink-0"
                          style={{ background: color }}
                        />
                        <span className="text-[10px] text-slate-400 font-mono">
                          {r}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div
                    className="mt-4 text-[10px] font-bold flex items-center gap-1 transition-colors duration-300"
                    style={{ color: isActive ? color : "#94a3b8" }}
                  >
                    Deploy in 1 click <ArrowRight size={10} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold tracking-widest uppercase text-purple-600 dark:text-purple-400 mb-3">
              How It Works
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              From Template to Production in Hours
            </h2>
            <p className="text-base text-slate-500 dark:text-slate-400 font-light max-w-lg mx-auto">
              Four steps. No Terraform. No MLOps team. No GPU idle time.
            </p>
          </div>
          <div className="relative">
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {HOW_IT_WORKS.map(({ step, title, color, desc }) => (
                <div
                  key={step}
                  className="flex flex-col items-center text-center group"
                >
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5 text-xl font-extrabold font-mono relative z-10 transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: color + "12",
                      color,
                      border: `2px solid ${color}30`,
                    }}
                  >
                    {step}
                  </div>
                  <h3 className="text-sm font-extrabold mb-2.5 tracking-tight">
                    {title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                    {desc}
                  </p>
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
            <p className="text-[10px] font-bold tracking-widests uppercase text-purple-600 dark:text-purple-400 mb-3">
              What Teams Say
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              AI Teams That Ship Faster
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(168,85,247,0.07),transparent)] dark:bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(168,85,247,0.13),transparent)]" />
        <div className="relative max-w-2xl mx-auto text-center">
          <p className="text-[10px] font-bold tracking-widest uppercase text-purple-600 dark:text-purple-400 mb-6">
            Get Started
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-6">
            Unlock your AI platform's
            <br />
            full potential.
          </h2>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-10">
            Start a free trial and see how QuickInfra provisions GPU clusters,
            endpoints, and training pipelines for your AI stack — in hours, not
            weeks.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="https://console.quickinfra.cloud/"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-xl shadow-purple-600/25 hover:shadow-purple-600/40 transition-all hover:-translate-y-0.5"
            >
              Start Free Trial
              <ArrowRight size={16} />
            </Link>
          </div>
          <p className="mt-6 text-[10px] font-bold tracking-widest uppercase text-slate-300 dark:text-slate-700">
            ISO/IEC 27001 · AWS Qualified Software · GPU-Ready Infrastructure
          </p>
        </div>
      </section>
    </div>
  );
}
