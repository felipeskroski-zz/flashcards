import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-elements'
import styles, {colors} from '../utils/styles'
import {getDeck} from '../utils/api'

export default class Deck extends React.Component {
  state={
    deck: null
  }

  componentDidMount(){
    this._refresh()
  }
  componentDidUpdate(prevProps){
    if(prevProps !== this.props && this.props.screenProps.refresh){
      this._refresh()
    }
  }
  _refresh = () =>{
    const { refreshDecks } = this.props.navigation.state.params
    const { title } = this.props.navigation.state.params
    refreshDecks && refreshDecks()
    getDeck(title).then((result) => this.setState({deck: result}))
  }
  render() {
    const { deck } = this.state
    const { navigate } = this.props.navigation
    return (
      deck &&
      <View style={[styles.container, {paddingBottom:80}]}>
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 52, fontWeight:'100',}}>{deck.title}</Text>
          <Text style={{fontSize: 18, fontWeight:'300', color: colors.darkGrey}}>{`${deck.questions.length} cards`}</Text>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.btn} onPress={() => navigate('NewCard',{item:deck, refreshDecks:this._refresh})}>
            <Text style={styles.txtBtn}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => navigate('Quiz',{item:deck})}>
            <Text style={styles.txtBtn}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>

    )
  }
}
