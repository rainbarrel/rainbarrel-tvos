import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Auth = () => {
  const { containerStyle, textStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={textStyle}>
        Auth
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    fontSize: 100
  }
});

export { Auth };
