import React, { Component } from "react";

import { auth, db } from "../services/firebase";

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

  render() {
    const { user } = this.state;
    return (
      <div>
        <h1>Chat</h1>
        <div>
          <div className="chats">
            {this.state.chats.map((chat) => {
              return <p key={chat.timestamp}>{chat.content}</p>;
            })}
          </div>
          <form onSubmit={this.handleSubmit}>
            <input
              name="content"
              onChange={this.handleChange}
              value={this.state.content}
            ></input>
            {this.state.error ? <p>{this.state.writeError}</p> : null}
            <button type="submit">Send</button>
          </form>
          {user && (
            <div>
              Login in as: <strong>{this.state.user.email}</strong>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Chat;
