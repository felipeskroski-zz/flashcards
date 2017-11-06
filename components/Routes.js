import React from 'react'
import { TabNavigator, StackNavigator} from 'react-navigation'
import Icon from 'react-native-vector-icons/Feather'

import DeckListScreen from './DeckList'
import DeckScreen from './Deck'
import QuizScreen from './Quiz'
import NewDeckScreen from './NewDeck'
import NewCardScreen from './NewCard'
import {colors} from '../utils/styles'


export const DeckStack = StackNavigator({
  DeckList: {
    screen: DeckListScreen,
    navigationOptions: {
      title: 'Decks',
    }
  },
  Deck: {
    screen: DeckScreen,
  },
  Quiz: {
    screen: QuizScreen,
    navigationOptions: {
      title: 'Quiz',
    }
  },
  NewCard: {
    screen: NewCardScreen,
    navigationOptions: {
      title: 'NewCard',

    }
  },
},
{
  navigationOptions: {
    headerTintColor: 'white',
    headerStyle: { backgroundColor: colors.green, borderBottomWidth: 0,},
  },
  initialRouteName: 'DeckList',
  backBehavior: 'none'

})

export const NewStack = StackNavigator({
  NewDeck: {
    screen: NewDeckScreen,
    navigationOptions: {
      title: 'NewDeck',
      header: null
    }
  },


},
{
  navigationOptions: {
    headerTintColor: 'white',
    headerStyle: { backgroundColor: colors.green, borderWidth: 0},
  }
})



export const Main = TabNavigator({
  Decks: {
    screen: DeckStack,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Icon name="layers" size={35} color={tintColor} />
    },
  },
  NewDeck: {
    screen: NewStack,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <Icon name="file-plus" size={35} color={tintColor} />
    },
  },
},{
  tabBarOptions: {
    activeTintColor: colors.green,
    labelStyle: {
      fontSize: 11,
    },
    style: {
      borderTopColor: colors.green,
      borderTopWidth: 1,
      backgroundColor: 'white',
      paddingTop: 5,
    },
  },
})
