import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-elements'
import styles from '../utils/styles'

export default class Deck extends React.Component {

  render() {
    const { item } = this.props.navigation.state.params
    const { navigate } = this.props.navigation
    return (
      <View style={[styles.container, {paddingBottom:80}]}>
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 52, fontWeight:'100',}}>{item.title}</Text>
          <Text style={{fontSize: 18, fontWeight:'300', color: '#999'}}>{`${item.questions.length} cards`}</Text>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.txtBtn}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => navigate('Quiz',{item:item})}>
            <Text style={styles.txtBtn}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
