interface ChatHeaderProps {
  onClear: () => void;
  messageCount: number;
}

export default function ChatHeader({ onClear, messageCount }: ChatHeaderProps) {
  return (
    <header className="shrink-0 bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg">
      <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 10.75 0 .375.375 0 00-.75 0zm0 0H8.25m4.125 0a.375.375 0 10.75 0 .375.375 0 00-.75 0zm0 0H12zm4.125 0a.375.375 0 10.75 0 .375.375 0 00-.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">AI 智能客服</h1>
            <p className="text-xs text-indigo-200">
              {messageCount > 0 ? `${messageCount} 条消息 · 多智能体协作` : '多智能体协作 · 随时为您服务'}
            </p>
          </div>
        </div>

        {/* 清空按钮 */}
        <button
          onClick={onClear}
          className="flex items-center gap-1.5 text-xs bg-white/15 hover:bg-white/25 backdrop-blur-sm rounded-lg px-3 py-2 transition-all duration-200"
          title="清空对话"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          清空
        </button>
      </div>
    </header>
  );
}
