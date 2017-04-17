import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import DisplayFoodData from './components/display_food_data';
import SignUp from './components/signup';
// import PostsNew from './components/posts_new';
// import PostsShow from './components/posts_show';

export default (

    <Route path="/" component={ App }>

        <IndexRoute component={DisplayFoodData} />
        <Route path="/signup" component={SignUp} />
        {/*<Route path="posts/:id" component={PostsShow} />*/}

    </Route>

);