import React from 'react';
import { Route } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import ListPage from './pages/ListPage/ListPage';
import { Provider } from 'react-redux';
import store from './redux/store';
import './reset.css';
import './common.css';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className="app">
          <Route path="/" exact component={MainPage} />
          <Route path="/list/:id" exact component={ListPage} />
        </div>
      </Provider>
    );
  }
}

export default App;
