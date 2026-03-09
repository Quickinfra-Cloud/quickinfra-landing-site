"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight, Mail, Phone, MapPin, Clock,
  MessageSquare, ChevronDown,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const TRUST_BADGES = [
  { label: "ISO 27001",     sub: "Certified"         },
  { label: "AWS Select",    sub: "Partner"           },
  { label: "ISO 9001:2015", sub: "Quality Certified" },
  { label: "SOC 2",         sub: "Ready"             },
];

const CONTACT_CHANNELS = [
  {
    icon: Mail,
    title: "Email Support",
    color: "#0ea5e9",
    detail: "support@quickinfracloud.com",
    sub: "Our team will get back to you within 48 business hours.",
    href: "mailto:support@quickinfracloud.com",
    cta: "Send an Email",
    primary: true,
  },
  {
    icon: Phone,
    title: "Phone",
    color: "#6366f1",
    detail: "+91 20 4602 1302",
    sub: "Mon–Fri, 10:00 am – 6:00 pm IST",
    href: "tel:+912046021302",
    cta: "Call Now",
    primary: false,
  },
  {
    icon: MapPin,
    title: "Office",
    color: "#10b981",
    detail: "Pune, Maharashtra",
    sub: "Clover Hills Plaza, Office No. 523, 5th Floor, NIBM-Undri Road, Kondhwa, Pune-411048",
    href: "https://maps.google.com/?q=Clover+Hills+Plaza+Kondhwa+Pune",
    cta: "View on Maps",
    primary: false,
  },
];

const QUICK_LINKS = [
  { label: "Book a Demo",      href: "/contact",                          color: "#0ea5e9" },
  { label: "Start Free Trial", href: "/trial",                            color: "#6366f1" },
  { label: "AWS Partnership",  href: "/aws-partners",                     color: "#f59e0b" },
  { label: "Documentation",    href: "https://docs.quickinfracloud.com",  color: "#10b981" },
];

const FAQS = [
  {
    q: "How quickly can you migrate my infrastructure to cloud?",
    a: "For most SMEs and startups, initial cloud setup takes 4–24 hours. Full application and data migration depends on complexity — typically 1–5 business days for standard workloads.",
  },
  {
    q: "Do I need an in-house DevOps team to use QuickInfra?",
    a: "No. QuickInfra is designed specifically so you don't need one. The platform automates provisioning, CI/CD, monitoring, and cost optimisation — your team just ships product.",
  },
  {
    q: "Which cloud providers do you support?",
    a: "AWS (where we are a Select Partner), Microsoft Azure, Google Cloud Platform, and Oracle Cloud Infrastructure. Multi-cloud deployments are fully supported.",
  },
  {
    q: "Is there a free trial available?",
    a: "Yes. You can start a free trial at any time with no credit card required. Book a demo first if you'd like a guided walkthrough of the platform before you begin.",
  },
];

// ─── FAQ Accordion ─────────────────────────────────────────────────────────────

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden transition-all"
      style={{ boxShadow: open ? "0 4px 20px rgba(14,165,233,0.08)" : "none" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left gap-4 focus:outline-none"
      >
        <span className="text-sm font-bold tracking-tight">{q}</span>
        <ChevronDown
          size={16}
          className="text-slate-400 flex-shrink-0 transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "200px" : "0px", opacity: open ? 1 : 0 }}
      >
        <p className="px-6 pb-5 text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-slate-100 dark:border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-60 dark:opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(14,165,233,0.08),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(14,165,233,0.15),transparent)]" />

        <div className="relative max-w-3xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-7 border border-sky-200 dark:border-sky-500/30 bg-sky-50 dark:bg-sky-500/10"
            style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(12px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
          >
            <MessageSquare size={11} className="text-sky-600 dark:text-sky-400" />
            <span className="text-xs font-bold tracking-widest text-sky-600 dark:text-sky-400 uppercase">Get In Touch</span>
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.07] tracking-tight mb-6"
            style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(18px)", transition: "opacity 0.65s ease 0.08s, transform 0.65s ease 0.08s" }}
          >
            We're here<br />
            <span className="text-sky-500 dark:text-sky-400">to help you.</span>
          </h1>

          <p
            className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-10 max-w-xl mx-auto"
            style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(18px)", transition: "opacity 0.65s ease 0.16s, transform 0.65s ease 0.16s" }}
          >
            Have a question or interested in working with us? Drop us an email and our
            team will get back to you within 48 business hours.
          </p>

          {/* Trust badges */}
          <div
            className="flex flex-wrap gap-3 justify-center"
            style={{ opacity: heroVisible ? 1 : 0, transition: "opacity 0.65s ease 0.24s" }}
          >
            {TRUST_BADGES.map(({ label, sub }) => (
              <div key={label} className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs">
                <span className="font-extrabold text-slate-700 dark:text-slate-300">{label}</span>
                <span className="text-slate-400 dark:text-slate-600">{sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EMAIL CTA — HERO CARD ─────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[10px] font-bold tracking-widest uppercase text-sky-500 dark:text-sky-400 mb-4">Reach Out</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">Contact Our Team</h2>
          <p className="text-base text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-10 max-w-lg mx-auto">
            Whether it's a migration question, a demo request, partnership enquiry, or technical
            support — one email gets you to the right person.
          </p>

          {/* Big email CTA card */}
          <a
            href="mailto:support@quickinfracloud.com"
            className="group block rounded-2xl border-2 border-sky-200 dark:border-sky-500/30 bg-gradient-to-br from-sky-50 to-indigo-50 dark:from-sky-500/10 dark:to-indigo-500/10 px-8 py-10 hover:-translate-y-1 transition-all hover:shadow-2xl hover:shadow-sky-500/15 dark:hover:shadow-sky-500/10 mb-8"
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
              style={{ background: "linear-gradient(135deg, #0ea5e9, #6366f1)", boxShadow: "0 8px 24px rgba(14,165,233,0.3)" }}
            >
              <Mail size={28} className="text-white" />
            </div>
            <p className="text-[11px] font-extrabold uppercase tracking-widest text-sky-500 dark:text-sky-400 mb-2">Email Support</p>
            <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-800 dark:text-white mb-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
              support@quickinfracloud.com
            </p>
            <p className="text-sm text-slate-400 font-light mb-6">Reply within 48 business hours</p>
            <span
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all group-hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #0ea5e9, #6366f1)", boxShadow: "0 4px 16px rgba(14,165,233,0.3)" }}
            >
              Send an Email <ArrowRight size={15} />
            </span>
          </a>

          <p className="text-sm text-slate-400 font-light">
            Prefer to talk?{" "}
            <a href="tel:+912046021302" className="font-bold text-sky-500 hover:text-sky-400 transition-colors">
              Call +91 20 4602 1302
            </a>
           
          </p>
        </div>
      </section>

      {/* ── CONTACT CHANNELS ─────────────────────────────────────────────── */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-5xl mx-auto">
          <p className="text-[10px] font-bold tracking-widest uppercase text-sky-500 dark:text-sky-400 text-center mb-8">Other Ways to Reach Us</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {CONTACT_CHANNELS.map(({ icon: Icon, title, color, detail, sub, href, cta, primary }) => (
              <div
                key={title}
                className="group rounded-2xl border bg-white dark:bg-slate-900 p-6 hover:-translate-y-1 transition-all hover:shadow-xl cursor-default overflow-hidden relative"
                style={{ borderColor: color + "30" }}
              >
                <div className="absolute top-0 inset-x-0 h-0.5" style={{ background: `linear-gradient(90deg, ${color}, ${color}44)` }} />
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: color + "15", color, border: `1.5px solid ${color}30` }}
                >
                  <Icon size={20} />
                </div>
                <h3 className="text-sm font-extrabold mb-1 tracking-tight">{title}</h3>
                <p className="text-[11px] font-bold mb-2" style={{ color }}>{detail}</p>
                <p className="text-[11px] text-slate-400 font-light leading-relaxed mb-4">{sub}</p>
                <a
                  href={href}
                  target={title === "Office" ? "_blank" : undefined}
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold transition-colors"
                  style={{ color }}
                >
                  {cta} <ArrowRight size={11} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[10px] font-bold tracking-widests uppercase text-sky-500 dark:text-sky-400 mb-3">Common Questions</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">Frequently Asked Questions</h2>
            <p className="text-base text-slate-500 dark:text-slate-400 font-light max-w-lg mx-auto">
              Quick answers to things people usually ask before reaching out.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {FAQS.map(({ q, a }) => (
              <FAQItem key={q} q={q} a={a} />
            ))}
          </div>
          <p className="text-center text-sm text-slate-400 mt-8 font-light">
            Still have questions?{" "}
            <a href="mailto:support@quickinfracloud.com" className="font-bold text-sky-500 hover:text-sky-400 transition-colors">
              Email support@quickinfracloud.com
            </a>
          </p>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-slate-100 dark:border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(14,165,233,0.07),transparent)] dark:bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(14,165,233,0.12),transparent)]" />
        <div className="relative max-w-2xl mx-auto text-center">
          <p className="text-[10px] font-bold tracking-widest uppercase text-sky-500 dark:text-sky-400 mb-6">Ready to Start?</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-6">
            Let's build your<br />cloud together.
          </h2>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-10">
            Whether you're migrating, scaling, or starting fresh — QuickInfra is ready.
            Book a demo and we'll show you exactly what's possible for your setup.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="https://console.quickinfra.cloud/"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-white shadow-xl transition-all hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #0ea5e9, #6366f1)", boxShadow: "0 8px 24px rgba(14,165,233,0.3)" }}
            >
              Start Free Trial <ArrowRight size={16} />
            </Link>
            <a
              href="mailto:support@quickinfracloud.com"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-sky-300 dark:hover:border-sky-600 hover:text-sky-600 dark:hover:text-sky-400 transition-all hover:-translate-y-0.5"
            >
              Email Us
            </a>
          </div>
          <p className="mt-6 text-[10px] font-bold tracking-widest uppercase text-slate-300 dark:text-slate-700">
            ISO 27001 · AWS Select Partner · No Credit Card Required
          </p>
        </div>
      </section>

    </div>
  );
}