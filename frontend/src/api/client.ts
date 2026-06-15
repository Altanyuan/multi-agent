import type { ChatRequest, ChatResponse } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export async function sendMessage(message: string): Promise<ChatResponse> {
  const res = await fetch(`${API_BASE}/api/customer-service/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message } as ChatRequest),
  });
  if (!res.ok) throw new Error('发送消息失败，请稍后重试');
  return res.json() as Promise<ChatResponse>;
}

export async function checkHealth(): Promise<string> {
  const res = await fetch(`${API_BASE}/api/customer-service/health`);
  return res.text();
}
