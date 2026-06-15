package com.aitanyuan.multi.agent.service;

import com.aitanyuan.multi.agent.agents.OrchestratorAgent;
import com.aitanyuan.multi.agent.agents.SummaryAgent;
import com.aitanyuan.multi.agent.model.CustomerResponse;
import com.aitanyuan.multi.agent.model.WorkerResult;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

/**
 * 客服业务服务层
 *
 * 完整处理流程：
 *   用户请求 → 生成会话ID → Orchestrator拆解+并行分发 → Worker Agent执行 → Summary整合输出
 */
@Service
public class CustomerService {

    private final OrchestratorAgent orchestrator;
    private final SummaryAgent summaryAgent;

    public CustomerService(OrchestratorAgent orchestrator, SummaryAgent summaryAgent) {
        this.orchestrator = orchestrator;
        this.summaryAgent = summaryAgent;
    }

    /**
     * 处理用户客服请求
     *
     * @param userMessage 用户消息
     * @return 整合后的客服响应
     */
    public CustomerResponse handleRequest(String userMessage) throws Exception {
        // 每次请求生成唯一会话ID，Worker Agent 以此ID为基础隔离各自记忆
        String conversationId = UUID.randomUUID().toString();

        // Step 1: Orchestrator 拆解任务并并行分发给 Worker Agent
        List<WorkerResult> workerResults = orchestrator.process(userMessage, conversationId);

        // Step 2: Summary Agent 整合所有 Worker 输出，生成最终回复
        return summaryAgent.summarize(userMessage, workerResults);
    }
}
