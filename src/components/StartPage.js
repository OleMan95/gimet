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
      <div className="App">
        <div className="App-content">
          <div className="App-contentText">
              <div className="App-logo"></div>
              <p className="App-contentText-p1">is a platform for creating the expert systems.</p>
          </div>
          <div className="App-enterDiv">
            <label className="App-enterDiv-labels">Username</label>
            <input type="text" name="username" value="" placeholder="Pick a username" className="App-enterDiv-inputs"/>

            <label className="App-enterDiv-labels">Email</label>
            <input type="text" name="email" value="" placeholder="you@example.com" className="App-enterDiv-inputs"/>

            <label className="App-enterDiv-labels">Password</label>
            <input type="text" name="password" value="" placeholder="Create a password" className="App-enterDiv-inputs"/>
            <p>Use at least one letter, one numeral, and seven characters.</p>
            <button type="button" name="signUpBtn" id="signUpBtn">Sign up</button>
          </div>
        </div>

      </div>
    );
  }
}



export default StartPage;
