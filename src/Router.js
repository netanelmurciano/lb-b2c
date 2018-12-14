import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import OrderList from './components/OrderList';
import Home from './components/Home';

const RouterComponent = () => {
    return (
        <Router >
            <Scene key="root">
                <Scene hideNavBar key="home" component={Home} title="Home Page" />
                <Scene key="orderList" component={OrderList} title="Our Order" />
            </Scene>
        </Router>
    );
};

export default RouterComponent;
