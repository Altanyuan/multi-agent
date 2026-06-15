interface ProcessingIndicatorProps {
  stageText: string;
}

export default function ProcessingIndicator({ stageText }: ProcessingIndicatorProps) {
  return (
    <div className="flex flex-col gap-2 animate-fade-in">
      <div className="flex items-start gap-2.5 max-w-[85%]">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-md">
          AI
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-md px-5 py-4 shadow-sm">
          {/* 三个弹跳点 */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-bounce-dot" style={{ animationDelay: '0ms' }} />
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-bounce-dot" style={{ animationDelay: '150ms' }} />
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-bounce-dot" style={{ animationDelay: '300ms' }} />
          </div>
          {/* 阶段提示文字 */}
          <p className="text-xs text-gray-400 mt-2 ml-0.5">{stageText}</p>
        </div>
      </div>
    </div>
  );
}
