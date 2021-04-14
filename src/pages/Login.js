import React, { Component } from "react";
import { Link } from "react-router-dom";

import { signin, signInWithGoogle } from "../helpers/auth";

class Login extends Component {
  state = {
    error: null,
    email: "",
    password: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ error: null });

    const { email, password } = this.state;
    try {
      await signin(email, password);
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  googleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  render() {
    return (
      <div className="flex items-center h-screen w-full bg-teal-lighter">
        <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
          <h1 className="block w-full text-center text-grey-darkest mb-6">
            Login to
            <Link to="/">Chat Apps</Link>
          </h1>
          <form
            autoComplete="off"
            onSubmit={this.handleSubmit}
            className="mb-4 md:flex md:flex-wrap md:justify-between"
          >
            <p className="text-center">
              Fill in the form below to login to your account.
            </p>

            <div className="flex flex-col mb-4 max-w-full">
              <label
                className="mb-2 tracking-wide font-bold text-grey-darkest"
                for="first_name"
              >
                Your Email
              </label>
              <input
                className="border py-2 px-3 text-grey-darkest md:mr-2"
                placeholder="Email"
                name="email"
                type="email"
                onChange={this.handleChange}
                value={this.state.email}
              />
            </div>

            <div className="flex flex-col mb-4 max-w-full">
              <label
                className="mb-2 tracking-wide font-bold text-grey-darkest"
                for="first_name"
              >
                Your Password
              </label>
              <input
                className="border py-2 px-3 text-grey-darkest md:mr-2"
                placeholder="Password"
                name="password"
                onChange={this.handleChange}
                value={this.state.password}
                type="password"
              />
            </div>

            <div className="flex flex-col w-full max-w-full">
              {this.state.error && (
                <p className="text-red-500">{this.state.error}</p>
              )}
              <button
                type="submit"
                className="bg-blue-400 mb-3 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mx-auto "
              >
                Sign up
              </button>
              <p className="text-center">Or</p>
              <button onClick={this.googleSignIn} type="button" className="mb-4">
                Sign up with Google
              </button>
              <p className="text-center">
                Don't have an account? <Link to="/signup">Sign up</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
