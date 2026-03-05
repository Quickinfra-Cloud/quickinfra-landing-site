"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  {
    label: "Product",
    children: [
      { label: "Platform Overview", href: "#" },
      { label: "CI/CD Automation", href: "#" },
      { label: "Infra Provisioning", href: "#" },
      { label: "Monitoring", href: "#" },
    ],
  },
  {
    label: "Solutions",
    children: [
      { label: "Startups & Founders", href: "#" },
      { label: "Engineering Teams", href: "#" },
      { label: "Cloud Migration", href: "#" },
      { label: "Non-Tech SMEs", href: "#" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  {
    label: "Resources",
    children: [
      { label: "Blog", href: "#" },
      { label: "Whitepaper", href: "#" },
      { label: "Videos", href: "#" },
      { label: "Docs", href: "#" },
    ],
  },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
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
    const handler = () => setOpenDropdown(null);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300
          bg-white dark:bg-slate-950
          ${scrolled ? "backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-sm shadow-slate-200/50 dark:shadow-black/30" : "border-b border-transparent"}`}
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

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-0.5">
              {NAV_ITEMS.map((item) => (
                <div key={item.label} className="relative">
                  {item.children ? (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDropdown(openDropdown === item.label ? null : item.label);
                        }}
                        className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium
                          text-slate-600 hover:text-slate-900 hover:bg-slate-100
                          dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800
                          transition-all"
                      >
                        {item.label}
                        <ChevronDown
                          size={13}
                          className={`transition-transform duration-200 ${openDropdown === item.label ? "rotate-180" : ""}`}
                        />
                      </button>

                      {/* Dropdown */}
                      {openDropdown === item.label && (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="absolute top-full left-0 mt-2 w-52 rounded-xl overflow-hidden
                            border border-slate-200 dark:border-slate-700
                            bg-white dark:bg-slate-900
                            shadow-xl shadow-slate-200/60 dark:shadow-black/50
                            py-1.5 z-50"
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              onClick={() => setOpenDropdown(null)}
                              className="block px-4 py-2.5 text-sm font-medium
                                text-slate-600 hover:text-blue-600 hover:bg-blue-50
                                dark:text-slate-400 dark:hover:text-blue-400 dark:hover:bg-slate-800
                                transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="flex items-center px-3 py-2 rounded-lg text-sm font-medium
                        text-slate-600 hover:text-slate-900 hover:bg-slate-100
                        dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800
                        transition-all"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop Right */}
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

            {/* Mobile Right */}
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

        {/* Mobile Drawer */}
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
                  bg-blue-600 hover:bg-blue-500 text-white
                  shadow-lg shadow-blue-600/20"
              >
                Start Free Trial <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Navbar height spacer */}
      <div className="h-16" />
    </>
  );
}