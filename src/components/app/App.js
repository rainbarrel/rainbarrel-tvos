import React from 'react';
import { connect } from 'react-redux';
import Auth from '../auth/Auth';
import Logout from '../auth/Logout';

const App = ({ user }) => {
  if (user) {
    return <Logout />;
  }

  return <Auth />;
};

const mapStateToProps = ({ auth }) => {
  const { user } = auth;
  return { user };
};

export default connect(mapStateToProps, null)(App);
