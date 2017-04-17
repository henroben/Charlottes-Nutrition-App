import { combineReducers } from 'redux';
import FoodReducer from './reducer_food';
import NutrientReducer from './reducer_nutrients';
import SearchTextReducer from './reducer_search_text';

const rootReducer = combineReducers({
  searchtext: SearchTextReducer,
  food: FoodReducer,
  nutrients: NutrientReducer
});

export default rootReducer;
