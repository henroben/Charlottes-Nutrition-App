import axios from 'axios';
import firebase, {firebaseRef, githubProvider} from './../firebase/index';
export const FETCH_FOOD = 'FETCH_FOOD';
export const FETCH_NUTRIENTS = 'FETCH_NUTRIENTS';
export const SET_SEARCH_TEXT = 'SET_SEARCH_TEXT';
export const AUTH_USER = 'AUTH_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const UNAUTH_USER = 'UNAUTH_USER';

const API_KEY = '&api_key=7sb5eUXLMkVqMfjjLVhkpzXEZzwuwADsCVxUzIeq';
let maxResults = 6;
let foodQuery = 'Broccoli, raw';
let dataSource = 'Standard Reference';
const ROOT_URL = 'https://api.nal.usda.gov/ndb';

export function fetchFood(searchText) {

    if(searchText) {
        foodQuery = searchText;
    }

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
    };
}

export function startLogin(authMethod) {
    console.log('startLogin called', authMethod);
    let provider;
    switch(authMethod) {
        case 'facebook':
            provider = new firebase.auth.FacebookAuthProvider();
            break;
        case 'github':
            provider = new firebase.auth.GithubAuthProvider();
            break;
    }
    const request = firebase.auth().signInWithPopup(provider);

    return {
        type: AUTH_USER,
        payload: request
    };

        // return firebase.auth().signInWithPopup(githubProvider).then((result) => {
        //         console.log('Auth worked', result);
        //     }, (error) => {
        //         console.log('error', error);
        //     }
        // );

}

export function startLogout() {
    const request = firebase.auth().signOut();

    return {
        type: UNAUTH_USER,
        payload: request
    }

    // return function(dispatch) {
    //     return firebase.auth().signOut().then(() => {
    //         console.log('logged out');
    //     });
    // };
}