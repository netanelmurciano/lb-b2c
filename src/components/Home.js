import React, { Component } from 'react';
import { View } from 'react-native';
import axios from 'axios';
import ProductList from './ProductList';
import Search from './Search';
import { Header, Footer } from './common';

class Home extends Component {
  constructor() {
    super();
    this.state = { 
      products: [],
      totalPrice: {},
      order: [],
      search: ''
    };

    this.totalPrice = this.totalPrice.bind(this);
    this.searchFilter = this.searchFilter.bind(this);
    this.order = this.order.bind(this);
}

componentWillMount() {
  axios.get('http://10.0.2.2:8000/api/products')
  .then(response => this.setState({ products: response.data })
  );
}

totalPrice(item) {
  // take a copy of out state
  const totalPrice = { ...this.state.totalPrice };
  totalPrice[item.productId] = item.itemsCount;
  this.setState({ totalPrice });
}

order(item) {
  // take a copy of out state
  const order = [...this.state.order];
  order[item.productId] = {
    itemsCount: item.itemsCount,
    productName: item.productName,
    productImage: item.productImage,
    productPrice: item.productPrice,
    product_id: item.productId
  };
  this.setState({ order });
}

searchFilter(contact) {
  this.setState({ search: contact.search });
}

addDetails(items) {

}

  render() {
    return (
      <View style={{ flex: 1 }}>
          <Header headerText="לחמניות בקריה" />
          <Search searchFilter={this.searchFilter} />
          <ProductList products={this.state.products} totalPrice={this.totalPrice} order={this.order} search={this.state.search} />
          <Footer 
            products={this.state.products} 
            totalPrice={this.state.totalPrice} 
            order={this.state.order} 
            addOrder={this.props.addOrder} 
          />
      </View>
    );
  }
}

export default Home;
