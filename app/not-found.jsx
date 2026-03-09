"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Home, ArrowLeft, Search } from "lucide-react";

const QUICK_LINKS = [
  { label: "Platform Overview",  href: "/platform"       },
  { label: "Infra Provisioning", href: "/infra-provisioning" },
  { label: "CI/CD Automation",   href: "/cicd"           },
  { label: "Pricing",            href: "/pricing"        },
  { label: "Contact Us",         href: "/contact"        },
  { label: "Careers",            href: "/careers"        },
];

// Animated terminal showing a fake 404 trace
const TRACE_LINES = [
  { text: "$ curl https://quickinfracloud.com/{path}",    color: "dim"     },
  { text: "Resolving DNS...",                             color: "default" },
  { text: "Connecting to origin...",                      color: "default" },
  { text: "GET /{path} HTTP/2",                           color: "cyan"    },
  { text: "< HTTP/2 404",                                 color: "red"     },
  { text: "< content-type: application/json",             color: "dim"     },
  { text: '{ "error": "route_not_found" }',               color: "yellow"  },
  { text: "Request failed with status 404.",              color: "red"     },
];

const LINE_COLORS = {
  default: "#cbd5e1",
  cyan:    "#67e8f9",
  yellow:  "#fbbf24",
  red:     "#f87171",
  dim:     "#475569",
};

function Terminal({ visible }) {
  const [lines,     setLines]     = useState([]);
  const [animId,    setAnimId]    = useState(null);
  const [done,      setDone]      = useState(false);

  useEffect(() => {
    if (!visible) return;
    let timers = [];
    TRACE_LINES.forEach(({ text, color }, i) => {
      const t = setTimeout(() => {
        setAnimId(`l${i}`);
        setLines(prev => [...prev, { id: `l${i}`, text, color }]);
        if (i === TRACE_LINES.length - 1) {
          setTimeout(() => { setDone(true); setAnimId(null); }, 400);
        }
      }, 600 + i * 280);
      timers.push(t);
    });
    return () => timers.forEach(clearTimeout);
  }, [visible]);

  return (
    <div
      className="rounded-2xl overflow-hidden border border-slate-700/50 bg-[#0d1117]"
      style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}
    >
      {/* Chrome bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#161b27] border-b border-white/6">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="ml-2 text-white/50 text-xs font-mono">shell — bash</span>
        <div className="ml-auto flex items-center gap-2">
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded"
            style={{
              background: done ? "#15803d20" : "#7f1d1d20",
              color: done ? "#4ade80" : "#f87171",
              border: `1px solid ${done ? "#15803d40" : "#7f1d1d40"}`,
            }}
          >
            {done ? "EXIT 1" : "running..."}
          </span>
        </div>
      </div>

      {/* Output */}
      <div className="p-4 font-mono text-[11.5px] leading-relaxed min-h-[200px]">
        {lines.map(({ id, text, color }) => (
          <div
            key={id}
            className="flex gap-3 mb-1"
            style={id === animId ? { animation: "logLineIn 0.25s cubic-bezier(0.16,1,0.3,1) forwards" } : {}}
          >
            <span style={{ color: LINE_COLORS[color] || LINE_COLORS.default }}>{text}</span>
          </div>
        ))}
        {!done && lines.length < TRACE_LINES.length && (
          <span
            className="inline-block w-2 h-[14px] mt-0.5"
            style={{ background: "#4ade80", animation: "dashBlink 1s step-end infinite" }}
          />
        )}
      </div>
    </div>
  );
}

export default function NotFound() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white flex flex-col transition-colors duration-300">

      {/* ── Main content ───────────────────────────────────────────────────── */}
      <main className="flex-1 flex items-center py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">

        {/* Background dot grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-50 dark:opacity-35" />
        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_40%,rgba(239,68,68,0.05),transparent)] dark:bg-[radial-gradient(ellipse_70%_60%_at_50%_40%,rgba(239,68,68,0.09),transparent)]" />

        <div className="relative max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

            {/* ── Left: copy ── */}
            <div>
              {/* 404 badge */}
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-7 border"
                style={{
                  borderColor: "rgba(239,68,68,0.3)",
                  background: "rgba(239,68,68,0.06)",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(10px)",
                  transition: "opacity 0.6s ease, transform 0.6s ease",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-bold tracking-widest text-red-500 uppercase">404 · Page Not Found</span>
              </div>

              {/* Headline */}
              <h1
                className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-none tracking-tight mb-5"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(16px)",
                  transition: "opacity 0.7s ease 80ms, transform 0.7s ease 80ms",
                }}
              >
                <span className="text-red-500">Oops.</span><br />
                <span className="text-slate-900 dark:text-white">Route not found.</span>
              </h1>

              {/* Sub */}
              <p
                className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-light mb-10 max-w-md"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(12px)",
                  transition: "opacity 0.7s ease 160ms, transform 0.7s ease 160ms",
                }}
              >
                This URL doesn't exist or was moved. Your infrastructure is fine — just the link that isn't.
              </p>

              {/* CTAs */}
              <div
                className="flex flex-wrap gap-3 mb-12"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(10px)",
                  transition: "opacity 0.7s ease 220ms, transform 0.7s ease 220ms",
                }}
              >
                <Link
                  href="/"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all hover:-translate-y-0.5"
                >
                  <Home size={15} /> Back to Home
                </Link>
                <button
                  onClick={() => window.history.back()}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600 transition-all hover:-translate-y-0.5"
                >
                  <ArrowLeft size={15} /> Go Back
                </button>
              </div>

              {/* Quick links */}
              <div
                style={{
                  opacity: visible ? 1 : 0,
                  transition: "opacity 0.7s ease 300ms",
                }}
              >
                <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 dark:text-slate-600 mb-3">
                  Popular Pages
                </p>
                <div className="flex flex-wrap gap-2">
                  {QUICK_LINKS.map(({ label, href }) => (
                    <Link
                      key={href}
                      href={href}
                      className="group flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 transition-all"
                    >
                      {label}
                      <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1 group-hover:translate-x-0 transition-transform duration-150" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Right: terminal ── */}
            <div
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.97)",
                transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 200ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) 200ms",
              }}
            >
              <Terminal visible={visible} />

              {/* Caption */}
              <p className="text-center text-[10px] text-slate-300 dark:text-slate-700 font-mono mt-4">
                Even our infra knows this route doesn't exist.
              </p>
            </div>

          </div>
        </div>
      </main>

      

    </div>
  );
}