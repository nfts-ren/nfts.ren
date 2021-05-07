import * as __SNOWPACK_ENV__ from '../../_snowpack/env.js';

import {ChainId} from "../../_snowpack/pkg/@usedapp/core.js";
import BigNumber from "../../_snowpack/pkg/bignumberjs.js";
import {WalletConnectConnector} from "../../_snowpack/pkg/@web3-react/walletconnect-connector.js";
import MetaMaskLogo from "./wallets/metamask.png.proxy.js";
import WalletConnectLogo from "./wallets/walletConnect.svg.proxy.js";
import {PolygonNetworks} from "./types.js";
const {
  SNOWPACK_PUBLIC_ETHEREUM_CHAIN_ID,
  SNOWPACK_PUBLIC_ETHEREUM_NODE
} = __SNOWPACK_ENV__;
const chainId = parseInt(SNOWPACK_PUBLIC_ETHEREUM_CHAIN_ID) || ChainId.Rinkeby;
const NETWORK_URL = SNOWPACK_PUBLIC_ETHEREUM_NODE;
export const ChainLabel = {
  [ChainId.Mainnet]: "Mainnet",
  [ChainId.Rinkeby]: "Rinkeby"
};
export const wallets = [
  {
    name: "MetaMask",
    icon: MetaMaskLogo
  },
  {
    name: "WalletConnect",
    icon: WalletConnectLogo,
    connector: new WalletConnectConnector({
      rpc: {[chainId]: SNOWPACK_PUBLIC_ETHEREUM_NODE},
      bridge: "https://bridge.walletconnect.org",
      qrcode: true,
      pollingInterval: 15e3
    }),
    desktopOnly: true
  }
];
export const connectors = {};
export const dappConfig = {
  readOnlyChainId: chainId,
  readOnlyUrls: {
    [chainId]: SNOWPACK_PUBLIC_ETHEREUM_NODE || ""
  },
  supportedChains: [chainId],
  multicallAddresses: {
    [PolygonNetworks.Mainnet]: "0x95028E5B8a734bb7E2071F96De89BABe75be9C8E",
    [PolygonNetworks.Mumbai]: "0x935Bfe9AfaA2Be26049ea4EDE40A3A2243361F87"
  }
};
export const getExplorerTransactionLink = (txHash, chainId2) => {
  if (chainId2 === PolygonNetworks.Mainnet) {
    return `https://explorer-mainnet.maticvigil.com/tx/${txHash}`;
  }
  if (chainId2 === PolygonNetworks.Mumbai) {
    return `https://explorer-mumbai.maticvigil.com/tx/${txHash}`;
  }
  return void 0;
};
export const getExplorerAddressLink = (address, chainId2) => {
  if (chainId2 === PolygonNetworks.Mainnet) {
    return `https://explorer-mainnet.maticvigil.com/address/${address}`;
  }
  if (chainId2 === PolygonNetworks.Mumbai) {
    return `https://explorer-mumbai.maticvigil.com/address/${address}`;
  }
  return void 0;
};
export const toBigNumber = (bn) => {
  return bn ? new BigNumber(bn.toString()) : void 0;
};
export const toBigNumbers = (bns) => {
  return bns ? bns.map((x) => toBigNumber(x)) : void 0;
};
export const toNumber = (bn) => {
  return bn ? bn.toNumber() : void 0;
};
export const toNumbers = (bns) => {
  return bns ? bns.map((x) => toNumber(x)) : void 0;
};
export const formatEther = (value, round, digits = 4) => formatToken(value, 18, round, digits);
export const formatToken = (value, decimals, round, digits = 4) => value !== void 0 && decimals !== void 0 ? value.isZero() ? "0" : value.dividedBy(new BigNumber(10).exponentiatedBy(decimals)).decimalPlaces(digits, round === "UP" ? BigNumber.ROUND_UP : BigNumber.ROUND_DOWN).toFixed() : void 0;
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
