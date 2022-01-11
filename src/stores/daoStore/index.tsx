import { makeAutoObservable, runInAction } from "mobx";
import axios from 'axios';

import chainStore from '@stores/chainStore';

import { StateEnum } from '@enums/state-enum/index';
import { ProposalStatusEnum } from "@app/enums/proposal-status-enum";
import { notify } from '@app/utils/notify';

import DAO from "../../../ABI/Vault.json";
import { ProposalTypeEnum } from "@app/enums/proposal-type-Enum";

const API_ENDPOINT = "https://68b9-185-30-229-66.ngrok.io";

class DaoStore {
  constructor() {
    makeAutoObservable(this);
  }

  // To delete
  daoState = StateEnum.Loading;
  delta = 0;
  
  // new
  loadedCrowds: number = 0;
  totalCrowds = 0;
  crowdPage = 0;
  crowdLimit = 12;
  crowds: AdaptedCrowd[] = [];
  detailedCrowd!: DetailedCrowd;
  crowdState = StateEnum.Loading;

  crowdPreview!: PreviewApiType | undefined;
  createCrowdState = StateEnum.Empty;

  donateState = StateEnum.Empty;

  proposalState = StateEnum.Empty;
  createProposalState = StateEnum.Empty;
  proposalPage: number = 0;
  proposalLimit: number = 10;
  proposalsList: AdaptedProposal[] = [];

  balanceOfDaoToken = 0;

  voteState = StateEnum.Empty;

  //#region daos
  getCrowdList = async (address?: string) => {
    try {
      if (this.crowdPage === 0) {
        this.loadedCrowds = 0;
        this.crowdState = StateEnum.Loading;
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
        this.crowdState = StateEnum.Success;
      });
    } catch (error: any) {
      notify(error.message);
      this.crowdState = StateEnum.Error;
    }
  };

  getCrowd = async (stream: string) => {
    try {
      runInAction(() => {
        this.crowdState = StateEnum.Loading;
      });

      const response = await axios.get<CrowdApiType>(`${API_ENDPOINT}/crowd`, {
        params: {
          stream,
        },
        withCredentials: false,
      });

      const adaptedCrowd = await this.adaptCrowd(response.data);
      const detailedCrowd = await this.getDetails(adaptedCrowd);

      runInAction(() => {
        this.crowdState = StateEnum.Success;
        this.detailedCrowd = detailedCrowd;
      });
    } catch (error: any) {
      notify(error.message);
      this.crowdState = StateEnum.Error;
    }
  };

  adaptCrowd = async (crowd: CrowdApiType, withToken?: boolean): Promise<AdaptedCrowd> => {
    if (crowd.price) {
      if (crowd.price.length < 15) {
        crowd.price = '1000000000000000';
      }
    } else {
      crowd.price = '0';
    }
    // @ts-ignore
    const l1Dao = new window.web3.eth.Contract(DAO.abi, crowd.l1_vault);
    const price = await window.web3.utils.fromWei(crowd.price, 'ether');
    const total = await window.web3.eth.getBalance(crowd.l1_vault);
    const collected = +await window.web3.utils.fromWei(total, 'ether');
    let tokenTicker = '';
    if (withToken) {
      tokenTicker = await l1Dao.methods.getTokenTicker().call();
    }

    let percentage = Math.ceil((collected / +price) * 100);

    if (percentage > 100 || crowd.status === 'complete') {
      percentage = 100;
    }

    return {
      ...crowd,
      collected,
      percentage,
      price,
    }
  };

  getDetails = (crowd: AdaptedCrowd): DetailedCrowd => {
    const { address } = chainStore;

    const deposits = crowd.deposits.map(item => ({
      address: item.address,
      total_deposit: +window.web3.utils.fromWei(item.total_deposit.toString(), 'ether'),
    }))

    const myDeposite = crowd.deposits.find(item => item.address === address)

    let myFound = 0;

    if (myDeposite) {
      myFound = +window.web3.utils.fromWei(myDeposite.total_deposit.toString(), 'ether');
    }
    let leftovers = 0;
    if (crowd.status === 'complete' && crowd.collected > 0) {
      leftovers = crowd.collected;
    }

    return {
      ...crowd,
      myFound,
      deposits,
      leftovers
    }
  }

  getPreview = async (item: string) => {
    try {
      this.createCrowdState = StateEnum.Loading;

      const response = await axios.get<PreviewApiType>(`${API_ENDPOINT}/item/details`, {
        params: {
          item,
        },
        withCredentials: false,
      });

      runInAction(() => {
        this.crowdPreview = response.data;
        this.createCrowdState = StateEnum.Success;
      });
    } catch (error: any) {
      runInAction(() => {
        this.createCrowdState = StateEnum.Error;
      });
      notify(error.message);
    }
  };

  clearPreview = () => {
    runInAction(() => {
      this.crowdPreview = undefined;
    })
  }

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

  createCrowd = async (tokenId: string) => {
    try {
      const { address, factoryContract } = chainStore;

      runInAction(() => {
        this.createCrowdState = StateEnum.Loading;
      });

      let tokenName = '';

      const matches = this.crowdPreview?.name.match(/\b(\w)/g);
      if (matches) {
        tokenName = `CROWD_${matches.join('')}`;
      }

      //const initAmount = window.web3.utils.toWei('1000');
      let vaultAddress = '';
      let tokenAddress = '';

      const listener = (err: any, e: any) => {
        vaultAddress = e.returnValues.vault;
        tokenAddress = e.returnValues.tokenAddress;
      };

      await factoryContract.events.NewVault({}, listener);

      await factoryContract.methods
        .newVault(tokenName, tokenName, 100)
        .send({ from: address, value: 0 });

      await axios.post(`${API_ENDPOINT}/crowd`, {
        name: tokenName,
        l1_type: "ethereum",
        l1_vault: vaultAddress,
        l1_token: tokenAddress,
        proposal_total_threshold: 0.5,
        proposal_for_threshold: 0.5,
        proposal_timeout: 3600,
        pool_target: tokenId,
      });

      runInAction(() => {
        this.createCrowdState = StateEnum.Success;
      });
    } catch (error: any) {
      notify(error.message);
      runInAction(() => {
        this.createCrowdState = StateEnum.Error;
      });
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
        crowd: daoStream,
        amount: value,
      });

      runInAction(() => {
        this.donateState = StateEnum.Success;
      });
    } catch (error: any) {
      notify(error.message);
      this.donateState = StateEnum.Error;
    }
  };

  withdraw = async (amount: string) => {
    try {
      runInAction(() => {
        this.donateState = StateEnum.Loading;
      });

      const { address } = chainStore;

      // @ts-ignore
      const l1Dao = new window.web3.eth.Contract(DAO.abi, this.detailedCrowd.l1_vault);
      const weiAmount = window.web3.utils.toWei(amount);
      await l1Dao.methods.withdrawDeposit(weiAmount).send({ from: address });

      await axios.post(`${API_ENDPOINT}/withdraw`, {
        address,
        crowd: this.detailedCrowd.ceramic_stream,
        amount: weiAmount,
      });

      runInAction(() => {
        this.donateState = StateEnum.Success;
      });
    } catch (error: any) {
      runInAction(() => {
        this.donateState = StateEnum.Error;
      });

      notify(error.message);
    }
  }
  //#endregion

  //#region proposals
  getProposals = async (daoStream: string) => {
    try {
      runInAction(() => {
        this.proposalState = StateEnum.Loading;
      });

      const response = await axios.get<ApiResponse<ProposalApiType>>(`${API_ENDPOINT}/proposal`, {
        params: {
          crowd: daoStream,
          offset: this.proposalPage * this.proposalLimit,
          limit: this.proposalLimit,
        }
      });

      const newProposals: AdaptedProposal[] = [];

      await Promise.all(response.data.items.map(async (item: ProposalApiType) => {
        if (item.type === ProposalTypeEnum.Sell) {
          const adaptedProposal = await this.adaptProposal(item);
          if (adaptedProposal) {
            newProposals.push(adaptedProposal);
          }
        }
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

  adaptProposal = async (proposal: ProposalApiType): Promise<AdaptedProposal | undefined> => {
    const voteData = await this.getVotesData(proposal.stream);
    const ethPrice = window.web3.utils.fromWei(proposal.price, 'ether');

    if (voteData) {
      let ethAmount = '';
      let type: VotingType | null = null;

      if (proposal.status === ProposalStatusEnum.Success) {
        type = 'success';
      } else if (proposal.status === ProposalStatusEnum.Fail) {
        type = 'noSuccess';
      } else {
        if (!voteData.address) {
          type = 'liveNotVote';
        } else if (proposal.options[voteData.option] === 'Against') {
          type = 'liveVoteAgainst';
        } else {
          type = 'liveVoteFor'
          ethAmount = window.web3.utils.fromWei(voteData.amount, 'ether')
        }
      }
      
      let voted = 0;
      let against = 0;

      if (proposal.voted) {
        voted = Math.round(proposal.voted * 1000) / 10;
      }

      if (proposal.against) {
        against = Math.round(proposal.against * 1000) / 10;
      }

      return {
        price: ethPrice,
        till: proposal.till,
        votingPower: ethAmount,
        options: proposal.options,
        type,
        proposal: proposal.stream,
        voted,
        against
      };
    }
  };

  getVotesData = async (proposalStream: string): Promise<VoteApiType | undefined> => {
    try {
      const { address } = chainStore;
      const response = await axios.get<VoteApiType>(`${API_ENDPOINT}/vote`, {
        params: {
          proposal: proposalStream,
          address, 
        },
      });
      return response.data;
    } catch (error: any) {
      notify(error.message);
    }
  };

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

      const response = await axios.post<{proposal: string}>(`${API_ENDPOINT}/proposal`, {
        crowd: daoStream,
        asset: this.detailedCrowd.item,
      });

      await this.makeVote(response.data.proposal, 0, price);

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

      let newAmount = '';

      if (amount === 'same') {
        newAmount = this.proposalsList[0].price;
      } else if (amount === 'null') {
        newAmount = '';
      } else {
        newAmount = window.web3.utils.toWei(amount, 'ether');
      }

      const { address } = chainStore;

      await axios.post(`${API_ENDPOINT}/vote`, {
        address,
        proposal: proposalStream,
        option,
        amount: newAmount,
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
}

export default new DaoStore();
