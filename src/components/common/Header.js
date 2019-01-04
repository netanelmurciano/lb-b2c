import React from 'react';
import { Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';

const Header = (props) => {
  const { textStyle, viewStyle } = styles;

  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{props.headerText}</Text>
      <Icon name='md-menu' type='ionicon' iconStyle={{ marginRight: 10, color: '#000', fontWeight: 'bold' }} onPress={() => Actions.drawerOpen('menu')} />
    </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: '#d3d3d3',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 50, height: 50 },
    shadowOpacity: 0.1,
    elevation: 5,
    position: 'relative',
    flexDirection: 'row'
  },
  textStyle: {
    fontSize: 20,
    textAlign: 'center',
    flex: 2
  }
};

export { Header };
