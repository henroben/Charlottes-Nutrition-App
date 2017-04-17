import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import DisplayHomePage from './components/display_home_page';
import DisplayFoodData from './components/display_food_data';
import SignUp from './components/signup';
import DisplaySearchFood from './components/display_search_food';
// import PostsNew from './components/posts_new';
// import PostsShow from './components/posts_show';

export default (

    <Route path="/" component={ App }>

        <IndexRoute component={DisplayHomePage} />
        <Route path="/signup" component={SignUp} />
        <Route path="/foodsearch" component={DisplaySearchFood} />
        {/*<Route path="posts/:id" component={PostsShow} />*/}

    </Route>

);