import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';
import promise from 'redux-promise';
import reduxThunk from 'redux-thunk';
import firebase from './firebase/index';

import routes from './routes';
import App from './components/app';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise, reduxThunk)(createStore);
// let store = createStoreWithMiddleware(reducers);

// firebase.auth().onAuthStateChanged((user) => {
//     if(user){
//         // login(user.uid);
//         // createStoreWithMiddleware.dispatch(actions.startAddToDos());
//         hashHistory.push('/');
//     } else {
//         createStoreWithMiddleware.dispatch(actions.logout());
//         hashHistory.push('/');
//     }
// });

firebase.auth().onAuthStateChanged((user) => {
    "use strict";
    if(user) {
        console.log('user logged in');
        hashHistory.push('/');
    } else {
        console.log('user logged out');
        hashHistory.push('/about');
    }
});

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
      <Router history={hashHistory} routes={routes} />
  </Provider>
  , document.querySelector('.app'));
