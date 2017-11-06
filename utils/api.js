import { AsyncStorage } from 'react-native'

export const DECKS_STORAGE_KEY = 'QuizCards:Decks'


export const deckData = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}





//return all of the decks along with their titles, questions, and answers.
export function getDecks(){
	return AsyncStorage.getItem(DECKS_STORAGE_KEY)
  .then(formatResults)
}

//take in a single id argument and return the deck associated with that id.
export function getDeck(id){
	return AsyncStorage.getItem(DECKS_STORAGE_KEY)
	.then((results) => JSON.parse(results)[id])
}
//take in a single title argument and add it to the decks.
export function saveDeckTitle(title){
	return AsyncStorage.mergeItem(DECKS_STORAGE_KEY,
		JSON.stringify(
			{[title]: {title: title, questions:[]}})
		)
}

//take in two arguments, title and card, and will add the card to the list
//of questions for the deck with the associated title.
export function addCardToDeck(title, card) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
	.then((results) => {
    const data = JSON.parse(results)
    data[title].questions.push(card)
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
  })
}

function formatResults(results) {
  return results === null
    ? setDummyData()
    : JSON.parse(results)
}

function setDummyData () {
  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(deckData))
  return deckData
}


// Push notifications are generated at a specific time if the user hasn't
// completed at least one quiz for that day.
