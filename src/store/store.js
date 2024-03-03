import { createStore } from "redux";
import rootReducer from "../services/reducers";
const store = createStore(rootReducer)
export default store