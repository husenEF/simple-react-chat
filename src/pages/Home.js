import React, { Component } from "react";
import { auth, db } from "../services/firebase";

class Home extends Component {
  state = { userlist: [] };

  componentDidMount() {
    this.firstLoad();
  }

  async firstLoad() {
    try {
      const listUser = [];
      await db.ref("users").on("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const a = childSnapshot.val();
          listUser.push(a);
        });
      });
      this.setState({ userlist: listUser });
    } catch (error) {
      console.log({ error });
    }
  }

  render() {
    const { userlist } = this.state;
    console.log({ userlist });
    return <div>Halo</div>;
  }
}

export default Home;
