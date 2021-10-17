import Web3 from "web3";
import { ProviderMessage, ProviderRpcError, ProviderConnectInfo, RequestArguments } from 'hardhat/types';

declare const __DEV__: boolean;
declare const __PROD__: boolean;
declare const __CONFIG__: {
  port: number;
};

interface EthereumEvent {
    connect: ProviderConnectInfo;
    disconnect: ProviderRpcError;
    accountsChanged: Array<string>;
    chainChanged: string;
    message: ProviderMessage
}

type EventKeys = keyof EthereumEvent;
type EventHandler<K extends EventKeys> = (event: EthereumEvent[K]) => void;

interface Ethereumish {
    autoRefreshOnNetworkChange: boolean;
    chainId: string;
    isMetaMask?: boolean;
    isStatus?: boolean;
    networkVersion: string;
    selectedAddress: any;

    on<K extends EventKeys>(event: K, eventHandler: EventHandler<K>): void;
    enable(): Promise<any>;
    request?: (request: { method: string, params?: Array<any> }) => Promise<any>
    /**
     * @deprecated
     */
    send?: (request: { method: string, params?: Array<any> }, callback: (error: any, response: any) => void) => void
    sendAsync: (request: RequestArguments) => Promise<unknown>
}

declare global {
  interface Window {
    web3: Web3;
    ethereum: Ethereumish;
  }
}
