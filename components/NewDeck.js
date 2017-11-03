import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default class NewDeck extends React.Component {
  render() {
    return (
      <View>
        <Text>Deck</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    )
  }
}