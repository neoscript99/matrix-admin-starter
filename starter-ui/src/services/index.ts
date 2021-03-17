import { LoginInfo, AdminServices, SpringBootClient, ObjectUtil } from 'matrix-ui-service';
import { config } from '../utils';
import { PlanService } from './PlanService';

function afterLogin(loginInfo: LoginInfo) {
  if (!loginInfo.token) throw 'token不能为空';
  //必须最先执行，否则验证错误
  ObjectUtil.set(restClient.fetchOptions, 'reqInit.headers.Authorization', `Bearer ${loginInfo.token}`);
  const funs = [planService.afterLogin(loginInfo)];
  return Promise.all(funs);
}

export const restClient = new SpringBootClient({ rootUrl: config.serverRoot });

export const adminServices = new AdminServices(restClient, afterLogin);
export const dictService = adminServices.dictService;
export const paramService = adminServices.paramService;
export const attachmentService = adminServices.attachmentService;
export const deptService = adminServices.deptService;
export const planService = new PlanService(restClient);

export const loginService = adminServices.loginService;
//session登录不成功的话，尝试本地保存的用户密码登录
loginService.trySessionLogin().then((loginInfo) => loginInfo.success || loginService.tryLocalLogin());
