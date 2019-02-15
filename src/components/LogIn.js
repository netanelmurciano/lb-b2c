import React, { Component } from 'react';
import { Text, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LogIn extends Component {
    constructor() {
        super();
        this.state = {
            error: '',
            //loading: false,
            email: '',
            password: ''
        };

        this.onButtonPress = this.onButtonPress.bind(this);
        this.renderButton = this.renderButton.bind(this);
    }

    onButtonPress() {
        axios.post('http://10.0.2.2:8000/api/login', 
        {
            email: this.state.email,
            password: this.state.password  
        },
        )
        .then((response) => {
            if (response.data.status === 'notLogin') {
                this.onLogingFail();   
            } else {
                this.result = response.data;
                this.onLoginSucces();     
            }
            // Pass a props to checkStatusConnection function in menu
            this.props.data(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    onLoginSucces() {
        this.setState({
          email: '',
          password: '',
          //loading: false, 
          error: ''
        });

        AsyncStorage.setItem('userLoginInfo', JSON.stringify(this.result));

        if (this.result.data.type === 'customer') {
           Actions.drawerClose('menu'); 
           Actions.home();    
        } else { 
          Actions.tableList(); 
        }
    }
  
    onLogingFail() {
        this.setState({
          error: 'התחברות נכשלה, בדוק שם משתמש וסיסמא',
          //loading: false
        });
    }

    renderButton() {
        if (this.state.loading) {
          return <Spinner size="small" />;
        }
        return (
          <Button>
            <Text onPress={this.onButtonPress}>התחבר</Text>
          </Button>
          );
    }
    
    render() {
        return (
            <Card>
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
                {this.renderButton()}
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

export default LogIn;
