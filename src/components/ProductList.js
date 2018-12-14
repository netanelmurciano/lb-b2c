import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import ProductDetail from './ProductDetail';


class ProductList extends Component {
  renderProducts() {
    console.log(this.props.search);
    const filterContacts = this.props.products.filter(
      (product) => {
        return product.name.indexOf(this.props.search) !== -1;
      }
    );

    return filterContacts.map(product =>
      <ProductDetail key={product.id} index={product.id} product={product} totalPrice={this.props.totalPrice} />
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
