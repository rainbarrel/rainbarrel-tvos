import React from 'react';
import Firebase from 'firebase';
import { Provider } from 'react-redux';

import configureStore from './store';
import initFirebase from './initialization/firebase';
import { Launching, Auth, App } from './initialization/app';

class AppLauncher extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: null };
    this.store = configureStore();
    initFirebase();
    console.disableYellowBox = true;
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
        return (
          <Provider store={this.store}>
            <App />
          </Provider>
        );
      case false:
        return (
          <Provider store={this.store}>
            <Auth />
          </Provider>
        );
      default:
        return <Launching />;
    }
  }
}

export default AppLauncher;
