import React, { Component } from "react";
import { Link } from "react-router-dom";

import { db } from "../services/firebase";
import { signup } from "../helpers/auth";

class Signup extends Component {
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
      const register = await signup(email, password);

      await db.ref(`users/${register.user.uid}`).set({
        email,
        timestamp: Date.now(),
        uid: register.user.uid,
        isOnline: false,
      });
      this.setState({ email: "", password: "" });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  render() {
    return (
      <div className="flex items-center h-screen w-full bg-teal-lighter">
        <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
          <h1 className="block w-full text-center text-grey-darkest mb-6">
            Sign Up to
            <Link to="/">Chatty</Link>
          </h1>
          <form
            autoComplete="off"
            onSubmit={this.handleSubmit}
            className="mb-4 md:flex md:flex-wrap md:justify-between"
          >
            <p className="text-center">
              Fill in the form below to create an account.
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

            <div className="flex flex-col mb-4 w-full max-w-full">
              {this.state.error && (
                <p className="text-red-500">{this.state.error}</p>
              )}
              <button
                type="submit"
                className="bg-blue-400 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mx-auto "
              >
                Sign up
              </button>
            </div>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
