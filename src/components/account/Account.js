import React from 'react';
import { View, Text } from 'react-native';
import Firebase from 'firebase';
import Logout from '../auth/Logout';

const Account = ({ user }) => {
  user = user || Firebase.auth().currentUser;

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
