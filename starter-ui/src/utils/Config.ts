export class Config {
  env = process.env.NODE_ENV;
  isDev() {
    return this.env === 'development';
  }
  get serverRoot() {
    return this.isDev() ? 'http://localhost:8080' : '';
  }
  dateFormat = 'MM-DD';
  timeFormat = 'YYYY-MM-DD HH:mm';
  demoUsers = [
    {
      name: '市级管理员',
      username: 'sys-admin',
    },
    {
      name: '单位管理员',
      username: 'dept-admin',
    },
    {
      name: '普通用户',
      username: 'res-user',
    },
    {
      name: '评审专家',
      username: 'expert',
    },
  ];
}
