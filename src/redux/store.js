import { createStore } from "redux";
import { applyMiddleware } from "redux";
import reducer from "./reducer";
const thunkMiddleware = require("redux-thunk").default;
let store = createStore(reducer, applyMiddleware(thunkMiddleware));

export default store;
