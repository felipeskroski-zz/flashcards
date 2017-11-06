import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Main} from './components/Routes'
import {setNotifications} from './utils/notifications'


export default class App extends React.Component {
  componentDidMount(){
    setNotifications()
  }
  forceRefresh = () => {
    console.log('function called')
    this.forceUpdate()
  }
  render() {
    return (
      <Main screenProps={{forceRefresh: this.forceRefresh}}/>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
