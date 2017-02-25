import * as React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App } from '../App/App';
import {MainPageFromStore} from '../Home/Home';
import {store} from '../redux/stores/store';

const routes = (
        <Route component={App}>
            <Route path="/" component={MainPageFromStore}/>
        </Route>
);

export default routes;
