package com.aitanyuan.multi.agent.model;

import java.util.List;

/**
 * 最终返回给用户的响应
 *
 * @param reply         整合后的客服回复内容
 * @param actions       建议用户执行的操作列表
 * @param humanHandoff  是否需要转人工处理
 */
public record CustomerResponse(
        String reply,
        List<String> actions,
        boolean humanHandoff
) {}
