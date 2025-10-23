// favoritesService.js
import { db } from '../firebase'
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore'

export const addFavorite = async (userId, item) => {
  try {
    const userRef = doc(db, 'users', userId)
    await updateDoc(userRef, {
      favorites: arrayUnion(item)
    })
  } catch (error) {
    console.error('Error adding favorite:', error)
  }
}

export const removeFavorite = async (userId, item) => {
  try {
    const userRef = doc(db, 'users', userId)
    await updateDoc(userRef, {
      favorites: arrayRemove(item)
    })
  } catch (error) {
    console.error('Error removing favorite:', error)
  }
}

export const getFavorites = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId)
    const userSnap = await getDoc(userRef)
    if (userSnap.exists()) {
      return userSnap.data().favorites || []
    } else {
      console.warn('User not found')
      return []
    }
  } catch (error) {
    console.error('Error fetching favorites:', error)
    return []
  }
}
