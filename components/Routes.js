import React from 'react'
import { TabNavigator, StackNavigator} from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'

import DeckListScreen from './DeckList'
import DeckScreen from './Deck'
import QuizScreen from './Quiz'
import NewDeckScreen from './NewDeck'
import NewQuizScreen from './NewQuiz'


export const DeckStack = StackNavigator({
  DeckList: {
    screen: DeckListScreen,
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
},
{
  navigationOptions: {
    headerTintColor: 'white',
    headerStyle: { backgroundColor: 'deepskyblue', borderWidth: 0},
  }
})

export const NewStack = StackNavigator({
  NewDeck: {
    screen: NewDeckScreen,
  },
  NewQuiz: {
    screen: NewQuizScreen,
  },

},
{
  navigationOptions: {
    headerTintColor: 'white',
    headerStyle: { backgroundColor: 'deepskyblue', borderWidth: 0},
  }
})

export const Main = TabNavigator({
  Decks: {
    screen: DeckStack,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Icon name="info-outline" size={35} color={tintColor} />
    },
  },
  NewDeck: {
    screen: NewStack,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
    },
  },
},{
  tabBarOptions: {
    activeTintColor: 'deepskyblue',
    labelStyle: {
      fontSize: 11,
    },
    style: {
      borderTopColor: 'deepskyblue',
      borderTopWidth: 1,
      backgroundColor: 'white',
      paddingTop: 5,
    },
  },
})
