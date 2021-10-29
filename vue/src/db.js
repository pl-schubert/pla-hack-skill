import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// Get a Firestore instance
export const db = firebase
  .initializeApp({ projectId: 'mslxbcgplatinion' })
  .firestore()

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }

// if using Firebase JS SDK < 5.8.0
db.settings({ timestampsInSnapshots: true })