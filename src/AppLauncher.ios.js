import React from 'react';
import { View } from 'react-native';
import Firebase from 'firebase';
import initFirebase from './initialization/firebase';
import { Auth, App } from './initialization/app';

class AppLauncher extends React.Component {
  static launch() { // FIXME: return from callback does not actually RETURN
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        return <App />;
      }

      return <Auth />;
    });
  }

  static configureDev() {
    console.ignoredYellowBox = ['Remote debugger'];
  }

  constructor(props) {
    super(props);
    initFirebase();

    if (process.env.NODE_ENV === 'development') {
      AppLauncher.configureDev();
    }
  }

  render() {
    return (
      <View>
        {AppLauncher.launch()}
      </View>
    );
  }
}

export default AppLauncher;
