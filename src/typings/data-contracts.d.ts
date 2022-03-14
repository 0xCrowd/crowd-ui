type Deposits = {
  address: string;
  total_deposit: string;
};

type CrowdTarget = {
  id: 6;
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
  status: CrowdStatusType;
  target: CrowdTarget;
  collected: string;
  deposits: Deposits[];
  created: string;
};

type CrowdStatusType =
  | "active"
  | "complete"
  | "failed"
  | "resolved"
  | "on_execution";

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
  crowd: string;
  stream: string;
  title: string;
  description: string;
  asset: string;
  till: string;
  price: string;
  voted: number | null;
  against: number | null;
  status: ProposalStatusEnum;
  type: ProposalTypeEnum;
  options: [];
  fulfilled: boolean;
  created: string;
};

type VoteApiType = {
  address: string;
  proposal: string;
  amount: string;
  voting_power: string;
  option: number;
};
