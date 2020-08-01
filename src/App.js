import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.scss';
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import CountryDetail from "./components/CountryDetail/CountryDetail";
import {Provider} from "react-redux";
import store from "./redux/stores";

function App() {
  return (
      <Provider store={store}>
          <BrowserRouter>
              <Switch>
                  <Header>

                      <Route path="/" exact  component={Home}/>
                      <Route path="/:name" exact  component={CountryDetail}/>

                  </Header>

              </Switch>
          </BrowserRouter>
      </Provider>


  );
}

export default App;
