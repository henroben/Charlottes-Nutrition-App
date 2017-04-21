import { ADD_DAILY_FOOD, ADD_DAILY_NUTRIENTS } from '../actions/index';

const INITIAL_STATE = {
    fooditems: [],
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
        case ADD_DAILY_NUTRIENTS:
            console.log('nutrientitems:', action.payload);

            // add the totals
            let currentTotal = state.nutrientitems;
            console.log('state nutrient items', state.nutrientitems);
            let newTotal = [];
            let currentNutrient = [];

            currentTotal.map((currentTotalNutrient) => {
                // check if new nutrient is already in the array
                currentNutrient = action.payload.find((nutrient) => {
                    return currentTotalNutrient.name === nutrient.name;
                });

                if(currentNutrient) {
                    // if current nutrient is present, add the two values together
                    currentTotalNutrient.value = (parseInt(currentNutrient.value) + parseInt(currentTotalNutrient.value));
                } else {
                    // nutrient not found, so must be new one
                    currentTotal.push()
                }

            });


            action.payload.map((nutrient) => {
                // check if current total contains this nutrient
                currentNutrient = currentTotal.find((nt) => {
                    return nt.name === nutrient.name;
                });
                if(currentNutrient) {
                    console.group('Nutrient found ' + currentNutrient.name);
                        console.log(`Old total is ${parseInt(currentNutrient.value)}, adding new ${parseInt(nutrient.value)}`);
                        currentNutrient.value = (parseInt(currentNutrient.value) + parseInt(nutrient.value));
                        newTotal.push(currentNutrient);
                        console.log(`New value is ${parseInt(currentNutrient.value)} ${currentNutrient.unit}`);
                    console.groupEnd;
                } else {
                    newTotal.push(nutrient);
                }
                currentNutrient = [];
            });
            console.log('current total:', currentTotal);
            console.log('new total:', newTotal);


            return {
                ...state,
                nutrientitems: action.payload
            }
        default:
            return state;
    }
}