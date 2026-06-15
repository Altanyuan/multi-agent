// API 响应类型 — 与后端 CustomerResponse 严格对应
export interface ChatResponse {
  reply: string;
  actions: string[];
  humanHandoff: boolean;
}

export interface ChatRequest {
  message: string;
}

// 聊天消息类型
export interface Message {
  id: string;
  role: 'user' | 'agent';
  content: string;
  actions?: string[];
  humanHandoff?: boolean;
  timestamp: Date;
}
