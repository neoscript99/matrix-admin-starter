package com.feathermind.matrix.starter.controller

import com.feathermind.matrix.controller.DomainController
import com.feathermind.matrix.service.AbstractService
import com.feathermind.matrix.starter.domain.demo.Plan
import com.feathermind.matrix.starter.service.PlanService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

/**
 * DomainController已实现增删改查基本方法
 */
@RestController
@RequestMapping("/api/plan")
class PlanController extends DomainController<Plan>{
    @Autowired
    PlanService planService

    /**
     * 只需要写一些有特殊业务逻辑的代码
     * 类已注解为RestController，不需要ResponseEntity和ResponseBody，默认自动返回json
     * @return
     */
    @PostMapping("/listStarted")
    List<Plan> listStarted() {
        readAuthorize()
        return planService.listStarted()
    }

    @Override
    AbstractService<Plan> getDomainService() {
        return planService
    }
}
