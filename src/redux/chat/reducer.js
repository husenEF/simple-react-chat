import { GET_DATA, SEND_DATA } from "./constan";

const initalState = {
  chats: [],
  opposite: null,
  loading: false,
};

const chatReducer = (state = initalState, action) => {
  switch (action.type) {
    case SEND_DATA:
      return { ...state, loading: false };
    case GET_DATA:
      return { ...state, chats: action.value };
    default:
      return state;
  }
};

export default chatReducer;
