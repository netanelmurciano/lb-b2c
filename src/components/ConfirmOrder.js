import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Card, CardSection } from './common';


class ConfirmOrder extends Component {
    constructor() {
        super();

        this.renderProductsOrder = this.renderProductsOrder.bind(this);
    }

    renderProductsOrder() {
        const { viewWrapper, productPic, productName, productPrice } = styles;
            return this.props.order.map((item) => {
            if (item && item.itemsCount > 0) { 
            this.props.sendOrderitemToFormOrder(this.props.order);   
            return (
                <Card key={item.product_id}>
                    <CardSection>
                        <View style={viewWrapper}>
                            <Text style={productPrice}>{`${item.itemsCount * item.productPrice} ש''ח`}</Text>
                            <Text style={productPrice}>{`${item.itemsCount} יח'`}</Text>
                            <Text style={productName}>{item.productName}</Text>
                            <Image style={productPic} source={{ uri: item.productImage }} />
                        </View>
                    </CardSection>
                </Card>  
            );
            }
          });
    }

    render() {
        const { totalPriceAndItemsWrapper, totalPriceAndItems } = styles;
        return (
            <Card>
                 {this.renderProductsOrder()}
                <CardSection>
                    <View style={totalPriceAndItemsWrapper}>
                        <Text style={totalPriceAndItems}>{`בקניה זו רכשת ${this.props.totalItems} פרטים בסך ${this.props.totalPrice} ש''ח`}</Text>
                    </View>
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    viewWrapper: {
        height: 50,
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
    },
    productPrice: {
        flex: 1,
        alignItems: 'flex-end',
        textAlign: 'center',
    },
    productName: {
        flex: 1,
        textAlign: 'center',
    },
    productPicWrapper: {
        flex: 1,
        justifyContent: 'center',
    },
    productPic: {
        height: 50,
        width: 50,
        justifyContent: 'space-around',
    },
    totalPriceAndItemsWrapper: {
        flex: 1
    },
    totalPriceAndItems: {
        fontWeight: 'bold',
        textAlign: 'right',
    }

};

export default ConfirmOrder;
