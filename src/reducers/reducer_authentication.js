import { AUTH_USER, AUTH_ERROR, UNAUTH_USER } from '../actions/index';

const INITIAL_STATE = {
    uid: null,
    displayName: null,
    photoURL: null
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case AUTH_USER:
            console.log('auth', action.payload);
            return {
                ...state,
                uid: action.payload.user.uid,
                displayName: action.payload.user.displayName,
                photoURL: action.payload.user.photoURL
            }
        case UNAUTH_USER:
            console.log('signing out user');
            return {
                ...state,
                uid: null,
                displayName: null,
                photoURL: null
            }
        default:
            return state;
    }
}