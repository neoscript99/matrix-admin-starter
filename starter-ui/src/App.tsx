import React, { Component } from 'react';
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Login, LoginFormProps, Home } from 'oo-rest-mobx';
import { adminServices, paramService } from './services';
import { config } from './utils';
import { PageSwitch } from './pages';
import logo from './asset/logo.png';
import mainBG from './asset/main_bg.jpg';
import { observer } from 'mobx-react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
const introRender = (
  <div>
    <p>
      立项管理： <em>立项流程、结题流程管理</em>
    </p>
    <p>
      成果评比： <em>邀请专家对项目成果进行评分、排名</em>
    </p>
    <p>
      论文评比： <em>邀请专家对论文进行评分、排名</em>
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

@observer
class App extends Component {
  render() {
    const profiles = paramService.getByCode('EnvironmentProfiles')?.value;
    console.debug('EnvironmentProfiles: ', profiles);
    const users = profiles === 'dev' && config.demoUsers ? config.demoUsers : undefined;
    return (
      <ConfigProvider locale={zhCN}>
        <HashRouter>
          <Switch>
            <Route path={loginPath} render={props => <Login {...props} {...loginProps} demoUsers={users} />} />
            <Route render={props => <Home {...props} {...homeProps} />} />
          </Switch>
        </HashRouter>
      </ConfigProvider>
    );
  }
}

export default App;
