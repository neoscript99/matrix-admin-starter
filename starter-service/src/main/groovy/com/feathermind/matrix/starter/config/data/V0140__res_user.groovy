package com.feathermind.matrix.starter.config.data

import com.feathermind.matrix.domain.sys.Role
import com.feathermind.matrix.domain.sys.User
import com.feathermind.matrix.domain.sys.UserRole
import com.feathermind.matrix.initializer.MatrixFlywayMigration
import groovy.transform.CompileStatic
import groovy.transform.TypeCheckingMode
import org.springframework.stereotype.Component

@CompileStatic(TypeCheckingMode.SKIP)
@Component
class V0140__res_user extends MatrixFlywayMigration {

    @Override
    void run() {
        initUser()
    }

    static User resManagerUser = new User(name: '市级管理员', account: 'sys-admin', cellPhone: '13388121117', dept: InitEntity.DEPT_HEAD, password: InitEntity.DEFAULT_PASS)

    def initUser() {
        InitEntity.DEPT_HEAD.merge()
        resManagerUser.save()
        new UserRole(resManagerUser, Role.ADMINISTRATORS).save()
        new UserRole(resManagerUser, InitEntity.ROLE_MAIN_MANAGER).save()
        new UserRole(resManagerUser, InitEntity.ROLE_RES_USER).save()
    }
}
