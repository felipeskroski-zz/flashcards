import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Main} from './components/Routes'
import {setNotifications} from './utils/notifications'


export default class App extends React.Component {
  state={
    refresh: false
  }
  componentDidMount(){
    setNotifications()
  }
  forceRefresh = () => {
    console.log('function called')
    this.forceUpdate()
    this.setState({refresh: true})
  }
  render() {
    return (
      <Main screenProps={{forceRefresh: this.forceRefresh, refresh:this.state.refresh}}/>
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
