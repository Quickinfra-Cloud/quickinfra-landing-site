"use client";

import Link from "next/link";
import { Shield, Eye, Database, Share2, Cookie, Clock, Globe, Mail, ChevronRight } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const SECTIONS = [
  {
    id: "coverage",
    icon: Shield,
    tag: "Scope",
    title: "What is Covered by this Privacy Policy?",
    content: [
      {
        type: "paragraph",
        text: "At QuickInfra, we are fully committed to protecting the privacy and security of our customers. This Privacy Policy describes how we collect and use information that customers provide to us in connection with their use of our Applications, Products and our Services (collectively referred henceforth as \"Services\").",
      },
    ],
  },
  {
    id: "collection",
    icon: Database,
    tag: "Data Collection",
    title: "Personal Information Collected",
    content: [
      {
        type: "subsection",
        heading: "Information Provided to Us Directly",
        text: "We collect and store information provided to us in relation to our Services, including information you provide in the following scenarios:",
        items: [
          "Create or Manage your QuickInfra Accounts",
          "Register for QuickInfra Demos and Workshops",
          "Communicate with us by Phone, Email, or any other medium",
          "Submit Support Tickets or other such requests",
        ],
      },
      {
        type: "subsection",
        heading: "Types of Information You May Supply",
        items: [
          "Cloud Account and Login Credentials, Account details, Organization details, User Name/Login ID, Secrets, Access Keys, Digital Certificates, Roles and Access Permissions, Passwords, Network details",
          "Name, Email addresses, Office and Residential addresses, Phone numbers, Contact details, Employee details",
          "Bank details, Corporate and Financial details, Payment information, Credit/Debit Card and other related banking transaction details",
        ],
      },
      {
        type: "subsection",
        heading: "Automatically Collected Data",
        text: "We collect information from you automatically as you navigate through and interact with our Services. The types of information we automatically collect include:",
        items: [
          "Your Browser and Device details",
          "Network and Connection details",
          "The Pages of our Services that you visit",
          "Date, Time and Location of access from your device",
          "Tracking information contained in cookies",
        ],
      },
    ],
  },
  {
    id: "usage",
    icon: Eye,
    tag: "Data Usage",
    title: "How is Your Personal Information Used?",
    content: [
      {
        type: "paragraph",
        text: "We use the data that we collect about you for the following purposes:",
      },
      {
        type: "grid",
        items: [
          "Personalization of our Services and its contents for you",
          "Enhance the Services and for regular maintenance",
          "Auditing, Analytics, and Improvement of the Services",
          "Send you updates about your usage and our terms of service and policies",
          "Promotions and Marketing of our Services",
          "Provide seamless Customer Experience",
          "Carry out our obligations and enforce our rights arising from contracts entered into between you and us, including for legal, billing and collection purposes",
          "Intimate you about special offers, products, and updates",
        ],
      },
    ],
  },
  {
    id: "sharing",
    icon: Share2,
    tag: "Data Sharing",
    title: "Sharing Your Information",
    content: [
      {
        type: "paragraph",
        text: "We may share your information with:",
      },
      {
        type: "items",
        items: [
          "Marketing agencies and advertising partners, as an essential part of being able to provide the Services to you",
          "Third parties whose services you purchase through our Services. You can tell when a third party is involved in your transactions, and we share information related to those transactions with that third party",
          "A buyer or other successor in a business transaction — personal information generally is one of the transferred business assets but remains subject to the promises made in any pre-existing Privacy Policy",
        ],
      },
      {
        type: "subsection",
        heading: "We May Also Disclose Your Personal Information:",
        items: [
          "To comply with any court order, law, or legal process, including to respond to any government or regulatory request",
          "To enforce or apply our terms of use and other agreements, including for billing and collection purposes",
          "If we believe disclosure is necessary or appropriate to protect the rights, property, or safety of QuickInfra, our customers, or others",
        ],
      },
    ],
  },
  {
    id: "cookies",
    icon: Cookie,
    tag: "Cookies",
    title: "Third-Party Use of Cookies and Tracking Technologies",
    content: [
      {
        type: "paragraph",
        text: "We use cookies and similar tracking technologies to track the activity on our Applications, Products, Websites and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. Tracking technologies also used are beacons, tags, and scripts to collect and track information and to improve and analyze our website.",
      },
      {
        type: "subsection",
        heading: "Examples of Cookies We Use",
        items: [
          "Session Cookies — We use Session Cookies to operate our website",
          "Preference Cookies — We use Preference Cookies to remember your preferences and various settings",
          "Security Cookies — We use Security Cookies for security purposes",
        ],
      },
      {
        type: "subsection",
        heading: "Cookie Controls",
        items: [
          "Do Not Track Signals — We don't support Do Not Track (\"DNT\"). You can enable or disable Do Not Track by visiting the Preferences or Settings page of your web browser",
          "Disabling Cookies — You can set your browser to not accept cookies. However, as our application relies on cookies for proper operation, disabling cookies may create a poor experience",
        ],
      },
    ],
  },
  {
    id: "retention",
    icon: Clock,
    tag: "Retention",
    title: "Storing and Keeping Your Information",
    content: [
      {
        type: "paragraph",
        text: "We will hold on to your information for as long as you're using the Services, or as long as is needed to be able to provide the Services to you, or (in the case of any contact you may have with our support team) for as long as is necessary to provide support-related reporting and trend analysis only.",
      },
      {
        type: "paragraph",
        text: "If reasonably necessary or required to meet legal or regulatory requirements, resolve disputes, prevent fraud and abuse, or enforce our terms and conditions, we may also keep some of your information as required, even after you have terminated your use of the Services or it is no longer needed to provide the Services to you.",
      },
    ],
  },
  {
    id: "advertising",
    icon: Globe,
    tag: "Advertising",
    title: "Seeing Advertisements for QuickInfra Online",
    content: [
      {
        type: "paragraph",
        text: "We engage in online advertising to let you know what we're up to and to help you see and find our products. Like many companies, we target QuickInfra banners and ads to you when you are on other websites and applications.",
      },
      {
        type: "paragraph",
        text: "We do this using a variety of digital marketing networks and ad exchanges such as Google Analytics and Google Adwords, and we use a range of advertising technologies like web beacons, pixels, ad tags, cookies, and mobile identifiers.",
      },
    ],
  },
  {
    id: "gdpr",
    icon: Shield,
    tag: "GDPR",
    title: "Personal Data & GDPR",
    content: [
      {
        type: "paragraph",
        text: "QuickInfra defines personal data as any information relating to an identified or identifiable natural person. QuickInfra collects a limited set of information which falls under GDPR including but not limited to:",
      },
      {
        type: "items",
        items: [
          "First name and last name",
          "Email address",
          "IP address",
          "Phone number",
          "Physical address",
          "Other contact information",
        ],
      },
      {
        type: "subsection",
        heading: "Legal Bases for Processing",
        text: "We process your personal data on one or more of the following legal bases:",
        items: [
          "As necessary to enter into a contract with you or a legal entity you represent, to perform our contractual obligations, to provide our Services, to respond to requests from you, or to provide customer support",
          "Where we have a legitimate interest, as described in this Privacy Policy",
          "As necessary to comply with relevant law and legal obligations, including to respond to lawful requests and orders",
          "With your consent",
        ],
      },
    ],
  },
  {
    id: "links",
    icon: Globe,
    tag: "External Links",
    title: "Links to Other Sites",
    content: [
      {
        type: "paragraph",
        text: "The Services may contain links to other sites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit, as we have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.",
      },
    ],
  },
  {
    id: "changes",
    icon: Clock,
    tag: "Updates",
    title: "Changes to This Privacy Policy",
    content: [
      {
        type: "paragraph",
        text: "We may update our Privacy Policy from time to time. We'll post the updated Policy anytime we change it and will let you know via email any time we update it in a material way.",
      },
    ],
  },
];

const TOC = SECTIONS.map(({ id, title, tag }) => ({ id, title, tag }));

// ─── Content Renderer ─────────────────────────────────────────────────────────

function SectionContent({ content }) {
  return (
    <div className="space-y-5">
      {content.map((block, i) => {
        if (block.type === "paragraph") {
          return (
            <p key={i} className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed font-light">
              {block.text}
            </p>
          );
        }

        if (block.type === "items") {
          return (
            <ul key={i} className="space-y-2.5">
              {block.items.map((item, j) => (
                <li key={j} className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light">{item}</span>
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "subsection") {
          return (
            <div key={i} className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 p-5">
              <p className="text-xs font-extrabold tracking-widest uppercase text-blue-600 dark:text-blue-500 mb-3">
                {block.heading}
              </p>
              {block.text && (
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light mb-3">{block.text}</p>
              )}
              {block.items && (
                <ul className="space-y-2">
                  {block.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <ChevronRight size={13} className="mt-1 text-blue-500 flex-shrink-0" />
                      <span className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        }

        if (block.type === "grid") {
          return (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {block.items.map((item, j) => (
                <div
                  key={j}
                  className="flex items-start gap-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 hover:border-blue-200 dark:hover:border-blue-800 transition-colors"
                >
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light">{item}</span>
                </div>
              ))}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300 min-h-screen">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-slate-100 dark:border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-60 dark:opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(59,130,246,0.08),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(59,130,246,0.14),transparent)]" />
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-7 border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10">
            <Shield size={12} className="text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">Legal</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight mb-5">
            Privacy <span className="text-blue-600 dark:text-blue-500">Policy</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed max-w-xl mx-auto mb-8">
            We are fully committed to protecting the privacy and security of our customers. Here is how we collect, use, and safeguard your data.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {[["ISO 27001", "Certified"], ["SOC 2", "Ready"], ["GDPR", "Compliant"]].map(([l, s]) => (
              <div key={l} className="text-center">
                <div className="text-xs font-extrabold text-blue-600 dark:text-blue-500 tracking-wide">{l}</div>
                <div className="text-xs text-slate-500 dark:text-slate-500 mt-0.5">{s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BODY ──────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-14 items-start">

          {/* ── Sticky Table of Contents ── */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800">
                <p className="text-[10px] font-extrabold tracking-widest uppercase text-blue-600 dark:text-blue-500">
                  Contents
                </p>
              </div>
              <nav className="py-2">
                {TOC.map(({ id, tag }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="flex items-center gap-3 px-5 py-2.5 text-xs text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/5 transition-all group"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-blue-500 transition-colors flex-shrink-0" />
                    <span className="font-semibold">{tag}</span>
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* ── Main Content ── */}
          <main className="lg:col-span-3 space-y-6">
            {SECTIONS.map(({ id, icon: Icon, tag, title, content }) => (
              <section
                key={id}
                id={id}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-lg hover:shadow-blue-500/5 transition-all"
              >
                {/* Card header */}
                <div className="flex items-center gap-4 px-6 sm:px-8 py-5 border-b border-slate-100 dark:border-slate-800">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-blue-50 dark:bg-blue-600/10 text-blue-600 dark:text-blue-500 flex-shrink-0">
                    <Icon size={17} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500 block mb-0.5">
                      {tag}
                    </span>
                    <h2 className="text-base sm:text-lg font-extrabold tracking-tight leading-snug">
                      {title}
                    </h2>
                  </div>
                </div>

                {/* Card body */}
                <div className="px-6 sm:px-8 py-6">
                  <SectionContent content={content} />
                </div>
              </section>
            ))}

            {/* ── Contact Card ── */}
            <section
              id="contact"
              className="rounded-2xl border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-500/5 overflow-hidden"
            >
              <div className="flex items-center gap-4 px-6 sm:px-8 py-5 border-b border-blue-100 dark:border-blue-800/40">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-blue-100 dark:bg-blue-600/15 text-blue-600 dark:text-blue-400 flex-shrink-0">
                  <Mail size={17} />
                </div>
                <div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-blue-500 dark:text-blue-500 block mb-0.5">
                    Contact
                  </span>
                  <h2 className="text-base sm:text-lg font-extrabold tracking-tight">
                    Questions About This Policy?
                  </h2>
                </div>
              </div>
              <div className="px-6 sm:px-8 py-6">
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light mb-5">
                  If you have any questions about this Privacy Policy or the information that we collect, please reach out to our support team directly.
                </p>
                <a
                  href="mailto:support@quickinfracloud.com"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all hover:-translate-y-0.5"
                >
                  <Mail size={14} />
                  support@quickinfracloud.com
                </a>
              </div>
            </section>

          </main>
        </div>
      </div>

      {/* ── FOOTER NOTE ───────────────────────────────────────────────────── */}
      <div className="border-t border-slate-100 dark:border-slate-800 py-8 px-4 text-center">
        <p className="text-[10px] font-bold tracking-widest uppercase text-slate-300 dark:text-slate-700">
          ISO 27001 · AWS Select Partner · SOC 2 Ready · GDPR Compliant
        </p>
      </div>

    </div>
  );
}