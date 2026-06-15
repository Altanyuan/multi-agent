import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import InputBar from './InputBar';
import WelcomeScreen from './WelcomeScreen';
import { useChat } from '../hooks/useChat';

export default function ChatInterface() {
  const { messages, isProcessing, stageText, sendMessage, clearChat, messagesEndRef } = useChat();

  const handleSuggestionClick = (text: string) => {
    sendMessage(text);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* 顶部导航栏 */}
      <ChatHeader onClear={clearChat} messageCount={messages.length} />

      {/* 消息区域 */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {messages.length === 0 ? (
          <WelcomeScreen onSuggestionClick={handleSuggestionClick} />
        ) : (
          <MessageList
            messages={messages}
            isProcessing={isProcessing}
            stageText={stageText}
          />
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 输入区域 */}
      <InputBar onSend={sendMessage} disabled={isProcessing} />
    </div>
  );
}
