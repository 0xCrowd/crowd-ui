import { makeAutoObservable, runInAction } from "mobx";
import Web3 from "web3";

import { StateEnum } from '@app/enums/state-enum/index';


import Vault from "../../../ABI/Vault.json";

const VAULT_ADDRESS = "0x598901483868F78BBAa454e319d65824Fa4E5c25";
class ChainStore {
  constructor() {
    makeAutoObservable(this);
  }

  address = "";
  balance = "";
  networkId = 1;

  vaultContract!: any;

  web3State: StateEnum = StateEnum.Empty;
  blockChainState: StateEnum = StateEnum.Empty;

  loadWeb3 = async (): Promise<void> => {
    try {
      this.web3State = StateEnum.Loading;
      const { ethereum } = window;
      if (ethereum) {
        window.web3 = new Web3(ethereum);

        ethereum.on('accountsChanged', () => {
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

    const vaultAbi = Vault.abi;

    if (vaultAbi) {
      // @ts-ignore
      this.vaultContract = new web3.eth.Contract(vaultAbi, VAULT_ADDRESS);
    }
  };
}

export default new ChainStore();
