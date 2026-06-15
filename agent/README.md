# Spring AI Multi-Agent 智能客服系统

基于 **Spring AI 2.0.0-M4 + Spring Boot 4.0.0 + Java 22** 实现的 Multi-Agent 多智能体系统，配套 React + Vite 前端。

## 架构说明

采用 **Orchestrator-Workers** 模式：

```
用户请求
   ↓
[OrchestratorAgent] 分析并拆解为子任务
   ├─ 子任务1: 硬件问题 → [TechSupportAgent]
   └─ 子任务2: 软件问题 → [ProductAgent]
           ↘ 并行执行 ↙
   [SummaryAgent] 整合所有结果
   ↓
最终回复给用户
```

## 运行前提

- JDK 22+
- Maven 3.8+
- Node.js 18+（前端开发）
- 一个兼容 OpenAI 格式的 API Key（支持 OpenAI / DeepSeek / 通义千问 等）

## 快速启动

### 1. 设置 API Key

```bash
# Windows
set OPENAI_API_KEY=sk-your-key-here

# 使用 DeepSeek（推荐，国内访问更稳定）
set OPENAI_API_KEY=sk-your-deepseek-key
set OPENAI_BASE_URL=https://api.deepseek.com
set OPENAI_MODEL=deepseek-chat

# 使用通义千问
set OPENAI_API_KEY=sk-your-qwen-key
set OPENAI_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1
set OPENAI_MODEL=qwen-max
```

### 2. 编译并启动后端

```bash
cd E:\workbuddy\agent
mvnw spring-boot:run
```

### 3. 启动前端

```bash
cd E:\workbuddy\frontend
npm install
npm run dev
```

前端默认运行在 `http://localhost:5173`，后端运行在 `http://localhost:8080`。

### 4. 测试接口

```bash
# 单一问题（软件Bug）
curl -X POST http://localhost:8080/api/customer-service/chat \
  -H "Content-Type: application/json" \
  -d "{\"message\":\"你们的App总是闪退，怎么解决？\"}"

# 复合问题（同时触发多个 Agent）
curl -X POST http://localhost:8080/api/customer-service/chat \
  -H "Content-Type: application/json" \
  -d "{\"message\":\"我买的手机充不进电，而且你们的App总是闪退，你们这是什么质量？\"}"

# 销售咨询
curl -X POST http://localhost:8080/api/customer-service/chat \
  -H "Content-Type: application/json" \
  -d "{\"message\":\"最新款手机现在有什么优惠活动？\"}"

# 健康检查
curl http://localhost:8080/api/customer-service/health
```

## 响应示例

```json
{
  "reply": "您好！非常抱歉给您带来不便...",
  "actions": [
    "检查充电口是否有异物",
    "升级App到v3.2.1版本",
    "若问题持续，我们已为您创建工单 TKT-xxxxxxxx"
  ],
  "humanHandoff": true
}
```

## 项目结构

```
workbuddy/
├── agent/                         # 后端项目（Spring Boot）
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/mszlu/ai/agent/
│       │   ├── MultiAgentApplication.java     # 启动类
│       │   ├── agents/
│       │   │   ├── BaseAgent.java             # Agent 基础抽象类
│       │   │   ├── OrchestratorAgent.java     # 调度 Agent（核心）
│       │   │   ├── TechSupportAgent.java      # 技术支持 Worker
│       │   │   ├── ProductAgent.java          # 产品 Worker
│       │   │   ├── SalesAgent.java            # 销售 Worker
│       │   │   └── SummaryAgent.java          # 总结 Agent
│       │   ├── controller/
│       │   │   └── CustomerServiceController.java
│       │   ├── model/
│       │   │   ├── TaskPlan.java
│       │   │   ├── WorkerResult.java
│       │   │   ├── CustomerResponse.java
│       │   │   └── OrderStatus.java
│       │   ├── service/
│       │   │   └── CustomerService.java
│       │   └── tools/
│       │       └── CustomerServiceTools.java  # @Tool 工具集
│       └── resources/
│           └── application.yml
│
└── frontend/                      # 前端项目（React + Vite）
    ├── package.json
    ├── vite.config.ts
    ├── tailwind.config.ts
    └── src/
        ├── api/client.ts          # API 请求封装
        ├── types/index.ts         # TypeScript 类型定义
        ├── hooks/useChat.ts       # 聊天状态管理
        ├── components/
        │   ├── ChatInterface.tsx  # 主容器
        │   ├── ChatHeader.tsx     # 顶部导航栏
        │   ├── MessageList.tsx    # 消息列表
        │   ├── MessageBubble.tsx  # 客服消息气泡
        │   ├── UserBubble.tsx     # 用户消息气泡
        │   ├── InputBar.tsx       # 输入框
        │   ├── WelcomeScreen.tsx  # 欢迎屏
        │   ├── ProcessingIndicator.tsx  # 加载动画
        │   ├── AgentBadge.tsx     # 智能体标签
        │   ├── ActionList.tsx     # 操作建议
        │   └── HandoffBanner.tsx  # 转人工横幅
        ├── styles/globals.css     # 全局样式 + 自定义动画
        ├── App.tsx
        └── main.tsx
```

## 关键技术点

| 技术 | 说明 |
|------|------|
| `@Tool` 注解 | 将 Java 方法暴露给 AI 调用，零配置 |
| `MessageChatMemoryAdvisor` | 自动管理多轮对话记忆 |
| `Executors.newFixedThreadPool(10)` | Java 线程池并行分发 Worker Agent |
| `conversationId` 隔离 | 每个 Worker Agent 使用独立后缀，避免记忆串扰 |
| 降级处理 | SummaryAgent 失败时自动降级拼接，保证可用性 |

## 前端功能

- **实时聊天**：发送消息、接收 AI 回复、自动滚动
- **多阶段加载动画**：弹跳点 + "分析问题 → 联系团队 → 整合回复" 循环提示
- **欢迎屏**：4 个快捷问题卡片引导用户
- **操作建议**：将 `actions` 数组渲染为 checklist
- **转人工提示**：`humanHandoff: true` 时显示 amber 警示横幅
- **响应式设计**：桌面端居中 + 移动端适配
