import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { PlanEntity } from '../../services/PlanService';
import { Button, Space, Tag } from 'antd';
import ProList from '@ant-design/pro-list';
import { useServiceStore } from 'matrix-ui-com';
import { Criteria } from 'matrix-ui-service';
import { yard } from '../../services';
import { libFoo } from 'starter-ui-lib';
const { planService } = yard;
export const PlanList: React.FC = () => {
  return (
    <PageContainer
      header={{ title: '计划列表', ghost: true, subTitle: '请根据起始日期及时处理' }}
      content={<PlanTable />}
    >
      <PlanStartedList />
    </PageContainer>
  );
};

export const PlanStartedList: React.FC = () => {
  const planStore = useServiceStore(planService);
  return (
    <ProList<PlanEntity>
      dataSource={planStore.startedList}
      grid={{ gutter: 16, column: 2 }}
      metas={{
        title: {
          dataIndex: 'planName',
        },
        avatar: {
          dataIndex: ['type', 'name'],
        },
        description: {
          dataIndex: 'planYear',
        },
        subTitle: {
          render: (dom, item) => {
            return (
              <Space size={0}>
                <Tag color="blue">{item.planBeginDay}</Tag>
                <Tag color="#5BD8A6">{item.planEndDay}</Tag>
              </Space>
            );
          },
        },
      }}
    />
  );
};

const columns: ProColumns<PlanEntity>[] = [
  {
    title: '计划名称',
    dataIndex: 'planName',
  },
  {
    title: '年度',
    dataIndex: 'planYear',
  },
  {
    title: '类型',
    dataIndex: ['type', 'name'],
  },
  {
    title: '开始日期',
    dataIndex: 'planBeginDay',
  },
  {
    title: '截止日期',
    dataIndex: 'planEndDay',
  },
];
export const PlanTable: React.FC = () => {
  return (
    <ProTable<PlanEntity>
      columns={columns}
      request={(params, sorter, filter) => {
        // 表单搜索项会从 params 传入，传递给后端接口。
        console.log(params, sorter, filter);
        const criteria: Criteria = { eq: [], like: [] };
        if (params.planName) criteria.like.push(['planName', `${params.planName}%`]);
        return planService.listAll({ criteria }).then((res) => ({
          data: res.results,
          success: true,
        }));
      }}
      rowKey="id"
      pagination={{
        showQuickJumper: true,
      }}
      search={{
        layout: 'vertical',
        defaultCollapsed: false,
      }}
      dateFormatter="string"
      toolbar={{
        title: '计划列表',
        tooltip: '底部为当前运行中的计划',
      }}
      toolBarRender={() => [
        <Button key="danger" danger>
          删除
        </Button>,
        <Button key="show">查看详情</Button>,
        <Button type="primary" key="primary" onClick={() => libFoo()}>
          创建计划
        </Button>,
      ]}
    />
  );
};
