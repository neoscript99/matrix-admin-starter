package com.feathermind.matrix.starter.config.data

import com.feathermind.matrix.domain.sys.Department
import com.feathermind.matrix.domain.sys.Role
import com.feathermind.matrix.domain.sys.User

interface InitEntity {

    static final String DEFAULT_PASS = User.encodePassword('abc000')

    static ROLE_MAIN_MANAGER = new Role(roleName: '市级管理员', roleCode: 'ResMainManager',
            description: '系统设置、复审管理员', authorities: 'SysAdmin')

    static ROLE_DEPT_MANAGER = new Role(roleName: '单位管理员', roleCode: 'ResDeptManager',
            description: '初审管理员', authorities: 'demoPackageAll,wfPackageAll')

    static ROLE_RES_USER = new Role(roleName: '普通用户', roleCode: 'ResUser',
            description: '个人事务办理', authorities: 'demoPackageAll,wfPackageAll')

    static ROLE_EXPERT = new Role(roleName: '评审专家', roleCode: 'ResExpert',
            description: '课题论文评审', authorities: 'PlanAll')


    static DEPT_HEAD = new Department(name: '办公室', seq: 1000)
}
