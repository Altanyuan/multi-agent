package com.aitanyuan.multi.agent.model;

import java.time.LocalDateTime;

/**
 * 订单状态信息
 */
public record OrderStatus(
        String orderId,
        String status,
        String carrier,
        String trackingNumber,
        LocalDateTime updateTime
) {}
