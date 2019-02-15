import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import ProductDetail from './ProductDetail';


class ProductList extends Component {
  renderProducts() {
    const filterContacts = this.props.products.filter(
      (product) => {
        return product.name.indexOf(this.props.search) !== -1;
      }
    );

    return filterContacts.map(product =>
      <ProductDetail key={product.id} index={product.id} product={product} totalPrice={this.props.totalPrice} order={this.props.order} />
    );
  }

    render() {
    return (
      <ScrollView>
       {this.renderProducts()}
      </ScrollView>
    );
  }
}

export default ProductList;
