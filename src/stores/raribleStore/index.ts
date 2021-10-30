import { makeAutoObservable, runInAction } from "mobx";
import axios from 'axios';

import { StateEnum } from '@app/enums/state-enum/index';

class RaribleStore {
  constructor() {
    makeAutoObservable(this);
  }

  order: any = null;
  orderState: StateEnum = StateEnum.Empty;

  getOrder = async (id: string, isSetOrder = true) => {
    try {
      if (isSetOrder) {
        runInAction(() => {
          this.orderState = StateEnum.Loading;
        });
      }
      
      const response = await axios({
        url: `https://ethereum-api.rarible.org/v0.1/nft-order/items/${id}`,
        withCredentials: false,
        params: {
          includeMeta: true,
        }
      });

      if (isSetOrder) {
        runInAction(() => {
          this.order = response.data;
          this.orderState = StateEnum.Success;  
        });
      } else {
        return response.data;
      }
    } catch (error) {
      this.orderState = StateEnum.Error;
    }
  }

  clearOrder = () => {
    this.order = null;
  }
};

export default new RaribleStore();
