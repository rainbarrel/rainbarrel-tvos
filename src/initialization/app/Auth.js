import React from 'react';
import { View } from 'react-native';

import AuthSelector from '../../components/auth/AuthSelector';
import Login from '../../components/auth/Login';
import Signup from '../../components/auth/Signup';

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = { authSelection: 'login' };

    this.changeAuthSelection = this.changeAuthSelection.bind(this);
    this.renderAuthSelection = this.renderAuthSelection.bind(this);
  }

  changeAuthSelection(authSelection) {
    const newState = { authSelection };
    this.setState(newState);
  }

  renderAuthSelection() {
    const { authSelection } = this.state;

    switch (authSelection) {
      case 'login':
        return <Login />;
      case 'signup':
        return <Signup />;
      default:
        return <Login />;
    }
  }

  render() {
    return (
      <View>
        <AuthSelector changeAuthSelection={this.changeAuthSelection} />
        {this.renderAuthSelection()}
      </View>
    );
  }
}

export { Auth };
