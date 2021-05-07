import {useState} from "../../_snowpack/pkg/react.js";
import {
  shortenTransactionHash,
  useEthers,
  useTransactionsContext
} from "../../_snowpack/pkg/@usedapp/core.js";
import {toast} from "../../_snowpack/pkg/react-toastify.js";
export function useContractFunction(contract, functionName, description) {
  const [state, setState] = useState({status: "None"});
  const {addTransaction} = useTransactionsContext();
  const {chainId} = useEthers();
  let transaction;
  const send = async (...args) => {
    if (!chainId) {
      return false;
    }
    try {
      transaction = await contract[functionName](...args);
      setState({transaction, status: "Mining", chainId});
      const date = Date.now();
      addTransaction({
        transaction: {
          ...transaction,
          chainId
        },
        submittedAt: date,
        description
      });
      const receipt = await transaction.wait();
      if (receipt.status === 0) {
        toast(`Error: ${description} (${shortenTransactionHash(transaction.hash)})`, {autoClose: 1e4, type: "error"});
      } else {
        toast(`Confirmed: ${description} (${shortenTransactionHash(transaction.hash)})`, {autoClose: 1e4});
      }
      setState({receipt, transaction, status: "Success", chainId});
      return true;
    } catch (e) {
      console.error(e);
      if (transaction) {
        setState({
          status: "Fail",
          transaction,
          receipt: e.receipt,
          errorMessage: e.reason || e.message,
          chainId
        });
      } else {
        setState({
          status: "Exception",
          errorMessage: e.reason || e.message,
          chainId,
          rejected: e?.code === 4001
        });
      }
      return false;
    }
  };
  return {send, state};
}
