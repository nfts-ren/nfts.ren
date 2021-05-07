import copy from "../../_snowpack/pkg/copy-to-clipboard.js";
import {useCallback, useEffect, useState} from "../../_snowpack/pkg/react.js";
export default function useCopyClipboard(timeout = 500) {
  const [isCopied, setIsCopied] = useState(false);
  const staticCopy = useCallback((text) => {
    const didCopy = copy(text);
    setIsCopied(didCopy);
  }, []);
  useEffect(() => {
    if (isCopied) {
      const hide = setTimeout(() => {
        setIsCopied(false);
      }, timeout);
      return () => {
        clearTimeout(hide);
      };
    }
    return void 0;
  }, [isCopied, setIsCopied, timeout]);
  return [isCopied, staticCopy];
}
