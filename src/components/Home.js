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
      search: ''
    };

    this.totalPrice = this.totalPrice.bind(this);
    this.searchFilter = this.searchFilter.bind(this);
}

componentWillMount() {
  axios.get('http://10.0.2.2:8000/api/products')
  .then(response => this.setState({ products: response.data })
  );
}

totalPrice(item) {
  console.log(item);
  // take a copy of out state
  const totalPrice = { ...this.state.totalPrice };
  totalPrice[item.productId] = item.itemsCount;
  this.setState({ totalPrice });
}

searchFilter(contact) {
  this.setState({ search: contact.search });
  console.log(this.state);
}

  render() {
    return (
      <View style={{ flex: 1 }}>
          <Header headerText="לחמניות בקריה" />
          <Search searchFilter={this.searchFilter} />
          <ProductList products={this.state.products} totalPrice={this.totalPrice} search={this.state.search} />
          <Footer products={this.state.products} totalPrice={this.state.totalPrice} />
      </View>
    );
  }
}

export default Home;
