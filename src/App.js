import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";

//firebase
import { auth } from "./services/firebase";

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
          <Redirect to="/chat" />
        )
      }
    />
  );
};
class App extends Component {
  state = {
    loading: true,
    authenticated: false,
  };

  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      console.log({ user });
      if (user) {
        this.setState({
          authenticated: true,
          loading: false,
        });
      } else {
        this.setState({
          authenticated: false,
          loading: false,
        });
      }
    });
  }
  render() {
    const { loading, authenticated } = this.state;
    console.log({ authenticated });
    return (
      <div className="md:container md:mx-auto p-5 bg-yellow-200 h-screen" id="App">
        {loading ? (
          <h2>Loading....</h2>
        ) : (
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <PrivateRoute
                path="/chat/:id"
                authenticated={authenticated}
                component={Chat}
              />
              <PublicRoute
                path="/signup"
                authenticated={authenticated}
                component={Signup}
              />
              <PublicRoute
                path="/login"
                authenticated={authenticated}
                component={Login}
              />
            </Switch>
          </Router>
        )}
      </div>
    );
  }
}

export default App;
