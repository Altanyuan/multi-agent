import { useState, useCallback, useRef, useEffect } from 'react';
import type { Message } from '../types';
import { sendMessage } from '../api/client';

const STAGES = [
  '正在分析问题...',
  '正在联系各团队...',
  '正在整合回复...',
];

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const stageTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing]);

  // 阶段提示文字循环
  useEffect(() => {
    if (isProcessing) {
      stageTimerRef.current = setInterval(() => {
        setStageIndex((prev) => (prev + 1) % STAGES.length);
      }, 1500);
    } else {
      if (stageTimerRef.current) {
        clearInterval(stageTimerRef.current);
        stageTimerRef.current = null;
      }
      setStageIndex(0);
    }
    return () => {
      if (stageTimerRef.current) {
        clearInterval(stageTimerRef.current);
      }
    };
  }, [isProcessing]);

  const getStageText = useCallback(() => {
    return isProcessing ? STAGES[stageIndex % STAGES.length] : '';
  }, [isProcessing, stageIndex]);

  const sendMessageAction = useCallback(async (text: string) => {
    if (!text.trim() || isProcessing) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsProcessing(true);

    try {
      const response = await sendMessage(text);
      const agentMessage: Message = {
        id: `msg-${Date.now()}-agent`,
        role: 'agent',
        content: response.reply,
        actions: response.actions?.length ? response.actions : undefined,
        humanHandoff: response.humanHandoff,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, agentMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: `msg-${Date.now()}-error`,
        role: 'agent',
        content: '非常抱歉，系统暂时遇到了一些问题。请稍后重试或联系人工客服。',
        humanHandoff: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  }, [isProcessing]);

  const clearChat = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isProcessing,
    stageText: getStageText(),
    sendMessage: sendMessageAction,
    clearChat,
    messagesEndRef,
  };
}
