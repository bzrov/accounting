import { combineReducers } from "redux";
import { listReducer } from "./listReducer";
import { languageReducer } from "./languageReducer";

export const rootReducer = combineReducers({
    list: listReducer,
    dictionary: languageReducer,
})