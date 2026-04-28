"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Zap, Cloud, Shield, Settings, BarChart2, RefreshCw, Play } from "lucide-react";

const STATS = [
  { value: "5×",   label: "Faster Provisioning",  sub: "Automated Terraform generation"    },
  { value: "65%",  label: "Cost Reduction",        sub: "Right-sized resources, zero waste" },
  { value: "100%", label: "IaC Coverage",          sub: "Every resource version-controlled" },
  { value: "0",    label: "Manual Configs",        sub: "Auto-generated, drift-free infra"  },
];

const TF_RESOURCES = [
  { type: "VPC",   module: "SimpleVPC",   region: "ap-south-1", status: "Active", color: "#3b82f6" },
  { type: "SG",    module: "SG-Web",      region: "ap-south-1", status: "Active", color: "#8b5cf6" },
  { type: "EC2",   module: "EC2-Blue",    region: "ap-south-1", status: "Active", color: "#10b981" },
  { type: "EC2",   module: "EC2-Green",   region: "ap-south-1", status: "Active", color: "#10b981" },
  { type: "RDS",   module: "DB-Primary",  region: "ap-south-1", status: "Active", color: "#f59e0b" },
  { type: "S3",    module: "Assets-Prod", region: "ap-south-1", status: "Active", color: "#ef4444" },
];

const ACTIONS = ["Generate Terraform", "View Plan", "Apply", "Destroy"];

const LOGS = {
  "Generate Terraform": [
    { text: "Fetching infrastructure project details...", color: "#e2e8f0" },
    { text: "Detecting resource graph...",                color: "#67e8f9" },
    { text: "Writing modules/vpc/main.tf",                color: "#67e8f9" },
    { text: "Writing modules/ec2/main.tf",                color: "#67e8f9" },
    { text: "Writing modules/rds/main.tf",                color: "#67e8f9" },
    { text: "Formatting with terraform fmt",              color: "#e2e8f0" },
    { text: "Terraform Generation = Success",             color: "#4ade80" },
  ],
  "View Plan": [
    { text: "terraform init · provider registry.terraform.io", color: "#64748b" },
    { text: "Refreshing state · aws_vpc.main",                  color: "#67e8f9" },
    { text: "Refreshing state · aws_instance.ec2_blue",         color: "#67e8f9" },
    { text: "Refreshing state · aws_db_instance.primary",       color: "#67e8f9" },
    { text: "Plan: 0 to add, 0 to change, 0 to destroy",        color: "#4ade80" },
    { text: "No infrastructure changes detected",               color: "#4ade80" },
  ],
  "Apply": [
    { text: "terraform apply -auto-approve",              color: "#64748b" },
    { text: "aws_vpc.main: Creating...",                  color: "#67e8f9" },
    { text: "aws_vpc.main: Creation complete (2s)",       color: "#4ade80" },
    { text: "aws_instance.ec2_blue: Creating...",         color: "#67e8f9" },
    { text: "aws_instance.ec2_green: Creating...",        color: "#67e8f9" },
    { text: "aws_db_instance.primary: Creating...",       color: "#67e8f9" },
    { text: "Apply complete! Resources: 6 added",         color: "#4ade80" },
  ],
  "Destroy": [
    { text: "terraform destroy -auto-approve",            color: "#64748b" },
    { text: "aws_db_instance.primary: Destroying...",     color: "#fbbf24" },
    { text: "aws_instance.ec2_blue: Destroying...",       color: "#fbbf24" },
    { text: "aws_instance.ec2_green: Destroying...",      color: "#fbbf24" },
    { text: "aws_vpc.main: Destroying...",                color: "#fbbf24" },
    { text: "Destroy complete! Resources: 6 destroyed",   color: "#f87171" },
  ],
};

const FEATURES = [
  { icon: Zap,       title: "Auto-Generated Terraform",     tag: "IaC",         color: "#3b82f6", desc: "Describe your infra requirements once. QuickInfra generates production-grade Terraform — VPCs, subnets, security groups, compute, databases — automatically." },
  { icon: Shield,    title: "Compliance by Default",        tag: "Security",    color: "#ef4444", desc: "Every provisioned resource inherits CIS benchmarks, SOC 2, HIPAA, and PCI-DSS controls. Security policies are infra-level, not afterthoughts." },
  { icon: Cloud,     title: "Multi-Cloud Support",          tag: "Portability", color: "#06b6d4", desc: "Provision across AWS, Azure, and GCP from a single platform. Unified resource model, one dashboard, no cloud-specific scripts to maintain." },
  { icon: RefreshCw, title: "Drift Detection & Correction", tag: "Reliability", color: "#8b5cf6", desc: "Continuous state comparison between your IaC definition and live cloud resources. Auto-remediates drift without manual intervention." },
{ icon:  BarChart2, title: "Scale & Teardown on Demand", tag: "Elasticity", color: "#ec4899", desc: "Spin up full environments or tear them down in one click. Scale infra up for peak load, delete it when you're done — no orphaned resources, no surprise bills." },  { icon: Settings,  title: "Module Library",               tag: "Templates",   color: "#10b981", desc: "Pre-built Terraform modules for every common pattern — blue/green EC2, RDS HA, EKS clusters, CloudFront distributions." },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Define Requirements",   color: "#3b82f6", desc: "Select your cloud provider, region, and resource types from the QuickInfra console. Guided form — no YAML, no CLI." },
  { step: "02", title: "Terraform Generated",   color: "#8b5cf6", desc: "QuickInfra generates modular, formatted Terraform for every resource. Review the plan before anything is touched." },
  { step: "03", title: "One-Click Apply",        color: "#10b981", desc: "Apply directly from the console. State management, remote backends, and provider auth are handled automatically." },
  { step: "04", title: "Continuous Management", color: "#f59e0b", desc: "Drift detection, auto-healing, cost monitoring, and update pipelines run continuously — infra stays healthy." },
];

const METRICS = [
  { before: "3 weeks",   after: "4 hours",   label: "Initial setup",     color: "#3b82f6" },
  { before: "Manual",    after: "Generated", label: "Terraform writing", color: "#8b5cf6" },
  { before: "$1.3L/mo",  after: "$84K/mo",  label: "Infra cost",        color: "#f59e0b" },
  { before: "Reactive",  after: "Automated", label: "Drift handling",    color: "#10b981" },
];

const TESTIMONIALS = [
  { quote: "We saved 70% on AWS infrastructure management costs. QuickInfra changed how we think about cloud ops entirely.", company: "SalesGarners Marketing Pvt. Ltd.", role: "IT Manager",        initial: "S", color: "#3b82f6" },
  { quote: "End-to-end automation cut our migration time dramatically. What used to take months took weeks.",                 company: "Netsoftmate IT Solutions",        role: "Managing Director", initial: "N", color: "#8b5cf6" },
  { quote: "Infra provisioning that used to need a dedicated DevOps engineer now happens automatically. Game changer.",        company: "CloudAge",                        role: "Director",          initial: "C", color: "#10b981" },
];

function InfraWidget() {
  const [mounted,     setMounted]     = useState(false);
  const [phase,       setPhase]       = useState("table");
  const [action,      setAction]      = useState("Generate Terraform");
  const [logLines,    setLogLines]    = useState([]);
  const [animId,      setAnimId]      = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const logRef    = useRef(null);
  const timersRef = useRef([]);

  const clearTimers = () => { timersRef.current.forEach(clearTimeout); timersRef.current = []; };
  const addTimer    = (fn, ms) => { const id = setTimeout(fn, ms); timersRef.current.push(id); return id; };

  useEffect(() => { const t = setTimeout(() => setMounted(true), 120); return () => clearTimeout(t); }, []);
  useEffect(() => () => clearTimers(), []);

  const runAction = (act) => {
    clearTimers();
    setPhase("running"); setLogLines([]); setAnimId(null); setShowSuccess(false);
    const logs = LOGS[act] || LOGS["Generate Terraform"];
    logs.forEach(({ text, color }, i) => {
      addTimer(() => {
        const lid = `${act}-${i}`;
        setAnimId(lid);
        setLogLines((prev) => [...prev, { id: lid, text, color }]);
        if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
        if (i === logs.length - 1) {
          addTimer(() => {
            setPhase("done"); setAnimId(null); setShowSuccess(true);
            addTimer(() => {
              setShowSuccess(false);
              addTimer(() => { setPhase("table"); setLogLines([]); addTimer(() => runAction("Generate Terraform"), 1800); }, 400);
            }, 2600);
          }, 400);
        }
      }, i * 380);
    });
  };

  useEffect(() => { if (mounted) addTimer(() => runAction("Generate Terraform"), 1000); }, [mounted]);

  return (
    <div style={{ height: 520, width: "100%", opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0) scale(1)" : "translateY(28px) scale(0.97)", transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)", willChange: "opacity, transform" }}>
      <div className="h-full" >
        <div className="h-full flex flex-col rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700/50 shadow-2xl shadow-blue-500/10 dark:shadow-black/50">

          <div className="flex-shrink-0 flex items-center gap-2 px-4 py-3 bg-[#1a1f2e] border-b border-white/8">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-[#ff5f57]" /><div className="w-3 h-3 rounded-full bg-[#febc2e]" /><div className="w-3 h-3 rounded-full bg-[#28c840]" /></div>
            <span className="ml-2 text-white/80 text-xs font-bold">Infrastructure Console</span>
            {phase !== "table" && (
              <span className="ml-2 flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md" style={{ background: "#3b82f620", color: "#60a5fa", border: "1px solid #3b82f630" }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: phase === "running" ? "#fbbf24" : "#4ade80", animation: phase === "running" ? "dashPulse 1s ease-in-out infinite" : "none" }} />
                {action}
              </span>
            )}
            <div className="ml-auto flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ animation: "dashPulse 2s ease-in-out infinite" }} />
              <span className="text-[10px] font-bold text-green-400">AWS Connected</span>
            </div>
          </div>

          <div className="flex-shrink-0 flex items-center justify-between px-4 py-2 bg-[#151929] border-b border-white/6">
            <span className="text-[11px] font-bold text-white/70">EC2 DevOps Infra · ap-south-1</span>
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600/20 text-blue-400 border border-blue-500/30">⬡ Terraform</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold text-white/30 border border-white/10">Ansible</span>
            </div>
          </div>

          <div className="flex-1 overflow-hidden bg-[#0d1117] relative">
            <div style={{ position: "absolute", inset: 0, opacity: phase === "table" ? 1 : 0, transform: phase === "table" ? "translateY(0)" : "translateY(-8px)", transition: "opacity 0.3s ease, transform 0.3s ease", pointerEvents: phase === "table" ? "auto" : "none", overflow: "auto" }}>
              <div className="flex items-center gap-3 px-4 py-2.5 border-b border-white/6 bg-[#161b27]">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-white/40 w-16">Type</span>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-white/40 flex-1">Module</span>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-white/40 w-28 hidden sm:block">Region</span>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-white/40 w-16 text-right">Status</span>
              </div>
              {TF_RESOURCES.map((r, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-2.5 border-b border-white/4 hover:bg-white/3 transition-colors">
                  <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded w-16" style={{ background: r.color + "15", color: r.color }}>{r.type}</span>
                  <span className="text-[11px] font-mono text-white/60 flex-1">{r.module}</span>
                  <span className="text-[10px] text-white/35 w-28 hidden sm:block">{r.region}</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-green-500/15 text-green-400 border border-green-500/20 w-16 text-center">{r.status}</span>
                </div>
              ))}
            </div>

            <div ref={logRef} style={{ position: "absolute", inset: 0, opacity: phase !== "table" ? 1 : 0, transform: phase !== "table" ? "translateY(0)" : "translateY(8px)", transition: "opacity 0.3s ease, transform 0.3s ease", pointerEvents: phase !== "table" ? "auto" : "none", overflow: "auto", padding: "12px 16px", fontFamily: "ui-monospace, 'JetBrains Mono', monospace" }}>
              {logLines.map(({ id, text, color }) => (
                <div key={id} className="flex items-start gap-2 mb-1.5"
                  style={id === animId ? { animation: "logLineIn 0.3s cubic-bezier(0.16,1,0.3,1) forwards" } : { opacity: 1 }}>
                  <span className="text-[10px] text-[#334155] w-6 text-right flex-shrink-0">{logLines.findIndex((l) => l.id === id) + 1}</span>
                  <span className="text-[11px] leading-relaxed" style={{ color }}>{text}</span>
                </div>
              ))}
              {phase === "running" && <div className="flex items-start gap-2 mt-1"><span className="text-[10px] text-[#334155] w-6 text-right">{logLines.length + 1}</span><span className="inline-block w-2 h-[13px]" style={{ background: "#4ade80", animation: "dashBlink 1s step-end infinite" }} /></div>}
              {phase === "done" && <div className="mt-3 text-[10px] font-bold text-white/20 font-mono">— process exited with code 0 —</div>}
            </div>
          </div>

          <div className="flex-shrink-0 bg-[#161b27] border-t border-white/8 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                <span className="text-[10px] font-bold text-white/60 whitespace-nowrap">AWS Dev</span>
              </div>
              <div className="relative flex-1">
                <select value={action} onChange={(e) => setAction(e.target.value)} disabled={phase === "running"}
                  className="w-full appearance-none text-[10px] font-bold rounded-lg px-3 py-1.5 pr-6 focus:outline-none"
                  style={{ background: "#1e2535", border: "1px solid rgba(255,255,255,0.1)", color: "#93c5fd" }}>
                  {ACTIONS.map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none text-[10px]">▾</span>
              </div>
              <button onClick={() => { if (phase !== "running") runAction(action); }} disabled={phase === "running"}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[11px] font-extrabold transition-all"
                style={{ background: phase === "running" ? "#1e40af80" : "#2563eb", color: phase === "running" ? "#93c5fd80" : "#fff", border: "1px solid rgba(96,165,250,0.3)", cursor: phase === "running" ? "not-allowed" : "pointer", boxShadow: phase === "running" ? "none" : "0 0 16px #3b82f630" }}>
                {phase === "running"
                  ? <><span style={{ width: 10, height: 10, borderRadius: "50%", display: "inline-block", borderTop: "2px solid #93c5fb", borderRight: "2px solid transparent", animation: "dashSpin 0.8s linear infinite" }} />Running</>
                  : "▶ Execute"}
              </button>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-[9px] text-white/20 font-mono">Terraform console ready</span>
              {phase !== "table" && <span className="text-[9px] text-white/20 font-mono">{phase === "running" ? "executing..." : "✓ completed"}</span>}
            </div>
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 90, right: 10, opacity: showSuccess ? 1 : 0, transform: showSuccess ? "translateY(0) scale(1)" : "translateY(8px) scale(0.96)", transition: "opacity 0.3s ease, transform 0.3s ease", pointerEvents: "none", zIndex: 10 }}>
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-[11px] font-bold" style={{ background: "#052e16", border: "1px solid #166534", color: "#4ade80", boxShadow: "0 8px 24px #00000060" }}>
          <span className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center text-[9px]">✓</span>
          Success · {action}
        </div>
      </div>
    </div>
  );
}

export default function InfraProvisioningPage() {
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(59,130,246,0.09),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(59,130,246,0.17),transparent)]" />
        <div className="relative max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-7 border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10"
                style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(12px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
                <Zap size={11} className="text-blue-600 dark:text-blue-400" />
                <span className="text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">Infrastructure Provisioning</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.07] tracking-tight mb-6"
                style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(18px)", transition: "opacity 0.65s ease 0.08s, transform 0.65s ease 0.08s" }}>
                Infra in hours.<br /><span className="text-blue-600 dark:text-blue-500">Not weeks.</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-8 max-w-xl"
                style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(18px)", transition: "opacity 0.65s ease 0.16s, transform 0.65s ease 0.16s" }}>
                QuickInfra auto-generates Terraform for every resource you need — VPCs, EC2, RDS, EKS — and provisions to your cloud account in one click. No scripts. No tickets. No waiting.
              </p>
              <div className="flex flex-wrap gap-3 mb-10"
                style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(18px)", transition: "opacity 0.65s ease 0.24s, transform 0.65s ease 0.24s" }}>
                <Link href="https://console.quickinfra.cloud/" className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25 transition-all hover:-translate-y-0.5">Start Free Trial <ArrowRight size={15} /></Link>
              </div>
              <div className="flex flex-wrap gap-6" style={{ opacity: heroVisible ? 1 : 0, transition: "opacity 0.65s ease 0.32s" }}>
                {[["5×", "Faster provisioning"], ["0", "Manual configs"], ["65%", "Cost reduction"]].map(([v, l]) => (
                  <div key={l}><div className="text-sm font-extrabold text-blue-600 dark:text-blue-500">{v}</div><div className="text-xs text-slate-400 mt-0.5">{l}</div></div>
                ))}
              </div>
            </div>
            <InfraWidget />
          </div>
        </div>
      </section>

      <section ref={statsRef} className="py-14 px-4 sm:px-6 lg:px-8 border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-5">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 text-center hover:-translate-y-1 transition-all hover:shadow-lg">
              <div className={`text-4xl font-extrabold tracking-tight mb-2 transition-colors duration-700 ${statsVisible ? "text-blue-600 dark:text-blue-500" : "text-slate-200 dark:text-slate-800"}`}>{s.value}</div>
              <div className="font-bold text-sm mb-1">{s.label}</div>
              <div className="text-xs text-slate-400 font-light">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14"><p className="text-[10px] font-bold tracking-widest uppercase text-blue-600 dark:text-blue-500 mb-3">Platform Capabilities</p><h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">Everything Provisioning Needs</h2><p className="text-base text-slate-500 dark:text-slate-400 font-light max-w-lg mx-auto">Auto-generated IaC, multi-cloud, compliant from day one.</p></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(({ icon: Icon, title, tag, color, desc }) => (
              <div key={title} className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 hover:-translate-y-1 transition-all hover:shadow-lg cursor-default">
                <div className="flex items-center gap-3 mb-5"><div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: color + "15", color, border: `1.5px solid ${color}30` }}><Icon size={18} /></div><span className="text-[10px] font-extrabold tracking-widest uppercase text-slate-400">{tag}</span></div>
                <h3 className="text-sm font-extrabold mb-2.5 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10"><p className="text-[10px] font-bold tracking-widest uppercase text-blue-600 dark:text-blue-500 mb-3">Real Impact</p><h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Before vs After</h2></div>
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
          <div className="text-center mb-14"><p className="text-[10px] font-bold tracking-widest uppercase text-blue-600 dark:text-blue-500 mb-3">How It Works</p><h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">From Click to Cloud in Hours</h2><p className="text-base text-slate-500 dark:text-slate-400 font-light max-w-lg mx-auto">Four steps. No DevOps hire. No config files.</p></div>
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
          <div className="text-center mb-12"><p className="text-[10px] font-bold tracking-widest uppercase text-blue-600 dark:text-blue-500 mb-3">Customer Stories</p><h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Teams That Made the Switch</h2></div>
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(59,130,246,0.07),transparent)] dark:bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(59,130,246,0.13),transparent)]" />
        <div className="relative max-w-2xl mx-auto text-center">
          <p className="text-[10px] font-bold tracking-widest uppercase text-blue-600 dark:text-blue-500 mb-6">Get Started</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-6">Cloud infra, without the ops overhead.</h2>
          <p className="text-base text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-10">Start your free trial. No credit card. <br/> Production-ready infra in under an hour.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="https://console.quickinfra.cloud/" className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/25 transition-all hover:-translate-y-0.5">Start Free Trial <ArrowRight size={16} /></Link>
          </div>
          <p className="mt-6 text-[10px] font-bold tracking-widest uppercase text-slate-300 dark:text-slate-700">ISO/IEC 27001 · AWS Qualified Software · SOC 2 Ready</p>
        </div>
      </section>

    </div>
  );
}