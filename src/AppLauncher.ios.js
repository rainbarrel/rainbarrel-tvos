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
    let store;

    switch (loggedIn) {
      case true:
        store = configureStore();

        return (
          <Provider store={store}>
            <App />
          </Provider>
        );
      case false:
        store = configureStore();

        return (
          <Provider store={store}>
            <Auth />
          </Provider>
        );
      default:
        return <Launching />;
    }
  }
}

export default AppLauncher;
