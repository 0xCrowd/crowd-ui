import { makeAutoObservable, runInAction } from "mobx";
import Web3 from "web3";

import { StateEnum } from '@app/enums/state-enum/index';


import Vault from "../../../ABI/Vault.json";
import CrowdManager from "../../../ABI/Vault.json";

const VAULT_ADDRESS = "0x759D6BC03f9d27bc582fCC6A75e07b2570Aa92Bc";
const CROWD_MANAGER_ADDRESS = "0x759D6BC03f9d27bc582fCC6A75e07b2570Aa92Bc";
class ChainStore {
  constructor() {
    makeAutoObservable(this);
  }

  address = "";
  balance = "";
  networkId = 1;

  vaultContract!: any;
  crowdMangerContract!: any;

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

    const corwdManagerAbi = CrowdManager.abi;

    if (corwdManagerAbi) {
      // @ts-ignore
      this.crowdMangerContract = new web3.eth.Contract(corwdManagerAbi, CROWD_MANAGER_ADDRESS);
    }
  };
}

export default new ChainStore();
