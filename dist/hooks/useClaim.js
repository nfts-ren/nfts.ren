import {useCallback} from "../../_snowpack/pkg/react.js";
import {useEthers} from "../../_snowpack/pkg/@usedapp/core.js";
import AbiCoder from "../../_snowpack/pkg/web3-eth-abi.js";
import {keccak256} from "../../_snowpack/pkg/ethereumjs-util.js";
import {OrderedMap} from "../../_snowpack/pkg/immutable.js";
import MerkleTree from "../../_snowpack/pkg/merkle-tree-solidity.js";
import {useClaimContract} from "./useContract.js";
import {Buffer} from "../../_snowpack/pkg/buffer.js";
import {UseContractState} from "./useContractState.js";
import {useContractFunction} from "./useContractFunction.js";
export const useClaim = () => {
  const {account, chainId, library} = useEthers();
  const {epochDetails} = UseContractState.useContainer();
  const claimContract = useClaimContract(chainId);
  const {send, state} = useContractFunction(claimContract, "claim", "Claim");
  const claim = useCallback(async (epochId, epochSeriesIndex) => {
    const epoch = epochDetails.get(epochId);
    if (!account || !epoch) {
      return;
    }
    const operators = OrderedMap(epoch.operators);
    const abiCoder = AbiCoder;
    const elements = operators.map((count, address) => {
      const concatenated = Buffer.from(abiCoder.encodeParameters(["address", "uint256"], [address.toLowerCase(), count]).slice(2), "hex");
      return keccak256(concatenated);
    });
    const merkleTree = new MerkleTree(elements.valueSeq().toArray());
    const merkleRoot = merkleTree.getRoot();
    const share = operators.get(account.toLowerCase());
    const hash = keccak256(Buffer.from(abiCoder.encodeParameters(["address", "uint256"], [account.toLowerCase(), share]).slice(2), "hex"));
    const proof = merkleTree.getProof(hash);
    return await send(epochId, proof, share, [epochSeriesIndex]);
  }, []);
  return {
    claim,
    state
  };
};
