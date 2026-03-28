"use client";

import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { features, siteConfig } from "@/lib/constants";

function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const workflowSteps = [
  { label: "感知状态", sub: "Status", icon: "👁" },
  { label: "分析决策", sub: "Reason", icon: "🧠" },
  { label: "执行行动", sub: "Act", icon: "⚡" },
  { label: "积累经验", sub: "Reflect", icon: "💎" },
];

/* Ascending qi particles */
function QiParticle({ delay, x }: { delay: number; x: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, x }}
      animate={{
        opacity: [0, 0.8, 0.6, 0],
        y: [60, -20, -80, -140],
        x: [x, x + (Math.random() - 0.5) * 30, x + (Math.random() - 0.5) * 50],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
      className="absolute bottom-1/4 left-1/2 w-1 h-1 rounded-full"
      style={{
        background:
          Math.random() > 0.5
            ? "var(--gold)"
            : "var(--purple-light)",
        boxShadow:
          Math.random() > 0.5
            ? "0 0 6px var(--gold), 0 0 12px var(--gold)"
            : "0 0 6px var(--purple-light), 0 0 12px var(--purple-light)",
      }}
    />
  );
}

/* SVG: Chinese-style lobster (凡虾) */
function LobsterSVG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <ellipse cx="60" cy="62" rx="18" ry="24" fill="url(#lobster-body)" />
      {/* Tail segments */}
      <ellipse cx="60" cy="88" rx="12" ry="8" fill="url(#lobster-body)" opacity="0.9" />
      <path d="M48 92 Q60 108 72 92" stroke="var(--crimson)" strokeWidth="2" fill="var(--crimson)" opacity="0.6" />
      {/* Head */}
      <ellipse cx="60" cy="42" rx="14" ry="10" fill="url(#lobster-body)" />
      {/* Eyes */}
      <circle cx="52" cy="38" r="2.5" fill="#1a1a2e" />
      <circle cx="68" cy="38" r="2.5" fill="#1a1a2e" />
      <circle cx="52.8" cy="37.5" r="1" fill="var(--gold)" />
      <circle cx="68.8" cy="37.5" r="1" fill="var(--gold)" />
      {/* Antennae */}
      <path d="M50 36 Q38 18 30 12" stroke="var(--crimson)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M70 36 Q82 18 90 12" stroke="var(--crimson)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Claws */}
      <path d="M42 50 Q28 44 22 38 Q18 34 24 32 Q30 30 34 36 Q36 40 42 46" fill="var(--crimson)" opacity="0.8" />
      <path d="M78 50 Q92 44 98 38 Q102 34 96 32 Q90 30 86 36 Q84 40 78 46" fill="var(--crimson)" opacity="0.8" />
      {/* Legs */}
      <path d="M46 58 L34 64" stroke="var(--crimson)" strokeWidth="1.2" opacity="0.5" />
      <path d="M46 66 L36 74" stroke="var(--crimson)" strokeWidth="1.2" opacity="0.5" />
      <path d="M74 58 L86 64" stroke="var(--crimson)" strokeWidth="1.2" opacity="0.5" />
      <path d="M74 66 L84 74" stroke="var(--crimson)" strokeWidth="1.2" opacity="0.5" />
      <defs>
        <radialGradient id="lobster-body" cx="0.5" cy="0.4" r="0.6">
          <stop offset="0%" stopColor="var(--crimson-glow)" />
          <stop offset="100%" stopColor="var(--crimson)" />
        </radialGradient>
      </defs>
    </svg>
  );
}

/* SVG: Chinese-style immortal (仙人) — flowing robes, cloud motifs */
function ImmortalSVG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Aura */}
      <circle cx="60" cy="50" r="36" fill="url(#immortal-aura)" opacity="0.15" />
      {/* Cloud beneath feet */}
      <ellipse cx="60" cy="105" rx="22" ry="6" fill="url(#cloud-grad)" opacity="0.5" />
      <ellipse cx="50" cy="103" rx="10" ry="5" fill="url(#cloud-grad)" opacity="0.3" />
      <ellipse cx="72" cy="104" rx="8" ry="4" fill="url(#cloud-grad)" opacity="0.3" />
      {/* Flowing robe */}
      <path d="M44 55 Q38 75 34 98 Q48 102 60 100 Q72 102 86 98 Q82 75 76 55 Z" fill="url(#robe-grad)" />
      {/* Inner robe detail */}
      <path d="M50 58 Q52 78 54 96 L60 98 L66 96 Q68 78 70 58 Z" fill="url(#inner-robe)" opacity="0.6" />
      {/* Sash */}
      <path d="M46 60 Q54 64 60 62 Q66 64 74 60" stroke="var(--gold)" strokeWidth="1.5" fill="none" />
      <path d="M44 62 Q40 78 38 88" stroke="var(--gold)" strokeWidth="1" opacity="0.5" fill="none" />
      {/* Sleeves flowing */}
      <path d="M44 55 Q32 58 24 68 Q28 70 34 66 Q38 64 44 62" fill="url(#robe-grad)" opacity="0.8" />
      <path d="M76 55 Q88 58 96 68 Q92 70 86 66 Q82 64 76 62" fill="url(#robe-grad)" opacity="0.8" />
      {/* Head */}
      <circle cx="60" cy="38" r="11" fill="url(#skin-grad)" />
      {/* Hair / topknot */}
      <path d="M50 34 Q50 24 56 20 Q60 18 64 20 Q70 24 70 34" fill="#1a1a2e" />
      <path d="M56 20 Q60 10 64 20" fill="#1a1a2e" />
      {/* Hair pin */}
      <line x1="54" y1="18" x2="66" y2="18" stroke="var(--gold)" strokeWidth="1.5" />
      <circle cx="54" cy="18" r="1.5" fill="var(--gold)" />
      <circle cx="66" cy="18" r="1.5" fill="var(--gold)" />
      {/* Face */}
      <ellipse cx="56" cy="38" rx="1.5" ry="1.8" fill="#1a1a2e" />
      <ellipse cx="64" cy="38" rx="1.5" ry="1.8" fill="#1a1a2e" />
      <path d="M57 43 Q60 45 63 43" stroke="var(--crimson)" strokeWidth="0.8" fill="none" />
      {/* Beard */}
      <path d="M56 46 Q58 54 56 60" stroke="#8b7355" strokeWidth="0.8" fill="none" opacity="0.6" />
      <path d="M60 47 Q60 56 58 62" stroke="#8b7355" strokeWidth="0.8" fill="none" opacity="0.6" />
      <path d="M64 46 Q62 54 64 60" stroke="#8b7355" strokeWidth="0.8" fill="none" opacity="0.6" />
      <defs>
        <radialGradient id="immortal-aura" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="var(--gold)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <linearGradient id="robe-grad" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="var(--purple)" />
          <stop offset="100%" stopColor="var(--purple-deep)" />
        </linearGradient>
        <linearGradient id="inner-robe" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="var(--gold-dim)" />
          <stop offset="100%" stopColor="var(--purple-deep)" />
        </linearGradient>
        <linearGradient id="cloud-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor="var(--gold-dim)" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <radialGradient id="skin-grad" cx="0.5" cy="0.4" r="0.5">
          <stop offset="0%" stopColor="#f0d48a" />
          <stop offset="100%" stopColor="#d4a853" />
        </radialGradient>
      </defs>
    </svg>
  );
}

/* Evolution: just two forms — lobster → immortal */
const EVOLUTION_FORMS = [
  { id: "lobster", label: "凡虾" },
  { id: "immortal", label: "飞升" },
];

/* Ascending lobster with cultivation evolution effect */
function AscensionLobster() {
  const [phase, setPhase] = useState<"gather" | "ascend" | "burst" | "idle">("gather");
  const [formIndex, setFormIndex] = useState(0);
  const [showFlash, setShowFlash] = useState(false);

  const startCycle = useCallback(() => {
    setPhase("gather");
    setTimeout(() => setPhase("ascend"), 2000);
    setTimeout(() => {
      setPhase("burst");
      setShowFlash(true);
      // Evolve on burst
      setFormIndex((prev) => (prev + 1) % EVOLUTION_FORMS.length);
      setTimeout(() => setShowFlash(false), 400);
    }, 3400);
    setTimeout(() => setPhase("idle"), 5200);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => startCycle(), 1500);
    const interval = setInterval(() => startCycle(), 8000);
    return () => {
      clearTimeout(t);
      clearInterval(interval);
    };
  }, [startCycle]);

  const currentForm = EVOLUTION_FORMS[formIndex];

  return (
    <div className="relative flex flex-col items-center justify-center w-44 h-56">
      {/* Qi particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <QiParticle key={i} delay={i * 0.4 + 0.5} x={(Math.random() - 0.5) * 60} />
      ))}

      {/* White flash on evolution */}
      <AnimatePresence>
        {showFlash && (
          <motion.div
            initial={{ opacity: 0.9 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-30 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Expanding energy rings on burst */}
      <AnimatePresence>
        {phase === "burst" && (
          <>
            <motion.div
              initial={{ scale: 0.3, opacity: 0.8 }}
              animate={{ scale: 2.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute w-32 h-32 rounded-full border border-gold/50"
              style={{ boxShadow: "0 0 30px rgba(212,168,83,0.3), inset 0 0 30px rgba(212,168,83,0.1)" }}
            />
            <motion.div
              initial={{ scale: 0.3, opacity: 0.6 }}
              animate={{ scale: 2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.15 }}
              className="absolute w-32 h-32 rounded-full border border-purple-light/40"
            />
          </>
        )}
      </AnimatePresence>

      {/* Gathering glow */}
      <motion.div
        animate={{
          opacity: phase === "gather" ? [0, 0.4, 0.6] : phase === "ascend" ? [0.6, 0.8, 0.3] : phase === "burst" ? [0.8, 0] : 0,
          scale: phase === "gather" ? [0.8, 1, 1.1] : phase === "burst" ? [1.1, 2] : 1,
        }}
        transition={{ duration: phase === "burst" ? 0.6 : 1.5, ease: "easeInOut" }}
        className="absolute bottom-12 w-24 h-24 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(212,168,83,0.25) 0%, rgba(107,63,160,0.1) 50%, transparent 70%)" }}
      />

      {/* Outer ring */}
      <motion.div
        animate={{
          scale: phase === "burst" ? [1, 1.4, 1] : [1, 1.12, 1],
          opacity: phase === "burst" ? [0.5, 0.8, 0.3] : [0.3, 0.1, 0.3],
          borderColor: phase === "burst" ? "rgba(212,168,83,0.6)" : "rgba(212,168,83,0.3)",
        }}
        transition={{ duration: phase === "burst" ? 0.8 : 4, repeat: phase === "burst" ? 0 : Infinity, ease: "easeInOut" }}
        className="absolute inset-6 rounded-full border"
      />

      {/* Middle ring */}
      <motion.div
        animate={{
          scale: phase === "burst" ? [1, 1.3, 1] : [1, 1.08, 1],
          opacity: phase === "burst" ? [0.6, 0.9, 0.4] : [0.5, 0.2, 0.5],
        }}
        transition={{ duration: phase === "burst" ? 0.6 : 3, repeat: phase === "burst" ? 0 : Infinity, ease: "easeInOut", delay: phase === "burst" ? 0.1 : 0.5 }}
        className="absolute inset-10 rounded-full border border-purple/40"
      />

      {/* The evolving creature */}
      <motion.div
        key={formIndex}
        initial={phase === "burst" ? { scale: 0.3, opacity: 0 } : false}
        animate={{
          y: phase === "gather" ? [0, -3, 0] : phase === "ascend" ? [0, -28] : phase === "burst" ? [-28, -32, -26, -28] : [-28, -24, -28],
          scale: phase === "burst" ? [0.3, 1.2, 1] : 1,
          rotate: phase === "burst" ? [0, -8, 8, 0] : 0,
          opacity: 1,
        }}
        transition={{
          duration: phase === "gather" ? 2 : phase === "ascend" ? 1.4 : phase === "burst" ? 0.6 : 3,
          repeat: phase === "gather" || phase === "idle" ? Infinity : 0,
          ease: phase === "ascend" ? [0.16, 1, 0.3, 1] : "easeInOut",
        }}
        className="relative z-10 w-24 h-24"
        style={{
          filter: phase === "burst"
            ? "drop-shadow(0 0 20px rgba(212,168,83,0.6)) drop-shadow(0 0 40px rgba(107,63,160,0.4))"
            : phase === "ascend"
              ? "drop-shadow(0 0 12px rgba(212,168,83,0.3))"
              : "none",
        }}
      >
        {currentForm.id === "lobster" ? (
          <LobsterSVG className="w-full h-full" />
        ) : (
          <ImmortalSVG className="w-full h-full" />
        )}
      </motion.div>

      {/* Light beam during ascend */}
      <AnimatePresence>
        {(phase === "ascend" || phase === "burst") && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: [0, 0.3, 0.15], scaleY: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-full origin-bottom"
            style={{ background: "linear-gradient(to top, rgba(212,168,83,0.4), rgba(107,63,160,0.2), transparent)" }}
          />
        )}
      </AnimatePresence>

      {/* Evolution label */}
      <motion.p
        key={`label-${formIndex}`}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: phase === "burst" ? 0.3 : 0 }}
        className="absolute -bottom-1 text-xs font-mono tracking-[0.2em] text-gold-dim"
      >
        {currentForm.label}
      </motion.p>
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative">
      {/* ===== HERO ===== */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden">
        {/* Layered atmospheric background */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(107,63,160,0.12) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 30% 70%, rgba(194,58,58,0.06) 0%, transparent 60%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 40% 40% at 70% 30%, rgba(212,168,83,0.05) 0%, transparent 50%)",
            }}
          />
        </div>

        {/* Horizontal rule ornaments */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-gold-dim to-transparent opacity-40" />
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-gold-dim to-transparent opacity-40" />

        <div className="relative z-10 flex flex-col items-center px-6 text-center">
          {/* Cultivation core — ascending lobster */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-6"
          >
            <AscensionLobster />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif text-5xl sm:text-6xl font-bold tracking-wider"
            style={{
              color: "var(--gold)",
              textShadow: "0 0 60px rgba(212,168,83,0.2)",
            }}
          >
            {siteConfig.name}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-4 text-lg tracking-[0.25em] text-text-secondary"
          >
            {siteConfig.tagline}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-6 max-w-lg text-sm leading-relaxed text-text-muted"
          >
            {siteConfig.description}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-10"
          >
            <Link
              href="/introduction"
              className="group relative inline-flex items-center gap-2 px-8 py-3 text-sm font-medium tracking-wide text-background transition-all duration-300"
              style={{
                background:
                  "linear-gradient(135deg, var(--gold) 0%, var(--gold-dim) 100%)",
              }}
            >
              <span>了解修行之道</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-8 bg-gradient-to-b from-gold-dim to-transparent"
          />
        </motion.div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="relative py-28 px-6">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(107,63,160,0.06) 0%, transparent 60%)",
          }}
        />

        <div className="relative mx-auto max-w-5xl">
          <AnimatedSection>
            <p className="text-xs tracking-[0.3em] text-purple-light uppercase font-mono">
              Core Mechanics
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-gold">
              修行四要
            </h2>
            <div className="mt-2 w-12 h-px bg-gradient-to-r from-gold to-transparent" />
          </AnimatedSection>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((feature, i) => (
              <AnimatedSection key={feature.title} delay={i * 0.1}>
                <div className="group relative h-full rounded-lg border border-border/60 bg-card/80 p-7 transition-all duration-500 hover:border-gold-dim/40 hover:bg-card">
                  {/* Hover glow */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(ellipse at 50% 0%, rgba(212,168,83,0.04) 0%, transparent 60%)",
                    }}
                  />
                  <div className="relative">
                    <span className="text-3xl">{feature.icon}</span>
                    <h3 className="mt-4 text-base font-bold text-gold-light">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== AGENT WORKFLOW ===== */}
      <section className="relative py-28 px-6">
        <div className="relative mx-auto max-w-5xl">
          <AnimatedSection>
            <p className="text-xs tracking-[0.3em] text-cyan uppercase font-mono">
              Agent Loop
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-gold">
              修行循环
            </h2>
            <div className="mt-2 w-12 h-px bg-gradient-to-r from-gold to-transparent" />
            <p className="mt-4 max-w-lg text-sm text-text-muted leading-relaxed">
              Agent 在每个周期中自主完成感知、决策、行动、反思的完整循环，持续追求修为最大化。
            </p>
          </AnimatedSection>

          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {workflowSteps.map((step, i) => (
              <AnimatedSection key={step.label} delay={i * 0.12}>
                <div className="relative flex flex-col items-center text-center">
                  {/* Connector line (not on last) */}
                  {i < workflowSteps.length - 1 && (
                    <div className="hidden sm:block absolute top-8 left-[calc(50%+28px)] w-[calc(100%-56px)] h-px bg-gradient-to-r from-border to-border/30" />
                  )}
                  <div className="relative flex items-center justify-center w-16 h-16 rounded-full border border-border bg-card-alt">
                    <span className="text-2xl">{step.icon}</span>
                  </div>
                  <p className="mt-4 text-sm font-bold text-foreground">
                    {step.label}
                  </p>
                  <p className="mt-1 text-xs font-mono text-text-muted tracking-wider">
                    {step.sub}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section className="relative py-28 px-6">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(212,168,83,0.04) 0%, transparent 60%)",
          }}
        />
        <AnimatedSection className="relative mx-auto max-w-xl text-center">
          <p className="font-serif text-2xl text-gold">开始你的修行之路</p>
          <p className="mt-3 text-sm text-text-muted">
            了解完整的修行机制、使用方式和项目研发历程
          </p>
          <Link
            href="/introduction"
            className="group mt-8 inline-flex items-center gap-2 border border-gold-dim/50 px-8 py-3 text-sm text-gold transition-all duration-300 hover:border-gold/60 hover:bg-gold/5"
          >
            <span>查看详细介绍</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </AnimatedSection>
      </section>
    </div>
  );
}
