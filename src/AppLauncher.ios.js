import React from 'react';
import Firebase from 'firebase';
import { Provider } from 'react-redux';

import configureStore from './store';
import initFirebase from './firebase';
import App from './components/app/App';
import Auth from './components/auth/Auth';
import Launching from './components/launching/Launching';


class AppLauncher extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: null, user: null };
    this.store = configureStore();
    initFirebase();
    console.disableYellowBox = true; // for development
  }

  componentDidMount() {
    Firebase.auth().onAuthStateChanged((user) => {
      let loggedIn;
      let newState;

      if (user) {
        loggedIn = true;
        newState = { loggedIn, user };
      } else {
        loggedIn = false;
        newState = { loggedIn };
      }

      this.setState(newState);
    });
  }

  render() {
    const { loggedIn, user } = this.state;

    switch (loggedIn) {
      case true:
        return (
          <Provider store={this.store}>
            <App user={user} />
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
