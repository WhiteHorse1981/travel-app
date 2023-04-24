import db from '../../firebase/config';
import { authSlice } from './authReducer';

const { updateUserProfile, authSignOut, authStateChange } = authSlice.actions;

export const authSignUpUser =
  ({ login, mail, password, photo = '' }) =>
  async (dispatch, getState) => {
    try {
      await db.auth().createUserWithEmailAndPassword(mail, password);

      const user = await db.auth().currentUser;

      await user.updateProfile({
        displayName: login,
        email: mail,
        photoURL: photo,
      });

      const { displayName, uid, email, photoURL } = await db.auth().currentUser;

      const userUpdateProfile = {
        login: displayName,
        userId: uid,
        email: email,
        photo: photoURL,
      };

      dispatch(updateUserProfile(userUpdateProfile));
    } catch (error) {
      console.log('error', error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await db.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log('error', error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  try {
    await db.auth().signOut();

    dispatch(authSignOut());
  } catch (error) {
    console.log('error', error.message);
  }
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  try {
    await db.auth().onAuthStateChanged(user => {
      if (user) {
        const userUpdateProfile = {
          userId: user.uid,
          login: user.displayName,
          photo: user.photoURL,
          email: user.email,
        };
        dispatch(authStateChange({ stateChange: true }));
        dispatch(updateUserProfile(userUpdateProfile));
      }
    });
  } catch (error) {
    console.log('error', error.message);
  }
};
