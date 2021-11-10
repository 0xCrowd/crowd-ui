import { makeAutoObservable, runInAction } from "mobx";
import axios, { AxiosError } from 'axios';

import chainStore from '@stores/chainStore';
import { StateEnum } from '@app/enums/state-enum/index';

class RaribleStore {
  constructor() {
    makeAutoObservable(this);
  }

  order: any = null;
  orderState: StateEnum = StateEnum.Empty;

  getOrder = async (id: string, isSetOrder = true) => {
    try {
      const { networkId } = chainStore;
      if (isSetOrder) {
        runInAction(() => {
          this.orderState = StateEnum.Loading;
        });
      }
      
      const response = await axios({
        url: `https://ethereum-api${networkId === 4 ? '-staging': ''}.rarible.org/v0.1/nft-order/items/${id}`,
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
      this.orderState = StateEnum.Error;
    }
  }

  clearOrder = () => {
    this.order = null;
  }
};

export default new RaribleStore();
