package com.feathermind.matrix.starter.domain.demo

import com.feathermind.matrix.initializer.InitializeDomain
import com.feathermind.matrix.util.DateUtil
import grails.gorm.annotation.Entity
import groovy.transform.ToString

@Entity
@ToString(includePackage = false, includeNames = true, includes = 'planName')
@InitializeDomain(profiles = 'dev', depends = PlanType)
class Plan {

    String id
    String planName
    Integer planYear
    PlanType type
    String planBeginDay
    String planEndDay
    Integer maxNumber
    static mapping = {
        type fetch: 'join', lazy: false
    }
    static constraints = {
        maxNumber nullable: true
    }
    static DemoPlan = new Plan([planName    : '2020规划课题申报计划',
                                planYear    : 2020,
                                type        : PlanType.INITIAL_TYPE,
                                planBeginDay: DateUtil.dayStr(-10),
                                planEndDay  : DateUtil.dayStr(100)])
    static DemoPlan2 = new Plan([planName    : '2020重点课题申报计划',
                                 planYear    : 2020,
                                 type        : PlanType.INITIAL_TYPE,
                                 planBeginDay: DateUtil.dayStr(-30),
                                 planEndDay  : DateUtil.dayStr(300)])
    static DemoPlan3 = new Plan([planName    : '2021结题计划',
                                 planYear    : 2021,
                                 type        : PlanType.FINISH_TYPE,
                                 planBeginDay: DateUtil.dayStr(20),
                                 planEndDay  : DateUtil.dayStr(200),
                                 maxNumber   : 100])
    static initList = [DemoPlan, DemoPlan2, DemoPlan3]
}
