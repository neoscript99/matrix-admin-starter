import { AbstractClient, DomainService, DomainStore, Entity, LoginInfo } from 'matrix-ui-service';

export interface PlanTypeEntity extends Entity {
  code: string;
  name: string;
}

export interface PlanEntity extends Entity {
  planName: string;
  planYear: number;
  type: PlanTypeEntity;
  planBeginDay: string;
  planEndDay: string;
  maxNumber?: number;
}

export class PlanService extends DomainService<PlanEntity> {
  constructor(restClient: AbstractClient) {
    super({ domain: 'plan', storeClass: DomainStore, restClient });
  }
  listStarted() {
    return this.postApi('listStarted').then((res) => {
      this.store.startedList = res;
      this.fireStoreChange();
      return res;
    });
  }
  afterLogin = (loginInfo: LoginInfo) => {
    return this.readAuthorize(loginInfo.authorities) ? this.listStarted() : Promise.resolve();
  };
  get packageName() {
    return 'demo';
  }

  /**
   * 在service中，前台业务逻辑重用
   */
  isValid(plan: PlanEntity) {
    return plan.planEndDay > plan.planBeginDay;
  }
}
