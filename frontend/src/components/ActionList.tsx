interface ActionListProps {
  actions: string[];
}

export default function ActionList({ actions }: ActionListProps) {
  if (!actions || actions.length === 0) return null;

  return (
    <div className="ml-11 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 shadow-sm">
      <p className="text-xs font-semibold text-amber-700 mb-2 flex items-center gap-1.5">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        建议操作
      </p>
      <ul className="space-y-1.5">
        {actions.map((action, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-amber-800">
            <svg className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>{action}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
