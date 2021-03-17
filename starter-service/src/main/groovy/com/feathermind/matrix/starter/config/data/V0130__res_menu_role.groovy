package com.feathermind.matrix.starter.config.data

import com.feathermind.matrix.domain.sys.Menu
import com.feathermind.matrix.domain.sys.Role
import com.feathermind.matrix.domain.sys.RoleMenu
import com.feathermind.matrix.initializer.MatrixFlywayMigration
import groovy.transform.CompileStatic
import groovy.transform.TypeCheckingMode
import org.springframework.stereotype.Component
import static com.feathermind.matrix.starter.config.data.InitEntity.*

@CompileStatic(TypeCheckingMode.SKIP)
@Component
class V0130__res_menu_role extends MatrixFlywayMigration {

    @Override
    void run() {
        initRole()
        initMenu()
    }

    void initRole() {
        Role.list().each {
            it.enabled = false;
        }
        save(ROLE_MAIN_MANAGER)
        save(ROLE_DEPT_MANAGER)
        save(ROLE_RES_USER)
        save(ROLE_EXPERT)
    }

    static Menu rootMenu

    def initMenu() {
        rootMenu = Menu.findByParentIdIsNull()
        def allList = [];
        allList.addAll(initBaseMenu())
        allList.addAll(initTopicMenu())
        allList.addAll(initReviewMenu())
        allList.each {
            //new RoleMenu(role: Role.ADMINISTRATORS, menu: it).save()
            new RoleMenu(role: ROLE_MAIN_MANAGER, menu: it).save()
        }
        RoleMenu.findAllByRole(Role.PUBLIC).each {
            new RoleMenu(ROLE_RES_USER, it.menu).save()
            new RoleMenu(ROLE_DEPT_MANAGER, it.menu).save()
            new RoleMenu(ROLE_EXPERT, it.menu).save()
            new RoleMenu(ROLE_MAIN_MANAGER, it.menu).save()
        }
    }

    List initBaseMenu() {
        Menu parentMenu = save(new Menu(label: '基础信息', seq: 20, parentId: rootMenu.id, icon: 'global'))
        def subList = [
                new Menu(label: '个人设置', app: 'Profile', seq: 30, parentId: parentMenu.id, icon: 'user').save(),
                new Menu(label: '课题申报人注册', app: 'ResUserReg', seq: 40, parentId: parentMenu.id, icon: 'user').save(),
                new Menu(label: '评审专家注册', app: 'ExpertReg', seq: 50, parentId: parentMenu.id, icon: 'user').save()
        ]
        subList.each {
            new RoleMenu(ROLE_RES_USER, it).save()
            new RoleMenu(ROLE_EXPERT, it).save()
        }
        subList << new Menu(label: '用户管理', app: 'ResUser', seq: 10, parentId: parentMenu.id, icon: 'usergroup-delete').save()
        //单位管理员是否可以修改、新增用户，通过param参数配置
        subList.each { new RoleMenu(ROLE_DEPT_MANAGER, it).save() }
        subList << new Menu(label: '单位管理', app: 'ResDept', seq: 20, parentId: parentMenu.id, icon: 'apartment').save()
        return subList
    }

    List initTopicMenu() {
        Menu parentMenu = save(new Menu(label: '课题管理', seq: 30, parentId: rootMenu.id, icon: 'project'))
        def subList = [
                new Menu(label: '课题查询', app: 'Topic', seq: 20, parentId: parentMenu.id, icon: 'book').save(),
                new Menu(label: '立项', app: 'InitialApply', seq: 30, parentId: parentMenu.id, icon: 'branches').save(),
                new Menu(label: '结题', app: 'FinishApply', seq: 40, parentId: parentMenu.id, icon: 'branches').save(),
        ]
        subList.each {
            new RoleMenu(ROLE_DEPT_MANAGER, it).save()
            new RoleMenu(ROLE_RES_USER, it).save()
        }
        subList.addAll([
                new Menu(label: '申报计划', app: 'InitialPlan', seq: 10, parentId: parentMenu.id, icon: 'schedule').save(),
        ])

        return subList
    }

    List initReviewMenu() {
        Menu parentMenu = save(new Menu(label: '评比管理', seq: 40, parentId: rootMenu.id, icon: 'radar-chart'))
        def expList = [
                new Menu(label: '专家评分', app: 'ExpertReview', seq: 5, parentId: parentMenu.id, icon: 'sort-ascending').save(),
        ]
        expList.each {
            new RoleMenu(ROLE_EXPERT, it).save()
        }
        def subList = [
                new Menu(label: '成果评比', app: 'TopicReview', seq: 20, parentId: parentMenu.id, icon: 'area-chart').save(),
                new Menu(label: '论文评比', app: 'PaperReview', seq: 30, parentId: parentMenu.id, icon: 'line-chart').save(),
        ]
        subList.each {
            new RoleMenu(ROLE_DEPT_MANAGER, it).save()
            new RoleMenu(ROLE_RES_USER, it).save()
        }
        subList.addAll([
                new Menu(label: '评比计划', app: 'ReviewPlan', seq: 10, parentId: parentMenu.id, icon: 'schedule').save(),
                //new Menu(label: '结果查询', app: 'ReviewResult', seq: 40, parentId: parentMenu.id, icon: 'table').save(),
        ])

        return subList
    }
}
