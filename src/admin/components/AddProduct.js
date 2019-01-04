import React, { Component } from 'react';
import { Text, Picker, Alert, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import { Card, CardSection, Input, Button } from '../../components/common';

class AddProduct extends Component {
    constructor() {
        super();

        this.addProduct = this.addProduct.bind(this);

        this.state = {
            name: '',
            description: '',
            price: '',
            availability: '',
            imagePath: '',
            imageThumbnail: ''
        };
    }

    addProduct() {
        if (this.state.name === '' && this.state.description === '' && this.state.price === '' && this.state.availability === '' && this.state.imagePath === '' && this.state.imageThumbnail === '') {
            Alert.alert('לא ניתן להוסיף את המוצר, בדוק שכל השדות מלאים');
        } else {
        axios.post('http://10.0.2.2:8000/api/addProduct', 
        {
            name: this.state.name,
            description: this.state.description,
            price: this.state.price,
            availability: this.state.availability,
            imagePath: this.state.imagePath,
            imageThumbnail: this.state.imageThumbnail
        },
        )
        .then((response) => {
            console.log(`success ${response}`);
            this.addProductSucces();  
        })
        .catch((error) => {
            Alert.alert('ישנה בעיה, ההזמנה לא בוצעה, נא בדוק שנית את הטופס');
            console.log(`Failed ${error}`);
          });
        } 
    }

    addProductSucces() {
        this.setState({
            name: '',
            description: '',
            price: '',
            availability: '',
            imagePath: '',
            imageThumbnail: '',
            //loading: false, 
             error: ''
        }); 
        Alert.alert('תודה רבה, המוצר התווסף'); 
        Actions.tableList();
    }

    render() {
        console.log(this.state);
        return (
            <ScrollView>
            <KeyboardAwareScrollView style={{ flex: 1 }} behavior="padding">
            <Card>
                <CardSection>
                <Input
                    autoCorrect={false}
                    label="שם המוצר"
                    value={this.state.name}
                    onChangeText={name => this.setState({ name })}
                    secureTextEntry={false} 
                
                />
                </CardSection>

                <CardSection>
                <Input
                    autoCorrect={false}
                    label="תיאור"
                    value={this.state.description}
                    onChangeText={description => this.setState({ description })}
                    secureTextEntry={false} 
                
                />
                </CardSection>

                <CardSection>
                    <Input
                        autoCorrect={false}
                        label="מחיר"
                        value={this.state.price}
                        onChangeText={price => this.setState({ price })}
                        secureTextEntry={false} 
                    
                    />
                </CardSection>

                <CardSection>
                    <Picker style={{ flex: 1 }} selectedValue={this.state.availability} onValueChange={availability => this.setState({ availability })}>
                        <Picker.Item label="זמין" value="available" />
                        <Picker.Item label="לא זמין" value="unavailable" />
                    </Picker>
                    <Text style={styles.pickerTextStyle}>זמינות במלאי:</Text>
                </CardSection>

                <CardSection>
                    <Input
                        autoCorrect={false}
                        label="תמונה"
                        value={this.state.imagePath}
                        onChangeText={imagePath => this.setState({ imagePath })}
                        secureTextEntry={false} 
                    
                    />
                </CardSection>

                <CardSection>
                        <Input
                            autoCorrect={false}
                            label="תמונה ממוזערת"
                            value={this.state.imageThumbnail}
                            onChangeText={imageThumbnail => this.setState({ imageThumbnail })}
                            secureTextEntry={false} 
                        
                        />
                </CardSection>

            <Text style={styles.error}>
              {this.state.error}
            </Text>

            <CardSection>
            <Button buttonClick={this.addProduct}>הזמן</Button>
            </CardSection>
        </Card>
        </KeyboardAwareScrollView>
        </ScrollView>
        );
    }
}

const styles = {
    pickerTextStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1,
        marginTop: 12
    },
};

export default AddProduct;
