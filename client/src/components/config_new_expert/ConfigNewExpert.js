import React from 'react';
import {connect} from 'react-redux';
import {NavLink, withRouter} from 'react-router-dom';
import InitBody from './InitBody';


class ConfigNewExpert extends React.Component{
  state = {
    // length:this.props.store.accountReducer.user.experts.length - 1,
  };

  test=()=>{
    console.log('TEST questionsList: ',this.props.store.accountReducer);
  };

  onBackButtonEvent=() => {
    this.props.getConfigBody(<InitBody/>);
  };

  componentDidMount(){
    window.onpopstate = this.onBackButtonEvent;
  };

  render() {
    return (
    <div>
      <header className="header" >
        <div className="header-left">
          <NavLink to="/home" activeClassName="Start-header-logo-active"
          className="header-logo" onClick={this.onBackButtonEvent}>
            <div className="header-logo-img"/>
            <p className="header-logo-title">GIMET</p>
          </NavLink>
          <NavLink to="/home" className="header-userName"
          onClick={this.onBackButtonEvent}>
            <h2>Configure new expert</h2>
          </NavLink>
        </div>

        <div className="header-right">
          <NavLink to="/home" className="signOutBtn" >Sign out</NavLink>
        </div>

      </header>
      <div className="CNE">
        {this.props.store.newConfigReducer.length!==0?this.props.store.newConfigReducer[0]:<InitBody/>}
      </div>
    </div>
  )}
}

export default withRouter(connect(
  state=>({
    store: state,
  }),
  dispatch=>({
    getConfigBody: (component)=>{
      dispatch({type:'GET_CONFIG_BODY',payload: component});
    }
  })
)(ConfigNewExpert));
