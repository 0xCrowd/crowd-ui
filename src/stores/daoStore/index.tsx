import axios from "axios";
import BigNumber from "bignumber.js";
import { ethers } from "ethers";
import { makeAutoObservable, runInAction } from "mobx";

import chainStore from "@stores/chainStore";

import { StateEnum } from "@enums/state-enum/index";
import { ProposalStatusEnum } from "@app/enums/proposal-status-enum";
import { ProposalTypeEnum } from "@app/enums/proposal-type-Enum";
import { ProposalChoice } from "@app/enums/proposal-choice-enum";
import { notify } from "@app/utils/notify";
import { toEth } from "@app/utils/toEth";
import { toNumber } from "lodash";

const NEW_API_ENDPOINT = "https://crowd-api-e43tw.ondigitalocean.app";
const API_ENDPOINT = "https://crowd-protocol-master-9iojf.ondigitalocean.app";

class DaoStore {
  constructor() {
    makeAutoObservable(this);
  }

  loadedCrowds: number = 0;
  totalCrowds = 0;
  crowdPage = 0;
  crowdLimit = 12;
  crowds: AdaptedCrowd[] = [];
  detailedCrowd!: DetailedCrowd;
  crowdState = StateEnum.Loading;
  detailedCrowdState = StateEnum.Loading;

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

      const response = await axios.get<ApiResponse<CrowdApiType>>(
        `${NEW_API_ENDPOINT}/crowd`,
        {
          params: {
            offset: this.crowdPage * this.crowdLimit,
            limit: this.crowdLimit,
            user: address,
          },
          withCredentials: false,
        }
      );

      runInAction(() => {
        this.loadedCrowds += response.data.items.length;
      });

      let crowds: AdaptedCrowd[] = response.data.items.map(this.adaptCrowd);

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

  getCrowd = async (id: string) => {
    try {
      runInAction(() => {
        this.detailedCrowdState = StateEnum.Loading;
      });

      const response = await axios.get<CrowdApiType>(
        `${NEW_API_ENDPOINT}/crowd`,
        {
          params: {
            id,
          },
          withCredentials: false,
        }
      );

      runInAction(() => {
        this.detailedCrowdState = StateEnum.Success;
        this.detailedCrowd = this.getDetailsCrowd(response.data);
      });
    } catch (error: any) {
      notify(error.message);
      runInAction(() => {
        this.detailedCrowdState = StateEnum.Error;
      });
    }
  };

  adaptCrowd = (crowd: CrowdApiType): AdaptedCrowd => {
    const { price, media, name } = crowd.target;

    let priceWei: BigNumber;
    let priceEth = 0;

    if (price) {
      if (price.length < 15) {
        priceEth = toEth("1000000000000000");
        priceWei = new BigNumber("1000000000000000");
      } else {
        priceEth = toEth(price);
        priceWei = new BigNumber(price);
      }
    } else {
      priceEth = 0;
      priceWei = new BigNumber("0");
    }

    const collectedWei = new BigNumber(crowd.collected || "0");

    // if (crowd.status === 'complete' || crowd.status === 'resolved') {
    //   price = toNumber(window.web3.utils.fromWei(crowd.last_proposal_price, 'ether'));
    // }

    let percentage = Math.ceil(
      collectedWei.dividedBy(priceWei).multipliedBy(100).toNumber()
    );

    if (
      percentage > 100 ||
      crowd.status === "success" ||
      crowd.status === "resolved"
    ) {
      percentage = 100;
    }

    return {
      id: crowd.id,
      fundraising: crowd.fundraising,
      status: crowd.status,
      deposits: crowd.deposits || [],
      priceEth,
      percentage,
      name,
      media,
    };
  };

  getDetailsCrowd = (crowd: CrowdApiType): DetailedCrowd => {
    const adaptedCrowd = this.adaptCrowd(crowd);
    const { address } = chainStore;
    const myDeposit = adaptedCrowd.deposits.find(
      (item) => item.address === address
    );

    let myFoundEth = 0;
    let myFoundWei = new BigNumber(0);
    let leftoversWei = new BigNumber(0);
    let leftovers = 0;
    let priceWei = new BigNumber(0);

    const price = crowd.target.price;

    if (price) {
      if (price.length < 15) {
        priceWei = new BigNumber("1000000000000000");
      } else {
        priceWei = new BigNumber(price);
      }
    } else {
      priceWei = new BigNumber("0");
    }

    const collectedWei = new BigNumber(crowd.collected || "0");

    if (myDeposit) {
      myFoundEth = myDeposit.amount;
      myFoundWei = new BigNumber(window.web3.utils.toWei(myDeposit.amount.toString(), 'ether'));
    }

    if (crowd.status === "success" && collectedWei.isGreaterThan(0)) {
      const fraction = myFoundWei.dividedBy(priceWei);
      leftoversWei = collectedWei.multipliedBy(fraction);
      leftovers = toEth(leftoversWei.toString());
    }

    return {
      ...adaptedCrowd,
      myFoundEth,
      myFoundWei,
      leftovers,
      priceWei,
      collectedWei,
      collectedEth: toEth(crowd.collected),
      item: crowd.target.address,
    };
  };

  getPreview = async (item: string) => {
    try {
      this.createCrowdState = StateEnum.Loading;

      const response = await axios.get<PreviewApiType>(
        `${NEW_API_ENDPOINT}/crowd/preview`,
        {
          params: {
            item,
          },
          withCredentials: false,
        }
      );

      if (Object.keys(response.data).length) {
        runInAction(() => {
          this.crowdPreview = response.data;
          this.createCrowdState = StateEnum.Success;
        });
      } else {
        throw new Error("Wrong NFT");
      }
    } catch (error: any) {
      runInAction(() => {
        this.createCrowdState = StateEnum.Error;
      });
      notify(error.message);
    }
  };

  resetLoadingStatus = () => {
    runInAction(() => {
      this.detailedCrowdState = StateEnum.Loading
    })
  }

  clearPreview = () => {
    runInAction(() => {
      this.crowdPreview = undefined;
    });
  };

  loadMoreCrowds = async (address?: string) => {
    try {
      this.crowdPage += 1;

      this.getCrowdList(address);
    } catch (error: any) {
      notify(error.message);
      runInAction(() => {
        this.crowdState = StateEnum.Error;
      });
    }
  };

  clearPage = () => {
    this.crowdPage = 0;
  };

  createCrowd = async (target: string) => {
    try {
      runInAction(() => {
        this.createCrowdState = StateEnum.Loading;
      });

      // const matches = this.crowdPreview?.name.match(/\b(\w)/g);
      // if (matches) {
      //   tokenName = `CROWD_${matches.join("")}`;
      // }

      const response = await axios.post(`${NEW_API_ENDPOINT}/crowd/new`, {
        target,
      });

      // await this.makeMyCrowd(response.data.stream, address);

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

  donate = async (amount: string, fundraisingId: number) => {
    try {
      runInAction(() => {
        this.donateState = StateEnum.Loading;
      });

      const { address, vaultContract, blockChainState } = chainStore;


      if (blockChainState === StateEnum.Success) {

        const weiAmount = await window.web3.utils.toWei(amount, "ether");

        await vaultContract.methods
          .deposit(fundraisingId)
          .send({ from: address, value: weiAmount });

        runInAction(() => {
          this.donateState = StateEnum.Success;
        });
      } else {
        throw new Error("blockchain dont load");
      }
    } catch (error: any) {
      notify(error.message)
      runInAction(() => {
        this.donateState = StateEnum.Error;
      });
    }
  };

  withdraw = async (amount: string, fundraisingId: number, all?: boolean) => {
    try {
      runInAction(() => {
        this.donateState = StateEnum.Loading;
      });

      const { address, vaultContract, blockChainState } = chainStore;

      if (blockChainState === StateEnum.Success) {
        const weiAmount = window.web3.utils.toWei(amount);
        await vaultContract.methods
          .withdraw(fundraisingId, weiAmount, all)
          .send({ from: address });

        runInAction(() => {
          this.donateState = StateEnum.Success;
        });
      } else {
        throw new Error("blockchain dont load");
      }
    } catch (error: any) {
      runInAction(() => {
        this.donateState = StateEnum.Error;
      });

      notify(error.message);
    }
  };

  makeMyCrowd = async (crowdStream: string, address: string) => {
    await axios.post(`${API_ENDPOINT}/my_crowd`, {
      address,
      crowd_stream: crowdStream,
    });
  };
  //#endregion

  //#region proposals
  getProposals = async (crowdId: string) => {
    try {
      runInAction(() => {
        this.proposalState = StateEnum.Loading;
      });

      const { address } = chainStore;

      const response = await axios.post<ProposalApiType[]>(
        `${NEW_API_ENDPOINT}/proposal`,
        {
          crowd: toNumber(crowdId),
          address,
          network: "ethereum"
        }
      );

      const newProposals: AdaptedProposal[] = response.data.map((item: ProposalApiType) => {
        return this.adaptProposal(item);
      });

      runInAction(() => {
        this.proposalsList = newProposals;
        this.proposalState = StateEnum.Success;
      });
    } catch (error: any) {
      this.proposalState = StateEnum.Error;
      throw error;
    }
  };

  adaptProposal = ({ proposal, vote }: ProposalApiType): AdaptedProposal => {
    let type: VotingType = 'liveNotVote';
    if (proposal.status === 'canceled') {
      type = 'noSuccess';
    } else if (proposal.status === 'completed') {
      type = 'success';
    }

    if (vote.already_voted) {
      if (vote.choice === 'for') {
        type = 'liveVoteFor';
      } else if (vote.choice === 'against') {
        type = 'liveVoteAgainst';
      }
    }

    return {
      priceEth: toEth(proposal.average_price),
      priceWei: new BigNumber(proposal.average_price),
      type,
      id: proposal.id,
      till: '2022-05-30',
      against: toNumber(proposal.reached_quorum_against) * 100,
      all: toNumber(proposal.reached_quorum) * 100,
      myVote: toEth(vote.price)
    };
  };

  createProposal = async (crowdId: string, price: string) => {
    try {
      const { address } = chainStore;
      runInAction(() => {
        this.createProposalState = StateEnum.Loading;
      });

      await axios.post<{ proposal: string }>(
        `${NEW_API_ENDPOINT}/proposal/new`,
        {
          crowd: toNumber(crowdId),
          user: address,
          price: window.web3.utils.toWei(price, 'ether'),
        }
      );

      runInAction(() => {
        this.createProposalState = StateEnum.Success;
      });
    } catch (error: any) {
      notify(error.message);
      this.createProposalState = StateEnum.Error;
    }
  };

  makeVote = async (proposalStream: number, choice: ProposalChoice, amount: string) => {
    try {
      runInAction(() => {
        this.voteState = StateEnum.Loading;
      });

      const { address } = chainStore;

      await axios.post(`${NEW_API_ENDPOINT}/proposal/vote/new`, {
        user: address,
        proposal: proposalStream,
        choice,
        price: amount
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

  signMessage = async (message: string) => {
    try {
      if (!window.ethereum) {
        throw new Error("No crypto wallet found. Please install it.");
      }

      await window.ethereum.sendAsync({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const signature = await signer.signMessage(message);
      const address = await signer.getAddress();

      return {
        signature,
        address,
      };
    } catch (err) {
      throw err;
    }
  };
  //#endregion
}

export default new DaoStore();
