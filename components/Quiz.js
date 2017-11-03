import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import Swiper from 'react-native-swiper'
import Card from './Card'


export default class Quiz extends Component {
  state = {
    startswiper:false,
  }
  componentWillMount(){
    //ugly hack to prevent swiper not rendering content
    setTimeout(() => {this.setState({startswiper:true})}, 10);
  }
  render() {
    const { item } = this.props.navigation.state.params
    return (
      this.state.startswiper &&
      <Swiper>
        {item.questions.map((q,i) =>(
          <View style={styles.container} key={i}>
            <Card question={q} />
          </View>
        ))}
      </Swiper>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
})
