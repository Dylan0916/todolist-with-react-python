
/**
 * how to turn default to named
 */

// export {default} from "./App"
// export {log0607} from "./util"

import App from "./App"
import log0607 from "./util"

export default App; //預設輸出，可更換命名
export {log0607}; //命名輸出

export const log0608 = () => {
    console.log("0608")
}
