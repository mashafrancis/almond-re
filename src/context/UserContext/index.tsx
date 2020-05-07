import * as React from "react";
import {getUserDetails, logoutUser} from "@modules/user";
import {connect} from "react-redux";

export const UserContext = React.createContext({
  _id: '',
  name: '',
  email: '',
  photo: '',
  isVerified: true,
  devices: [{
    _id: '',
    id: '',
    verified: false,
    isEnabled: false,
  }],
  activeDevice: {
    id: '',
    _id: '',
  },
  isAdmin: false,
});

const UserProvider = ({ children }) => {
  return (
    <UserContext.Provider
      // @ts-ignore
      value={{

      }}
      >
      { children }
    </UserContext.Provider>
  )
}

export const mapStateToProps = state => ({ user: state.user })

export const mapDispatchToProps = dispatch => ({
  getUserDetails: () => dispatch(getUserDetails()),
  logoutUser: () => dispatch(logoutUser()),
})

connect(mapStateToProps, mapDispatchToProps)
