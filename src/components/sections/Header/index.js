import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     count:0
  //   };
  // }
  // onSignIn=()=>{
  //   alert("Sign in!");
  // }
  // onSignOut=()=>{
  //   alert("Click!");
  // }
  render() {
    // let context = this.props.context;
    // let header;
    // switch (context) {
    //   case "Home":
    //     header = (
    //       <header id="Home-header">
    //         <div className="Home-header-content">
    //           <button type="button" name="homeBtn" id="homeBtn" onClick={()=>this.onSignOut()}><div className="App-logo-header"></div></button>
    //           <button type="button" name="profileBtn" id="profileBtn" onClick={()=>this.onSignOut()}>Manachynskyi Oleksii</button>
    //         </div>
    //         <div className="Home-header-buttons">
    //           <button type="button" name="addExpertBtn" id="addExpertBtn" onClick={()=>this.onSignOut()}>+</button>
    //           <button type="button" name="signOutBtn" id="signOutBtn" onClick={()=>this.onSignOut()}>Sign out</button>
    //         </div>
    //       </header>
    //     );
    //     break;
    //   default:
    //     header = (
    //       <header id="App-header">
    //         <div className="App-logo-header"></div>
    //         <button type="button" name="signInBtn" id="signInBtn" onClick={()=>this.onSignIn()}>Sign in</button>
    //         <Link to="authorized">Sign in</Link>
    //       </header>
    //     );
    //
    // }
    return (
      <div>
        {/*{header}*/}
      </div>
    );
  }
}

export default Header;
