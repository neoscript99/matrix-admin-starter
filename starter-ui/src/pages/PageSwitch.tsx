import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Welcome } from './Welcome';
import {
  RoleList,
  DeptList,
  NoteList,
  ParamList,
  UserList,
  OperatorSwitch,
  UserRoleList,
  PageSwitchProps,
  UserProfile,
} from 'matrix-ui-com';
import { PlanList } from './plan/PlanList';
import { yard } from '../services';
const { adminServices } = yard;
const allOp: OperatorSwitch = { create: true, update: true, delete: true, view: true };
export const PageSwitch = (props: PageSwitchProps) => {
  const { pathPrefix } = props;
  return (
    <Switch>
      <Route path={`${pathPrefix}Role/`} render={() => <RoleList services={adminServices} name="角色" />} />
      <Route path={`${pathPrefix}UserRole/`} render={() => <UserRoleList services={adminServices} name="用户角色" />} />
      <Route
        path={`${pathPrefix}User/`}
        render={() => <UserList services={adminServices} operatorVisible={allOp} name="用户" />}
      />
      <Route path={`${pathPrefix}Dept/`}>
        {() => <DeptList services={adminServices} operatorVisible={allOp} name="机构" />}
      </Route>
      <Route path={`${pathPrefix}Note/`} render={() => <NoteList services={adminServices} name="通知" />} />
      <Route path={`${pathPrefix}Param/`} render={() => <ParamList services={adminServices} name="参数" />} />
      <Route path={`${pathPrefix}Profile/`} render={() => <UserProfile services={adminServices} />} />
      <Route path={`${pathPrefix}InitialPlan/`} component={PlanList} />
      <Route path={`${pathPrefix}InitialApply/`} component={PlanList} />
      <Route render={() => <Welcome />} />
    </Switch>
  );
};
