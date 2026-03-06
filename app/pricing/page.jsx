"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Check, Minus, ChevronDown, Zap, Shield, Users, BarChart2 } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const PLANS = [
  {
    id: "freemium",
    name: "Freemium",
    price: { monthly: 0, annual: 0 },
    color: "#64748b",
    tag: null,
    desc: "Get started, explore the platform.",
    features: {
      infra: 1, cicd: 1, accounts: 1, users: 1,
      landingZone: false, managedService: false, devopsResource: null,
    },
    cta: "Start Free",
    ctaHref: "/trial",
    outline: true,
  },
  {
    id: "startup",
    name: "Startup",
    price: { monthly: 199, annual: 169 },
    color: "#3b82f6",
    tag: null,
    desc: "Perfect for small teams shipping fast.",
    features: {
      infra: 10, cicd: 10, accounts: 3, users: 3,
      landingZone: false, managedService: false, devopsResource: null,
    },
    cta: "Start Free Trial",
    ctaHref: "https://console.quickinfra.cloud/",
    outline: false,
  },
  {
    id: "growth",
    name: "Growth",
    price: { monthly: 1499, annual: 1274 },
    color: "#8b5cf6",
    tag: "Most Popular",
    desc: "Scale your team with managed DevOps.",
    features: {
      infra: 20, cicd: 20, accounts: 5, users: 10,
      landingZone: false, managedService: true, devopsResource: "Shared DevOps Resource",
    },
    cta: "Contact Sales",
    ctaHref: "/contact",
    outline: false,
  },
  {
    id: "business",
    name: "Business",
    price: { monthly: 2999, annual: 2549 },
    color: "#0ea5e9",
    tag: "Full Stack",
    desc: "Enterprise-grade infra, compliance & support.",
    features: {
      infra: 50, cicd: 50, accounts: 10, users: 20,
      landingZone: true, managedService: true, devopsResource: "Dedicated DevOps Resource",
    },
    cta: "Contact Sales",
    ctaHref: "/contact",
    outline: false,
  },
];

const FEATURE_SECTIONS = [
  {
    title: "Platform Limits",
    rows: [
      { label: "Deployment Infra",  key: "infra",    type: "number" },
      { label: "CI/CD Pipelines",   key: "cicd",     type: "number" },
      { label: "Cloud Accounts",    key: "accounts", type: "number" },
      { label: "User Logins",       key: "users",    type: "number" },
    ],
  },
  {
    title: "DevOps Infrastructure",
    rows: [
      { label: "Create Cloud Infrastructure", values: [true, true, true, true]  },
      { label: "Create CI/CD Pipelines",      values: [true, true, true, true]  },
      { label: "Deploy Application",          values: [true, true, true, true]  },
      { label: "Deploy Databases",            values: [false, true, true, true] },
      { label: "Manage OS & Middleware",      values: [false, true, true, true] },
    ],
  },
  {
    title: "Manage Infrastructure",
    rows: [
      { label: "Networks & Subnets",          values: [true,  true,  true,  true]  },
      { label: "Instances and Backups",       values: [true,  true,  true,  true]  },
      { label: "Disk Volumes",                values: [false, true,  true,  true]  },
      { label: "Database Backups",            values: [false, true,  true,  true]  },
      { label: "Custom Policies",             values: [false, false, true,  true]  },
      { label: "Custom Install Scripts",      values: [false, false, true,  true]  },
      { label: "Manage Landing Zone",         values: [false, false, false, true]  },
      { label: "Manage Org Units",            values: [false, false, false, true]  },
      { label: "Manage Cloud Accounts",       values: [false, false, true,  true]  },
    ],
  },
  {
    title: "Security, Governance & Compliance",
    rows: [
      { label: "PCI DSS",  values: [false, false, false, true] },
      { label: "CIS",      values: [false, false, false, true] },
      { label: "SOC 2",    values: [false, false, false, true] },
      { label: "NIST",     values: [false, false, false, true] },
      { label: "SIEM",     values: [false, false, false, true] },
    ],
  },
  {
    title: "Managed Service",
    rows: [
      { label: "Managed Service Add-on",  values: [false, false, true,  true]  },
      { label: "Shared DevOps Resource",  values: [false, false, true,  false] },
      { label: "Dedicated DevOps Resource", values: [false, false, false, true] },
    ],
  },
];

const SUPPORT_TIERS = [
  {
    name: "Standard",
    price: "$10/hr",
    color: "#3b82f6",
    items: [
      { label: "Cloud Requirement & Assessment", included: true  },
      { label: "Implementation & Migration",     included: true  },
      { label: "Infra Management & Monitoring",  included: true  },
      { label: "Response Time",                  value: "12 Hours" },
      { label: "Support Window",                 value: "16/5"     },
      { label: "Phone Support",                  included: false  },
      { label: "Email Support",                  included: true   },
    ],
  },
  {
    name: "Professional",
    price: "$20/hr",
    color: "#8b5cf6",
    popular: true,
    items: [
      { label: "Cloud Requirement & Assessment", included: true  },
      { label: "Implementation & Migration",     included: true  },
      { label: "Infra Management & Monitoring",  included: true  },
      { label: "Response Time",                  value: "4 Hours"  },
      { label: "Support Window",                 value: "24/7"     },
      { label: "Phone Support",                  included: true   },
      { label: "Email Support",                  included: true   },
    ],
  },
];

const FAQS = [
  {
    q: "Can I switch plans at any time?",
    a: "Yes. You can upgrade or downgrade your plan at any time. Changes take effect from the next billing cycle, and you'll be pro-rated for any difference.",
  },
  {
    q: "What does 'Deployment Infra' mean?",
    a: "Each Deployment Infra represents one provisioned cloud environment — a VPC, set of EC2 instances, RDS, and related resources. Think of it as one application stack on one cloud.",
  },
  {
    q: "Is a credit card required for the free trial?",
    a: "No. You can start the Freemium plan and the free trial with no credit card. You only need payment details when upgrading to a paid plan.",
  },
  {
    q: "What's included in the Managed Service add-on?",
    a: "The Managed Service add-on on Growth and Business plans includes a shared or dedicated DevOps resource who manages day-to-day infra operations, monitoring, patching, and incident response on your behalf.",
  },
  {
    q: "Do you offer annual billing discounts?",
    a: "Yes. Annual billing gives you approximately 15% off the monthly rate across all paid plans. Toggle to Annual on the pricing cards to see the discounted price.",
  },
];

// ─── FAQ Accordion ─────────────────────────────────────────────────────────────

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden transition-all"
      style={{ boxShadow: open ? "0 4px 20px rgba(59,130,246,0.07)" : "none" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left gap-4 focus:outline-none"
      >
        <span className="text-sm font-bold tracking-tight">{q}</span>
        <ChevronDown
          size={16}
          className="text-slate-400 flex-shrink-0 transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "200px" : "0px", opacity: open ? 1 : 0 }}
      >
        <p className="px-6 pb-5 text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

// ─── Feature cell ─────────────────────────────────────────────────────────────

function Cell({ value, color }) {
  if (value === true)  return <Check size={15} style={{ color }} className="mx-auto" />;
  if (value === false) return <Minus size={13} className="mx-auto text-slate-200 dark:text-slate-800" />;
  return <span className="text-xs font-bold" style={{ color }}>{value}</span>;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PricingPage() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [billing, setBilling] = useState("monthly"); // "monthly" | "annual"

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const price = (plan) =>
    billing === "annual" && plan.price.annual > 0
      ? plan.price.annual
      : plan.price.monthly;

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-slate-100 dark:border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-60 dark:opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(59,130,246,0.08),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(59,130,246,0.14),transparent)]" />

        <div className="relative max-w-3xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-7 border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10"
            style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(12px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
          >
            <Zap size={11} className="text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">Simple Pricing</span>
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.07] tracking-tight mb-6"
            style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(18px)", transition: "opacity 0.65s ease 0.08s, transform 0.65s ease 0.08s" }}
          >
            DevOps Automation<br />
            <span className="text-blue-600 dark:text-blue-400">at every scale.</span>
          </h1>

          <p
            className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-10 max-w-xl mx-auto"
            style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(18px)", transition: "opacity 0.65s ease 0.16s, transform 0.65s ease 0.16s" }}
          >
            Start free. Scale as you grow. All plans include the full QuickInfra platform —
            no hidden fees, no lock-in, cancel any time.
          </p>

          {/* Billing toggle */}
          <div
            className="inline-flex items-center gap-1 p-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900"
            style={{ opacity: heroVisible ? 1 : 0, transition: "opacity 0.65s ease 0.24s" }}
          >
            {["monthly", "annual"].map((b) => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold transition-all"
                style={{
                  background: billing === b ? "#3b82f6" : "transparent",
                  color:      billing === b ? "white"   : "#64748b",
                  boxShadow:  billing === b ? "0 2px 8px rgba(59,130,246,0.3)" : "none",
                }}
              >
                {b === "monthly" ? "Monthly" : (
                  <>Annual <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-md" style={{ background: billing === "annual" ? "rgba(255,255,255,0.2)" : "#dcfce7", color: billing === "annual" ? "white" : "#16a34a" }}>−15%</span></>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING CARDS ────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PLANS.map((plan) => {
              const isPopular = plan.tag === "Most Popular";
              return (
                <div
                  key={plan.id}
                  className="relative rounded-2xl border overflow-hidden flex flex-col transition-all hover:-translate-y-1 hover:shadow-2xl"
                  style={{
                    borderColor: isPopular ? plan.color + "60" : "#e2e8f0",
                    boxShadow:   isPopular ? `0 0 0 2px ${plan.color}30, 0 20px 48px ${plan.color}15` : "none",
                    background:  "white",
                  }}
                >
                  {/* Top stripe */}
                  <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${plan.color}, ${plan.color}88)` }} />

                  {/* Tag badge */}
                  {plan.tag && (
                    <div className="absolute top-4 right-4">
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold text-white" style={{ background: plan.color }}>
                        {plan.tag}
                      </span>
                    </div>
                  )}

                  <div className="p-6 flex flex-col flex-1">
                    {/* Plan header */}
                    <div className="mb-6">
                      <p className="text-[10px] font-extrabold uppercase tracking-widest mb-1" style={{ color: plan.color }}>{plan.name}</p>
                      <div className="flex items-end gap-1 mb-2">
                        <span className="text-4xl font-extrabold tracking-tight">
                          {price(plan) === 0 ? "Free" : `$${price(plan).toLocaleString()}`}
                        </span>
                        {price(plan) > 0 && <span className="text-sm text-slate-400 font-light mb-1">/mo</span>}
                      </div>
                      {billing === "annual" && plan.price.annual > 0 && (
                        <p className="text-[10px] text-slate-400">Billed annually · <span className="line-through text-slate-300">${plan.price.monthly}/mo</span></p>
                      )}
                      <p className="text-xs text-slate-400 font-light mt-1">{plan.desc}</p>
                    </div>

                    {/* Features */}
                    <div className="flex flex-col gap-3 mb-8 flex-1">
                      <p className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400">QuickInfra Platform</p>
                      {[
                        [`${plan.features.infra} Deployment Infra`],
                        [`${plan.features.cicd} CI/CD Pipelines`],
                        [`${plan.features.accounts} Cloud Account${plan.features.accounts > 1 ? "s" : ""}`],
                        [`${plan.features.users} User Login${plan.features.users > 1 ? "s" : ""}`],
                        ...(plan.features.landingZone ? [["Landing Zone (Security, Governance & Compliance)"]] : []),
                        ...(plan.features.managedService ? [["+ Managed Service"]] : []),
                        ...(plan.features.devopsResource ? [[plan.features.devopsResource]] : []),
                      ].map(([feat]) => (
                        <div key={feat} className="flex items-start gap-2.5">
                          <div className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: plan.color + "18" }}>
                            <Check size={10} style={{ color: plan.color }} />
                          </div>
                          <span className="text-xs text-slate-600 dark:text-slate-400 leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <Link
                      href={plan.ctaHref}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all hover:-translate-y-0.5"
                      style={
                        plan.outline
                          ? { border: `1.5px solid ${plan.color}40`, color: plan.color, background: plan.color + "08" }
                          : { background: plan.color, color: "white", boxShadow: `0 4px 16px ${plan.color}35` }
                      }
                    >
                      {plan.cta} {!plan.outline && <ArrowRight size={13} />}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Custom plan nudge */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-4 px-7 py-4 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
              <p className="text-sm text-slate-500 dark:text-slate-400 font-light">Need more than 50 infra deployments or a custom configuration?</p>
              <Link href="/contact" className="flex items-center gap-1.5 text-sm font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap hover:text-blue-500 transition-colors">
                Request a Quote <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURE COMPARISON TABLE ─────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[10px] font-bold tracking-widest uppercase text-blue-600 dark:text-blue-400 mb-3">Full Comparison</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Platform Features</h2>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-5 border-b border-slate-100 dark:border-slate-800 sticky top-0 bg-white dark:bg-slate-900 z-10">
              <div className="p-4 col-span-1" />
              {PLANS.map((plan) => (
                <div key={plan.id} className="p-4 text-center border-l border-slate-100 dark:border-slate-800">
                  <p className="text-[10px] font-extrabold uppercase tracking-widest" style={{ color: plan.color }}>{plan.name}</p>
                </div>
              ))}
            </div>

            {FEATURE_SECTIONS.map((section, si) => (
              <div key={section.title}>
                {/* Section header */}
                <div className="grid grid-cols-5 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                  <div className="p-3 pl-5 col-span-5">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400">{section.title}</span>
                  </div>
                </div>

                {section.rows.map((row, ri) => {
                  const isLast = ri === section.rows.length - 1 && si === FEATURE_SECTIONS.length - 1;
                  return (
                    <div
                      key={row.label}
                      className="grid grid-cols-5 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                      style={{ borderBottom: isLast ? "none" : "1px solid #f1f5f9" }}
                    >
                      <div className="px-5 py-3 text-xs text-slate-500 dark:text-slate-400 font-medium col-span-1 flex items-center">
                        {row.label}
                      </div>
                      {PLANS.map((plan, pi) => {
                        let val;
                        if (row.type === "number") {
                          val = plan.features[row.key];
                        } else {
                          val = row.values[pi];
                        }
                        return (
                          <div key={plan.id} className="py-3 flex items-center justify-center border-l border-slate-100 dark:border-slate-800">
                            {row.type === "number"
                              ? <span className="text-xs font-extrabold" style={{ color: plan.color }}>{val}</span>
                              : <Cell value={val} color={plan.color} />
                            }
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUPPORT TIERS ────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold tracking-widest uppercase text-blue-600 dark:text-blue-400 mb-3">Cloud Services</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">Support Options</h2>
            <p className="text-base text-slate-500 dark:text-slate-400 font-light max-w-lg mx-auto">
              Select the support tier that fits your response requirements and budget.
              Available as an add-on to any plan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {SUPPORT_TIERS.map((tier) => (
              <div
                key={tier.name}
                className="rounded-2xl border overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl"
                style={{
                  borderColor: tier.popular ? tier.color + "55" : "#e2e8f0",
                  boxShadow: tier.popular ? `0 0 0 2px ${tier.color}25` : "none",
                }}
              >
                <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${tier.color}, ${tier.color}88)` }} />
                <div className="p-6 bg-white dark:bg-slate-900">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[10px] font-extrabold uppercase tracking-widest" style={{ color: tier.color }}>{tier.name}</p>
                    {tier.popular && (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md text-white" style={{ background: tier.color }}>Recommended</span>
                    )}
                  </div>
                  <div className="text-3xl font-extrabold tracking-tight mb-5">{tier.price}</div>

                  <div className="flex flex-col gap-2.5">
                    {tier.items.map(({ label, included, value }) => (
                      <div key={label} className="flex items-center justify-between">
                        <span className="text-xs text-slate-500 dark:text-slate-400">{label}</span>
                        {value !== undefined
                          ? <span className="text-xs font-bold" style={{ color: tier.color }}>{value}</span>
                          : included
                            ? <Check size={13} style={{ color: tier.color }} />
                            : <Minus size={12} className="text-slate-200 dark:text-slate-700" />
                        }
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/contact"
                    className="mt-6 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5"
                    style={{ background: tier.color, boxShadow: `0 4px 14px ${tier.color}35` }}
                  >
                    Get Started <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[10px] font-bold tracking-widest uppercase text-blue-600 dark:text-blue-400 mb-3">FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">Pricing Questions</h2>
            <p className="text-base text-slate-500 dark:text-slate-400 font-light max-w-lg mx-auto">
              Everything you need to know before picking a plan.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {FAQS.map(({ q, a }) => <FAQItem key={q} q={q} a={a} />)}
          </div>
          <p className="text-center text-sm text-slate-400 mt-8 font-light">
            More questions?{" "}
            <a href="mailto:support@quickinfracloud.com" className="font-bold text-blue-600 dark:text-blue-400 hover:text-blue-500 transition-colors">
              Email our team
            </a>
          </p>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-slate-100 dark:border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(59,130,246,0.07),transparent)] dark:bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(59,130,246,0.12),transparent)]" />
        <div className="relative max-w-2xl mx-auto text-center">
          <p className="text-[10px] font-bold tracking-widest uppercase text-blue-600 dark:text-blue-400 mb-6">Get Started Today</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-6">
            Ready to transform your<br />cloud migration?
          </h2>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-10">
            Start with Freemium, no credit card needed. Upgrade when you're ready.
            Our team is available to help you pick the right plan for your scale.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="https://console.quickinfra.cloud/"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-white shadow-xl shadow-blue-600/25 hover:shadow-blue-600/40 transition-all hover:-translate-y-0.5 bg-blue-600 hover:bg-blue-500"
            >
              Start Free Trial <ArrowRight size={16} />
            </Link>
            
          </div>
          <p className="mt-6 text-[10px] font-bold tracking-widest uppercase text-slate-300 dark:text-slate-700">
            No Credit Card · Cancel Anytime · ISO 27001 Certified
          </p>
        </div>
      </section>

    </div>
  );
}