import React, { useMemo } from 'react';
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Login, LoginFormProps, Home, useServiceStore } from 'matrix-ui-com';
import { adminServices, paramService } from './services';
import { config } from './utils';
import { PageSwitch } from './pages';
import logo from './asset/logo.png';
import mainBG from './asset/main_bg.jpg';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
const introRender = (
  <div>
    <p>
      React： <em>Component</em>
    </p>
    <p>
      Typescript： <em>Language</em>
    </p>
    <p>
      Mobx： <em>State Manage</em>
    </p>
  </div>
);
const loginPath = '/login/';
const headerPics = [require('./asset/header_bg1.png'), require('./asset/header_bg2.png')];
const headerBG = headerPics[Math.round(Math.random())];
const loginProps: LoginFormProps = {
  adminServices,
  title: 'Matrix Admin Starter',
  introRender,
  //https://unsplash.com/photos/asviIGR3CPE
  backgroundImage: `url(${mainBG})`,
};
const homeProps = {
  adminServices,
  serverLogout: config.serverLogout,
  serverRoot: config.serverRoot,
  logoRender: <img src={logo} />,
  headerCss: { background: `url(${headerBG}) no-repeat center center`, backgroundColor: 'white' },
  PageSwitch,
  loginPath,
  footRender: (
    <div>
      <span>Matrix Admin ©2020</span>
      <span>
        &nbsp;(
        <a target="_blank" href="http://site.feathermind.cn/">
          宁波羽意软件
        </a>
        &nbsp;技术支持)
      </span>
    </div>
  ),
};

export default function App() {
  const paramStore = useServiceStore(paramService);
  //依赖paramStore
  const profiles = useMemo(() => paramService.getByCode('EnvironmentProfiles')?.value, [paramStore]);
  console.debug('EnvironmentProfiles: ', profiles);
  const isDev = useMemo(() => profiles && profiles.split(',').includes('dev'), [profiles]);
  const users = useMemo(() => (isDev && config.demoUsers ? config.demoUsers : undefined), [isDev]);
  return (
    <ConfigProvider locale={zhCN}>
      <HashRouter>
        <Switch>
          <Route path={loginPath} render={() => <Login {...loginProps} demoUsers={users} isDev={isDev} />} />
          <Route render={() => <Home {...homeProps} />} />
        </Switch>
      </HashRouter>
    </ConfigProvider>
  );
}
