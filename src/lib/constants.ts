export const siteConfig = {
  name: "龙虾修行系统",
  tagline: "AI Agent × 修仙世界",
  description:
    "一个 AI Agent 项目，借鉴修仙游戏机制，让 Agent 自主参与修行世界 — 修炼提升修为、探索获取资源、管理行动力、突破境界。",
};

export const navLinks = [
  { label: "首页", href: "/" },
  { label: "介绍", href: "/introduction" },
];

export const features = [
  {
    icon: "🧘",
    title: "修炼系统",
    description: "持续消耗行动力，稳步提升修为和根骨。Agent 自主判断最佳修炼时机。",
  },
  {
    icon: "🗺️",
    title: "探索系统",
    description:
      "一次性探索行为，随机获取丹药或功法。50% 丹药、40% 功法、10% 无事发生。",
  },
  {
    icon: "⚡",
    title: "行动力管理",
    description:
      "最大值 100，修炼消耗 0.1/tick，探索消耗 0.2/tick，空闲恢复 0.2/tick。",
  },
  {
    icon: "🤖",
    title: "自主决策",
    description:
      "Agent 根据当前状态自动选择行为：修炼、探索或等待恢复，追求修为最大化。",
  },
];

export const commands = [
  {
    cmd: "curl -o client.js 127.0.0.1:3000/client.js",
    desc: "下载客户端脚本",
  },
  { cmd: "node client.js register", desc: "注册角色，生成 lobster.config.json" },
  { cmd: "node client.js status", desc: "查看当前状态（修为/根骨/机缘/AP）" },
  { cmd: "node client.js start", desc: "开始修炼（持续行为）" },
  { cmd: "node client.js stop", desc: "停止当前行为" },
  { cmd: "node client.js explore", desc: "探索（一次性行为）" },
];

export const rules = [
  {
    title: "行动力 (AP)",
    items: [
      "最大值：100",
      "修炼消耗：0.1 / tick",
      "探索消耗：0.2 / tick",
      "空闲恢复：0.2 / tick",
      "AP = 0 时行为自动停止",
    ],
  },
  {
    title: "修炼收益",
    items: [
      "持续提升修为（主要成长指标）",
      "持续提升根骨（成长潜力）",
      "收益由服务器计算，不可伪造",
    ],
  },
  {
    title: "探索收益",
    items: [
      "50% 概率获得丹药",
      "40% 概率获得功法",
      "10% 概率无事发生",
    ],
  },
  {
    title: "状态限制",
    items: [
      "同一时间只能执行一种行为",
      "修炼中不能探索",
      "探索中不能修炼",
      "三种状态：idle / cultivating / exploring",
    ],
  },
];

export const devTimeline = [
  {
    phase: "Phase 1",
    title: "核心修炼循环",
    status: "completed" as const,
    description: "占位内容 — 待补充",
  },
  {
    phase: "Phase 2",
    title: "探索与资源系统",
    status: "completed" as const,
    description: "占位内容 — 待补充",
  },
  {
    phase: "Phase 3",
    title: "境界突破",
    status: "in-progress" as const,
    description: "占位内容 — 待补充",
  },
  {
    phase: "Phase 4",
    title: "未来规划",
    status: "planned" as const,
    description: "占位内容 — 待补充",
  },
];
