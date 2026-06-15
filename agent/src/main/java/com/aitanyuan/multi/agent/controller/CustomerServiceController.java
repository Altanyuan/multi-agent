package com.aitanyuan.multi.agent.controller;

import com.aitanyuan.multi.agent.model.CustomerResponse;
import com.aitanyuan.multi.agent.service.CustomerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * 客服 REST API 接口
 *
 * 主接口：
 *   POST /api/customer-service/chat
 *   Body: {"message": "用户消息"}
 *
 * 健康检查：
 *   GET /api/customer-service/health
 */
@RestController
@RequestMapping("/api/customer-service")
@CrossOrigin(origins = "*")
public class CustomerServiceController {

    private final CustomerService customerService;

    public CustomerServiceController(CustomerService customerService) {
        this.customerService = customerService;
    }

    /**
     * 客服对话接口
     *
     * 示例请求：
     * curl -X POST http://localhost:8080/api/customer-service/chat \
     *   -H "Content-Type: application/json" \
     *   -d '{"message":"我买的手机充不进电，而且你们的App总是闪退，你们这是什么质量？"}'
     */
    @PostMapping("/chat")
    public ResponseEntity<CustomerResponse> chat(@RequestBody ChatRequest request) {
        try {
            CustomerResponse response = customerService.handleRequest(request.message());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            // 出错时返回兜底响应
            CustomerResponse fallback = new CustomerResponse(
                    "非常抱歉，系统暂时遇到了一些问题，请稍后重试或联系人工客服。",
                    java.util.List.of("拨打客服热线: 400-xxx-xxxx"),
                    true
            );
            return ResponseEntity.ok(fallback);
        }
    }

    /**
     * 健康检查接口
     */
    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Multi-Agent Service is running!");
    }

    /**
     * 请求体定义
     */
    public record ChatRequest(String message) {}
}
