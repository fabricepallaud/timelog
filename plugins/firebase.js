import firebase from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyCKLzwVpBjFBNZIkOnofKvpQ3OKTUuTUas',
  authDomain: 'timelog-bd174.firebaseapp.com',
  databaseURL: 'https://timelog-bd174.firebaseio.com',
  projectId: 'timelog-bd174',
  storageBucket: 'timelog-bd174.appspot.com',
  messagingSenderId: '860828723339'
}

const firebaseApp = firebase.initializeApp(config)

export default firebaseApp

const firestore = firebaseApp.firestore()
firestore.settings({
  timestampsInSnapshots: true
})

export const db = firestore

export const fb = firebase
