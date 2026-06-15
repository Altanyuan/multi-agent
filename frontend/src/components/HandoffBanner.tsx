export default function HandoffBanner() {
  return (
    <div className="ml-11 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded-xl px-4 py-3 shadow-sm animate-slide-up">
      <div className="flex items-center gap-2">
        <svg className="w-5 h-5 text-amber-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 0h.01M3.05 3.05a10 10 0 1014.14 14.14A10 10 0 003.05 3.05z" />
        </svg>
        <div>
          <p className="text-sm font-semibold text-amber-800">需要人工客服协助</p>
          <p className="text-xs text-amber-600 mt-0.5">已为您转接人工客服，请稍候...</p>
        </div>
      </div>
    </div>
  );
}
