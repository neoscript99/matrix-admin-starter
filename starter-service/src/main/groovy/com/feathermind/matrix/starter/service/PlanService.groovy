package com.feathermind.matrix.starter.service

import com.feathermind.matrix.service.AbstractService
import com.feathermind.matrix.starter.domain.demo.Plan
import org.springframework.stereotype.Service

import java.time.LocalDate

/**
 * AbstractService已实现增删改查
 */
@Service
class PlanService extends AbstractService<Plan> {
    /**
     * 针对特殊业务场景的逻辑开发
     * @return
     */
    List listStarted() {
        def today = LocalDate.now().toString()
        def list = list([le: [['planBeginDay', today]], ge: [['planEndDay', today]], order: ['planBeginDay']])
        return list
    }
}
