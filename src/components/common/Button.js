import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ buttonClick, children }) => {
  return (
    <TouchableOpacity onPress={buttonClick} style={styles.buttonStyle}>
      <Text style={styles.textStyle}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = {
    textStyle: {
      alignSelf: 'center',
      color: '#d12028',
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
      borderColor: '#d12028',
      marginLeft: 5,
      marginRight: 5,
      color: '#d12028',
      background: '#fff'
    },
};

export { Button };
