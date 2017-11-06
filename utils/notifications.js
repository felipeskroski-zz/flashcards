import {Notifications,Permissions} from 'expo'
import { AsyncStorage } from 'react-native'
export const DECKS_NOTIFICATIONS_KEY = 'QuizCards:Notifications'

export function removeTodaysNotification () {
    // remove all Notifications and set them again to start from tomorrow
    return AsyncStorage.removeItem(DECKS_NOTIFICATIONS_KEY).then(
        Notifications.cancelAllScheduledNotificationsAsync
    ).then(setNotifications())
}

const notification = {
  title: 'Try at least 1 quiz a day',
  body: 'The more you practice the better you get!',
  android: {
    sound: true,
  },
  ios: {
    sound: true,
  },
}
const tomorrow = () =>{
  let t = new Date()
  t.setDate(t.getDate()+1)
  t.setHours(20,0)
  return t
}

export function setNotifications() {
  console.log('setting up notifications')
  AsyncStorage.getItem(DECKS_NOTIFICATIONS_KEY)
  .then(n=>JSON.parse(n))
  .then(n=>(
    !n &&
    Permissions.askAsync(Permissions.NOTIFICATIONS)
    .then(({status})=>{
      status==='granted' &&
        console.log('status granted')
        Notifications.cancelAllScheduledNotificationsAsync()
        Notifications.scheduleLocalNotificationAsync(
          notification,
          {time:tomorrow(), repeat:'day'}
        )
        AsyncStorage.setItem(DECKS_NOTIFICATIONS_KEY,JSON.stringify({isSet:true}))
    })
  ))
}
