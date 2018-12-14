import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, CardSection, Button } from './common';


class ConfirmOrder extends Component {
    render() {
        const { viewWrapper, productPic, productName, productPrice } = styles;
        return (
            <Card>
                <CardSection>
                    <View style={viewWrapper}>
                        <Text style={productPrice}>total price</Text>
                        <Text style={productName}>name and count</Text>
                        <Text style={productPic}>pic</Text>
                    </View>
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    viewWrapper: {
        height: 40,
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center'
    },
    productPrice: {
        flex: 1,
        justifyContent: 'center',
    },
    productName: {
        flex: 1,
        justifyContent: 'center',
    },
    productPic: {
        flex: 1,
        height: 50,
        width: 50,
        justifyContent: 'center',
    }
};

export default ConfirmOrder;
