import React, { Component } from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import ConfirmOrder from '../components/ConfirmOrder';
import Home from '../components/Home';

class RouterComponent extends Component {
    
    render() {
    return (
        <Router >
            <Scene key="root">
                <Scene hideNavBar key="home" component={Home} title="Home Page" />
                <Scene 
                    key="confirmOrder" 
                    component={ConfirmOrder} 
                    rightTitle="אשר הזמנה" 
                    onRight={() => { console.log('bla'); }} 
                />
            </Scene>
        </Router>
    );
    }
}

export default RouterComponent;

