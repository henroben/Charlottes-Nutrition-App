"use strict";
import axios from 'axios';
import firebase, {firebaseRef, githubProvider} from './../firebase/index';
import { hashHistory } from 'react-router';
import _ from 'lodash';

export const FETCH_FOOD = 'FETCH_FOOD';
export const FETCH_ERROR = 'FETCH_ERROR';
export const FETCH_NUTRIENTS = 'FETCH_NUTRIENTS';
export const SET_SEARCH_TEXT = 'SET_SEARCH_TEXT';

export const AUTH_USER = 'AUTH_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const UNAUTH_USER = 'UNAUTH_USER';

export const ADD_DAILY_FOOD = 'ADD_DAILY_FOOD';
export const REMOVE_DAILY_FOOD = 'REMOVE_DAILY_FOOD';
export const ADD_DAILY_NUTRIENTS = 'ADD_DAILY_NUTRIENTS';
export const REMOVE_DAILY_NUTRIENTS = 'REMOVE_DAILY_NUTRIENTS';
export const SAVE_DAILY_DATA = 'SAVE_DAILY_DATA';
export const UPDATE_DAILY_DATA = 'UPDATE_DAILY_DATA';
export const READ_DAILY_DATA = 'READ_DAILY_DATA';

export const ADD_TRACKABLE_ITEM = 'ADD_TRACKABLE_ITEM';
export const CLEAR_DAILY_TRACKING = 'CLEAR_DAILY_TRACKING';

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
    return function (dispatch) {
        const request = firebase.auth().signOut();
        dispatch({
            type: UNAUTH_USER,
            payload: request
        });
    }


}

export function addDailyFood(ndbno, measure, serving) {

    return function(dispatch) {
        axios.get(`${ROOT_URL}/reports/?ndbno=${ndbno}&format=json${API_KEY}`)
            .then((result) => {
            console.log(result.data);
            // add food to daily record
                dispatch({
                    type: ADD_DAILY_FOOD,
                    payload: {
                        ds: result.data.report.food.ds,
                        name: result.data.report.food.name,
                        ndbno: result.data.report.food.ndbno,
                        measurement: measure,
                        servingsize: serving
                    }
                });
                // add nutrients to daily total
                dispatch({
                    type: ADD_DAILY_NUTRIENTS,
                    payload: result.data.report.food.nutrients,
                    measurement: measure,
                    servingsize: serving
                });
            })
            .catch((error) => {
                console.warn('error:', error);
            });

    };

}

export function removeDailyFood(ndbno, dailyFood, measurement, servingsize) {

    return function(dispatch) {
        axios.get(`${ROOT_URL}/reports/?ndbno=${ndbno}&format=json${API_KEY}`).then((result) => {
            // remove food from daily record
            let newFood = _.filter(dailyFood, (food) => {
                return food.ndbno != ndbno;
            });

            dispatch({
                type: REMOVE_DAILY_FOOD,
                payload: newFood
            });

            // remove food nutrients from daily total
            dispatch({
                type: REMOVE_DAILY_NUTRIENTS,
                payload: result.data.report.food.nutrients,
                measurement: measurement,
                servingsize: servingsize
            });
        }).catch((error) => {
            console.warn('error:', error);
        });
    };
}

export function startSaveDailyTracker(data, date, trackableitems, nutrientitems) {
    return function (dispatch) {
        let dayData = {
            date: date.toString(),
            food: data,
            trackableitems: trackableitems,
            nutrientitems: nutrientitems
        };
        let uid = firebase.auth().currentUser.uid;
        console.log(`uid is ${uid}, date is: ${date.toString()}, data is: ${data}, trackableitems are ${trackableitems}`);
        // save the reference for this day
        let dailyDataRef = firebaseRef.child(`users/${uid}/dailydata`).push(dayData);

        return dailyDataRef.then(() => {
                console.log('firebase ref', dailyDataRef.key);
                dispatch({
                    type: SAVE_DAILY_DATA,
                    payload: dailyDataRef.key
                });
            }
        );
    };
}

export function startUpdateDailyTracker(data, date, ref, trackableitems, nutrientitems) {
    return function (dispatch) {
        let dayData = {
            date: date,
            food: data,
            trackableitems: trackableitems,
            nutrientitems: nutrientitems
        };
        let uid = firebase.auth().currentUser.uid;

        let dailyDataRef = firebaseRef.child(`users/${uid}/dailydata/${ref}`).update(dayData);

        return dailyDataRef.then(() => {
                console.log('firebase updated ref', dailyDataRef);
                dispatch({
                    type: UPDATE_DAILY_DATA,
                    payload: dailyDataRef.key
                });
            }
        );
    }
}

export function startReadDailyTracker(date) {
    return function (dispatch) {
        let uid = firebase.auth().currentUser.uid;
        let dailyDataRef = firebaseRef.child(`users/${uid}/dailydata`);
        console.log('read search date is:', date.toString());

        dispatch({
            type: READ_DAILY_DATA,
            payload: {
                data: {
                    date: date.toString(),
                    food: [],
                    trackableitems: [],
                    nutrientitems: []
                },
                ref: null
            }
        });

        return dailyDataRef.orderByChild("date").equalTo(date.toString()).on("child_added", function(snapshot) {
            console.log('snapshot called');
            console.log('key', snapshot.key);
            console.log('snapshot', snapshot.val());

            dispatch({
                type: READ_DAILY_DATA,
                payload: {
                    data: snapshot.val(),
                    ref: snapshot.key
                }
            });
        });

    };
}

export function startAddTrackableItem(item, data, trackableObject) {
    console.log('trackableObject', trackableObject);
    let trackables = _.filter(trackableObject, (object) => {
        return object.item != item;
    });
    trackables.push({
        item: item,
        rating: data
    });
    console.log('trackables', trackables);
    return {
        type: ADD_TRACKABLE_ITEM,
        payload: trackables
    };
}