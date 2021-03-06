import React, { Component } from 'react';
import { View, Text, TouchableOpacity, AsyncStorage, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';

class Footer extends Component {
  constructor() {
    super();

    this.state = {
      totalPrice: '',
      totalItems: ''
    };
    
    this.moveToConfirmationOrder = this.moveToConfirmationOrder.bind(this);
    this.totalPrice = this.totalPrice.bind(this);
  }

  totalPrice() {
    const orderIds = Object.keys(this.props.totalPrice);
      // Sum total price
      this.total = orderIds.reduce((prevTotal, key) => {
        const product = this.props.products[key - 1];
        const count = this.props.totalPrice[key];
        return prevTotal + (count * product.price);
    }, 0);
      // Sum total items
      this.itemTotal = orderIds.reduce((prevTotal, key) => {
        const count = this.props.totalPrice[key];
        return prevTotal + (count * 1);
      }, 0);
  }
    

  moveToConfirmationOrder() {
    AsyncStorage.getItem('userLoginInfo')
     .then((userLoginInfo) => {
       this.checkLogIn = JSON.parse(userLoginInfo);
       if (this.checkLogIn) {
          this.setState({ totalPrice: this.total, totalItems: this.itemTotal, order: this.props.order });
          setTimeout(() => {
            this.props.addOrder(this.props.order);
            Actions.confirmOrder(this.state);
          }, -1);
       } else {
        Alert.alert('עלייך להתחבר כדי להמשיך');
        Actions.drawerOpen('menu');
       }  
    });
  }

  render() {
  const { viewStyle, totalItems, totalPay, toCheckout, toCheckOutText } = styles;
  
  this.totalPrice();
  return (
      <View style={viewStyle}>
        <View style={toCheckout}>
          <TouchableOpacity onPress={this.moveToConfirmationOrder}>
              <Text style={toCheckOutText}>לקופה</Text>
          </TouchableOpacity>
        </View>

        <View style={totalPay}>
          <Text>
          {`${this.total} ש''ח`}
          </Text>
        </View>

        <View style={totalItems}>
          <Text>
            {`סה''כ פריטים: ${this.itemTotal}`}
          </Text>
        </View>
      </View>
  );
  }
}

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
    //flex: 3
  },
  toCheckout: {
    fontSize: 20,
    flex: 1,
    alignItems: 'flex-start',
    marginLeft: 10
  },
  toCheckOutText: {
    justifyContent: 'space-around',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'red',
    backgroundColor: 'red',
    color: 'white',
    width: 70,
    paddingTop: 5,
    paddingBottom: 5,
    textAlign: 'center',
    elevation: 5
  },
  totalPay: {
    fontSize: 20,
    flex: 1,
    alignItems: 'center'
  },
   totalItems: {
    fontSize: 20,
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 10
  }
};

export { Footer };
