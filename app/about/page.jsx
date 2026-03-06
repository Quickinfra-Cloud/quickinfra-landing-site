"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Mail, Phone, Linkedin } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { value: "65%", label: "Cost Savings", sub: "on cloud DevOps spend" },
  {
    value: "80%",
    label: "Faster Deployments",
    sub: "vs manual pipeline setup",
  },
  {
    value: "4x",
    label: "Dev Productivity",
    sub: "engineers freed from ops work",
  },
  {
    value: "100%",
    label: "Compliant by Default",
    sub: "SOC 2, HIPAA, PCI-DSS built-in",
  },
];

const VALUES = [
  {
    icon: "⚡",
    title: "Innovation",
    desc: "Always striving for groundbreaking solutions. We ship ideas that didn't exist last quarter.",
  },
  {
    icon: "⊕",
    title: "Integrity",
    desc: "Transparent, honest, and ethical in every customer relationship and internal decision.",
  },
  {
    icon: "◈",
    title: "Collaboration",
    desc: "Open communication, pooled expertise. The best infra solutions come from teams that talk.",
  },
  {
    icon: "◎",
    title: "Customer-Centricity",
    desc: "Every feature we build starts with a real customer pain. User feedback drives our roadmap.",
  },
  {
    icon: "✦",
    title: "Accountability",
    desc: "We own our decisions — the wins and the mistakes. That's how trust is built.",
  },
  {
    icon: "⟳",
    title: "Adaptability",
    desc: "Cloud moves fast. We stay agile and responsive so our customers never get left behind.",
  },
];

const TEAM = [
  {
    name: "Nayil Kazi",
    role: "Founder & CEO",
    tag: "Sales · Strategy · Vision",
    color: "#3b82f6",
    initial: "NK",
    bio: "A seasoned sales and marketing expert with a robust track record in enterprise software. Co-founded QuickInfra to bridge the significant skill gap in the cloud domain.",
  },
  {
    name: "Sudarshan Jadhav",
    role: "Senior Engineer",
    tag: "Full-Stack · Cloud-Native ",
    color: "#8b5cf6",
    initial: "SJ",
    bio: "Engineering professional who excels in product development, full-stack engineering, and cloud-native architectures. Transforms complex challenges into user-focused solutions.",
  },
  {
    name: "Dhiraj Dagabaj",
    role: "Senior Engineer",
    tag: "Cloud Infrastructure · DevOps ",
    color: "#f59e0b",
    initial: "DD",
    bio: "Technology leader with hands-on experience in cloud infrastructure and cloud-native application development. Builds the reliable, scalable systems that power QuickInfra.",
  },
  {
    name: "Feroz Khan",
    role: "Chief Technology Advisor",
    tag: "Advisory Board · 25+ yrs exp",
    color: "#10b981",
    initial: "FK",
    bio: "25+ years building enterprise-grade applications. Formerly led the Cloud CoE at NTT Data. His vision: automate cloud processes to make adoption easy for every organisation.",
  },
  {
    name: "Asad Khan",
    role: "Business Strategy Advisor",
    tag: "Advisory Board · LambdaTest CEO",
    color: "#ef4444",
    initial: "AK",
    bio: "Co-founder and CEO of LambdaTest. Guides QuickInfra's strategic direction with deep market understanding and a proven track record in testing and automation.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Landing Zone",
    sub: "Security, Governance & Compliance",
    desc: "Build secure, compliant cloud environments rapidly using our Customised Landing Zone — built on AWS Control Tower best practices.",
    color: "#6366f1",
  },
  {
    step: "02",
    title: "Infrastructure Creation",
    sub: "Templates. Configured. Deployed.",
    desc: "Extensive library of customisable templates let you configure and deploy your full DevOps infra on the cloud in minutes, not weeks.",
    color: "#3b82f6",
  },
  {
    step: "03",
    title: "Deploy Application & Data",
    sub: "Error-free. Every time.",
    desc: "Ready-to-use deployment templates ensure quick, error-free rollout of new software and updates across all your environments.",
    color: "#8b5cf6",
  },
  {
    step: "04",
    title: "Infrastructure Management",
    sub: "Automate everything after launch",
    desc: "Powerful automation for VMs, networks, instances, backups, and policies. Comprehensive control, maximum uptime, minimal ops overhead.",
    color: "#10b981",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "We saved 70% on our AWS cloud infrastructure management costs using QuickInfra.",
    company: "SalesGarners Marketing Pvt. Ltd.",
    role: "IT Manager",
    initial: "S",
  },
  {
    quote:
      "QuickInfra significantly reduced migration time and effort with its end-to-end automation platform.",
    company: "Netsoftmate IT Solutions",
    role: "Managing Director",
    initial: "N",
  },
  {
    quote:
      "We encourage all startups to switch to QuickInfra for a hassle-free DevOps experience.",
    company: "CloudAge",
    role: "Director",
    initial: "C",
  },
];

// ─── Counter hook ─────────────────────────────────────────────────────────────

function useCountUp(target, active, duration = 1200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const num = parseFloat(target.replace(/[^0-9.]/g, ""));
    const steps = 40;
    const step = num / steps;
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setVal(i >= steps ? num : +(step * i).toFixed(1));
      if (i >= steps) clearInterval(iv);
    }, duration / steps);
    return () => clearInterval(iv);
  }, [active]);
  const suffix = target.replace(/[0-9.]/g, "");
  return `${val}${suffix}`;
}

function StatCard({ value, label, sub, active }) {
  const display = useCountUp(value, active);
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 text-center hover:-translate-y-1 transition-all hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-lg hover:shadow-blue-500/5">
      <div
        className={`text-4xl sm:text-5xl font-extrabold tracking-tight mb-2 transition-colors duration-700 ${active ? "text-blue-600 dark:text-blue-500" : "text-slate-200 dark:text-slate-700"}`}
      >
        {active ? display : value}
      </div>
      <div className="font-bold text-sm mb-1">{label}</div>
      <div className="text-xs font-light text-slate-400 dark:text-slate-600">
        {sub}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  const [statsVisible, setStatsVisible] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
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

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-60 dark:opacity-40" />
        {/* Blue glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(59,130,246,0.09),transparent)] dark:bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(59,130,246,0.15),transparent)]" />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8 border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">
              Our Story
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
            Faster, Smarter,{" "}
            <span className="text-blue-600 dark:text-blue-500">
              and Economical
            </span>{" "}
            DevOps
          </h1>

          <p
            className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-10 max-w-2xl mx-auto"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(18px)",
              transition:
                "opacity 0.65s ease 0.16s, transform 0.65s ease 0.16s",
            }}
          >
            At QuickInfra, our mission is to revolutionise how businesses deploy
            and manage cloud environments — automating the complexities of
            DevOps so companies can focus on innovation, not infrastructure.
          </p>

          <div
            className="flex flex-wrap gap-3 justify-center"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(18px)",
              transition:
                "opacity 0.65s ease 0.24s, transform 0.65s ease 0.24s",
            }}
          >
            <Link
              href="https://console.quickinfra.cloud/"
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all hover:-translate-y-0.5"
            >
              Start Free Trial <ArrowRight size={15} />
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-blue-300 dark:hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400 transition-all hover:-translate-y-0.5"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────────── */}
      <section
        ref={statsRef}
        className="py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {STATS.map((s) => (
              <StatCard key={s.label} {...s} active={statsVisible} />
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION ──────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left — text */}
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-blue-600 dark:text-blue-500 mb-4">
                Who We Are
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-6">
                Built to close the{" "}
                <span className="text-blue-600 dark:text-blue-500">
                  cloud skills gap
                </span>
              </h2>
              <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed font-light mb-5">
                Cloud adoption is accelerating but the gap between what teams
                need and what they can actually build is growing. Most companies
                spend more time managing infrastructure than building product.
              </p>
              <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed font-light mb-8">
                QuickInfra was founded to solve that. We built a platform that
                automates the entire infrastructure layer — provisioning,
                compliance, CI/CD, monitoring — so organisations of all sizes
                can move fast without a dedicated ops team.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  "AWS Select Partner with proven cloud expertise",
                  "Serving startups, engineering teams, and enterprise SMEs",
                  "Headquartered in Pune, India — serving clients globally",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-md bg-blue-50 dark:bg-blue-600/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[10px] font-extrabold text-blue-600 dark:text-blue-400">
                        ✓
                      </span>
                    </div>
                    <span className="text-sm text-slate-600 dark:text-slate-400 font-light leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — visual card */}
            <div className="relative">
              {/* Main card */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-2xl shadow-slate-200/60 dark:shadow-black/40">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-extrabold text-sm shadow-lg shadow-blue-500/30">
                    QI
                  </div>
                  <div>
                    <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                      QuickInfra
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      DevOps & InfraOps Automation
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {[
                    {
                      label: "Cloud Accounts Managed",
                      value: "Multi-region",
                      color: "#3b82f6",
                    },
                    {
                      label: "Compliance Frameworks",
                      value: "SOC2 · HIPAA · PCI-DSS",
                      color: "#10b981",
                    },
                    {
                      label: "Partner Status",
                      value: "AWS Select Partner",
                      color: "#f59e0b",
                    },
                    {
                      label: "Support",
                      value: "24 / 7 InfraOps",
                      color: "#8b5cf6",
                    },
                  ].map(({ label, value, color }) => (
                    <div
                      key={label}
                      className="flex items-center justify-between py-2.5 border-b border-slate-100 dark:border-slate-800 last:border-0"
                    >
                      <span className="text-xs text-slate-500 dark:text-slate-500">
                        {label}
                      </span>
                      <span className="text-xs font-bold" style={{ color }}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                      Platform Status
                    </span>
                  </div>
                  <div className="text-xs font-bold text-green-600 dark:text-green-400">
                    All systems operational
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 px-3 py-2 rounded-xl bg-blue-600 text-white text-[10px] font-extrabold shadow-lg shadow-blue-600/30 border border-blue-500">
                ISO 27001 Certified
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[10px] font-bold tracking-widest uppercase text-blue-600 dark:text-blue-500 mb-3">
              Platform
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              How QuickInfra Empowers Teams
            </h2>
            <p className="text-base text-slate-500 dark:text-slate-400 font-light max-w-xl mx-auto">
              Four integrated layers that take you from blank AWS account to
              fully automated, monitored, compliant cloud in hours.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {HOW_IT_WORKS.map(({ step, title, sub, desc, color }) => (
              <div
                key={step}
                className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-7 transition-all hover:-translate-y-1 hover:shadow-lg cursor-default"
                style={{ "--hover-border": color + "55" }}
              >
                <div className="flex items-start gap-4 mb-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-extrabold font-mono"
                    style={{
                      background: color + "15",
                      color,
                      border: `1.5px solid ${color}30`,
                    }}
                  >
                    {step}
                  </div>
                  <div>
                    <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                      {title}
                    </div>
                    <div
                      className="text-[11px] font-medium mt-0.5"
                      style={{ color }}
                    >
                      {sub}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                  {desc}
                </p>
                <div
                  className="mt-5 h-0.5 rounded-full w-0 group-hover:w-full transition-all duration-500"
                  style={{
                    background: `linear-gradient(90deg, ${color}, ${color}44)`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[10px] font-bold tracking-widest uppercase text-blue-600 dark:text-blue-500 mb-3">
              Culture
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              The Values That Guide Us
            </h2>
            <p className="text-base text-slate-500 dark:text-slate-400 font-light max-w-lg mx-auto">
              Seeking people who resonate with our core beliefs, yet bring their
              own distinct flavour. That's when the magic happens.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALUES.map(({ icon, title, desc }, i) => {
              const colors = [
                "#6366f1",
                "#3b82f6",
                "#8b5cf6",
                "#10b981",
                "#f59e0b",
                "#ef4444",
              ];
              const color = colors[i % colors.length];
              return (
                <div
                  key={title}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 hover:-translate-y-1 transition-all hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-lg hover:shadow-blue-500/5 cursor-default"
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
                  <h3 className="text-sm font-extrabold mb-2 tracking-tight">
                    {title}
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

      {/* ── TEAM ─────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[10px] font-bold tracking-widest uppercase text-blue-600 dark:text-blue-500 mb-3">
              The People
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Meet Our Team
            </h2>
            <p className="text-base text-slate-500 dark:text-slate-400 font-light max-w-lg mx-auto">
              A small, opinionated team of engineers and strategists who've
              spent years in the cloud.
            </p>
          </div>

          {/* Core team — 3 col */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
            {TEAM.slice(0, 3).map(
              ({ name, role, tag, color, initial, bio }) => (
                <div
                  key={name}
                  className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-7 hover:-translate-y-1 transition-all hover:shadow-xl cursor-default overflow-hidden relative"
                >
                  {/* Top colour stripe */}
                  <div
                    className="absolute top-0 inset-x-0 h-0.5 transition-all duration-300"
                    style={{
                      background: `linear-gradient(90deg, ${color}, ${color}55)`,
                    }}
                  />

                  <div className="flex items-center gap-4 mb-5">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 text-lg font-extrabold text-white shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${color}, ${color}cc)`,
                        boxShadow: `0 8px 20px ${color}30`,
                      }}
                    >
                      {initial}
                    </div>
                    <div>
                      <div className="text-sm font-extrabold tracking-tight">
                        {name}
                      </div>
                      <div
                        className="text-xs font-bold mt-0.5"
                        style={{ color }}
                      >
                        {role}
                      </div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-600 mt-0.5">
                        {tag}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                    {bio}
                  </p>
                </div>
              ),
            )}
          </div>

          {/* Advisory board — 2 col centered */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {TEAM.slice(3).map(({ name, role, tag, color, initial, bio }) => (
              <div
                key={name}
                className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-7 hover:-translate-y-1 transition-all hover:shadow-xl cursor-default overflow-hidden relative"
              >
                <div
                  className="absolute top-0 inset-x-0 h-0.5"
                  style={{
                    background: `linear-gradient(90deg, ${color}, ${color}55)`,
                  }}
                />
                <div className="flex items-center gap-4 mb-5">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 text-lg font-extrabold text-white shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${color}, ${color}cc)`,
                      boxShadow: `0 8px 20px ${color}30`,
                    }}
                  >
                    {initial}
                  </div>
                  <div>
                    <div className="text-sm font-extrabold tracking-tight">
                      {name}
                    </div>
                    <div className="text-xs font-bold mt-0.5" style={{ color }}>
                      {role}
                    </div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-600 mt-0.5">
                      {tag}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                  {bio}
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
            <p className="text-[10px] font-bold tracking-widest uppercase text-blue-600 dark:text-blue-500 mb-3">
              Customer Stories
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              What Our Customers Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.company}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-7 flex flex-col gap-5"
              >
                <div className="text-3xl text-blue-200 dark:text-blue-900 font-serif leading-none">
                  "
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light flex-1">
                  {t.quote}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-blue-500 to-blue-700 text-white font-extrabold text-sm">
                    {t.initial}
                  </div>
                  <div>
                    <div className="text-sm font-bold">{t.company}</div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                      {t.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT / CTA ────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left — CTA */}
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-blue-600 dark:text-blue-500 mb-4">
                Get in Touch
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-5">
                Want to know more
                <br />
                about QuickInfra?
              </h2>
              <p className="text-base text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-8">
                Whether you're evaluating the platform, planning a migration, or
                just want to understand how automation can work for your team —
                we're happy to talk.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all hover:-translate-y-0.5"
                >
                  Contact Us <ArrowRight size={15} />
                </Link>
                <Link
                  href="https://console.quickinfra.cloud/"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-blue-300 dark:hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400 transition-all hover:-translate-y-0.5"
                >
                  Start Free Trial
                </Link>
              </div>
            </div>

            {/* Right — contact details */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8">
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-600/10 flex items-center justify-center flex-shrink-0 text-blue-600 dark:text-blue-500">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest mb-1">
                      Office
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      Clover Hills Plaza, Office No. 523, 5th Floor,
                      <br />
                      NIBM-Undri Road, Kondhwa, Pune – 411048
                    </div>
                  </div>
                </div>
                <div className="h-px bg-slate-100 dark:bg-slate-800" />
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-600/10 flex items-center justify-center flex-shrink-0 text-blue-600 dark:text-blue-500">
                    <Mail size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest mb-1">
                      Email
                    </div>
                    <a
                      href="mailto:info@quickinfracloud.com"
                      className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline"
                    >
                      info@quickinfracloud.com
                    </a>
                  </div>
                </div>
                <div className="h-px bg-slate-100 dark:bg-slate-800" />
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-600/10 flex items-center justify-center flex-shrink-0 text-blue-600 dark:text-blue-500">
                    <Phone size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest mb-1">
                      Phone
                    </div>
                    <a
                      href="tel:+912044473448"
                      className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline"
                    >
                      +91 20 4447 3448
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
