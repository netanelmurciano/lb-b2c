import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import ConfirmOrder from '../components/ConfirmOrder';
import Home from '../components/Home';

const RouterComponent = () => {
    return (
        <Router >
            <Scene key="root" style={styles.natan}>
                <Scene hideNavBar key="home" component={Home} title="Home Page" />
                <Scene key="confirmOrder" component={ConfirmOrder} rightTitle="אשר הזמנה" onRight={() => { console.log('bla'); }} />
            </Scene>
        </Router>
    );
};

export default RouterComponent;

const styles = {
    natan: {
        color: 'red',
        textAlign: 'right'
    }
};
