import { auth, googleProvider } from "../../services/firebase";
import { CHECK_AUTH, SET_LOADING, SET_USER } from "./constan";

export const setLoading = (status = false) => ({
  type: SET_LOADING,
  value: status,
});

export const setUser = (data) => ({ type: SET_USER, value: data });

export const resetUser = () => ({ type: CHECK_AUTH });

export const checkUser = () => async (dispatch) => {
  auth().onAuthStateChanged((authenticate) => {
    console.log({ authenticate });
    if (authenticate) {
      dispatch(setUser({ uid: authenticate.uid, email: authenticate.email }));
    }
  });
};

export const signOut = () => async (dispatch) => {
  auth()
    .signOut()
    .then(() => {
      dispatch(setUser(null));
      dispatch(resetUser());
    })
    .catch((e) => {
      console.log({ e });
    });
};
export const signinWithGoogle = () => async (dispatch) => {
  auth()
    .signInWithPopup(googleProvider)
    .then((result) => {
      console.log({ result });
    })
    .catch((error) => {
      console.log({ error });
    });
};
