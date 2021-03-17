package com.feathermind.matrix.starter.config.data.dev

import com.feathermind.matrix.domain.sys.User
import com.feathermind.matrix.domain.sys.UserRole
import com.feathermind.matrix.initializer.MatrixFlywayMigration
import groovy.transform.CompileStatic
import groovy.transform.TypeCheckingMode
import org.springframework.context.annotation.Profile
import org.springframework.stereotype.Component

import static com.feathermind.matrix.starter.config.data.InitEntity.*

/**
 * 在开发环境初始化，用于开发阶段的测试
 */
@CompileStatic(TypeCheckingMode.SKIP)
@Component
@Profile('dev')
class V0150__res_dev_user extends MatrixFlywayMigration {

    @Override
    void run() {
        initDevUser()
    }


    static User demoDeptManager = new User(name: '单位管理员(测试)', account: 'dept-admin', cellPhone: '13388888888', dept: DEPT_HEAD, password: DEFAULT_PASS)
    static User demoUser = new User(name: '普通用户(测试)', account: 'res-user',  cellPhone: '17788888888', dept: DEPT_HEAD, password: DEFAULT_PASS)
    static User expertUser = new User(name: '专家(测试)', account: 'expert', dept: DEPT_HEAD, password: DEFAULT_PASS)

    def initDevUser() {
        demoDeptManager.save()
        new UserRole(demoDeptManager, ROLE_DEPT_MANAGER).save()
        demoUser.save()
        new UserRole(demoUser, ROLE_RES_USER).save()
        expertUser.save()
        new UserRole(expertUser, ROLE_EXPERT).save()
    }
}
