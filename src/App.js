import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
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
              <Link to="/" id="SignIn-homeBtn" onClick={()=>this.onHomeClick()}>
                <div className="SignIn-logo-header"></div>
              </Link>
            </header>
        );
        break;
      default:
        header = (
          <header id="App-header">
            <Link to="/">
              <div className="App-logo-header"></div>
            </Link>
            <Link to="/home" id="signInBtn" onClick={()=>this.onSignIn()}>Sign in</Link>
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
