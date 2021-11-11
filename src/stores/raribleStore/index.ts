import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import { minBy } from 'lodash';

import chainStore from '@stores/chainStore';
import { StateEnum } from '@app/enums/state-enum/index';

class RaribleStore {
  constructor() {
    makeAutoObservable(this);
  }

  order: any = null;
  orderState: StateEnum = StateEnum.Empty;
  price: number | null = null;

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
        },
      });

      if (isSetOrder) {
        if (!response.data.bestSellOrder) {
          throw new Error("this nft without fixed price");
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
  };

  getPrice = async (contract: string, tokenId: string) => {
    try {
      const { networkId } = chainStore;
      const response = await axios.get(
        `https://api${
          networkId === 4 ? "-staging" : ""
        }.rarible.com/protocol/v0.1/ethereum/order/orders/sell/byItem`,
        {
          params: {
            contract,
            tokenId,
          },
        }
      );
      const min = minBy(response.data.orders, (item: any) => item.makePrice);
      console.log(min, 'min')
      runInAction(() => {
        this.price = min.makePrice;
      });
      return min.makePrice
    } catch (error: any) {}
  };

  clearOrder = () => {
    this.order = null;
  };
}

export default new RaribleStore();
