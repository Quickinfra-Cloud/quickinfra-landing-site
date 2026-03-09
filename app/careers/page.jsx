"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Linkedin, Mail, ExternalLink, ChevronDown } from "lucide-react";

// ─── Team members in hierarchy order ─────────────────────────────────────────

const TEAM = [
  {
    id: "nayil",
    name: "Nayil Kazi",
    role: "Co-Founder & CEO",
    color: "#3b82f6",
    gradFrom: "#1d4ed8",
    gradTo: "#3b82f6",
    initials: "NK",
    tier: "founder",
    bio: "A seasoned sales and business development leader with a track record across enterprise software and SaaS. Co-founded QuickInfra to bridge the cloud skills gap and make DevOps automation accessible to every team — regardless of in-house expertise.",
    tags: ["GTM Strategy", "Enterprise Sales", "B2B SaaS", "Cloud Partnerships"],
    prev: ["NatWest Group", "Salesify", "Mlogica"],
    linkedin: "https://www.linkedin.com/in/nayil/",
    email: "info@quickinfracloud.com",
  },
  {
    id: "feroz",
    name: "Feroz Khan",
    role: "Co-Founder & CTO",
    color: "#6366f1",
    gradFrom: "#4338ca",
    gradTo: "#818cf8",
    initials: "FK",
    tier: "founder",
    bio: "25+ years building enterprise-grade applications. Formerly led the Cloud Centre of Excellence at NTT Data. At QuickInfra, drives the platform vision — automating IaC generation, cloud provisioning, and DevOps pipelines end to end.",
    tags: ["Cloud Architecture", "IaC / Terraform", "AWS", "Platform Engineering"],
    prev: ["NTT Data — Cloud CoE Lead", "Enterprise Software"],
    linkedin: "#",
    email: "info@quickinfracloud.com",
  },
  {
    id: "asad",
    name: "Asad Khan",
    role: "Advisory Board Member",
    color: "#f59e0b",
    gradFrom: "#b45309",
    gradTo: "#fbbf24",
    initials: "AK",
    tier: "advisory",
    badge: "LambdaTest — CEO",
    bio: "Co-founder and CEO of LambdaTest. Guides QuickInfra's strategic direction with deep expertise in SaaS scaling, testing automation, and product growth. His insights help QuickInfra build for enterprise-scale without enterprise-scale complexity.",
    tags: ["SaaS Scaling", "Product Strategy", "Testing Automation"],
    prev: ["LambdaTest (Co-founder & CEO)"],
    linkedin: "#",
  },
  {
    id: "sudarshan",
    name: "Sudarshan Jadhav",
    role: "Senior Engineer",
    sub: "Full-Stack · Cloud-Native",
    color: "#8b5cf6",
    gradFrom: "#6d28d9",
    gradTo: "#a78bfa",
    initials: "SJ",
    tier: "engineer",
    bio: "Builds and maintains the QuickInfra console and cloud-native services. Owns the full product stack from API layer to React frontend — making complex infra operations feel intuitive for end users.",
    tags: ["React", "Node.js", "Cloud-Native", "REST APIs", "PostgreSQL"],
    linkedin: "#",
  },
  {
    id: "dhiraj",
    name: "Dhiraj Dagabaj",
    role: "Senior Engineer",
    sub: "Cloud Infrastructure · DevOps",
    color: "#0ea5e9",
    gradFrom: "#0369a1",
    gradTo: "#38bdf8",
    initials: "DD",
    tier: "engineer",
    bio: "Manages the infrastructure backbone of QuickInfra — Terraform modules, Kubernetes clusters, and CI/CD pipelines powering customer cloud environments. Deep AWS and DevOps engineering expertise.",
    tags: ["Terraform", "Kubernetes", "AWS", "CI/CD", "Ansible"],
    linkedin: "#",
  },
  {
    id: "hr",
    name: "HR Manager",
    role: "People & Culture",
    sub: "Open Role",
    color: "#ef4444",
    gradFrom: "#b91c1c",
    gradTo: "#f87171",
    initials: "+",
    tier: "hiring",
    bio: "We are building our people function from the ground up. Looking for someone passionate about hiring, culture, and scaling a high-trust team at an early-stage cloud startup in Pune.",
    tags: ["Hiring Now"],
    hiringHref: "mailto:hr@quickinfracloud.com?subject=Application: HR Manager — QuickInfra",
  },
];

// ─── Connector labels (between card[i] and card[i+1]) ────────────────────────
const CONNECTOR_LABELS = [null, "Advisory Board", null, null, null];

// ─── Avatar ───────────────────────────────────────────────────────────────────

function Avatar({ member, size = 72 }) {
  const br = Math.round(size * 0.22);
  const fs = Math.round(size * 0.26);
  const isHiring = member.tier === "hiring";

  if (isHiring) return (
    <div className="flex-shrink-0 flex items-center justify-center"
      style={{
        width: size, height: size, borderRadius: br,
        background: `repeating-linear-gradient(45deg,${member.color}14 0,${member.color}14 4px,transparent 4px,transparent 12px)`,
        border: `2px dashed ${member.color}55`,
      }}>
      <span style={{ color: member.color, fontSize: fs + 6, fontWeight: 900, opacity: 0.65 }}>+</span>
    </div>
  );

  return (
    <div className="relative flex-shrink-0 flex items-center justify-center"
      style={{
        width: size, height: size, borderRadius: br,
        background: `linear-gradient(145deg, ${member.gradFrom}, ${member.gradTo})`,
        boxShadow: `0 8px 28px ${member.color}35`,
        border: `2px solid ${member.color}25`,
      }}>
      <span style={{ color: "#fff", fontSize: fs, fontWeight: 900, letterSpacing: "-0.02em" }}>{member.initials}</span>
      <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-slate-950"
        style={{ background: "#22c55e" }}>
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-50" />
      </span>
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function MemberCard({ member, side, visible, delay }) {
  const [open, setOpen] = useState(false);
  const isHiring = member.tier === "hiring";

  return (
    <div
      className="rounded-3xl border overflow-hidden bg-white dark:bg-slate-900 transition-shadow duration-300 hover:shadow-2xl"
      style={{
        borderColor: member.color + "28",
        boxShadow: `0 4px 20px ${member.color}0d`,
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateX(0) translateY(0)"
          : `translateX(${side === "left" ? -28 : 28}px) translateY(10px)`,
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {/* top bar */}
      <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${member.gradFrom}, ${member.gradTo}, ${member.color}44)` }} />

      <div className="relative p-6 sm:p-8 overflow-hidden">
        {/* dot grid bg */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.025] dark:opacity-[0.05]"
          style={{ backgroundImage: `radial-gradient(${member.color} 1px, transparent 1px)`, backgroundSize: "20px 20px" }} />

        <div className="relative">
          {/* Header */}
          <div className="flex items-start gap-5 mb-5">
            <Avatar member={member} size={68} />
            <div className="flex-1 min-w-0 pt-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h3 className="text-lg font-extrabold tracking-tight">{member.name}</h3>
                {member.badge && (
                  <span className="text-[9px] font-extrabold px-2.5 py-0.5 rounded-full"
                    style={{ background: member.color + "16", color: member.color, border: `1px solid ${member.color}30` }}>
                    {member.badge}
                  </span>
                )}
                {isHiring && (
                  <span className="text-[9px] font-extrabold px-2.5 py-0.5 rounded-full animate-pulse"
                    style={{ background: member.color + "16", color: member.color, border: `1px solid ${member.color}30` }}>
                    Hiring Now
                  </span>
                )}
              </div>
              <p className="text-sm font-bold leading-snug" style={{ color: member.color }}>{member.role}</p>
              {member.sub && (
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 font-medium">{member.sub}</p>
              )}
            </div>
          </div>

          {/* Bio */}
          <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-5">{member.bio}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {member.tags.map(t => (
              <span key={t} className="text-[10px] font-extrabold px-2.5 py-1 rounded-lg"
                style={{ background: member.color + "12", color: member.color, border: `1px solid ${member.color}1e` }}>
                {t}
              </span>
            ))}
          </div>

          {/* Expandable prev experience */}
          {member.prev && (
            <>
              <button onClick={() => setOpen(o => !o)}
                className="flex items-center gap-1.5 text-[11px] font-bold mb-3 transition-opacity hover:opacity-60"
                style={{ color: member.color }}>
                {open ? "Hide" : "Show"} background
                <ChevronDown size={11} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
              </button>
              <div style={{ maxHeight: open ? 100 : 0, overflow: "hidden", transition: "max-height 0.35s cubic-bezier(0.16,1,0.3,1)" }}>
                <div className="rounded-xl p-3.5 mb-3 border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                  <p className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 mb-2">Previous Experience</p>
                  {member.prev.map(p => (
                    <p key={p} className="text-xs text-slate-600 dark:text-slate-300 font-medium mb-0.5 flex items-start gap-1.5">
                      <span style={{ color: member.color, marginTop: 3, flexShrink: 0 }}>▸</span>{p}
                    </p>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Footer */}
          <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            {isHiring ? (
              <a href={member.hiringHref || "/careers"}
                className="flex items-center gap-1.5 text-sm font-bold transition-all hover:gap-2.5"
                style={{ color: member.color }}>
                Apply Now <ArrowRight size={13} />
              </a>
            ) : (
              <>
                {member.linkedin && member.linkedin !== "#" && (
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[11px] font-bold transition-opacity hover:opacity-60"
                    style={{ color: member.color }}>
                    <Linkedin size={12} /> LinkedIn <ExternalLink size={9} />
                  </a>
                )}
                {member.email && (
                  <a href={`mailto:${member.email}`}
                    className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                    <Mail size={11} /> {member.email}
                  </a>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Zigzag branch connector ──────────────────────────────────────────────────
// fromSide = side the upper card sits on

function ZigConnector({ fromSide, toSide, color, nextColor, label }) {
  const id = `zc-${fromSide}-${color.replace("#", "")}`;
  // Start point X% and end point X% based on card alignment
  // Cards are 56% wide. Left-aligned cards centre ≈ 28%, right-aligned ≈ 72%
  const startX = fromSide === "left" ? "28%" : "72%";
  const endX   = toSide   === "left" ? "28%" : "72%";

  return (
    <div className="relative" style={{ height: 72 }} aria-hidden>
      <svg width="100%" height="72" className="absolute inset-0" preserveAspectRatio="none">
        <defs>
          <linearGradient id={id} x1={fromSide === "left" ? "0%" : "100%"} y1="0%" x2={fromSide === "left" ? "100%" : "0%"} y2="100%">
            <stop offset="0%"   stopColor={color}     stopOpacity="0.5" />
            <stop offset="100%" stopColor={nextColor} stopOpacity="0.3" />
          </linearGradient>
        </defs>
        {/* Curved path from start card bottom to end card top */}
        <path
          d={`M ${startX} 0 C ${startX} 36, ${endX} 36, ${endX} 72`}
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth="2"
          strokeDasharray="6 4"
        />
        {/* endpoint dots */}
        <circle cx={startX} cy="2"  r="3.5" fill={color}     fillOpacity="0.5" />
        <circle cx={endX}   cy="70" r="3.5" fill={nextColor} fillOpacity="0.5" />
      </svg>

      {/* label badge */}
      {label && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <span className="text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full border bg-white dark:bg-slate-950"
            style={{ color, borderColor: color + "35" }}>
            {label}
          </span>
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TeamPage() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [visible,     setVisible]     = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 80); return () => clearTimeout(t); }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.04 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // alternating sides: left, right, left, right...
  const sides = TEAM.map((_, i) => i % 2 === 0 ? "left" : "right");

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px] opacity-50 dark:opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(59,130,246,0.09),transparent)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(59,130,246,0.16),transparent)]" />

        <div className="relative max-w-3xl mx-auto text-center">
          <div style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(14px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-7 border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500" />
              </span>
              <span className="text-[10px] font-extrabold tracking-widest text-blue-600 dark:text-blue-400 uppercase">Our Team</span>
            </div>
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.07] tracking-tight mb-6"
            style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.7s ease 0.08s, transform 0.7s ease 0.08s" }}
          >
            The people building<br />
            <span className="text-blue-600 dark:text-blue-500">the future of cloud ops.</span>
          </h1>

          <p
            className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed"
            style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.7s ease 0.16s, transform 0.7s ease 0.16s" }}
          >
            A small, senior team with decades of cloud infrastructure and enterprise software experience — united by one mission.
          </p>

          {/* Avatar stack */}
          <div className="flex items-center justify-center gap-3 mt-8"
            style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(14px)", transition: "opacity 0.7s ease 0.24s, transform 0.7s ease 0.24s" }}>
            <div className="flex -space-x-3">
              {[
                { i: "NK", a: "#1d4ed8", b: "#3b82f6" },
                { i: "FK", a: "#4338ca", b: "#818cf8" },
                { i: "AK", a: "#b45309", b: "#fbbf24" },
                { i: "SJ", a: "#6d28d9", b: "#a78bfa" },
                { i: "DD", a: "#0369a1", b: "#38bdf8" },
              ].map((a, idx) => (
                <div key={idx} className="w-9 h-9 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-950 text-[11px] font-extrabold text-white"
                  style={{ background: `linear-gradient(135deg, ${a.a}, ${a.b})`, zIndex: 5 - idx }}>
                  {a.i}
                </div>
              ))}
            </div>
            <span className="text-sm text-slate-400 font-light">Pune, India · AWS Select Partner</span>
          </div>
        </div>
      </section>

      {/* ── ZIGZAG ORG ────────────────────────────────────────────────────── */}
      <section ref={sectionRef} className="py-8 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {TEAM.map((member, i) => {
            const side   = sides[i];
            const isLast = i === TEAM.length - 1;
            const nextSide = !isLast ? sides[i + 1] : null;
            const nextMember = !isLast ? TEAM[i + 1] : null;

            return (
              <div key={member.id}>
                {/* Card — pushed left or right */}
                <div className={`flex ${side === "right" ? "justify-end" : "justify-start"}`}>
                  <div className="w-full sm:w-[58%]">
                    <MemberCard member={member} side={side} visible={visible} delay={i * 110} />
                  </div>
                </div>

                {/* Connector to next card */}
                {!isLast && (
                  <ZigConnector
                    fromSide={side}
                    toSide={nextSide}
                    color={member.color}
                    nextColor={nextMember.color}
                    label={CONNECTOR_LABELS[i]}
                  />
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[10px] font-extrabold tracking-widest uppercase text-blue-600 dark:text-blue-500 mb-3">Join Us</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">Want to be on this page?</h2>
          <p className="text-base text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-8 max-w-lg mx-auto">
            We have open roles across engineering, sales, and HR. Or drop us a note directly — we read every speculative application.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/careers"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/25 transition-all hover:-translate-y-0.5">
              View Open Roles <ArrowRight size={15} />
            </Link>
            <a href="mailto:hr@quickinfracloud.com"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-blue-300 dark:hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400 transition-all hover:-translate-y-0.5">
              <Mail size={14} /> hr@quickinfracloud.com
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}