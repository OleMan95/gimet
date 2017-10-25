import React, { Component } from 'react';
// import logo from './logo.svg';
import '../css/App.css';
import Header from './Header';

class StartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count:0
    };
  }
  onClickHandler=()=>{
    alert("Click!");
  }
  render() {
    // <Header/>
    return (
      <div>
        <div className="Start">
          <div className="Start-content">
            <div className="Start-contentBody">
              <div className="Start-contentBody-div1">
                <div className="Start-contentBody-logo"></div>
              </div>
              <h3 className="Start-contentBody-text1">Expert systems for everybody.</h3>
              <p className="Start-contentBody-text2">Lorem ipsum dolor sit amet, consectetur adipisicing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>

            </div>
            <div className="Start-signUpDiv">
              <div className="Start-signUpDiv-form">
                <label className="Start-signUpDiv-labels">Username</label>
                <input type="text" name="username" value="" placeholder="Pick a username" className="Start-signUpDiv-inputs"/>
                <label className="Start-signUpDiv-labels">Email</label>
                <input type="text" name="email" value="" placeholder="you@example.com" className="Start-signUpDiv-inputs"/>
                <label className="Start-signUpDiv-labels">Password</label>
                <input type="text" name="password" value="" placeholder="Create a password" className="Start-signUpDiv-inputs"/>
                <p>Use at least one letter, one numeral, and seven characters.</p>
              </div>

              <button type="button" name="signUpBtn" id="signUpBtn">Sign up</button>
            </div>
          </div>

        </div>
        <div>
          <div className="Start-signUpDiv-720">
            <div className="Start-signUpDiv-720-form">
              <label className="Start-signUpDiv-720-labels">Username</label>
              <input type="text" name="username" value="" placeholder="Pick a username" className="Start-signUpDiv-720-inputs"/>
              <label className="Start-signUpDiv-720-labels">Email</label>
              <input type="text" name="email" value="" placeholder="you@example.com" className="Start-signUpDiv-720-inputs"/>
              <label className="Start-signUpDiv-720-labels">Password</label>
              <input type="text" name="password" value="" placeholder="Create a password" className="Start-signUpDiv-720-inputs"/>
              <p>Use at least one letter, one numeral, and seven characters.</p>
            </div>

            <button type="button" name="signUpBtn" id="signUpBtn">Sign up</button>
          </div>
        </div>
      </div>

    );
  }
}



export default StartPage;
