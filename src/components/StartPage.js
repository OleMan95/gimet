import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route, NavLink, withRouter } from 'react-router-dom';


import '../css/App.css';
import Home from './home_components/Home';


const StartPage = () => { //все this.props мы получем как аргументы функции
  let signInInput = '';       //тут обьявляются все this.state
  let usernameValue = '';
  let emailValue = '';
  let passwordValue = '';

  const handleInputChange=(event)=>{
    switch (event.target.name) {
      case 'username':
        usernameValue = event.target.value;
        break;
      case 'email':
        emailValue = event.target.value;
        break;
      case 'password':
        passwordValue = event.target.value;
        break;
      default:
    }
  }

  return (
    <BrowserRouter>

    <div>
      {Header}
      <div className="Start">
        <div className="Start-content">
          {ContentBody}

          <div className="Start-signUpDiv">
            <div className="Start-signUpDiv-form">
              <label className="Start-signUpDiv-labels">Username</label>
              <input type="text" name="username" placeholder="Pick a username" className="Start-signUpDiv-inputs"
                ref={(input)=>{signInInput = input}}
                onChange={handleInputChange}/>
              <label className="Start-signUpDiv-labels">Email</label>
              <input type="email" name="email" placeholder="you@example.com" className="Start-signUpDiv-inputs"
                ref={(input)=>{signInInput = input}}
                onChange={handleInputChange}/>
              <label className="Start-signUpDiv-labels">Password</label>
              <input type="password" name="password" placeholder="Create a password" className="Start-signUpDiv-inputs"
                ref={(input)=>{signInInput = input}}
                onChange={handleInputChange}/>
              <p>Use at least one letter, one numeral, and seven characters.</p>
            </div>

            <button type="button" name="signUpBtn" id="signUpBtn" onClick={onClickHandler}>Sign up</button>
          </div>
        </div>
      </div>

      <Route path={"/home"} component={Home}/>

    </div>

  </BrowserRouter>
  );
}


const Header = (
  <header className="header" >
    <NavLink to="/" activeClassName="Start-header-logo-active" className="header-logo">
      <div className="header-logo-img"></div>
      <p className="header-logo-title">GIMET</p>
    </NavLink>
    <NavLink to="/home" id="signInBtn" onClick={()=>this.onSignIn()}>Sign in</NavLink>
  </header>
);


const ContentBody = (
  <div className="Start-contentBody">
    <div className="Start-contentBody-div1">
      <div className="Start-contentBody-logo"></div>
      <div className="Start-contentBody-logoBorder"></div>
    </div>
    <h3 className="Start-contentBody-text1">Expert systems for everybody.</h3>
    <p className="Start-contentBody-text2">Lorem ipsum dolor sit amet, consectetur adipisicing elit,
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
  </div>
);



//actions
var onClickHandler =()=>{
  alert('click');
}

export default withRouter(connect(
  state=>({
    store: state,
  }),
  dispatch=>({})
)(StartPage));
