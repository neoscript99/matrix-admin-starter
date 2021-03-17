package com.feathermind.matrix.starter.domain.demo

import com.feathermind.matrix.initializer.InitializeDomain
import grails.gorm.annotation.Entity
import groovy.transform.ToString


@Entity
@ToString(includePackage = false, includeNames = true, includes = 'name')
@InitializeDomain(profiles = 'dev')
class PlanType {
    String code
    String name

    static mapping = {
        id name: 'code', generator: 'assigned'
    }
    static constraints = {
        name unique: true, maxSize: 256
    }
    static INITIAL_TYPE = new PlanType(code: 'Initial', name: '立项')
    static FINISH_TYPE = new PlanType(code: 'Finish', name: '结题')

    static initList = [INITIAL_TYPE, FINISH_TYPE]
}
