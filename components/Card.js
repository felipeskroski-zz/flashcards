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

  render() {
    const {frontActive} = this.state
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
              <TouchableOpacity style={styles.btn} onPress={() => onCorrect()}>
                <Text style={styles.txtBtn}>Correct</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn} onPress={() => onIncorrect()}>
                <Text style={styles.txtBtn}>Incorrect</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>

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
    backgroundColor: 'blue',
    backfaceVisibility: 'hidden',
    borderRadius: 8,
    zIndex: 1
  },
  flipCardBack: {
    backgroundColor: "red",
    position: "absolute",
    top: 0,
    borderRadius: 8,
  },
  flipText: {
    width: 200,
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
    bottom: 20
  },
  btn:{
    padding:15,
    backgroundColor: 'white',
    borderRadius: 4,
    margin: 10,
  },
  txtBtn:{
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
  }
})
