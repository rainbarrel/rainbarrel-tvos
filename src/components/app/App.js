import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import Auth from '../auth/Auth';
import { Button } from '../common';
import { logoutUserAttempt } from '../../actions';

const App = ({ user, logoutUserAttempt }) => {
  if (user) {
    return (
      <View>
        <Button onPress={logoutUserAttempt}>
          Logout
        </Button>
      </View>
    );
  }

  return <Auth />;
};

const mapStateToProps = ({ auth }) => {
  const { user } = auth;
  return { user };
};

const mapDispatchToProps = dispatch => ({
  logoutUserAttempt: () => dispatch(logoutUserAttempt())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
