import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const Input = (props) => {
  const { containerStyle, labelStyle, inputStyle } = styles;
  const {
    label,
    placeholder,
    value,
    onChangeText,
    autofocus,
    secureTextEntry
  } = props;

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        style={inputStyle}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        autofocus={autofocus}
        secureTextEntry={secureTextEntry}
        autoCorrect={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    width: 400,
    height: 200,
    borderWidth: 1,
    borderColor: 'black'
  },
  labelStyle: {
    fontSize: 80
  },
  inputStyle: {
    fontSize: 80
  }
});

export { Input };
