import React from 'react'
import { StyleSheet, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native'
import { Text } from 'react-native-elements'
import styles from '../utils/styles'
import {addCardToDeck} from '../utils/api'

export default class NewCard extends React.Component {
  state = {
    loading: false,
    question: '',
    answer: '',
  }
  handleSubmit = (event) => {
    const { item } = this.props.navigation.state.params
    const { goBack } = this.props.navigation
    this.setState({loading: true})
    event.preventDefault()
    const {question, answer} = this.state
    if (question.length < 4) {
      alert('Please enter question.')
      return
    }
    if (answer.length < 4) {
      alert('Please enter an answer.');
      return
    }
    const card = {
      question,
      answer
    }
    const { refreshDecks } = this.props.navigation.state.params

    addCardToDeck(item.title, card)
    .then((result) => {
      this.setState({loading: false})
      refreshDecks && refreshDecks()
      Alert.alert(
        'Success',
        'Your card was added to the deck.',
        [
          {text: 'OK', onPress: () => goBack(null)},
        ],
        { cancelable: false }
      )
    })

  }
  render() {
    const { item } = this.props.navigation.state.params
    const {loading} = this.state
    return (

        <KeyboardAvoidingView
        behavior='padding'
        keyboardVerticalOffset={80}
        style={{flex: 1, justifyContent:'center', alignItems: 'center'}}
      >

        <Text style={{fontSize: 36, fontWeight:'100',}}>{`Add to ${item.title} deck`}</Text>


        <TextInput
          style={[styles.textField,{marginBottom:0}]}
          placeholder="Add Question"
          onChangeText={(question) => this.setState({question})}
        />
        <TextInput
          style={styles.textField}
          placeholder="Add Answer"
          onChangeText={(answer) => this.setState({answer})}
        />
        <TouchableOpacity style={[styles.btn,{alignSelf:'stretch', marginHorizontal:20,}]} onPress={this.handleSubmit}>
          <Text style={styles.txtBtn}>{loading ? 'Adding...' : 'Add question'}</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>

    )
  }
}
