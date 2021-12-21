import { makeAutoObservable, runInAction } from "mobx";
import Web3 from "web3";

import { StateEnum } from '@app/enums/state-enum/index';


import Factory from "../../../ABI/Factory.json";

const FACTORY_ADRESS = "0x2692578888Fb7f3C0b4915B73fD7A3811FCFc36B";

class ChainStore {
  constructor() {
    makeAutoObservable(this);
  }

  address = "";
  balance = "";
  networkId = 1;

  factoryContract!: any;
  daoContract!: any;

  web3State: StateEnum = StateEnum.Empty;
  blockChainState: StateEnum = StateEnum.Empty;

  loadWeb3 = async (): Promise<void> => {
    try {
      this.web3State = StateEnum.Loading;
      const { ethereum } = window;
      if (ethereum) {
        window.web3 = new Web3(ethereum);

        ethereum.on('accountsChanged', (accounts) => {
          this.loadBlockChain();
        });
        ethereum.on('connect', () => {
          this.loadWeb3();
        });

        await ethereum.enable();
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      }

      runInAction(() => this.web3State = StateEnum.Success);
    } catch (error) {
      this.web3State = StateEnum.Error;
      throw error;
    }
  };

  loadBlockChain = async (): Promise<void> => {
    try {
      this.blockChainState = StateEnum.Loading;

      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
  
      const weiBalance = await web3.eth.getBalance(accounts[0]);

      const balance = await web3.utils.fromWei(weiBalance, 'ether').substr(0, 6);

      const networkId = await web3.eth.net.getId();

      runInAction(() => {
        this.address = accounts[0];
        this.balance = balance;
        this.networkId = networkId;
        this.blockChainState = StateEnum.Success;
      });
    } catch (error) {
      this.blockChainState = StateEnum.Error;
    }

    const factoryAbi = Factory.abi;

    if (factoryAbi) {
      // @ts-ignore
      const factoryContract = new web3.eth.Contract(factoryAbi, FACTORY_ADRESS);
      this.factoryContract = factoryContract;
    }
  };
}

export default new ChainStore();
