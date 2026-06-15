interface AgentBadgeProps {
  className?: string;
}

const AGENT_LABELS: Record<string, { label: string; color: string }> = {
  TECH_SUPPORT: { label: '技术支持', color: 'bg-red-50 text-red-600 border-red-200' },
  PRODUCT: { label: '产品', color: 'bg-blue-50 text-blue-600 border-blue-200' },
  SALES: { label: '销售', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
};

export default function AgentBadge({ className = '' }: AgentBadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border ${className || 'bg-indigo-50 text-indigo-600 border-indigo-200'}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
      多智能体团队
    </span>
  );
}
