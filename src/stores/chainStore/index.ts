import { makeAutoObservable, runInAction } from "mobx";
import Web3 from "web3";

import raribleStore from '@stores/raribleStore';

import { TabsEnum } from '@app/enums/tabs';
import { StateEnum } from '../../enums/state-enum/index';

const POOL_ADRESS = "0xdd074C2D5F230E1BAa9B9250DC9d6223C80d93E6";
const FACTORY_ADRESS = "0xfc0B796D7A56B4CA112F48D17d1989892717dc77";

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
      const balance = await web3.utils.fromWei(weiBalance, 'ether');

      runInAction(() => {
        this.address = accounts[0];
        this.balance = balance
        this.blockChainState = StateEnum.Success;
      });
    } catch (error) {
      this.blockChainState = StateEnum.Error;
    }

    // const poolAbi = PoolAbi.abi;
    // const factoryAbi = FactoryAbi.abi;

    // if (poolAbi) {
    //   // @ts-ignore
    //   const poolContract = new web3.eth.Contract(poolAbi, POOL_ADRESS);
    //   this.poolContract = poolContract;
    // }

    // if (factoryAbi) {
    //   // @ts-ignore
    //   const factoryContract = new web3.eth.Contract(factoryAbi, FACTORY_ADRESS);
    //   this.factoryContract = factoryContract;
    // }
  };

  getPool = async (id: number): Promise<any> => {
    try {
      const pool = await this.poolContract.methods.get_pool(id).call();
      const order = await getOrder(`${pool.nft_address}:${pool.nft_id}`);
      const conf = {
        ...pool,
        price: +order.bestSellOrder.take.value,
        image: order.meta.image?.url.PREVIEW,
        percentage: (pool.total / +order.bestSellOrder.take.value) * 100,
        id,
        name: order.meta.name,
        description: order.meta.name,
      }
      console.log(conf, 'conf');
      this.pool = conf;
      return conf;
    } catch (error) {}
  };

  getPartyNumber = async (type: TabsEnum): Promise<void> => {
    try {
      this.poolLoading = true;

      const id = await this.poolContract.methods.pool_id().call();

      if (+id) {
        for (let i = 1; i <= id; i++) {
          const pool = await this.getPool(i);
          if (type === TabsEnum.All) this.pools.push(pool);
          else {
            if (pool.participants.some((item: string) => item === this.address)) {
              this.pools.push(pool);
            }
          } 
        }
      } 
    } catch (error) {}
    finally {
      this.poolLoading = false;
    }
  };

  getUserData = async (userId: string, poolId: number): Promise<any> => {
    try {
      const userData = this.poolContract.methods.get_absolute(poolId, userId).call();
      return userData;
    } catch (error) {}
  };

  setDeposite = async (poolId: number, eth: string) => {
    try {
      this.depositeLoading = true
      const hash = await this.poolContract.methods.set_deposit(poolId).send({
        from: this.address,
        value: window.web3.utils.toWei(eth, "ether"),
      });
      this.depositeLoading = false;
      return hash;
    } catch (error) {
      console.log(error, 'err');
    }
    finally {
      this.depositeLoading = false;
    }
  };

  clearPool = () => {
    this.pool = null;
  };

  // getDaoContract = async (poolId: number) => {
  //   try {
  //     const dao_address = await this.factoryContract.methods.get_dao(poolId).call();
  //     console.log(dao_address, 'address')
  //     const daoAbi = DaoAbi.abi;
  //     if (daoAbi) {
  //       // @ts-ignore
  //       const daoContract = new window.web3.eth.Contract(daoAbi, dao_address);
  //       this.daoContract = daoContract;
  //     }
  //   } catch (error) {  }
  // };

  createProposal = async (title: string, description: string, nftAddress: string, nftId: string) => {
    try {
      return await this.daoContract.methods.propose_sell(
        title,
        description,
        nftAddress,
        nftId
      ).send({ from: this.address });
    } catch (error) { }
  };

  getProposal = async (proposalId: number) => {
    try {
      const proposal = await this.daoContract.methods.get_proposal(proposalId).call();
      return proposal;
    } catch (error) {}
  };

  getAllProposals = async () => {
    try {
      const proposals = [];
      const id = await this.daoContract.methods.proposal_id().call();
      for (let i = 1; i <= id; i++) {
        const proposal = await this.getProposal(i);
        console.log(proposal, 'prrr')
        proposals.push({
          title: proposal.title,
          description: proposal.description,
          votes_against: proposal.votes_against,
          votes_for: proposal.votes_for,
          id: i,
          status: proposal.status,
        });
      }
      this.proposals = proposals;
    } catch (error) {
      console.log(error, 'err');
    }
  };

  voteFor = async (id: number, voteFor: boolean) => {
    try {
      return await this.daoContract.methods.vote(id, voteFor).send({ from: this.address });
    } catch (error) {}
  }
}

export default new ChainStore();
