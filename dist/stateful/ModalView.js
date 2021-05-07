import React, {useCallback, useState} from "../../_snowpack/pkg/react.js";
import {createContainer} from "../../_snowpack/pkg/unstated-next.js";
function useModalContainer() {
  const [modal, setModal] = useState(void 0);
  const clearModal = useCallback(() => {
    setModal(void 0);
  }, [setModal]);
  return {
    modal,
    setModal,
    clearModal
  };
}
export const UseModal = createContainer(useModalContainer);
export const ModalView = () => {
  const {modal} = UseModal.useContainer();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, modal);
};
