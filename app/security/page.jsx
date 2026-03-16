"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Shield, Lock, Eye, AlertTriangle, CheckCircle, RefreshCw, Play } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { value: "100%", label: "Compliant Day One",      sub: "Controls baked in, not bolted on"       },
  { value: "6+",   label: "Frameworks Supported",   sub: "SOC 2, HIPAA, PCI-DSS, ISO 27001 & more"},
  { value: "0",    label: "Manual Audits Needed",   sub: "Continuous automated compliance checks"  },
  { value: "97",   label: "Avg CIS Benchmark Score", sub: "Out of 100 across all provisioned infra" },
];

const FRAMEWORKS = [
  {
    id: "soc2",
    label: "SOC 2",
    color: "#ef4444",
    score: 98,
    description: "Trust Services Criteria for security, availability, processing integrity, confidentiality, and privacy.",
    controls: [
      { name: "Access Controls",           pass: true  },
      { name: "Encryption in Transit",     pass: true  },
      { name: "Encryption at Rest",        pass: true  },
      { name: "Audit Logging",             pass: true  },
      { name: "Incident Response Plan",    pass: true  },
      { name: "Vendor Risk Management",    pass: true  },
    ],
  },
  {
    id: "pcidss",
    label: "PCI-DSS",
    color: "#f59e0b",
    score: 96,
    description: "Payment Card Industry Data Security Standard for organisations handling cardholder data.",
    controls: [
      { name: "Network Segmentation",      pass: true  },
      { name: "Cardholder Data Encryption",pass: true  },
      { name: "Vulnerability Scans",       pass: true  },
      { name: "Access Control Policies",   pass: true  },
      { name: "Security Testing",          pass: true  },
      { name: "Security Policy in Place",  pass: true  },
    ],
  },
  {
    id: "hipaa",
    label: "HIPAA",
    color: "#8b5cf6",
    score: 100,
    description: "Health Insurance Portability and Accountability Act — protects patient health information (PHI).",
    controls: [
      { name: "PHI Access Controls",       pass: true  },
      { name: "Audit Controls",            pass: true  },
      { name: "Transmission Security",     pass: true  },
      { name: "Data Integrity Controls",   pass: true  },
      { name: "Business Associate BAA",    pass: true  },
      { name: "Breach Notification Ready", pass: true  },
    ],
  },
  {
    id: "iso27001",
    label: "ISO 27001",
    color: "#3b82f6",
    score: 97,
    description: "International standard for Information Security Management Systems (ISMS).",
    controls: [
      { name: "ISMS Scope Defined",        pass: true  },
      { name: "Risk Assessment Complete",  pass: true  },
      { name: "Asset Management",          pass: true  },
      { name: "Cryptography Controls",     pass: true  },
      { name: "Physical Security",         pass: true  },
      { name: "Incident Management",       pass: true  },
    ],
  },
  {
    id: "cis",
    label: "CIS",
    color: "#10b981",
    score: 97,
    description: "CIS Benchmarks — consensus-based best practices for secure cloud configuration.",
    controls: [
      { name: "IAM Hardening",             pass: true  },
      { name: "Logging & Monitoring",      pass: true  },
      { name: "Network Controls",          pass: true  },
      { name: "Storage Encryption",        pass: true  },
      { name: "Compute Hardening",         pass: true  },
      { name: "No Public Access Exposed",  pass: true  },
    ],
  },
  {
    id: "nist",
    label: "NIST",
    color: "#06b6d4",
    score: 95,
    description: "NIST Cybersecurity Framework — Identify, Protect, Detect, Respond, and Recover functions.",
    controls: [
      { name: "Asset Inventory",           pass: true  },
      { name: "Protect Function Coverage", pass: true  },
      { name: "Detect Anomalies",          pass: true  },
      { name: "Respond Playbooks",         pass: true  },
      { name: "Recover Runbooks",          pass: true  },
      { name: "Continuous Improvement",    pass: true  },
    ],
  },
];

const SCAN_LOGS = [
  { text: "Scanning aws_vpc.main security groups...",      color: "#67e8f9" },
  { text: "IAM policies: No wildcard permissions found",   color: "#4ade80" },
  { text: "S3 buckets: Public access blocked on all 4",    color: "#4ade80" },
  { text: "RDS: Encryption at rest enabled",               color: "#4ade80" },
  { text: "CloudTrail: Logging enabled in all regions",    color: "#4ade80" },
  { text: "Security groups: No 0.0.0.0/0 on port 22",     color: "#4ade80" },
  { text: "KMS keys: Rotation enabled",                    color: "#4ade80" },
  { text: "CIS Score: 97/100 · No critical findings",      color: "#4ade80" },
  { text: "SOC 2 posture: PASSING (98/100 controls)",      color: "#4ade80" },
  { text: "Compliance scan complete — 0 violations",       color: "#4ade80" },
];

const FEATURES = [
  { icon: Shield,       title: "Compliance Baked into Every Deploy",  tag: "DevSecOps",    color: "#ef4444", desc: "SOC 2, HIPAA, PCI-DSS, ISO 27001, CIS, and NIST controls are enforced at the infrastructure level — automatically applied to every provisioned resource." },
  { icon: Eye,          title: "Continuous Compliance Monitoring",    tag: "Posture",      color: "#f59e0b", desc: "Real-time compliance posture across all frameworks. Drift from any control triggers an immediate alert with remediation steps — no quarterly audits needed." },
  { icon: Lock,         title: "Zero-Trust Network Architecture",     tag: "Network",      color: "#8b5cf6", desc: "Private subnets, least-privilege security groups, no public exposure by default. Network boundaries enforced by Terraform — not post-hoc firewall rules." },
  { icon: AlertTriangle,title: "SAST & Container Security Scanning",  tag: "Scanning",     color: "#3b82f6", desc: "Every CI/CD run includes SAST, dependency scanning, and container image scanning via Trivy. Vulnerabilities are blocked before they reach production." },
  { icon: CheckCircle,  title: "Audit-Ready Evidence Collection",     tag: "Audit",        color: "#10b981", desc: "Automated evidence collection for SOC 2 and ISO 27001 audits. Access logs, change history, policy docs, and control mappings — always up to date." },
  { icon: RefreshCw,    title: "Auto-Remediation on Violations",      tag: "Automation",   color: "#06b6d4", desc: "When a resource drifts from its compliance baseline, QuickInfra auto-remediates — reverts the change, logs the event, and notifies your team." },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Connect & Discover",      color: "#ef4444", desc: "QuickInfra connects to your AWS account and auto-discovers all resources. A baseline compliance scan runs immediately across all supported frameworks." },
  { step: "02", title: "Policies Applied",        color: "#f59e0b", desc: "CIS benchmarks, SOC 2 controls, and your selected compliance frameworks are applied as Terraform policies. Every future deployment inherits them." },
  { step: "03", title: "Continuous Monitoring",   color: "#8b5cf6", desc: "Real-time compliance drift detection runs 24/7. Any deviation from the baseline triggers an alert with the affected resource and recommended fix." },
  { step: "04", title: "Audit-Ready Always",      color: "#10b981", desc: "Evidence is collected and organised continuously. When an audit comes, you have a complete, structured evidence pack — no scrambling." },
];

const METRICS = [
  { before: "Quarterly", after: "Continuous", label: "Compliance checks", color: "#ef4444" },
  { before: "Weeks",     after: "Day One",    label: "Time to compliant",  color: "#f59e0b" },
  { before: "Manual",    after: "Automated",  label: "Audit evidence",     color: "#8b5cf6" },
  { before: "Unknown",   after: "97/100",     label: "CIS Benchmark score",color: "#10b981" },
];

const TESTIMONIALS = [
  { quote: "Security controls used to be an afterthought. With QuickInfra, every resource we provision is compliant from the moment it's created. SOC 2 prep went from months to days.",  company: "SalesGarners Marketing Pvt. Ltd.", role: "IT Manager",        initial: "S", color: "#ef4444" },
  { quote: "The SAST scan caught a critical issue in our pipeline before it hit prod. That one catch more than justified the entire platform. Zero configuration on our end.",              company: "Netsoftmate IT Solutions",        role: "Managing Director", initial: "N", color: "#8b5cf6" },
  { quote: "We encourage every startup to switch to QuickInfra. Compliance is built in. Our CIS score went from 61 to 97 in a single sprint.",                                             company: "CloudAge",                        role: "Director",          initial: "C", color: "#10b981" },
];

// ─── Widget: Compliance Posture Dashboard ─────────────────────────────────────

function SecurityWidget() {
  const [mounted,     setMounted]     = useState(false);
  const [activeTab,   setActiveTab]   = useState(0);
  const [phase,       setPhase]       = useState("posture"); // "posture" | "scanning" | "done"
  const [logLines,    setLogLines]    = useState([]);
  const [animId,      setAnimId]      = useState(null);
  const [scoreAnim,   setScoreAnim]   = useState(0);
  const logRef    = useRef(null);
  const cycleRef  = useRef(null);
  const timersRef = useRef([]);

  const clearTimers = () => { timersRef.current.forEach(clearTimeout); timersRef.current = []; };
  const addTimer    = (fn, ms) => { const id = setTimeout(fn, ms); timersRef.current.push(id); return id; };

  useEffect(() => { const t = setTimeout(() => setMounted(true), 120); return () => clearTimeout(t); }, []);
  useEffect(() => () => { clearTimers(); clearInterval(cycleRef.current); }, []);

  // Animate score on tab change
  useEffect(() => {
    setScoreAnim(0);
    const target = FRAMEWORKS[activeTab].score;
    let cur = 0;
    const iv = setInterval(() => {
      cur += 3;
      if (cur >= target) { setScoreAnim(target); clearInterval(iv); }
      else setScoreAnim(cur);
    }, 18);
    return () => clearInterval(iv);
  }, [activeTab]);

  // Auto-cycle frameworks
  const startCycle = () => {
    clearInterval(cycleRef.current);
    cycleRef.current = setInterval(() => {
      setActiveTab((p) => (p + 1) % FRAMEWORKS.length);
    }, 3200);
  };

  useEffect(() => { if (mounted) { startCycle(); runScan(); } }, [mounted]);

  const runScan = () => {
    addTimer(() => {
      setPhase("scanning"); setLogLines([]);
      SCAN_LOGS.forEach(({ text, color }, i) => {
        addTimer(() => {
          const lid = `scan-${i}`;
          setAnimId(lid);
          setLogLines((prev) => [...prev, { id: lid, text, color }]);
          if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
          if (i === SCAN_LOGS.length - 1) {
            addTimer(() => {
              setPhase("done"); setAnimId(null);
              addTimer(() => {
                setPhase("posture"); setLogLines([]);
                addTimer(() => runScan(), 4000);
              }, 3000);
            }, 400);
          }
        }, 300 + i * 450);
      });
    }, 2800);
  };

  const fw = FRAMEWORKS[activeTab];

  return (
    <div style={{ height: 520, width: "100%", opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0) scale(1)" : "translateY(28px) scale(0.97)", transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)", willChange: "opacity, transform" }}>
      <div className="h-full" >
        <div className="h-full flex flex-col rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700/50 shadow-2xl shadow-red-500/10 dark:shadow-black/50">

          {/* Header */}
          <div className="flex-shrink-0 flex items-center justify-between px-4 py-3 bg-[#0f172a] border-b border-white/8">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-[#ff5f57]" /><div className="w-3 h-3 rounded-full bg-[#febc2e]" /><div className="w-3 h-3 rounded-full bg-[#28c840]" /></div>
              <span className="ml-1 text-white/80 text-xs font-bold">Compliance Posture</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" /><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" /></span>
              <span className="text-[10px] font-bold text-green-400">{phase === "scanning" ? "Scanning" : "Live"}</span>
            </div>
          </div>

          {/* Framework tabs */}
          <div className="flex-shrink-0 flex border-b border-white/6 bg-[#0a0f1e] overflow-x-auto">
            {FRAMEWORKS.map(({ id, label, color }, i) => (
              <button key={id} onClick={() => { setActiveTab(i); clearInterval(cycleRef.current); startCycle(); }}
                className="flex-1 py-2 text-[9px] font-extrabold uppercase tracking-widest transition-all duration-300 whitespace-nowrap px-1"
                style={{ color: activeTab === i ? color : "#475569", borderBottom: `2px solid ${activeTab === i ? color : "transparent"}`, background: activeTab === i ? color + "0d" : "transparent" }}>
                {label}
              </button>
            ))}
          </div>

          {/* Main panel */}
          <div className="flex-1 overflow-hidden bg-[#0d1117] relative">

            {/* Posture view */}
            <div style={{ position: "absolute", inset: 0, opacity: phase === "posture" ? 1 : 0, transform: phase === "posture" ? "translateY(0)" : "translateY(-6px)", transition: "opacity 0.35s ease, transform 0.35s ease", pointerEvents: phase === "posture" ? "auto" : "none", overflow: "auto", padding: "16px" }}>
              {/* Score ring + description */}
              <div className="flex items-center gap-5 mb-4">
                {/* Score circle */}
                <div className="relative flex-shrink-0 w-20 h-20">
                  <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                    <circle cx="40" cy="40" r="32" fill="none" stroke="#1e293b" strokeWidth="6" />
                    <circle cx="40" cy="40" r="32" fill="none" strokeWidth="6"
                      stroke={fw.color}
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 32}`}
                      strokeDashoffset={`${2 * Math.PI * 32 * (1 - scoreAnim / 100)}`}
                      style={{ transition: "stroke-dashoffset 0.05s linear" }} />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-lg font-extrabold text-white leading-none">{scoreAnim}</span>
                    <span className="text-[8px] text-white/40 font-bold">/100</span>
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-extrabold uppercase tracking-widest mb-1" style={{ color: fw.color }}>{fw.label} Compliance</div>
                  <div className="text-[10px] text-white/40 leading-relaxed">{fw.description}</div>
                </div>
              </div>

              {/* Controls checklist */}
              <div className="space-y-1.5">
                <div className="text-[9px] font-extrabold uppercase tracking-widest text-white/25 mb-2">Controls</div>
                {fw.controls.map(({ name, pass }) => (
                  <div key={name} className="flex items-center gap-2.5 px-3 py-2 rounded-lg" style={{ background: "#161b27", border: "1px solid #1e293b" }}>
                    <span className="text-[10px] flex-shrink-0" style={{ color: pass ? "#4ade80" : "#f87171" }}>{pass ? "✓" : "✗"}</span>
                    <span className="text-[10px] text-white/60">{name}</span>
                    <span className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: pass ? "#4ade8015" : "#f8717115", color: pass ? "#4ade80" : "#f87171" }}>{pass ? "PASS" : "FAIL"}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Scan log view */}
            <div ref={logRef} style={{ position: "absolute", inset: 0, opacity: phase !== "posture" ? 1 : 0, transform: phase !== "posture" ? "translateY(0)" : "translateY(6px)", transition: "opacity 0.35s ease, transform 0.35s ease", pointerEvents: phase !== "posture" ? "auto" : "none", overflow: "auto", padding: "12px 16px", fontFamily: "ui-monospace, 'JetBrains Mono', monospace" }}>
              <div className="text-[10px] font-extrabold text-white/30 uppercase tracking-widest mb-3">Running compliance scan · EC2 DevOps Infra</div>
              {logLines.map(({ id, text, color }) => (
                <div key={id} className="flex items-start gap-2 mb-1.5"
                  style={id === animId ? { animation: "logLineIn 0.3s cubic-bezier(0.16,1,0.3,1) forwards" } : { opacity: 1 }}>
                  <span className="text-[9px] text-[#334155] w-5 text-right flex-shrink-0">{logLines.findIndex((l) => l.id === id) + 1}</span>
                  <span className="text-[10.5px] leading-relaxed" style={{ color }}>{text}</span>
                </div>
              ))}
              {phase === "scanning" && <div className="flex items-start gap-2 mt-1"><span className="text-[9px] text-[#334155] w-5 text-right">{logLines.length + 1}</span><span className="inline-block w-2 h-[13px]" style={{ background: "#4ade80", animation: "dashBlink 1s step-end infinite" }} /></div>}
              {phase === "done" && <div className="mt-3 text-[10px] font-bold text-white/20 font-mono">— scan exited with code 0 · 0 violations found —</div>}
            </div>
          </div>

          {/* Footer */}
          <div className="flex-shrink-0 border-t border-white/6 px-4 py-2.5 bg-[#0a0f1e] grid grid-cols-3 gap-2">
            {[["Frameworks", "6 Active"], ["Violations", "0 Found"], ["Posture", "Excellent"]].map(([k, v]) => (
              <div key={k} className="text-center">
                <div className="text-[9px] text-white/30 uppercase tracking-widest">{k}</div>
                <div className="text-[11px] font-extrabold text-red-400">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SecurityPage() {
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

      {/* HERO */}
      <section className="relative min-h-[88vh] flex items-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-60 dark:opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(239,68,68,0.07),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(239,68,68,0.14),transparent)]" />
        <div className="relative max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-7 border border-red-200 dark:border-red-500/30 bg-red-50 dark:bg-red-500/10"
                style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(12px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
                <Shield size={11} className="text-red-600 dark:text-red-400" />
                <span className="text-xs font-bold tracking-widest text-red-600 dark:text-red-400 uppercase">Security & Compliance</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.07] tracking-tight mb-6"
                style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(18px)", transition: "opacity 0.65s ease 0.08s, transform 0.65s ease 0.08s" }}>
                Compliant from<br /><span className="text-red-600 dark:text-red-400">day one.</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-8 max-w-xl"
                style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(18px)", transition: "opacity 0.65s ease 0.16s, transform 0.65s ease 0.16s" }}>
                SOC 2, HIPAA, PCI-DSS, ISO 27001, CIS, and NIST controls are baked into every infrastructure deployment — not bolted on later. Continuous compliance monitoring so you're always audit-ready.
              </p>
              <div className="flex flex-wrap gap-3 mb-10"
                style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(18px)", transition: "opacity 0.65s ease 0.24s, transform 0.65s ease 0.24s" }}>
                <Link href="https://console.quickinfra.cloud/" className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/25 transition-all hover:-translate-y-0.5">
                  Start Free Trial <ArrowRight size={15} />
                </Link>
               
              </div>
              <div className="flex flex-wrap gap-6"
                style={{ opacity: heroVisible ? 1 : 0, transition: "opacity 0.65s ease 0.32s" }}>
                {[["ISO 27001", "Certified"], ["SOC 2", "Ready"], ["PCI-DSS", "Compliant"], ["HIPAA", "Ready"]].map(([v, l]) => (
                  <div key={v}><div className="text-sm font-extrabold text-red-600 dark:text-red-400">{v}</div><div className="text-xs text-slate-400 mt-0.5">{l}</div></div>
                ))}
              </div>
            </div>
            <SecurityWidget />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section ref={statsRef} className="py-14 px-4 sm:px-6 lg:px-8 border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-5">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 text-center hover:-translate-y-1 transition-all hover:shadow-lg">
              <div className={`text-4xl font-extrabold tracking-tight mb-2 transition-colors duration-700 ${statsVisible ? "text-red-600 dark:text-red-400" : "text-slate-200 dark:text-slate-800"}`}>{s.value}</div>
              <div className="font-bold text-sm mb-1">{s.label}</div>
              <div className="text-xs text-slate-400 font-light">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FRAMEWORKS GRID */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold tracking-widest uppercase text-red-600 dark:text-red-400 mb-3">Supported Frameworks</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">Six Frameworks. One Platform.</h2>
            <p className="text-base text-slate-500 dark:text-slate-400 font-light max-w-lg mx-auto">Every compliance framework enforced automatically — no separate tools, no per-standard configuration.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FRAMEWORKS.map(({ label, color, score, description, controls }) => (
              <div key={label} className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 hover:-translate-y-1 transition-all hover:shadow-lg cursor-default relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-0.5 transition-opacity duration-300 opacity-0 group-hover:opacity-100" style={{ background: `linear-gradient(90deg, ${color}, ${color}44)` }} />
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-extrabold tracking-tight">{label}</span>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-extrabold" style={{ background: color + "12", color, border: `1px solid ${color}30` }}>
                    {score}/100
                  </div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-4">{description}</p>
                <div className="space-y-1">
                  {controls.slice(0, 3).map(({ name }) => (
                    <div key={name} className="flex items-center gap-2">
                      <span className="text-[10px]" style={{ color: "#4ade80" }}>✓</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">{name}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px]" style={{ color }}>+</span>
                    <span className="text-[10px]" style={{ color }}>{controls.length - 3} more controls</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold tracking-widest uppercase text-red-600 dark:text-red-400 mb-3">Platform Capabilities</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">Security at Every Layer</h2>
            <p className="text-base text-slate-500 dark:text-slate-400 font-light max-w-lg mx-auto">From network architecture to CI/CD gates — security isn't a feature, it's the default.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(({ icon: Icon, title, tag, color, desc }) => (
              <div key={title} className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 hover:-translate-y-1 transition-all hover:shadow-lg cursor-default">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: color + "15", color, border: `1.5px solid ${color}30` }}><Icon size={18} /></div>
                  <span className="text-[10px] font-extrabold tracking-widest uppercase text-slate-400">{tag}</span>
                </div>
                <h3 className="text-sm font-extrabold mb-2.5 leading-snug group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">{title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[10px] font-bold tracking-widest uppercase text-red-600 dark:text-red-400 mb-3">Real Impact</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Before vs After</h2>
          </div>
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

      {/* HOW IT WORKS */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold tracking-widest uppercase text-red-600 dark:text-red-400 mb-3">How It Works</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">Audit-Ready from the First Deploy</h2>
            <p className="text-base text-slate-500 dark:text-slate-400 font-light max-w-lg mx-auto">Four steps to continuous compliance — no dedicated security team required.</p>
          </div>
          <div className="relative">
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {HOW_IT_WORKS.map(({ step, title, color, desc }) => (
                <div key={step} className="flex flex-col items-center text-center group">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5 text-xl font-extrabold font-mono z-10 transition-all duration-300 group-hover:scale-110"
                    style={{ background: color + "12", color, border: `2px solid ${color}30` }}>{step}</div>
                  <h3 className="text-sm font-extrabold mb-2 tracking-tight">{title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[10px] font-bold tracking-widest uppercase text-red-600 dark:text-red-400 mb-3">Customer Stories</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Security That Ships With Your Infra</h2>
          </div>
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

      {/* CTA */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(239,68,68,0.06),transparent)] dark:bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(239,68,68,0.12),transparent)]" />
        <div className="relative max-w-2xl mx-auto text-center">
          <p className="text-[10px] font-bold tracking-widest uppercase text-red-600 dark:text-red-400 mb-6">Get Started</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-6">Stop patching. Start compliant.</h2>
          <p className="text-base text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-10">
            Start your free trial. SOC 2, HIPAA, PCI-DSS, and ISO 27001 compliance enforced from the first deploy. No security team needed.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="https://console.quickinfra.cloud/" className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold bg-red-600 hover:bg-red-500 text-white shadow-xl shadow-red-600/25 transition-all hover:-translate-y-0.5">
              Start Free Trial <ArrowRight size={16} />
            </Link>
            
          </div>
          <p className="mt-6 text-[10px] font-bold tracking-widest uppercase text-slate-300 dark:text-slate-700">ISO 27001 · AWS Select Partner · SOC 2 Ready · PCI-DSS · HIPAA</p>
        </div>
      </section>

    </div>
  );
}