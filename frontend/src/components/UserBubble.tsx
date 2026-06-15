interface UserBubbleProps {
  content: string;
  timestamp: Date;
}

const TIME_FORMATTER = new Intl.DateTimeFormat('zh-CN', {
  hour: '2-digit',
  minute: '2-digit',
});

export default function UserBubble({ content, timestamp }: UserBubbleProps) {
  return (
    <div className="flex flex-col items-end gap-2 animate-slide-up">
      <div className="flex items-end gap-2 max-w-[85%]">
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-2xl rounded-tr-md px-4 py-3 shadow-md">
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{content}</p>
        </div>
        <span className="text-xs text-gray-400 mb-1 mr-1">
          {TIME_FORMATTER.format(timestamp)}
        </span>
      </div>
    </div>
  );
}
