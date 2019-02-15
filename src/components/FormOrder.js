import React, { Component } from 'react';
import { View, Text, Picker, Alert, AsyncStorage } from 'react-native';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Input, Button } from './common';

class FormOrder extends Component {
    constructor() {
        super();

        this.addPersonalDetails = this.addPersonalDetails.bind(this);

        this.state = {
            firstName: '',
            lastName: '',
            address: '',
            deliveryTime: '',
            isIatHome: ''
        };
    }

    componentWillMount() {
        AsyncStorage.getItem('userLoginInfo')
        .then((userLoginInfo) => {
          this.checkLogIn = JSON.parse(userLoginInfo);
          this.setState({ 
              firstName: this.checkLogIn.data.name, 
              lastName: this.checkLogIn.data.last_name 
            });
        });
    }

    addPersonalDetails() {
        if (this.state.firstName === '' || this.state.lastName === '' || this.state.address === '') {
            Alert.alert('ההזמנה לא בוצעה, נא בדוק שכל השדות מלאים');
        } else {
        axios.post('http://10.0.2.2:8000/api/order', 
        {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            deliveryTime: this.state.deliveryTime ? this.state.deliveryTime : 'morning',
            isIatHome: this.state.isIatHome ? this.state.isIatHome : '1',
            userId: this.checkLogIn.data.id, 
            productsOrders: this.props.data
        },
        )
        .then((response) => {
            console.log(response);
            if (response.data.status === 'orderSuccess') {
                Alert.alert('תודה רבה, ההזמנה בוצעה');               
                this.props.orderSuccess(response.data.status);
                Actions.home(); 
            } else {
                Alert.alert('ההזמנה לא בוצעה, ישנה בעיה, נא בדוק שנית את הטופס');    
            }
        })
        .catch((error) => {
            Alert.alert('ישנה בעיה, ההזמנה לא בוצעה, נא בדוק שנית את הטופס');
            console.log(error);
          });
        } 
    }

    render() {
        console.log(this.props);
        return (
          <Card>
              <CardSection>
                      <Input
                        value={this.state.firstName}
                        name="firstName" 
                        label="שם פרטי:" 
                        placeholder="שם פרטי"
                        onChangeText={firstName => this.setState({ firstName })}
                        editable={false}
                      />
              </CardSection>
              
              <CardSection>
                      <Input
                        value={this.state.lastName} 
                        name="lastName"
                        label="שם משפחה:" 
                        placeholder="שם משפחה" 
                        onChangeText={lastName => this.setState({ lastName })} 
                        editable={false}
                      />
              </CardSection>

              <CardSection>
                      <Input
                        value={this.state.address}
                        name="address" 
                        label="כתובת:" 
                        placeholder="כתובת"
                        onChangeText={address => this.setState({ address })}  
                      />
              </CardSection>

              <CardSection>
                    <Picker style={{ flex: 1 }} selectedValue={this.state.deliveryTime} onValueChange={deliveryTime => this.setState({ deliveryTime })}>
                        <Picker.Item label="בוקר" value="morning" />
                        <Picker.Item label="ערב" value="evening" />
                    </Picker>
                    <Text style={styles.pickerTextStyle}>זמן המשלוח:</Text>
              </CardSection>

              <CardSection>
                    <Picker style={{ flex: 1 }} selectedValue={this.state.isIatHome} onValueChange={isIatHome => this.setState({ isIatHome })}>
                        <Picker.Item label="בבית" value="1" />
                        <Picker.Item label="לא בבית, נא להשאיר ליד הדלת" value="0" />
                    </Picker>
                    <Text style={styles.pickerTextStyle}>בזמן המשלוח אני:</Text>
              </CardSection>
              
              <CardSection>
                  <Button buttonClick={this.addPersonalDetails}>הזמן</Button>
              </CardSection>
          </Card>  
        );
    }
}

const styles = {
    pickerTextStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1,
        marginTop: 12
    },
};


export default FormOrder;

