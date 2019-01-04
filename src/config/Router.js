import React, { Component } from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import ConfirmOrder from '../components/ConfirmOrder';
import Home from '../components/Home';
import FormOrder from '../components/FormOrder';
import LogIn from '../components/LogIn';
import Menu from '../components/Menu';
import Register from '../components/Register';
import AddProduct from '../admin/components/AddProduct';
import TableList from '../admin/components/TableList';

class RouterComponent extends Component {
    addOrder(items) {
    
    }

    render() {
    return (
        <Router >
            <Scene key="root">
                <Scene
                    key="menu"
                    drawer
                    contentComponent={Menu}
                    drawerWidth={300}
                    
                    hideNavBar
                    
                >
                    <Scene
                        key="home"
                        title="Home Page"
                        component={Home}
                        addOrder={this.addOrder}
                        hideNavBar
                        
                    />  
                </Scene>  
                <Scene 
                    key="confirmOrder" 
                    component={ConfirmOrder} 
                    rightTitle="אשר הזמנה" 
                    onRight={() => Actions.formOrder()} 
                />
                <Scene
                    key="formOrder" 
                    component={FormOrder}
                    rightTitle="פרטים אישיים"
                    onRight={() => { console.log('formOrder'); }}
                />
                <Scene
                    key="login" 
                    component={LogIn}
                    rightTitle="התחבר"
                    onRight={() => { console.log('login'); }} 
                />
                <Scene
                    key="register" 
                    component={Register}
                    rightTitle="הירשם"
                    onRight={() => { console.log('register'); }} 
                />

                {/* Admin Routes */}
                <Scene
                    key="addProduct" 
                    component={AddProduct}
                    rightTitle="הוסף מוצר"
                    onRight={() => { console.log('addProduct'); }} 
                />

                <Scene
                    initial
                    key="tableList" 
                    component={TableList}
                    rightTitle="טבלת מוצרים"
                    onRight={() => { console.log('TableList'); }} 
                />
                 
            </Scene>
        </Router>
    );
    }
}

export default RouterComponent;

