"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight, Zap, RefreshCw, Shield, Cloud,
  BarChart2, Settings, ChevronRight, Play,
  CheckCircle, Globe, Layers, Lock,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { value: "5×",   label: "Faster Launches",       sub: "Automated deployment pipelines"          },
  { value: "65%",  label: "Cost Savings in DevOps", sub: "One tool for all infra requirements"    },
  { value: "4×",   label: "Developer Productivity", sub: "Auto-generate Terraform & Ansible"      },
  { value: "100%", label: "Secure & Compliant",     sub: "Compliant infrastructure from day one"  },
];

const PLATFORM_MODULES = [
  {
    id: "iac",
    label: "Auto Infra",
    icon: Zap,
    color: "#3b82f6",
    title: "Automated Infrastructure Provisioning",
    desc: "Elevates resource scaling with Infrastructure-as-Code powered by Terraform. Efficient scaling with a transformative approach to resource management, tailored to meet dynamic business demands.",
    highlights: ["Auto-generate Terraform configs", "Multi-cloud resource provisioning", "Repeatable infra templates", "Drift detection & remediation"],
    metrics: [
      { label: "Provisioning time", before: "Days", after: "Minutes" },
      { label: "IaC written",       before: "Manual", after: "Auto-generated" },
    ],
    consoleLines: [
      { text: "terraform init · provider registry.terraform.io", color: "#64748b" },
      { text: "aws_vpc.main: Creating...",                        color: "#67e8f9" },
      { text: "aws_vpc.main: Creation complete after 2s",         color: "#4ade80" },
      { text: "aws_instance.app: Creating...",                    color: "#67e8f9" },
      { text: "aws_instance.app: Creation complete",              color: "#4ade80" },
      { text: "Apply complete! Resources: 8 added",               color: "#4ade80" },
    ],
  },
  {
    id: "cicd",
    label: "CI/CD",
    icon: RefreshCw,
    color: "#8b5cf6",
    title: "One-Click CI/CD Setup",
    desc: "Transform how you deploy. With a single click your team waves goodbye to tedious, error-prone procedures. A streamlined workflow devoid of inter-dependencies that leaves conventional DevOps behind.",
    highlights: ["Pre-configured pipeline templates", "Zero YAML configuration", "Multi-environment deployments", "Rollback in one click"],
    metrics: [
      { label: "Deploy frequency",  before: "Weekly",  after: "Daily"   },
      { label: "Pipeline setup",    before: "2 weeks", after: "1 click" },
    ],
    consoleLines: [
      { text: "Pipeline triggered · commit 3fa92c1",   color: "#64748b" },
      { text: "Stage: Build · docker build -t app .",  color: "#67e8f9" },
      { text: "Stage: Test · npm run test",            color: "#67e8f9" },
      { text: "All tests passed (142/142)",            color: "#4ade80" },
      { text: "Stage: Deploy · kubectl apply",         color: "#67e8f9" },
      { text: "Deployment successful · v2.4.1 live",   color: "#4ade80" },
    ],
  },
  {
    id: "security",
    label: "Security",
    icon: Shield,
    color: "#ef4444",
    title: "Security & Compliance",
    desc: "Integrate advanced security measures directly into applications, maintaining alignment with latest industry standards. Operations that are efficient, comprehensively secure, and always audit-ready.",
    highlights: ["SOC 2, PCI-DSS, HIPAA, GDPR built-in", "Automated security scans on deploy", "Continuous compliance monitoring", "SIEM integration"],
    metrics: [
      { label: "Compliance setup",    before: "Months",  after: "Day 1"  },
      { label: "Security incidents",  before: "12/mo",   after: "~0/mo"  },
    ],
    consoleLines: [
      { text: "Running compliance checks...",           color: "#64748b" },
      { text: "CIS Benchmark: PASSED (247/250)",        color: "#4ade80" },
      { text: "SOC 2 Controls: COMPLIANT",              color: "#4ade80" },
      { text: "PCI-DSS Scan: PASSED",                   color: "#4ade80" },
      { text: "SIEM Alert forwarding: ACTIVE",          color: "#67e8f9" },
      { text: "Security posture: STRONG",               color: "#4ade80" },
    ],
  },
  {
    id: "migration",
    label: "Migration",
    icon: Cloud,
    color: "#06b6d4",
    title: "Cloud Migration",
    desc: "Your transition is secure, efficient, and aligned with business objectives. A template-based approach makes migration an empowering step towards future-ready operations with zero downtime.",
    highlights: ["On-premise to cloud in days", "Zero-downtime migration engine", "App & database migration", "Multi-cloud strategy support"],
    metrics: [
      { label: "Migration time",   before: "Months",      after: "Days"        },
      { label: "Downtime",         before: "Significant", after: "Zero"        },
    ],
    consoleLines: [
      { text: "Migration plan generated · 5 services",  color: "#64748b" },
      { text: "Pre-flight checks: PASSED",              color: "#4ade80" },
      { text: "Migrating: web-app service...",          color: "#67e8f9" },
      { text: "Migrating: postgres-db...",              color: "#67e8f9" },
      { text: "Cutover complete · zero downtime",       color: "#4ade80" },
      { text: "Migration status: SUCCESS",              color: "#4ade80" },
    ],
  },
  {
    id: "infraops",
    label: "InfraOps",
    icon: Settings,
    color: "#f59e0b",
    title: "Automated InfraOps",
    desc: "Minimises manual cloud management with precise resource provisioning and predictive scaling. Faster deployment cycles, stringent security posture, and streamlined infrastructure optimisation.",
    highlights: ["Predictive auto-scaling", "Cost anomaly detection", "24/7 automated monitoring", "Self-healing infrastructure"],
    metrics: [
      { label: "Ops incidents",    before: "12/mo",  after: "0/mo"       },
      { label: "Manual ops work",  before: "40%",    after: "~0%"        },
    ],
    consoleLines: [
      { text: "InfraOps watchdog: RUNNING",              color: "#64748b" },
      { text: "CPU spike detected · web-app",            color: "#fbbf24" },
      { text: "Auto-scaling: +2 instances triggered",    color: "#67e8f9" },
      { text: "Cost anomaly: +18% · investigating",      color: "#fbbf24" },
      { text: "Idle instance i-0a3d4f found · retiring", color: "#67e8f9" },
      { text: "Monthly savings projection: ₹84K",        color: "#4ade80" },
    ],
  },
  {
    id: "monitoring",
    label: "Monitoring",
    icon: BarChart2,
    color: "#10b981",
    title: "InfraOps Monitoring",
    desc: "Elevates monitoring by blending advanced DevOps security with comprehensive diagnostics. Continuous vigilance over cloud health and cybersecurity — proactively securing against emerging threats.",
    highlights: ["Real-time cloud health dashboards", "Predictive alert engine", "Cost visibility per service", "Multi-cloud observability"],
    metrics: [
      { label: "MTTR",           before: "4 hours", after: "<15 min"    },
      { label: "Alert accuracy", before: "60%",     after: "99%"        },
    ],
    consoleLines: [
      { text: "Dashboard refresh · 15s interval",       color: "#64748b" },
      { text: "Health: 12/12 services nominal",         color: "#4ade80" },
      { text: "Latency p99: 38ms · within SLA",         color: "#4ade80" },
      { text: "Predictive alert: disk at 78% · 3d ETA", color: "#fbbf24" },
      { text: "Auto-remediation queued",                color: "#67e8f9" },
      { text: "Cloud spend today: ₹12,400 (−6% vs avg)", color: "#4ade80" },
    ],
  },
];

const THREE_PILLARS = [
  {
    icon: Lock,
    title: "Assured Security & Compliance",
    color: "#ef4444",
    desc: "Robust security and compliance from the outset. Seamlessly aligned with SOC 2, PCI-DSS, HIPAA, GDPR, and more — with automatic DevSecOps controls baked into every deployment.",
    tags: ["SOC 2", "PCI-DSS", "HIPAA", "GDPR", "NIST", "CIS"],
  },
  {
    icon: Layers,
    title: "Seamless Scalability & Flexibility",
    color: "#3b82f6",
    desc: "Automation and orchestration that saves time and costs while providing exceptional scalability and flexibility. Free your team to focus on core business goals — not infra management.",
    tags: ["Multi-cloud", "Auto-scaling", "Multi-region", "IaC templates"],
  },
  {
    icon: Globe,
    title: "Effortless Cloud Operations",
    color: "#10b981",
    desc: "Intuitive provisioning and deployment that removes complexity from launching. Let the platform guide your cloud journey with ease and precision — streamlining every step of operations.",
    tags: ["1-click deploy", "Zero-downtime", "Self-healing", "24/7 managed"],
  },
];

const DESTINATIONS = [
  { icon: Zap,       title: "DevOps Automation",  color: "#3b82f6", desc: "Reduce manual effort by 90% and increase efficiency with streamlined pipelines. Fast, reliable releases with less overhead.",           href: "/engineering-teams"    },
  { icon: Shield,    title: "Compliance",          color: "#ef4444", desc: "Navigate compliance with automated checks. Stay ahead of regulations — your cloud is always audit-ready.",                               href: "/aws-partners"          },
  { icon: Settings,  title: "InfraOps",            color: "#f59e0b", desc: "Proactive resource optimisation and precision scaling. A new benchmark for cloud infrastructure management.",                            href: "/non-tech-smes"         },
  { icon: Cloud,     title: "Cloud Migration",     color: "#06b6d4", desc: "Smart automation to minimise downtime and accelerate transition. A smooth shift to cloud at every step.",                                href: "/cloud-migration"       },
];

const INTEGRATIONS = [
  "AWS", "Azure", "GCP", "Oracle Cloud", "Terraform", "Ansible",
  "Kubernetes", "Docker", "GitHub", "GitLab", "Jenkins", "ArgoCD",
  "Prometheus", "Grafana", "Datadog", "Helm", "Vault", "Nginx",
];

const TESTIMONIALS = [
  { quote: "We saved 70% on AWS infrastructure management costs using QuickInfra. Otherwise, how are you staying on top of your infrastructure?", company: "SalesGarners Marketing Pvt. Ltd.", role: "IT Manager",        initial: "S", color: "#3b82f6" },
  { quote: "QuickInfra helped us significantly reduce migration time and effort with its end-to-end cloud migration automation platform.",          company: "Netsoftmate IT Solutions",         role: "Managing Director", initial: "N", color: "#8b5cf6" },
  { quote: "We encourage all startups to switch to QuickInfra for a hassle-free DevOps infrastructure management experience.",                     company: "CloudAge",                         role: "Director",          initial: "C", color: "#10b981" },
];

// ─── Platform Console Widget ───────────────────────────────────────────────────

function PlatformConsole() {
  const [mounted,      setMounted]      = useState(false);
  const [activeModule, setActiveModule] = useState(0);
  const [consoleLine,  setConsoleLine]  = useState(0);
  const [logLines,     setLogLines]     = useState([]);
  const [animId,       setAnimId]       = useState(null);
  const cycleRef   = useRef(null);
  const logRef     = useRef(null);
  const timersRef  = useRef([]);

  const clearTimers = () => { timersRef.current.forEach(clearTimeout); timersRef.current = []; };
  const addTimer    = (fn, ms) => { const id = setTimeout(fn, ms); timersRef.current.push(id); return id; };

  useEffect(() => { const t = setTimeout(() => setMounted(true), 120); return () => clearTimeout(t); }, []);

  const startModule = (idx) => {
    clearTimers();
    setActiveModule(idx);
    setLogLines([]);
    setAnimId(null);
    const lines = PLATFORM_MODULES[idx].consoleLines;
    lines.forEach(({ text, color }, i) => {
      addTimer(() => {
        const id = `${idx}-${i}`;
        setAnimId(id);
        setLogLines((prev) => [...prev, { id, text, color }]);
        if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
      }, 400 + i * 500);
    });
  };

  useEffect(() => {
    if (!mounted) return;
    startModule(0);
    cycleRef.current = setInterval(() => {
      setActiveModule((cur) => {
        const next = (cur + 1) % PLATFORM_MODULES.length;
        startModule(next);
        return next;
      });
    }, 5500);
    return () => { clearInterval(cycleRef.current); clearTimers(); };
  }, [mounted]);

  useEffect(() => () => { clearInterval(cycleRef.current); clearTimers(); }, []);

  const mod = PLATFORM_MODULES[activeModule];

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
        <div className="h-full flex rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700/50 shadow-2xl shadow-blue-500/10 dark:shadow-black/50">

          {/* ── Sidebar ── */}
          <div className="shrink-0 w-28 bg-[#0f172a] flex flex-col">
            {/* Logo strip */}
            <div className="px-3 py-3.5 border-b border-white/8">
              <div className="text-[10px] font-extrabold text-white/60 tracking-widest uppercase">QI</div>
              <div className="text-[9px] text-white/30 font-mono mt-0.5">Platform</div>
            </div>
            {/* Nav items */}
            <div className="flex flex-col gap-0.5 p-2 flex-1">
              {PLATFORM_MODULES.map(({ id, label, icon: Icon, color }, i) => {
                const isActive = activeModule === i;
                return (
                  <button
                    key={id}
                    onClick={() => { clearInterval(cycleRef.current); startModule(i); cycleRef.current = setInterval(() => { setActiveModule((cur) => { const next = (cur+1) % PLATFORM_MODULES.length; startModule(next); return next; }); }, 5500); }}
                    className="flex flex-col items-center gap-1 py-2.5 rounded-xl transition-all duration-300 focus:outline-none"
                    style={{ background: isActive ? color + "25" : "transparent", border: `1px solid ${isActive ? color + "40" : "transparent"}` }}
                  >
                    <Icon size={14} style={{ color: isActive ? color : "#64748b" }} />
                    <span className="text-[8px] font-bold" style={{ color: isActive ? color : "#64748b" }}>{label}</span>
                  </button>
                );
              })}
            </div>
            {/* Connected dot */}
            <div className="px-3 py-3 border-t border-white/6 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ animation: "dashPulse 2s ease-in-out infinite" }} />
              <span className="text-[8px] text-white/30 font-bold">Live</span>
            </div>
          </div>

          {/* ── Main panel ── */}
          <div className="flex-1 flex flex-col bg-[#0d1117] overflow-hidden">

            {/* Top bar */}
            <div className="flex-shrink-0 flex items-center justify-between px-4 py-2.5 bg-[#161b27] border-b border-white/6">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                </div>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-md ml-2"
                  style={{ background: mod.color + "20", color: mod.color, border: `1px solid ${mod.color}30` }}
                >
                  {mod.label}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: mod.color, animation: "dashPulse 1.5s ease-in-out infinite" }} />
                <span className="text-[9px] font-bold text-white/30">ap-south-1 · AWS</span>
              </div>
            </div>

            {/* Module info strip */}
            <div className="flex-shrink-0 px-4 py-3 border-b border-white/6 bg-[#151929]">
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: mod.color + "20", color: mod.color }}>
                  <mod.icon size={13} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-extrabold text-white/80 leading-snug truncate">{mod.title}</p>
                  <div className="flex gap-1 mt-1.5 flex-wrap">
                    {mod.highlights.slice(0, 2).map((h) => (
                      <span key={h} className="text-[8px] font-bold px-1.5 py-0.5 rounded" style={{ background: mod.color + "18", color: mod.color }}>
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Console output */}
            <div
              ref={logRef}
              className="flex-1 overflow-auto px-4 py-3"
              style={{ fontFamily: "ui-monospace, 'JetBrains Mono', monospace" }}
            >
              {logLines.map(({ id, text, color }) => (
                <div
                  key={id}
                  className="flex items-start gap-3 mb-1.5"
                  style={id === animId ? { animation: "logLineIn 0.3s cubic-bezier(0.16,1,0.3,1) forwards" } : { opacity: 1 }}
                >
                  <span className="text-[10px] select-none text-[#334155] flex-shrink-0 w-5 text-right">
                    {String(logLines.findIndex((l) => l.id === id) + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[10.5px] leading-relaxed" style={{ color }}>{text}</span>
                </div>
              ))}
              {logLines.length < mod.consoleLines.length && (
                <div className="flex items-start gap-3 mt-1">
                  <span className="text-[10px] text-[#334155] w-5 text-right">{String(logLines.length + 1).padStart(2, "0")}</span>
                  <span className="inline-block w-1.5 h-3.5 rounded-sm" style={{ background: mod.color, animation: "dashBlink 1s step-end infinite" }} />
                </div>
              )}
            </div>

            {/* Metrics footer */}
            <div className="flex-shrink-0 border-t border-white/6 px-4 py-2.5 bg-[#161b27] grid grid-cols-2 gap-2">
              {mod.metrics.map(({ label, before, after }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <span className="text-[9px] text-white/30 font-mono truncate">{label}:</span>
                  <span className="text-[9px] text-red-400 font-bold line-through">{before}</span>
                  <span className="text-[9px]" style={{ color: mod.color }}>→ {after}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PlatformPage() {
  const [heroVisible,  setHeroVisible]  = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [activeDest,   setActiveDest]   = useState(0);
  const statsRef = useRef(null);

  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 80); return () => clearTimeout(t); }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.2 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const iv = setInterval(() => setActiveDest((d) => (d + 1) % DESTINATIONS.length), 2800);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[88vh] flex items-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-60 dark:opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(59,130,246,0.09),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(59,130,246,0.16),transparent)]" />

        <div className="relative max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-7 border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10"
                style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(12px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">Platform Overview</span>
              </div>

              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.07] tracking-tight mb-6"
                style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(18px)", transition: "opacity 0.65s ease 0.08s, transform 0.65s ease 0.08s" }}
              >
                DevOps & InfraOps<br />
                <span className="text-blue-600 dark:text-blue-400">on AutoPilot.</span>
              </h1>

              <p
                className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-8 max-w-xl"
                style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(18px)", transition: "opacity 0.65s ease 0.16s, transform 0.65s ease 0.16s" }}
              >
                Your one-stop internal developer platform where automation merges with deep technical
                expertise — ensuring seamless operations and fast, compliant launches. Built for
                startups and large enterprises alike.
              </p>

              <div
                className="flex flex-wrap gap-3 mb-10"
                style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(18px)", transition: "opacity 0.65s ease 0.24s, transform 0.65s ease 0.24s" }}
              >
                <Link href="https://console.quickinfra.cloud/" className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all hover:-translate-y-0.5">
                  Explore the Platform <ArrowRight size={15} />
                </Link>
                
              </div>

              <div
                className="flex flex-wrap gap-6"
                style={{ opacity: heroVisible ? 1 : 0, transition: "opacity 0.65s ease 0.32s" }}
              >
                {[["ISO 27001", "Certified"], ["AWS", "Select Partner"], ["200+", "Integrations"]].map(([l, s]) => (
                  <div key={l}>
                    <div className="text-xs font-extrabold text-blue-600 dark:text-blue-500 tracking-wide">{l}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-500 mt-0.5">{s}</div>
                  </div>
                ))}
              </div>
            </div>

            <PlatformConsole />
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────────── */}
      <section ref={statsRef} className="py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 text-center hover:-translate-y-1 transition-all hover:shadow-lg">
                <div className={`text-4xl sm:text-5xl font-extrabold tracking-tight mb-2 transition-colors duration-700 ${statsVisible ? "text-blue-600 dark:text-blue-400" : "text-slate-200 dark:text-slate-800"}`}>{s.value}</div>
                <div className="font-bold text-sm mb-1">{s.label}</div>
                <div className="text-xs text-slate-400 font-light">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLATFORM MODULES ─────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold tracking-widest uppercase text-blue-600 dark:text-blue-400 mb-3">Core Platform</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">Explore the QuickInfra Platform</h2>
            <p className="text-base text-slate-500 dark:text-slate-400 font-light max-w-lg mx-auto">
              Six integrated modules that together eliminate every layer of manual infra work.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PLATFORM_MODULES.map(({ id, label, icon: Icon, color, title, desc, highlights }) => (
              <div
                key={id}
                className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 hover:-translate-y-1 transition-all hover:shadow-xl cursor-default overflow-hidden relative"
                style={{ "--hover-border": color + "55" }}
              >
                <div
                  className="absolute top-0 inset-x-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, ${color}, ${color}44)` }}
                />
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: color + "15", color, border: `1.5px solid ${color}30` }}>
                    <Icon size={18} />
                  </div>
                  <span className="text-[9px] font-extrabold tracking-widest uppercase text-slate-400 dark:text-slate-500">{label}</span>
                </div>
                <h3 className="text-sm font-extrabold mb-2.5 leading-snug tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-4">{desc}</p>
                <div className="flex flex-col gap-1.5 border-t border-slate-50 dark:border-slate-800 pt-4">
                  {highlights.slice(0, 3).map((h) => (
                    <div key={h} className="flex items-center gap-2">
                      <CheckCircle size={11} style={{ color }} className="flex-shrink-0" />
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THREE PILLARS ────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold tracking-widests uppercase text-blue-600 dark:text-blue-400 mb-3">Built to Last</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">Your Path to Seamless, Secure, Scalable DevOps</h2>
            <p className="text-base text-slate-500 dark:text-slate-400 font-light max-w-lg mx-auto">
              Three foundational pillars that make QuickInfra the platform you can build your entire cloud strategy on.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {THREE_PILLARS.map(({ icon: Icon, title, color, desc, tags }) => (
              <div
                key={title}
                className="rounded-2xl border bg-white dark:bg-slate-900 p-7 hover:-translate-y-1 transition-all hover:shadow-xl relative overflow-hidden"
                style={{ borderColor: color + "30" }}
              >
                <div className="absolute top-0 inset-x-0 h-0.5" style={{ background: `linear-gradient(90deg, ${color}, ${color}44)` }} />
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6" style={{ background: color + "15", color, border: `2px solid ${color}25` }}>
                  <Icon size={22} />
                </div>
                <h3 className="text-base font-extrabold mb-3 tracking-tight">{title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-5">{desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((t) => (
                    <span key={t} className="text-[9px] font-extrabold px-2 py-1 rounded-lg" style={{ background: color + "12", color }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DESTINATIONS ─────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold tracking-widest uppercase text-blue-600 dark:text-blue-400 mb-3">All-Things Cloud</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">QuickInfra is the Destination for All-Things Cloud</h2>
            <p className="text-base text-slate-500 dark:text-slate-400 font-light max-w-lg mx-auto">
              One platform. Four cloud capabilities. Every stage of your cloud journey covered.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DESTINATIONS.map(({ icon: Icon, title, color, desc, href }, i) => {
              const isActive = activeDest === i;
              return (
                <Link
                  key={title}
                  href={href}
                  className="group rounded-2xl border bg-white dark:bg-slate-900 p-6 transition-all duration-300 hover:-translate-y-1 overflow-hidden relative"
                  style={{
                    borderColor: isActive ? color + "55" : "#e2e8f0",
                    boxShadow:   isActive ? `0 8px 28px ${color}18` : "none",
                  }}
                >
                  <div className="absolute top-0 inset-x-0 h-0.5 transition-opacity duration-300" style={{ background: `linear-gradient(90deg, ${color}, ${color}44)`, opacity: isActive ? 1 : 0 }} />
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-300" style={{ background: color + "18", color, border: `1.5px solid ${color}30` }}>
                    <Icon size={18} />
                  </div>
                  <h3 className="text-sm font-extrabold mb-2 tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{title}</h3>
                  <p className="text-xs text-slate-400 font-light leading-relaxed mb-4">{desc}</p>
                  <div className="flex items-center gap-1 text-[11px] font-bold transition-colors" style={{ color }}>
                    Learn more <ChevronRight size={12} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── INTEGRATIONS ─────────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[10px] font-bold tracking-widest uppercase text-blue-600 dark:text-blue-400 mb-3">Integrations</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">Our Platform Fits With Your Tech</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-light mb-10 max-w-lg mx-auto">
            Harness the power of 200+ cloud services, natively integrated.
          </p>
          <div className="flex flex-wrap gap-2.5 justify-center">
            {INTEGRATIONS.map((name) => (
              <div key={name} className="px-4 py-2 rounded-lg border text-sm font-semibold transition-all cursor-default border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800">
                {name}
              </div>
            ))}
            <div className="px-4 py-2 rounded-lg border text-sm font-semibold border-slate-100 dark:border-slate-800/50 text-slate-300 dark:text-slate-700">+182 more</div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold tracking-widest uppercase text-blue-600 dark:text-blue-400 mb-3">What Customers Say</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Fast-growing Teams Trust QuickInfra</h2>
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(59,130,246,0.07),transparent)] dark:bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(59,130,246,0.12),transparent)]" />
        <div className="relative max-w-2xl mx-auto text-center">
          <p className="text-[10px] font-bold tracking-widest uppercase text-blue-600 dark:text-blue-400 mb-6">Get Started</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-6">
            Ready to transform your<br />DevOps and InfraOps?
          </h2>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-10">
            Start your free trial today. No credit card. No DevOps engineer needed.
            Production-ready infra in under an hour.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="https://console.quickinfra.cloud/" className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/25 hover:shadow-blue-600/40 transition-all hover:-translate-y-0.5">
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