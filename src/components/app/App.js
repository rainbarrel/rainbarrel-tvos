import React from 'react';
import { connect } from 'react-redux';
import Logout from '../auth/Logout';

const App = () => (
  <Logout />
);

const mapStateToProps = ({ auth }) => {
  const { user } = auth;
  return { user };
};

export default connect(mapStateToProps, null)(App);
