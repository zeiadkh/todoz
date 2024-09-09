import { combineReducers } from "redux";
import authReducer from "./authReducer";
import themeReducer from "./themeReducer";
import tasksReducer from "./taskReducer";
const mainReducer = combineReducers({auth: authReducer, theme: themeReducer, tasks: tasksReducer})
export default mainReducer;