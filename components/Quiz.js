import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView
} from 'react-native'
import Card from './Card'

const {height, width} = Dimensions.get('window');
export default class Quiz extends Component {
  state = {
    currentCard: 0,
    corrects: 0,
  }
  onCorrect(){
    this.setState({corrects: this.state.corrects + 1})
    this.nextCard()
  }
  onIncorrect(){
    this.nextCard()
  }
  nextCard(){
    const {currentCard} = this.state

    this._list.scrollTo({x: (width * (currentCard+1)), y:0, animated: true})
    this.setState({currentCard: currentCard + 1})
  }
  render() {
    const { item } = this.props.navigation.state.params
    const q = item.questions[this.state.currentCard-1]
    return (
      <ScrollView horizontal scrollEnabled={false} style={{flex:1, flexDirection:'row'}} ref={component => this._list = component}>
        {item.questions.map((q,i)=>(
          <View style={styles.container} key={i}>
            <Text>{`${i+1} of ${item.questions.length}`}</Text>
            <Card question={q} style={{zIndex: 10}} onCorrect={()=>this.onCorrect()} onIncorrect={()=>this.onIncorrect()}/>
          </View>
        ))}
        <View style={styles.container}>
          <Text>Results</Text>
          <Text>1/3 Corrects</Text>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    alignItems: "center",
    justifyContent: "center",
  }
})
