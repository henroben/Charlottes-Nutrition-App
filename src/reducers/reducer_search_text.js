import { SET_SEARCH_TEXT, UNAUTH_USER } from '../actions/index';

const INITIAL_STATE = {
    searchtext: null
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case SET_SEARCH_TEXT:
            console.log('searchtext', action.payload);
            return {
                ...state,
                text: action.payload
            }
        case UNAUTH_USER:
            return {
                text: ''
            }
        default:
            return state;
    }
}