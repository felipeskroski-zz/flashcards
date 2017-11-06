import React from 'react'
import { StyleSheet, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native'
import { Text } from 'react-native-elements'
import styles from '../utils/styles'
import {saveDeckTitle} from '../utils/api'

export default class NewDeck extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: 'Great',

    tabBarOnPress: (scene, jumpToIndex) => {
      navigation.setParams({refresh:true})
      console.log('onPress:', scene.route)
      jumpToIndex(scene.index);
    },
  })
  state = {
    loading: false,
    title: '',
  }
  handleSubmit = (event) => {
    const { navigate } = this.props.navigation
    const { forceRefresh } = this.props.screenProps
    this.setState({loading: true})
    event.preventDefault()
    const {title} = this.state
    if (title.length < 3) {
      alert('Please enter a title.')
      return
    }

    saveDeckTitle(title)
    .then((result) => {
      this.setState({loading: false, title: ''})
      navigate('Deck',{title:title, refreshDecks:false})
      forceRefresh()
    })

  }
  render() {
    const {loading} = this.state
    const { navigate } = this.props.navigation

    return (

        <KeyboardAvoidingView
        behavior='padding'
        keyboardVerticalOffset={80}
        style={{flex: 1, justifyContent:'center', alignItems: 'center'}}
      >

        <Text style={{fontSize: 36, fontWeight:'100',}}>{`Add new deck`}</Text>


        <TextInput
          style={[styles.textField,{marginBottom:0}]}
          placeholder="Deck name"
          onChangeText={(title) => this.setState({title})}
        />
        <TouchableOpacity style={[styles.btn,{alignSelf:'stretch', marginHorizontal:20,}]} onPress={this.handleSubmit}>
          <Text style={styles.txtBtn}>{loading ? 'Adding...' : 'Add Deck'}</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>

    )
  }
}
