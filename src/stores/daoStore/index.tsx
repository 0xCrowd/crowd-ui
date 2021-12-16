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
import { fixedRound } from "@app/utils/round";

const API_ENDPOINT = "https://crowd-protocol-master-9iojf.ondigitalocean.app"

const { getOrder, getPrice, getLastPurchase } = raribleStore;

class DaoStore {
  constructor() {
    makeAutoObservable(this);
  }

  originalDao!: IDao;
  adaptedDao!: IAdaptedDao;
  daosOriginal: IDao[] = [];
  loadedCrowds: number = 0;
  totalCrowds = 0;
  crowdPage = 0;
  crowdLimit = 12;
  crowds: AdaptedCrowd[] = [];
  daoState = StateEnum.Loading;
  createDaoState = StateEnum.Empty;

  donateState = StateEnum.Empty;

  proposalState = StateEnum.Empty;
  createProposalState = StateEnum.Empty;
  proposalPage: number = 0;
  proposalLimit: number = 10;
  proposalsList: IAdaptedProposal[] = [];

  delta = 0;

  balanceOfDaoToken = 0;

  voteState = StateEnum.Empty;

  //#region daos
  getCrowdList = async (address?: string) => {
    try {
      if (this.crowdPage === 0) {
        this.loadedCrowds = 0;
        this.daoState = StateEnum.Loading;
      }

      const response = await axios.get<ApiResponse<CrowdApiType>>(`${API_ENDPOINT}/crowd`, {
        params: {
          offset: this.crowdPage * this.crowdLimit,
          limit: this.crowdLimit,
          address,
        },
        withCredentials: false,
      });

      runInAction(() => {
        this.loadedCrowds += response.data.items.length;
      });

      const crowds: AdaptedCrowd[] = [];

      await Promise.all(response.data.items.map(async (crowd: CrowdApiType) => {
        const adaptedCrowd = await this.adaptCrowd(crowd);

        if (adaptedCrowd) {
          crowds.push(adaptedCrowd);
        }
      }));

      console.log(response, 'response');

      if (this.crowdPage === 0) {
        runInAction(() => {
          this.crowds = crowds;
        });
      } else {
        runInAction(() => {
          this.crowds = [...this.crowds, ...crowds];
        });
      }

      runInAction(() => {
        this.totalCrowds = response.data.total;
        this.daoState = StateEnum.Success;
      });
    } catch (error: any) {
      notify(error.message);
      this.daoState = StateEnum.Error;
    }
  };

  adaptCrowd = async (crowd: CrowdApiType, withToken?: boolean): Promise<AdaptedCrowd> => {
    // @ts-ignore
    const l1Dao = new window.web3.eth.Contract(DAO.abi, crowd.l1_vault);

    const total = await l1Dao.methods.getBalance().call();
    const collected = +await window.web3.utils.fromWei(total, 'ether') + this.delta;

    let tokenTicker = '';
    if (withToken) {
      tokenTicker = await l1Dao.methods.getTokenTicker().call();
    }

    return {
      ...crowd,
      collected,
      percentage: Math.ceil((collected / +crowd.price) * 100),
    }
  }

  getDao = async (stream: string) => {
    try {
      this.daoState = StateEnum.Loading;

      const response = await axios.get(`${API_ENDPOINT}/daos`, {
        params: {
          stream,
        },
        withCredentials: false,
      });

      const adaptedDao = await this.getDaoInfo(response.data.items[0], true);

      if (adaptedDao) {
        runInAction(() => {
          this.adaptedDao = adaptedDao;
          this.originalDao = response.data.items[0]
          this.daoState = StateEnum.Success;
        });
      }
    } catch (error: any) {
      notify(error.message);
      this.daoState = StateEnum.Error;
    }
  }

  getDaoInfo = async (dao: IDao, withToken = false): Promise<IAdaptedDao | undefined> => {
    try {
      const { meta } = await getOrder(dao.buyout_target, false);
      const [contract, id] = dao.buyout_target.split(':');

      let price = await getPrice(contract, id);
      const priceWithDelta = price + this.delta;

      if (!price) {
        price = await getLastPurchase(contract, id);
      }

      // @ts-ignore
      const l1Dao = new window.web3.eth.Contract(DAO.abi, dao.l1_vault);

      const total = await l1Dao.methods.getBalance().call();
      const collected = +await window.web3.utils.fromWei(total, 'ether') + this.delta;

      let tokenTicker = '';
      if (withToken) tokenTicker = await l1Dao.methods.getTokenTicker().call();

      const { address } = chainStore;
    
      const isBought = await this.isBought(dao.ceramic_stream);

      const imagePath = meta.image ?? meta.animation;

      return {
        ceramic_stream: dao.ceramic_stream,
        partyName: meta.name,
        description: meta.description,
        image: getImageUrl(imagePath.url.ORIGINAL || imagePath.url.PREVIEW),
        price: priceWithDelta || undefined,
        collected,
        users: dao.deposits,
        percentage: isBought ? 100 : Math.ceil((collected / priceWithDelta) * 100),
        myPaid: dao.deposits.find(elem => elem.address === address),
        imageMeta: imagePath.meta.ORIGINAL || imagePath.meta.PREVIEW,
        tokenTicker,
        isBought,
      };
    } catch (error: any) {}
  };

  loadMoreCrowds = async (address?: string) => {
    try {
      this.crowdPage += 1;

      this.getCrowdList(address);
    } catch (error: any) {
      notify(error.message);
      this.daoState = StateEnum.Error;
    }
  };

  clearPage = () => {
    this.crowdPage = 0;
  };

  createDao = async ({ tokenName }: IPartyFormData) => {
    try {
      const { address, factoryContract } = chainStore;
      const { order } = raribleStore;

      this.createDaoState = StateEnum.Loading;

      //const initAmount = window.web3.utils.toWei('1000');
      let vaultAddress = '';
      let tokenAddress = '';

      const listener = (err: any, e: any) => {
        vaultAddress = e.returnValues.vault;
        tokenAddress = e.returnValues.tokenAddress;
      };

      await factoryContract.events.NewVault({}, listener);

      await factoryContract.methods
        .newVault(tokenName, tokenName.slice(0, 5), 100)
        .send({ from: address, value: 0 });

      await axios.post(`${API_ENDPOINT}/dao`, {
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

      await axios.post(`${API_ENDPOINT}/deposit`, {
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

  isBought = async (daoStream: string) => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/proposals`, {
        params: {
          dao_stream: daoStream,
          offset: 0,
          limit: 1,
        }
      });
      const data: IProposal[] = response.data.items;

      if (response.data.total > 1) {
        return true
      }
      return data[0].fulfilled
    } catch (error) {
      console.log(error)
    }
  };
  //#endregion

  //#region proposals
  getProposals = async (daoStream: string) => {
    try {
      runInAction(() => {
        this.proposalState = StateEnum.Loading;
      });

      const response = await axios.get(`${API_ENDPOINT}/proposals`, {
        params: {
          dao_stream: daoStream,
          offset: this.proposalPage * this.proposalLimit,
          limit: this.proposalLimit,
        }
      });

      const newProposals: IAdaptedProposal[] = [];

      await Promise.all(response.data.items.map(async (item: IProposal) => {
        const adaptedProposal = await this.adaptProposal(item);
        newProposals.push(adaptedProposal);
      }));

      runInAction(() => {
        this.proposalsList = newProposals;
        this.proposalState = StateEnum.Success;
      })
      
    } catch (error: any) {
      this.proposalState = StateEnum.Error
      throw error;
    }
  };

  adaptProposal = async (proposal: IProposal): Promise<IAdaptedProposal> => {
    const voteData = await this.getVotesData(proposal.ceramic_stream);
    let voteForPercent = 0;
    if (proposal.type === ProposalTypeEnum.Buyout) {
      voteForPercent = 100;
    }

    let voteFor = 0;
    let voteAgainst = 0;
    let voteAgainstPercent = 0;

    if (voteData) {
      let voteForObj = voteData.filter((item) => item.option === 0);
      voteFor = voteForObj.reduce(
        (accum, curr) => accum + +window.web3.utils.fromWei(curr.amount, 'ether'),
        voteFor
      );

      let voteAgainsObj = voteData.filter((item) => item.option === 1);
      voteAgainst = voteAgainsObj.reduce(
        (accum, curr) => accum + +window.web3.utils.fromWei(curr.amount, 'ether'),
        voteFor
      );

      const commonAmount = voteFor + voteAgainst;

      if (proposal.type !== ProposalTypeEnum.Buyout) {
        voteForPercent = fixedRound((voteFor / commonAmount) * 100);
        voteAgainstPercent = 100 - voteForPercent;
      } 
    }

    let title = proposal.title;

    if (proposal.type === ProposalTypeEnum.Sell) {
      const price = proposal.price ? window.web3.utils.fromWei(proposal.price, 'ether') : 0;
      title = `Sell for ${price}`;
    }

    return {
      ...proposal,
      voteFor,
      voteAgainst,
      voteForPercent,
      voteAgainstPercent,
      title,
    };
  };

  getVotesData = async (proposalStream: string): Promise<IProposalVoteData[] | undefined> => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/votes`, {
        params: {
          proposal_stream: proposalStream,
        },
      });
      return response.data.items;
    } catch (error: any) {
      notify(error.message);
    }
  };

  updateProposal = async (proposalStream: string) => {
    try {
      const newProposalsList = [...this.proposalsList];
      const index = newProposalsList.findIndex(elem => elem.ceramic_stream === proposalStream);
      const newProposal = await this.adaptProposal(newProposalsList[index]);

      newProposalsList[index] = newProposal;
    } catch (error: any) {
      notify(error.message);
    }
  }

  loadMoreProposals = async (daoStream: string) => {
    try {
      this.proposalPage += 1;

      this.getProposals(daoStream);
    } catch (error: any) {}
  };

  createProposal = async (daoStream: string, price: string) => {
    try {
      runInAction(() => {
        this.createProposalState = StateEnum.Loading;
      });

      await axios.post(`${API_ENDPOINT}/proposal`, {
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

      await axios.post(`${API_ENDPOINT}/vote`, {
        address,
        proposal_stream: proposalStream,
        option,
        amount: window.web3.utils.toWei(amount, 'ether'),
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
  //#endregion

  getDelta = async () => {
    try {
      const response = await axios.get<HealthResponse>(`${API_ENDPOINT}/health`);

      runInAction(() => {
        this.delta = +response.data.gas_tank_state.delta;
      });
    } catch (error: any) {
      notify(error.message);
    }
  };

  withdraw = async (amount: string) => {
    try {
      runInAction(() => {
        this.donateState === StateEnum.Loading;
      });

      const { address } = chainStore;

      // @ts-ignore
      const l1Dao = new window.web3.eth.Contract(DAO.abi, this.originalDao.l1_vault);
      const weiAmount = window.web3.utils.toWei(amount);
      await l1Dao.methods.withdrawDeposit(weiAmount).send({ from: address });

      runInAction(() => {
        this.donateState === StateEnum.Success;
      });
    } catch (error: any) {
      runInAction(() => {
        this.donateState === StateEnum.Error;
      });

      notify(error.message);
    }
  }
}

export default new DaoStore();
