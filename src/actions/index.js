import axios from 'axios';

export const FETCH_FOOD = 'FETCH_FOOD';
export const FETCH_NUTRIENTS = 'FETCH_NUTRIENTS';
export const SET_SEARCH_TEXT = 'SET_SEARCH_TEXT';

const API_KEY = '&api_key=7sb5eUXLMkVqMfjjLVhkpzXEZzwuwADsCVxUzIeq';
let maxResults = 6;
let foodQuery = 'Broccoli, raw';
let dataSource = 'Standard Reference';
let ndbno = '11233';
const ROOT_URL = 'https://api.nal.usda.gov/ndb';

export function fetchFood(searchText) {
    console.log('fetchFood action', searchText);
    if(searchText) {
        foodQuery = searchText;
    }
    console.warn(foodQuery);
    const request = axios.get(`${ROOT_URL}/search/?format=json&q=${foodQuery}&ds=${dataSource}&sort=r&max=${maxResults}${API_KEY}`);

    return {
        type: FETCH_FOOD,
        payload: request
    };
}

export function fetchNutrients(ndbno) {
    const request = axios.get(`${ROOT_URL}/reports/?ndbno=${ndbno}&format=json${API_KEY}`);

    return {
        type: FETCH_NUTRIENTS,
        payload: request
    };
}

export function setSearchText(searchText) {
    return {
        type: SET_SEARCH_TEXT,
        payload: searchText
    }
}