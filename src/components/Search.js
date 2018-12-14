import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';

class Search extends Component {
    constructor() {
        super();

        this.state = {
            search: ''
        };
        this.updateSearch = this.updateSearch.bind(this);
    }

    updateSearch(contact) {
        this.setState({
            search: contact
        });
        setTimeout(() => { 
            console.log(this.state);
             this.props.searchFilter(this.state);
         }, -1);
    }

    render() {
    return (
        <View style={styles.viewStyle}>
            <TextInput
                value={this.state.search}
                onChangeText={this.updateSearch}
                style={styles.textInput}
                placeholder="חפש"
            />
        </View>
       ); 
    }
}

const styles = {
    viewStyle: {
        height: 60,
        paddingTop: 10,
        paddingBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 50, height: 50 },
        shadowOpacity: 0.1,
        elevation: 5,
      },
    textInput: {
        borderWidth: 1,
        textAlign: 'right',
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 5,
        borderColor: '#008aff',
        fontSize: 16
      }
};

export default Search;
