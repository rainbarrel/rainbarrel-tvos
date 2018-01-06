import React from 'react';
import { View } from 'react-native';
import Firebase from 'firebase';
import { Button } from '../../components/global';

class App extends React.Component {
  static logout() {
    Firebase.auth().signOut(); // change to an AuthAction
  }

  render() {
    return (
      <View>
        <Button onPress={App.logout}>
          Logout
        </Button>
      </View>
    );
  }
}

export { App };
