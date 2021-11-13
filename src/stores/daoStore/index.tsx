import { makeAutoObservable, runInAction } from "mobx";
import axios from 'axios';

import chainStore from '@stores/chainStore';
import raribleStore from "@stores/raribleStore";

import { StateEnum } from '@enums/state-enum/index';
import { ProposalTypeEnum } from "@app/enums/proposalTypeEnum";
import { IPartyFormData } from '@pages/main-page/components/party-form/constants';
import { getImageUrl } from "@app/utils/getImageUrl";
import { notify } from '@app/utils/notify';

import DAO from "../../../ABI/Vault.json";
import DAOToken from "../../../ABI/Token.json";

// const POTTERY_ENDPOINT = "https://7f76-2a00-1370-8137-a39b-70-9b54-ed0d-accd.ngrok.io"

const { getOrder, getPrice } = raribleStore;

class DaoStore {
  constructor() {
    makeAutoObservable(this);
  }

  originalDao!: IDao;
  adaptedDao!: IAdaptedDao;
  daosOriginal: IDao[] = [];
  totalDaos = 0;
  daosPage = 0;
  daosLimit = 12;
  daos: IAdaptedDao[] = [];
  daoState: StateEnum = StateEnum.Empty;
  createDaoState: StateEnum = StateEnum.Empty;

  donateState: StateEnum = StateEnum.Empty;

  proposalState: StateEnum = StateEnum.Empty;
  createProposalState: StateEnum = StateEnum.Empty;
  proposalPage: number = 0;
  proposalLimit: number = 10;
  proposalsList: IAdaptedProposal[] = [];

  delta = 0;

  balanceOfDaoToken = 0;

  voteState: StateEnum = StateEnum.Empty;

  getDaosList = async (address?: string) => {
    try {
      this.daoState = StateEnum.Loading;

      const response = await axios.get(`${localStorage.getItem('test')}/daos`, {
        params: {
          offset: this.daosPage * this.daosLimit,
          limit: this.daosLimit,
          address,
        },
        withCredentials: false,
      });

      runInAction(() => {
        this.daosOriginal = response.data.items;
      });

      const daos: IAdaptedDao[] = [];

      await Promise.all(response.data.items.map(async (dao: IDao) => {
        const adaptedDao = await this.getDaoInfo(dao);
        daos.push(adaptedDao);
      }));

      runInAction(() => {
        this.daos = daos;
        this.totalDaos = response.data.total;
        this.daoState = StateEnum.Success;
      });
    } catch (error: any) {
      notify(error.message);
      this.daoState = StateEnum.Error;
    }
  };

  getDao = async (stream: string) => {
    try {
      this.daoState = StateEnum.Loading;

      const response = await axios.get(`${localStorage.getItem('test')}/daos`, {
        params: {
          stream,
        },
        withCredentials: false,
      });

      const adaptedDao = await this.getDaoInfo(response.data.items[0], true);

      runInAction(() => {
        this.originalDao = response.data.items[0]
        this.adaptedDao = adaptedDao;
        this.daoState = StateEnum.Success;
      });
    } catch (error: any) {
      notify(error.message);
      this.daoState = StateEnum.Error;
    }
  }

  // Get every DAO from the registry with the ceramic_client
  getDaoInfo = async (dao: IDao, withToken = false): Promise<IAdaptedDao> => {
    try {
      // @ts-ignore
      const l1Dao = new window.web3.eth.Contract(DAO.abi, dao.l1_vault);

      const total = await l1Dao.methods.getBalance().call();
      const collected = +await window.web3.utils.fromWei(total, 'ether') + this.delta;

      const { address } = chainStore

      const { meta } = await getOrder(dao.buyout_target, false);
      const [contract, id] = dao.buyout_target.split(':');
      const price = await getPrice(contract, id);

      let tokenTicker = '';

      if (withToken) tokenTicker = await l1Dao.methods.getTokenTicker().call();

      const priceWithDelta = price + this.delta;

      return {
        ceramic_stream: dao.ceramic_stream,
        partyName: meta.name,
        description: meta.description,
        image: getImageUrl(meta.image ? meta.image.url.ORIGINAL || meta.image.url.PREVIEW : meta.animation.meta.ORIGINAL),
        price: priceWithDelta,
        collected,
        users: dao.deposits,
        percentage: Math.ceil((collected / priceWithDelta) * 100),
        myPaid: dao.deposits.find(elem => elem.address === address),
        imageMeta: meta.image ? meta.image.meta.ORIGINAL || meta.image.meta.PREVIEW : meta.animation.meta.ORIGINAL,
        tokenTicker,
        isBuyied: await this.isBuyied(dao.ceramic_stream),
      };
    } catch (error: any) {
      throw error;
    }
  };

  loadMoreDaos = async (address?: string) => {
    try {
      this.daosPage += 1;

      this.getDaosList(address);
    } catch (error: any) {
      notify(error.message);
      this.daoState = StateEnum.Error;
    }
  };

  createDao = async ({ tokenName }: IPartyFormData) => {
    try {
      const { address, factoryContract } = chainStore;
      const { order } = raribleStore;

      this.createDaoState = StateEnum.Loading;

      //const initAmount = window.web3.utils.toWei('1000');
      let vaultAddress = '';
      let tokenAddress = '';

      const listner = (err: any, e: any) => {
        vaultAddress = e.returnValues.vault;
        tokenAddress = e.returnValues.tokenAddress;
      };

      await factoryContract.events.NewVault({}, listner);

      await factoryContract.methods
        .newVault(tokenName, tokenName.slice(0, 5), 100)
        .send({ from: address, value: 0 });

      await axios.post(`${localStorage.getItem('test')}/dao`, {
        name: tokenName,
        l1_type: "ethereum",
        l1_vault: vaultAddress,
        l1_token: tokenAddress,
        proposal_total_threshold: 0.5,
        proposal_for_threshold: 0.5,
        proposal_timeout: 3600,
        pool_target: order.id,
      });

      this.createDaoState = StateEnum.Success;
    } catch (error: any) {
      notify(error.message);
      this.createDaoState = StateEnum.Error;
    }
  };

  donate = async (address: string, daoStream: string, amount: string, l1_vault: string) => {
    try {
      runInAction(() => {
        this.donateState = StateEnum.Loading;
      });

      const value = await window.web3.utils.toWei(amount, 'ether');
      //@ts-ignore
      const l1Dao = new window.web3.eth.Contract(DAO.abi, l1_vault);
      
      await l1Dao.methods.recieveDeposit(address).send({ from: address, value });

      await axios.post(`${localStorage.getItem('test')}/deposit`, {
        address,
        dao_stream: daoStream,
        amount,
      });

      runInAction(() => {
        this.donateState = StateEnum.Success;
      });
    } catch (error: any) {
      notify(error.message);
      this.donateState = StateEnum.Error;
    }
  };

  isBuyied = async (daoStream: string) => {
    try {
      const response = await axios.get(`${localStorage.getItem('test')}/proposals`, {
        params: {
          dao_stream: daoStream,
          offset: 0,
          limit: 1,
        }
      });
  
      return response.data.items[0].fulfilled 
    } catch (error) {
      console.log(error)
    }
  }

  getProposals = async (daoStream: string) => {
    try {
      runInAction(() => {
        this.proposalState = StateEnum.Loading;
      });

      const response = await axios.get(`${localStorage.getItem('test')}/proposals`, {
        params: {
          dao_stream: daoStream,
          offset: this.proposalPage * this.proposalLimit,
          limit: this.proposalLimit,
        }
      });

      const newProposals: IAdaptedProposal[] = response.data.items.map((item: IProposal) => {
        return this.adaptProposal(item);
      });

      runInAction(() => {
        this.proposalsList = newProposals;
        this.proposalState = StateEnum.Success;
      })
      
    } catch (error: any) {
      notify(error.message);
      this.proposalState = StateEnum.Error
    }
  };

  adaptProposal = (proposal: IProposal): IAdaptedProposal => {
    this.getVotesData(proposal.ceramic_stream);
    let voteForPercent = 0;
    if (proposal.type === ProposalTypeEnum.Buyout) {
      voteForPercent = 100;
    }
    return {
      ...proposal,
      voteFor: 0,
      voteAgainst: 0,
      voteForPercent,
      voteAgainstPercent: 0,
    };
  };

  getVotesData = async (proposalStream: string) => {
    try {
      const response = await axios.get(`${localStorage.getItem('test')}/votes`, {
        params: {
          proposal_stream: proposalStream,
        },
      });
      console.log(response, 'vote data');
    } catch (error: any) {
      notify(error.message);
    }
  };

  loadMoreProposals = async (daoStream: string) => {
    try {
      this.proposalPage += 1;

      this.getProposals(daoStream);
    } catch (error: any) {
      notify(error.message);
    }
  };

  createProposal = async (daoStream: string, price: string) => {
    try {
      runInAction(() => {
        this.createProposalState = StateEnum.Loading;
      });

      await axios.post(`${localStorage.getItem('test')}/proposal`, {
        dao_stream: daoStream,
        asset: this.originalDao.buyout_target,
        price: window.web3.utils.toWei(price, 'ether'),
      });

      runInAction(() => {
        this.createProposalState = StateEnum.Success;        
      })
    } catch (error: any) {
      notify(error.message);
      this.createProposalState = StateEnum.Error;
    }
  };

  makeVote = async (proposalStream: string, option: number, amount: string) => {
    try {
      runInAction(() => {
        this.voteState = StateEnum.Loading;
      });

      const { address } = chainStore;
      await axios.post(`${localStorage.getItem('test')}/vote`, {
        address,
        proposal_stream: proposalStream,
        option,
        amount: window.web3.utils.toWei(amount, 'ether')
      });

      runInAction(() => {
        this.voteState = StateEnum.Success;
      });
    } catch (error: any) {
      runInAction(() => {
        notify(error.message);
        this.voteState = StateEnum.Error;
      });
    }
  };

  getDelta = async () => {
    try {
      const response = await axios.get(`${localStorage.getItem('test')}/health`);

      runInAction(() => {
        this.delta = +response.data.gas_tank_state.delta;
      });
    } catch (error: any) {
      notify(error.message);
    }
  };

  withdraw = async () => {
    try {
      // @ts-ignore
      const l1Dao = new window.web3.eth.Contract(DAO.abi, this.originalDao.l1_vault);
    } catch (error: any) {
      notify(error.message);
    }
  }
}

export default new DaoStore();
