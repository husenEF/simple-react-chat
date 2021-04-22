import React, { Component } from "react";
import { connect } from "react-redux";
import { db } from "../services/firebase";

class Home extends Component {
  state = { userlist: [] };

  componentDidMount() {
    // console.log({ props: this.props });
    this.firstLoad();
  }

  async firstLoad() {
    console.log("first load");
    try {
      const listUser = [];
      await db.ref("users").on("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          console.log({ childSnapshot });
          const a = childSnapshot.val();
          console.log({ a });
          listUser.push(a);
        });
      });

      this.setState({ userlist: listUser });
    } catch (error) {
      // console.log({ error });
    }
  }

  render() {
    const { userlist } = this.state;
    const { counter, inc } = this.props;
    // console.log({ userlist });
    return (
      <div>
        Halo
        <p>counter :{counter}</p>
        <button className="" onClick={() => inc()}>
          inc
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state.demo;
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  inc: () => dispatch({ type: "INC" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
