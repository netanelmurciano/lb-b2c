import React, { Component } from 'react';
import { Text, View, AsyncStorage, Alert } from 'react-native';
import { Content, List, ListItem } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';

class Menu extends Component {
    constructor() {
        super();
        this.checkStatusConnection = this.checkStatusConnection.bind(this);
    }

    logout() {
        AsyncStorage.getItem('userLoginInfo')
        .then((userLoginInfo) => {
          this.checkLogIn = JSON.parse(userLoginInfo);
          if (!this.checkLogIn) {
            Alert.alert('אינך מחובר');
         } else {
            Alert.alert(
                'שים לב!',
                'אתה עומד להתנתק, האם להמשיך?',
                [
                  { text: 'בטל', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                  { text: 'המשך', onPress: () => this.removeStorage() },
                ],
                { cancelable: false }
            );    
         }
        }); 
    }

    removeStorage() {
        Actions.drawerClose('menu');
        AsyncStorage.removeItem('userLoginInfo'); 
    }

    checkStatusConnection() {
        AsyncStorage.getItem('userLoginInfo')
        .then((userLoginInfo) => {
          this.checkLogIn = JSON.parse(userLoginInfo);
          console.log('this.checkLogIn');
          console.log(this.checkLogIn);
        });

        return (
            <View style={styles.iconWrapper}> 
                <Icon name='md-person' type='ionicon' size={70} />
                {
                this.checkLogIn
                ?
                <Text style={{ color: '#fff' }}>{`שלום ${this.checkLogIn.data.name}`}</Text>
                :
                <Text style={{ color: '#fff' }}>תפריט</Text>
                }
            </View>
        );
    }
    
   render() { 
    return (
        <View style={{ flex: 1 }}>
            
            {this.checkStatusConnection()}
            <View style={{ flex: 2 }}>
                <Content>
                    <List>
                        <ListItem>
                            <Text style={styles.listStyle} onPress={() => Actions.register()}>הרשמה</Text>
                        </ListItem>

                        <ListItem>
                            <Text style={styles.listStyle} onPress={() => Actions.login(this.checkStatusConnection)}>התחבר</Text>
                        </ListItem>

                        <ListItem>
                            <Text style={styles.listStyle} onPress={() => this.logout()}>התנתק</Text>
                        </ListItem>
                    </List>
                </Content>
            </View>
        </View>
    );
   }
}

const styles = {
    iconWrapper: {
        flex: 1,
        backgroundColor: '#2c3e50',
        justifyContent: 'center', 
        alignItems: 'center'
    },
    listStyle: {
        flex: 1,
        textAlign: 'center'
    }
};

export default Menu;
