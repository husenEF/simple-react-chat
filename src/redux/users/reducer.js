import { GET_DATA, SEND_DATA, SET_LOADING, SET_USER } from "./constan";

const initalState = {
  user: null,
  isLogin: false,
  loading: false,
};

const userReducer = (state = initalState, action) => {
  console.log({ action });
  switch (action.type) {
    case SEND_DATA:
      return { ...state, loading: false };
    case GET_DATA:
      return { ...state, chats: action.value };
    case SET_LOADING:
      return { ...state, loading: action.value };
    case SET_USER:
      return { ...state, user: action.value };
    default:
      return state;
  }
};

export default userReducer;
