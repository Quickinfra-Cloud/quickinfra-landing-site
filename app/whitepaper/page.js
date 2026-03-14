"use client";

import { useEffect, useRef, useState } from "react";
import { FileText, Download, ArrowRight, BookOpen, Shield, Cloud, Zap, LayoutGrid } from "lucide-react";
import Link from "next/link";

// ─── Data ─────────────────────────────────────────────────────────────────────

const WHITEPAPERS = [
  {
    id: "cloud-devops",
    title: "Cloud Automated DevOps",
    subtitle: "QuickInfra Platform Overview",
    description:
      "A deep-dive into how QuickInfra automates the full DevOps lifecycle — from infrastructure provisioning to CI/CD pipelines — and what that means for engineering velocity at scale.",
    tag: "DevOps",
    icon: Zap,
    color: "#3b82f6",
    filename: "QuickInfra-Cloud-Automated-DevOps-1.2.pdf",
    version: "v1.2",
  },
  {
    id: "security-compliance",
    title: "Achieving 100% Security Compliance in Cloud Infrastructure",
    subtitle: "Security & Compliance Guide",
    description:
      "How QuickInfra bakes SOC 2, HIPAA, PCI-DSS, and GDPR controls directly into every deployment — so compliance is a default configuration, not an afterthought.",
    tag: "Security",
    icon: Shield,
    color: "#10b981",
    filename: "QuickInfra-Achieving-100-Security-Compliance-in-Cloud-Infrastructure-1.pdf",
    version: "Edition 1",
  },
  {
    id: "devops-mistakes",
    title: "Top 10 Costly DevOps Mistakes to Avoid in 2024",
    subtitle: "Industry Report",
    description:
      "The most expensive infrastructure and DevOps pitfalls engineering teams fall into — and the concrete steps to avoid them before they cost you time, money, and uptime.",
    tag: "Best Practices",
    icon: BookOpen,
    color: "#f59e0b",
    filename: "QuickInfra-Top-10-Costly-DevOps-Mistakes-to-Avoid-in-2024.pdf",
    version: "2024 Edition",
  },
  {
    id: "cto-guide",
    title: "Best Practices for Cloud Deployments",
    subtitle: "A Guide for CTOs and Product Managers",
    description:
      "A practical playbook for technical leaders making cloud architecture and deployment decisions — covering cost optimisation, team structure, tooling selection, and long-term scalability.",
    tag: "Leadership",
    icon: LayoutGrid,
    color: "#8b5cf6",
    filename: "Best-practices-for-cloud-deployments-A-guide-for-CTOs-and-Product-Managers.pdf",
    version: "CTO Edition",
  },
  {
    id: "solution-brief",
    title: "QuickInfra Solution Brief",
    subtitle: "Platform Summary",
    description:
      "A concise overview of the QuickInfra platform — capabilities, integrations, compliance posture, and the business case for adopting an automated InfraOps solution.",
    tag: "Overview",
    icon: Cloud,
    color: "#06b6d4",
    filename: "QuickInfra_Solution-Brief-.pdf",
    version: "Latest",
  },
];

const TAGS = ["All", ...Array.from(new Set(WHITEPAPERS.map((w) => w.tag)))];

// ─── PDF Thumbnail ────────────────────────────────────────────────────────────

function PdfThumbnail({ filename, color }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        const pdfjsLib = await import("pdfjs-dist");
        pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://unpkg.com/pdfjs-dist@5.5.207/build/pdf.worker.min.mjs";

        const pdf = await pdfjsLib.getDocument(`/whitepapers/${filename}`).promise;
        if (cancelled) return;

        const page = await pdf.getPage(1);
        if (cancelled) return;

        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const containerWidth = container.clientWidth || 360;
        const containerHeight = 200;
        const viewport = page.getViewport({ scale: 1 });
        const scaleByWidth = containerWidth / viewport.width;
        const scaleByHeight = containerHeight / viewport.height;
        const scale = Math.min(scaleByWidth, scaleByHeight);
        const scaled = page.getViewport({ scale });

        const dpr = window.devicePixelRatio || 1;
        canvas.width = scaled.width * dpr;
        canvas.height = scaled.height * dpr;
        canvas.style.width = `${scaled.width}px`;
        canvas.style.height = `${scaled.height}px`;

        const ctx = canvas.getContext("2d");
        ctx.scale(dpr, dpr);

        await page.render({ canvasContext: ctx, viewport: scaled }).promise;
        if (!cancelled) setStatus("ready");
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    render();
    return () => { cancelled = true; };
  }, [filename]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{
        background: "#f1f5f9",
        borderBottom: `3px solid ${color}35`,
        height: status === "ready" ? 200 : 120,
      }}
    >
      {status === "loading" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <div
            className="w-7 h-7 rounded-full border-2 animate-spin"
            style={{ borderColor: color + "30", borderTopColor: color }}
          />
          <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
            Loading preview
          </span>
        </div>
      )}

      {status === "error" && (
        <div
          className="flex flex-col items-center justify-center gap-2 py-14"
          style={{ background: color + "08" }}
        >
          <FileText size={30} style={{ color: color + "70" }} />
          <span className="text-[11px] font-bold text-slate-400">Preview unavailable</span>
        </div>
      )}

      <canvas
        ref={canvasRef}
        className="block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ display: status === "ready" ? "block" : "none" }}
      />

      {status === "ready" && (
        <div
          className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-[9px] font-extrabold tracking-widest uppercase shadow"
          style={{ background: color, color: "#fff" }}
        >
          PDF
        </div>
      )}
    </div>
  );
}

// ─── Whitepaper Card ──────────────────────────────────────────────────────────

function WhitepaperCard({ paper }) {
  const Icon = paper.icon;

  return (
    <div
      className="group flex flex-col rounded-2xl border bg-white dark:bg-slate-900 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={{ borderColor: "rgb(226 232 240)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = paper.color + "55";
        e.currentTarget.style.boxShadow = `0 20px 48px ${paper.color}14`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgb(226 232 240)";
        e.currentTarget.style.boxShadow = "";
      }}
    >
      {/* PDF first-page preview */}
      <PdfThumbnail filename={paper.filename} color={paper.color} />

      <div className="flex flex-col flex-1 p-6">
        {/* Tag + icon + version */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: paper.color + "15", color: paper.color }}
          >
            <Icon size={14} />
          </div>
          <span
            className="text-[10px] font-extrabold tracking-widest uppercase px-2 py-0.5 rounded-md"
            style={{
              background: paper.color + "15",
              color: paper.color,
              border: `1px solid ${paper.color}25`,
            }}
          >
            {paper.tag}
          </span>
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-600 ml-auto">
            {paper.version}
          </span>
        </div>

        <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium mb-1.5">
          {paper.subtitle}
        </p>

        <h3 className="text-sm sm:text-base font-extrabold tracking-tight leading-snug mb-3">
          {paper.title}
        </h3>

        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light flex-1 mb-5">
          {paper.description}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
          <a
            href={`/whitepapers/${paper.filename}`}
            download
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all hover:-translate-y-0.5 flex-1 justify-center"
            style={{
              background: paper.color,
              color: "#ffffff",
              boxShadow: `0 4px 14px ${paper.color}35`,
            }}
          >
            <Download size={12} />
            Download PDF
          </a>
          <a
            href={`/whitepapers/${paper.filename}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600 transition-all"
          >
            <FileText size={12} />
            View
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WhitepapersPage() {
  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300 min-h-screen">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative py-12 sm:py-14 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-slate-100 dark:border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-60 dark:opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(59,130,246,0.08),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(59,130,246,0.14),transparent)]" />
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10">
            <BookOpen size={12} className="text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">
              Resource Library
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight mb-4">
            Whitepapers &{" "}
            <span className="text-blue-600 dark:text-blue-500">Guides</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed max-w-xl mx-auto">
            In-depth technical resources, industry reports, and platform guides
            to help your team make better infrastructure decisions.
          </p>
        </div>
      </section>

      {/* ── GRID ──────────────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-blue-600 dark:text-blue-500 mb-1">
                All Resources
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Publications
              </h2>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              {TAGS.slice(1).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-bold px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHITEPAPERS.map((paper) => (
              <WhitepaperCard key={paper.id} paper={paper} />
            ))}
          </div>

        </div>
      </section>

      {/* ── CTA STRIP ─────────────────────────────────────────────────────── */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[10px] font-bold tracking-widest uppercase text-blue-600 dark:text-blue-500 mb-4">
            Ready to Go Further?
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">
            See QuickInfra in Action
          </h2>
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

      {/* ── FOOTER NOTE ───────────────────────────────────────────────────── */}
      <div className="border-t border-slate-100 dark:border-slate-800 py-8 px-4 text-center">
        <p className="text-[10px] font-bold tracking-widest uppercase text-slate-300 dark:text-slate-700">
          ISO 27001 · AWS Select Partner · SOC 2 Ready
        </p>
      </div>

    </div>
  );
}