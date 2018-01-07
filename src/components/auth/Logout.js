import React from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { logoutUserAttempt } from '../../actions';

const Logout = ({ logoutUserAttempt }) => (
  <Text onPress={logoutUserAttempt}>
    Logout
  </Text>
);

const mapStateToProps = ({ auth }) => {
  const { loading, error, user } = auth;
  return { loading, error, user };
};

const mapDispatchToProps = dispatch => ({
  logoutUserAttempt: () => dispatch(logoutUserAttempt())
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
