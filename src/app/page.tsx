"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
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
          {/* Cultivation core — pulsing dantian */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-10"
          >
            <div className="relative flex items-center justify-center w-32 h-32">
              {/* Outer ring pulse */}
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.1, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full border border-gold/30"
              />
              {/* Middle ring */}
              <motion.div
                animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.2, 0.5] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute inset-3 rounded-full border border-purple/40"
              />
              {/* Core glow */}
              <div
                className="absolute inset-6 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(212,168,83,0.15) 0%, transparent 70%)",
                }}
              />
              {/* Emoji */}
              <span className="relative text-6xl select-none">🦞</span>
            </div>
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
