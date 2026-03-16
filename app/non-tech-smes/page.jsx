"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Shield,
  Zap,
  TrendingUp,
  BarChart2,
  RefreshCw,
  Users,
  Globe,
  CheckCircle,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const FOR_YOU_IF = [
  {
    icon: "⟳",
    title: "Easy Migration",
    color: "#10b981",
    desc: "QuickInfra automates your application deployment and database migration — eliminating complexity, cutting costs, and saving time without a single ops ticket.",
  },
  {
    icon: "◈",
    title: "Your In-House Cloud Team",
    color: "#059669",
    desc: "Maintaining a cloud team is overwhelming. QuickInfra acts as your one-stop cloud solution, letting your IT staff skip the cloud hassle entirely.",
  },
  {
    icon: "$",
    title: "Cost-Effective Management",
    color: "#34d399",
    desc: "Manage and monitor your cloud infrastructure with ease. QuickInfra significantly lowers operational costs without requiring any cloud expertise in-house.",
  },
];

const WHY_QUICKINFRA = [
  {
    icon: Building2,
    title: "Simplify Cloud Migration",
    tag: "No-Code",
    color: "#10b981",
    desc: "Move to cloud from on-premises or data centre effortlessly. Say goodbye to complex application and database migration — hello to a seamless transition.",
  },
  {
    icon: Zap,
    title: "Accelerate Time-to-Market",
    tag: "Speed",
    color: "#059669",
    desc: "Our no-code solution enables rapid migration, reducing time-consuming tasks. Get applications up and running quickly — gaining competitive edge in the market.",
  },
  {
    icon: BarChart2,
    title: "Increase Cost Efficiency",
    tag: "FinOps",
    color: "#34d399",
    desc: "Optimise cloud resources with cost optimisation features. Automate storage and database backups, minimise waste, and save on unnecessary expenses.",
  },
  {
    icon: Users,
    title: "Empower Your IT Team",
    tag: "Upskilling",
    color: "#6ee7b7",
    desc: "Bridge the cloud skill gap. Your team leverages cloud benefits without extensive technical knowledge — embracing the cloud revolution without a steep curve.",
  },
  {
    icon: Globe,
    title: "Scale with Confidence",
    tag: "Multi-Region",
    color: "#10b981",
    desc: "Repeatable infrastructure creation across multiple regions allows seamless scalability. Expand to new markets and customers without worrying about cloud complexity.",
  },
  {
    icon: Shield,
    title: "Stay Secure & Compliant",
    tag: "DevSecOps",
    color: "#059669",
    desc: "Cloud migration handled with a keen eye on security, compliance, and governance. SOC 2, HIPAA, PCI-DSS enforced by default — complete peace of mind.",
  },
];

const METRICS = [
  {
    before: "12/mo",
    after: "0/mo",
    label: "Infra incidents",
    color: "#10b981",
  },
  {
    before: "Unpredictable",
    after: "Optimised",
    label: "Cloud spend",
    color: "#059669",
  },
  {
    before: "Months",
    after: "Days",
    label: "Migration time",
    color: "#34d399",
  },
  {
    before: "Expert needed",
    after: "No-code",
    label: "Technical requirement",
    color: "#6ee7b7",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Connect Your Infra",
    color: "#10b981",
    desc: "Link your on-premise servers or data centre. QuickInfra scans your existing applications and databases — no agents required.",
  },
  {
    step: "02",
    title: "Choose Your Cloud",
    color: "#059669",
    desc: "Pick AWS, Azure, GCP, or Oracle Cloud. QuickInfra handles the entire migration blueprint tailored to your workloads.",
  },
  {
    step: "03",
    title: "Automated Migration",
    color: "#34d399",
    desc: "No-code migration engine moves your apps and databases with zero downtime. Everything validated before cutover.",
  },
  {
    step: "04",
    title: "Managed Continuously",
    color: "#6ee7b7",
    desc: "Post-migration, QuickInfra monitors, optimises cost, and keeps your infra secure and compliant — around the clock.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "We had zero cloud expertise in-house. QuickInfra handled everything — we were on AWS in days, not months, with no disruption to operations.",
    company: "SalesGarners Marketing Pvt. Ltd.",
    role: "IT Manager",
    initial: "S",
    color: "#10b981",
  },
  {
    quote:
      "Our infrastructure incidents dropped from 12 a month to essentially zero after QuickInfra took over monitoring and management.",
    company: "Netsoftmate IT Solutions",
    role: "Managing Director",
    initial: "N",
    color: "#059669",
  },
  {
    quote:
      "We encourage every SME to make the switch. No DevOps team needed — QuickInfra is genuinely hassle-free cloud management.",
    company: "CloudAge",
    role: "Director",
    initial: "C",
    color: "#34d399",
  },
];

// ─── SME Dashboard Widget ──────────────────────────────────────────────────────

const INFRA_ITEMS = [
  {
    name: "Web Application",
    type: "EC2",
    region: "ap-south-1",
    status: "Healthy",
    cpu: 23,
    color: "#10b981",
  },
  {
    name: "MySQL Database",
    type: "RDS",
    region: "ap-south-1",
    status: "Healthy",
    cpu: 41,
    color: "#10b981",
  },
  {
    name: "File Storage",
    type: "S3",
    region: "us-east-1",
    status: "Healthy",
    cpu: 12,
    color: "#10b981",
  },
  {
    name: "Load Balancer",
    type: "ALB",
    region: "ap-south-1",
    status: "Healthy",
    cpu: 8,
    color: "#10b981",
  },
  {
    name: "Backup Service",
    type: "RDS",
    region: "ap-south-1",
    status: "Syncing",
    cpu: 67,
    color: "#f59e0b",
  },
];

const COST_DATA = [28, 34, 31, 29, 24, 21, 19];

function SMEDashboardWidget() {
  const [mounted, setMounted] = useState(false);
  const [activeLine, setActiveLine] = useState(0);
  const [savings, setSavings] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 120);
    return () => clearTimeout(t);
  }, []);

  // Cycle highlight through infra items
  useEffect(() => {
    if (!mounted) return;
    const iv = setInterval(
      () => setActiveLine((n) => (n + 1) % INFRA_ITEMS.length),
      1400,
    );
    return () => clearInterval(iv);
  }, [mounted]);

  // Count up savings
  useEffect(() => {
    if (!mounted) return;
    let n = 0;
    const iv = setInterval(() => {
      n += 47;
      if (n >= 18400) {
        setSavings(18400);
        clearInterval(iv);
        return;
      }
      setSavings(n);
    }, 30);
    return () => clearInterval(iv);
  }, [mounted]);

  const maxCost = Math.max(...COST_DATA);

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
        <div className="h-full flex flex-col rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-900 shadow-2xl shadow-emerald-500/10 dark:shadow-black/50">
          {/* Header */}
          <div className="flex-shrink-0 flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-emerald-600 via-emerald-600 to-teal-600">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
              </span>
              <span className="text-sm font-bold text-white tracking-tight">
                InfraOps Dashboard
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white/15 text-[10px] font-bold text-white border border-white/20">
                All Systems Healthy
              </span>
            </div>
          </div>

          {/* Cost savings card */}
          <div className="flex-shrink-0 px-4 pt-4 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                Monthly Cost Trend (₹K)
              </span>
              <div className="flex items-center gap-1.5">
                <TrendingUp size={11} className="text-emerald-500" />
                <span className="text-[10px] font-bold text-emerald-600">
                  −65% saved
                </span>
              </div>
            </div>
            {/* Mini bar chart */}
            <div className="flex items-end gap-1 h-10">
              {COST_DATA.map((v, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm transition-all duration-300"
                  style={{
                    height: `${(v / maxCost) * 100}%`,
                    background:
                      i === COST_DATA.length - 1
                        ? "#10b981"
                        : i < 2
                          ? "#ef444440"
                          : "#10b98140",
                  }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[8px] text-slate-400 font-mono">Jan</span>
              <span className="text-[8px] text-slateald-400 font-mono">
                Now
              </span>
            </div>
          </div>

          {/* Infra table */}
          <div className="flex-1 overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/30">
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 flex-1">
                Resource
              </span>
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 w-10">
                Type
              </span>
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 w-20 hidden sm:block">
                Region
              </span>
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 w-16 text-right">
                Status
              </span>
            </div>
            {INFRA_ITEMS.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-4 py-2.5 border-b border-slate-50 dark:border-slate-800/50 transition-all duration-300"
                style={{
                  background:
                    activeLine === i ? item.color + "08" : "transparent",
                }}
              >
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 truncate block">
                    {item.name}
                  </span>
                  {/* CPU mini bar */}
                  <div className="h-1 rounded-full bg-slate-100 dark:bg-slate-800 mt-1 w-16 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${item.cpu}%`,
                        background: item.cpu > 60 ? "#f59e0b" : "#10b981",
                      }}
                    />
                  </div>
                </div>
                <span
                  className="text-[9px] font-extrabold px-1.5 py-0.5 rounded w-10 text-center"
                  style={{ background: "#10b98115", color: "#10b981" }}
                >
                  {item.type}
                </span>
                <span className="text-[9px] font-mono text-slate-400 w-20 hidden sm:block truncate">
                  {item.region}
                </span>
                <span
                  className="text-[9px] font-bold px-1.5 py-0.5 rounded w-16 text-right"
                  style={{
                    color: item.status === "Healthy" ? "#10b981" : "#f59e0b",
                    background:
                      item.status === "Healthy" ? "#10b98115" : "#f59e0b15",
                  }}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>

          {/* Footer stat */}
          <div className="flex-shrink-0 border-t border-slate-100 dark:border-slate-800 px-4 py-3 bg-slate-50/60 dark:bg-slate-900/60">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                  Total Saved This Year
                </span>
                <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">
                  ₹{savings.toLocaleString("en-IN")}
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                  style={{ animation: "dashPulse 2s ease-in-out infinite" }}
                />
                <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400">
                  Managed 24/7
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function NonTechSMEsPage() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const metricsRef = useRef(null);

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

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[88vh] flex items-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-60 dark:opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(16,185,129,0.08),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(16,185,129,0.15),transparent)]" />

        <div className="relative max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-7 border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateY(0)" : "translateY(12px)",
                  transition: "opacity 0.6s ease, transform 0.6s ease",
                }}
              >
                <Building2
                  size={11}
                  className="text-emerald-600 dark:text-emerald-400"
                />
                <span className="text-xs font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
                  For Non-Tech SMEs
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
                Cloud without
                <br />
                <span className="text-emerald-600 dark:text-emerald-400">
                  a DevOps team.
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
                QuickInfra's no-code platform automates application and database
                migration, and cloud operations. Say goodbye to expensive,
                complex cloud migration — and hello to reduced costs,
                accelerated go-to-market, and satisfied customers.
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
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-600/25 hover:shadow-emerald-600/40 transition-all hover:-translate-y-0.5"
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
                  ["0", "DevOps hires needed"],
                  ["65%", "Cost reduction"],
                  ["24/7", "Managed support"],
                ].map(([v, l]) => (
                  <div key={l}>
                    <div className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                      {v}
                    </div>
                    <div className="text-xs text-slate-400 dark:text-slate-600 mt-0.5">
                      {l}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <SMEDashboardWidget />
          </div>
        </div>
      </section>

      {/* ── FOR YOU IF ───────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-3">
              Built for SMEs
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              QuickInfra is for you if
            </h2>
            <p className="text-base text-slate-500 dark:text-slate-400 font-light max-w-lg mx-auto">
              Three signs your business is ready to move to cloud — without the
              headache.
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
            <p className="text-[10px] font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-3">
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
            <p className="text-[10px] font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-3">
              Why QuickInfra
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Why Choose QuickInfra for Your Cloud?
            </h2>
            <p className="text-base text-slate-500 dark:text-slate-400 font-light max-w-lg mx-auto">
              Six reasons why non-tech SMEs trust QuickInfra to run their entire
              cloud operation.
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
                <h3 className="text-sm font-extrabold mb-2.5 leading-snug tracking-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
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

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-3">
              How It Works
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              From On-Premise to Cloud in Days
            </h2>
            <p className="text-base text-slate-500 dark:text-slate-400 font-light max-w-lg mx-auto">
              Four steps. No code. No DevOps hire. No disruption to your
              business.
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
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-3">
              Customer Stories
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              SMEs That Made the Move
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
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(16,185,129,0.07),transparent)] dark:bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(16,185,129,0.12),transparent)]" />
        <div className="relative max-w-2xl mx-auto text-center">
          <p className="text-[10px] font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-6">
            Get Started
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-6">
            Ready to transform your
            <br />
            cloud migration?
          </h2>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-10">
            No in-house expertise needed. No DevOps hire. No disruption to your
            business. Start a free trial and see how QuickInfra gets your SME to cloud
            — in days.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="https://console.quickinfra.cloud/"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-600/25 hover:shadow-emerald-600/40 transition-all hover:-translate-y-0.5"
            >
              Start Free Trial
              <ArrowRight size={16} />
            </Link>
          </div>
          <p className="mt-6 text-[10px] font-bold tracking-widest uppercase text-slate-300 dark:text-slate-700">
            ISO 27001 · AWS Select Partner · SOC 2 Ready
          </p>
        </div>
      </section>
    </div>
  );
}
