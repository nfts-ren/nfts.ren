import {useContractCall, useEthers} from "../../_snowpack/pkg/@usedapp/core.js";
import {createContainer} from "../../_snowpack/pkg/unstated-next.js";
import {
  NFTPolygonABI,
  ClaimABI,
  useNFTPolygonContract,
  useClaimContract
} from "./useContract.js";
import {useConnectWeb3OnLoad} from "./useConnectWeb3OnLoad.js";
import {Buffer} from "../../_snowpack/pkg/buffer.js";
import EpochData1 from "./merkle/1.json.proxy.js";
import EpochData2 from "./merkle/2.json.proxy.js";
import EpochData3 from "./merkle/3.json.proxy.js";
import EpochData4 from "./merkle/4.json.proxy.js";
import EpochData5 from "./merkle/5.json.proxy.js";
import EpochData6 from "./merkle/6.json.proxy.js";
import EpochData7 from "./merkle/7.json.proxy.js";
import EpochData8 from "./merkle/8.json.proxy.js";
import EpochData9 from "./merkle/9.json.proxy.js";
import EpochData10 from "./merkle/10.json.proxy.js";
import EpochData11 from "./merkle/11.json.proxy.js";
import EpochData12 from "./merkle/12.json.proxy.js";
import EpochData13 from "./merkle/13.json.proxy.js";
import EpochData14 from "./merkle/14.json.proxy.js";
import {OrderedMap} from "../../_snowpack/pkg/immutable.js";
const epochData = OrderedMap().set(1, EpochData1).set(2, EpochData2).set(3, EpochData3).set(4, EpochData4).set(5, EpochData5).set(6, EpochData6).set(7, EpochData7).set(8, EpochData8).set(9, EpochData9).set(10, EpochData10).set(11, EpochData11).set(12, EpochData12).set(13, EpochData13).set(14, EpochData14);
export const tokenIdSeparator = 1e8;
const decodeBalance = ([balances, tokenIds]) => {
  if (!balances || !tokenIds) {
    return void 0;
  }
  let balanceMap = OrderedMap();
  for (let i = 0; i < balances.length; i++) {
    const tokenId = tokenIds[i].toNumber();
    const epochId = Math.floor(tokenId / tokenIdSeparator);
    const index = tokenId % tokenIdSeparator - 1;
    let epochBalances = balanceMap.get(epochId) || OrderedMap();
    epochBalances = epochBalances.set(index, balances[i].toNumber());
    balanceMap = balanceMap.set(epochId, epochBalances);
  }
  return balanceMap;
};
const decodeEpochData = (data, balances) => {
  if (!data) {
    return epochData;
  }
  let newEpochData = epochData;
  for (const epoch of data) {
    const id = epoch.id.toNumber();
    const current = epochData.get(id, void 0);
    const remaining = epoch.remaining.map((x) => x.toNumber());
    const tokenIds = epoch.remaining.map((x) => x.toNumber());
    const nfts = current.nfts.map((nft, i) => ({
      ...nft,
      claimed: nft.count - remaining[i],
      owned: balances ? balances.getIn([id, i], void 0) : void 0,
      tokenId: id * tokenIdSeparator + i + 1
    }));
    newEpochData = newEpochData.set(id, {
      ...current,
      nfts,
      id,
      merkleRoot: Buffer.from(epoch.merkleRoot.slice(2), "hex"),
      remaining: epoch.remaining.map((x) => x.toNumber()),
      tokenIds: epoch.remaining.map((x) => x.toNumber()),
      tokenUrls: epoch.tokenUrls
    });
  }
  return newEpochData;
};
function useContractStateContainer() {
  useConnectWeb3OnLoad();
  const {account, chainId} = useEthers();
  const claimContract = useClaimContract(chainId);
  const nftPolygonContract = useNFTPolygonContract(chainId);
  const accountBalanceRaw = decodeBalance(useContractCall(account && claimContract?.address && nftPolygonContract?.address ? {
    abi: NFTPolygonABI,
    address: nftPolygonContract.address,
    args: [account],
    method: "balanceOfAll"
  } : void 0) || []);
  const epochDetails = decodeEpochData((useContractCall(claimContract?.address ? {
    abi: ClaimABI,
    address: claimContract.address,
    args: [],
    method: "getEpochs"
  } : void 0) || [])[0], accountBalanceRaw);
  return {
    loading: accountBalanceRaw === void 0,
    account,
    loggedIn: !!account,
    epochDetails
  };
}
export const UseContractState = createContainer(useContractStateContainer);
