import { FETCH_FOOD, FETCH_ERROR, UNAUTH_USER } from '../actions/index';

const INITIAL_STATE = {
    food: null
};

export default function(state = INITIAL_STATE, action) {
    console.log(action.type);
    switch(action.type) {
        case FETCH_FOOD:
            console.log('food', action.payload.data);
            return {
                ...state,
                food: action.payload.data,
                error: null
            };
        case UNAUTH_USER:
            return {
                food: null,
                error: null
            }
        case FETCH_ERROR:
            console.log('error', action.payload);
                return {
                    ...state,
                    food: null,
                    error: action.payload
                }
        default:
            return state;
    }
}