import { toWei } from './../../utils/toWei';
import { ethers } from "ethers";
import { makeAutoObservable, runInAction } from "mobx";

import chainStore from "@stores/chainStore";

import { StateEnum } from "@enums/state-enum/index";
import { notify } from "@app/utils/notify";
import { api } from "@app/api";

class TransactionsStore {
  constructor() {
    makeAutoObservable(this);
  }

  donateState = StateEnum.Empty;

  donate = async (amount: string, fundraisingId: number) => {
    try {
      runInAction(() => {
        this.donateState = StateEnum.Loading;
      });

      const { address, vaultContract, blockChainState } = chainStore;

      if (blockChainState === StateEnum.Success) {

        const weiAmount = toWei(amount);

        await vaultContract.methods
          .deposit(fundraisingId)
          .send({ from: address, value: weiAmount });

        runInAction(() => {
          this.donateState = StateEnum.Success;
        });
      } else {
        throw new Error("blockchain dont load");
      }
    } catch (error: any) {
      notify(error.message)
      runInAction(() => {
        this.donateState = StateEnum.Error;
      });
    }
  };

  withdraw = async (fundraisingId: number, amount?: string) => {
    try {
      runInAction(() => {
        this.donateState = StateEnum.Loading;
      });


      let weiAmount: string | undefined = undefined;

      if (amount) {
        weiAmount = toWei(amount);
      }

      const { address } = chainStore;

      await api.transactions.makeWithdraw({
        crowd: fundraisingId,
        user: address,
        amount: weiAmount
      })

      runInAction(() => {
        this.donateState = StateEnum.Success;
      });

    } catch (error: any) {
      runInAction(() => {
        this.donateState = StateEnum.Error;
      });

      notify(error.message);
    }
  };

  signMessage = async (message: string) => {
    try {
      if (!window.ethereum) {
        throw new Error("No crypto wallet found. Please install it.");
      }

      await window.ethereum.sendAsync({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const signature = await signer.signMessage(message);
      const address = await signer.getAddress();

      return {
        signature,
        address,
      };
    } catch (err) {
      throw err;
    }
  };
}

export default new TransactionsStore();


