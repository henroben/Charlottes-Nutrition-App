import { ADD_DAILY_FOOD,
    ADD_DAILY_NUTRIENTS,
    SAVE_DAILY_DATA,
    READ_DAILY_DATA,
    ADD_TRACKABLE_ITEM,
    REMOVE_DAILY_FOOD,
    REMOVE_DAILY_NUTRIENTS,
    UNAUTH_USER } from '../actions/index';
import _ from 'lodash';

const INITIAL_STATE = {
    fooditems: [],
    trackableitems: [],
    nutrientitems: []
};

export default function(state = INITIAL_STATE, action) {
    console.log(action.type);
    switch(action.type) {
        case ADD_DAILY_FOOD:
            console.log('fooditems:', action.payload);
            // console.log('state.dayTrackingData', state.dayTrackingData);

            return {
                ...state,
                fooditems: [
                    ...state.fooditems,
                    action.payload
                ]
            }
        case REMOVE_DAILY_FOOD:
            return {
                ...state,
                fooditems: action.payload
            }
        case ADD_TRACKABLE_ITEM:
            console.log('trackable add called', action.payload);
            return {
                ...state,
                trackableitems: action.payload
            }
        case SAVE_DAILY_DATA:
            return({
                ...state,
                ref: action.payload
            });
        case READ_DAILY_DATA:
            return({
                date: action.payload.data.date,
                fooditems: action.payload.data.food || [],
                ref: action.payload.ref,
                trackableitems: action.payload.data.trackableitems || [],
                nutrientitems: action.payload.data.nutrientitems || []
            });
        case ADD_DAILY_NUTRIENTS:

            // check if nutrient total already existing
            if(state.nutrientitems.length > 0) {

                let currentTotal = state.nutrientitems;

                currentTotal.map((currentTotalNutrient) => {
                    // check if new nutrient is already in the array
                    let currentNutrient = action.payload.find((nutrient) => {
                        return currentTotalNutrient.name === nutrient.name;
                    });

                    if(currentNutrient) {
                        // if current nutrient is present, add the two values together
                        currentTotalNutrient.measures[0].value = ((parseFloat(currentNutrient.measures[action.measurement].value * action.servingsize) + parseFloat(currentTotalNutrient.measures[0].value))).toFixed(2);
                    } else {
                        // nutrient not found, so must be new one
                        currentTotal.push()
                    }
                });

                return({
                    ...state,
                    nutrientitems: currentTotal
                });
            } else {
                // no nutrient total for today, so just add current results
                return ({
                        ...state,
                        nutrientitems: action.payload
                    });
            }
        case 'REMOVE_DAILY_NUTRIENTS':
            let currentTotal = state.nutrientitems;

            currentTotal.map((currentTotalNutrient) => {
                // check if new nutrient is already in the array
                let currentNutrient = action.payload.find((nutrient) => {
                    return currentTotalNutrient.name === nutrient.name;
                });

                if(currentNutrient) {
                    // if current nutrient is present, add the two values together
                    currentTotalNutrient.measures[0].value = parseInt(currentTotalNutrient.measures[0].value) - (parseInt(currentNutrient.measures[action.measurement].value * action.servingsize) );
                }
            });
            return({
                ...state,
                nutrientitems: currentTotal
            });
        case UNAUTH_USER:
            return({
                date: null,
                fooditems: [],
                ref: null,
                trackableitems: [],
                nutrientitems: []
            });
        default:
            return state;
    }
}