import { FETCH_NUTRIENTS, UNAUTH_USER } from '../actions/index';

const INITIAL_STATE = {
    nutrients: null
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case FETCH_NUTRIENTS:
            console.log('nutrients', action.payload.data);
            return {
                ...state,
                nutrients: action.payload.data
            }
        case UNAUTH_USER:
            return {
                nutrients: null
            }
        default:
            return state;
    }
}