import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './Reducers';
import FetchPost from './Actions';
import fetchCategory from './Actions'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import './index.css';
import App from './App';
import EditPost from './Components/EditPost'
import CreatePost from './Components/CreatePost'
import ViewPostAndComment from './Components/ViewPostAndComment'

const store = createStore(rootReducer,{}, compose(applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Route exact path='/' component={App} />
                <Route path='/edit' component={EditPost} />
                <Route path='/new'component={CreatePost} />
                <Route path='/view/:postId' component={ViewPostAndComment} />
            </div>
        </BrowserRouter>
    </Provider>
, document.getElementById('root'));
registerServiceWorker();