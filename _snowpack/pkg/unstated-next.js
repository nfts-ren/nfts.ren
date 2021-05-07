import { r as react } from './common/index-d5182917.js';
import './common/_commonjsHelpers-c99fd594.js';

function createContainer(useHook) {
  var Context = react.createContext(null);

  function Provider(props) {
    var value = useHook(props.initialState);
    return react.createElement(Context.Provider, {
      value: value
    }, props.children);
  }

  function useContainer() {
    var value = react.useContext(Context);

    if (value === null) {
      throw new Error("Component must be wrapped with <Container.Provider>");
    }

    return value;
  }

  return {
    Provider: Provider,
    useContainer: useContainer
  };
}

export { createContainer };
