import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import { minBy } from 'lodash';

import { notify } from '@app/utils/notify';
import { StateEnum } from '@app/enums/state-enum/index';

import chainStore from '@stores/chainStore';

class RaribleStore {
  constructor() {
    makeAutoObservable(this);
  }

  order: any = null;
  price: number | null = null;
  nftDataLoadingState = StateEnum.Empty

  getOrder = async (id: string, isSetOrder = true, withNotify = false) => {
    try {
      const { networkId } = chainStore;

      if (isSetOrder) {
        runInAction(() => {
          this.nftDataLoadingState = StateEnum.Loading;
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
        runInAction(() => {
          this.order = response.data;
        });
      } else {
        return response.data;
      }
    } catch (error: any) {
      if (withNotify) {
        notify(error.message);
      }
      
      runInAction(() => {
        this.nftDataLoadingState = StateEnum.Error;
      });
    }
  };

  getPrice = async (contract: string, tokenId: string, withNotify = false) => {
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

      runInAction(() => {
        this.price = min.makePrice;
        this.nftDataLoadingState = StateEnum.Success;
      });

      return min.makePrice
    } catch (error: any) {
      if (withNotify) {
        notify(error.message);
      }

      runInAction(() => {
        this.nftDataLoadingState = StateEnum.Error;
      });
    }
  };

  getLastPurchase = async (contract: string, tokenId: string) => {
    try {
      const { networkId } = chainStore;
      const response = await axios({
        url: `https://ethereum-api${networkId === 4 ? '-staging': ''}.rarible.org/v0.1/nft-order/activities/byItem`,
        withCredentials: false,
        params: {
          contract,
          tokenId,
          type: 'MATCH'
        },
      });
      if (response.data.items.length) {
        console.log(response.data.items[0].price, 'last price')
      }
      return response.data.items[0].price
      console.log(response.data.items);
    } catch (error) {
      
    }
  }

  clearOrder = () => {
    this.order = null;
  };
}

export default new RaribleStore();
