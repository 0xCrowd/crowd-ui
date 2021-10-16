import { makeAutoObservable } from "mobx";
import axios from 'axios';

import { StateEnum } from '@app/enums/state-enum/index';

class RaribleStore {
  constructor() {
    makeAutoObservable(this);
  }

  order: any = null;
  orderState: StateEnum = StateEnum.Empty;

  getOrder = async (id: string) => {
    try {
      this.orderState = StateEnum.Loading;

      const response = await axios({
        url: `https://ethereum-api-staging.rarible.org/v0.1/nft-order/items/${id}`,
        withCredentials: false,
        params: {
          includeMeta: true,
        }
      });

      this.order = response.data;
      this.orderState = StateEnum.Success;  
      return response.data;
    } catch (error) {
      this.orderState = StateEnum.Error;
    }
  }

  clearOrder = () => {
    this.order = null;
  }
};

export default new RaribleStore();