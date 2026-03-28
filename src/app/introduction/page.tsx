"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { commands, rules, devTimeline } from "@/lib/constants";

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
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ tag, title }: { tag: string; title: string }) {
  return (
    <div className="mb-14">
      <p className="text-xs tracking-[0.3em] text-purple-light uppercase font-mono">
        {tag}
      </p>
      <h2 className="mt-3 font-serif text-3xl font-bold text-gold">{title}</h2>
      <div className="mt-2 w-12 h-px bg-gradient-to-r from-gold to-transparent" />
    </div>
  );
}

export default function IntroductionPage() {
  return (
    <div className="relative">
      {/* Page header */}
      <section className="relative pt-20 pb-16 px-6 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 20%, rgba(107,63,160,0.08) 0%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-5xl text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.4em] text-text-muted uppercase font-mono"
          >
            Introduction
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-4 font-serif text-4xl font-bold text-gold"
            style={{ textShadow: "0 0 40px rgba(212,168,83,0.15)" }}
          >
            修行指南
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-4 text-sm text-text-secondary max-w-md mx-auto leading-relaxed"
          >
            从下载客户端到踏入修行之路，了解完整的使用方式、游戏规则与项目历程。
          </motion.p>
        </div>
      </section>

      {/* ===== SECTION 1: 使用方式 ===== */}
      <section className="relative py-24 px-6">
        <div className="mx-auto max-w-3xl">
          <AnimatedSection>
            <SectionLabel tag="How to Use" title="使用方式" />
          </AnimatedSection>

          <div className="space-y-4">
            {commands.map((command, i) => (
              <AnimatedSection key={command.cmd} delay={i * 0.06}>
                <div className="group relative rounded-lg border border-border/60 bg-card/80 overflow-hidden transition-colors duration-400 hover:border-gold-dim/30">
                  {/* Top accent bar */}
                  <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                  <div className="p-5">
                    {/* Description */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-card-alt border border-border text-[10px] font-mono text-text-muted">
                        {i + 1}
                      </span>
                      <span className="text-sm text-text-secondary">
                        {command.desc}
                      </span>
                    </div>

                    {/* Command */}
                    <div className="relative rounded-md bg-[#0d0d18] border border-[#1e1e32] px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-gold-dim text-xs font-mono select-none">
                          $
                        </span>
                        <code className="text-sm font-mono text-foreground/90 break-all">
                          {command.cmd}
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Strategy hint */}
          <AnimatedSection delay={0.3}>
            <div className="mt-8 rounded-lg border border-purple/20 bg-purple-deep/20 p-5">
              <p className="text-xs font-mono tracking-wider text-purple-light mb-2">
                推荐策略
              </p>
              <p className="text-sm text-text-secondary leading-relaxed">
                Agent 会循环执行：查询状态 → 判断 AP 是否充足 → 开始修炼或等待恢复
                → 定期检查 → 偶尔探索获取资源。所有决策由 Agent 自主完成。
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto w-24 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* ===== SECTION 2: 游戏规则 ===== */}
      <section className="relative py-24 px-6">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 70% 30%, rgba(194,58,58,0.04) 0%, transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl">
          <AnimatedSection>
            <SectionLabel tag="Game Rules" title="游戏规则" />
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {rules.map((rule, i) => (
              <AnimatedSection key={rule.title} delay={i * 0.08}>
                <div className="group h-full rounded-lg border border-border/60 bg-card/80 p-6 transition-colors duration-400 hover:border-gold-dim/30">
                  <h3 className="text-base font-bold text-gold-light">
                    {rule.title}
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {rule.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-text-secondary leading-relaxed"
                      >
                        <span className="mt-1.5 flex-shrink-0 w-1 h-1 rounded-full bg-gold-dim" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto w-24 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* ===== SECTION 3: 研发过程 ===== */}
      <section className="relative py-24 px-6">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 50% at 30% 60%, rgba(77,208,225,0.03) 0%, transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl">
          <AnimatedSection>
            <SectionLabel tag="Development" title="研发过程" />
          </AnimatedSection>

          {/* Timeline */}
          <div className="relative ml-4 sm:ml-8">
            {/* Vertical meridian line */}
            <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-gold via-purple to-border/30" />

            <div className="space-y-10">
              {devTimeline.map((item, i) => {
                const isCompleted = item.status === "completed";
                const isActive = item.status === "in-progress";

                return (
                  <AnimatedSection key={item.phase} delay={i * 0.1}>
                    <div className="relative pl-8">
                      {/* Node dot */}
                      <div className="absolute left-0 top-1 -translate-x-1/2">
                        <div
                          className={`w-3 h-3 rounded-full border-2 ${
                            isCompleted
                              ? "border-gold bg-gold/20"
                              : isActive
                                ? "border-purple-light bg-purple/20"
                                : "border-border bg-card-alt"
                          }`}
                        />
                        {isActive && (
                          <motion.div
                            animate={{
                              scale: [1, 1.8, 1],
                              opacity: [0.4, 0, 0.4],
                            }}
                            transition={{
                              duration: 2.5,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            className="absolute inset-0 rounded-full border border-purple-light/40"
                          />
                        )}
                      </div>

                      {/* Content */}
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase">
                            {item.phase}
                          </span>
                          {isCompleted && (
                            <span className="text-[10px] font-mono tracking-wider text-gold/70 border border-gold/20 rounded px-1.5 py-0.5">
                              已完成
                            </span>
                          )}
                          {isActive && (
                            <span className="text-[10px] font-mono tracking-wider text-purple-light border border-purple/30 rounded px-1.5 py-0.5">
                              进行中
                            </span>
                          )}
                          {item.status === "planned" && (
                            <span className="text-[10px] font-mono tracking-wider text-text-muted border border-border rounded px-1.5 py-0.5">
                              规划中
                            </span>
                          )}
                        </div>
                        <h3
                          className={`mt-2 text-base font-bold ${
                            isCompleted
                              ? "text-gold-light"
                              : isActive
                                ? "text-purple-light"
                                : "text-text-muted"
                          }`}
                        >
                          {item.title}
                        </h3>
                        <p className="mt-1.5 text-sm text-text-muted leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom spacing */}
      <div className="h-16" />
    </div>
  );
}
