"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, Tag, ArrowRight, ChevronRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { POSTS, CATEGORY_GRADIENTS } from "../data";

// ── Markdown component map ────────────────────────────────────────────────────

const MD_COMPONENTS = {
  h2: ({ children }) => (
    <h2 className="text-2xl font-extrabold tracking-tight mt-10 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-bold mt-7 mb-3 text-slate-800 dark:text-slate-200">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-[15px] leading-[1.85] text-slate-600 dark:text-slate-400 mb-5 font-light">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="mb-5 space-y-2 pl-1">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-5 space-y-2 list-decimal list-inside">
      {children}
    </ol>
  ),
  li: ({ children, ordered }) =>
    ordered ? (
      <li className="text-[15px] text-slate-600 dark:text-slate-400 font-light leading-relaxed ml-4">
        {children}
      </li>
    ) : (
      <li className="flex items-start gap-2.5 text-[15px] text-slate-600 dark:text-slate-400 font-light leading-relaxed">
        <span className="mt-[9px] w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
        <span>{children}</span>
      </li>
    ),
  strong: ({ children }) => (
    <strong className="font-bold text-slate-800 dark:text-slate-200">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-slate-700 dark:text-slate-300">{children}</em>
  ),
  pre: ({ children }) => (
    <pre className="my-5 p-4 rounded-xl bg-slate-900 dark:bg-slate-950 border border-slate-800 overflow-x-auto">
      {children}
    </pre>
  ),
  code: ({ inline, children }) =>
    inline ? (
      <code className="px-1.5 py-0.5 rounded text-[13px] font-mono bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/40">
        {children}
      </code>
    ) : (
      <code className="text-[13px] font-mono text-slate-300 leading-relaxed">{children}</code>
    ),
  blockquote: ({ children }) => (
    <blockquote className="my-6 pl-5 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/10 py-3 pr-4 rounded-r-xl">
      <div className="text-[15px] text-slate-600 dark:text-slate-400 font-light italic leading-relaxed">
        {children}
      </div>
    </blockquote>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 dark:text-blue-400 underline underline-offset-2 hover:text-blue-500 transition-colors"
    >
      {children}
    </a>
  ),
  hr: () => <hr className="my-8 border-slate-100 dark:border-slate-800" />,
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });
}

function getCategoryColor(category) {
  const MAP = {
    "DevOps":               "#3b82f6",
    "Cloud Infrastructure": "#10b981",
    "CI/CD":                "#8b5cf6",
    "Security":             "#ef4444",
    "IaC":                  "#f59e0b",
    "Automation":           "#06b6d4",
    "Migration":            "#22c55e",
  };
  return MAP[category] || "#64748b";
}

// ── Hero image / gradient placeholder ────────────────────────────────────────

function HeroImage({ post }) {
  const [imgError, setImgError] = useState(false);
  const gradient = CATEGORY_GRADIENTS[post.category] || CATEGORY_GRADIENTS["General"];
  const color = getCategoryColor(post.category);

  if (!post.image || imgError) {
    return (
      <div
        className="w-full h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden flex items-center justify-center relative"
        style={{ background: `linear-gradient(140deg, ${gradient[0]}, ${gradient[1]})` }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative z-10 text-center">
          <span
            className="inline-block text-sm font-extrabold tracking-widest uppercase px-4 py-2 rounded-full mb-3"
            style={{ background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.9)" }}
          >
            {post.category}
          </span>
          <div className="flex flex-wrap justify-center gap-2 px-6">
            {post.tags.map(t => (
              <span key={t} className="text-[11px] font-semibold text-white/40">{t}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden">
      <Image
        src={post.image}
        alt={post.title}
        fill
        sizes="(max-width: 768px) 100vw, 800px"
        className="object-cover"
        onError={() => setImgError(true)}
        priority
      />
    </div>
  );
}

// ── Related card ──────────────────────────────────────────────────────────────

function RelatedCard({ post }) {
  const color = getCategoryColor(post.category);
  const gradient = CATEGORY_GRADIENTS[post.category] || CATEGORY_GRADIENTS["General"];
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="group flex flex-col rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-300 dark:hover:border-blue-700 transition-all hover:shadow-lg hover:shadow-blue-500/8 hover:-translate-y-0.5"
    >
      <div className="relative h-36 overflow-hidden flex-shrink-0">
        {post.image && !imgError ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="33vw"
            className="object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: `linear-gradient(140deg, ${gradient[0]}, ${gradient[1]})` }}
          >
            <span className="text-[9px] font-extrabold tracking-widest uppercase text-white/60">{post.category}</span>
          </div>
        )}
        <div className="absolute top-2 left-2">
          <span
            className="text-[9px] font-extrabold tracking-widest uppercase px-2 py-0.5 rounded backdrop-blur-sm"
            style={{ background: color + "cc", color: "#fff" }}
          >
            {post.category}
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h4 className="text-[13px] font-extrabold tracking-tight leading-snug mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {post.title}
        </h4>
        <div className="flex items-center justify-between mt-auto pt-2.5 border-t border-slate-100 dark:border-slate-800">
          <span className="text-[10px] text-slate-400 flex items-center gap-1">
            <Clock size={9} /> {post.readTime}
          </span>
          <span className="text-[10px] font-bold flex items-center gap-0.5" style={{ color }}>
            Read <ChevronRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function BlogPostPage({ params }) {
  const { slug } = use(params);
  const post = POSTS.find(p => p.slug === slug);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  if (!post) notFound();

  const color = getCategoryColor(post.category);
  const related = POSTS.filter(p => p.slug !== slug && p.category === post.category).slice(0, 3);
  const more = related.length < 3
    ? [...related, ...POSTS.filter(p => p.slug !== slug && p.category !== post.category).slice(0, 3 - related.length)]
    : related;

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

        {/* ── Back link ── */}
        <Link
          href="/blogs"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-10 group"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(-8px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
          <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to Blog
        </Link>

        {/* ── Header ── */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease 80ms, transform 0.6s ease 80ms",
          }}
        >
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span
              className="text-[10px] font-extrabold tracking-widest uppercase px-3 py-1 rounded-lg"
              style={{ background: color + "14", color }}
            >
              {post.category}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock size={11} /> {post.readTime}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Calendar size={11} /> {formatDate(post.date)}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] mb-5">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-light mb-7 max-w-2xl">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-3 pb-8 border-b border-slate-100 dark:border-slate-800 mb-8">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-extrabold text-white flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #1e3a8a, #3b82f6)" }}
            >
              QI
            </div>
            <div>
              <p className="text-sm font-bold">{post.author}</p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500">QuickInfra Cloud Solution</p>
            </div>
            <div className="ml-auto flex flex-wrap gap-1.5 justify-end">
              {post.tags.map(t => (
                <span
                  key={t}
                  className="text-[9px] font-bold px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 flex items-center gap-1"
                >
                  <Tag size={8} /> {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Hero image ── */}
        <div
          className="mb-12"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.99)",
            transition: "opacity 0.65s ease 160ms, transform 0.65s ease 160ms",
          }}
        >
          <HeroImage post={post} />
        </div>

        {/* ── Article body ── */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 240ms",
          }}
        >
          {post.content ? (
            <div className="max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={MD_COMPONENTS}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-7 text-center mb-14">
              <div className="text-3xl mb-3">📝</div>
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-1">Full article coming soon</p>
              <p className="text-xs text-slate-400 dark:text-slate-600 leading-relaxed max-w-sm mx-auto">
                Add a <code className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-[11px]">content</code> field to this post in <code className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-[11px]">data.js</code>.
              </p>
            </div>
          )}
        </div>

        {/* ── Related posts ── */}
        {more.length > 0 && (
          <div
            style={{
              opacity: visible ? 1 : 0,
              transition: "opacity 0.6s ease 320ms",
            }}
          >
            <div className="flex items-center justify-between mb-5 mt-16">
              <h2 className="text-lg font-extrabold tracking-tight">More Posts</h2>
              <Link
                href="/blogs"
                className="flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
              >
                View all <ArrowRight size={12} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {more.map(p => <RelatedCard key={p.slug} post={p} />)}
            </div>
          </div>
        )}

        
      </div>
    </div>
  );
}