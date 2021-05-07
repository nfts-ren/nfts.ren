import {useEthers} from "../../_snowpack/pkg/@usedapp/core.js";
import {Contract} from "../../_snowpack/pkg/@ethersproject/contracts.js";
import {ethers} from "../../_snowpack/pkg/ethers.js";
import {useMemo} from "../../_snowpack/pkg/react.js";
import {AddressZero} from "../../_snowpack/pkg/@ethersproject/constants.js";
import NFTPolygonJSON from "./ABIs/NFTPolygon.json.proxy.js";
import ClaimJSON from "./ABIs/Claim.json.proxy.js";
import {isAddress} from "../../_snowpack/pkg/ethers/lib/utils.js";
import {PolygonNetworks} from "./types.js";
export const NFTPolygonABI = new ethers.utils.Interface(NFTPolygonJSON);
export const ClaimABI = new ethers.utils.Interface(ClaimJSON);
const NFTPolygonAddress = {
  [PolygonNetworks.Mainnet]: "0x813fce94d1855BA440186c3b201a67BF13ae1a5a",
  [PolygonNetworks.Mumbai]: "0xb0b67A96aDbEb7Bb8294b2D388Ec5a75aCe3f600"
};
const ClaimAddress = {
  [PolygonNetworks.Mainnet]: "0x9Fd3DDb52EFa9718a8c4b807D836a011a99E8c19",
  [PolygonNetworks.Mumbai]: "0x8A06Bf92725a9F60dA6579193d0E97AC6A39D898"
};
export function getSigner(library, account) {
  return library.getSigner(account).connectUnchecked();
}
export function getProviderOrSigner(library, account) {
  return account ? getSigner(library, account) : library;
}
export function getContract(address, ABI, library, account) {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return new Contract(address, ABI, getProviderOrSigner(library, account));
}
export function useContract(address, ABI, withSignerIfPossible = true) {
  const {library, account} = useEthers();
  return useMemo(() => {
    if (!address || !ABI || !library)
      return null;
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : void 0);
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [address, ABI, library, withSignerIfPossible, account]);
}
export const useClaimContract = (network) => useContract(ClaimAddress[network], ClaimJSON, true);
export const useNFTPolygonContract = (network) => useContract(NFTPolygonAddress[network], NFTPolygonJSON, true);
