import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import DisplayHomePage from './components/display_home_page';
import SignUp from './components/signup';
import DisplaySignIn from './components/display_signin';
import DisplaySearchFood from './components/display_search_food';
import Dashboard from './components/dashboard';
import firebase from './firebase';
// import PostsNew from './components/posts_new';
// import PostsShow from './components/posts_show';

let requireLogin = (nextState, replace, next) => {
    "use strict";
    console.log('check auth on routes', firebase.auth().currentUser);
    if(!firebase.auth().currentUser) {
        replace('/signin');
    }
    next();
};
let requireLoginHome = (nextState, replace, next) => {
    "use strict";
    console.log('check auth on routes', firebase.auth().currentUser);
    if(!firebase.auth().currentUser) {
        replace('/about');
    }
    next();
};

export default (

    <Route path="/" component={App}>

        <IndexRoute component={Dashboard} onEnter={requireLoginHome} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={DisplaySignIn} />
        <Route path="/foodsearch" component={DisplaySearchFood} onEnter={requireLogin} />
        <Route path="/about" component={DisplayHomePage} />
        {/*<Route path="posts/:id" component={PostsShow} />*/}

    </Route>

);