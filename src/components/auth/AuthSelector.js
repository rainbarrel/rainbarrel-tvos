import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AuthSelector = ({ changeAuthSelection }) => {
  const { containerStyle, textStyle } = styles;

  return (
    <View style={containerStyle}>
      <TouchableOpacity onPress={() => changeAuthSelection('login')}>
        <Text style={textStyle}>
          Login
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => changeAuthSelection('signup')}>
        <Text style={textStyle}>
          Signup
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  textStyle: {
    fontSize: 50
  }
});

export { AuthSelector };
