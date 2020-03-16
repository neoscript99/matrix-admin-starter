import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { adminServices } from '../services';
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
} from 'oo-rest-mobx';

const allOp: OperatorSwitch = { create: true, update: true, delete: true, view: true };
export class PageSwitch extends Component<PageSwitchProps> {
  render() {
    const { pathPrefix } = this.props;
    return (
      <Switch>
        <Route path={`${pathPrefix}Role/`} render={() => <RoleList services={adminServices} name="角色" />} />
        <Route
          path={`${pathPrefix}UserRole/`}
          render={() => <UserRoleList services={adminServices} name="用户角色" />}
        />
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
        <Route render={() => <Welcome />} />
      </Switch>
    );
  }
}

export default PageSwitch;
