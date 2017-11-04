import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
} from 'react-native';

export default class Card extends Component {
  state={
    frontActive: true
  }
  componentWillMount() {
    this.animatedValue = new Animated.Value(0)
    this.value = 0
    this.animatedValue.addListener(({ value }) => {
      this.value = value
    })
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })
  }
  flipCard = () => {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue,{
        toValue: 0,
        friction: 8,
        tension: 10
      }).start()
      this.setState({frontActive:true})
    } else {
      Animated.spring(this.animatedValue,{
        toValue: 180,
        friction: 8,
        tension: 10
      }).start()
      this.setState({frontActive:false})
    }

  }
  resetCard = () =>{
    Animated.timing(this.animatedValue,{
      toValue: 0,
      delay: 300,
      duration: 10
    }).start()
  }
  onCorrect = () =>{
    this.resetCard()
    this.props.onCorrect()
  }
  onIncorrect = () =>{
    this.resetCard()
    this.props.onIncorrect()
  }

  render() {
    const { frontActive } = this.state
    const { question, onCorrect, onIncorrect } = this.props

    const frontAnimatedStyle = {
      transform: [
        { perspective: 800},
        { rotateY: this.frontInterpolate}
      ]
    }
    const backAnimatedStyle = {
      transform: [
        { perspective: 800},
        { rotateY: this.backInterpolate }
      ]
    }
    return (
        <View>
          <Animated.View style={[styles.flipCard, frontAnimatedStyle, frontActive && {zIndex:10}]}>
              <Text style={styles.flipText}>
                {question.question}
              </Text>
              <TouchableOpacity onPress={this.flipCard}>
                <Text style={styles.flipButton}>Answer</Text>
              </TouchableOpacity>

          </Animated.View>
          <Animated.View style={[styles.flipCard, backAnimatedStyle, styles.flipCardBack, !frontActive && {zIndex:10}]}>

              <Text style={styles.flipText}>
                {question.answer}
              </Text>
              <TouchableOpacity onPress={this.flipCard}>
                <Text style={styles.flipButton}>Question</Text>
              </TouchableOpacity>

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.btn} onPress={this.onCorrect}>
                <Text style={styles.txtBtn}>Correct</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn} onPress={this.onIncorrect}>
                <Text style={styles.txtBtn}>Incorrect</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
    )
  }
}
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  flipCard: {
    width: width - 60,
    height: height - 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightseagreen',
    backfaceVisibility: 'hidden',
    borderRadius: 8,
    zIndex: 1
  },
  flipCardBack: {
    backgroundColor: "tomato",
    position: "absolute",
    top: 0,
    borderRadius: 8,
  },
  flipText: {
    width: width - 120,
    fontSize: 24,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  flipButton:{
    marginVertical: 20,
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
  },
  buttonRow:{
    width: width - 60,
    flexDirection:'row',
    margin: 20,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0
  },
  btn:{
    paddingVertical:15,
    paddingHorizontal:25,
    backgroundColor: 'white',
    borderRadius: 4,
    margin: 10,
  },
  txtBtn:{
    color: 'tomato',
    fontSize: 18,
    fontWeight: 'bold',
  }
})
