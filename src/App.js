import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header id="App-header">
          <h1 id="App-title">GIMET</h1>
          <button type="button" name="newExpertBtn" id="signInBtn">Sign in</button>
        </header>
        <div className="App-content">
          <div className="App-contentText">
            <p><b>GIMET</b> is a platform for creating the expert systems.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?</p>
          </div>
          <div className="App-enterDiv">
            <label for="username" className="App-enterDiv-labels">Username</label>
            <input type="text" name="username" value="" placeholder="Pick a username" className="App-enterDiv-inputs"/>

            <label for="email" className="App-enterDiv-labels">Email</label>
            <input type="text" name="email" value="" placeholder="you@example.com" className="App-enterDiv-inputs"/>

            <label for="password" className="App-enterDiv-labels">Password</label>
            <input type="text" name="password" value="" placeholder="Create a password" className="App-enterDiv-inputs"/>
            <p>Use at least one letter, one numeral, and seven characters.</p>
            <button type="button" name="startConsultBtn" id="signUpBtn">Sign up</button>
          </div>
        </div>

      </div>
    );
  }
}



export default App;
