import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";

import { auth, db } from "../services/firebase";
import { logout } from "../helpers/auth";
class Chat extends Component {
  state = {
    user: null,
    chats: [],
    content: "",
    readError: null,
    writeError: null,
  };

  componentDidMount() {
    this.firstRun();
  }

  firstRun = async () => {
    this.setState({ readError: null });
    try {
      const user = await auth().currentUser;
      //   console.log({ user });
      this.setState({ user });
    } catch {}
    try {
      db.ref("chats").on("value", (snapshot) => {
        let chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        this.setState({ chats });
      });
    } catch (error) {
      this.setState({ readError: error.message });
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ writeError: null });
    try {
      await db.ref("chats").push({
        content: this.state.content,
        timestamp: Date.now(),
        uid: this.state.user.uid,
      });
      this.setState({ content: "" });
    } catch (error) {
      this.setState({ writeError: error.message });
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handlingLogout = () => {
    logout();
    <Redirect to="/login" />;
  };
  render() {
    const {
      match: { params },
    } = this.props;
    const { user } = this.state;
    console.log({ id: params.id });
    return (
      <div className="md:container md:mx-auto p-5 bg-yellow-200">
        <h1>Chat</h1>
        <div className="flex flex-col">
          <div className="chats flex-1">
            {this.state.chats.map((chat) => {
              return (
                <p key={chat.timestamp}>
                  {chat.content} {chat.opposite || "none"}
                </p>
              );
            })}
          </div>
          <form onSubmit={this.handleSubmit}>
            <input
              name="content"
              onChange={this.handleChange}
              value={this.state.content}
            />
            {this.state.error ? <p>{this.state.writeError}</p> : null}
            <button type="submit">Send</button>
          </form>
          {user && (
            <div className="">
              <p>
                Login in as: <strong>{this.state.user.email}</strong>
              </p>
              <button
                className="bg-red-300 rounded p-1 text-white"
                onClick={logout}
              >
                logout
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Chat);
