import React from 'react';
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
  UserProfile,
} from 'matrix-ui-com';
import { PlanList } from './plan/PlanList';
import { yard } from '../services';
const { adminServices } = yard;
const allOp: OperatorSwitch = { create: true, update: true, delete: true, view: true };
export const PageSwitch = () => {
  return (
    <Switch>
      <Route path={`/Role`} render={() => <RoleList services={adminServices} name="角色" />} />
      <Route path={`/UserRole`} render={() => <UserRoleList services={adminServices} name="用户角色" />} />
      <Route path={`/User`} render={() => <UserList services={adminServices} operatorVisible={allOp} name="用户" />} />
      <Route path={`/Dept`}>{() => <DeptList services={adminServices} operatorVisible={allOp} name="机构" />}</Route>
      <Route path={`/Note`} render={() => <NoteList services={adminServices} name="通知" />} />
      <Route path={`/Param`} render={() => <ParamList services={adminServices} name="参数" />} />
      <Route path={`/Profile`} render={() => <UserProfile services={adminServices} />} />
      <Route path={`/InitialPlan`} component={PlanList} />
      <Route path={`/InitialApply`} component={PlanList} />
      <Route render={() => <Welcome />} />
    </Switch>
  );
};
