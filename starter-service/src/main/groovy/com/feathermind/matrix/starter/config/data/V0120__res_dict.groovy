package com.feathermind.matrix.starter.config.data

import com.feathermind.matrix.domain.sys.Dict
import com.feathermind.matrix.domain.sys.DictType
import com.feathermind.matrix.initializer.MatrixFlywayMigration
import org.springframework.stereotype.Component

@Component
class V0120__res_dict extends MatrixFlywayMigration {

    @Override
    void run() {
        resContentDict()
        subjectDict()
        planStatusDict()
        avgAlgorithmDict()
    }


    /**
     * 研究内容
     */
    void resContentDict() {
        def dictType = new DictType(id: 'res-content', name: '研究内容').save()

        new Dict(code: 'school-manage', name: '学校管理', seq: 10, type: dictType).save();
        new Dict(code: 'edu-mode', name: '育人模式', seq: 20, type: dictType).save();
        new Dict(code: 'school-culture', name: '校园文化', seq: 30, type: dictType).save();
        new Dict(code: 'general-practice', name: '综合实践', seq: 40, type: dictType).save();
        new Dict(code: 'teacher-edu', name: '教师教育', seq: 50, type: dictType).save();
        new Dict(code: 'teaching-manage', name: '教学管理', seq: 60, type: dictType).save();
        new Dict(code: 'moral-edu', name: '德育', seq: 70, type: dictType).save();
        new Dict(code: 'course-material-method', name: '课程教材教法', seq: 80, type: dictType).save();
        new Dict(code: 'sport-edu', name: '体育', seq: 90, type: dictType).save();
        new Dict(code: 'aesthetic-edu', name: '美育', seq: 100, type: dictType).save();
        new Dict(code: 'mental-health', name: '心理健康教育', seq: 110, type: dictType).save();
        new Dict(code: 'labour-edu', name: '劳动教育', seq: 120, type: dictType).save();
        new Dict(code: 'it', name: '信息技术', seq: 130, type: dictType).save();
        new Dict(code: 'other', name: '其他', seq: 140, type: dictType).save();
    }

    void subjectDict() {
        def dictType = new DictType(id: 'subject', name: '学科').save()
        new Dict(code: 'chinese', name: '语文', seq: 10, type: dictType).save();
        new Dict(code: 'mathematics', name: '数学', seq: 20, type: dictType).save();
        new Dict(code: 'foreign-language', name: '外语', seq: 30, type: dictType).save();
        new Dict(code: 'science', name: '科学（物理、化学、生物、信息技术）', seq: 40, type: dictType).save();
        new Dict(code: 'society', name: '社会（政治、历史、地理）', seq: 50, type: dictType).save();
        new Dict(code: 'sport', name: '体育', seq: 60, type: dictType).save();
        new Dict(code: 'art', name: '艺术（音乐、美术）', seq: 70, type: dictType).save();
        new Dict(code: 'mental-health', name: '心理健康教育', seq: 80, type: dictType).save();
        new Dict(code: 'general-practice', name: '综合实践活动（含劳动）', seq: 90, type: dictType).save();
        new Dict(code: 'other', name: '其他', seq: 100, type: dictType).save();
    }

    void planStatusDict() {
        def dictType = new DictType(id: 'plan-status', name: '计划状态').save()

        new Dict(code: 'before', name: '未开始', seq: 10, type: dictType).save();
        new Dict(code: 'going', name: '材料上报', seq: 20, type: dictType).save();
        new Dict(code: 'done', name: '评分统计', seq: 30, type: dictType).save();
    }

    void avgAlgorithmDict() {
        def dictType = new DictType(id: 'avg-algorithm', name: '平均分算法').save()

        new Dict(code: 'normal', name: '全部分数平均', seq: 10, type: dictType).save();
        new Dict(code: 'ignore-max-min', name: '去除最高最低', seq: 20, type: dictType).save();
    }

}
