abstract class Config {
  dateFormat = 'MM-DD';
  timeFormat = 'YYYY-MM-DD HH:mm';
  abstract isDev(): boolean;
  demoUsers = [
    {
      name: 'System Admin',
      username: 'admin',
      passwordHash: '2f183a4e64493af3f377f745eda502363cd3e7ef6e4d266d444758de0a85fcc8',
    },
    {
      name: 'Normal User',
      username: 'test.user',
      passwordHash: '2f183a4e64493af3f377f745eda502363cd3e7ef6e4d266d444758de0a85fcc8',
    },
  ];
}

export class DevConfig extends Config {
  serverRoot = 'http://localhost:8080';
  serverLogout = false;
  env = 'dev';
  isDev() {
    return true;
  }
}
export class ProdConfig extends Config {
  serverRoot = '';
  serverLogout = true;
  env = 'prod';
  isDev() {
    return false;
  }
}
