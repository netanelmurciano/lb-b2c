import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { Card, CardSection } from '../../components/common';

class ProductsTable extends Component {
    constructor() {
        super();

        this.state = {
            productId: '',
            productName: '',
            productDescription: '',
            productPrice: '',
            productAvailability: '',
            productImagePath: '',
            productImageThubnail: ''

        };

        this.addRemovedButtons = this.addRemovedButtons.bind(this);
        this.removeProduct = this.removeProduct.bind(this);
        this.checkBeforDelete = this.checkBeforDelete.bind(this);
    }

    addRemovedButtons(product) {
        return (
            <ScrollView>
            <CardSection>
                <View style={styles.buttonsWrapeer}>
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => this.goToEditProduct(product)}>
                        <Text style={styles.editButton}>עדכן</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => this.checkBeforDelete(product.id)}>
                        <Text style={styles.deleteButton}>מחק</Text>
                    </TouchableOpacity>
                </View>
            </CardSection>
            </ScrollView>
        );
    }

    goToEditProduct(product) {
        this.setState({
            productId: product.id,
            productName: product.name,
            productDescription: product.description,
            productPrice: product.price,
            productAvailability: product.availability,
            productImagePath: product.image_path,
            productImageThubnail: product.image_thumbnail
        });
        setTimeout(() => {
            Actions.editProduct(this.state);
        }, -1);
    }

    checkBeforDelete(id) {
        Alert.alert(
            'שים לב!',
            'אתה עומד למחוק מוצר זה, האם להמשיך?',
            [
              { text: 'בטל', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
              { text: 'המשך', onPress: () => this.removeProduct(id) },
            ],
            { cancelable: false }
        );
    }

    removeProduct(productId) {
        axios.post('http://admin-lb1.50webs.com/api/removeProduct', 
        {
            id: productId, 
        },
        )
        .then((response) => {
            console.log(response);
            Actions.tableList();
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (       
            <Card key={this.props.product.id} index={this.props.product.id}>
                   <CardSection>
                       <View style={styles.tableWrapper}>
                           <Text style={styles.tableColume}>{this.props.product.availability === 'available' ? 'זמין' : 'לא זמין'}</Text>
                           <Text style={styles.tableColume}>{this.props.product.price}</Text>
                           <Text style={styles.tableColume}>{this.props.product.description}</Text>
                           <Text style={styles.tableColume}>{this.props.product.name}</Text>
                           <Image style={styles.thumbnailStyle} source={{ uri: this.props.product.image_thumbnail }} />
                       </View>
                   </CardSection>
                    {this.addRemovedButtons(this.props.product)}
             </Card>
       );
    }
}

const styles = {
    tableWrapper: {
        height: 40,
        flex: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    tableColume: {
        flex: 1,
       textAlign: 'center',
        borderWidth: 1,
        height: 40
    },
    thumbnailStyle: {
        flex: 1,
        borderWidth: 1,
        height: 40,
        width: 40
    },
    buttonsWrapeer: {
        flex: 2,
        flexDirection: 'row',
    },
    buttonStyle: {
      flex: 1,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'stretch',
      borderRadius: 5,
      borderWidth: 1,
      marginLeft: 5,
      marginRight: 5,
      marginTop: 5,
      marginBottom: 5,
      background: '#fff'
    },
    editButton: {
        color: 'green'
    },
    deleteButton: {
        color: 'red'
    }
};


export default ProductsTable;
