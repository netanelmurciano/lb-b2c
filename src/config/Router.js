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
import EditProduct from '../admin/components/EditProduct';

class RouterComponent extends Component {
    constructor() {
        super();
        this.sendOrderitemToFormOrder = this.sendOrderitemToFormOrder.bind(this);
        this.orderSuccess = this.orderSuccess.bind(this);

        this.state = {
            orderStatus: ''
        };
    }
    addOrder(items) {
    
    }

    sendOrderitemToFormOrder(items) {
        this.orderItems = items;
    }

    orderSuccess(item) {
        this.setState({
            orderStatus: item
        });   
    }

    render() {
        console.log(this.props);
    return (
        <Router >
            <Scene key="root">
                <Scene
                    initial
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
                    onRight={() => Actions.formOrder(this.orderItems)}
                    sendOrderitemToFormOrder={this.sendOrderitemToFormOrder} 
                />
                <Scene
                    key="formOrder" 
                    component={FormOrder}
                    rightTitle="פרטים אישיים"
                    onRight={() => { console.log('formOrder'); }}
                    orderSuccess={this.orderSuccess}
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
                    key="tableList" 
                    component={TableList}
                    title="הזמנות"
                    titleStyle={{ color: '#008aff', fontSize: 18, flex: 1, textAlign: 'center', fontWeight: 'none' }}
                    rightTitle="הוספה"
                    onRight={() => { Actions.addProduct(); }}
                    leftTitle="לאתר"
                    onLeft={() => { Actions.home(); }} 
                />

                <Scene
                    key="editProduct" 
                    component={EditProduct}
                    rightTitle="עדכן מוצר"
                    onRight={() => { console.log('editProduct'); }} 
                />
                 
            </Scene>
        </Router>
    );
    }
}

export default RouterComponent;

