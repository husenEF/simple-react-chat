import { auth } from "../../services/firebase";
import { SET_LOADING, SET_USER } from "./constan";

export const setLoading = (status = false) => ({
  type: SET_LOADING,
  value: status,
});

export const setUser = (data) => ({ type: SET_USER, value: data });

export const checkUser = () => async (dispatch) => {
  auth().onAuthStateChanged((authenticate) => {
    console.log({ authenticate });
    if (authenticate) {
      dispatch(setUser({ uid: authenticate.uid, email: authenticate.email }));
    }
  });
};
