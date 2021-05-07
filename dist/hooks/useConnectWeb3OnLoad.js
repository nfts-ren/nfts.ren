import {useEthers} from "../../_snowpack/pkg/@usedapp/core.js";
import {useEffect, useState} from "../../_snowpack/pkg/react.js";
import {isMobile} from "../../_snowpack/pkg/react-device-detect.js";
import {InjectedConnector} from "../../_snowpack/pkg/@web3-react/injected-connector.js";
import {PolygonNetworks} from "./types.js";
export const injected = new InjectedConnector({
  supportedChainIds: [PolygonNetworks.Mainnet, PolygonNetworks.Mumbai]
});
export function useConnectWeb3OnLoad() {
  const {activateBrowserWallet, account} = useEthers();
  const [tried, setTried] = useState(false);
  useEffect(() => {
    injected.isAuthorized().then((isAuthorized) => {
      if (!account && isAuthorized) {
        activateBrowserWallet();
      } else {
        if (isMobile && window.ethereum) {
          activateBrowserWallet();
        } else {
          setTried(true);
        }
      }
    });
  }, [activateBrowserWallet]);
  useEffect(() => {
    if (account) {
      setTried(true);
    }
  }, [account]);
  return tried;
}
