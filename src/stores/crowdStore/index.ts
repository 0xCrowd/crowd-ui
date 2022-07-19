import { getCrowd } from './../../api/crowd';
import BigNumber from "bignumber.js";
import { makeAutoObservable, runInAction } from "mobx";

import chainStore from "@stores/chainStore";

import { StateEnum } from "@enums/state-enum/index";
import { notify } from "@app/utils/notify";
import { toEth } from "@app/utils/toEth";
import { api } from "@app/api";
import { toWei } from "@app/utils/toWei";

class CrowdStore {
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

  // crowdTotal = 0;

  // getCrowdTotal = async () => {
  //   try {
  //     const { crowdMangerContract } = chainStore;
  //     const resp = await crowdMangerContract.methods.crowdsTotal();
  //     console.log(resp, 'resp');
  //     runInAction(() => {
  //       this.crowdTotal = resp;
  //     })
  //   } catch (error) { }
  // };

  // getCrowdListV2 = async () => {
  //   try {
  //     const { crowdMangerContract } = chainStore;
  //     const crowds = [];
  //     for (let i = 0; i <= this.crowdTotal; i++) {
  //       const crowd = await crowdMangerContract.methods.getCrowd(i);
  //       const adaptedCrowd = await this.adaptCrowdV2(crowd);
  //       crowds.push(adaptedCrowd);
  //     }
  //   } catch (error) {}
  // };

  // adaptCrowdV2 = async (crowd: CrowdV2): Promise<AdaptedCrowd | undefined> => {
  //   try {
  //     const data = await api.looksRare.getData({ params: { crowdId: 0 } });
  //     return {
  //       priceEth: 0,
  //       status: 'active',
  //       id: 0,
  //       deposits: [],
  //       fundraising: 0,
  //       name: '',
  //       media: '',
  //       percentage: 100,
  //     };
  //   } catch (error) {}
  // };

  getCrowdList = async (address?: string) => {
    try {
      if (this.crowdPage === 0) {
        this.loadedCrowds = 0;
        this.crowdState = StateEnum.Loading;
      }

      const response = await api.crowd.getCrowds({
        params: {
          offset: this.crowdPage * this.crowdLimit,
          limit: this.crowdLimit,
          user: address,
        },
      });

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

      const response = await api.crowd.getCrowd({
        params: {
          id,
        },
      });

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
      status: crowd.status || 'failed',
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
      myFoundEth = new BigNumber(myDeposit.amount).dp(5).toNumber();
      myFoundWei = new BigNumber(toWei(myDeposit.amount.toString()));
    }

    if (crowd.status === "success" && collectedWei.isGreaterThan(0)) {
      const fraction = myFoundWei.dividedBy(priceWei);
      leftoversWei = leftoversWei.multipliedBy(fraction);
      leftovers = toEth(leftovers.toString());
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
      console.log(item, 'item');
      this.createCrowdState = StateEnum.Loading;

      const response = await api.crowd.getCrowdPreview({
        params: {
          item,
        },
      });

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

      const response = await api.crowd.createCrowd({ target });

      runInAction(() => {
        this.createCrowdState = StateEnum.Success;
      });

      return response.data.id;
    } catch (error: any) {
      notify(error.message);
      runInAction(() => {
        this.createCrowdState = StateEnum.Error;
      });
    }
  };
}

export default new CrowdStore();
