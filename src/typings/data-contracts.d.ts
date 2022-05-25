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
}