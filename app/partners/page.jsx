"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight, Handshake, TrendingUp, Users, Globe,
  BarChart2, Shield, Zap, Award, Star, CheckCircle,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const PARTNER_TYPES = [
  {
    id: "technology",
    title: "Technology Partners",
    tag: "Integrate & Innovate",
    icon: Zap,
    color: "#f97316",
    headline: "Optimize, Integrate, and Innovate",
    desc: "Partner with QuickInfra to elevate your technological offerings. Integrate our advanced cloud solutions to optimize performance, innovate with automated DevOps, and extend your reach.",
    perks: ["API & platform integrations", "Co-developed solution bundles", "Technical co-innovation sprints", "Priority engineering support"],
    cta: "Become a Technology Partner",
  },
  {
    id: "solution",
    title: "Solution Partners",
    tag: "Consult & Architect",
    icon: Globe,
    color: "#3b82f6",
    headline: "Consult, Architect, and Excel",
    desc: "Boost your software and cloud services with QuickInfra's tools. Provide top-tier cloud infrastructure designs that ensure client success, scalability, and agile transformation.",
    perks: ["Architecture blueprint library", "Joint client engagements", "Deal registration program", "Pre-sales technical support"],
    cta: "Become a Solution Partner",
  },
  {
    id: "reseller",
    title: "Reseller Partners",
    tag: "Market & Expand",
    icon: TrendingUp,
    color: "#10b981",
    headline: "Market, Expand, and Prosper",
    desc: "Grow your portfolio by reselling QuickInfra's services. Benefit from competitive margins, dedicated support, and acknowledgment in our Reseller Success Program.",
    perks: ["Competitive reseller margins", "Dedicated channel manager", "Reseller Success Program", "Co-branded marketing assets"],
    cta: "Become a Reseller Partner",
  },
];

const CLOUD_PARTNERS = [
  { name: "AWS",   full: "Amazon Web Services", tag: "Select Partner",  color: "#f59e0b" },
  { name: "Azure", full: "Microsoft Azure",     tag: "Full Support",    color: "#3b82f6" },
  { name: "GCP",   full: "Google Cloud",        tag: "Full Support",    color: "#10b981" },
  { name: "OCI",   full: "Oracle Cloud",        tag: "Oracle Cloud",    color: "#ef4444" },
];

const PROGRAM_BENEFITS = [
  {
    icon: Globe,
    title: "Amplify Business Growth",
    color: "#f97316",
    desc: "Leverage QuickInfra's expansive network to access new markets and enrich your service portfolio — delivering exceptional value to your customers.",
  },
  {
    icon: Users,
    title: "Boost Client Satisfaction",
    color: "#3b82f6",
    desc: "Integrate our innovative solutions to offer unparalleled service quality — driving loyalty and long-term client relationships that compound over time.",
  },
  {
    icon: Shield,
    title: "Robust Support System",
    color: "#10b981",
    desc: "Comprehensive support from specialised training to advanced technical assistance, co-marketing campaigns, and collaborative sales strategies.",
  },
];

const WHY_PARTNER = [
  {
    icon: Zap,
    title: "Comprehensive Cloud Solutions",
    color: "#f97316",
    desc: "Expand your portfolio with cutting-edge cloud automation and compliance solutions. Fast cloud assessment and implementation automation for end-to-end client delivery.",
  },
  {
    icon: Star,
    title: "Joint Marketing & Credibility",
    color: "#3b82f6",
    desc: "Co-branded marketing activities, events, and digital campaigns that boost visibility and lead generation. Align with QuickInfra's reputation for high-quality delivery.",
  },
  {
    icon: CheckCircle,
    title: "Tailored Flexibility",
    color: "#8b5cf6",
    desc: "Flexible approach ensuring solutions fit each client's unique architecture. A tested suite of products for migration, DevOps, and management across all use cases.",
  },
  {
    icon: Users,
    title: "Expert Support & Growth",
    color: "#10b981",
    desc: "Access expert technical and sales support for seamless operations. Regular training sessions and webinars equip your team with the skills for continuous growth.",
  },
  {
    icon: TrendingUp,
    title: "Enhanced Market Reach & Revenue",
    color: "#f59e0b",
    desc: "Boost revenue using our industry-agnostic, security-first platform. Access new markets and create additional revenue opportunities with quick ROI for clients.",
  },
  {
    icon: Award,
    title: "Sustainable Partner Development",
    color: "#ef4444",
    desc: "Committed to sustainable growth for every partner. Measurable benefits that lead to sustainable business improvements — profitable and built for the long term.",
  },
];

const PARTNER_STATS = [
  { value: "50+",  label: "Active Partners",    color: "#f97316" },
  { value: "30+",  label: "Countries Reached",  color: "#3b82f6" },
  { value: "95%",  label: "Partner Retention",  color: "#10b981" },
  { value: "3×",   label: "Avg Revenue Growth", color: "#8b5cf6" },
];

// ─── Partner Dashboard Widget ─────────────────────────────────────────────────

const PARTNER_ACTIVITY = [
  { company: "NovaTech Solutions",   type: "Deal Registered",     value: "₹4.2L",  color: "#f97316", time: "2m ago"  },
  { company: "CloudBridge IT",       type: "Client Onboarded",    value: "+1",     color: "#10b981", time: "11m ago" },
  { company: "Skyline Systems",      type: "Commission Earned",   value: "₹68K",   color: "#3b82f6", time: "34m ago" },
  { company: "Apex Cloud Consult",   type: "Deal Registered",     value: "₹9.8L",  color: "#f97316", time: "1h ago"  },
  { company: "InfraEdge Partners",   type: "MDF Approved",        value: "₹1.2L",  color: "#8b5cf6", time: "3h ago"  },
];

const TIER_DATA = [
  { label: "Technology",  count: 18, color: "#f97316", pct: 36 },
  { label: "Solution",    count: 21, color: "#3b82f6", pct: 42 },
  { label: "Reseller",    count: 11, color: "#10b981", pct: 22 },
];

function PartnerWidget() {
  const [mounted,     setMounted]     = useState(false);
  const [activeLine,  setActiveLine]  = useState(0);
  const [revenue,     setRevenue]     = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 120);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const iv = setInterval(() => setActiveLine((n) => (n + 1) % PARTNER_ACTIVITY.length), 1500);
    return () => clearInterval(iv);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    let n = 0;
    const iv = setInterval(() => {
      n += 12300;
      if (n >= 4600000) { setRevenue(4600000); clearInterval(iv); return; }
      setRevenue(n);
    }, 30);
    return () => clearInterval(iv);
  }, [mounted]);

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
      <div className="h-full" style={{ animation: "float 5s ease-in-out infinite", willChange: "transform" }}>
        <div className="h-full flex flex-col rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-900 shadow-2xl shadow-orange-500/10 dark:shadow-black/50">

          {/* Header */}
          <div className="shrink-0 flex items-center justify-between px-5 py-3.5 bg-linear-to-r from-orange-500 via-orange-500 to-rose-500">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
              </span>
              <span className="text-sm font-bold text-white tracking-tight">Partner Portal · Live</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-white/15 text-[10px] font-bold text-white border border-white/20">FY 2025–26</span>
          </div>

          {/* Revenue + tier breakdown */}
          <div className="shrink-0 px-4 py-3.5 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-end justify-between mb-3">
              <div>
                <p className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 mb-0.5">Partner-Driven Revenue</p>
                <div className="text-2xl font-extrabold text-orange-500 tabular-nums">
                  ₹{(revenue / 100000).toFixed(1)}L
                </div>
              </div>
              <div className="text-right">
                <p className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 mb-0.5">Partners</p>
                <div className="text-2xl font-extrabold text-slate-700 dark:text-slate-200">50</div>
              </div>
            </div>
            {/* Tier bars */}
            <div className="flex gap-1 h-2 rounded-full overflow-hidden">
              {TIER_DATA.map(({ label, color, pct }) => (
                <div key={label} className="rounded-full" style={{ width: `${pct}%`, background: color }} title={label} />
              ))}
            </div>
            <div className="flex gap-4 mt-2">
              {TIER_DATA.map(({ label, color, count }) => (
                <div key={label} className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full" style={{ background: color }} />
                  <span className="text-[9px] text-slate-500 font-semibold">{label} ({count})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Activity feed */}
          <div className="flex-1 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/20">
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 flex-1">Recent Activity</span>
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400">Time</span>
            </div>

            {PARTNER_ACTIVITY.map(({ company, type, value, color, time }, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-4 py-2.5 border-b border-slate-50 dark:border-slate-800/50 transition-all duration-300"
                style={{ background: activeLine === i ? color + "08" : "transparent" }}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-extrabold"
                  style={{ background: color + "15", color, border: `1px solid ${color}25` }}
                >
                  {company[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300 truncate">{company}</div>
                  <div className="text-[9px] text-slate-400 mt-0.5">{type}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-[11px] font-extrabold" style={{ color }}>{value}</div>
                  <div className="text-[9px] text-slate-400 mt-0.5">{time}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex-shrink-0 border-t border-slate-100 dark:border-slate-800 px-4 py-2.5 bg-slate-50/60 dark:bg-slate-900/60 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400" style={{ animation: "dashPulse 2s ease-in-out infinite" }} />
              <span className="text-[9px] font-bold text-orange-500">Partner network growing</span>
            </div>
            <span className="text-[9px] font-bold text-slate-400">95% retention rate ✦</span>
          </div>

        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PartnersPage() {
  const [heroVisible,  setHeroVisible]  = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [activeType,   setActiveType]   = useState(0);
  const [typeVisible,  setTypeVisible]  = useState(true);
  const statsRef  = useRef(null);
  const cycleRef  = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsVisible(true); },
      { threshold: 0.2 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const startCycle = () => {
    if (cycleRef.current) clearInterval(cycleRef.current);
    cycleRef.current = setInterval(() => {
      setTypeVisible(false);
      setTimeout(() => {
        setActiveType((p) => (p + 1) % PARTNER_TYPES.length);
        setTypeVisible(true);
      }, 280);
    }, 4500);
  };

  useEffect(() => {
    startCycle();
    return () => clearInterval(cycleRef.current);
  }, []);

  const switchType = (i) => {
    if (i === activeType) return;
    setTypeVisible(false);
    setTimeout(() => { setActiveType(i); setTypeVisible(true); }, 280);
    startCycle();
  };

  const active = PARTNER_TYPES[activeType];

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[88vh] flex items-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-60 dark:opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(249,115,22,0.08),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(249,115,22,0.15),transparent)]" />

        <div className="relative max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-7 border border-orange-200 dark:border-orange-500/30 bg-orange-50 dark:bg-orange-500/10"
                style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(12px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
              >
                <Handshake size={11} className="text-orange-600 dark:text-orange-400" />
                <span className="text-xs font-bold tracking-widest text-orange-600 dark:text-orange-400 uppercase">Partner Programme</span>
              </div>

              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.07] tracking-tight mb-6"
                style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(18px)", transition: "opacity 0.65s ease 0.08s, transform 0.65s ease 0.08s" }}
              >
                Grow together<br />
                <span className="text-orange-500 dark:text-orange-400">with QuickInfra.</span>
              </h1>

              <p
                className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-8 max-w-xl"
                style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(18px)", transition: "opacity 0.65s ease 0.16s, transform 0.65s ease 0.16s" }}
              >
                Join forces with QuickInfra to level up your cloud service offerings and secure a
                competitive edge. Leverage our cloud solutions to deliver fully automated DevOps,
                fast migration, and significant cost savings to your clients.
              </p>

              <div
                className="flex flex-wrap gap-3 mb-10"
                style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(18px)", transition: "opacity 0.65s ease 0.24s, transform 0.65s ease 0.24s" }}
              >
                <Link
                  href="/contact"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-orange-500 hover:bg-orange-400 text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all hover:-translate-y-0.5"
                >
                  Become a Partner <ArrowRight size={15} />
                </Link>
                
              </div>

              <div
                className="flex flex-wrap gap-6"
                style={{ opacity: heroVisible ? 1 : 0, transition: "opacity 0.65s ease 0.32s" }}
              >
                {[["50+", "Active partners"], ["95%", "Retention rate"], ["3×", "Avg revenue growth"]].map(([v, l]) => (
                  <div key={l}>
                    <div className="text-sm font-extrabold text-orange-500 dark:text-orange-400">{v}</div>
                    <div className="text-xs text-slate-400 dark:text-slate-600 mt-0.5">{l}</div>
                  </div>
                ))}
              </div>
            </div>

            <PartnerWidget />
          </div>
        </div>
      </section>

      {/* ── PARTNER STATS BAR ────────────────────────────────────────────── */}
      <section ref={statsRef} className="border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {PARTNER_STATS.map(({ value, label, color }) => (
              <div key={label} className="text-center">
                <div
                  className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-1 transition-colors duration-700"
                  style={{ color: statsVisible ? color : "#e2e8f0" }}
                >
                  {value}
                </div>
                <div className="text-sm font-bold text-slate-600 dark:text-slate-400">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNER TYPES ────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold tracking-widest uppercase text-orange-500 dark:text-orange-400 mb-3">Partnership Types</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">Flexible Opportunities for Every Partner</h2>
            <p className="text-base text-slate-500 dark:text-slate-400 font-light max-w-lg mx-auto">
              Three partnership models designed to fit exactly where you are in your growth journey.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start">
            {/* Type tabs */}
            <div className="lg:col-span-2 flex flex-col gap-2.5">
              {PARTNER_TYPES.map(({ id, title, tag, icon: Icon, color }, i) => {
                const isActive = activeType === i;
                return (
                  <button
                    key={id}
                    onClick={() => switchType(i)}
                    className="w-full text-left rounded-2xl border p-4 transition-all duration-300 focus:outline-none"
                    style={{
                      background:  isActive ? color + "0d" : "white",
                      borderColor: isActive ? color + "55" : "#e2e8f0",
                      boxShadow:   isActive ? `0 8px 24px ${color}18` : "none",
                      transform:   isActive ? "translateX(4px)" : "translateX(0)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
                        style={{
                          background: isActive ? color + "18" : "#f1f5f9",
                          color:      isActive ? color : "#94a3b8",
                          border:     `1.5px solid ${isActive ? color + "35" : "#e2e8f0"}`,
                        }}
                      >
                        <Icon size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-extrabold uppercase tracking-widest mb-0.5" style={{ color: isActive ? color : "#94a3b8" }}>{tag}</div>
                        <div className="text-sm font-extrabold tracking-tight" style={{ color: isActive ? "#0f172a" : "#64748b" }}>{title}</div>
                      </div>
                      <div className="w-1 h-7 rounded-full flex-shrink-0 transition-all duration-300" style={{ background: isActive ? color : "transparent" }} />
                    </div>
                    {isActive && (
                      <div className="mt-3 h-0.5 rounded-full overflow-hidden" style={{ background: color + "20" }}>
                        <div key={activeType} className="h-full rounded-full" style={{ background: color, animation: "personaProgress 4.5s linear forwards" }} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Detail card */}
            <div className="lg:col-span-3">
              <div
                className="rounded-2xl border bg-white dark:bg-slate-900 overflow-hidden"
                style={{
                  borderColor: active.color + "30",
                  boxShadow:   `0 20px 48px ${active.color}12`,
                  opacity:     typeVisible ? 1 : 0,
                  transform:   typeVisible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.985)",
                  transition:  "opacity 0.32s cubic-bezier(0.16,1,0.3,1), transform 0.32s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${active.color}, ${active.color}55)` }} />
                <div className="p-7 sm:p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: active.color + "15", border: `2px solid ${active.color}25`, color: active.color }}>
                      <active.icon size={26} />
                    </div>
                    <div>
                      <div className="text-[10px] font-extrabold uppercase tracking-widest mb-1" style={{ color: active.color }}>{active.tag}</div>
                      <h3 className="text-xl font-extrabold tracking-tight">{active.headline}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-6">{active.desc}</p>
                  <div className="space-y-2.5 border-t border-slate-100 dark:border-slate-800 pt-5 mb-6">
                    {active.perks.map((perk) => (
                      <div key={perk} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: active.color + "20" }}>
                          <span className="text-[9px] font-extrabold" style={{ color: active.color }}>✓</span>
                        </div>
                        <span className="text-sm text-slate-600 dark:text-slate-400">{perk}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5"
                    style={{ background: active.color, boxShadow: `0 4px 16px ${active.color}35` }}
                  >
                    {active.cta} <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLOUD PARTNERS ───────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[10px] font-bold tracking-widest uppercase text-orange-500 dark:text-orange-400 mb-3">Collaborative Excellence</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Cloud Alliances</h2>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            {CLOUD_PARTNERS.map(({ name, full, tag, color }) => (
              <div
                key={name}
                className="flex items-center gap-3 px-6 py-4 rounded-2xl border bg-white dark:bg-slate-900 hover:-translate-y-1 transition-all hover:shadow-lg cursor-default"
                style={{ borderColor: color + "30" }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-sm" style={{ background: color + "15", color, border: `1.5px solid ${color}30` }}>
                  {name.slice(0, 2)}
                </div>
                <div>
                  <div className="text-sm font-extrabold">{full}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{tag}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROGRAMME BENEFITS ───────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold tracking-widest uppercase text-orange-500 dark:text-orange-400 mb-3">Partner Programme</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">A Programme That Keeps Your Growth First</h2>
            <p className="text-base text-slate-500 dark:text-slate-400 font-light max-w-lg mx-auto">
              Three pillars of the QuickInfra partner programme — built to make your growth as the priority.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {PROGRAM_BENEFITS.map(({ icon: Icon, title, color, desc }) => (
              <div
                key={title}
                className="rounded-2xl border bg-white dark:bg-slate-900 p-7 hover:-translate-y-1 transition-all hover:shadow-xl cursor-default overflow-hidden relative"
                style={{ borderColor: color + "30" }}
              >
                <div className="absolute top-0 inset-x-0 h-0.5" style={{ background: `linear-gradient(90deg, ${color}, ${color}44)` }} />
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6" style={{ background: color + "15", color, border: `2px solid ${color}25` }}>
                  <Icon size={22} />
                </div>
                <h3 className="text-base font-extrabold mb-3 tracking-tight">{title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY PARTNER ──────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold tracking-widests uppercase text-orange-500 dark:text-orange-400 mb-3">Why Partner</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">Why Partner with QuickInfra?</h2>
            <p className="text-base text-slate-500 dark:text-slate-400 font-light max-w-lg mx-auto">
              Six reasons why the fastest-growing cloud resellers and solution providers choose QuickInfra.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY_PARTNER.map(({ icon: Icon, title, color, desc }) => (
              <div key={title} className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 hover:-translate-y-1 transition-all hover:shadow-lg cursor-default">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: color + "15", color, border: `1.5px solid ${color}30` }}>
                  <Icon size={18} />
                </div>
                <h3 className="text-sm font-extrabold mb-2.5 leading-snug tracking-tight group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors">{title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(249,115,22,0.07),transparent)] dark:bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(249,115,22,0.12),transparent)]" />
        <div className="relative max-w-2xl mx-auto text-center">
          <p className="text-[10px] font-bold tracking-widest uppercase text-orange-500 dark:text-orange-400 mb-6">Let's Grow Together</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-6">
            Ready to make us your<br />growth partner?
          </h2>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-10">
            Join 50+ technology, solution, and reseller partners who are growing faster with
            QuickInfra. Get in touch and we'll match you to the right partnership model.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold bg-orange-500 hover:bg-orange-400 text-white shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 transition-all hover:-translate-y-0.5">
              Become a Partner <ArrowRight size={16} />
            </Link>
           
          </div>
          <p className="mt-6 text-[10px] font-bold tracking-widest uppercase text-slate-300 dark:text-slate-700">
            ISO 27001 · AWS Select Partner · 95% Partner Retention
          </p>
        </div>
      </section>

    </div>
  );
}