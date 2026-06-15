interface WelcomeScreenProps {
  onSuggestionClick: (text: string) => void;
}

const SUGGESTIONS = [
  { text: '我的手机充不进电，怎么办？', icon: '🔌' },
  { text: '你们的 App 总是闪退', icon: '🐛' },
  { text: '最新款手机有什么优惠活动？', icon: '🎁' },
  { text: '帮我查询订单状态', icon: '📦' },
];

export default function WelcomeScreen({ onSuggestionClick }: WelcomeScreenProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
      {/* 图标 */}
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center shadow-lg mb-6">
        <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 10.75 0 .375.375 0 00-.75 0zm0 0H8.25m4.125 0a.375.375 0 10.75 0 .375.375 0 00-.75 0zm0 0H12zm4.125 0a.375.375 0 10.75 0 .375.375 0 00-.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
        </svg>
      </div>

      {/* 标题 */}
      <h2 className="text-2xl font-bold text-gray-800 mb-2">AI 智能客服</h2>
      <p className="text-gray-500 text-sm mb-8 max-w-sm">
        多智能体协作，为您提供专业技术支持、产品咨询和销售服务
      </p>

      {/* 推荐问题 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
        {SUGGESTIONS.map((s) => (
          <button
            key={s.text}
            onClick={() => onSuggestionClick(s.text)}
            className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 text-left text-sm text-gray-700 hover:border-indigo-300 hover:bg-indigo-50 hover:shadow-md transition-all duration-200 group"
          >
            <span className="text-xl group-hover:scale-110 transition-transform">{s.icon}</span>
            <span>{s.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
