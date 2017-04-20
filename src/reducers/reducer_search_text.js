import { SET_SEARCH_TEXT } from '../actions/index';

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
        default:
            return state;
    }
}