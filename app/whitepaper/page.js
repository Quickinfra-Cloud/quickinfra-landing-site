"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Download, FileText, BookOpen, Shield, Cloud, Zap, LayoutGrid } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const WHITEPAPERS = [
  {
    id:          "cloud-devops",
    title:       "Cloud Automated DevOps",
    subtitle:    "QuickInfra Platform Overview",
    description: "A deep-dive into how QuickInfra automates the full DevOps lifecycle — from infrastructure provisioning to CI/CD pipelines — and what that means for engineering velocity at scale.",
    tag:         "DevOps",
    icon:        Zap,
    color:       "#3b82f6",
    filename:    "QuickInfra-Cloud-Automated-DevOps-1.2.pdf",
    version:     "v1.2",
    image:       "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80",
    featured:    true,
  },
  {
    id:          "security-compliance",
    title:       "Achieving 100% Security Compliance in Cloud Infrastructure",
    subtitle:    "Security & Compliance Guide",
    description: "How QuickInfra bakes SOC 2, HIPAA, PCI-DSS, and GDPR controls directly into every deployment — so compliance is a default configuration, not an afterthought.",
    tag:         "Security",
    icon:        Shield,
    color:       "#10b981",
    filename:    "QuickInfra-Achieving-100-Security-Compliance-in-Cloud-Infrastructure-1.pdf",
    version:     "Edition 1",
    image:       "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    featured:    false,
  },
  {
    id:          "devops-mistakes",
    title:       "Top 10 Costly DevOps Mistakes to Avoid in 2024",
    subtitle:    "Industry Report",
    description: "The most expensive infrastructure and DevOps pitfalls engineering teams fall into — and the concrete steps to avoid them before they cost you time, money, and uptime.",
    tag:         "Best Practices",
    icon:        BookOpen,
    color:       "#f59e0b",
    filename:    "QuickInfra-Top-10-Costly-DevOps-Mistakes-to-Avoid-in-2024.pdf",
    version:     "2024 Edition",
    image:       "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    featured:    false,
  },
  {
    id:          "cto-guide",
    title:       "Best Practices for Cloud Deployments",
    subtitle:    "A Guide for CTOs and Product Managers",
    description: "A practical playbook for technical leaders making cloud architecture and deployment decisions — covering cost optimisation, team structure, tooling selection, and long-term scalability.",
    tag:         "Leadership",
    icon:        LayoutGrid,
    color:       "#8b5cf6",
    filename:    "Best-practices-for-cloud-deployments-A-guide-for-CTOs-and-Product-Managers.pdf",
    version:     "CTO Edition",
    image:       "https://images.unsplash.com/photo-1573164713712-03790a178651?w=800&q=80",
    featured:    false,
  },
  {
    id:          "solution-brief",
    title:       "QuickInfra Solution Brief",
    subtitle:    "Platform Summary",
    description: "A concise overview of the QuickInfra platform — capabilities, integrations, compliance posture, and the business case for adopting an automated InfraOps solution.",
    tag:         "Overview",
    icon:        Cloud,
    color:       "#06b6d4",
    filename:    "QuickInfra_Solution-Brief-.pdf",
    version:     "Latest",
    image:       "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    featured:    false,
  },
];

const TAGS = ["All", ...Array.from(new Set(WHITEPAPERS.map((w) => w.tag)))];

// ─── Featured Card ────────────────────────────────────────────────────────────

function FeaturedCard({ paper, visible }) {
  const Icon = paper.icon;
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="group rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-300 dark:hover:border-blue-700 transition-all hover:shadow-xl hover:shadow-blue-500/8 hover:-translate-y-1"
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease, transform 0.6s ease, box-shadow 0.2s, border-color 0.2s, translate 0.2s",
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Cover */}
        <div className="relative h-60 sm:h-72 lg:h-full min-h-[280px] overflow-hidden">
          {!imgError ? (
            <Image
              src={paper.image}
              alt={paper.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImgError(true)}
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: `linear-gradient(140deg, ${paper.color}40, ${paper.color}15)` }}
            >
              <Icon size={48} style={{ color: paper.color + "80" }} />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-transparent" />
          <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
            <span className="px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase bg-blue-600 text-white shadow-lg shadow-blue-600/30">
              Featured
            </span>
            <span
              className="px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase text-white"
              style={{ background: paper.color + "cc" }}
            >
              {paper.tag}
            </span>
          </div>
        </div>

        {/* Copy */}
        <div className="p-7 sm:p-9 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: paper.color + "15", color: paper.color }}
              >
                <Icon size={15} />
              </div>
              <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">{paper.subtitle}</span>
              <span
                className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-md"
                style={{ background: paper.color + "15", color: paper.color }}
              >
                {paper.version}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-snug mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {paper.title}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light mb-8 line-clamp-3">
              {paper.description}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`/whitepapers/${paper.filename}`}
              download
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:-translate-y-0.5"
              style={{ background: paper.color, color: "#fff", boxShadow: `0 4px 14px ${paper.color}35` }}
            >
              <Download size={14} /> Download PDF
            </a>
            <a
              href={`/whitepapers/${paper.filename}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600 transition-all"
            >
              <FileText size={14} /> View
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Whitepaper Card ──────────────────────────────────────────────────────────

function WhitepaperCard({ paper, index, visible }) {
  const Icon = paper.icon;
  const [imgError, setImgError] = useState(false);
  const delay = 80 + (index % 3) * 60;

  return (
    <div
      className="group flex flex-col rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-300 dark:hover:border-blue-700 transition-all hover:shadow-xl hover:shadow-blue-500/8 hover:-translate-y-1"
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms, box-shadow 0.2s, border-color 0.2s, translate 0.2s`,
      }}
    >
      {/* Cover */}
      <div className="relative h-44 overflow-hidden flex-shrink-0">
        {!imgError ? (
          <Image
            src={paper.image}
            alt={paper.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: `linear-gradient(140deg, ${paper.color}30, ${paper.color}10)` }}
          >
            <Icon size={36} style={{ color: paper.color + "70" }} />
          </div>
        )}
        <div className="absolute top-3 left-3 z-10">
          <span
            className="text-[9px] font-extrabold tracking-widest uppercase px-2 py-0.5 rounded-md backdrop-blur-sm text-white"
            style={{ background: paper.color + "cc" }}
          >
            {paper.tag}
          </span>
        </div>
        <div className="absolute top-3 right-3 z-10">
          <span className="text-[9px] font-extrabold tracking-widest uppercase px-2 py-0.5 rounded-md bg-black/50 backdrop-blur-sm text-white/80">
            PDF
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-2 mb-3">
          <div
            className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: paper.color + "15", color: paper.color }}
          >
            <Icon size={12} />
          </div>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium truncate">{paper.subtitle}</span>
          <span
            className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded flex-shrink-0"
            style={{ background: paper.color + "12", color: paper.color }}
          >
            {paper.version}
          </span>
        </div>

        <h3 className="text-[15px] font-extrabold tracking-tight leading-snug mb-2.5 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-1">
          {paper.title}
        </h3>

        <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed font-light mb-4 line-clamp-2">
          {paper.description}
        </p>

        <div className="flex items-center gap-2 mt-auto pt-3.5 border-t border-slate-100 dark:border-slate-800">
          <a
            href={`/whitepapers/${paper.filename}`}
            download
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all hover:-translate-y-0.5 flex-1 justify-center"
            style={{ background: paper.color, color: "#fff", boxShadow: `0 4px 12px ${paper.color}30` }}
          >
            <Download size={11} /> Download
          </a>
          <a
            href={`/whitepapers/${paper.filename}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-[11px] font-bold border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600 transition-all"
          >
            <FileText size={11} /> View
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Tag Pill ─────────────────────────────────────────────────────────────────

function TagPill({ label, active, onClick, color }) {
  return (
    <button
      onClick={onClick}
      className="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border"
      style={
        active
          ? { background: color || "#3b82f6", color: "#fff", borderColor: color || "#3b82f6", boxShadow: `0 4px 12px ${color || "#3b82f6"}35` }
          : { background: "transparent", color: "#64748b", borderColor: "#e2e8f0" }
      }
    >
      {label}
    </button>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WhitepapersPage() {
  const [visible,      setVisible]      = useState(false);
  const [activeTag,    setActiveTag]    = useState("All");
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 150);
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

  const filtered     = activeTag === "All" ? WHITEPAPERS : WHITEPAPERS.filter((w) => w.tag === activeTag);
  const featured     = filtered.find((w) => w.featured);
  const showFeatured = activeTag === "All" && featured;
  const gridPapers   = showFeatured ? filtered.filter((w) => !w.featured) : filtered;
  const tagColorMap  = Object.fromEntries(WHITEPAPERS.map((w) => [w.tag, w.color]));

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">

      {/* HERO */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,rgba(59,130,246,0.07),transparent)] dark:bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,rgba(59,130,246,0.14),transparent)]" />

        <div className="relative max-w-3xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-7 border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(10px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
          >
            <BookOpen size={12} className="text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">Resource Library</span>
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.07] tracking-tight mb-5"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.7s ease 80ms, transform 0.7s ease 80ms" }}
          >
            Whitepapers &<br />
            <span className="text-blue-600 dark:text-blue-500">Guides</span>
          </h1>

          <p
            className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-light max-w-xl mx-auto"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(12px)", transition: "opacity 0.7s ease 160ms, transform 0.7s ease 160ms" }}
          >
            In-depth technical resources, industry reports, and platform guides to help your team make better infrastructure decisions.
          </p>
        </div>
      </section>

      {/* STATS */}
      <div ref={statsRef} className="border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 py-7">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { val: `${WHITEPAPERS.length}`, label: "Resources Published" },
            { val: TAGS.length - 1,          label: "Topics Covered"     },
            { val: "Free",                   label: "Always"             },
            { val: "PDF",                    label: "Format"             },
          ].map(({ val, label }, i) => (
            <div key={label}>
              <div
                className="text-2xl font-extrabold tracking-tight mb-1 transition-colors duration-700"
                style={{ color: statsVisible ? "#3b82f6" : undefined, transitionDelay: `${i * 90}ms` }}
              >
                {val}
              </div>
              <div className="text-xs font-medium text-slate-400 dark:text-slate-500">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Tag filters */}
          <div
            className="flex flex-wrap gap-2 mb-10"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(8px)", transition: "opacity 0.6s ease 300ms, transform 0.6s ease 300ms" }}
          >
            {TAGS.map((tag) => (
              <TagPill
                key={tag}
                label={tag}
                active={activeTag === tag}
                color={tag === "All" ? "#3b82f6" : tagColorMap[tag]}
                onClick={() => setActiveTag(tag)}
              />
            ))}
          </div>

          {/* Featured */}
          {showFeatured && (
            <div className="mb-10">
              <FeaturedCard paper={featured} visible={visible} />
            </div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {gridPapers.map((paper, i) => (
              <WhitepaperCard key={paper.id} paper={paper} index={i} visible={visible} />
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-[10px] font-bold tracking-widest uppercase text-blue-600 dark:text-blue-500 mb-4">Ready to Go Further?</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">See QuickInfra in Action</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-8 max-w-lg mx-auto">
            Reading is a start — but nothing beats seeing automated InfraOps running live on your own stack.
          </p>
          <Link
            href="https://console.quickinfra.cloud/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all hover:-translate-y-0.5"
          >
            Start Free Trial <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <div className="border-t border-slate-100 dark:border-slate-800 py-8 px-4 text-center">
        <p className="text-[10px] font-bold tracking-widest uppercase text-slate-300 dark:text-slate-700">
          ISO/IEC 27001 · AWS Qualified Software · SOC 2 Ready
        </p>
      </div>

    </div>
  );
}