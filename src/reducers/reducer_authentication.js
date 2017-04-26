import { AUTH_USER, AUTH_ERROR, UNAUTH_USER } from '../actions/index';

const INITIAL_STATE = {
    uid: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case AUTH_USER:
            console.log('auth', action.payload);
            return {
                ...state,
                uid: action.payload.user.uid,
                displayName: action.payload.user.displayName,
                photoURL: action.payload.user.photoURL,
                errorMessage: null
            }
        case UNAUTH_USER:
            console.log('signing out user');
            return {}
        case AUTH_ERROR:
            console.log('Auth error');
            return {
                ...state,
                errorMessage: action.payload
            }
        default:
            return state;
    }
}