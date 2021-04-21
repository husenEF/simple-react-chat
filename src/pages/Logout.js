import React, { Component } from "react";
import { connect } from "react-redux";
import { signOut } from "../redux/users/action";

class Logout extends Component {
  componentDidMount() {
    const { logout } = this.props;
    logout();
  }
  render() {
    return (
      <div className="flex items-center h-screen w-full bg-teal-lighter">
        <div className="w-full rounded bg-white shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
          <div>
            <h2 class="text-gray-800 text-3xl font-semibold">Logout</h2>
            <p class="mt-2 text-gray-600">
              Terimakasih!.
              <br /> Anda Sudah menggunakan Aplikasi ini
            </p>
          </div>
          <div class="flex justify-end mt-4">
            <a href="/login" class="text-xl font-medium text-indigo-500">
              Chat Apps
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(signOut()),
  };
};
export default connect(null, mapDispatchToProps)(Logout);
