"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Calendar, Tag, Search, ChevronRight } from "lucide-react";
import { POSTS, CATEGORIES, CATEGORY_GRADIENTS } from "./data";

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });
}

function getCategoryColor(category) {
  const MAP = {
    "DevOps":             "#3b82f6",
    "Cloud Infrastructure": "#10b981",
    "CI/CD":              "#8b5cf6",
    "Security":           "#ef4444",
    "IaC":                "#f59e0b",
    "Automation":         "#06b6d4",
    "Migration":          "#22c55e",
  };
  return MAP[category] || "#64748b";
}

// ── Post image / gradient placeholder ────────────────────────────────────────

function PostImage({ post, className = "", fill = false, sizes }) {
  const [imgError, setImgError] = useState(false);
  const gradient = CATEGORY_GRADIENTS[post.category] || CATEGORY_GRADIENTS["General"];
  const color = getCategoryColor(post.category);

  if (!post.image || imgError) {
    return (
      <div
        className={`${className} flex flex-col items-center justify-center gap-3 relative overflow-hidden`}
        style={{ background: `linear-gradient(140deg, ${gradient[0]}, ${gradient[1]})` }}
      >
        {/* subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <span
          className="relative z-10 text-[10px] font-extrabold tracking-widest uppercase px-3 py-1 rounded-full"
          style={{ background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.85)" }}
        >
          {post.category}
        </span>
        <p
          className="relative z-10 text-white/50 text-xs font-mono text-center px-4 leading-relaxed hidden sm:block"
          style={{ maxWidth: 220 }}
        >
          {post.tags.join(" · ")}
        </p>
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={post.image}
        alt={post.title}
        fill
        sizes={sizes || "100vw"}
        className={`object-cover ${className}`}
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Image
        src={post.image}
        alt={post.title}
        fill
        sizes={sizes || "100vw"}
        className="object-cover"
        onError={() => setImgError(true)}
      />
    </div>
  );
}

// ── Featured card (large) ─────────────────────────────────────────────────────

function FeaturedCard({ post, visible }) {
  const color = getCategoryColor(post.category);
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="group block rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-300 dark:hover:border-blue-700 transition-all hover:shadow-xl hover:shadow-blue-500/8 hover:-translate-y-1"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease, transform 0.6s ease, box-shadow 0.2s, border-color 0.2s, translate 0.2s",
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Image */}
        <div className="relative h-56 sm:h-72 lg:h-full min-h-[280px]">
          <PostImage post={post} fill sizes="(max-width: 1024px) 100vw, 50vw" />
          {/* Featured badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase bg-blue-600 text-white shadow-lg shadow-blue-600/30">
              Featured
            </span>
          </div>
        </div>

        {/* Copy */}
        <div className="p-7 sm:p-9 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span
                className="text-[10px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-lg"
                style={{ background: color + "14", color }}
              >
                {post.category}
              </span>
              <span className="text-[10px] text-slate-400 dark:text-slate-600 flex items-center gap-1">
                <Clock size={10} /> {post.readTime}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-snug mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {post.title}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light mb-6 line-clamp-3">
              {post.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {post.tags.map(t => (
                <span
                  key={t}
                  className="text-[9px] font-bold px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[11px] text-slate-400 dark:text-slate-500">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-extrabold text-white flex-shrink-0"
                style={{ background: `linear-gradient(135deg, #1e3a8a, #3b82f6)` }}
              >
                QI
              </div>
              <span className="font-semibold">{post.author}</span>
              <span className="text-slate-300 dark:text-slate-700">·</span>
              <span className="flex items-center gap-1">
                <Calendar size={10} /> {formatDate(post.date)}
              </span>
            </div>
            <span
              className="flex items-center gap-1 text-xs font-bold transition-colors"
              style={{ color }}
            >
              Read more <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ── Standard post card ────────────────────────────────────────────────────────

function PostCard({ post, index, visible }) {
  const color = getCategoryColor(post.category);
  const delay = 80 + (index % 3) * 60;

  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="group flex flex-col rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-300 dark:hover:border-blue-700 transition-all hover:shadow-xl hover:shadow-blue-500/8 hover:-translate-y-1"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms, box-shadow 0.2s, border-color 0.2s, translate 0.2s`,
      }}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden flex-shrink-0">
        <PostImage post={post} className="w-full h-full" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
        {/* Category pill over image */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className="text-[9px] font-extrabold tracking-widest uppercase px-2 py-0.5 rounded-md backdrop-blur-sm"
            style={{ background: color + "cc", color: "#fff" }}
          >
            {post.category}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-3 mb-3 text-[10px] text-slate-400 dark:text-slate-500">
          <span className="flex items-center gap-1"><Clock size={10} /> {post.readTime}</span>
          <span className="flex items-center gap-1"><Calendar size={10} /> {formatDate(post.date)}</span>
        </div>

        <h3 className="text-[15px] font-extrabold tracking-tight leading-snug mb-2.5 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-1">
          {post.title}
        </h3>

        <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed font-light mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto pt-3.5 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1.5">
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-extrabold text-white flex-shrink-0"
              style={{ background: `linear-gradient(135deg, #1e3a8a, #3b82f6)` }}
            >
              QI
            </div>
            <span className="text-[10px] font-semibold text-slate-400">{post.author}</span>
          </div>
          <span
            className="flex items-center gap-0.5 text-[10px] font-bold"
            style={{ color }}
          >
            Read <ChevronRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
}

// ── Category pill ─────────────────────────────────────────────────────────────

function CategoryPill({ label, active, onClick }) {
  const color = getCategoryColor(label);
  return (
    <button
      onClick={onClick}
      className="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border"
      style={active
        ? { background: color, color: "#fff", borderColor: color, boxShadow: `0 4px 12px ${color}35` }
        : { background: "transparent", color: "#64748b", borderColor: "#e2e8f0" }
      }
    >
      {label}
    </button>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function BlogsPage() {
  const [visible,       setVisible]       = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search,        setSearch]        = useState("");
  const [statsVisible,  setStatsVisible]  = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsVisible(true); },
      { threshold: 0.2 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  // Filter
  const filtered = POSTS.filter(p => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const q = search.toLowerCase();
    const matchSearch = !q ||
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });

  const featured = filtered.find(p => p.featured);
  const rest = filtered.filter(p => !p.featured || activeCategory !== "All" || search);
  // When filtered/searched, show everything in grid
  const showFeatured = !search && activeCategory === "All" && featured;
  const gridPosts = showFeatured ? filtered.filter(p => !p.featured) : filtered;

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,rgba(59,130,246,0.07),transparent)] dark:bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,rgba(59,130,246,0.14),transparent)]" />

        <div className="relative max-w-3xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-7 border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">QuickInfra Blog</span>
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.07] tracking-tight mb-5"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.7s ease 80ms, transform 0.7s ease 80ms",
            }}
          >
            Cloud. DevOps.<br />
            <span className="text-blue-600 dark:text-blue-500">No Fluff.</span>
          </h1>

          <p
            className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-light mb-10 max-w-xl mx-auto"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.7s ease 160ms, transform 0.7s ease 160ms",
            }}
          >
            Practical guides, deep dives, and honest takes on cloud infrastructure, DevOps automation, and shipping software faster.
          </p>

          {/* Search */}
          <div
            className="relative max-w-md mx-auto"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.7s ease 240ms, transform 0.7s ease 240ms",
            }}
          >
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search posts..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl text-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 transition-colors shadow-sm"
            />
          </div>
        </div>
      </section>

   

      {/* ── CONTENT ─────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Category filters */}
          <div
            className="flex flex-wrap gap-2 mb-10"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.6s ease 300ms, transform 0.6s ease 300ms",
            }}
          >
            {CATEGORIES.map(cat => (
              <CategoryPill
                key={cat}
                label={cat}
                active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              />
            ))}
          </div>

          {/* Result count when searching */}
          {(search || activeCategory !== "All") && (
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-6 font-medium">
              {filtered.length} post{filtered.length !== 1 ? "s" : ""} found
              {activeCategory !== "All" ? ` in "${activeCategory}"` : ""}
              {search ? ` matching "${search}"` : ""}
            </p>
          )}

          {/* Featured post */}
          {showFeatured && (
            <div className="mb-10">
              <FeaturedCard post={featured} visible={visible} />
            </div>
          )}

          {/* Grid */}
          {gridPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {gridPosts.map((post, i) => (
                <PostCard key={post.slug} post={post} index={i} visible={visible} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="text-4xl mb-4">🔍</p>
              <p className="text-base font-bold text-slate-500 dark:text-slate-400">No posts found</p>
              <p className="text-sm text-slate-400 dark:text-slate-600 mt-1">Try a different search or category</p>
              <button
                onClick={() => { setSearch(""); setActiveCategory("All"); }}
                className="mt-4 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}

        </div>
      </section>

      {/* ── NEWSLETTER CTA ──────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-[10px] font-bold tracking-widest uppercase text-blue-600 dark:text-blue-500 mb-4">Stay Updated</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">New posts, straight to you.</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-8">
            No spam. Just practical cloud and DevOps content when it's published.
          </p>
          <a
            href="mailto:quickinfracloud@gmail.com?subject=Subscribe to QuickInfra Blog&body=Hi, I'd like to subscribe to the QuickInfra blog."
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all hover:-translate-y-0.5"
          >
            Subscribe via Email <ArrowRight size={15} />
          </a>
        </div>
      </section>

    </div>
  );
}