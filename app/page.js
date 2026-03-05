"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight, Play, ChevronRight,
  Zap, RefreshCw, Shield, Cloud, BarChart2, Settings,
  Rocket, Users, Building2, Quote,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const STATS = [
  { value: "5x",   label: "Faster Launches",        sub: "Automated deployment pipelines" },
  { value: "65%",  label: "Cost Reduction",          sub: "One platform for all infra needs" },
  { value: "4x",   label: "Developer Productivity",  sub: "Auto-generated IaC scripts" },
  { value: "100%", label: "Compliant from Day One",  sub: "SOC2, HIPAA, PCI-DSS built-in" },
];

const FEATURES = [
  { icon: Zap,       title: "Auto Infrastructure Provisioning", tag: "IaC",           desc: "Define once, deploy anywhere. Auto-generates Terraform configs and provisions cloud resources — no scripts, no ops tickets." },
  { icon: RefreshCw, title: "One-Click CI/CD Setup",            tag: "CI/CD",         desc: "From repo to production in minutes. Preconfigured pipelines, zero YAML wrestling. Your team ships features, not fixes." },
  { icon: Shield,    title: "Security & Compliance",            tag: "DevSecOps",     desc: "SOC 2, PCI-DSS, HIPAA, GDPR controls baked into every deployment. Security is your default configuration." },
  { icon: Cloud,     title: "Cloud Migration",                  tag: "Migration",     desc: "Template-based migration engine that moves workloads with zero downtime. Assess, plan, execute — one dashboard." },
  { icon: BarChart2, title: "InfraOps Monitoring",              tag: "Observability", desc: "Real-time visibility into your cloud stack. Cost anomaly detection, predictive alerts, and health dashboards." },
  { icon: Settings,  title: "Automated InfraOps",               tag: "Automation",    desc: "Predictive scaling, drift detection, and continuous cost optimisation — running 24/7 so your team doesn't have to." },
];

const PERSONAS = [
  {
    who: "Startups & Founders",
    icon: Rocket,
    tag: "Move fast, break nothing",
    color: "#3b82f6",
    pain: "You're shipping features but infra setup is eating your sprints. One misconfigured pipeline can kill a launch.",
    solution: "Production-grade cloud in hours, not weeks. Auto-provisioned, pre-secured, compliant from day one. Focus on your product.",
    metrics: [
      { label: "Setup time",  before: "3 weeks",  after: "4 hours"  },
      { label: "Infra cost",  before: "₹2.4L/mo", after: "₹84K/mo" },
    ],
  },
  {
    who: "Engineering Teams",
    icon: Users,
    tag: "Let engineers do engineering",
    color: "#8b5cf6",
    pain: "Your best devs are writing Terraform and debugging YAML instead of building the product you hired them for.",
    solution: "Automate the entire ops layer. Auto-generated IaC, one-click CI/CD, zero pipeline babysitting. Engineers ship features.",
    metrics: [
      { label: "Dev productivity", before: "1x",     after: "4x"    },
      { label: "Deploy frequency", before: "Weekly", after: "Daily" },
    ],
  },
  {
    who: "Non-Tech SMEs",
    icon: Building2,
    tag: "Cloud without a DevOps team",
    color: "#10b981",
    pain: "Cloud is expensive and complex. You don't have a DevOps hire and can't afford to get it wrong.",
    solution: "Fully managed InfraOps. No in-house expertise needed. We provision, secure, monitor and optimise your cloud continuously.",
    metrics: [
      { label: "Infra incidents", before: "12/mo",        after: "0/mo"       },
      { label: "Cloud spend",     before: "Unpredictable", after: "Optimised" },
    ],
  },
];

const INTEGRATIONS = [
  "AWS", "Terraform", "Ansible", "Kubernetes", "Docker",
  "GitHub", "GitLab", "Jenkins", "Prometheus", "Grafana",
  "Datadog", "ArgoCD", "Helm", "Vault", "Nginx",
];

const TESTIMONIALS = [
  { quote: "We saved 70% on AWS infrastructure management costs. QuickInfra changed how we think about cloud ops entirely.", company: "SalesGarners Marketing Pvt. Ltd.", role: "IT Manager",        initial: "S" },
  { quote: "End-to-end migration automation cut our migration time dramatically. What used to take months took weeks.",     company: "Netsoftmate IT Solutions",      role: "Managing Director", initial: "N" },
  { quote: "We encourage every startup to switch to QuickInfra. Hassle-free DevOps infra management, period.",             company: "CloudAge",                      role: "Director",          initial: "C" },
];

// ─── Auto-Heal Event Feed Data ──────────────────────────────────────────────

const AUTOFEED_EVENTS = [
  { id: 1, type: "scale",      icon: "↑", color: "#3b82f6", title: "CPU spike detected on ECS",    detail: "api-service · us-east-1 · 94% CPU",          action: "Scaled 2 → 6 tasks",          actionColor: "#3b82f6", time: "just now" },
  { id: 2, type: "security",   icon: "⊕", color: "#10b981", title: "SSL cert expiring in 3 days",  detail: "api.quickinfracloud.com · ACM",                action: "Auto-renewed",                actionColor: "#10b981", time: "2m ago"   },
  { id: 3, type: "cost",       icon: "$", color: "#f59e0b", title: "Idle t3.large detected",        detail: "i-0xa1b2c3 · ap-south-1 · 3% avg CPU",        action: "Rightsized → t3.small",       actionColor: "#f59e0b", time: "11m ago"  },
  { id: 4, type: "drift",      icon: "⟳", color: "#8b5cf6", title: "Terraform drift on aws_sg",    detail: "sg-0xd4e5f6 · port 22 opened manually",        action: "Corrected to desired state",  actionColor: "#8b5cf6", time: "34m ago"  },
  { id: 5, type: "compliance", icon: "✦", color: "#ef4444", title: "RDS automated backup missed",  detail: "prod-postgres · backup window skipped",        action: "Triggered & verified",        actionColor: "#ef4444", time: "1h ago"   },
  { id: 6, type: "cost",       icon: "$", color: "#f59e0b", title: "Unusual spend spike · +38%",   detail: "EC2 on-demand · 14 untagged instances",        action: "Reserved instance purchased", actionColor: "#f59e0b", time: "3h ago"   },
];

const FEED_STATS = [
  { label: "Events Today",  value: 47,   suffix: "",  color: "#3b82f6" },
  { label: "Cost Saved",    value: 1840, suffix: "$", color: "#10b981" },
  { label: "Auto-Resolved", value: 23,   suffix: "",  color: "#8b5cf6" },
];

// ─── Hero Auto-Heal Feed ──────────────────────────────────────────────────────

function HeroAutoFeed() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [mounted, setMounted]           = useState(false);
  const [statVals, setStatVals]         = useState([0, 0, 0]);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const reveal = () => {
      setVisibleCount((n) => {
        if (n >= AUTOFEED_EVENTS.length) {
          setTimeout(() => setVisibleCount(0), 1200);
          return n;
        }
        return n + 1;
      });
    };
    const iv = setInterval(reveal, 1100);
    return () => clearInterval(iv);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    FEED_STATS.forEach((stat, i) => {
      const steps = 30;
      const increment = stat.value / steps;
      let step = 0;
      const iv = setInterval(() => {
        step++;
        setStatVals((prev) => {
          const next = [...prev];
          next[i] = step >= steps ? stat.value : Math.round(increment * step);
          return next;
        });
        if (step >= steps) clearInterval(iv);
      }, 40 + i * 15);
    });
  }, [mounted]);

  return (
    <div style={{
      height: 500, width: "100%",
      opacity:   mounted ? 1 : 0,
      transform: mounted ? "translateY(0) scale(1)" : "translateY(28px) scale(0.97)",
      transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
    }}>
      <div className="h-full" style={{ animation: "float 5s ease-in-out infinite" }}>
        <div className="h-full flex flex-col rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-900 shadow-2xl shadow-blue-500/10 dark:shadow-black/50">

          <div className="flex-shrink-0 flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
              </span>
              <span className="text-sm font-bold text-white tracking-tight">AutoOps Live</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-green-400/20 border border-green-400/30 text-[10px] font-bold text-green-300">24 / 7 Active</span>
              <span className="px-2 py-0.5 rounded-full bg-white/15 text-[10px] font-bold text-white border border-white/20">ap-south-1</span>
            </div>
          </div>

          <div className="flex-shrink-0 flex items-center gap-3 px-5 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900">
            {[{ label: "Scaling", color: "#3b82f6" }, { label: "Security", color: "#10b981" }, { label: "Cost", color: "#f59e0b" }, { label: "Drift", color: "#8b5cf6" }, { label: "Compliance", color: "#ef4444" }].map(({ label, color }) => (
              <div key={label} className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
                <span className="text-[9px] font-bold text-slate-500">{label}</span>
              </div>
            ))}
            <div className="ml-auto flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dash-pulse" />
              <span className="text-[9px] font-bold text-blue-600 dark:text-blue-400">Monitoring</span>
            </div>
          </div>

          <div className="flex-1 px-4 py-3 overflow-hidden flex flex-col gap-2">
            {AUTOFEED_EVENTS.map((ev, i) => {
              const show = i < visibleCount;
              return (
                <div key={ev.id} style={{ opacity: show ? 1 : 0, transform: show ? "translateX(0)" : "translateX(16px)", transition: "opacity 0.45s ease, transform 0.45s ease", height: 58, flexShrink: 0 }}>
                  <div className="flex items-start gap-3 px-3.5 py-2.5 rounded-xl h-full" style={{ background: ev.color + "08", border: `1px solid ${ev.color}20` }}>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-extrabold mt-0.5" style={{ background: ev.color + "18", color: ev.color, border: `1px solid ${ev.color}30` }}>{ev.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold text-slate-800 dark:text-slate-100 truncate">{ev.title}</span>
                        <span className="text-[9px] font-bold text-slate-400 flex-shrink-0">{ev.time}</span>
                      </div>
                      <div className="flex items-center justify-between gap-2 mt-0.5">
                        <span className="text-[9.5px] text-slate-500 truncate font-mono">{ev.detail}</span>
                        <span className="flex-shrink-0 text-[8.5px] font-bold px-2 py-0.5 rounded-md" style={{ background: ev.actionColor + "15", color: ev.actionColor, border: `1px solid ${ev.actionColor}25` }}>✓ {ev.action}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex-shrink-0 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60">
            <div className="grid grid-cols-3 divide-x divide-slate-200 dark:divide-slate-800">
              {FEED_STATS.map((stat, i) => (
                <div key={stat.label} className="flex flex-col items-center py-3 px-2">
                  <span className="text-lg font-extrabold leading-none tabular-nums" style={{ color: stat.color }}>{stat.suffix}{statVals[i].toLocaleString()}</span>
                  <span className="text-[9px] font-bold text-slate-500 dark:text-slate-600 mt-1 text-center leading-tight">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function HomePage() {
  const [activePersona, setActivePersona] = useState(0);
  const [cardVisible, setCardVisible]     = useState(true);
  const [statsVisible, setStatsVisible]   = useState(false);
  const statsRef  = useRef(null);
  const cycleRef  = useRef(null);

  // Stats scroll trigger
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsVisible(true); },
      { threshold: 0.2 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  // Start/restart the auto-cycle timer
  const startCycle = () => {
    if (cycleRef.current) clearInterval(cycleRef.current);
    cycleRef.current = setInterval(() => {
      setCardVisible(false);
      setTimeout(() => {
        setActivePersona((p) => (p + 1) % PERSONAS.length);
        setCardVisible(true);
      }, 300);
    }, 10000);
  };

  useEffect(() => {
    startCycle();
    return () => clearInterval(cycleRef.current);
  }, []);

  const switchPersona = (i) => {
    if (i === activePersona) return;
    setCardVisible(false);
    setTimeout(() => {
      setActivePersona(i);
      setCardVisible(true);
    }, 280);
    // Reset the auto-cycle so it doesn't fire right after a manual click
    startCycle();
  };

  const persona = PERSONAS[activePersona];

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-60 dark:opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(59,130,246,0.08),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(59,130,246,0.14),transparent)]" />

        <div className="relative max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-7 border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">AWS Select Partner</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.07] tracking-tight mb-6">
                Ship Code.<br />
                <span className="text-blue-600 dark:text-blue-500">Not Tickets.</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-8 font-light max-w-xl">
                QuickInfra automates your entire infrastructure layer — provisioning, CI/CD, compliance, cost optimisation. Your engineers write features, not pipelines.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/trial" className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all hover:-translate-y-0.5">
                  Start Free Trial <ArrowRight size={15} />
                </Link>
                <button className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-blue-300 dark:hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400 transition-all hover:-translate-y-0.5">
                  <Play size={14} /> Watch Demo
                </button>
              </div>
              <div className="flex flex-wrap gap-6 mt-10">
                {[["ISO 27001", "Certified"], ["AWS", "Select Partner"], ["SOC 2", "Ready"]].map(([l, s]) => (
                  <div key={l}>
                    <div className="text-xs font-extrabold text-blue-600 dark:text-blue-500 tracking-wide">{l}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-500 mt-0.5">{s}</div>
                  </div>
                ))}
              </div>
            </div>
            <HeroAutoFeed />
          </div>
        </div>
      </section>

      {/* ── LOGO MARQUEE ─────────────────────────────────────────────────── */}
      <div className="border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 py-5 overflow-hidden">
        <p className="text-center text-[10px] font-bold tracking-widest uppercase text-slate-600 dark:text-slate-600 mb-4">Trusted by fast-growing companies</p>
        <div className="flex">
          <div className="flex gap-16 animate-[marquee_22s_linear_infinite] whitespace-nowrap">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-16 items-center">
                {["SalesGarners", "Netsoftmate", "CloudAge", "TechVentures", "InnovateCo", "BuildStack", "DevCore", "ScaleUp"].map((n) => (
                  <span key={n} className="text-sm font-bold text-slate-500 dark:text-slate-600 tracking-wide">{n}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── STATS ────────────────────────────────────────────────────────── */}
      <section ref={statsRef} className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[10px] font-bold tracking-widest uppercase text-blue-600 dark:text-blue-500 mb-3">By the Numbers</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">The QuickInfra Impact</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-2xl border p-6 sm:p-8 text-center transition-all hover:-translate-y-1 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-lg hover:shadow-blue-500/5">
                <div className={`text-4xl sm:text-5xl font-extrabold tracking-tight mb-2 transition-colors duration-700 ${statsVisible ? "text-blue-600 dark:text-blue-500" : "text-slate-200 dark:text-slate-700"}`}>{s.value}</div>
                <div className="font-bold text-sm mb-1.5">{s.label}</div>
                <div className="text-xs font-light text-slate-500 dark:text-slate-500">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEM / SOLUTION ───────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[10px] font-bold tracking-widest uppercase text-red-500 dark:text-red-400 mb-4">The Problem</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-5">Your team loses weeks to infra.<br />Every. Single. Sprint.</h2>
          <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed font-light mb-12">
            Setting up cloud environments, writing Terraform, debugging pipelines, chasing compliance — this is where engineering velocity dies. Your best people are doing ops work, not building your product.
          </p>
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-blue-600 dark:text-blue-500">The Fix</span>
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">QuickInfra collapses months of ops work into hours.</h3>
          <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed font-light">
            One internal developer platform that auto-provisions infra, wires up CI/CD, enforces compliance, and keeps your cloud healthy — continuously, automatically.
          </p>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold tracking-widest uppercase text-blue-600 dark:text-blue-500 mb-3">Platform Capabilities</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">Everything Your Infra Team Needs</h2>
            <p className="text-base text-slate-500 dark:text-slate-400 font-light max-w-lg mx-auto">One platform. No cobbling together tools. Full control over your cloud without the complexity.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(({ icon: Icon, title, desc, tag }) => (
              <div key={title} className="group rounded-2xl border p-6 sm:p-7 transition-all hover:-translate-y-1 cursor-default border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg hover:shadow-blue-500/5">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-blue-50 dark:bg-blue-600/10 text-blue-600 dark:text-blue-500"><Icon size={17} /></div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500">{tag}</span>
                </div>
                <h3 className="font-bold text-base mb-3 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ─────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto">

          {/* Section header */}
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold tracking-widest uppercase text-blue-600 dark:text-blue-500 mb-3">Built for Your Team</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">Who Uses QuickInfra?</h2>
            <p className="text-base text-slate-500 dark:text-slate-400 font-light max-w-lg mx-auto">
              From solo founders to enterprise engineering orgs — one platform removes the ops bottleneck at every scale.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10 items-start">

            {/* Left — selector tabs */}
            <div className="lg:col-span-2 flex flex-col gap-3">
              {PERSONAS.map(({ who, icon: Icon, tag, color }, i) => {
                const isActive = activePersona === i;
                return (
                  <button
                    key={who}
                    onClick={() => switchPersona(i)}
                    className="group w-full text-left rounded-2xl border p-4 sm:p-5 transition-all duration-300 focus:outline-none"
                    style={{
                      background:  isActive ? color + "0d" : "white",
                      borderColor: isActive ? color + "55" : "#e2e8f0",
                      boxShadow:   isActive ? `0 8px 24px ${color}18` : "none",
                      transform:   isActive ? "translateX(4px)" : "translateX(0)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                        style={{
                          background: isActive ? color + "18" : "#f1f5f9",
                          color:      isActive ? color : "#94a3b8",
                          border:    `1.5px solid ${isActive ? color + "35" : "#e2e8f0"}`,
                        }}
                      >
                        <Icon size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-extrabold tracking-tight transition-colors duration-300" style={{ color: isActive ? "#0f172a" : "#64748b" }}>
                          {who}
                        </div>
                        <div className="text-[11px] font-medium mt-0.5 truncate transition-colors duration-300" style={{ color: isActive ? color : "#94a3b8" }}>
                          {tag}
                        </div>
                      </div>
                      {/* Active bar */}
                      <div
                        className="w-1 h-8 rounded-full flex-shrink-0 transition-all duration-300"
                        style={{ background: isActive ? color : "transparent" }}
                      />
                    </div>

                    {/* Auto-cycle progress bar */}
                    {isActive && (
                      <div className="mt-3 h-0.5 rounded-full overflow-hidden" style={{ background: color + "20" }}>
                        <div
                          key={activePersona}
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

            {/* Right — animated detail card */}
            <div className="lg:col-span-3">
              <div
                className="rounded-2xl border bg-white dark:bg-slate-900 overflow-hidden"
                style={{
                  borderColor: persona.color + "30",
                  boxShadow:   `0 20px 48px ${persona.color}12`,
                  opacity:     cardVisible ? 1 : 0,
                  transform:   cardVisible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.985)",
                  transition:  "opacity 0.35s cubic-bezier(0.16,1,0.3,1), transform 0.35s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                {/* Top colour accent stripe */}
                <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${persona.color}, ${persona.color}66)` }} />

                <div className="p-6 sm:p-8">

                  {/* Header row */}
                  <div className="flex items-center gap-4 mb-7">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: persona.color + "15", border: `2px solid ${persona.color}25`, color: persona.color }}
                    >
                      <persona.icon size={26} />
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">{persona.who}</h3>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: persona.color }} />
                        <span className="text-xs font-semibold" style={{ color: persona.color }}>{persona.tag}</span>
                      </div>
                    </div>
                  </div>

                  {/* Pain / Solution */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-7">
                    <div className="rounded-xl p-4 border border-red-200 dark:border-red-500/20 bg-red-50 dark:bg-red-500/5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-5 h-5 rounded-md bg-red-100 dark:bg-red-500/15 flex items-center justify-center text-red-500 text-[10px] font-extrabold">✕</span>
                        <p className="text-[10px] font-extrabold tracking-widest uppercase text-red-500 dark:text-red-400">The Problem</p>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 font-light leading-relaxed">{persona.pain}</p>
                    </div>
                    <div
                      className="rounded-xl p-4 border"
                      style={{ borderColor: persona.color + "40", background: persona.color + "08" }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-extrabold" style={{ background: persona.color + "20", color: persona.color }}>✓</span>
                        <p className="text-[10px] font-extrabold tracking-widest uppercase" style={{ color: persona.color }}>How We Fix It</p>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 font-light leading-relaxed">{persona.solution}</p>
                    </div>
                  </div>

                  

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── INTEGRATIONS ─────────────────────────────────────────────────── */}
      {/* <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[10px] font-bold tracking-widest uppercase text-blue-600 dark:text-blue-500 mb-3">Integrations</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">Works With Your Stack</h2>
          <p className="text-base text-slate-500 dark:text-slate-400 font-light mb-12">200+ cloud services and tools, natively integrated.</p>
          <div className="flex flex-wrap gap-2.5 justify-center">
            {INTEGRATIONS.map((name) => (
              <div key={name} className="px-4 py-2 rounded-lg border text-sm font-semibold transition-all cursor-default border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800">{name}</div>
            ))}
            <div className="px-4 py-2 rounded-lg border text-sm font-semibold border-slate-100 dark:border-slate-800/50 text-slate-300 dark:text-slate-700">+185 more</div>
          </div>
        </div>
      </section> */}

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold tracking-widest uppercase text-blue-600 dark:text-blue-500 mb-3">Customer Stories</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Teams That Made the Switch</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="rounded-2xl border p-7 flex flex-col gap-5 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <Quote size={26} className="text-blue-200 dark:text-blue-900 flex-shrink-0" />
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light flex-1">{t.quote}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-blue-500 to-blue-700 text-white font-extrabold text-sm">{t.initial}</div>
                  <div>
                    <div className="text-sm font-bold">{t.company}</div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      {/* <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(59,130,246,0.07),transparent)] dark:bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(59,130,246,0.12),transparent)]" />
        <div className="relative max-w-2xl mx-auto text-center">
          <p className="text-[10px] font-bold tracking-widest uppercase text-blue-600 dark:text-blue-500 mb-6">Get Started</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-6">Your infra, fully automated .</h2>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-10">
            Start your free trial today. No credit card. No DevOps engineer needed. Production-ready infra in under an hour.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/trial" className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/25 hover:shadow-blue-600/40 transition-all hover:-translate-y-0.5">
              Start Free Trial <ArrowRight size={16} />
            </Link>
            <Link href="/contact" className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-blue-300 dark:hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400 transition-all hover:-translate-y-0.5">
              Schedule a Demo
            </Link>
          </div>
          <p className="mt-6 text-[10px] font-bold tracking-widest uppercase text-slate-300 dark:text-slate-700">
            ISO 27001 · AWS Select Partner · SOC 2 Ready
          </p>
        </div>
      </section> */}

    </div>
  );
}