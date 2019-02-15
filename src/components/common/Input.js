import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, autoCorrect, secureTextEntry, editable }) => {
  return (
    <View style={styles.containerStyle}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        autoCorrect={autoCorrect}
        secureTextEntry={secureTextEntry}
        editable={editable}
        style={styles.inputStyle}
      />
      <Text style={styles.labelStyle}>{label}</Text>
    </View>
  );
};

const styles = {
  inputStyle: {
    height: 50,
    width: 100,
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
}

export { Input };
