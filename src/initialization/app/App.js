import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const App = () => {
  const { textStyle } = styles;

  return (
    <View>
      <Text style={textStyle}>
        App
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 100
  }
});


export { App };
