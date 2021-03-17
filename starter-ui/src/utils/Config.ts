abstract class Config {
  dateFormat = 'MM-DD';
  timeFormat = 'YYYY-MM-DD HH:mm';
  abstract isDev(): boolean;
  demoUsers = [
    {
      name: '�м�����Ա',
      username: 'sys-admin',
    },
    {
      name: '��λ����Ա',
      username: 'dept-admin',
    },
    {
      name: '��ͨ�û�',
      username: 'res-user',
    },
    {
      name: '����ר��',
      username: 'expert',
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
