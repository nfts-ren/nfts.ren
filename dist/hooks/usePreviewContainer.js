import {useState} from "../../_snowpack/pkg/react.js";
import {createContainer} from "../../_snowpack/pkg/unstated-next.js";
const usePreview = () => {
  let [image, setImage] = useState(null);
  return {image, setImage};
};
let PreviewContainer = createContainer(usePreview);
export default PreviewContainer;
