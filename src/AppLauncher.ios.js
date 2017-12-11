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
    this.state = {
      didFetchLoggedInStatus: false,
      loggedIn: null
    };
    initFirebase();

    if (process.env.NODE_ENV === 'development') {
      AppLauncher.configureDev();
    }
  }

  componentDidMount() {
    let didFetchLoggedInStatus;
    let loggedIn;

    Firebase.auth().onAuthStateChanged((user) => {
      didFetchLoggedInStatus = true;

      if (user) {
        loggedIn = true;
      } else {
        loggedIn = false;
      }

      const newState = { didFetchLoggedInStatus, loggedIn };
      this.setState(newState);
    });
  }

  render() {
    const { didFetchLoggedInStatus, loggedIn } = this.state;
    if (didFetchLoggedInStatus) {
      if (loggedIn) {
        return <App />;
      }

      return <Auth />;
    }

    return <Launching />;
  }
}

export default AppLauncher;
