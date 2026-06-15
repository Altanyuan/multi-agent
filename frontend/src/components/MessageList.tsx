import type { Message } from '../types';
import MessageBubble from './MessageBubble';
import UserBubble from './UserBubble';
import ProcessingIndicator from './ProcessingIndicator';

interface MessageListProps {
  messages: Message[];
  isProcessing: boolean;
  stageText: string;
}

export default function MessageList({ messages, isProcessing, stageText }: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 scrollbar-thin">
      {messages.map((msg) =>
        msg.role === 'user' ? (
          <UserBubble key={msg.id} content={msg.content} timestamp={msg.timestamp} />
        ) : (
          <MessageBubble
            key={msg.id}
            content={msg.content}
            timestamp={msg.timestamp}
            actions={msg.actions}
            humanHandoff={msg.humanHandoff}
          />
        )
      )}

      {isProcessing && <ProcessingIndicator stageText={stageText} />}
    </div>
  );
}
