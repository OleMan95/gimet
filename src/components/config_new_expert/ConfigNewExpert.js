import React from 'react';
import {connect} from 'react-redux';
import {NavLink, withRouter } from 'react-router-dom';

import '../../css/App.css';
import InitBody from './InitBody';


const ConfigNewExpert=({store,questions,questionsLI, dispatchNewExpert, getConfigBody})=>{
  console.log(store.accountReducer[0].experts.length);
  let length = store.accountReducer[0].experts.length - 1;
  let expert=store.accountReducer[0].experts[length];
  console.log('Config expert: ',expert);

  return (
    <div>
      {Header}
      <div className="CNE">
        {store.newConfigReducer.length!==0?store.newConfigReducer[0]:<InitBody/>}
      </div>
      <div className="CNE-list">
        <div className="CNE-listDiv">
        <ul className="CNE-listDiv-list">
          {store.questionsReducer?store.questionsReducer:<p></p>}
        </ul>
        </div>
      </div>

    </div>
  );
}

const Header = (
  <header className="header" >
    <div className="header-left">
      <NavLink to="/" activeClassName="Start-header-logo-active" className="header-logo">
        <div className="header-logo-img"></div>
        <p className="header-logo-title">GIMET</p>
      </NavLink>
      <NavLink to="/home" className="header-userName" onClick={()=>this.onSignIn()}>
        <h2>Configure new expert</h2>
      </NavLink>
    </div>

    <div className="header-right">
      <NavLink to="/home" className="signOutBtn" >Sign out</NavLink>
    </div>

  </header>
);

export default withRouter(connect(
  state=>({
    store: state,
  }),
  dispatch=>({

  })
)(ConfigNewExpert));
