import React, { Component, PureComponent } from 'react';
import { View, FlatList} from 'react-native';
import {Text, List, ListItem } from 'react-native-elements';
import {deckData} from '../utils/api'

class DeckList extends PureComponent {
  static navigationOptions = {
    title:'Decks',
  };
  _keyExtractor = (item, index) => index

  _renderItem = ({item}) => {
    const { navigate } = this.props.navigation
    return (
      <ListItem
        title={item.title}
        onPress={() => navigate('TipDetail',{title:item.title, content:item.body})}
      />
    )
  }

  render() {
    const decks = Object.keys(deckData).map((key) => (deckData[key]))

          
    return (
      <View style={{paddingTop:0, backgroundColor:'white', flex: 1}}>
        <FlatList
          data={decks}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    )
  }
}

export default DeckList
