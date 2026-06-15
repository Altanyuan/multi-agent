import AgentBadge from './AgentBadge';
import ActionList from './ActionList';
import HandoffBanner from './HandoffBanner';

interface MessageBubbleProps {
  content: string;
  timestamp: Date;
  actions?: string[];
  humanHandoff?: boolean;
}

const TIME_FORMATTER = new Intl.DateTimeFormat('zh-CN', {
  hour: '2-digit',
  minute: '2-digit',
});

export default function MessageBubble({ content, timestamp, actions, humanHandoff }: MessageBubbleProps) {
  return (
    <div className="flex flex-col gap-2 animate-slide-up">
      {/* 消息气泡 */}
      <div className="flex items-start gap-2.5 max-w-[85%]">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-md">
          AI
        </div>
        <div className="flex-1 min-w-0">
          <div className="mb-1">
            <AgentBadge />
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
            <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap break-words">
              {content}
            </p>
          </div>
          <span className="text-xs text-gray-400 mt-1 ml-1">
            {TIME_FORMATTER.format(timestamp)}
          </span>
        </div>
      </div>

      {/* 操作建议 */}
      {actions && actions.length > 0 && (
        <ActionList actions={actions} />
      )}

      {/* 转人工横幅 */}
      {humanHandoff && (
        <HandoffBanner />
      )}
    </div>
  );
}
