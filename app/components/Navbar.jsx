"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  {
    label: "Product",
    children: [
      { label: "Platform Overview", href: "#" },
      { label: "CI/CD Automation",  href: "#" },
      { label: "Infra Provisioning", href: "#" },
      { label: "Monitoring",        href: "#" },
    ],
  },
  {
    label: "Solutions",
    children: [
      { label: "Startups & Founders", href: "#" },
      { label: "Engineering Teams",   href: "#" },
      { label: "Cloud Migration",     href: "#" },
      { label: "Non-Tech SMEs",       href: "#" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  {
    label: "Resources",
    children: [
      { label: "Blog",       href: "#" },
      { label: "Whitepaper", href: "#" },
      { label: "Videos",     href: "#" },
      { label: "Docs",       href: "#" },
    ],
  },
  { label: "About", href: "/about" },
];

// ── Desktop dropdown — hover with proper enter/exit animation ────────────────

function NavDropdown({ item }) {
  // `hovered` = mouse is over the zone
  // `rendered` = DOM node exists (stays true during exit animation)
  // `visible`  = CSS "entered" state (drives opacity/transform)
  const [hovered,  setHovered]  = useState(false);
  const [rendered, setRendered] = useState(false);
  const [visible,  setVisible]  = useState(false);

  const leaveTimer  = useRef(null);
  const exitTimer   = useRef(null);

  const ENTER_DELAY = 0;    // ms before panel appears
  const EXIT_ANIM   = 180;  // ms — must match transition duration below
  const LEAVE_GRACE = 100;  // ms grace period when mouse leaves

  const show = () => {
    clearTimeout(leaveTimer.current);
    clearTimeout(exitTimer.current);
    setHovered(true);
    setRendered(true);
    // Tick after mount so CSS transition fires
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setVisible(true))
    );
  };

  const hide = () => {
    leaveTimer.current = setTimeout(() => {
      setHovered(false);
      setVisible(false);
      // Keep in DOM until exit animation finishes, then unmount
      exitTimer.current = setTimeout(() => setRendered(false), EXIT_ANIM);
    }, LEAVE_GRACE);
  };

  useEffect(() => () => {
    clearTimeout(leaveTimer.current);
    clearTimeout(exitTimer.current);
  }, []);

  return (
    <div className="relative" onMouseEnter={show} onMouseLeave={hide}>
      <button
        className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150
          ${hovered
            ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10"
            : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800"
          }`}
      >
        {item.label}
        <ChevronDown
          size={13}
          className={`transition-transform duration-200 ${hovered ? "rotate-180" : ""}`}
        />
      </button>

      {rendered && (
        <div
          className="absolute top-full left-0 mt-2 w-52 z-50"
          style={{
            opacity:       visible ? 1 : 0,
            transform:     visible ? "translateY(0) scale(1)" : "translateY(-8px) scale(0.97)",
            transformOrigin: "top left",
            transition:    `opacity ${EXIT_ANIM}ms cubic-bezier(0.16,1,0.3,1), transform ${EXIT_ANIM}ms cubic-bezier(0.16,1,0.3,1)`,
            pointerEvents: visible ? "auto" : "none",
          }}
        >
          {/* Arrow pip */}
          <div className="ml-5 w-2.5 h-2.5 rotate-45 bg-white dark:bg-slate-900 border-l border-t border-slate-200 dark:border-slate-700 -mb-1.5 relative z-10 shadow-none" />

          {/* Panel */}
          <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl shadow-slate-900/10 dark:shadow-black/50 py-1.5">
            {item.children.map((child, i) => (
              <Link
                key={child.label}
                href={child.href}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium transition-all duration-150 group"
                style={{
                  color: "inherit",
                  // Stagger each item's entrance
                  opacity:       visible ? 1 : 0,
                  transform:     visible ? "translateX(0)" : "translateX(-6px)",
                  transition:    `opacity 200ms ease ${80 + i * 40}ms, transform 200ms ease ${80 + i * 40}ms, background 120ms, color 120ms`,
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 group-hover:bg-blue-500 dark:group-hover:bg-blue-400 transition-colors duration-150 flex-shrink-0" />
                <span className="text-slate-600 group-hover:text-blue-600 dark:text-slate-400 dark:group-hover:text-blue-400 transition-colors duration-150">
                  {child.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main Navbar ───────────────────────────────────────────────────────────────

export default function Navbar() {
  const [scrolled,       setScrolled]       = useState(false);
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
        setMobileExpanded(null);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300
          bg-white dark:bg-slate-950
          ${scrolled
            ? "border-b border-slate-200 dark:border-slate-800 shadow-sm shadow-slate-200/50 dark:shadow-black/30"
            : "border-b border-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-extrabold text-sm select-none shadow-md shadow-blue-500/30">
                QI
              </div>
              <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
                QuickInfra
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-0.5">
              {NAV_ITEMS.map((item) =>
                item.children ? (
                  <NavDropdown key={item.label} item={item} />
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all
                      text-slate-600 hover:text-slate-900 hover:bg-slate-100
                      dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>

            {/* Desktop right */}
            <div className="hidden lg:flex items-center gap-2">
              <ThemeToggle />
              <Link
                href="/login"
                className="px-4 py-2 rounded-lg text-sm font-semibold transition-all
                  text-slate-600 hover:text-slate-900 hover:bg-slate-100
                  dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800"
              >
                Log In
              </Link>
              <Link
                href="/trial"
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold
                  bg-blue-600 hover:bg-blue-500 text-white
                  shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40
                  transition-all hover:-translate-y-px"
              >
                Free Trial <ArrowRight size={14} />
              </Link>
            </div>

            {/* Mobile right */}
            <div className="flex lg:hidden items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors
                  text-slate-600 hover:bg-slate-100
                  dark:text-slate-400 dark:hover:bg-slate-800"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile drawer */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden
            border-t border-slate-200 dark:border-slate-800
            bg-white dark:bg-slate-950
            ${mobileOpen ? "max-h-screen" : "max-h-0"}`}
        >
          <div className="px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
            {NAV_ITEMS.map((item) => (
              <div key={item.label}>
                {item.children ? (
                  <>
                    <button
                      onClick={() =>
                        setMobileExpanded(mobileExpanded === item.label ? null : item.label)
                      }
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors
                        text-slate-700 hover:bg-slate-100
                        dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                      {item.label}
                      <ChevronDown
                        size={15}
                        className={`transition-transform duration-200 ${mobileExpanded === item.label ? "rotate-180" : ""}`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-200 ${
                        mobileExpanded === item.label ? "max-h-48 mt-0.5" : "max-h-0"
                      }`}
                    >
                      <div className="ml-3 pl-3 border-l-2 border-blue-500/20 space-y-0.5">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="block px-3 py-2 text-sm font-medium rounded-lg transition-colors
                              text-slate-500 hover:text-blue-600 hover:bg-blue-50
                              dark:text-slate-400 dark:hover:text-blue-400 dark:hover:bg-slate-800/60"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors
                      text-slate-700 hover:bg-slate-100
                      dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            {/* Mobile CTAs */}
            <div className="pt-3 pb-1 flex flex-col gap-2.5 border-t border-slate-100 dark:border-slate-800 mt-2">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors
                  border border-slate-200 dark:border-slate-700
                  text-slate-700 dark:text-slate-300
                  hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Log In
              </Link>
              <Link
                href="/trial"
                onClick={() => setMobileOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all
                  bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20"
              >
                Start Free Trial <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}