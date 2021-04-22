import { combineReducers } from "redux";
import userReducer from "./users/reducer";
import chatReducer from "./chat/reducer";

const initialState = {
  isLogin: true,
  counter: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "INC":
      return { ...state, counter: state.counter + 1 };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user: userReducer,
  chat: chatReducer,
  demo: reducer,
});

export default rootReducer;
