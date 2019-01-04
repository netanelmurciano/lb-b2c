import React, { Component } from 'react';
import { View, Text, Picker, Alert } from 'react-native';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Input, Button } from './common';

class FormOrder extends Component {
    constructor() {
        super();

        this.addLeads = this.addLeads.bind(this);

        this.state = {
            firstName: '',
            lastName: '',
            address: '',
            deliveryTime: '',
            isIatHome: ''
        };
    }

    addLeads() {
        if (this.state.firstName === '' || this.state.lastName === '' || this.state.address === '') {
            Alert.alert('ההזמנה לא בוצעה, נא בדוק שכל השדות מלאים');
        } else {
        axios.post('http://10.0.2.2:8000/api/order', 
        {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            deliveryTime: this.state.deliveryTime,
            isIatHome: this.state.isIatHome
        },
        )
        .then((response) => {
            Alert.alert('תודה רבה, ההזמנה בוצעה');
            Actions.home();
            console.log(`success ${response}`);
        })
        .catch((error) => {
            Alert.alert('ישנה בעיה, ההזמנה לא בוצעה, נא בדוק שנית את הטופס');
            console.log(`Failed ${error}`);
          });
        } 
    }

    render() {
        return (
          <Card>
              <CardSection>
                      <Input
                        value={this.state.firstName}
                        name="firstName" 
                        label="שם פרטי:" 
                        placeholder="שם פרטי"
                        onChangeText={firstName => this.setState({ firstName })}
                        required
                      />
              </CardSection>
              
              <CardSection>
                      <Input
                        value={this.state.lastName} 
                        name="lastName"
                        label="שם משפחה:" 
                        placeholder="שם משפחה" 
                        onChangeText={lastName => this.setState({ lastName })} 
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
                  <Button buttonClick={this.addLeads}>הזמן</Button>
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

