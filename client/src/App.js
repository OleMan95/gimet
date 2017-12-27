import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import StartPage from './components/StartPage';
import Home from './components/home_components/Home';
import ConfigNewExpert from './components/config_new_expert/ConfigNewExpert';
import Consultation from './components/consultation/Consultation';
import SignIn from './components/SignIn';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      context:''
    };
  }

  render() {
    return (
      <BrowserRouter basename="/">
        <div>
          <Route exact path={"/"} component={StartPage}/>
          <Route path={"/home"} component={Home}/>
          <Route path={"/config_new_expert"} component={ConfigNewExpert}/>
          <Route path={"/consultation"} component={Consultation}/>
          <Route path={"/signin"} component={SignIn}/>
        </div>
      </BrowserRouter>
    );
  }
}


export default App;
