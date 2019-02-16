import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ buttonClick, children, notAvailable }) => {
  return (
    <TouchableOpacity onPress={buttonClick} style={[styles.buttonStyle, notAvailable]}>
      <Text style={[styles.textStyle, notAvailable]}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = {
    textStyle: {
      alignSelf: 'center',
      //color: '#d12028',
      color: '#008aff',
      fontSize: 16,
      fontWeight: '600',
      paddingTop: 10,
      paddingBottom: 10
    },
    buttonStyle: {
      flex: 1,
      alignSelf: 'stretch',
      backgroundColor: '#fff',
      borderRadius: 5,
      borderWidth: 1,
      //borderColor: '#d12028',
      borderColor: '#008aff',
      marginLeft: 5,
      marginRight: 5,
      color: '#d12028',
      background: '#fff'
    },
};

export { Button };
