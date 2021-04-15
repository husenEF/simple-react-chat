import React, { Component } from "react";
import { connect } from "react-redux";
import { auth, db } from "../services/firebase";

class Home extends Component {
  state = { userlist: [] };

  componentDidMount() {
    console.log({ props: this.props });
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
  return state;
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  inc: () => dispatch({ type: "INC" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
