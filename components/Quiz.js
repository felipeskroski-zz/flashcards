import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from 'react-native'
import { Text } from 'react-native-elements'
import Card from './Card'
import styles from '../utils/styles'
import {getDeck} from '../utils/api'
import {removeTodaysNotification} from '../utils/notifications'

const {height, width} = Dimensions.get('window');
export default class Quiz extends Component {
  state = {
    currentCard: 0,
    corrects: 0,
    deck: null,
    reset: 'test'
  }
  componentDidMount(){
    const { title } = this.props.navigation.state.params.item
    getDeck(title).then((result) => this.setState({deck: result}))
  }
  onCorrect(){
    this.setState({corrects: this.state.corrects + 1})
    this.nextCard()
  }
  onIncorrect(){
    this.nextCard()
  }
  restartQuiz = () => {
    this.setState({currentCard: 0, reset: true, corrects: 0})
    this._list.scrollTo({x:0, y:0, animated: true})
  }
  nextCard(){
    const {currentCard, deck} = this.state
    this._list.scrollTo({x: (width * (currentCard+1)), y:0, animated: true})
    this.setState({currentCard: currentCard + 1})
    if (currentCard+1 >= deck.questions.length) {
      //don't send notification if they finished a quiz
			removeTodaysNotification()
    }
  }
  render() {
    const { deck } = this.state
    const { goBack } = this.props.navigation
    const { corrects, reset } = this.state
    return (
      deck &&
      <ScrollView horizontal scrollEnabled={false} style={{flex:1, flexDirection:'row'}} ref={component => this._list = component}>
        {deck.questions.map((q,i)=>(
          <View style={styles.container} key={i}>
            <Text style={styles.cardCounter}>{`${i+1} of ${deck.questions.length}`}</Text>
            <Card
              question={q}
              style={{zIndex: 10}}
              onCorrect={()=>this.onCorrect()}
              onIncorrect={()=>this.onIncorrect()}
              reser={reset}
            />
          </View>
        ))}
        <View style={[styles.container, {paddingBottom:80}]}>
          <Text h3>Results</Text>
          <Text style={{fontSize: 100, fontWeight:'100',}}>{`${corrects} of ${deck.questions.length}`}</Text>
          <Text>Correct</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.btn} onPress={this.restartQuiz}>
              <Text style={styles.txtBtn}>Restart Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => goBack(null)}>
              <Text style={styles.txtBtn}>Back to Deck</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    )
  }
}
