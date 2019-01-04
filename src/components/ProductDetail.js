import React, { Component } from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import { Card, CardSection, Button } from './common';


class productDetail extends Component {
  constructor() {
      super();
      this.state = {
          productId: '',
          productImage: '',
          productPrice: '',
          itemsCount: ''
      };
    
    this.handelTotalPrice = this.handelTotalPrice.bind(this);
    }

    handelTotalPrice(item) {
         this.setState({ 
          productId: this.props.product.id,
          productName: this.props.product.name,
          productImage: this.props.product.image_path,
          productPrice: this.props.product.price,
          itemsCount: item
          });
          setTimeout(() => { 
           this.props.totalPrice(this.state);
           this.props.order(this.state);
       }, -1);          
     }

    render() {
      const isAvailable = this.props.product.availability == 'available';
    return (
      <Card>
        <CardSection>
          <View style={styles.thumbnailContainerStyle}>
              <Image style={styles.thumbnailStyle} source={{ uri: this.props.product.image_thumbnail }} />
          </View>
          <View style={styles.headerContentStyle}>
            <Text style={styles.headerTextStyle}>{this.props.product.name}</Text>
            <Text>{this.props.product.description}</Text>
          </View>
        </CardSection>

        <CardSection>
          <Image style={styles.imageStyle} source={{ uri: this.props.product.image_path }} />
        </CardSection>

        <CardSection>
          { isAvailable ? 
            <View style={styles.priceWrapper}>
              <Text style={styles.totalPrice}>
                  {`סה''כ: ${this.state.itemsCount * this.props.product.price}`}
              </Text>
              
              <TextInput
                disable={isAvailable}
                style={styles.textInput}
                value={this.state.itemsCount}
                onChangeText={this.handelTotalPrice}
                placeholder="1 י'ח"
              />

              <Text style={styles.priceHeader} >
                {`מחיר: ${this.props.product.price} ש''ח`}
              </Text>
            </View>  
            : <Button style={styles.notAvailable} >אזל במלאי</Button>
            }
          
        </CardSection>
      </Card>
      );
      }
    }

const styles = {
  thumbnailContainerStyle: {
    justifyContent: 'center',
    marginLeft: 2,
    marginRight: 10,
    flex: 1
  },
  thumbnailStyle: {
    height: 50,
    width: 50
  },
  headerContentStyle: {
    justifyContent: 'space-around',
    flex: 2
  },
  headerTextStyle: {
    fontSize: 18
  },
  imageStyle: {
    height: 300,
    flex: 1,
    width: null
  },
  priceWrapper: {
    height: 40,
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center'
  },
  priceHeader: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 14
  },
  textInput: {
    flex: 1,
    height: 50,
    color: '#000',
    borderWidth: 1,
    textAlign: 'center',
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 10,
    borderColor: '#008aff',
  },
  totalPrice: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  hide: {
    display: 'none',
    visibility: 'hidden'
  },
  show: {
    display: 'initial',
    visibility: 'visible'
  },
};

export default productDetail;
