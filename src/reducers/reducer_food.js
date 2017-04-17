import { FETCH_FOOD } from '../actions/index';

const INITIAL_STATE = {
    food: null
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case FETCH_FOOD:
            console.log('food', action.payload.data);
            return {
                ...state,
                food: action.payload.data
            }
        default:
            return state;
    }
}