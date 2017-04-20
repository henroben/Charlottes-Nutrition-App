"use strict";
import axios from 'axios';
import firebase, {firebaseRef, githubProvider} from './../firebase/index';
import { hashHistory } from 'react-router';

export const FETCH_FOOD = 'FETCH_FOOD';
export const FETCH_ERROR = 'FETCH_ERROR';
export const FETCH_NUTRIENTS = 'FETCH_NUTRIENTS';
export const SET_SEARCH_TEXT = 'SET_SEARCH_TEXT';
export const CREATE_USER = 'CREATE_USER';
export const AUTH_USER = 'AUTH_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const UNAUTH_USER = 'UNAUTH_USER';

const API_KEY = '&api_key=7sb5eUXLMkVqMfjjLVhkpzXEZzwuwADsCVxUzIeq';
let maxResults = 6;
let foodQuery = 'Broccoli, raw';
let dataSource = 'Standard Reference';
const ROOT_URL = 'https://api.nal.usda.gov/ndb';

export function fetchFood(searchText, maxResults) {

    return function (dispatch) {
        if(searchText) {
            foodQuery = searchText;
        }
        axios.get(`${ROOT_URL}/search/?format=json&q=${foodQuery}&ds=${dataSource}&sort=r&max=${maxResults}${API_KEY}`)
            .then((result) => {
                return dispatch({
                    type: FETCH_FOOD,
                    payload: result
                });
            })
            .catch((error) => {
                return dispatch({
                        type: FETCH_ERROR,
                        payload: `'${searchText}' is not a recognised search term`
                });
            });
    };

    // const request = axios.get(`${ROOT_URL}/search/?format=json&q=${foodQuery}&ds=${dataSource}&sort=r&max=${maxResults}${API_KEY}`);
    //
    // return {
    //     type: FETCH_FOOD,
    //     payload: request
    // };
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

export function startCreateUser(email, password) {

    return function (dispatch) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                hashHistory.push('/foodsearch');
            })
            .catch((error) => {
                dispatch({
                    type: AUTH_ERROR,
                    payload: error.message
                });
            });
    };

}

export function emailLogin(email, password) {
    return function (dispatch) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((request) => {
                return dispatch({
                    type: AUTH_USER,
                    payload: request
                });
            })
            .catch((error) => {
                dispatch({
                    type: AUTH_ERROR,
                    payload: error.message
                });
            });
    };
}

export function startLogin(authMethod) {
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

}

export function startLogout() {
    const request = firebase.auth().signOut();

    return {
        type: UNAUTH_USER,
        payload: request
    };

}