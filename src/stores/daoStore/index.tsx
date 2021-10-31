import { makeAutoObservable, runInAction } from "mobx";
import axios from 'axios';

import chainStore from '@stores/chainStore';
import raribleStore from "@stores/raribleStore";

import { StateEnum } from '@enums/state-enum/index';
import { ProposalStatusEnum } from '@enums/proposal-status-enum/index';
import { IPartyFormData } from '@pages/main-page/components/party-form/constants';


import DAO from "../../../ABI/DAO.json";

// const POTTERY_ENDPOINT = "https://7f76-2a00-1370-8137-a39b-70-9b54-ed0d-accd.ngrok.io"

const { getOrder } = raribleStore;

class DaoStore {
  constructor() {
    makeAutoObservable(this);
  }

  originalDao!: IDao;
  adaptedDao!: IAdaptedDao;
  daosOriginal: IDao[] = [];
  totalDaos = 0;
  daosPage = 0;
  daosLimit = 10;
  daos: IAdaptedDao[] = [];
  daoState: StateEnum = StateEnum.Empty;
  createDaoState: StateEnum = StateEnum.Empty;

  donateState: StateEnum = StateEnum.Empty;

  proposalState: StateEnum = StateEnum.Empty;
  createProposalState: StateEnum = StateEnum.Empty;
  proposalPage: number = 0;
  proposalLimit: number = 10;
  proposalsList: IAdaptedProposal[] =[];

  // Get DAOs list from Pottery Master DAOs registry
  getDaosList = async () => {
    try {
      this.daoState = StateEnum.Loading;

      const response = await axios.get(`${localStorage.getItem('test')}/dao`, {
        params: {
          offset: this.daosPage * this.daosLimit,
          limit: this.daosLimit,
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

      console.log(daos, "daos");
      runInAction(() => {
        this.daos = daos;
        this.totalDaos = response.data.total;
        this.daoState = StateEnum.Success;
      });
    } catch (error) {
      console.log(error);
      this.daoState = StateEnum.Error;
    }
  };

  getDao = async (stream: string) => {
    try {
      this.daoState = StateEnum.Loading;

      const response = await axios.get(`${localStorage.getItem('test')}/dao`, {
        params: {
          stream,
        },
        withCredentials: false,
      });

      const adaptedDao = await this.getDaoInfo(response.data.items[0]);

      runInAction(() => {
        this.originalDao = response.data.items[0]
        this.adaptedDao = adaptedDao;
        this.daoState = StateEnum.Success;
      });
    } catch (error) {
      console.log(error);
      this.daoState = StateEnum.Error;
    }
  }

  // Get every DAO from the registry with the ceramic_client
  getDaoInfo = async (dao: IDao): Promise<IAdaptedDao> => {
    try {
      // @ts-ignore
      const l1Dao = new window.web3.eth.Contract(DAO.abi, dao.l1_vault);

      const total = await l1Dao.methods.getBalance().call();
      const collected = +await window.web3.utils.fromWei(total, 'ether');

      const { address } = chainStore

      const { meta, bestSellOrder } = await getOrder(dao.buyout_target, false);

      return {
        ceramic_stream: dao.ceramic_stream,
        partyName: meta.name,
        description: meta.description,
        image: meta.image.url.PREVIEW || meta.image.url.ORIGINAL,
        price: bestSellOrder.take.valueDecimal,
        collected,
        users: dao.deposits,
        percentage: (collected / bestSellOrder.take.valueDecimal) * 100,
        myPaid: dao.deposits.find(elem => elem.address === address)
      };
    } catch (error) {
      throw error;
    }
  };

  loadMoreDaos = async () => {
    try {
      this.daosPage += 1;

      this.getDaosList();
    } catch (error) {
      this.daoState = StateEnum.Error;
    }
  };

  createDao = async ({ tokenName, partyName }: IPartyFormData) => {
    try {
      const { address, factoryContract } = chainStore;
      const { order } = raribleStore;

      this.createDaoState = StateEnum.Loading;

      //const initAmount = window.web3.utils.toWei('1000');
      const tx = await factoryContract.methods
        .new_dao(partyName, tokenName, 100)
        .send({ from: address, value: 0 });

      const daoAddress = tx.events.NewDao.returnValues.dao;

      // Get L1 DAO token address
      // @ts-ignore
      const l1Dao = new window.web3.eth.Contract(DAO.abi, daoAddress);
      const daoToken = await l1Dao.methods
        .getTokenAddress()
        .call({ from: address });

      // Create new Ceramic DAO and link it with L1 (Eth) DAO
      await axios.post(`${localStorage.getItem('test')}/dao`, {
        name: partyName,
        l1_type: "ethereum",
        l1_vault: daoAddress,
        l1_token: daoToken,
        proposal_total_threshold: 0.5,
        proposal_for_threshold: 0.5,
        proposal_timeout: 3600,
        pool_target: order.id,
      });

      this.getDaosList();
      this.createDaoState = StateEnum.Success;
    } catch (error) {
      console.log(error, "err");
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

      this.getDao(daoStream);

      runInAction(() => {
        this.donateState = StateEnum.Success;
      });
    } catch (error) {
      console.log(error);
      this.donateState = StateEnum.Error;
    }
  };

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
      
    } catch (error) {
      this.proposalState = StateEnum.Error
    }
  };

  adaptProposal = (proposal: IProposal): IAdaptedProposal => {
    return {
      ...proposal,
      voteFor: this.adaptedDao.users.length,
      voteAgainst: this.adaptedDao.users.length,
      voteForPercent: proposal.status === ProposalStatusEnum.Success ? 100 : 50,
      voteAgainstPercent: proposal.status === ProposalStatusEnum.Success ? 0 : 50,
    }
  }

  loadMoreProposals = async (daoStream: string) => {
    try {
      this.proposalPage += 1;

      this.getProposals(daoStream);
    } catch (error) {}
  };

  createProposal = async (daoStream: string, title: string, description: string) => {
    try {
      runInAction(() => {
        this.createProposalState = StateEnum.Loading;
      });

      await axios.post(`${localStorage.getItem('test')}/proposal`, {
        dao_stream: daoStream,
        title,
        description,
      });

      this.getProposals(daoStream);

      runInAction(() => {
        this.createProposalState = StateEnum.Success;        
      })
    } catch (error) {
      this.createProposalState = StateEnum.Error;
    }
  }

}

export default new DaoStore();
