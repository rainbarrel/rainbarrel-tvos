import React from 'react';
import Firebase from 'firebase';
import initFirebase from './initialization/firebase';
import { Launching, Auth, App } from './initialization/app';

class AppLauncher extends React.Component {
  static configureDev() {
    console.ignoredYellowBox = ['Remote debugger'];
  }

  constructor(props) {
    super(props);
    this.state = { loggedIn: null };
    initFirebase();

    if (process.env.NODE_ENV === 'development') {
      AppLauncher.configureDev();
    }
  }

  componentDidMount() {
    Firebase.auth().onAuthStateChanged((user) => {
      let loggedIn;

      if (user) {
        loggedIn = true;
      } else {
        loggedIn = false;
      }

      const newState = { loggedIn };
      this.setState(newState);
    });
  }

  render() {
    const { loggedIn } = this.state;

    switch (loggedIn) {
      case true:
        return <App />;
      case false:
        return <Auth />;
      default:
        return <Launching />;
    }
  }
}

export default AppLauncher;
