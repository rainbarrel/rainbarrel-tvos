import React from 'react';
import { connect } from 'react-redux';
import { Button } from '../common';
import { logoutUserAttempt } from '../../actions';

const Logout = ({ logoutUserAttempt }) => (
  <Button onPress={logoutUserAttempt}>
    Logout
  </Button>
);

const mapStateToProps = ({ auth }) => {
  const { loading, error, user } = auth;
  return { loading, error, user };
};

const mapDispatchToProps = dispatch => ({
  logoutUserAttempt: () => dispatch(logoutUserAttempt())
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
