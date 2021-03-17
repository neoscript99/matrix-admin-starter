import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { PlanEntity } from '../../services/PlanService';
import { Button, Space, Tag } from 'antd';
import { planService } from '../../services';
import ProList from '@ant-design/pro-list';
import { useServiceStore } from 'matrix-ui-com';

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
const columns: ProColumns<PlanEntity>[] = [
  {
    title: '应用名称',
    dataIndex: 'name',
  },
  {
    title: '创建者',
    dataIndex: 'creator',
  },
  {
    title: '状态',
    dataIndex: 'status',
  },
];

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
export const PlanTable: React.FC = () => {
  return (
    <ProTable<PlanEntity>
      columns={columns}
      request={(params, sorter, filter) => {
        // 表单搜索项会从 params 传入，传递给后端接口。
        console.log(params, sorter, filter);
        return planService.listAll({}).then((res) => ({
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
        title: '高级表格',
        tooltip: '这是一个标题提示',
      }}
      toolBarRender={() => [
        <Button key="danger" danger>
          危险按钮
        </Button>,
        <Button key="show">查看日志</Button>,
        <Button type="primary" key="primary">
          创建应用
        </Button>,
      ]}
    />
  );
};
