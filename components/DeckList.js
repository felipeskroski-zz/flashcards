import React, { Component, PureComponent } from 'react'
import { View, FlatList} from 'react-native'
import {Text, List, ListItem } from 'react-native-elements'
import {getDecks} from '../utils/api'

class DeckList extends PureComponent {
  static navigationOptions = {
    title:'Decks',
    headerLeft: null,
    tabBarOnPress: (scene, jumpToIndex) => {
      console.log('onPress:', scene.route)
      jumpToIndex(scene.index)
    },
  }
  state={
    decks: null
  }

  componentDidMount(){
    this._refresh()
  }
  componentDidUpdate(){
    console.log(this.props)
  }

  _refresh = () => {
    console.log('refreshed')
    getDecks().then((result) => this.setState({decks: this.decksToArray(result)}))
  }

  decksToArray(decks){
    return Object.keys(decks).map((key) => (decks[key]))
  }

  _keyExtractor = (item, index) => index

  _renderItem = ({item}) => {
    const { navigate } = this.props.navigation
    return (
      <ListItem
        title={item.title}
        subtitle={item.questions && `${item.questions.length} cards`}
        onPress={() => navigate('Deck',{item:item, refreshDecks:this._refresh})}
      />
    )
  }

  render() {
    const {decks} = this.state
    return (
      decks ?
        <View style={{paddingTop:0, backgroundColor:'white', flex: 1}}>
          <FlatList
            data={decks}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        </View>
      :
        <View style={{paddingTop:0, backgroundColor:'white', flex: 1}}>
          <Text>Loading data...</Text>
        </View>
    )
  }
}

export default DeckList
