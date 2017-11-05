import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-elements'
import styles from '../utils/styles'
import {getDeck} from '../utils/api'

export default class Deck extends React.Component {
  state={
    deck: null
  }

  componentDidMount(){
    const { title } = this.props.navigation.state.params.item
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
          <Text style={{fontSize: 18, fontWeight:'300', color: '#999'}}>{`${deck.questions.length} cards`}</Text>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.btn} onPress={() => navigate('NewCard',{item:deck})}>
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
