import React, { useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";

import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./redux/store";

import { checkUser } from "./redux/users/action";
//firebase
// import { auth, db } from "./services/firebase";

import { Home, Chat, Login, Signup } from "./pages";

import "./App.css";

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

const PublicRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === false ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

const App = () => {
  const dispatch = useDispatch();

  const { isLogin, loading, user } = useSelector((state) => state.user);
  console.log("app", { user, isLogin, loading });

  useState(() => {
    dispatch(checkUser());
  }, []);

  return (
    <div
      className="md:container md:mx-auto p-5 bg-yellow-200 h-screen"
      id="App"
    >
      {loading ? (
        <h2>Loading....</h2>
      ) : (
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute
              path="/chat/:id"
              authenticated={isLogin}
              component={Chat}
            />
            <PublicRoute
              path="/signup"
              authenticated={isLogin}
              component={Signup}
            />
            <PublicRoute
              path="/login"
              authenticated={isLogin}
              component={Login}
            />
          </Switch>
        </Router>
      )}
    </div>
  );
};

export default (props) => {
  return (
    <Provider store={store}>
      <App {...props} />
    </Provider>
  );
};
