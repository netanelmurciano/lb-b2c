import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import axios from 'axios';
import ProductsTabel from './ProductDetail';


class ProductList extends Component {
  constructor() {
    super();
    this.state = { 
        products: [] 
    };
    this.renderProducts = this.renderProducts.bind(this);  
  }

  componentWillMount() {
    axios.get('http://10.0.2.2:8000/api/products')
   .then(response => this.setState({ products: response.data })
  )
  .catch((error) => {
   console.log('Api call error');
   console.log(error.message);
   });  
}

  renderProducts() {
    return this.state.products.map(product =>
      <ProductsTabel key={product.id} index={product.id} product={product} />
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
