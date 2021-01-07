import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ScreenHome from './ScreenHome'; 
import ScreenProfil from './ScreenProfil'

import {Provider} from 'react-redux';
import {createStore, combineReducers}  from 'redux';

import token from './reducers/token'
import userId from './reducers/userId'

const store = createStore(combineReducers({token, userId}))

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
            <Route path="/"exact component={ScreenHome} />
            <Route path="/ScreenProfil"exact component={ScreenProfil} />
        </Switch>
      </Router>
    </Provider>
  );
}
export default App;
