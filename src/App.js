import React, { Component } from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import StartPage from './components/StartPage';
import SignIn from './components/SignIn';
import './css/App.css';
import './css/SignIn.css';
// import './css/Home.css';


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
    let isAuth = false;
    let header;
    // if (!isAuth) {
    //   this.setState({
    //     context:"StartPage",
    //   });
    // } else {
    //
    // }

    switch (this.state.context) {
      case "SignIn":
        header = (
            <header className="SignIn-header">
              <NavLink to="/" id="SignIn-homeBtn" onClick={()=>this.onHomeClick()}>
                <div className="SignIn-logo-header"></div>
              </NavLink>
            </header>
        );
        break;
      default:
        header = (
          <header id="Start-header" >
            <NavLink to="/" activeClassName="Start-header-logo-active" className="Start-header-logo">
              <div className="Start-header-logo-img"></div>
              <p className="Start-header-logo-title">GIMET</p>
            </NavLink>
            <NavLink to="/home" id="signInBtn" onClick={()=>this.onSignIn()}>Sign in</NavLink>
          </header>
        );
    }

    return (
      <BrowserRouter basename="/">
        <div>
          {header}
          <Route exact path={"/"} component={StartPage}/>
          <Route path={"/home"} component={SignIn}/>
        </div>
      </BrowserRouter>
    );
  }
}



export default App;
