import React from 'react'
import { StyleSheet, View } from 'react-native'
import {Text, Button } from 'react-native-elements'

export default class Deck extends React.Component {

  render() {
    const {item} = this.props.navigation.state.params
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
          <Text h1>{item.title}</Text>
          <Text>{`${item.questions.length} cards`}</Text>
        </View>
        <View style={{flex:1, justifyContent: 'center'}}>
          <Button title='Add Card' borderRadius={6}/>
          <Button title='Start Quiz' borderRadius={6}/>
        </View>
      </View>
    )
  }
}
