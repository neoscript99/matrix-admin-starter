package com.feathermind.matrix.starter.config.data


import com.feathermind.matrix.domain.sys.Param
import com.feathermind.matrix.domain.sys.ParamType
import com.feathermind.matrix.domain.sys.User
import com.feathermind.matrix.initializer.MatrixFlywayMigration
import org.springframework.stereotype.Component

@Component
class V0110__res_param extends MatrixFlywayMigration {

    @Override
    void run() {
        new Param(code: 'ChangeInitPassword', name: '强制修改初始密码',
                value: 'false', type: ParamType.SYSTEM, validExp: '^(true|false)$',
                validDescribe: 'true或者false', lastUser: User.ADMIN).save()

        new Param(code: 'DeptManagerUserOperate', name: '单位管理员的本单位用户信息修改权限',
                value: '10', type: ParamType.SYSTEM, validExp: '^(10|20|30)$',
                validDescribe: '10|20|30（读|修改|新增）', lastUser: User.ADMIN).save()
    }
}
