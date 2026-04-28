import Link from "next/link";
import {
  Twitter,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

const FOOTER_LINKS = [
  {
    title: "Product",
    links: [
      { label: "Platform Overview", href: "/platform" },
      { label: "CI/CD Automation", href: "/ci-cd" },
      { label: "Infra Provisioning", href: "/infrastructure" },
      { label: "Cloud Migration", href: "/cloud-migration" },
      { label: "Security & Compliance", href: "/security" },
      { label: "Monitoring", href: "/monitoring" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Startups & Founders", href: "/startups-and-founders" },
      { label: "Engineering Teams", href: "/engineering-teams" },
      { label: "Non-Tech SMEs", href: "/non-tech-smes" },
      { label: "AI / ML Teams", href: "/ai-ml" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Partners", href: "/partners" },
      { label: "AWS Partnership", href: "/aws-partner" },
      { label: "Careers", href: "/careers" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blogs" },
      { label: "Whitepaper", href: "#" },
      // { label: "Videos", href: "#" },
      { label: "Documentation", href: "https://docs.quickinfra.cloud/" },
    ],
  },
];

const SOCIALS = [
  { icon: Twitter, href: "https://twitter.com/quickinfra", label: "Twitter" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/quickinfra-cloud/", label: "LinkedIn" },
  { icon: Youtube, href: "https://www.youtube.com/@quickinfracloud467", label: "YouTube" },
  // { icon: Github, href: "", label: "GitHub" },
];

const BADGES = ["ISO/IEC 27001", "ISO/IEC 9001", "AWS Qualified Software", "SOC 2 Ready"];

export default function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      {/* CTA Banner */}
      <div className="bg-blue-600 dark:bg-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Ready to put your infra on autopilot?
              </h3>
              <p className="text-blue-100 text-sm mt-1.5 font-light">
                No credit card required. Production-ready in under an hour.
              </p>
            </div>
            <Link
              href="https://console.quickinfra.cloud/"
              className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl
                bg-white text-blue-600 font-bold text-sm
                hover:bg-blue-50 transition-all hover:-translate-y-px
                shadow-lg shadow-blue-800/20"
            >
              Start Free Trial <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        {/* Top grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-0.5 shrink-0">
              {/* Icon */}
              <div className="relative w-9  h-8 shrink-0">
                <Image
                  src="/companyLogo/quickInfra-logo.png"
                  alt="QuickInfra Logo"
                  fill
                  sizes="40px"
                  className="object-contain"
                  priority
                />
              </div>
              {/* Wordmark */}
              <div className="relative  mt-2 h-7 w-28 shrink-0">
                <Image
                  src="/companyLogo/quickinfra.png"
                  alt="QuickInfra"
                  fill
                  sizes="112px"
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed font-light mb-6 max-w-xs">
              DevOps &amp; InfraOps automation platform helping engineering
              teams ship faster with automated cloud infrastructure.
            </p>

            <div className="flex gap-2 flex-wrap">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all
                    border border-slate-200 dark:border-slate-700
                    text-slate-400 dark:text-slate-700
                    hover:text-blue-600 dark:hover:text-blue-400
                    hover:bg-blue-50 dark:hover:bg-slate-800
                    hover:border-blue-200 dark:hover:border-slate-600"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {FOOTER_LINKS.map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-extrabold tracking-tight mb-4 text-slate-900 dark:text-white">
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm font-light text-slate-700 dark:text-slate-400
                          hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact strip */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-8 py-6 border-t border-b border-slate-200 dark:border-slate-800 mb-8">
          <a
            href="mailto:support@quickinfracloud.com"
            className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-slate-400
              hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
          >
            <span
              className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0
              bg-blue-50 dark:bg-slate-800 text-blue-500
              group-hover:bg-blue-100 dark:group-hover:bg-slate-700 transition-colors"
            >
              <Mail size={13} />
            </span>
            support@quickinfracloud.com
          </a>
          <a
            href="tel:+912044473448"
            className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-slate-400
              hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
          >
            <span
              className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0
              bg-blue-50 dark:bg-slate-800 text-blue-500
              group-hover:bg-blue-100 dark:group-hover:bg-slate-700 transition-colors"
            >
              <Phone size={13} />
            </span>
            +91 20 4447 3448
          </a>
          <div className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-400">
            <span
              className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5
              bg-blue-50 dark:bg-slate-800 text-blue-500"
            >
              <MapPin size={13} />
            </span>
            <span className="font-light leading-relaxed">
              Clover Hills Plaza, Office 523, 5th Floor,
              <br className="hidden sm:block" />
              Kondhwa, Pune — 411048
            </span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 dark:text-slate-600 font-light order-3 md:order-1 text-center md:text-left">
            © {new Date().getFullYear()} QuickInfra Cloud Solutions Pvt. Ltd. All rights reserved.
          </p>

          {/* Certification badges */}
          <div className="flex flex-wrap gap-2 justify-center order-1 md:order-2">
            {BADGES.map((b) => (
              <span
                key={b}
                className="text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-md uppercase
                  border border-slate-200 dark:border-slate-700
                  text-slate-400 dark:text-slate-600"
              >
                {b}
              </span>
            ))}
          </div>

          {/* Legal links */}
          <div className="flex gap-5 order-2 md:order-3">
            <Link
              href="/privacy-policy"
              className="text-xs font-light text-slate-400 dark:text-slate-600 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Privacy Policy
            </Link>
           
          </div>
        </div>
      </div>
    </footer>
  );
}
