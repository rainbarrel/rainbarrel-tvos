import React from 'react';
import { TabBarIOS } from 'react-native';
import Login from './Login';
import Signup from './Signup';

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = { authSelection: 'login' };
    this.changeAuthSelection = this.changeAuthSelection.bind(this);
  }

  changeAuthSelection(authSelection) {
    if (this.state.authSelection !== authSelection) {
      const newState = { authSelection };
      this.setState(newState);
    }
  }

  render() {
    return (
      <TabBarIOS
        unselectedTintColor="white"
        tintColor="red"
        barTintColor="#00a1e0"
      >
        <TabBarIOS.Item
          title="Login"
          selected={this.state.authSelection === 'login'}
          onPress={() => this.changeAuthSelection('login')}
        >
          <Login />
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="Signup"
          selected={this.state.authSelection === 'signup'}
          onPress={() => this.changeAuthSelection('signup')}
        >
          <Signup />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

export default Auth;
