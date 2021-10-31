import { makeAutoObservable, runInAction } from "mobx";
import Web3 from "web3";

import raribleStore from '@stores/raribleStore';

import { StateEnum } from '@app/enums/state-enum/index';


import Factory from "../../../ABI/DAOFactory.json";

const FACTORY_ADRESS = "0x0D74A7CD417303795E3C36201FEEC2DdDBD2a5c6";

const { getOrder } = raribleStore;

class ChainStore {
  constructor() {
    makeAutoObservable(this);
  }

  address = "";
  balance = "";

  poolContract!: any;
  factoryContract!: any;
  daoContract!: any;

  web3State: StateEnum = StateEnum.Empty;
  blockChainState: StateEnum = StateEnum.Empty;

  daosList: string[] = [];
  totalDaos = 0;
  daosPage = 1;
  daosLimit = 10;
  daos: IDao[] = [];
  daoState: StateEnum = StateEnum.Empty;
  createDaoState: StateEnum = StateEnum.Empty;

  pools: any[] = [{
    price: 100,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Hashmask_15753.jpg/1024px-Hashmask_15753.jpg',
    percentage: 10,
    id: '1',
    party_name: 'crowd',
    description: '123',
  },
  {
    price: 100,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Hashmask_15753.jpg/1024px-Hashmask_15753.jpg',
    percentage: 10,
    id: '2',
    party_name: 'crowd',
    description: '123',
  },
  {
    price: 100,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Hashmask_15753.jpg/1024px-Hashmask_15753.jpg',
    percentage: 10,
    id: '3',
    party_name: 'crowd',
    description: '123',
  },
  {
    price: 100,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Hashmask_15753.jpg/1024px-Hashmask_15753.jpg',
    percentage: 10,
    id: '3',
    party_name: 'crowd',
    description: '123',
  }];
  pool!: any;
  poolLoading = true;

  depositeLoading = false;

  addProposalLoading = false;
  proposals: any[] = [
    {
      title: 'Proposal',
      description: 'DEsc desc desc desc desc desc desc desc',
    },
    {
      title: 'Proposal',
      description: 'DEsc desc desc desc desc desc desc desc',
    },
    {
      title: 'Proposal',
      description: 'DEsc desc desc desc desc desc desc desc',
    },
    {
      title: 'Proposal',
      description: 'DEsc desc desc desc desc desc desc desc',
    }
  ];

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

      const balance = await web3.utils.fromWei(weiBalance, 'ether').split('.')[0];

      runInAction(() => {
        this.address = accounts[0];
        this.balance = balance
        this.blockChainState = StateEnum.Success;
      });
    } catch (error) {
      this.blockChainState = StateEnum.Error;
    }

    // const poolAbi = PoolAbi.abi;
    const factoryAbi = Factory.abi;

    // if (poolAbi) {
    //   // @ts-ignore
    //   const poolContract = new web3.eth.Contract(poolAbi, POOL_ADRESS);
    //   this.poolContract = poolContract;
    // }

    if (factoryAbi) {
      // @ts-ignore
      const factoryContract = new web3.eth.Contract(factoryAbi, FACTORY_ADRESS);
      this.factoryContract = factoryContract;
    }
  };
}

export default new ChainStore();
