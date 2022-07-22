import { ProposalChoice } from './../enums/proposal-choice-enum/index';
declare global {
  type Deposits = {
    address: string;
    amount: number;
  };

  type CrowdTarget = {
    address: string;
    network: "ethereum";
    type: "currency" | "nft";
    name: string;
    media: string;
    mediaType: string;
    price: string;
  };

  type CrowdApiType = {
    id: number;
    fundraising: number;
    status: CrowdStatusType;
    target: CrowdTarget;
    collected: string;
    deposits: Deposits[];
    created: string;
  };

  type CrowdStatusType =
    | "active"
    | "success"
    | "failed"
    | "resolved"
    | "processing";

  type ApiResponse<T> = {
    items: T[];
    status: string;
    total: number;
  };

  type HealthResponse = {
    gas_tank_state: {
      capacity: string;
      amount: string;
      delta: string;
    };
    amount: string;
    capacity: string;
    delta: string;
    pottery_provider_status: string;
    pottery_registry: string;
    service_status: string;
  };

  type PreviewApiType = {
    name: string;
    media: string;
    mediaType: string;
    price: string;
  };

  type ProposalApiType = {
    proposal: ProposalType,
    vote: VoteType
  };

  type ProposalType = {
    id: number,
    asset: number,
    member: number;
    status: "live" | "completed" | "canceled";
    average_price: string;
    required_quorum: string;
    reached_quorum: string;
    required_quorum_for: string;
    reached_quorum_against: string;
    votes: number[];
    created: string;
  }

  type VoteType = {
    choice: "for" | "against" | "";
    price: string;
    vote_power: string;
    have_permission: boolean;
    already_voted: boolean;
  };

  type ProposalData = {
    crowd: number;
    address: string;
    network: "ethereum"
  };

  type WithdrawData = { crowd: number; user: string; amount?: string; };
  type WithdrawResponse = { id: number; fundraising: number; };

  type CreateCrowdData = { target: string; };
  type CreateCrowdResponse = { id: number; fundraising: number; };

  type CreateProposalData = {
    crowd: number;
    user: string;
    price: string;
  };
  type CreateProposalResponse = { proposal: string; };

  type MakeProposalVoteData = {
    user: string;
    proposal: number;
    choice: ProposalChoice;
    price: string;
  }

  type CorwdTargetV2 = {
    collection: address; // Адрес коллекции, на NFT из которой идет сбор
    id: number; // NFT id
    buyoutPrice: number; // До момента выкупа 0, после - цена выкупа
    resalePrice: nuymber; // До момента перепродажи 0, после - цена перепродажи
  }
  
  type CrowdResale = {
    votesFor: number; // Voting power "за" перепродажу
    votesAgainst: number; // Voting power "против" перепродажу
    avgResalePrice: number; // Средняя цена перепродажи, за которую проголосовали
  }
  
  type CrowdV2 = {
    status: number; // 0 - FUNDRAISING, 1 - BUYOUT, 2 - ON_SALE, 3 - RESOLD
    target: CorwdTargetV2;
    resale: CrowdResale;
    vault: address; // Адрес хранилища, подключенного к Crowd (хранит ассеты)
    collected: number; // Сумма, собранная во время фандрейзинга. Уменьшается только при выводе на этапе FUNDRAISING
  }
}
