import React from 'react';
import { View, Text } from 'react-native';
import Firebase from 'firebase';
import Logout from '../auth/Logout';

const Account = () => {
  const user = Firebase.auth().currentUser; // LATER: change to props

  return (
    <View>
      <Text>
        {user.email}
      </Text>

      <Logout />
    </View>
  );
};

export default Account;
