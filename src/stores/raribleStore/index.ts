import { makeAutoObservable, runInAction } from "mobx";
import axios, { AxiosError } from 'axios';

import { StateEnum } from '@app/enums/state-enum/index';

class RaribleStore {
  constructor() {
    makeAutoObservable(this);
  }

  order: any = null;
  orderState: StateEnum = StateEnum.Empty;

  getOrder = async (id: string, isSetOrder = true, isStaging = false) => {
    try {
      if (isSetOrder) {
        runInAction(() => {
          this.orderState = StateEnum.Loading;
        });
      }
      
      const response = await axios({
        url: `https://ethereum-api${isStaging ? '-staging': ''}.rarible.org/v0.1/nft-order/items/${id}`,
        withCredentials: false,
        params: {
          includeMeta: true,
        }
      });

      if (isSetOrder) {
        if (!response.data.bestSellOrder) {
          throw new Error('this nft without fixed price')
        }
        runInAction(() => {
          this.order = response.data;
          this.orderState = StateEnum.Success;  
        });
      } else {
        return response.data;
      }
    } catch (error: any) {
      if (!isStaging && error.response.status === 404) {
        this.getOrder(id, isSetOrder, true);
      } else {
        this.orderState = StateEnum.Error;
      } 
    }
  }

  clearOrder = () => {
    this.order = null;
  }
};

export default new RaribleStore();
