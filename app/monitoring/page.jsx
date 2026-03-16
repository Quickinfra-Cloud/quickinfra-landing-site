"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, BarChart2, Bell, Shield, Zap, RefreshCw, Activity, Play } from "lucide-react";

const STATS = [
  { value: "99.9%", label: "Uptime Guaranteed",    sub: "Proactive alerts before incidents"   },
  { value: "< 30s", label: "Alert Response Time",  sub: "Real-time anomaly detection"         },
  { value: "65%",   label: "Cost Savings",         sub: "Anomaly detection cuts waste"        },
  { value: "24/7",  label: "Continuous Monitoring",sub: "Never miss a critical event"         },
];

const MONITOR_MODULES = [
  { id: "infra",   label: "Infra",    color: "#3b82f6" },
  { id: "app",     label: "App",      color: "#8b5cf6" },
  { id: "cost",    label: "Cost",     color: "#f59e0b" },
  { id: "security",label: "Security", color: "#ef4444" },
];

const METRICS_DATA = {
  infra: {
    title: "Infrastructure Health",
    items: [
      { label: "CPU Usage",     value: "34%",    trend: "↓ 2%",  ok: true  },
      { label: "Memory",        value: "61%",    trend: "↑ 1%",  ok: true  },
      { label: "Disk I/O",      value: "120 MB/s",trend: "→",    ok: true  },
      { label: "Network In",    value: "480 Mbps",trend: "↑ 12%",ok: true  },
      { label: "EC2 Instances", value: "6/6",    trend: "Healthy",ok: true },
      { label: "RDS Lag",       value: "12ms",   trend: "↓ 3ms", ok: true  },
    ],
    alerts: [],
  },
  app: {
    title: "Application Metrics",
    items: [
      { label: "Req/sec",        value: "1,840",  trend: "↑ 5%",  ok: true  },
      { label: "Error Rate",     value: "0.04%",  trend: "↓ 0.1%",ok: true  },
      { label: "P99 Latency",    value: "38ms",   trend: "↓ 2ms", ok: true  },
      { label: "P50 Latency",    value: "12ms",   trend: "→",     ok: true  },
      { label: "Active Sessions",value: "3,412",  trend: "↑ 8%",  ok: true  },
      { label: "Cache Hit Rate", value: "94.2%",  trend: "↑ 1%",  ok: true  },
    ],
    alerts: [],
  },
  cost: {
    title: "Cloud Cost Monitor",
    items: [
      { label: "Daily Spend",    value: "₹8,240", trend: "↓ 12%", ok: true  },
      { label: "Monthly Est.",   value: "₹2.1L",  trend: "On budget",ok: true},
      { label: "EC2 Utilisation",value: "82%",    trend: "↑ 4%",  ok: true  },
      { label: "Reserved Cvg",   value: "68%",    trend: "↑ 12%", ok: true  },
      { label: "Idle Resources", value: "0",      trend: "Cleaned",ok: true },
      { label: "Savings Plan",   value: "₹42K/mo",trend: "Active",ok: true  },
    ],
    alerts: [{ text: "EC2 t3.medium · Low utilisation detected (8%)", color: "#f59e0b" }],
  },
  security: {
    title: "Security & Compliance",
    items: [
      { label: "Open Findings",  value: "0",      trend: "All clear",ok: true },
      { label: "CIS Score",      value: "97/100", trend: "↑ 2",   ok: true  },
      { label: "SOC 2 Controls", value: "100%",   trend: "Passing",ok: true  },
      { label: "Failed Logins",  value: "0",      trend: "24h",   ok: true  },
      { label: "SSL Certs",      value: "Valid",  trend: "62d",   ok: true  },
      { label: "WAF Blocks",     value: "14",     trend: "Last 1h",ok: true },
    ],
    alerts: [],
  },
};

const FEATURES = [
  { icon: Activity,  title: "Real-Time Infrastructure Monitoring",tag: "InfraOps",    color: "#3b82f6", desc: "CPU, memory, disk, and network metrics streamed in real time from every cloud resource. Centralised visibility across AWS, Azure, and GCP." },
  { icon: Bell,      title: "Predictive Alerting",               tag: "Smart Alerts", color: "#f59e0b", desc: "ML-powered anomaly detection spots abnormal patterns before they become incidents. Alerts routed to Slack, PagerDuty, or email — with context." },
  { icon: BarChart2, title: "Cost Anomaly Detection",            tag: "FinOps",       color: "#10b981", desc: "Real-time spend tracking with auto-detection of cost spikes, idle resources, and right-sizing opportunities. Budget alerts built in." },
  { icon: Shield,    title: "Compliance & Security Posture",     tag: "Security",     color: "#ef4444", desc: "Continuous CIS, SOC 2, HIPAA checks on every resource. Security score, failed control list, and remediation suggestions — updated live." },
  { icon: Zap,       title: "Application Performance Monitoring",tag: "APM",          color: "#8b5cf6", desc: "Request rates, error rates, P50/P99 latency, active sessions — all correlated with infrastructure events for fast root cause analysis." },
  { icon: RefreshCw, title: "Auto-Remediation",                  tag: "Automation",   color: "#06b6d4", desc: "Configure runbooks that trigger automatically on alert conditions — restart a pod, scale a group, revoke a key. InfraOps that runs itself." },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Connect Your Cloud",     color: "#3b82f6", desc: "Link AWS, Azure, or GCP accounts. QuickInfra deploys lightweight collectors and starts streaming metrics within minutes." },
  { step: "02", title: "Dashboards Assembled",   color: "#8b5cf6", desc: "Auto-built dashboards per resource type — EC2, RDS, EKS, Lambda. No manual panel creation needed." },
  { step: "03", title: "Alerts Configured",      color: "#f59e0b", desc: "Smart baselines set from your first 24 hours of data. Alerts go live with sensible thresholds, zero tuning required." },
  { step: "04", title: "Continuous Visibility",  color: "#10b981", desc: "Incidents, cost anomalies, compliance drift, and performance regressions surfaced automatically — with recommended actions." },
];

const METRICS = [
  { before: "Hours",    after: "Seconds", label: "MTTD",             color: "#3b82f6" },
  { before: "Reactive", after: "Proactive",label: "Incident posture",color: "#8b5cf6" },
  { before: "Unknown",  after: "Optimised",label: "Cloud spend",     color: "#f59e0b" },
  { before: "Monthly",  after: "Continuous",label: "Compliance checks",color: "#ef4444"},
];

const TESTIMONIALS = [
  { quote: "We saved 70% on AWS costs. QuickInfra's monitoring caught idle resources and anomalies our team never had visibility into before.",   company: "SalesGarners Marketing Pvt. Ltd.", role: "IT Manager",        initial: "S", color: "#3b82f6" },
  { quote: "Predictive alerts have been a game changer. We get notified before our users are impacted, not after. Incident count dropped to zero.", company: "Netsoftmate IT Solutions",        role: "Managing Director", initial: "N", color: "#8b5cf6" },
  { quote: "12 infra incidents per month dropped to zero. The monitoring and auto-remediation combination is genuinely production-grade.",          company: "CloudAge",                        role: "Director",          initial: "C", color: "#10b981" },
];

// ─── Widget ───────────────────────────────────────────────────────────────────

function MonitorWidget() {
  const [mounted,      setMounted]      = useState(false);
  const [activeTab,    setActiveTab]    = useState("infra");
  const [sparkValues,  setSparkValues]  = useState([40, 38, 45, 34, 37, 36, 34]);
  const cycleRef  = useRef(null);
  const timersRef = useRef([]);

  const addTimer = (fn, ms) => { const id = setTimeout(fn, ms); timersRef.current.push(id); return id; };

  useEffect(() => { const t = setTimeout(() => setMounted(true), 120); return () => clearTimeout(t); }, []);

  // Auto-cycle tabs
  useEffect(() => {
    if (!mounted) return;
    const tabs = ["infra", "app", "cost", "security"];
    let idx = 0;
    cycleRef.current = setInterval(() => {
      idx = (idx + 1) % tabs.length;
      setActiveTab(tabs[idx]);
    }, 3500);
    return () => clearInterval(cycleRef.current);
  }, [mounted]);

  // Animate sparkline
  useEffect(() => {
    const iv = setInterval(() => {
      setSparkValues((prev) => [...prev.slice(1), Math.round(28 + Math.random() * 24)]);
    }, 800);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => () => { timersRef.current.forEach(clearTimeout); clearInterval(cycleRef.current); }, []);

  const data   = METRICS_DATA[activeTab];
  const module = MONITOR_MODULES.find((m) => m.id === activeTab);
  const maxSpark = Math.max(...sparkValues);

  return (
    <div style={{ height: 520, width: "100%", opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0) scale(1)" : "translateY(28px) scale(0.97)", transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)", willChange: "opacity, transform" }}>
      <div className="h-full" >
        <div className="h-full flex flex-col rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700/50 shadow-2xl shadow-teal-500/10 dark:shadow-black/50">

          {/* Header */}
          <div className="flex-shrink-0 flex items-center justify-between px-4 py-3 bg-[#0f172a] border-b border-white/8">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-[#ff5f57]" /><div className="w-3 h-3 rounded-full bg-[#febc2e]" /><div className="w-3 h-3 rounded-full bg-[#28c840]" /></div>
              <span className="ml-1 text-white/80 text-xs font-bold">InfraOps Monitor</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" /><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" /></span>
              <span className="text-[10px] font-bold text-green-400">Live</span>
              <span className="text-[10px] text-white/30 ml-1">· EC2 DevOps · ap-south-1</span>
            </div>
          </div>

          {/* Tab bar */}
          <div className="flex-shrink-0 flex gap-0 border-b border-white/6 bg-[#0a0f1e]">
            {MONITOR_MODULES.map(({ id, label, color }) => (
              <button key={id} onClick={() => { setActiveTab(id); clearInterval(cycleRef.current); }}
                className="flex-1 py-2.5 text-[10px] font-extrabold uppercase tracking-widest transition-all duration-300"
                style={{ color: activeTab === id ? color : "#475569", borderBottom: `2px solid ${activeTab === id ? color : "transparent"}`, background: activeTab === id ? color + "0d" : "transparent" }}>
                {label}
              </button>
            ))}
          </div>

          {/* Sparkline */}
          <div className="flex-shrink-0 px-4 py-3 bg-[#0d1117] border-b border-white/6">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-extrabold" style={{ color: module.color }}>{data.title}</span>
              <span className="text-[9px] text-white/30 font-mono">Last 7 readings</span>
            </div>
            <div className="flex items-end gap-1 h-8">
              {sparkValues.map((v, i) => (
                <div key={i} className="flex-1 rounded-sm transition-all duration-500"
                  style={{ height: `${(v / maxSpark) * 100}%`, background: i === sparkValues.length - 1 ? module.color : module.color + "50", minHeight: 2 }} />
              ))}
            </div>
          </div>

          {/* Metrics grid */}
          <div className="flex-1 overflow-auto bg-[#0d1117] p-3">
            <div className="grid grid-cols-2 gap-2">
              {data.items.map(({ label, value, trend, ok }) => (
                <div key={label} className="rounded-xl p-3 border" style={{ background: "#161b27", borderColor: "#1e293b" }}>
                  <div className="text-[9px] font-extrabold uppercase tracking-widest text-white/30 mb-1.5">{label}</div>
                  <div className="text-[15px] font-extrabold text-white mb-0.5">{value}</div>
                  <div className="text-[9px] font-bold" style={{ color: ok ? "#4ade80" : "#f87171" }}>{trend}</div>
                </div>
              ))}
            </div>

            {/* Alerts */}
            {data.alerts.length > 0 && (
              <div className="mt-2 space-y-1.5">
                {data.alerts.map((a, i) => (
                  <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl border" style={{ background: a.color + "0d", borderColor: a.color + "30" }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: a.color, animation: "dashPulse 1s ease-in-out infinite" }} />
                    <span className="text-[10px] font-bold" style={{ color: a.color }}>{a.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex-shrink-0 border-t border-white/6 px-4 py-2.5 bg-[#0a0f1e] grid grid-cols-3 gap-2">
            {[["Resources", "14 Active"], ["Alerts", "0 Open"], ["Uptime", "99.98%"]].map(([k, v]) => (
              <div key={k} className="text-center">
                <div className="text-[9px] text-white/30 uppercase tracking-widest">{k}</div>
                <div className="text-[11px] font-extrabold text-cyan-400">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MonitoringPage() {
  const [heroVisible,  setHeroVisible]  = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 80); return () => clearTimeout(t); }, []);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.2 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white">

      <section className="relative min-h-[88vh] flex items-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-60 dark:opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(6,182,212,0.08),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(6,182,212,0.15),transparent)]" />
        <div className="relative max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-7 border border-cyan-200 dark:border-cyan-500/30 bg-cyan-50 dark:bg-cyan-500/10"
                style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(12px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
                <BarChart2 size={11} className="text-cyan-600 dark:text-cyan-400" />
                <span className="text-xs font-bold tracking-widest text-cyan-600 dark:text-cyan-400 uppercase">InfraOps Monitoring</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.07] tracking-tight mb-6"
                style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(18px)", transition: "opacity 0.65s ease 0.08s, transform 0.65s ease 0.08s" }}>
                See everything.<br /><span className="text-cyan-600 dark:text-cyan-400">Miss nothing.</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-8 max-w-xl"
                style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(18px)", transition: "opacity 0.65s ease 0.16s, transform 0.65s ease 0.16s" }}>
                Real-time visibility into your entire cloud stack — infrastructure, application performance, cost anomalies, and security posture. Predictive alerts before incidents happen. Auto-remediation so you can sleep.
              </p>
              <div className="flex flex-wrap gap-3 mb-10"
                style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(18px)", transition: "opacity 0.65s ease 0.24s, transform 0.65s ease 0.24s" }}>
                <Link href="https://console.quickinfra.cloud/" className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-600/25 transition-all hover:-translate-y-0.5">Start Free Trial <ArrowRight size={15} /></Link>
              </div>
              <div className="flex flex-wrap gap-6" style={{ opacity: heroVisible ? 1 : 0, transition: "opacity 0.65s ease 0.32s" }}>
                {[["99.9%", "Uptime guaranteed"], ["< 30s", "Alert response"], ["24/7", "Continuous monitoring"]].map(([v, l]) => (
                  <div key={l}><div className="text-sm font-extrabold text-cyan-600 dark:text-cyan-400">{v}</div><div className="text-xs text-slate-400 mt-0.5">{l}</div></div>
                ))}
              </div>
            </div>
            <MonitorWidget />
          </div>
        </div>
      </section>

      <section ref={statsRef} className="py-14 px-4 sm:px-6 lg:px-8 border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-5">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 text-center hover:-translate-y-1 transition-all hover:shadow-lg">
              <div className={`text-4xl font-extrabold tracking-tight mb-2 transition-colors duration-700 ${statsVisible ? "text-cyan-600 dark:text-cyan-400" : "text-slate-200 dark:text-slate-800"}`}>{s.value}</div>
              <div className="font-bold text-sm mb-1">{s.label}</div>
              <div className="text-xs text-slate-400 font-light">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14"><p className="text-[10px] font-bold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 mb-3">Platform Capabilities</p><h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">Everything Monitoring Needs</h2><p className="text-base text-slate-500 dark:text-slate-400 font-light max-w-lg mx-auto">Six capabilities that give you complete observability across your cloud stack.</p></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(({ icon: Icon, title, tag, color, desc }) => (
              <div key={title} className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 hover:-translate-y-1 transition-all hover:shadow-lg cursor-default">
                <div className="flex items-center gap-3 mb-5"><div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: color + "15", color, border: `1.5px solid ${color}30` }}><Icon size={18} /></div><span className="text-[10px] font-extrabold tracking-widest uppercase text-slate-400">{tag}</span></div>
                <h3 className="text-sm font-extrabold mb-2.5 leading-snug group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">{title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10"><p className="text-[10px] font-bold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 mb-3">Real Impact</p><h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Before vs After</h2></div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {METRICS.map(({ before, after, label, color }) => (
              <div key={label} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 text-center">
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-3">{label}</div>
                <div className="flex items-center justify-center gap-2 mb-1"><span className="text-sm font-bold text-red-400 line-through">{before}</span><span className="text-slate-300 dark:text-slate-700">→</span></div>
                <div className="text-2xl font-extrabold" style={{ color }}>{after}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14"><p className="text-[10px] font-bold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 mb-3">How It Works</p><h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">Full Observability in Minutes</h2><p className="text-base text-slate-500 dark:text-slate-400 font-light max-w-lg mx-auto">Four steps. No Grafana to configure. No alerting rules to write.</p></div>
          <div className="relative">
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {HOW_IT_WORKS.map(({ step, title, color, desc }) => (
                <div key={step} className="flex flex-col items-center text-center group">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5 text-xl font-extrabold font-mono z-10 transition-all duration-300 group-hover:scale-110" style={{ background: color + "12", color, border: `2px solid ${color}30` }}>{step}</div>
                  <h3 className="text-sm font-extrabold mb-2 tracking-tight">{title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12"><p className="text-[10px] font-bold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 mb-3">Customer Stories</p><h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Teams That Never Miss an Incident</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map(({ quote, company, role, initial, color }) => (
              <div key={company} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-7 flex flex-col gap-5 relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-0.5" style={{ background: `linear-gradient(90deg, ${color}, ${color}44)` }} />
                <div className="text-3xl font-serif text-slate-100 dark:text-slate-800">"</div>
                <p className="text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed flex-1">{quote}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-extrabold text-sm flex-shrink-0" style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}>{initial}</div>
                  <div><div className="text-sm font-bold">{company}</div><div className="text-xs text-slate-400 mt-0.5">{role}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(6,182,212,0.07),transparent)] dark:bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(6,182,212,0.13),transparent)]" />
        <div className="relative max-w-2xl mx-auto text-center">
          <p className="text-[10px] font-bold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 mb-6">Get Started</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-6">Full cloud visibility starts here.</h2>
          <p className="text-base text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-10">Start your free trial. No credit card. No Grafana setup. Complete observability in under an hour.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="https://console.quickinfra.cloud/" className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-xl shadow-cyan-600/25 transition-all hover:-translate-y-0.5">Start Free Trial <ArrowRight size={16} /></Link>
          </div>
          <p className="mt-6 text-[10px] font-bold tracking-widest uppercase text-slate-300 dark:text-slate-700">ISO 27001 · AWS Select Partner · SOC 2 Ready</p>
        </div>
      </section>

    </div>
  );
}