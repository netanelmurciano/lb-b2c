import React, { Component } from 'react';
import { Text, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { Card, CardSection, Input, Button } from './common';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            error: ''
        };

        this.onButtonPress = this.onButtonPress.bind(this);
    }

    onButtonPress() {
        if (this.state.firstName !== '' && this.state.lastName !== '' && this.state.email !== '' && this.state.password !== '') {
            axios.post('http://admin-lb1.50webs.com/api/register', 
            {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password  
            },
            )
            .then((response) => {
                console.log(response);
                if (response.data.status === 'registered') {
                    this.onRegisteredSucces();   
                } else {
                    this.onRegisteredFail();
                }
                this.props.data(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        } else {
            this.setState({
                error: 'ההרשמה נכשלה, בדוק שכל השדות מלאים',
                //loading: false
              });
        }
    }

    onRegisteredSucces() {
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
          //loading: false, 
          error: ''
        });
        Alert.alert('ההרשמה בוצעה בהלחה');
        Actions.login();  
    }
  
    onRegisteredFail() {
        this.setState({
          error: 'ההרשמה נכשלה, בדוק שכל השדות מלאים',
          //loading: false
        });
    }

    checkIfEmailExist() {
        axios.post('http://admin-lb1.50webs.com/api/checkEmail', 
        {
            email: this.state.email, 
        },
        )
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <Card>
                <CardSection>
                <Input
                    autoCorrect={false}
                    label="שם פרטי"
                    value={this.state.firstName}
                    onChangeText={firstName => this.setState({ firstName })}
                    secureTextEntry={false} 
                
                />
                </CardSection>

                <CardSection>
                <Input
                    autoCorrect={false}
                    label="שם משפחה"
                    value={this.state.lastName}
                    onChangeText={lastName => this.setState({ lastName })}
                    secureTextEntry={false} 
                
                />
                </CardSection>

                <CardSection>
                    <Input
                        autoCorrect={false}
                        label="אימייל"
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                        placeholder="user@gmail.com"
                        secureTextEntry={false} 
                    
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label="סיסמא"
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                        placeholder="password"
                        secureTextEntry 
                    />
                </CardSection>

            <Text style={styles.error}>
              {this.state.error}
            </Text>

             <CardSection>
                  <Button buttonClick={this.onButtonPress}>הירשם</Button>
            </CardSection>

        </Card>
        );
    }
}

const styles = {
    error: {
      color: 'red',
      fontSize: 18,
      alignSelf: 'center',
  
    }
  };

export default Register;
