import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Launching = () => {
  const { containerStyle, textStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={textStyle}>
        Rainbarrel
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

export default Launching;
