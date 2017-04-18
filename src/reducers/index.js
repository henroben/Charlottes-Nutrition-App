import { combineReducers } from 'redux';
import FoodReducer from './reducer_food';
import NutrientReducer from './reducer_nutrients';
import SearchTextReducer from './reducer_search_text';
import AuthUser from './reducer_authentication';

const rootReducer = combineReducers({
  searchtext: SearchTextReducer,
  food: FoodReducer,
  nutrients: NutrientReducer,
  auth: AuthUser
});

export default rootReducer;
