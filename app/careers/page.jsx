"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Clock, Briefcase, Users, Zap, Shield, ChevronDown, ExternalLink } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { value: "4",     label: "Open Positions",     sub: "Across engineering & operations" },
  { value: "100%",  label: "Remote Friendly",    sub: "Work from anywhere in India"     },
  { value: "AWS",   label: "Select Partner",     sub: "Work on cutting-edge cloud tech" },
  { value: "Fast",  label: "Growing Team",       sub: "Early-stage, high ownership"     },
];

const OPENINGS = [
  {
    id: 1,
    title: "DevOps Engineer",
    type: "Full-Time",
    location: "Remote / Pune",
    experience: "2–4 years",
    color: "#3b82f6",
    tag: "Engineering",
    about: "We're looking for a hands-on DevOps Engineer to help build, improve, and maintain the core automation platform that powers QuickInfra. You'll work directly on Terraform modules, CI/CD pipelines, and cloud provisioning workflows used by our customers daily.",
    responsibilities: [
      "Design and maintain production-grade Terraform modules for AWS infrastructure",
      "Build and optimise CI/CD pipelines using Jenkins, GitLab CI, or GitHub Actions",
      "Implement monitoring, alerting, and observability across cloud environments",
      "Collaborate with the product team to automate new infrastructure patterns",
      "Maintain cloud security posture and compliance controls across customer accounts",
    ],
    requirements: [
      "2–4 years of hands-on DevOps or cloud infrastructure experience",
      "Strong proficiency in Terraform and AWS core services (EC2, VPC, RDS, EKS)",
      "Experience with Docker, Kubernetes, and container orchestration",
      "Familiarity with CI/CD tools and Git workflows",
      "Understanding of cloud security best practices (IAM, security groups, encryption)",
    ],
    niceToHave: ["AWS certifications (Solutions Architect / DevOps Professional)", "Experience with Ansible or configuration management tools", "Python or Bash scripting for automation"],
  },
  {
    id: 2,
    title: "Cloud Solutions Architect",
    type: "Full-Time",
    location: "Remote / Pune",
    experience: "4–7 years",
    color: "#8b5cf6",
    tag: "Architecture",
    about: "As a Cloud Solutions Architect at QuickInfra, you'll design scalable, secure, and cost-efficient cloud architectures for our customers and for the platform itself. You'll be the technical authority on AWS best practices and help translate customer requirements into production infrastructure.",
    responsibilities: [
      "Design end-to-end AWS architectures for customer projects and platform features",
      "Lead cloud migration assessments and produce detailed migration plans",
      "Define architecture standards, patterns, and guardrails across the platform",
      "Work with customers during onboarding to understand and scope their infrastructure needs",
      "Stay current with AWS service launches and evaluate relevance for the platform",
    ],
    requirements: [
      "4–7 years of cloud architecture experience, primarily on AWS",
      "Deep knowledge of AWS services — compute, networking, storage, databases, security",
      "Experience designing highly available, fault-tolerant distributed systems",
      "Strong grasp of cloud cost optimisation and FinOps principles",
      "Excellent communication — comfortable presenting to technical and non-technical stakeholders",
    ],
    niceToHave: ["AWS Certified Solutions Architect – Professional", "Multi-cloud experience (Azure, GCP)", "Experience at a cloud consulting or managed services firm"],
  },
  {
    id: 3,
    title: "Full Stack Developer",
    type: "Full-Time",
    location: "Remote / Pune",
    experience: "2–5 years",
    color: "#10b981",
    tag: "Product",
    about: "We're hiring a Full Stack Developer to build and evolve the QuickInfra console — the web interface our customers use to provision infrastructure, monitor deployments, and manage their cloud. You'll work across the stack with a focus on performance, reliability, and great developer UX.",
    responsibilities: [
      "Build new features and improve existing flows in the QuickInfra web console",
      "Develop robust backend APIs that interface with cloud providers and Terraform",
      "Implement real-time UI updates for pipeline runs, log streaming, and metrics",
      "Write well-tested, maintainable code with attention to edge cases and error states",
      "Collaborate closely with design and product to ship high-quality user experiences",
    ],
    requirements: [
      "2–5 years of full stack development experience",
      "Strong proficiency in React (hooks, state management) and Node.js or Python backend",
      "Experience with REST APIs and WebSocket or SSE for real-time data",
      "Comfortable with PostgreSQL or similar relational databases",
      "Good understanding of authentication, authorisation, and API security",
    ],
    niceToHave: ["Experience with Next.js", "Familiarity with cloud APIs (AWS SDK)", "Prior experience building developer tools or internal platforms"],
  },
  {
    id: 4,
    title: "Cloud Sales Executive",
    type: "Full-Time",
    location: "Remote / Pune",
    experience: "2–5 years",
    color: "#f59e0b",
    tag: "Sales",
    about: "We're looking for a driven Cloud Sales Executive to grow QuickInfra's customer base across startups, SMEs, and mid-market engineering teams in India. You'll own the full sales cycle — from prospecting to close — and play a direct role in shaping how we sell a technical product.",
    responsibilities: [
      "Own the end-to-end sales cycle from outbound prospecting to contract close",
      "Identify and engage target accounts — startups, tech SMEs, and engineering teams",
      "Run product demos and technical discovery calls alongside the solutions team",
      "Develop relationships with AWS partner ecosystem contacts and referral channels",
      "Maintain accurate pipeline data and provide forecasting to leadership",
    ],
    requirements: [
      "2–5 years of B2B SaaS or cloud services sales experience",
      "Proven track record of hitting or exceeding quota in a technical sales environment",
      "Ability to understand and communicate cloud and DevOps concepts at a high level",
      "Strong consultative selling skills — comfortable with complex, multi-stakeholder deals",
      "Self-starter who thrives in an early-stage, fast-moving environment",
    ],
    niceToHave: ["Existing network in the AWS partner ecosystem", "Experience selling to technical buyers (CTOs, DevOps leads, Engineering Managers)", "Prior experience at a cloud/SaaS startup"],
  },
];

const VALUES = [
  { icon: Zap,      title: "Move fast, own it",      color: "#f59e0b", desc: "Small team, high trust. You'll own your work end to end and see the impact directly." },
  { icon: Shield,   title: "Build things that last",  color: "#ef4444", desc: "We build for production. Quality, reliability, and security are non-negotiables." },
  { icon: Users,    title: "Customer-first always",   color: "#3b82f6", desc: "Everything we ship solves a real customer problem. We stay close to the people using our product." },
  { icon: Briefcase,title: "Grow with the company",   color: "#8b5cf6", desc: "Early team members grow with us. We invest in your skills, certifications, and career trajectory." },
];

const PERKS = [
  ["Competitive CTC",         "#3b82f6"],
  ["100% Remote Option",      "#8b5cf6"],
  ["AWS Certification Support","#f59e0b"],
  ["Direct Team Access",      "#10b981"],
  ["Fast Promotions",         "#ef4444"],
  ["Health Insurance",        "#06b6d4"],
  ["Flexible Hours",          "#3b82f6"],
  ["Learning Budget",         "#8b5cf6"],
];

const HR_EMAIL = "hr@quickinfracloud.com";

// ─── Job Card ─────────────────────────────────────────────────────────────────

function JobCard({ job }) {
  const [open, setOpen] = useState(false);

  const mailto = `mailto:${HR_EMAIL}?subject=Application — ${encodeURIComponent(job.title)}&body=Hi QuickInfra Team,%0D%0A%0D%0AI'd like to apply for the ${encodeURIComponent(job.title)} role.%0D%0A%0D%0APlease find my resume attached.%0D%0A%0D%0AName:%0D%0ALinkedIn / Portfolio:%0D%0AYears of experience:%0D%0A%0D%0AThank you!`;

  return (
    <div
      className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden transition-all duration-300"
      style={{ boxShadow: open ? `0 16px 40px ${job.color}12` : "none", borderColor: open ? job.color + "40" : undefined }}
    >
      {/* Colored top stripe */}
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${job.color}, ${job.color}44)` }} />

      {/* Card header — always visible */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full text-left px-6 py-5 flex items-start gap-4 focus:outline-none group"
      >
        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: job.color + "15", border: `1.5px solid ${job.color}30` }}>
          <Briefcase size={18} style={{ color: job.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="text-base font-extrabold tracking-tight group-hover:text-inherit transition-colors" style={{ color: open ? job.color : undefined }}>{job.title}</h3>
            <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-widest" style={{ background: job.color + "15", color: job.color }}>{job.tag}</span>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1 text-[11px] text-slate-400"><MapPin size={10} />{job.location}</span>
            <span className="flex items-center gap-1 text-[11px] text-slate-400"><Clock size={10} />{job.type}</span>
            <span className="flex items-center gap-1 text-[11px] text-slate-400"><Briefcase size={10} />{job.experience}</span>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0 mt-1">
          <Link
            href={mailto}
            onClick={(e) => e.stopPropagation()}
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl text-[11px] font-extrabold text-white transition-all hover:-translate-y-0.5"
            style={{ background: job.color, boxShadow: `0 4px 14px ${job.color}30` }}
          >
            Apply Now <ArrowRight size={11} />
          </Link>
          <ChevronDown
            size={16}
            className="text-slate-400 transition-transform duration-300"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </div>
      </button>

      {/* Expandable body */}
      <div
        className="overflow-hidden transition-all duration-500"
        style={{ maxHeight: open ? "1200px" : "0", opacity: open ? 1 : 0 }}
      >
        <div className="px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-6">{job.about}</p>

          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-3">Responsibilities</h4>
              <ul className="space-y-2">
                {job.responsibilities.map((r) => (
                  <li key={r} className="flex items-start gap-2">
                    <span className="text-[10px] mt-0.5 flex-shrink-0" style={{ color: job.color }}>▸</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-3">Requirements</h4>
              <ul className="space-y-2">
                {job.requirements.map((r) => (
                  <li key={r} className="flex items-start gap-2">
                    <span className="text-[10px] mt-0.5 flex-shrink-0 text-green-500">✓</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {job.niceToHave.length > 0 && (
            <div className="mb-6">
              <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-3">Nice to Have</h4>
              <div className="flex flex-wrap gap-2">
                {job.niceToHave.map((n) => (
                  <span key={n} className="text-[10px] font-semibold px-3 py-1 rounded-full border" style={{ background: job.color + "0d", borderColor: job.color + "30", color: job.color }}>{n}</span>
                ))}
              </div>
            </div>
          )}

          {/* Apply CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Link
              href={mailto}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-extrabold text-white transition-all hover:-translate-y-0.5"
              style={{ background: job.color, boxShadow: `0 4px 14px ${job.color}30` }}
            >
              Apply for this Role <ArrowRight size={14} />
            </Link>
            <div className="text-[11px] text-slate-400">
              Send your resume to{" "}
              <Link href={`mailto:${HR_EMAIL}`} className="font-bold hover:underline" style={{ color: job.color }}>
                {HR_EMAIL}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CareersPage() {
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
      <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-60 dark:opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(59,130,246,0.08),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(59,130,246,0.15),transparent)]" />
        <div className="relative max-w-3xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-7 border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10"
            style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(12px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">We're Hiring · 4 Open Roles</span>
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.07] tracking-tight mb-6"
            style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(18px)", transition: "opacity 0.65s ease 0.08s, transform 0.65s ease 0.08s" }}
          >
            Build the future of<br /><span className="text-blue-600 dark:text-blue-500">cloud infrastructure.</span>
          </h1>
          <p
            className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-10 max-w-xl mx-auto"
            style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(18px)", transition: "opacity 0.65s ease 0.16s, transform 0.65s ease 0.16s" }}
          >
            QuickInfra is a fast-growing cloud DevOps automation platform and AWS Select Partner. We're a small team building tools that make production-grade infrastructure accessible to every engineering team — and we're looking for people who care deeply about that mission.
          </p>
          <div
            className="flex flex-wrap gap-4 justify-center"
            style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(18px)", transition: "opacity 0.65s ease 0.24s, transform 0.65s ease 0.24s" }}
          >
            <a href="#openings" className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25 transition-all hover:-translate-y-0.5">
              View Open Roles <ArrowRight size={15} />
            </a>
            <Link href={`mailto:${HR_EMAIL}`} className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-blue-300 dark:hover:border-blue-600 hover:text-blue-600 transition-all hover:-translate-y-0.5">
              <ExternalLink size={14} /> {HR_EMAIL}
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
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

      {/* WHY QUICKINFRA */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold tracking-widest uppercase text-blue-600 dark:text-blue-500 mb-3">Why Join Us</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">What it's like to work here</h2>
            <p className="text-base text-slate-500 dark:text-slate-400 font-light max-w-lg mx-auto">Small team. Real ownership. Real impact. We move fast and trust people to do great work.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map(({ icon: Icon, title, color, desc }) => (
              <div key={title} className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 hover:-translate-y-1 transition-all hover:shadow-lg cursor-default relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(90deg, ${color}, ${color}44)` }} />
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: color + "15", color, border: `1.5px solid ${color}30` }}>
                  <Icon size={19} />
                </div>
                <h3 className="text-sm font-extrabold mb-2 tracking-tight">{title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PERKS */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-[10px] font-bold tracking-widest uppercase text-blue-600 dark:text-blue-500 mb-7">Benefits & Perks</p>
          <div className="flex flex-wrap gap-2.5 justify-center">
            {PERKS.map(([label, color]) => (
              <div key={label} className="px-4 py-2 rounded-full border text-sm font-semibold transition-all cursor-default hover:-translate-y-0.5" style={{ borderColor: color + "35", background: color + "0a", color }}>
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOB OPENINGS */}
      <section id="openings" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold tracking-widest uppercase text-blue-600 dark:text-blue-500 mb-3">Open Positions</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">4 Roles Available</h2>
            <p className="text-base text-slate-500 dark:text-slate-400 font-light max-w-lg mx-auto">Click any role to see details, responsibilities, and requirements. Apply directly via email.</p>
          </div>
          <div className="space-y-4">
            {OPENINGS.map((job) => <JobCard key={job.id} job={job} />)}
          </div>
        </div>
      </section>

      {/* GENERAL APPLICATION CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30">
            <ExternalLink size={22} className="text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">Don't see the right role?</h2>
          <p className="text-base text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-8">
            We're always interested in talking to strong engineers, cloud architects, and sales professionals. Send us your resume and a brief note about what you're looking for.
          </p>
          <Link
            href={`mailto:${HR_EMAIL}?subject=General Application — QuickInfra&body=Hi QuickInfra Team,%0D%0A%0D%0AI'd love to be considered for any relevant openings at QuickInfra.%0D%0A%0D%0APlease find my resume attached.%0D%0A%0D%0AName:%0D%0ARole of interest:%0D%0ALinkedIn / Portfolio:%0D%0AYears of experience:%0D%0A%0D%0AThank you!`}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/25 transition-all hover:-translate-y-0.5"
          >
            Send a General Application <ArrowRight size={16} />
          </Link>
          <p className="mt-5 text-sm text-slate-400">
            Or email us directly at{" "}
            <Link href={`mailto:${HR_EMAIL}`} className="font-bold text-blue-600 dark:text-blue-400 hover:underline">{HR_EMAIL}</Link>
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(59,130,246,0.07),transparent)] dark:bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(59,130,246,0.13),transparent)]" />
        <div className="relative max-w-2xl mx-auto text-center">
          <p className="text-[10px] font-bold tracking-widest uppercase text-blue-600 dark:text-blue-500 mb-6">Join the Team</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-6">Ready to build something that matters?</h2>
          <p className="text-base text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-10">
            We're a small, fast-moving team on a mission to make cloud infrastructure accessible to every engineering team. Come help us build it.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#openings" className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/25 transition-all hover:-translate-y-0.5">
              View Open Roles <ArrowRight size={16} />
            </a>
            <Link href={`mailto:${HR_EMAIL}`} className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-blue-300 dark:hover:border-blue-600 hover:text-blue-600 transition-all hover:-translate-y-0.5">
              Email HR
            </Link>
          </div>
          <p className="mt-6 text-[10px] font-bold tracking-widest uppercase text-slate-300 dark:text-slate-700">AWS Select Partner · Pune, India · Remote Friendly</p>
        </div>
      </section>

    </div>
  );
}