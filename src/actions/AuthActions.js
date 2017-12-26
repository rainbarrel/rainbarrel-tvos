import Firebase from 'firebase';
import 'firebase/firestore';
import {
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_CONFIRMATION,
  LOGIN_USER_ATTEMPT,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  SIGNUP_USER_ATTEMPT,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILURE
} from './types';

export const changeEmail = email => ({
  type: CHANGE_EMAIL,
  payload: email
});

export const changePassword = password => ({
  type: CHANGE_PASSWORD,
  payload: password
});

export const changePasswordConfirmation = passwordConfirmation => ({
  type: CHANGE_PASSWORD_CONFIRMATION,
  payload: passwordConfirmation
});

export const loginUserAttempt = ({ email, password }) => (
  (dispatch) => {
    dispatch({ type: LOGIN_USER_ATTEMPT });

    Firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch(() => loginUserFailure(dispatch));
  }
);

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });

  // startApp();
};

const loginUserFailure = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAILURE });
};

export const signupUserAttempt = ({ email, password }) => (
  (dispatch) => {
    dispatch({ type: SIGNUP_USER_ATTEMPT });

    Firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => signupUserSuccess(dispatch, user))
      .catch(() => signupUserFailure(dispatch, 'Authentication Failed'));
  }
);

const signupUserSuccess = (dispatch, user) => {
  const db = Firebase.firestore();
  const { uid, email } = user;

  db.collection('users').doc(uid).set({ email })
    .then(() => {
      dispatch({
        type: SIGNUP_USER_SUCCESS,
        payload: user
      });

      // startApp();
    })
    .catch(() => {
      // error. doing nothing OK for now.
    });
};

export const signupUserFailure = (dispatch, errorMsg) => {
  dispatch({
    type: SIGNUP_USER_FAILURE,
    payload: errorMsg
  });
};
