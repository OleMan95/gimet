import React, { Component } from 'react';
import {BrowserRouter, Route, HashRouter, Switch} from 'react-router-dom';

import StartPage from './components/StartPage';
import Home from './components/home_components/Home';
import Edit from './components/expert_editing/Edit';
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
      <HashRouter basename="/">
        <Switch>
          <Route exact path={"/"} component={StartPage}/>
          <Route path={"/home"} component={Home}/>
          <Route path={"/edit/:id"} component={Edit}/>
          <Route path={"/config_new_expert"} component={ConfigNewExpert}/>
          <Route path={"/consultation/:id"} component={Consultation}/>
          <Route path={"/signin"} component={SignIn}/>
        </Switch>
      </HashRouter>
    );
  }
}


export default App;
