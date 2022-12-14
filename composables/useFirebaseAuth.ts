import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from 'firebase/auth'

export const createUser = async (email, password) => {
  const auth = getAuth();
  const credentials = await createUserWithEmailAndPassword(auth, email, password)
  .catch((error) => {
    const errorCode = error.code
    const errorMessage = error.message
    return { error: errorMessage, errorCode: errorCode}
  });

  return credentials
}

export const signInUser = async (email, password) => {
  const auth = getAuth();
  const credentials = await signInWithEmailAndPassword(auth, email, password)
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    return { error: errorMessage, errorCode: errorCode };
  });

  return credentials
}

export const signOutUser = async () => {
  const auth = getAuth()
  const result = await auth.signOut()

  return result
}

export const initUser = async () => {
  const auth = getAuth()
  
  const firebaseUser = useFirebaseUser()
  firebaseUser.value = auth.currentUser

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      
      console.log("user state changed", user)

    } else { 
      // User is signed out
       
    }

    firebaseUser.value = user
  });
}
