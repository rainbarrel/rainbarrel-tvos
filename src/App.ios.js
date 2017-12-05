import React from 'react';
import { View, Text } from 'react-native';
import Firebase from 'firebase';
import initFirebase from './initialization/firebase';

class App extends React.Component {
  static configureDev() {
    console.ignoredYellowBox = ['Remote debugger'];
  }

  constructor(props) {
    super(props);
    initFirebase();

    if (process.env.NODE_ENV === 'development') {
      App.configureDev();
    }
  }

  render() {
    return (
      <View>
        <Text>
          hello again TV!
        </Text>
      </View>
    );
  }
}

export default App;
