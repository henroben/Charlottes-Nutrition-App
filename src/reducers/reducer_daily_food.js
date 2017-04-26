import { ADD_DAILY_FOOD, ADD_DAILY_NUTRIENTS, SAVE_DAILY_DATA, READ_DAILY_DATA, ADD_TRACKABLE_ITEM, REMOVE_DAILY_FOOD, REMOVE_DAILY_NUTRIENTS } from '../actions/index';
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
            console.group('ADD_DAILY_NUTRIENTS');
            console.log('new nutrient items:', action.payload);
            console.log('state', state.nutrientitems);
            console.log(`Nutrient measures: 1 ${action.payload[0].measures[0].label} is ${action.payload[0].measures[0].eqv} ${action.payload[0].measures[0].eunit}`);

            // check if nutrient total already existing
            if(state.nutrientitems.length > 0) {
                console.log('nutrient items found');

                let currentTotal = state.nutrientitems;

                currentTotal.map((currentTotalNutrient) => {
                    // check if new nutrient is already in the array
                    let currentNutrient = action.payload.find((nutrient) => {
                        return currentTotalNutrient.name === nutrient.name;
                    });

                    if(currentNutrient) {
                        // if current nutrient is present, add the two values together
                        currentTotalNutrient.measures[0].value = (parseInt(currentNutrient.measures[0].value) + parseInt(currentTotalNutrient.measures[0].value));
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
                console.log('no nutrient items found, adding');
                return ({
                        ...state,
                        nutrientitems: action.payload
                    });
            }
            console.groupEnd();
        case 'REMOVE_DAILY_NUTRIENTS':
            let currentTotal = state.nutrientitems;

            currentTotal.map((currentTotalNutrient) => {
                // check if new nutrient is already in the array
                let currentNutrient = action.payload.find((nutrient) => {
                    return currentTotalNutrient.name === nutrient.name;
                });

                if(currentNutrient) {
                    // if current nutrient is present, add the two values together
                    currentTotalNutrient.measures[0].value = parseInt(currentTotalNutrient.measures[0].value) - (parseInt(currentNutrient.measures[0].value) );
                }
            });
            return({
                ...state,
                nutrientitems: currentTotal
            });
        default:
            return state;
    }
}