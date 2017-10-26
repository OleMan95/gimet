import React, { Component } from 'react';
import { BrowserRouter, Route, NavLink} from 'react-router-dom';

import StartPage from './components/StartPage';
import SignIn from './components/SignIn';
import Home from './components/Home';
  

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      context:''
    };
  }
  onSignIn=()=>{
    this.setState({
      context:"SignIn",
    });
  }
  onSignOut=()=>{
    this.setState({
      context:"StartPage",
    });
  }
  onHomeSignInClick=()=>{
    this.setState({
      context:"StartPage",
    });
  }
  render() {
    let header;

    return (
      <BrowserRouter basename="/">
        <div>
          <Route exact path={"/"} component={StartPage}/>
          <Route path={"/home"} component={Home}/>
        </div>
      </BrowserRouter>
    );
  }
}


export default App;
