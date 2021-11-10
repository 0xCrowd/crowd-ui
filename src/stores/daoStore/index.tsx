import { makeAutoObservable, runInAction } from "mobx";
import axios from 'axios';

import chainStore from '@stores/chainStore';
import raribleStore from "@stores/raribleStore";

import { StateEnum } from '@enums/state-enum/index';
import { ProposalStatusEnum } from '@enums/proposal-status-enum/index';
import { IPartyFormData } from '@pages/main-page/components/party-form/constants';
import { getImageUrl } from "@app/utils/getImageUrl";

import DAO from "../../../ABI/Vault.json";

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
    } catch (error) {
      console.log(error);
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
    } catch (error) {
      console.log(error);
      this.daoState = StateEnum.Error;
    }
  }

  // Get every DAO from the registry with the ceramic_client
  getDaoInfo = async (dao: IDao, withToken?: boolean): Promise<IAdaptedDao> => {
    try {
      // @ts-ignore
      const l1Dao = new window.web3.eth.Contract(DAO.abi, dao.l1_vault);

      const total = await l1Dao.methods.getBalance().call();
      const collected = +await window.web3.utils.fromWei(total, 'ether');

      const { address } = chainStore

      let data = await getOrder(dao.buyout_target, false);

      if (!data) {
        data = await getOrder(dao.buyout_target, false, true);
      }

      const { bestSellOrder, meta } = data;

      const imageMeta: IImageMeta = meta.image.meta.ORIGINAL || meta.image.meta.PREVIEW;

      if (imageMeta.height > 440) imageMeta.height = 440;
      if (imageMeta.width > 440) imageMeta.width = 440;

      let tokenTicker = '';

      if (withToken) tokenTicker = await l1Dao.methods.getTokenTicker().call();
      console.log(tokenTicker, 'ticker');
      return {
        ceramic_stream: dao.ceramic_stream,
        partyName: meta.name,
        description: meta.description,
        image: getImageUrl(meta.image.url.ORIGINAL || meta.image.url.PREVIEW),
        price: bestSellOrder.take.valueDecimal,
        collected,
        users: dao.deposits,
        percentage: Math.ceil((collected / bestSellOrder.take.valueDecimal) * 100),
        myPaid: dao.deposits.find(elem => elem.address === address),
        imageMeta: meta.image.meta.ORIGINAL || meta.image.meta.PREVIEW,
        tokenTicker,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  loadMoreDaos = async (address?: string) => {
    try {
      this.daosPage += 1;

      this.getDaosList(address);
    } catch (error) {
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
    let voteForPercent = 100;
    let voteAgainstPercent = 0;

    if (proposal.status !== ProposalStatusEnum.Success) {
      const item = localStorage.getItem('for');
      if (item) {
        voteForPercent = +item;
        voteAgainstPercent = 100 - voteForPercent;
      } else {
        voteForPercent = 50;
        voteAgainstPercent = 50;
      }
    }

    return {
      ...proposal,
      voteFor: this.adaptedDao.users.length,
      voteAgainst: this.adaptedDao.users.length,
      voteForPercent,
      voteAgainstPercent,
    };
  };

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
  };

  voteFor = (ceramicStream: string) => {
    const proposalIndex = this.proposalsList.findIndex(elem => elem.ceramic_stream === ceramicStream);
    const editedProposals = [...this.proposalsList];

    if (proposalIndex !== undefined) {
      editedProposals[proposalIndex].voteForPercent += 25;
      editedProposals[proposalIndex].voteAgainstPercent -= 25;

      localStorage.setItem('for', `${editedProposals[proposalIndex].voteForPercent}`);
    }

    this.proposalsList = editedProposals;
    console.log(this.proposalsList, 'lsit')
  };

}

export default new DaoStore();
