type IDeposits = {
  address: string;
  total_deposit: number;
};

type CrowdApiType = {
  ceramic_stream: string;
  created: string;
  deposits: IDeposits[];
  item: string;
  l1_token: string;
  l1_type: string;
  l1_vault: string;
  media: string;
  name: string;
  price: string;
  proposals_registry: string;
  status: CrowdStatusType;
};

type CrowdStatusType = 'active' | 'complete' | 'failed' | 'resolved' | "on_execution";

type ApiResponse<T> = {
  items: T[];
  status: string;
  total: number;
}

type HealthResponse = {
  gas_tank_state: {
    capacity: string;
    amount: string;
    delta: string;
  }
  amount: string;
  capacity: string;
  delta: string;
  pottery_provider_status: string;
  pottery_registry: string;
  service_status: string;
}

type PreviewApiType = {
  name: string;
	description: string;
	media: string;
	media_type: string;
	price: string;
}

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
}

type VoteApiType = {
  address: string;
  proposal: string;
  amount: string;
  voting_power: string;
  option: number;
}
