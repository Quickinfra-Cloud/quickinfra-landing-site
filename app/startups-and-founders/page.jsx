"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight, Rocket, Zap, Shield, RefreshCw,
  Cloud, BarChart2, Users, CheckCircle, TrendingUp,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const PAIN_POINTS = [
  { icon: "⟳", title: "Complex cloud setup",         desc: "Creating and migrating cloud infrastructure without a roadmap or the right tooling." },
  { icon: "◈", title: "No cloud expertise in-house",  desc: "Lack of technical cloud knowledge slows decisions and creates costly mistakes." },
  { icon: "👥", title: "No dedicated DevOps team",     desc: "Hiring senior DevOps engineers is expensive and takes months you don't have." },
  { icon: "$",  title: "Expensive deployments",        desc: "Cloud implementation costs spiral without the right architecture decisions upfront." },
  { icon: "⊠", title: "Inter-team dependencies",      desc: "Delays cascade when infra work blocks feature work across multiple teams." },
  { icon: "⚙", title: "Technical debt piling up",     desc: "OS and middleware debt accumulates quietly and becomes a crisis at scale." },
];

const WHY_QUICKINFRA = [
  {
    icon: Rocket,
    title: "Be Your Own DevOps Team",
    color: "#3b82f6",
    tag: "Self-Service",
    desc: "Replace traditional DevOps processes with QuickInfra's intuitive platform. Spend less time managing infrastructure, and more time building your product.",
  },
  {
    icon: Users,
    title: "Your Cloud Team On-Demand",
    color: "#8b5cf6",
    tag: "On-Demand",
    desc: "QuickInfra acts as an extension of your startup — cloud expertise without the overhead. Seamlessly integrate with your existing tech team from day one.",
  },
  {
    icon: Cloud,
    title: "Agile Deployment Anywhere",
    color: "#06b6d4",
    tag: "Multi-Cloud",
    desc: "Create, manage, and deploy any application on any cloud. Never get locked in — choose the best platform for each workload, always.",
  },
  {
    icon: TrendingUp,
    title: "Future-Proof Your Startup",
    color: "#10b981",
    tag: "Scalable",
    desc: "As you grow, QuickInfra evolves with you. Adopt multi-cloud strategies, add governance, compliance, and security features whenever you're ready.",
  },
  {
    icon: Zap,
    title: "Scale with Simplicity",
    color: "#f59e0b",
    tag: "Instant Scale",
    desc: "Respond to market demand instantly. Scale up or down with a few clicks, deploying new changes effortlessly without ops bottlenecks.",
  },
  {
    icon: Shield,
    title: "Secure & Compliant by Default",
    color: "#ef4444",
    tag: "DevSecOps",
    desc: "Infrastructure that's efficient and aligned to security and compliance best practices. SOC 2, HIPAA, PCI-DSS — your backend is robust from day one.",
  },
];

const METRICS = [
  { before: "3–6 weeks",  after: "4 hours",    label: "Cloud setup time",    color: "#3b82f6" },
  { before: "₹2.4L/mo",  after: "₹84K/mo",    label: "Infrastructure cost", color: "#10b981" },
  { before: "3+ hires",   after: "0 hires",     label: "DevOps headcount",   color: "#8b5cf6" },
  { before: "Weeks",      after: "Same day",    label: "First deployment",    color: "#f59e0b" },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Connect Your Cloud Account",  color: "#3b82f6", desc: "Link your AWS account in minutes. QuickInfra scans your existing setup and builds a complete picture of your infra." },
  { step: "02", title: "Pick Your Stack",             color: "#8b5cf6", desc: "Choose from battle-tested templates — EC2, ECS, RDS, S3, VPC, and more. Configured to your project's needs." },
  { step: "03", title: "Generate & Deploy",           color: "#10b981", desc: "QuickInfra auto-generates Terraform, sets up CI/CD, and deploys to production. Zero manual YAML. Zero ops tickets." },
  { step: "04", title: "Monitor & Optimise",          color: "#f59e0b", desc: "Continuous cost monitoring, drift detection, and automated scaling — so your infra runs itself while you ship." },
];

const TESTIMONIALS = [
  { quote: "We saved 70% on our AWS infrastructure costs. QuickInfra is the only reason we didn't need a full DevOps hire in our first year.", company: "SalesGarners Marketing", role: "IT Manager", initial: "S", color: "#3b82f6" },
  { quote: "We went from zero cloud setup to production in under a day. The automation is genuinely impressive.", company: "CloudAge", role: "Director", initial: "C", color: "#10b981" },
  { quote: "QuickInfra gave us the confidence to move fast without breaking things. Every startup should be using this.", company: "Netsoftmate IT", role: "Managing Director", initial: "N", color: "#8b5cf6" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function StartupsPage() {
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(99,102,241,0.08),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(99,102,241,0.15),transparent)]" />

        <div className="relative max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left */}
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-7 border border-indigo-200 dark:border-indigo-500/30 bg-indigo-50 dark:bg-indigo-500/10"
                style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(12px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
              >
                <Rocket size={11} className="text-indigo-600 dark:text-indigo-400" />
                <span className="text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">For Startups & Founders</span>
              </div>

              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.07] tracking-tight mb-6"
                style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(18px)", transition: "opacity 0.65s ease 0.08s, transform 0.65s ease 0.08s" }}
              >
                Launch fast.<br />
                <span className="text-indigo-600 dark:text-indigo-400">Grow faster.</span>
              </h1>

              <p
                className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-8 max-w-xl"
                style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(18px)", transition: "opacity 0.65s ease 0.16s, transform 0.65s ease 0.16s" }}
              >
                QuickInfra is every startup's cloud team. Replace traditional DevOps with a
                streamlined cloud management platform — deploy on any cloud, scale effortlessly,
                and ship compliant from day one.
              </p>

              <div
                className="flex flex-wrap gap-3 mb-10"
                style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(18px)", transition: "opacity 0.65s ease 0.24s, transform 0.65s ease 0.24s" }}
              >
                <Link
                  href="https://console.quickinfra.cloud/"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 transition-all hover:-translate-y-0.5"
                >
                  Start Free Trial <ArrowRight size={15} />
                </Link>
               
              </div>

              {/* Social proof */}
              <div
                className="flex flex-wrap gap-6"
                style={{ opacity: heroVisible ? 1 : 0, transition: "opacity 0.65s ease 0.32s" }}
              >
                {[["4 hrs", "Cloud setup"], ["65%", "Cost reduction"], ["0", "DevOps hires needed"]].map(([v, l]) => (
                  <div key={l}>
                    <div className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400">{v}</div>
                    <div className="text-xs text-slate-400 dark:text-slate-600 mt-0.5">{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — visual card */}
            <div
              style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s" }}
            >
              <div
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-2xl shadow-indigo-500/10 dark:shadow-black/40"
                
              >
                {/* Card header */}
                <div className="px-5 py-3.5 bg-linear-to-r from-indigo-600 via-indigo-600 to-violet-600 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
                    </span>
                    <span className="text-sm font-bold text-white tracking-tight">Startup Launchpad</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/15 text-[10px] font-bold text-white border border-white/20">Production Ready</span>
                  </div>
                </div>

                {/* Setup timeline */}
                <div className="p-5">
                  <p className="text-[9px] font-extrabold tracking-widest uppercase text-slate-400 dark:text-slate-600 mb-4">Setup Timeline</p>
                  <div className="space-y-2">
                    {[
                      { time: "0:00",  label: "Connect AWS account",           done: true,    color: "#6366f1" },
                      { time: "0:05",  label: "Select stack template",          done: true,    color: "#6366f1" },
                      { time: "0:12",  label: "Generate Terraform & CI/CD",     done: true,    color: "#6366f1" },
                      { time: "0:28",  label: "Security & compliance checks",   done: true,    color: "#6366f1" },
                      { time: "3:47",  label: "Deploy to production",           active: true,  color: "#10b981" },
                      { time: "4:00",  label: "First feature shipped 🚀",        done: false,   color: "#94a3b8" },
                    ].map(({ time, label, done, active, color }, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div
                          className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 text-[9px] font-extrabold"
                          style={{
                            background: done ? "#6366f115" : active ? "#10b98115" : "#f1f5f9",
                            color:      done ? "#6366f1"   : active ? "#10b981"   : "#94a3b8",
                            border:     `1px solid ${done ? "#6366f130" : active ? "#10b98130" : "#e2e8f0"}`,
                          }}
                        >
                          {done ? "✓" : active ? "▶" : "○"}
                        </div>
                        <div className="flex-1 flex items-center justify-between">
                          <span
                            className="text-[11px]"
                            style={{ color: done ? "#475569" : active ? "#0f172a" : "#94a3b8", fontWeight: active ? 700 : 500 }}
                          >
                            {label}
                          </span>
                          <span className="text-[9px] font-mono text-slate-400 dark:text-slate-600">{time}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom stat */}
                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400">Traditional setup</span>
                    <span className="text-[10px] font-bold text-red-400 line-through">3–6 weeks</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] text-slate-400">With QuickInfra</span>
                    <span className="text-[10px] font-extrabold text-green-500">4 hours</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── PAIN POINTS ──────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold tracking-widest uppercase text-red-500 dark:text-red-400 mb-3">Sound Familiar?</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">With QuickInfra, you stop worrying about</h2>
            <p className="text-base text-slate-500 dark:text-slate-400 font-light max-w-lg mx-auto">
              Six things that quietly kill startup velocity. All of them solved on day one.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PAIN_POINTS.map(({ icon, title, desc }, i) => {
              const colors = ["#ef4444", "#f59e0b", "#8b5cf6", "#ef4444", "#f59e0b", "#8b5cf6"];
              const color  = colors[i];
              return (
                <div key={title} className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 hover:-translate-y-1 transition-all hover:shadow-lg cursor-default relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(90deg, ${color}, ${color}44)` }} />
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 text-base font-extrabold" style={{ background: color + "12", color, border: `1.5px solid ${color}25` }}>
                    {icon}
                  </div>
                  <h3 className="text-sm font-extrabold mb-2 tracking-tight">{title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">{desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── BEFORE / AFTER METRICS ───────────────────────────────────────── */}
      <section ref={metricsRef} className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[10px] font-bold tracking-widest uppercase text-indigo-600 dark:text-indigo-400 mb-3">Real Impact</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Before vs After QuickInfra</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {METRICS.map(({ before, after, label, color }) => (
              <div
                key={label}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 text-center hover:-translate-y-1 transition-all hover:shadow-lg"
              >
                <div className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-600 mb-3">{label}</div>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-sm font-bold text-red-400 line-through">{before}</span>
                  <span className="text-slate-300 dark:text-slate-700 text-sm">→</span>
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
            <p className="text-[10px] font-bold tracking-widest uppercase text-indigo-600 dark:text-indigo-400 mb-3">Why QuickInfra</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">Built for Founders Who Move Fast</h2>
            <p className="text-base text-slate-500 dark:text-slate-400 font-light max-w-lg mx-auto">
              Six reasons why the world's fastest-moving startups choose QuickInfra over hiring a DevOps team.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY_QUICKINFRA.map(({ icon: Icon, title, color, tag, desc }) => (
              <div
                key={title}
                className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 hover:-translate-y-1 transition-all hover:shadow-lg cursor-default"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: color + "15", color, border: `1.5px solid ${color}30` }}>
                    <Icon size={18} />
                  </div>
                  <span className="text-[10px] font-extrabold tracking-widest uppercase text-slate-400 dark:text-slate-500">{tag}</span>
                </div>
                <h3 className="text-sm font-extrabold mb-2.5 leading-snug tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold tracking-widest uppercase text-indigo-600 dark:text-indigo-400 mb-3">How It Works</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">From Zero to Production in 4 Hours</h2>
            <p className="text-base text-slate-500 dark:text-slate-400 font-light max-w-lg mx-auto">
              Four steps. No YAML. No ops tickets. No DevOps hire needed.
            </p>
          </div>

          <div className="relative">
            {/* Connector line — desktop only */}
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {HOW_IT_WORKS.map(({ step, title, color, desc }) => (
                <div key={step} className="relative flex flex-col items-center text-center group">
                  {/* Step circle */}
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5 text-xl font-extrabold font-mono relative z-10 transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: color + "12",
                      color,
                      border: `2px solid ${color}30`,
                      boxShadow: `0 0 0 0 ${color}00`,
                    }}
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
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold tracking-widest uppercase text-indigo-600 dark:text-indigo-400 mb-3">What Founders Say</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Startups That Shipped Faster</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map(({ quote, company, role, initial, color }) => (
              <div key={company} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-7 flex flex-col gap-5 relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-0.5" style={{ background: `linear-gradient(90deg, ${color}, ${color}44)` }} />
                <div className="text-3xl font-serif text-slate-100 dark:text-slate-800 leading-none">"</div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light flex-1">{quote}</p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white font-extrabold text-sm"
                    style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}
                  >
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
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(99,102,241,0.07),transparent)] dark:bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(99,102,241,0.12),transparent)]" />
        <div className="relative max-w-2xl mx-auto text-center">
          <p className="text-[10px] font-bold tracking-widest uppercase text-indigo-600 dark:text-indigo-400 mb-6">Ready to Launch</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-6">
            Ready to transform your<br />cloud infrastructure?
          </h2>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-10">
            No credit card. No DevOps engineer needed. Production-ready infra in under 4 hours.
            Join the startups shipping faster with QuickInfra.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="https://console.quickinfra.cloud/"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/25 hover:shadow-indigo-600/40 transition-all hover:-translate-y-0.5"
            >
              Start Free Trial <ArrowRight size={16} />
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