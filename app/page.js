"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight, Play, ChevronRight,
  Zap, RefreshCw, Shield, Cloud, BarChart2, Settings,
  Rocket, Users, Building2, Quote,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const STATS = [
  { value: "5x",   label: "Faster Launches",        sub: "Automated deployment pipelines" },
  { value: "65%",  label: "Cost Reduction",          sub: "One platform for all infra needs" },
  { value: "4x",   label: "Developer Productivity",  sub: "Auto-generated IaC scripts" },
  { value: "100%", label: "Compliant from Day One",  sub: "SOC2, HIPAA, PCI-DSS built-in" },
];

const FEATURES = [
  { icon: Zap,       title: "Auto Infrastructure Provisioning", tag: "IaC",           desc: "Define once, deploy anywhere. Auto-generates Terraform configs and provisions cloud resources — no scripts, no ops tickets." },
  { icon: RefreshCw, title: "One-Click CI/CD Setup",            tag: "CI/CD",         desc: "From repo to production in minutes. Preconfigured pipelines, zero YAML wrestling. Your team ships features, not fixes." },
  { icon: Shield,    title: "Security & Compliance",            tag: "DevSecOps",     desc: "SOC 2, PCI-DSS, HIPAA, GDPR controls baked into every deployment. Security is your default configuration." },
  { icon: Cloud,     title: "Cloud Deployment",                  tag: "Deployments",     desc: "Deploy to any cloud in minutes. Pre-built templates handle the heavy lifting — no manual config, no downtime, no surprises." },
  { icon: BarChart2, title: "Cloud Monitoring",              tag: "Observability", desc: "Real-time visibility into your cloud stack. Cost anomaly detection, predictive alerts, and health dashboards." },
  { icon: Settings,  title: "Automated InfraOps",               tag: "Automation",    desc: "Predictive scaling, drift detection, and continuous cost optimisation — running 24/7 so your team doesn't have to." },
];

const PERSONAS = [
  {
    who: "Startups & Founders",
    icon: Rocket,
    tag: "Move fast, break nothing",
    color: "#3b82f6",
    pain: "You're shipping features but infra setup is eating your sprints. One misconfigured pipeline can kill a launch.",
    solution: "Create production-grade cloud in hours, not weeks. Auto-provisioned, pre-secured, compliant from day one. Focus on your product.",
    metrics: [
      { label: "Setup time",  before: "3 weeks",  after: "4 hours"  },
      { label: "Infra cost",  before: "₹2.4L/mo", after: "₹84K/mo" },
    ],
  },
  {
    who: "Engineering Teams",
    icon: Users,
    tag: "Let engineers do engineering",
    color: "#8b5cf6",
    pain: "Your best devs are writing Terraform and debugging YAML instead of building the product you hired them for.",
    solution: "Automate the entire ops layer. Auto-generated IaC, one-click CI/CD, zero pipeline overhead. Engineers ship features.",
    metrics: [
      { label: "Dev productivity", before: "1x",     after: "4x"    },
      { label: "Deploy frequency", before: "Weekly", after: "Daily" },
    ],
  },
  {
    who: "Non-Tech SMEs",
    icon: Building2,
    tag: "Cloud without a DevOps team",
    color: "#10b981",
    pain: "Cloud is expensive and complex. You don't have a DevOps hire and can't afford to get it wrong.",
    solution: "Fully managed InfraOps. No in-house expertise needed. We provision, secure, monitor and optimise your cloud continuously.",
    metrics: [
      { label: "Infra incidents", before: "12/mo",        after: "0/mo"       },
      { label: "Cloud spend",     before: "Unpredictable", after: "Optimised" },
    ],
  },
];

const INTEGRATIONS = [
  "AWS", "Terraform", "Ansible", "Kubernetes", "Docker",
  "GitHub", "GitLab", "Jenkins", "Prometheus", "Grafana",
  "Datadog", "ArgoCD", "Helm", "Vault", "Nginx",
];

const TESTIMONIALS = [
  { quote: "We saved 70% on AWS infrastructure management costs. QuickInfra changed how we think about cloud ops entirely.", company: "SalesGarners Marketing Pvt. Ltd.", role: "IT Manager",        initial: "S" },
  { quote: "End-to-end migration automation cut our migration time dramatically. What used to take months took weeks.",     company: "Netsoftmate IT Solutions",      role: "Managing Director", initial: "N" },
  { quote: "We encourage every startup to switch to QuickInfra. Hassle-free DevOps infra management, period.",             company: "CloudAge",                      role: "Director",          initial: "C" },
];

// ─── Terraform Terminal Widget Data ─────────────────────────────────────────

const TF_SERVICES = [
  { type: "VPC",       module: "SimpleVPC",     desc: "Simple VPC Network",  status: "Active" },
  { type: "SG",        module: "SG-Web",        desc: "Web Security Group",  status: "Active" },
  { type: "KeyPair",   module: "SingleAZ_Key",  desc: "SSH Key Pair",        status: "Active" },
  { type: "EC2",       module: "EC2-Blue",      desc: "App Server Blue",     status: "Active" },
  { type: "EC2",       module: "EC2-Green",     desc: "App Server Green",    status: "Active" },
];

const TF_ACTIONS = [
  "Generate Terraform",
  "View Terraform Plan",
  "Create Infrastructure",
  "Plan and Create",
  "Remove Infrastructure",
];

// Log sets per action — each line: [text, color]
// color: "default" | "green" | "yellow" | "cyan" | "red" | "dim"
const TF_LOGS = {
  "Generate Terraform": [
    ["Starting Infrastructure Activity...",              "default"],
    ["Fetching Infrastructure Project Service details",  "default"],
    ["Project Status set to 'In-Progress'",              "yellow" ],
    ["Cleaning Project Output Folder",                   "dim"    ],
    ["Generating Terraform Files",                       "cyan"   ],
    ["Formatting Terraform Files",                       "cyan"   ],
    ["Completed Terraform Generation",                   "green"  ],
    ["Completed Infrastructure activity...",             "green"  ],
    ["Project Status reset to 'Active'",                 "default"],
    ["========================================",         "dim"    ],
    ["Terraform Generation Status = Success",            "green"  ],
  ],
  "View Terraform Plan": [
    ["Initialising Terraform...",                        "default"],
    ["terraform init · provider registry.terraform.io", "dim"    ],
    ["Refreshing state · aws_vpc.main",                  "cyan"   ],
    ["Refreshing state · aws_subnet.public",             "cyan"   ],
    ["Refreshing state · aws_instance.ec2_blue",         "cyan"   ],
    ["Refreshing state · aws_instance.ec2_green",        "cyan"   ],
    ["Plan: 0 to add, 0 to change, 0 to destroy",        "green"  ],
    ["========================================",         "dim"    ],
    ["Terraform Plan Status = No Changes",               "green"  ],
  ],
  "Create Infrastructure": [
    ["Starting Infrastructure Creation...",              "default"],
    ["Initialising Terraform workspace",                 "default"],
    ["terraform apply -auto-approve",                    "dim"    ],
    ["aws_vpc.main: Creating...",                        "cyan"   ],
    ["aws_vpc.main: Creation complete after 2s",         "green"  ],
    ["aws_security_group.sg_web: Creating...",           "cyan"   ],
    ["aws_security_group.sg_web: Creation complete",     "green"  ],
    ["aws_instance.ec2_blue: Creating...",               "cyan"   ],
    ["aws_instance.ec2_green: Creating...",              "cyan"   ],
    ["aws_instance.ec2_blue: Creation complete",         "green"  ],
    ["aws_instance.ec2_green: Creation complete",        "green"  ],
    ["Apply complete! Resources: 5 added",               "green"  ],
    ["========================================",         "dim"    ],
    ["Infrastructure Creation Status = Success",         "green"  ],
  ],
  "Plan and Create": [
    ["Starting Plan and Create...",                      "default"],
    ["Running terraform plan first",                     "dim"    ],
    ["Plan: 5 to add, 0 to change, 0 to destroy",        "yellow" ],
    ["Proceeding with apply...",                         "default"],
    ["aws_vpc.main: Creating...",                        "cyan"   ],
    ["aws_vpc.main: Creation complete after 2s",         "green"  ],
    ["aws_instance.ec2_blue: Creating...",               "cyan"   ],
    ["aws_instance.ec2_blue: Creation complete",         "green"  ],
    ["Apply complete! Resources: 5 added",               "green"  ],
    ["========================================",         "dim"    ],
    ["Plan and Create Status = Success",                 "green"  ],
  ],
  "Remove Infrastructure": [
    ["Starting Infrastructure Removal...",               "default"],
    ["terraform destroy -auto-approve",                  "dim"    ],
    ["aws_instance.ec2_blue: Destroying...",             "yellow" ],
    ["aws_instance.ec2_green: Destroying...",            "yellow" ],
    ["aws_instance.ec2_blue: Destruction complete",      "default"],
    ["aws_instance.ec2_green: Destruction complete",     "default"],
    ["aws_security_group.sg_web: Destroying...",         "yellow" ],
    ["aws_security_group.sg_web: Destruction complete",  "default"],
    ["aws_vpc.main: Destroying...",                      "yellow" ],
    ["aws_vpc.main: Destruction complete",               "default"],
    ["Destroy complete! Resources: 5 destroyed",         "red"    ],
    ["========================================",         "dim"    ],
    ["Remove Infrastructure Status = Complete",          "green"  ],
  ],
};

const LINE_COLORS = {
  default: "#e2e8f0",
  green:   "#4ade80",
  yellow:  "#fbbf24",
  cyan:    "#67e8f9",
  red:     "#f87171",
  dim:     "#64748b",
};

// ─── Hero Terraform Terminal ──────────────────────────────────────────────────

function HeroTerminal() {
  // Phase: "select" | "running" | "done"
  const [phase,          setPhase]          = useState("select");
  const [selectedAction, setSelectedAction] = useState("Generate Terraform");
  // Each line: { id, text, color } — id is stable so existing lines never re-animate
  const [lines,          setLines]          = useState([]);
  // Track which line id is currently animating in — only THAT line gets slide-in anim
  const [animatingId,    setAnimatingId]    = useState(null);
  const [showToast,      setShowToast]      = useState(false);
  const [mounted,        setMounted]        = useState(false);
  const terminalRef  = useRef(null);
  const timersRef    = useRef([]);   // track all pending timeouts for cleanup

  const clearAllTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const addTimer = (fn, ms) => {
    const id = setTimeout(fn, ms);
    timersRef.current.push(id);
    return id;
  };

  // Entrance
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 120);
    return () => clearTimeout(t);
  }, []);

  // Auto-demo after entrance
  useEffect(() => {
    if (!mounted) return;
    const t = addTimer(() => runTerminal("Generate Terraform"), 1800);
    return () => clearTimeout(t);
  }, [mounted]);

  // Cleanup on unmount
  useEffect(() => () => clearAllTimers(), []);

  const runTerminal = (action) => {
    clearAllTimers();
    const logs = TF_LOGS[action] || TF_LOGS["Generate Terraform"];

    setPhase("running");
    setLines([]);
    setAnimatingId(null);
    setShowToast(false);

    logs.forEach(([text, color], i) => {
      addTimer(() => {
        const lineId = `${action}-${i}`;
        setAnimatingId(lineId);
        setLines((prev) => [...prev, { id: lineId, text, color }]);
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
        // After last line
        if (i === logs.length - 1) {
          addTimer(() => {
            setPhase("done");
            setAnimatingId(null);
            setShowToast(true);
            addTimer(() => {
              setShowToast(false);
              addTimer(() => {
                setPhase("select");
                setLines([]);
                // Loop
                addTimer(() => runTerminal("Generate Terraform"), 2000);
              }, 500);
            }, 2800);
          }, 500);
        }
      }, i * 350);
    });
  };

  const handleExecute = () => {
    if (phase === "running") return;
    runTerminal(selectedAction);
  };

  return (
    // Outer: just entrance animation, no float here
    <div
      style={{
        height: 520,
        width: "100%",
        opacity:    mounted ? 1 : 0,
        transform:  mounted ? "translateY(0) scale(1)" : "translateY(28px) scale(0.97)",
        transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
        willChange: "opacity, transform",
      }}
    >
      {/* Float wrapper — separate from entrance so transforms don't fight */}
      <div className="h-full" >
      <div
        className="h-full flex flex-col rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700/50 shadow-2xl shadow-blue-500/10 dark:shadow-black/50"
      >

        {/* ── Window chrome bar ── */}
        <div className="shrink-0 flex items-center gap-2 px-4 py-3 bg-[#1a1f2e] border-b border-white/8">
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex items-center gap-2 ml-2">
            <span className="text-white/40 text-xs">▶_</span>
            <span className="text-white/80 text-xs font-bold">Terraform Output</span>
            {phase !== "select" && (
              <span
                className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md"
                style={{
                  background: "#3b82f620",
                  color: "#60a5fa",
                  border: "1px solid #3b82f630",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: phase === "running" ? "#fbbf24" : "#4ade80",
                    animation: phase === "running" ? "dashPulse 1s ease-in-out infinite" : "none",
                  }}
                />
                {selectedAction}
              </span>
            )}
          </div>
          <div className="ml-auto flex items-center gap-3">
            {/* Terraform / Ansible tabs */}
            <div className="flex items-center gap-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600/30 text-blue-400 border border-blue-500/30">
                ⬡ Terraform {phase !== "select" ? lines.length : ""}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold text-white/30 border border-white/10">
                Ansible
              </span>
            </div>
            {phase !== "select" && (
              <span className="text-[10px] text-white/30 font-mono">
                {lines.length} lines
              </span>
            )}
          </div>
        </div>

        {/* ── Project info strip ── */}
        <div className="shrink-0 flex items-center justify-between px-4 py-2 bg-[#151929] border-b border-white/6">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Project</span>
            <span className="text-[11px] font-bold text-white/70">EC2 DevOps Infra · ap-south-1</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ animation: "dashPulse 2s ease-in-out infinite" }} />
            <span className="text-[10px] font-bold text-green-400">Connected</span>
          </div>
        </div>

        {/* ── Services table (Phase: select) / Terminal output (Phase: running/done) ── */}
        <div className="flex-1 overflow-hidden bg-[#0d1117] relative">

          {/* Services table */}
          <div
            style={{
              position: "absolute", inset: 0,
              opacity:    phase === "select" ? 1 : 0,
              transform:  phase === "select" ? "translateY(0)" : "translateY(-8px)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
              pointerEvents: phase === "select" ? "auto" : "none",
              overflow: "auto",
            }}
          >
            {/* Table header */}
            <div className="flex items-center gap-3 px-4 py-2.5 border-b border-white/6 bg-[#161b27]">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-white/40 w-20">Type</span>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-white/40 flex-1">Module</span>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-white/40 flex-1 hidden sm:block">Description</span>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-white/40 w-16 text-right">Status</span>
            </div>
            {TF_SERVICES.map((svc, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-4 py-2.5 border-b border-white/4 hover:bg-white/3 transition-colors"
              >
                <div
                  className="w-20 flex items-center gap-1.5"
                >
                  <span
                    className="text-[10px] font-extrabold px-1.5 py-0.5 rounded"
                    style={{
                      background: ["#3b82f615","#8b5cf615","#10b98115","#f59e0b15","#06b6d415"][i],
                      color:      ["#60a5fa",  "#a78bfa",  "#34d399",  "#fbbf24",  "#22d3ee" ][i],
                    }}
                  >
                    {svc.type}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-white/60 flex-1 truncate">{svc.module}</span>
                <span className="text-[11px] text-white/35 flex-1 truncate hidden sm:block">{svc.desc}</span>
                <div className="w-16 flex justify-end">
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-green-500/15 text-green-400 border border-green-500/20">
                    {svc.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Terminal log output */}
          <div
            ref={terminalRef}
            style={{
              position: "absolute", inset: 0,
              opacity:    phase !== "select" ? 1 : 0,
              transform:  phase !== "select" ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
              pointerEvents: phase !== "select" ? "auto" : "none",
              overflow: "auto",
              padding: "12px 16px",
              fontFamily: "ui-monospace, 'Cascadia Code', 'JetBrains Mono', monospace",
            }}
          >
            {lines.map(({ id, text, color }) => {
              const isNew = id === animatingId;
              return (
                <div
                  key={id}
                  className="flex items-start gap-3 mb-1"
                  style={isNew ? {
                    animation: "logLineIn 0.3s cubic-bezier(0.16,1,0.3,1) forwards",
                  } : {
                    opacity: 1,
                    transform: "none",
                  }}
                >
                <span className="text-[11px] select-none w-7 flex-shrink-0 text-right" style={{ color: "#334155" }}>
                  {String(lines.findIndex(l => l.id === id) + 1).padStart(3, "0")}
                </span>
                <span
                  className="text-[11.5px] leading-relaxed"
                  style={{ color: LINE_COLORS[color] || LINE_COLORS.default }}
                >
                  {text}
                </span>
              </div>
              );
            })}
            {/* Blinking cursor */}
            {phase === "running" && (
              <div className="flex items-start gap-3 mt-1">
                <span className="text-[11px] w-7 flex-shrink-0" style={{ color: "#334155" }}>
                  {String(lines.length + 1).padStart(3, "0")}
                </span>
                <span
                  className="inline-block w-2 h-[14px]"
                  style={{
                    background: "#4ade80",
                    animation: "dashBlink 1s step-end infinite",
                  }}
                />
              </div>
            )}
            {/* Done indicator */}
            {phase === "done" && (
              <div className="mt-3 text-[10px] font-bold text-white/20 font-mono">
                — process exited with code 0 —
              </div>
            )}
          </div>

        </div>

        {/* ── Bottom controls ── */}
        <div className="flex-shrink-0 bg-[#161b27] border-t border-white/8 px-4 py-3">
          <div className="flex items-center gap-2">
            {/* Account pill */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
              <span className="text-[10px] font-bold text-white/60 whitespace-nowrap">AWS Account Dev</span>
            </div>

            {/* Action selector */}
            <div className="relative flex-1">
              <select
                value={selectedAction}
                onChange={(e) => setSelectedAction(e.target.value)}
                disabled={phase === "running"}
                className="w-full appearance-none text-[10px] font-bold rounded-lg px-3 py-1.5 pr-6 cursor-pointer focus:outline-none transition-all"
                style={{
                  background: "#1e2535",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#93c5fd",
                }}
              >
                {TF_ACTIONS.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none text-[10px]">▾</span>
            </div>

            {/* Execute button */}
            <button
              onClick={handleExecute}
              disabled={phase === "running"}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[11px] font-extrabold transition-all"
              style={{
                background: phase === "running" ? "#1e40af80" : "#2563eb",
                color: phase === "running" ? "#93c5fd80" : "#ffffff",
                border: "1px solid rgba(96,165,250,0.3)",
                cursor: phase === "running" ? "not-allowed" : "pointer",
                boxShadow: phase === "running" ? "none" : "0 0 16px #3b82f630",
              }}
            >
              {phase === "running" ? (
                <>
                  <span
                    style={{
                      width: 10, height: 10, borderRadius: "50%", display: "inline-block",
                      borderTop: "2px solid #93c5fb", borderRight: "2px solid transparent",
                      animation: "dashSpin 0.8s linear infinite",
                    }}
                  />
                  Running
                </>
              ) : (
                <>▶ Execute</>
              )}
            </button>
          </div>

          {/* Status bar */}
          <div className="flex items-center justify-between mt-2">
            <span className="text-[9px] text-white/20 font-mono">Terraform console ready</span>
            {phase !== "select" && (
              <span className="text-[9px] text-white/20 font-mono">
                {phase === "running" ? "executing..." : "✓ completed"}
              </span>
            )}
          </div>
        </div>

      </div>
      </div>

      {/* Toast notification */}
      <div
        style={{
          position: "absolute",
          bottom: 90,
          right: 10,
          opacity:    showToast ? 1 : 0,
          transform:  showToast ? "translateY(0) scale(1)" : "translateY(8px) scale(0.96)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
          pointerEvents: "none",
          zIndex: 10,
        }}
      >
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-[11px] font-bold"
          style={{
            background: "#052e16",
            border: "1px solid #166534",
            color: "#4ade80",
            boxShadow: "0 8px 24px #00000060",
          }}
        >
          <span className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center text-[9px]">✓</span>
          Success · {selectedAction}
        </div>
      </div>

    </div>
  );
}


// ─── Component ───────────────────────────────────────────────────────────────

export default function HomePage() {
  const [activePersona, setActivePersona] = useState(0);
  const [cardVisible, setCardVisible]     = useState(true);
  const [statsVisible, setStatsVisible]   = useState(false);
  const statsRef  = useRef(null);
  const cycleRef  = useRef(null);

  // Stats scroll trigger
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsVisible(true); },
      { threshold: 0.2 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  // Start/restart the auto-cycle timer
  const startCycle = () => {
    if (cycleRef.current) clearInterval(cycleRef.current);
    cycleRef.current = setInterval(() => {
      setCardVisible(false);
      setTimeout(() => {
        setActivePersona((p) => (p + 1) % PERSONAS.length);
        setCardVisible(true);
      }, 300);
    }, 4000);
  };

  useEffect(() => {
    startCycle();
    return () => clearInterval(cycleRef.current);
  }, []);

  const switchPersona = (i) => {
    if (i === activePersona) return;
    setCardVisible(false);
    setTimeout(() => {
      setActivePersona(i);
      setCardVisible(true);
    }, 280);
    // Reset the auto-cycle so it doesn't fire right after a manual click
    startCycle();
  };

  const persona = PERSONAS[activePersona];

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-60 dark:opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(59,130,246,0.08),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(59,130,246,0.14),transparent)]" />

        <div className="relative max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-7 border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">AWS Qualified Software</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.07] tracking-tight mb-6">
                Ship Code.<br />
                <span className="text-blue-600 dark:text-blue-500">Not Tickets.</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-8 font-light max-w-xl">
                QuickInfra automates your entire infrastructure layer — provisioning, CI/CD, compliance, cost optimisation. Your engineers write features, not pipelines.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="https://console.quickinfra.cloud/" className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all hover:-translate-y-0.5">
                  Start Free Trial <ArrowRight size={15} />
                </Link>
                
              </div>
              <div className="flex flex-wrap gap-6 mt-10">
                {[["ISO/IEC 27001", "Certified"], ["AWS", "Qualified Software"], ["SOC 2", "Ready"]].map(([l, s]) => (
                  <div key={l}>
                    <div className="text-xs font-extrabold text-blue-600 dark:text-blue-500 tracking-wide">{l}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-500 mt-0.5">{s}</div>
                  </div>
                ))}
              </div>
            </div>
            <HeroTerminal />
          </div>
        </div>
      </section>

      {/* ── LOGO MARQUEE ─────────────────────────────────────────────────── */}
      <div className="border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 py-5 overflow-hidden">
        <p className="text-center text-[10px] font-bold tracking-widest uppercase text-slate-600 dark:text-slate-600 mb-4">Trusted by fast-growing companies</p>
        <div className="flex">
          <div className="flex gap-16 animate-[marquee_22s_linear_infinite] whitespace-nowrap">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-16 items-center">
                {["SalesGarners", "Netsoftmate", "CloudAge", "TechVentures", "InnovateCo", "BuildStack", "DevCore", "ScaleUp"].map((n) => (
                  <span key={n} className="text-sm font-bold text-slate-500 dark:text-slate-600 tracking-wide">{n}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── STATS ────────────────────────────────────────────────────────── */}
      <section ref={statsRef} className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[10px] font-bold tracking-widest uppercase text-blue-600 dark:text-blue-500 mb-3">By the Numbers</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">The QuickInfra Impact</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-2xl border p-6 sm:p-8 text-center transition-all hover:-translate-y-1 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-lg hover:shadow-blue-500/5">
                <div className={`text-4xl sm:text-5xl font-extrabold tracking-tight mb-2 transition-colors duration-700 ${statsVisible ? "text-blue-600 dark:text-blue-500" : "text-slate-200 dark:text-slate-700"}`}>{s.value}</div>
                <div className="font-bold text-sm mb-1.5">{s.label}</div>
                <div className="text-xs font-light text-slate-500 dark:text-slate-500">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEM / SOLUTION ───────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[10px] font-bold tracking-widest uppercase text-red-500 dark:text-red-400 mb-4">The Problem</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-5">Your team loses weeks to infra.<br />Every. Single. Sprint.</h2>
          <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed font-light mb-12">
            Setting up cloud environments, writing Terraform, debugging pipelines, chasing compliance — this is where engineering velocity dies. Your best people are doing ops work, not building your product.
          </p>
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-blue-600 dark:text-blue-500">The Fix</span>
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">QuickInfra collapses months of ops work into hours.</h3>
          <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed font-light">
            One platform that auto-provisions infra, wires up CI/CD, enforces compliance, and keeps your cloud healthy — continuously, automatically.
          </p>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold tracking-widest uppercase text-blue-600 dark:text-blue-500 mb-3">Platform Capabilities</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">Everything Your Infra Team Needs</h2>
            <p className="text-base text-slate-500 dark:text-slate-400 font-light max-w-lg mx-auto">One platform. No cobbling together tools. Full control over your cloud without the complexity.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(({ icon: Icon, title, desc, tag }) => (
              <div key={title} className="group rounded-2xl border p-6 sm:p-7 transition-all hover:-translate-y-1 cursor-default border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg hover:shadow-blue-500/5">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-blue-50 dark:bg-blue-600/10 text-blue-600 dark:text-blue-500"><Icon size={17} /></div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500">{tag}</span>
                </div>
                <h3 className="font-bold text-base mb-3 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ─────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto">

          {/* Section header */}
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold tracking-widest uppercase text-blue-600 dark:text-blue-500 mb-3">Built for Your Team</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">Who Uses QuickInfra?</h2>
            <p className="text-base text-slate-500 dark:text-slate-400 font-light max-w-lg mx-auto">
              From solo founders to enterprise engineering orgs — one platform removes the ops bottleneck at every scale.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10 items-start">

            {/* Left — selector tabs */}
            <div className="lg:col-span-2 flex flex-col gap-3">
              {PERSONAS.map(({ who, icon: Icon, tag, color }, i) => {
                const isActive = activePersona === i;
                return (
                  <button
                    key={who}
                    onClick={() => switchPersona(i)}
                    className="group w-full text-left rounded-2xl border p-4 sm:p-5 transition-all duration-300 focus:outline-none"
                    style={{
                      background:  isActive ? color + "0d" : "white",
                      borderColor: isActive ? color + "55" : "#e2e8f0",
                      boxShadow:   isActive ? `0 8px 24px ${color}18` : "none",
                      transform:   isActive ? "translateX(4px)" : "translateX(0)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                        style={{
                          background: isActive ? color + "18" : "#f1f5f9",
                          color:      isActive ? color : "#94a3b8",
                          border:    `1.5px solid ${isActive ? color + "35" : "#e2e8f0"}`,
                        }}
                      >
                        <Icon size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-extrabold tracking-tight transition-colors duration-300" style={{ color: isActive ? "#0f172a" : "#64748b" }}>
                          {who}
                        </div>
                        <div className="text-[11px] font-medium mt-0.5 truncate transition-colors duration-300" style={{ color: isActive ? color : "#94a3b8" }}>
                          {tag}
                        </div>
                      </div>
                      {/* Active bar */}
                      <div
                        className="w-1 h-8 rounded-full flex-shrink-0 transition-all duration-300"
                        style={{ background: isActive ? color : "transparent" }}
                      />
                    </div>

                    {/* Auto-cycle progress bar */}
                    {isActive && (
                      <div className="mt-3 h-0.5 rounded-full overflow-hidden" style={{ background: color + "20" }}>
                        <div
                          key={activePersona}
                          className="h-full rounded-full"
                          style={{
                            background: color,
                            animation: "personaProgress 4s linear forwards",
                          }}
                        />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right — animated detail card */}
            <div className="lg:col-span-3">
              <div
                className="rounded-2xl border bg-white dark:bg-slate-900 overflow-hidden"
                style={{
                  borderColor: persona.color + "30",
                  boxShadow:   `0 20px 48px ${persona.color}12`,
                  opacity:     cardVisible ? 1 : 0,
                  transform:   cardVisible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.985)",
                  transition:  "opacity 0.35s cubic-bezier(0.16,1,0.3,1), transform 0.35s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                {/* Top colour accent stripe */}
                <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${persona.color}, ${persona.color}66)` }} />

                <div className="p-6 sm:p-8">

                  {/* Header row */}
                  <div className="flex items-center gap-4 mb-7">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: persona.color + "15", border: `2px solid ${persona.color}25`, color: persona.color }}
                    >
                      <persona.icon size={26} />
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">{persona.who}</h3>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: persona.color }} />
                        <span className="text-xs font-semibold" style={{ color: persona.color }}>{persona.tag}</span>
                      </div>
                    </div>
                  </div>

                  {/* Pain / Solution */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-7">
                    <div className="rounded-xl p-4 border border-red-200 dark:border-red-500/20 bg-red-50 dark:bg-red-500/5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-5 h-5 rounded-md bg-red-100 dark:bg-red-500/15 flex items-center justify-center text-red-500 text-[10px] font-extrabold">✕</span>
                        <p className="text-[10px] font-extrabold tracking-widest uppercase text-red-500 dark:text-red-400">The Problem</p>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 font-light leading-relaxed">{persona.pain}</p>
                    </div>
                    <div
                      className="rounded-xl p-4 border"
                      style={{ borderColor: persona.color + "40", background: persona.color + "08" }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-extrabold" style={{ background: persona.color + "20", color: persona.color }}>✓</span>
                        <p className="text-[10px] font-extrabold tracking-widest uppercase" style={{ color: persona.color }}>How We Fix It</p>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 font-light leading-relaxed">{persona.solution}</p>
                    </div>
                  </div>

                  {/* Before / After metrics */}
                  <div className="border-t border-slate-100 dark:border-slate-800 pt-5">
                    <p className="text-[9px] font-extrabold tracking-widest uppercase text-slate-400 dark:text-slate-600 mb-3">Real Impact</p>
                    <div className="grid grid-cols-2 gap-3">
                      {persona.metrics.map(({ label, before, after }) => (
                        <div key={label} className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-4">
                          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-600 mb-2 uppercase tracking-wider">{label}</p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-bold text-red-400 line-through">{before}</span>
                            <span className="text-slate-300 dark:text-slate-600">→</span>
                            <span className="text-sm font-extrabold" style={{ color: persona.color }}>{after}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── INTEGRATIONS ─────────────────────────────────────────────────── */}
      {/* <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[10px] font-bold tracking-widest uppercase text-blue-600 dark:text-blue-500 mb-3">Integrations</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">Works With Your Stack</h2>
          <p className="text-base text-slate-500 dark:text-slate-400 font-light mb-12">200+ cloud services and tools, natively integrated.</p>
          <div className="flex flex-wrap gap-2.5 justify-center">
            {INTEGRATIONS.map((name) => (
              <div key={name} className="px-4 py-2 rounded-lg border text-sm font-semibold transition-all cursor-default border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800">{name}</div>
            ))}
            <div className="px-4 py-2 rounded-lg border text-sm font-semibold border-slate-100 dark:border-slate-800/50 text-slate-300 dark:text-slate-700">+185 more</div>
          </div>
        </div>
      </section> */}

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold tracking-widest uppercase text-blue-600 dark:text-blue-500 mb-3">Customer Stories</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Teams That Made the Switch</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="rounded-2xl border p-7 flex flex-col gap-5 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <Quote size={26} className="text-blue-200 dark:text-blue-900 flex-shrink-0" />
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light flex-1">{t.quote}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-blue-500 to-blue-700 text-white font-extrabold text-sm">{t.initial}</div>
                  <div>
                    <div className="text-sm font-bold">{t.company}</div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(59,130,246,0.07),transparent)] dark:bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(59,130,246,0.12),transparent)]" />
        <div className="relative max-w-2xl mx-auto text-center">
          <p className="text-[10px] font-bold tracking-widest uppercase text-blue-600 dark:text-blue-500 mb-6">Get Started</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-6"> Put your cloud infra on autopilot?</h2>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-10">
            Start your free trial today. No credit card.
            <br/> Production-ready infra in under an hour.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="https://console.quickinfra.cloud/" className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/25 hover:shadow-blue-600/40 transition-all hover:-translate-y-0.5">
              Start Free Trial <ArrowRight size={16} />
            </Link>
           
          </div>
          <p className="mt-6 text-[10px] font-bold tracking-widest uppercase text-slate-300 dark:text-slate-700">
            ISO/IEC 27001 · AWS Qualified Software · SOC 2 Ready
          </p>
        </div>
      </section>

    </div>
  );
}