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
  SIGNUP_USER_FAILURE,
  LOGOUT_USER_ATTEMPT,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILURE
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
      .catch(() => loginUserFailure(dispatch, 'Login Attempt Failed'));
  }
);

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
};

const loginUserFailure = (dispatch, errorMsg) => {
  dispatch({
    type: LOGIN_USER_FAILURE,
    payload: errorMsg
  });
};

export const signupUserAttempt = ({ email, password }) => (
  (dispatch) => {
    dispatch({ type: SIGNUP_USER_ATTEMPT });

    Firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => signupUserSuccess(dispatch, user))
      .catch(() => signupUserFailure(dispatch, 'Signup Attempt Failed'));
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

export const logoutUserAttempt = () => (
  (dispatch) => {
    dispatch({ type: LOGOUT_USER_ATTEMPT });

    Firebase.auth().signOut()
      .then(() => logoutUserSuccess(dispatch))
      .catch(() => logoutUserFailure(dispatch, 'Logout Attempt Failed'));
  }
);

const logoutUserSuccess = (dispatch) => {
  dispatch({ type: LOGOUT_USER_SUCCESS });
};

const logoutUserFailure = (dispatch, errorMsg) => {
  dispatch({
    type: LOGOUT_USER_FAILURE,
    payload: errorMsg
  });
};
