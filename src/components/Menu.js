import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Content, List, ListItem } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';

class Menu extends Component {
    constructor() {
        super();
        this.checkStatusConnection = this.checkStatusConnection.bind(this);
    }
    checkStatusConnection(item) {
       this.loginStatus = item.status;
       this.loginUserName = item.data.name;
    }
    
   render() { 
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.iconWrapper}> 
                <Icon name='md-person' type='ionicon' size={70} />
                {
                this.loginStatus === 'login' 
                ?
                <Text style={{ color: '#fff' }}>{`שלום ${this.loginUserName}`}</Text>
                :
                <Text style={{ color: '#fff' }}>תפריט</Text>
                }
            </View>

            <View style={{ flex: 2 }}>
                <Content>
                    <List>
                        <ListItem>
                            <Text style={styles.listStyle} onPress={() => Actions.register()}>הרשמה</Text>
                        </ListItem>

                        <ListItem>
                            <Text style={styles.listStyle} onPress={() => Actions.login(this.checkStatusConnection)}>התחבר</Text>
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
